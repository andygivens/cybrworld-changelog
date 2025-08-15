
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
- `AUTHOR_PASSWORD` (required for author login)

## API Endpoints

- `/author/login` (POST): Author login. Expects `{ password }` in body. Returns `{ success: true }` if password matches `AUTHOR_PASSWORD`.
- `/updates` (CRUD): Manage updates.
- `/media` (CRUD): Manage media files.
- `/users` (CRUD): Manage users.
- `/tags` (GET): Get all tags.

## Testing
Run backend tests with:
```bash
npm test
```
Currently only `updateController` is covered. Add more tests for controllers and routes as needed.

## Docker
Build and run the backend container:
```bash
docker build -t cybrworld-changelog-backend .
docker run -p 4000:4000 cybrworld-changelog-backend
```

## Housekeeping
- All admin-related files/routes have been renamed to author terminology.
- Unused files and obsolete routes have been removed.
- Add comments and expand unit tests for better maintainability.
