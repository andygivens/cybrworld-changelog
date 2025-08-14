# CYBRWorld ChangeLog – Design Document

---

## Collaboration & Workflow

As a Principle Engineer, I prioritize maintainable, well-tested code and thoughtful architecture. I will collaborate with the product designer to clarify product requirements, ask follow-up questions, and ensure a shared understanding before mapping out technical solutions. Our workflow:
1. Product designer provides broad instructions or feature ideas.
2. I ask clarifying questions to fully understand the customer need, edge cases, and desired experience.
3. Once clear, I map out the architecture—including high-level UML diagrams and sequence diagrams for data/event flow.
4. Product designer reviews and approves the plan.
5. I begin development, following best practices (TDD, code quality, documentation).

---

## Overview
CYBRWorld ChangeLog is a web application for communicating updates and changes to the CYBRWorld demo environment. It features an infinite scroll of updates, expandable details, role-based access for users and administrators, and secure media storage using S3-compatible cloud services.

---

## Features

- **User View:**  
  - Infinite scroll of updates  
  - Expandable cards for more detail  
  - Search and filter by tags

- **Admin View:**  
  - Create, edit, and delete updates  
  - Upload screenshots and add links  
  - Manage tags

- **RBAC:**  
  - Two roles: user and admin  
  - SSO authentication (mocked for MVP)

- **Media Storage:**  
  - S3-compatible (MinIO for local, AWS S3 for production)  
  - Media URLs stored in database

---

## Architecture

```
+-------------------+        +-------------------+        +-------------------+        +-------------------+
|   Frontend (React)| <----> |   Backend (API)   | <----> |   PostgreSQL DB   |        |   S3 Storage      |
|   [Nginx]         |        |   [Node.js]       |        |                   |        | (MinIO/S3)        |
+-------------------+        +-------------------+        +-------------------+        +-------------------+
```

---

## Data Models

**Update**
- id (UUID)
- title (string)
- description (text)
- date (timestamp)
- tags (array of strings)
- links (array of strings)
- author_id (UUID)
- media (array of Media objects)

**Media**
- id (UUID)
- url (string)
- type (image, file, etc.)
- update_id (UUID)

**User**
- id (UUID)
- name (string)
- email (string)
- role (user, admin)
- sso_id (string)

---

## API Endpoints

- `GET /updates` — List updates
- `GET /updates/:id` — Get update details
- `POST /updates` — Create update (admin only)
- `PUT /updates/:id` — Edit update (admin only)
- `DELETE /updates/:id` — Delete update (admin only)
- `POST /media` — Upload media (admin only)
- `GET /media/:id` — Get media info
- `GET /tags` — List all tags
- `GET /users/me` — Get current user info

---

## Sequence Diagrams

**Viewing Updates**
```
User -> Web Frontend: Open ChangeLog
Web Frontend -> API Server: GET /updates
API Server -> Database: Query updates
Database -> API Server: Return updates
API Server -> Web Frontend: Return updates
Web Frontend -> User: Display infinite scroll
```

**Admin Creating/Editing Update**
```
Admin -> Web Frontend: Login via SSO
Web Frontend -> API Server: Authenticate (SSO)
API Server -> Auth Service: Validate SSO, check role
Auth Service -> API Server: Return admin role
API Server -> Web Frontend: Grant access to admin page

Admin -> Web Frontend: Create/Edit update, upload screenshot
Web Frontend -> API Server: POST/PUT /updates (with media)
API Server -> Media Service: Store screenshot
Media Service -> API Server: Return media URL
API Server -> Database: Save update (with media URL)
Database -> API Server: Confirm save
API Server -> Web Frontend: Confirm update
```

---

## Deployment

- Containerized with Docker and Docker Compose
- Backend, frontend, database, and MinIO (S3-compatible) services
- Easy migration to AWS S3 for production

---

## Branding

- UI follows CyberArk’s branding (colors, typography, style)
- Clean, professional, modern design

---

Let me know if you want to add, edit, or export any other details!
