# REI free cloud setup

The website currently works locally. These files PREPARE a cloud foundation; they do not enable sign-in, synchronization, or live search. No accounts were created, migrations applied, functions deployed, or secrets added during this update.

## What to create
1. Create a Supabase account and a new Free project. Keep paid upgrades disabled. Save its database password privately.
2. Create an OpenAlex account and obtain its free API key from https://openalex.org/settings/api. Do not paste the key into chat, browser JavaScript, or GitHub.
3. Keep the local app running at http://127.0.0.1:4173 while configuring. A public website host can be chosen separately.

## Prepared files
- `supabase/migrations/202609200001_research.sql`: private project storage with row-level ownership policies, a five-project limit, revision counters, server-only search cache, and atomic daily request budgets.
- `supabase/functions/paper-search/index.ts`: authenticated OpenAlex search proxy with validated inputs, a 24-hour metadata cache, timeouts, and explicit service/quota errors. Initial endpoint supports text search and pagination; DOI-specific lookup, abstracts, year/open-access filtering are further work.
- `supabase/config.toml`: keeps platform JWT verification enabled.

## Configure only after the project exists
1. Review and apply the SQL migration through the Supabase SQL editor or CLI to a new project. This migration is not intended to be rerun over existing tables.
2. In Edge Function secrets set `OPENALEX_API_KEY` and `REI_ALLOWED_ORIGIN` (initially `http://127.0.0.1:4173`). Supabase provides its URL and server keys to hosted functions. Never put service-role keys into frontend files.
3. Deploy the paper-search function with JWT verification enabled. Its contract is authenticated POST JSON `{ "query": "student wellbeing", "page": 1 }`; it returns normalized papers and reference IDs. Unauthenticated calls must fail.
4. Set up Google OAuth under Supabase Auth, using a Google OAuth web client and the exact Supabase callback URL displayed in the dashboard. Configure the allowed application redirect URL explicitly. User account creation and consent are completed by the owner.
5. Before wiring frontend sign-in and sync, test two different users: neither must read or update the other's project. Test the fifth-project limit, stale revisions, missing authentication, provider failures, and request quotas.

## Frontend work still required
Implement the Google sign-in/callback UI; isolate account caches from guest work; explicit guest import; push/pull sync with revision comparison; recoverable conflict copies; and Discover results with save-to-library actions. The current local library and proposal editor do not call the cloud function. Do not label cloud sync as working until this integration and two-account tests pass.

Cloud updates must filter by both project ID and expected revision. If no row is updated, preserve the local draft and fetch the remote version for user resolution. Never upload guest work silently.

## Free-use constraints
The prepared proxy caps uncached requests at 20 per user and 100 total per UTC day. This is not a provider credit guarantee: inspect OpenAlex's current usage dashboard and remain on its free allowance. No paid fallback is implemented. Review cache growth and periodically delete expired cache rows. Supabase Free can pause on inactivity and does not include automatic database backups; retain project JSON exports.

Current references: https://supabase.com/pricing · https://supabase.com/docs/guides/functions/auth · https://help.openalex.org/api/authentication/
