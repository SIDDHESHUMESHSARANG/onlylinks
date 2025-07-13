[← Prev: User Guide](user-guide.md) | [Next: Contributing Guidelines →](../contributions/contribute.md)

# OnlyLinks Technical Overview

This document provides a comprehensive technical overview of the OnlyLinks application architecture, technologies, and implementation details.

## 🏗️ Architecture Overview

OnlyLinks follows a **client-server architecture** with clear separation between frontend and backend components.

```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐
│   Frontend      │ ◄─────────────► │    Backend      │
│   (React/Vite)  │                 │  (FastAPI)      │
└─────────────────┘                 └─────────────────┘
         │                                   │
         │                                   │
         ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│   Browser       │                 │   yt-dlp        │
│   Storage       │                 │   Engine        │
└─────────────────┘                 └─────────────────┘
```

## 🎯 Technology Stack

### Frontend Stack
- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Package Manager**: pnpm
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: React Hooks
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React + React Icons

### Backend Stack
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn (ASGI)
- **Video Downloader**: yt-dlp
- **Environment**: python-dotenv
- **CORS**: FastAPI CORS middleware

### Development Tools
- **Linting**: ESLint 9.29.0
- **Type Checking**: TypeScript (jsconfig.json)
- **Version Control**: Git
- **Environment**: Separate .env files for frontend/backend

## 📁 Project Structure

```
onlyLinks/
├── source-code/
│   ├── frontend/                 # React application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/          # Reusable UI components
│   │   │   │   └── ui-objects/  # Feature-specific components
│   │   │   ├── App.jsx          # Main application component
│   │   │   ├── main.jsx         # Application entry point
│   │   │   └── index.css        # Global styles
│   │   ├── public/              # Static assets
│   │   ├── package.json         # Frontend dependencies
│   │   ├── vite.config.js       # Vite configuration
│   │   └── .env                 # Frontend environment variables
│   └── backend/                 # FastAPI server
│       ├── server.py            # Main server file
│       ├── requirements.txt     # Python dependencies
│       ├── cookies.txt          # Browser cookies for downloads
│       └── .env                 # Backend environment variables
├── documentation/               # Project documentation
├── contributions/               # Contribution guidelines
└── README.md                   # Project overview
```

## 🔧 Core Components

### Frontend Components

#### 1. App.jsx
- **Purpose**: Main application orchestrator
- **Responsibilities**:
  - State management for video data
  - API communication with backend
  - Component coordination
  - Download history management

#### 2. LinkEnter.jsx
- **Purpose**: URL input and validation
- **Features**:
  - URL input field
  - Real-time validation
  - Loading states
  - Error handling

#### 3. Result.jsx
- **Purpose**: Video preview and download interface
- **Features**:
  - Video thumbnail display
  - Format selection
  - Download functionality
  - Progress indicators
  - Glass overlay for long downloads

#### 4. DownloadHistory.jsx
- **Purpose**: Download history management
- **Features**:
  - Local storage integration
  - History display
  - URL copying
  - Collapsible sidebar

### Backend Components

#### 1. server.py
- **Purpose**: FastAPI application server
- **Endpoints**:
  - `POST /content`: Video metadata extraction
  - `POST /download`: Video download processing
- **Features**:
  - CORS configuration
  - Error handling
  - File cleanup
  - Progress tracking

#### 2. yt-dlp Integration
- **Purpose**: Video downloading engine
- **Configuration**:
  - High-quality format selection
  - Custom filename patterns
  - Performance optimizations
  - Error recovery

## 🔄 Data Flow

### 1. Video Information Flow
```
User Input URL → Frontend → Backend API → yt-dlp → Video Metadata → Frontend Display
```

### 2. Download Flow
```
User Selects Format → Frontend Request → Backend Processing → yt-dlp Download → File Response → Browser Download
```

### 3. History Management Flow
```
Download Complete → Local Storage Update → History Component Refresh → UI Update
```

## 🛡️ Security Considerations

### Frontend Security
- **Environment Variables**: Only VITE_ prefixed variables exposed
- **Input Validation**: URL validation before API calls
- **XSS Prevention**: React's built-in XSS protection
- **CORS**: Backend CORS configuration

### Backend Security
- **Input Sanitization**: URL and format validation
- **File Cleanup**: Automatic temporary file deletion
- **Error Handling**: Secure error responses
- **Rate Limiting**: Future implementation planned

### Data Privacy
- **No Server Storage**: Videos not stored on server
- **Local History**: Download history stored in browser only
- **No Tracking**: No user behavior tracking
- **Open Source**: Transparent codebase

## ⚡ Performance Optimizations

### Frontend Optimizations
- **Vite Build**: Fast development and optimized production builds
- **Component Lazy Loading**: Suspense for dynamic imports
- **Efficient State Management**: React hooks for minimal re-renders
- **CSS Optimization**: Tailwind CSS purging

### Backend Optimizations
- **Concurrent Downloads**: Multiple fragment downloads
- **Memory Management**: Streaming large files
- **Network Optimization**: Increased timeouts and retries
- **File Cleanup**: Automatic temporary file removal

### Download Optimizations
- **Format Selection**: Best quality without re-encoding
- **Chunked Downloads**: 10MB chunks for better memory usage
- **Retry Logic**: Automatic retry on failures
- **Progress Tracking**: Real-time download progress

## 🔧 Configuration Management

### Environment Variables

#### Frontend (.env)
```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

#### Backend (.env)
```env
FRONTEND_URL=http://localhost:5173
```

### Build Configuration

#### Vite Configuration
- **Development Server**: Hot module replacement
- **Production Build**: Optimized bundle generation
- **Asset Handling**: Static file serving
- **Environment**: Development/production mode switching

#### FastAPI Configuration
- **CORS**: Cross-origin resource sharing
- **Middleware**: Request/response processing
- **Error Handling**: Global exception handling
- **Logging**: Request and error logging

## 🧪 Testing Strategy

### Frontend Testing
- **Component Testing**: React component unit tests
- **Integration Testing**: API integration tests
- **E2E Testing**: User workflow testing
- **Browser Testing**: Cross-browser compatibility

### Backend Testing
- **API Testing**: Endpoint functionality tests
- **Download Testing**: Video download verification
- **Error Testing**: Error handling validation
- **Performance Testing**: Load and stress testing

## 🚀 Deployment Considerations

### Frontend Deployment
- **Static Hosting**: Vercel, Netlify, or similar
- **Build Process**: `pnpm build` for production
- **Environment**: Production environment variables
- **CDN**: Content delivery network for assets

### Backend Deployment
- **Server**: VPS, cloud platform, or container
- **Process Manager**: PM2 or systemd
- **Reverse Proxy**: Nginx or Apache
- **SSL**: HTTPS certificate configuration

### Container Deployment
- **Docker**: Containerization for consistency
- **Docker Compose**: Multi-service orchestration
- **Environment**: Container environment variables
- **Volumes**: Persistent storage configuration

## 🔄 Development Workflow

### Local Development
1. **Backend**: `uvicorn server:app --reload`
2. **Frontend**: `pnpm dev`
3. **Testing**: Manual testing and debugging
4. **Hot Reload**: Automatic code reloading

### Code Quality
- **ESLint**: JavaScript/React code linting
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit validation
- **Code Review**: Pull request reviews

### Version Control
- **Branch Strategy**: Feature branch workflow
- **Commit Messages**: Conventional commit format
- **Release Tags**: Semantic versioning
- **Changelog**: Automated change tracking

## 📊 Monitoring and Logging

### Frontend Monitoring
- **Error Tracking**: Browser error monitoring
- **Performance**: Core Web Vitals tracking
- **User Analytics**: Usage pattern analysis
- **Console Logging**: Development debugging

### Backend Monitoring
- **Request Logging**: API request/response logging
- **Error Logging**: Exception and error tracking
- **Performance Metrics**: Response time monitoring
- **Download Tracking**: Download success/failure rates

## 🔮 Future Enhancements

### Planned Features
- **User Authentication**: User account system
- **Download Queue**: Batch download processing
- **Quality Selection**: Manual quality choice
- **Playlist Support**: Multiple video downloads
- **Mobile App**: React Native application

### Technical Improvements
- **Caching**: Redis for metadata caching
- **Database**: PostgreSQL for user data
- **Microservices**: Service decomposition
- **API Versioning**: Backward compatibility
- **WebSocket**: Real-time progress updates

## 📚 Additional Resources

### Documentation
- [Installation Guide](installation-guide.md)
- [User Guide](user-guide.md)
- [API Reference](api-reference.md)
- [Contributing Guidelines](../contributions/contribute.md)

### External Dependencies
- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

This technical overview provides a foundation for understanding the OnlyLinks architecture and implementation details. For specific implementation questions, refer to the individual component documentation or the source code. 

[← Prev: User Guide](user-guide.md) | [Next: Contributing Guidelines →](../contributions/contribute.md) 