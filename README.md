
<h2 align="center"> ResCharity </h2>

## Project Overview

`ResCharity` is a secure, blockchain-based charity donation platform built with Next.js and powered by ResVault from ResilientDB. The platform provides transparent and traceable donation tracking while ensuring secure transactions.

---

## Getting Started

### Step 1: Add the `.env` File

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
MONGODB_URI=Your MongoDB connection string
EMAIL_USER=Your email
EMAIL_PASS=Your 16-digit Google Apps password
PORT=3001
```

---

### Step 2: Environment Setup

#### 1. Open a terminal and run the following commands:

```bash
npm install
npm install chart.js react-chartjs-2
npm run build
npm start
```

#### 2. Open another terminal and run the following command:

```bash
node src/api/sync.js
```

---

## Accessing the Application

Once the setup is complete, open a browser and navigate to:

[http://localhost:3000](http://localhost:3000)

---

## Technical Stack

### Frontend
- Next.js 12.3.4
- React 17.0.2
- React Bootstrap
- Chart.js
- React Chartjs-2

### Backend
- Node.js
- Express
- MongoDB
- Nodemailer
- Multer

### Security
- CORS protection
- File upload restrictions
- Email authentication
- Environment variable protection
- Blockchain transaction verification

## API Endpoints

### Email Service
- POST `/send-email`
  - Handles form submissions with file attachments
  - Supports multiple file uploads
  - Sends automated email notifications
  - Performs cleanup of temporary files

### File Upload Specifications
- Maximum file size: 10MB
- Maximum files per request: 10
- Supported formats:
  - Images: JPEG, PNG, GIF, WebP
  - Documents: PDF, DOC, DOCX
  - Text: Plain text

---

## Notes

1. Ensure the `.env` file contains valid credentials for both MongoDB and email settings.
2. The provided `MONGODB_URI` is a placeholder. Replace it with your actual MongoDB cluster connection string.
3. For Google email credentials, generate a 16-digit app-specific password via your Google account.

---

## Developers

Feel free to report issues or contribute to this project by submitting a pull request or opening an issue.
