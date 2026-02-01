# Immutable Storage

A secure web application for storing and managing documents and text entries with multi-factor authentication.

## Features

- **Multi-Factor Authentication**: 3-step verification process (DOB, Auth Code, 2FA)
- **File Upload**: Support for multiple file types with drag-and-drop interface
- **Text Storage**: Add and store text entries
- **Immutable Storage**: All entries are permanently stored with timestamps
- **Local Storage**: Data persists in browser's local storage
- **Download Support**: Retrieve uploaded files

## Authentication

The application requires three authentication steps:

1. **Date of Birth**: `23/june/2010`
2. **Authorization Code**: `6049382175294853`
3. **Two-Factor Code**: `326790`

## Installation

```bash
npm install
```

## Usage

### Development Server

```bash
npm run dev
```

Serves the application at `http://localhost:3000`

### Python Server

```bash
npm start
```

Serves the application at `http://localhost:8000`

### Express Server (Optional)

```bash
node server.js
```

Runs Express server with file upload API at `http://localhost:3000`

## File Structure

```
├── index.html          # Main HTML interface
├── app.js             # Client-side JavaScript logic
├── server.js          # Express server (optional)
├── package.json       # Project configuration
└── README.md          # This file
```

## API Endpoints (Express Server)

- `POST /upload` - Upload files
- `POST /text` - Add text entries
- `GET /storage` - Retrieve all stored items

## Storage Format

Items are stored with the following structure:

```javascript
{
  type: 'file' | 'text',
  name: 'filename.ext',        // For files only
  content: 'text or data URL', 
  timestamp: '2026-02-01T12:41:00.735Z'
}
```

## Security Notes

- Authentication credentials are hardcoded for demonstration purposes
- Files are stored as base64 data URLs in localStorage
- No server-side persistence in client-only mode
- Consider implementing proper authentication for production use

## Browser Compatibility

- Modern browsers with localStorage support
- File API support for file uploads
- ES6+ JavaScript features
