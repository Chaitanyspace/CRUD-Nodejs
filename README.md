# 🚚 TransLoad Secure Lite

A modern, secure file transfer application built with React, Redux Toolkit, and AWS S3. This application provides a user-friendly interface for secure file uploads with authentication and upload management features.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)

## ✨ Features

### 🔐 Authentication System
- **Secure Login**: Email/password based authentication
- **Session Management**: Persistent login sessions with cookies
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Error Handling**: User-friendly error messages for invalid credentials

### 📤 File Upload System
- **Direct S3 Upload**: Files uploaded directly to AWS S3 using presigned URLs
- **Progress Tracking**: Real-time upload status updates
- **File Type Support**: Support for all file types with proper MIME type handling
- **Secure Transfer**: Encrypted uploads with AWS KMS support
- **Upload Metadata**: Automatic tracking of upload details

### 📋 Upload Management
- **Upload History**: View all previous uploads with timestamps
- **File Access**: Direct links to uploaded files
- **Upload Tracking**: Monitor upload status and completion
- **Clean Interface**: Organized list view of all uploads

### 🎨 User Interface
- **Modern Design**: Clean, responsive UI built with Tailwind CSS
- **Navigation**: Intuitive navigation between different sections
- **Mobile Friendly**: Responsive design that works on all devices
- **Loading States**: Visual feedback during operations

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library
- **Redux Toolkit 1.9.5** - State management
- **React Router DOM 6.14.1** - Client-side routing
- **Axios 1.4.0** - HTTP client
- **Tailwind CSS 3.4.18** - Utility-first CSS framework

### Backend Integration
- **Node.js** - Backend server (referenced but not included in this frontend)
- **MySQL** - Database for user and upload metadata
- **AWS S3** - File storage with presigned URLs
- **AWS KMS** - Server-side encryption support

## 📡 API Documentation

### Authentication Endpoints

#### `POST /api/auth/login`
Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Login successful"
}
```

#### `POST /api/auth/logout`
Logout current user and clear session.

**Response:**
```json
{
  "ok": true,
  "message": "Logged out successfully"
}
```

### Upload Endpoints

#### `GET /api/upload/presign`
Generate presigned URL for direct S3 upload.

**Query Parameters:**
- `filename` - Name of the file to upload
- `contentType` - MIME type of the file

**Example:**
```
GET /api/upload/presign?filename=document.pdf&contentType=application/pdf
```

**Response:**
```json
{
  "url": "https://s3.amazonaws.com/bucket/presigned-url",
  "key": "uploads/user123/document.pdf",
  "expires": 3600
}
```

#### `POST /api/uploads/complete`
Save upload metadata to database after successful S3 upload.

**Request Body:**
```json
{
  "key": "uploads/user123/document.pdf",
  "fileName": "document.pdf",
  "s3Url": "https://s3.amazonaws.com/bucket/uploads/user123/document.pdf"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Upload metadata saved"
}
```

#### `GET /api/uploads`
Retrieve list of user's uploads.

**Response:**
```json
{
  "uploads": [
    {
      "id": 1,
      "file_name": "document.pdf",
      "s3_url": "https://s3.amazonaws.com/bucket/uploads/user123/document.pdf",
      "created_at": "2023-12-01T10:30:00Z"
    }
  ]
}
```

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Transsloads/src
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_KMS_KEY_ID=your-kms-key-arn
```

4. **Start the development server:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:3000` |
| `REACT_APP_KMS_KEY_ID` | AWS KMS key ARN for encryption | (optional) |

### Tailwind CSS Configuration
The project uses Tailwind CSS for styling. Configuration is available in `tailwind.config.js` and PostCSS is configured in `postcss.config.js`.

## 📖 Usage

### 1. Login
- Navigate to `/login`
- Enter your email and password
- Click "Login" to authenticate

### 2. Upload Files
- After login, go to `/upload`
- Select a file using the file picker
- Click "Upload" to start the process
- Monitor progress through status messages

### 3. View Uploads
- Navigate to `/uploads`
- View all your previous uploads
- Click "Open" to access files directly from S3

## 📁 Project Structure

```
src/
├── api/
│   └── api.js                 # API client configuration
├── components/
│   ├── Login.jsx             # Authentication component
│   ├── ProtectedRoute.jsx    # Route protection wrapper
│   ├── UploadForm.jsx        # File upload interface
│   └── UploadList.jsx        # Upload history display
├── features/
│   ├── authSlice.js          # Authentication state management
│   └── uploadsSlice.js       # Upload state management
├── App.jsx                   # Main application component
├── index.js                  # Application entry point
├── main.css                  # Global styles
├── store.js                  # Redux store configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## 🔒 Security Features

### Authentication Security
- **Session-based Authentication**: Secure cookie-based sessions
- **Protected Routes**: Automatic redirection for unauthorized access
- **Input Validation**: Client-side validation for user inputs

### File Upload Security
- **Presigned URLs**: Time-limited, secure upload URLs
- **Direct S3 Upload**: Files bypass the server, reducing load
- **AWS KMS Encryption**: Optional server-side encryption support
- **Content Type Validation**: Proper MIME type handling

### Data Protection
- **Secure Headers**: Proper Content-Type and CORS configuration
- **Error Handling**: Secure error messages without sensitive data exposure
- **Environment Variables**: Sensitive configuration externalized

## 🚀 Build and Deploy

### Development Build
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation above
- Review the configuration section for setup issues

---

**TransLoad Secure Lite** - Secure, fast, and reliable file transfers made simple! 🚚✨
