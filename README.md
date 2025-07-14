# <img width="30" height="30" alt="image" src="https://github.com/user-attachments/assets/291deaea-3f3f-44c2-a03a-e1055b816ea9" /> OnlyLinks

A modern, high-quality video downloader built with React and FastAPI. Download videos from YouTube, Instagram, Facebook, X and many other platforms with a beautiful, user-friendly interface.

![OnlyLinks](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-19.1.0-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688)

## ✨ Features

- 🎥 **Multi-Platform Support**: Download from YouTube, Vimeo, Dailymotion, Facebook, Instagram, Twitter, and more
- 🎨 **Modern UI**: Clean, responsive interface with dark/light mode support
- 📱 **Multiple Formats**: MP4, MP3, WebM, M4A with best quality selection
- 📚 **Download History**: Track your downloads with local storage
- ⚡ **High Performance**: Optimized for speed and reliability
- 🔒 **Privacy First**: No data stored on servers, local history only
- 🎯 **Smart Filenames**: Automatic filename generation with video titles
- 🌐 **Cross-Platform**: Works on Windows, macOS, and Linux

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SIDDHESHUMESHSARANG/onlyLinks.git
   cd onlyLinks
   ```

2. **Backend Setup**
   ```bash
   cd source-code/backend
   pip install -r requirements.txt
   echo "FRONTEND_URL=http://localhost:5173" > .env
   ``` 
   (create the env file before it doesn't exist)

3. **Frontend Setup**
   ```bash
   cd ../frontend
   pnpm install
   echo "VITE_BACKEND_URL=http://127.0.0.1:8000" > .env
   ```
   (create the env file before it doesn't exist)

4. **Run the Application**
   ```bash
   # Terminal 1 - Backend
   cd source-code/backend
   uvicorn server:app --reload

   # Terminal 2 - Frontend
   cd source-code/frontend
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to: http://localhost:5173
   - Start downloading videos! 🎉

## 📖 How to Use

1. **Enter a Video URL**
   - Paste any supported video URL into the input field
   - Click the download button to fetch video information

2. **Preview and Select Format**
   - View the video thumbnail and title
   - Choose your preferred format (MP4, MP3, WebM, M4A)

3. **Download**
   - Click download and wait for the file to process
   - Your browser will automatically download the file
   - Check your download history in the sidebar

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI framework
- **Vite 7.0.0** - Fast build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - Modern Python web framework
- **yt-dlp** - Powerful video downloader
- **Uvicorn** - ASGI server
- **python-dotenv** - Environment variable management

### Development
- **ESLint** - Code linting
- **pnpm** - Fast package manager
- **Git** - Version control

## 📁 Project Structure

```
onlyLinks/
├── source-code/
│   ├── frontend/          # React application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/          # Reusable UI components
│   │   │   │   └── ui-objects/  # Feature-specific components
│   │   │   ├── App.jsx          # Main application
│   │   │   └── main.jsx         # Entry point
│   │   ├── package.json         # Frontend dependencies
│   │   └── .env                 # Frontend environment
│   └── backend/           # FastAPI server
│       ├── server.py            # Main server file
│       ├── requirements.txt     # Python dependencies
│       └── .env                 # Backend environment
├── documentation/         # Project documentation
├── contributions/         # Contribution guidelines
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (`.env` in `source-code/backend/`)
```env
FRONTEND_URL=http://localhost:5173
```

#### Frontend (`.env` in `source-code/frontend/`)
```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

### Custom Ports

If you need to use different ports:

```bash
# Backend on port 8080
uvicorn server:app --reload --port 8080

# Frontend on port 3000
pnpm dev --port 3000
```

Remember to update the corresponding `.env` files!


## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
- Check if port 8000 is available
- Verify Python dependencies are installed
- Ensure `.env` file exists in backend directory

**Frontend won't start**
- Check if port 5173 is available
- Verify Node.js dependencies are installed
- Ensure `.env` file exists in frontend directory

**Downloads fail**
- Check internet connection
- Verify video URL is accessible
- Ensure video is not private or region-restricted

**File naming issues**
- Check browser download settings
- Verify filename doesn't contain invalid characters
- Ensure sufficient disk space

## 📚 Documentation

- [📖 User Guide](documentation/user-guide.md) - Complete user instructions
- [🔧 Installation Guide](documentation/installation-guide.md) - Detailed setup instructions
- [🔌 API Reference](documentation/api-reference.md) - Backend API documentation
- [🏗️ Technical Overview](documentation/technical-overview.md) - Architecture and implementation details
- [🤝 Contributing Guidelines](contributions/contribute.md) - How to contribute to the project

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](contributions/contribute.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- **Frontend**: Follow ESLint configuration
- **Backend**: Follow PEP 8 Python style guide
- **Commits**: Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)** - The powerful video downloader that makes this project possible
- **[React](https://react.dev/)** - The amazing UI framework
- **[FastAPI](https://fastapi.tiangolo.com/)** - The modern Python web framework
- **[Tailwind CSS](https://tailwindcss.com/)** - The utility-first CSS framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/SIDDHESHUMESHSARANG/onlyLinks/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SIDDHESHUMESHSARANG/onlyLinks/discussions)
- **Email**: siddheshsarang0811@gmail.com


If you find this project useful, please consider giving it a ⭐ on GitHub!

---

**Made with ❤️ by [SIDDHESHUMESHSARANG](https://siddheshumeshsarang.vercel.app)**

Happy downloading! 🚀

[Next: User Guide →](documentation/user-guide.md)

