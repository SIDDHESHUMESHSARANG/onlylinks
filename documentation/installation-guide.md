[← Prev: Technical Overview](technical-overview.md) | [Next: Contribution Guidelines →](user-guide.md)

# OnlyLinks Installation Guide

This guide will help you set up and run OnlyLinks on your local machine.

## 📋 Prerequisites

Before installing OnlyLinks, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **Python** (v3.8 or higher)
  - Download from [python.org](https://python.org/)
  - Verify installation: `python --version`

- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Package Managers
- **pnpm** (recommended for frontend)
  ```bash
  npm install -g pnpm
  ```
  - Verify installation: `pnpm --version`

- **pip** (Python package manager, usually comes with Python)
  - Verify installation: `pip --version`

## 🚀 Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/onlyLinks.git
cd onlyLinks
```

### Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd source-code/backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create environment file**
   ```bash
   # Create .env file
   echo "FRONTEND_URL=http://localhost:5173" > .env
   ```

4. **Verify backend setup**
   ```bash
   python -c "import fastapi, yt_dlp; print('Backend dependencies installed successfully!')"
   ```

### Step 3: Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   pnpm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file
   echo "VITE_BACKEND_URL=http://127.0.0.1:8000" > .env
   ```

4. **Verify frontend setup**
   ```bash
   pnpm build
   ```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   # Terminal 1 - Backend
   cd source-code/backend
   uvicorn server:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start the Frontend Development Server**
   ```bash
   # Terminal 2 - Frontend
   cd source-code/frontend
   pnpm dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

### Production Mode

1. **Build the Frontend**
   ```bash
   cd source-code/frontend
   pnpm build
   ```

2. **Serve the Production Build**
   ```bash
   pnpm preview
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

1. **Backend Custom Port**
   ```bash
   uvicorn server:app --reload --port 8080
   ```
   Then update frontend `.env`:
   ```env
   VITE_BACKEND_URL=http://127.0.0.1:8080
   ```

2. **Frontend Custom Port**
   ```bash
   pnpm dev --port 3000
   ```
   Then update backend `.env`:
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

## 🧪 Testing the Installation

### Test Backend API

1. **Test content endpoint**
   ```bash
   curl -X POST "http://localhost:8000/content" \
     -H "Content-Type: application/json" \
     -d '{"link": "https://youtu.be/dQw4w9WgXcQ"}'
   ```

2. **Expected response**
   ```json
   {
     "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
     "title": "Rick Astley - Never Gonna Give You Up"
   }
   ```

### Test Frontend

1. Open http://localhost:5173 in your browser
2. Enter a YouTube URL
3. Select a format and click download
4. Verify the file downloads successfully

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Port already in use**
```bash
# Find process using port 8000
netstat -ano | findstr :8000
# Kill the process
taskkill /PID <process_id> /F
```

**Python dependencies not found**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**Environment variables not loading**
```bash
# Check if .env file exists
ls -la .env
# Verify file content
cat .env
```

#### Frontend Issues

**Node modules not found**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Build errors**
```bash
# Clear build cache
pnpm build --force
```

**Port conflicts**
```bash
# Use different port
pnpm dev --port 3000
```

### System-Specific Issues

#### Windows
- Ensure Python and Node.js are in PATH
- Use PowerShell or Command Prompt
- Install Visual Studio Build Tools if needed

#### macOS
- Use Homebrew for easier installation
- Ensure Xcode Command Line Tools are installed

#### Linux
- Install build essentials: `sudo apt-get install build-essential`
- Use `python3` and `pip3` commands if needed

## 📦 Alternative Installation Methods

### Using Docker (Advanced)

1. **Create Dockerfile for backend**
2. **Create Dockerfile for frontend**
3. **Use docker-compose for orchestration**

### Using Virtual Environment (Python)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 🔄 Updates

To update OnlyLinks:

```bash
# Pull latest changes
git pull origin main

# Update backend dependencies
cd source-code/backend
pip install -r requirements.txt --upgrade

# Update frontend dependencies
cd ../frontend
pnpm install
```

## 📞 Support

If you encounter issues during installation:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Prerequisites](#-prerequisites) section
3. Create an issue on GitHub with:
   - Your operating system
   - Node.js and Python versions
   - Error messages
   - Steps to reproduce

## 🎉 Next Steps

After successful installation:

1. Read the [User Guide](user-guide.md)
2. Explore the [API Reference](api-reference.md)
3. Check out the [Contributing Guidelines](../contributions/contribute.md)
4. Join the community discussions

Happy downloading! 🚀

[← Prev: Technical Overview](technical-overview.md) | [Next: Contribution Guidelines →](contributions/contribute.md)