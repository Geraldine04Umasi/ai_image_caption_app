# AI Image Caption Generator 🤖✨

A full-stack web application that allows users to upload an image and automatically receive an AI-generated caption, tags, and confidence score. Images are stored in the cloud and results are saved locally for history tracking.

## 🚀 Tech Stack

### Frontend
- **Next.js 16** — React framework
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Modern UI components
- **TypeScript** — Type safety

### Backend
- **NestJS** — Modular Node.js framework
- **TypeScript** — Type safety
- **Multer** — File handling

### Cloud & AI
- **AWS S3** — Image storage
- **Groq API** — AI vision model (`meta-llama/llama-4-scout-17b-16e-instruct`)

## ✨ Features

- 📤 Drag & drop or click to upload images
- 🔍 AI-generated caption for each image
- 🏷️ Automatic tag detection
- 📊 Confidence score with progress bar
- 🕓 Local history of analyzed images
- 📋 One-click caption copy
- 📱 Fully responsive design
- 🌙 Dark mode UI

## 📁 Project Structure
```
ai-image-caption-app/
├── frontend/          # Next.js app
│   ├── app/
│   │   ├── page.tsx         # Home / Upload
│   │   ├── result/          # Analysis result
│   │   └── history/         # Image history
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── upload/          # Upload zone component
│   ├── lib/
│   │   └── history.ts       # localStorage management
│   ├── services/
│   │   └── api.ts           # Backend API calls
│   └── types/
│       └── caption.ts       # TypeScript interfaces
│
└── backend/           # NestJS API
    └── src/
        ├── modules/
        │   ├── upload/      # Upload orchestration
        │   ├── storage/     # AWS S3 integration
        │   └── ai/          # Groq AI integration
        ├── interfaces/      # Shared interfaces
        └── config/          # AWS configuration
```

## 🔄 App Flow
```
User uploads image
      ↓
Frontend sends POST /upload
      ↓
Backend saves image to AWS S3
      ↓
Backend sends image URL to Groq AI
      ↓
AI returns caption, tags & confidence
      ↓
Frontend displays results & saves to history
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- AWS account with S3 bucket
- Groq API key

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
GROQ_API_KEY=your-groq-api-key
```
```bash
npm run start:dev
```

Backend runs on `http://localhost:3001`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🖼️ Supported Image Formats

| Format | Supported |
|--------|-----------|
| JPG/JPEG | ✅ |
| PNG | ✅ |
| WebP | ✅ |
| GIF | ❌ |

Maximum file size: **5MB**

## 📡 API Reference

### POST /upload

Uploads an image and returns AI analysis.

**Request:** `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| file | File | Image file to analyze |

**Response:**
```json
{
  "fileName": "1234567890-image.jpg",
  "imageUrl": "https://your-bucket.s3.amazonaws.com/...",
  "caption": "A brown dog running in a grassy park.",
  "tags": ["dog", "grass", "outdoor", "park", "sunny"],
  "confidence": 0.95
}
```

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `AWS_REGION` | AWS region of your S3 bucket |
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_BUCKET_NAME` | S3 bucket name |
| `GROQ_API_KEY` | Groq API key (starts with `gsk_`) |