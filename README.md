<div align="center">

# EnaaConnect

### A centralized digital community for ENAA students

Connect, collaborate, organize events, share knowledge, and stay informed through one student-focused platform.

[Software Requirements Specification](./EnaaConnect_SRS.pdf) ·
[Use Case Diagram](./docs/diagrams/use-case-diagram.mmd) ·
[Class Diagram](./docs/diagrams/class-diagram.mmd)

</div>

---

## About EnaaConnect

EnaaConnect is a full-stack web platform designed to improve communication and collaboration within the ENAA school community.

Important announcements, student activities, events, and discussions are often spread across different platforms. EnaaConnect brings these interactions into one organized and accessible environment where students can share resources, discover events, manage their profiles, and follow campus activity.

> EnaaConnect is under active development. The Software Requirements Specification describes the complete product vision, while the implementation-status section below describes what currently exists in this repository.

## Documentation

- [Software Requirements Specification (PDF)](./EnaaConnect_SRS.pdf)
- [Use Case Diagram](./docs/diagrams/use-case-diagram.mmd)
- [Class Diagram](./docs/diagrams/class-diagram.mmd)

The SRS covers the project context, requirements, user roles, user stories, database design, security requirements, technology choices, and development methodology.

## Problem Statement

ENAA organizes activities throughout the academic year, but important information can be missed because communication is distributed across multiple platforms.

EnaaConnect addresses several problems:

- Announcements are scattered across different communication channels.
- Students lack a centralized collaboration space.
- Events can be difficult to organize and discover.
- Student clubs have limited visibility.
- Students have limited ways to find classmates with shared interests.
- Community activity is difficult to follow consistently.

## Project Objectives

- Improve communication between students.
- Simplify event creation and participation.
- Encourage academic collaboration.
- Promote student activities and communities.
- Improve access to campus information.
- Increase student engagement.
- Provide secure authentication and authorization.
- Offer a responsive experience across common devices.

## Implementation Status

The SRS represents the planned product scope. This table reflects the functionality currently present in the repository.

| Feature | Backend | Frontend | Status |
|---|---:|---:|---|
| Registration and login | Yes | In progress | Active development |
| JWT session authentication | Yes | In progress | Active development |
| Forgot/reset password | Yes | Not connected | Backend available |
| Profile management | Yes | Reference UI available | Frontend pending |
| Profile picture upload | Yes | Not connected | Backend available |
| Student feed | Yes | Reference-based UI | API integration pending |
| Post images, likes, and comments | Yes | Reference-based UI | API integration pending |
| Event creation and participation | Yes | Reference UI available | API integration pending |
| Administrator event review | Yes | Reference UI available | API integration pending |
| Notifications | Yes | Reference UI available | API integration pending |
| Real-time user connections | Partial | Not connected | Socket.IO foundation |
| Clubs and communities | No | UI-only reference | Planned |
| Private/group messaging | No | UI-only reference | Planned |
| Trip planning | No | UI-only reference | Planned |
| Global search | No | UI-only reference | Planned |
| Full administration panel | Partial | UI-only reference | Planned |

Features without backend support remain presentational until corresponding backend functionality is implemented.

## Core Features

### Authentication

The backend currently supports student registration, secure login, JWT authentication, current-user retrieval, logout, forgot-password email, and password reset. Registration is restricted to valid `@enaa.ma` email addresses.

### Profile Management

Students can maintain their full name, field of study, academic year, profile picture, biography, and interests. Profile pictures are uploaded through Cloudinary.

### Student Feed

The feed backend supports creating and retrieving posts, editing and deleting owned posts, uploading images, toggling likes, and creating and retrieving comments.

### Event Management

Students can create events, view approved events, join or leave events, and view participants. Administrators can retrieve and review pending events.

### Notifications

Authenticated users can retrieve their notifications, mark one notification as read, or mark all notifications as read.

### Planned SRS Features

The complete SRS also includes clubs, private and group messaging, file sharing, trip planning, global search, content reporting, moderation, and extended administration functionality. These features are part of the product vision but are not fully implemented in the current backend.

## User Roles

### Currently implemented

| Role | Current permissions |
|---|---|
| `student` | Manage a profile, create and interact with posts, create events, and join or leave events |
| `admin` | Review pending events and access administrator-restricted operations |

The SRS also describes a club-leader role. This role is planned but is not currently included in the backend role enum.

## Technology Stack

### Frontend

- React
- JavaScript and JSX
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js and Express.js
- MongoDB and Mongoose
- JSON Web Tokens and bcrypt
- Zod validation
- Multer and Cloudinary
- Socket.IO
- Nodemailer

### Design

- Responsive reference-based interface
- DM Sans body typography
- Space Grotesk display typography
- IBM Plex Mono technical accents
- Lucide icon system
- Shared Tailwind CSS design tokens

## Project Structure

```text
EnaaConnect/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── layouts/
│       ├── pages/
│       └── services/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── responses/
│   ├── routes/
│   ├── utils/
│   └── zodValidations/
├── docs/
│   └── diagrams/
├── EnaaConnect_SRS.pdf
└── README.md
```

The local `ui-reference` directory is the visual source of truth during frontend development and is intentionally excluded from Git.

## API Overview

The REST API uses the `/api` prefix. Protected endpoints require:

```http
Authorization: Bearer <JWT>
```

### Authentication

| Method | Endpoint | Authentication | Purpose |
|---|---|---:|---|
| `POST` | `/api/auth/register` | No | Create a student account |
| `POST` | `/api/auth/login` | No | Authenticate a user |
| `POST` | `/api/auth/logout` | Yes | Complete the logout request |
| `GET` | `/api/auth/me` | Yes | Retrieve the current user |
| `POST` | `/api/auth/forgot-password` | No | Request a password-reset email |
| `PATCH` | `/api/auth/reset-password/:token` | No | Reset a password |

### Profiles

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/users/:userId` | Retrieve a public student profile |
| `PATCH` | `/api/users/update-profile` | Update the current profile |
| `PATCH` | `/api/users/profile-picture` | Upload a profile picture |

### Posts

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/posts` | Retrieve posts |
| `POST` | `/api/posts` | Create a post |
| `PATCH` | `/api/posts/:postId` | Update an owned post |
| `DELETE` | `/api/posts/:postId` | Delete an owned post |
| `PATCH` | `/api/posts/:postId/like` | Toggle a post like |
| `POST` | `/api/posts/:postId/comments` | Create a comment |
| `GET` | `/api/posts/:postId/comments` | Retrieve comments |

### Events

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/events` | Retrieve approved events |
| `POST` | `/api/events` | Create an event |
| `GET` | `/api/events/pending` | Retrieve pending events as an administrator |
| `GET` | `/api/events/:eventId/participants` | Retrieve event participants |
| `POST` | `/api/events/:eventId/join` | Join an event |
| `DELETE` | `/api/events/:eventId/join` | Leave an event |
| `PATCH` | `/api/events/:eventId/review` | Approve or reject an event |

### Notifications

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/notifications` | Retrieve the current user's notifications |
| `PATCH` | `/api/notifications/:notificationId/read` | Mark one notification as read |
| `PATCH` | `/api/notifications/read-all` | Mark all notifications as read |

## Getting Started

### Prerequisites

- Node.js with a version compatible with Vite 8
- npm
- MongoDB or MongoDB Atlas
- Cloudinary account for image uploads
- SMTP email account for password-reset emails

### Clone the repository

```bash
git clone https://github.com/elhajjame/EnaaConnect.git
cd EnaaConnect
```

### Install dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### Configure environment variables

Create `server/.env`:

```env
PORT=3000
CLIENT_URL=http://localhost:5173

CONNECT_DB=your_mongodb_connection_string

JWT_SECRET=your_private_jwt_secret
JWT_EXPIRES_IN=7d

EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USERNAME=your_smtp_username
EMAIL_PASSWORD=your_smtp_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit `.env` files or secret values.

### Start the backend

```bash
npm run server
```

The backend defaults to `http://localhost:3000`.

### Start the frontend

Open another terminal:

```bash
npm run client
```

The Vite development server normally runs at `http://localhost:5173`. Its `/api` proxy forwards local requests to the backend on port `3000`.

For a deployed frontend, an optional API URL can be configured with:

```env
VITE_API_URL=https://your-api-domain.example/api
```

Never place backend secrets in frontend environment variables. Every `VITE_` variable is exposed to the browser.

## Available Scripts

### Root

```bash
npm run client
npm run server
```

### Frontend

```bash
npm run dev --prefix client
npm run build --prefix client
npm run lint --prefix client
npm run preview --prefix client
```

### Backend

```bash
npm run dev --prefix server
npm run start --prefix server
```

Automated backend tests have not yet been configured.

## Security

The current implementation includes:

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Student and administrator authorization middleware
- Ownership checks for post updates and deletion
- Strict request validation with Zod
- Restricted `@enaa.ma` registration emails
- Hashed, expiring password-reset tokens
- Image type, count, and size validation
- Environment-based secret configuration

Current limitations:

- The backend does not provide refresh tokens.
- Logout does not blacklist or invalidate an issued JWT.
- Email verification is described by the SRS but is not exposed through an API route.
- Production HTTP CORS or reverse-proxy configuration must still be finalized.

## Non-Functional Requirements

- **Performance:** responsive interactions and efficient database access.
- **Reliability:** consistent API responses, validation, and error handling.
- **Usability:** clear navigation and consistent loading, empty, error, and disabled states.
- **Compatibility:** responsive support for modern desktop, tablet, and mobile browsers.

## Roadmap

### Current priority

- Complete frontend authentication
- Restore authenticated sessions
- Protect application routes
- Connect login and registration
- Add logout and password recovery

### Next priorities

- Connect profile management
- Replace feed mock data with backend posts
- Connect likes and comments
- Connect event management
- Connect notifications
- Add responsive loading, empty, and error states

### Future SRS scope

- Clubs and communities
- Messaging
- Trip planning
- Global search
- Reporting and moderation
- Extended administrator controls

## Author

**Mehdi El Hajjame**

Full-stack developer and project author.

## Project Information

| Item | Value |
|---|---|
| Project | EnaaConnect |
| Document version | 1.0 |
| Project type | Projet fil rouge |
| SRS date | July 2026 |
| Status | Active development |

---

<div align="center">

Built to connect, support, and strengthen the ENAA student community.

[Read the complete SRS](./EnaaConnect_SRS.pdf)

</div>
