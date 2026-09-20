// Prepared server function. Not deployed or connected to the local frontend.
// Uses platform JWT verification AND validates the caller through Supabase Auth.
Deno.serve(async (req: Request) => {
 const origin = Deno.env.get('REI_ALLOWED_ORIGIN');
 const headers = {'Content-Type':'application/json','Access-Control-Allow-Origin':origin || 'null','Access-Control-Allow-Headers':'authorization, apikey, content-type','Access-Control-Allow-Methods':'POST, OPTIONS','Vary':'Origin'};
 const reply = (body: unknown,status=200) => new Response(JSON.stringify(body),{status,headers});
 if (!origin || req.headers.get('Origin') !== origin) return reply({error:'Origin not allowed'},403);
 if (req.method === 'OPTIONS') return new Response(null,{status:204,headers});
 if (req.method !== 'POST') return reply({error:'POST required'},405);
 const url=Deno.env.get('SUPABASE_URL'), key=Deno.env.get('SUPABASE_ANON_KEY'), admin=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'), provider=Deno.env.get('OPENALEX_API_KEY');
 if (!url || !key || !admin || !provider) return reply({error:'Search is not configured'},503);
 try {
 const auth=await fetch(url+'/auth/v1/user',{headers:{apikey:key,Authorization:req.headers.get('Authorization')||''},signal:AbortSignal.timeout(10000)});
 if (!auth.ok) return reply({error:'Sign in to search'},401);
 const user=await auth.json();
 const text=await req.text();if(text.length>3000)return reply({error:'Request too large'},413);
 let body;try{body=JSON.parse(text)}catch{return reply({error:'Invalid JSON'},400)}
 const q=typeof body.query==='string'?body.query.trim():'';
 const page=body.page??1;
 if(q.length<3||q.length>200||!Number.isInteger(page)||page<1||page>10)return reply({error:'Enter a query of 3–200 characters and a page from 1–10'},400);
 const cacheKey=JSON.stringify([q.toLowerCase(),page]);
 const dbHeaders={apikey:admin,Authorization:'Bearer '+admin,'Content-Type':'application/json'};
 const cacheUrl=new URL(url+'/rest/v1/paper_search_cache');cacheUrl.searchParams.set('cache_key','eq.'+cacheKey);cacheUrl.searchParams.set('expires_at','gt.'+new Date().toISOString());cacheUrl.searchParams.set('select','response');
 const cached=await fetch(cacheUrl,{headers:dbHeaders,signal:AbortSignal.timeout(10000)});if(!cached.ok)return reply({error:'Search cache unavailable'},503);
 const rows=await cached.json();if(rows.length)return reply(rows[0].response);
 const budget=await fetch(url+'/rest/v1/rpc/take_paper_search_budget',{method:'POST',headers:dbHeaders,body:JSON.stringify({user_id:user.id}),signal:AbortSignal.timeout(10000)});
 if(!budget.ok)return reply({error:'Search budget unavailable'},503);
 if(!await budget.json())return reply({error:'Daily beta search limit reached. Your saved work is still available.'},429);
 const upstream=new URL('https://api.openalex.org/works');upstream.searchParams.set('search',q);upstream.searchParams.set('per_page','20');upstream.searchParams.set('page',String(page));upstream.searchParams.set('select','id,doi,title,publication_year,authorships,primary_location,open_access,referenced_works');
 const response=await fetch(upstream,{headers:{Authorization:'Bearer '+provider},signal:AbortSignal.timeout(12000)});
 if(response.status===429)return reply({error:'Paper provider limit reached. Try again later.'},429);
 if(!response.ok)return reply({error:'Paper provider unavailable'},502);
 const data=await response.json();
 const result={page,count:data.meta?.count||0,papers:(data.results||[]).map((p:any)=>({providerId:p.id,title:p.title,doi:p.doi,year:p.publication_year,authors:p.authorships?.map((a:any)=>a.author?.display_name).filter(Boolean).join(', '),venue:p.primary_location?.source?.display_name||'',url:p.primary_location?.landing_page_url||p.doi||'',openAccess:!!p.open_access?.is_oa,references:p.referenced_works||[],provenance:'OpenAlex'}))};
 await fetch(url+'/rest/v1/paper_search_cache',{method:'POST',headers:{...dbHeaders,Prefer:'resolution=merge-duplicates'},body:JSON.stringify({cache_key:cacheKey,response:result,expires_at:new Date(Date.now()+86400000).toISOString()}),signal:AbortSignal.timeout(10000)});
 return reply(result);
 }catch{return reply({error:'Search could not complete. Your saved work is unaffected.'},503)}
});
