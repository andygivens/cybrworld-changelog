# CYBRWorld ChangeLog Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables (see below).
3. Run the server:
   ```bash
   npm start
   ```

## Environment Variables
- `DB_HOST` (default: localhost)
- `DB_NAME` (default: changelog)
- `DB_USER` (default: changelog)
- `DB_PASSWORD` (default: changelog)
- `S3_ENDPOINT` (e.g., http://minio:9000)
- `S3_ACCESS_KEY` (e.g., minioadmin)
- `S3_SECRET_KEY` (e.g., minioadmin)
- `S3_BUCKET` (e.g., changelog-media)

## Testing
Run tests with:
```bash
npm test
```

## Docker
Build and run the backend container:
```bash
docker build -t cybrworld-changelog-backend .
docker run -p 4000:4000 cybrworld-changelog-backend
```
