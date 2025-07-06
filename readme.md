# BuzzNet - Social Connect Platform Backend

![BuzzNet Logo](https://res.cloudinary.com/dnkhxafkz/image/upload/v1734764591/jsni2rcrn4rjv7wd73hg.png)

BuzzNet is a modern social connect platform backend built with Node.js, Express, and PostgreSQL. This robust API powers user interactions, content sharing, and real-time notifications.

## ✨ Features

- **🔐 Authentication**: JWT-based auth with email verification (OTP)
- **📝 Content Management**: CRUD operations for posts with media
- **💬 Social Features**: Likes, comments, and user following
- **🔔 Notifications**: Real-time push notifications via FCM
- **☁️ Media Handling**: Cloudinary integration for file uploads
- **🛡️ Admin Panel**: Content moderation and user management

## 🛠️ Tech Stack

### Core

- **Node.js** (v16+)
- **Express.js**
- **PostgreSQL** (Sequelize ORM)
- **JWT Authentication**

### Key Packages

| Package              | Purpose            |
| -------------------- | ------------------ |
| `cloudinary`         | Media storage      |
| `firebase-admin`     | Push notifications |
| `nodemailer`         | Email services     |
| `swagger-ui-express` | API documentation  |
| `express-formidable` | File uploads       |

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- PostgreSQL v12+
- Cloudinary account
- Firebase project (for FCM)

### Installation

```bash
# Clone repository
git clone https://github.com/rid137/buzznet-backend.git
cd buzznet-backend

# Install dependencies
npm install

# Configure environment
cp .env
# Edit .env with your credentials
# App
`PORT`
`JWT_SECRET_KEY`
`JWT_EXPIRES_IN`

# Database
`DB_USERNAME`
`DB_PASSWORD`
`DB_NAME`
`DB_HOST`

# Cloudinary
`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

# Firebase (FCM)
`FIREBASE_PRIVATE_KEY`
`FIREBASE_CLIENT_EMAIL`

# Email
`EMAIL_USER`
`EMAIL_PASS`

# Run migrations
npm run migrate

# Start development server
npm run dev
```
