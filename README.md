# Photofine Album Creator - Backend Server

This is the backend server for the Photofine Album Creator application. It provides a RESTful API for managing albums and connects to a MongoDB database.

## Technology Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- CORS

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the server directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/photofine
NODE_ENV=development
```

For production, update the `MONGODB_URI` to point to your production MongoDB instance.

## Running the Server

### Development Mode

```
npm run dev
```

This starts the server with nodemon, which automatically restarts when file changes are detected.

### Production Mode

```
npm start
```

## API Endpoints

### Albums

- `GET /api/albums` - Get all albums
- `GET /api/albums/:albumId` - Get album by ID
- `POST /api/albums` - Create a new album
- `PUT /api/albums/:albumId` - Update an album
- `DELETE /api/albums/:albumId` - Delete an album

### Health Check

- `GET /api/health` - Check server health

## Data Models

### Album

```javascript
{
  id: String,              // Unique identifier
  name: String,            // Album name
  description: String,     // Album description (optional)
  coverId: String,         // ID of the cover image
  coverUrl: String,        // URL of the cover image
  imageCount: Number,      // Number of images in the album
  images: [                // Array of images
    {
      id: String,          // Image identifier
      publicId: String,    // Cloudinary public ID
      url: String,         // Image URL
      width: Number,       // Image width
      height: Number       // Image height
    }
  ],
  createdAt: Date          // Creation timestamp
}
``` 