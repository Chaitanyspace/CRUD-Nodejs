# TransLoad Secure Lite — React UI

This UI is a minimal React + Redux frontend for the TransLoad Secure Lite backend.
It uses cookie-based JWT auth (HTTP-only), presigned S3 uploads, and stores upload metadata via backend endpoints.

Quick start:
1. Create a React app (CRA or Vite). Copy the files into `src/` and add `tailwind` config.
2. Install deps: `npm install` (see package.json)
3. Add `.env` in frontend root:
   - `REACT_APP_API_URL=http://localhost:3000` (or leave blank to use CRA proxy)
   - `REACT_APP_KMS_KEY_ID=arn:...` (optional)
4. Start the app: `npm start`
