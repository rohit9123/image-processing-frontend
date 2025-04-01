
# CSV Processing Platform


A modern web application for CSV file processing with real-time progress tracking and secure file management.

## Features ✨

- 🚀 Drag-and-drop CSV file upload
- 📊 Real-time processing status updates
- 🔄 Progress bar with percentage tracking
- 📁 Upload history with local storage
- 📋 One-click request ID copying
- 🛡️ Secure file handling
- 📱 Fully responsive design
- 🎨 Smooth animations and transitions

## Installation ⚙️

1. Clone the repository:
```bash
git clone https://github.com/yourusername/csv-processor.git
cd csv-processor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage 📖

### Upload CSV Files
- Drag & drop or click to select CSV files.
- Max file size: 10MB
- Supported formats: .csv

### Track Progress
- Real-time progress percentage
- Processing status indicators
- Detailed timestamp tracking

### Manage Files
- View upload history
- Copy request IDs
- Access status and download pages

## API Endpoints 🔌

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | /api/upload           | Upload CSV file                   |
| GET    | /api/status/:id       | Get processing status             |
| GET    | /api/download/:id     | Download processed files          |

### Example Response (Status Check):

```json
{
  "status": "processing",
  "processedProducts": 15,
  "totalProducts": 30,
  "createdAt": "2023-08-20T12:34:56.789Z",
  "updatedAt": "2023-08-20T12:35:30.123Z"
}
```

## Technologies Used 🛠️

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion (Animations)
- React Dropzone (File upload)
- React Hot Toast (Notifications)

### Backend
- Node.js/Express
- Axios (HTTP client)
- JSON2CSV (Data conversion)

### Contributing 🤝
Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Backend Implementation ⚙️

The backend is built with Node.js/Express and provides RESTful API endpoints for file processing management.

### Key Features
- **File Upload Handling**  
  - CSV file validation and processing
  - Progress tracking with WebSockets
  - Request ID generation for tracking

- **Processing Status System**  
  - Real-time status updates (pending/processing/completed)
  - Progress percentage calculation
  - Timestamp tracking (createdAt/updatedAt)

- **Security Measures**  
  - Rate limiting (100 requests/15min)
  - File size validation (10MB max)
  - CSV format verification
  - Redis caching for frequent status checks

### Technologies
- **Core**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Redis (for caching)

- **Key Packages**
  - `multer` - File upload handling
  - `json2csv` - CSV conversion
  - `uuid` - Request ID generation
  - `cors` - Cross-origin support
  - `dotenv` - Environment management

### Environment Setup

Create a `.env` file with the following values:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/csv-processor
REDIS_URL=redis://localhost:6379
UPLOAD_LIMIT=10mb
JWT_SECRET=your_secret_key

# GCP Environment Variables
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/credentials.json
GCP_PROJECT_ID=your-gcp-project-id
GCP_BUCKET_NAME=your-bucket-name
```

### GCP Setup
- **GOOGLE_APPLICATION_CREDENTIALS:** Path to the JSON credentials file for your GCP service account.
- **GCP_PROJECT_ID:** Your Google Cloud Project ID.
- **GCP_BUCKET_NAME:** The name of your Google Cloud Storage bucket for storing files.

### Additional Backend Functionality:
- **File Validation:** The backend uses `multer` for CSV file upload and validation, including checking for size and CSV format.
- **Real-Time Status Updates:** The backend uses WebSockets for sending real-time updates on file processing.
- **UUID Generation:** Unique request IDs are generated for each upload to track status.
- **Rate Limiting:** Rate limiting is implemented with a maximum of 100 requests every 15 minutes to prevent abuse.
- **Redis Caching:** Redis is used for caching frequently checked processing statuses to reduce load on the database.

---
