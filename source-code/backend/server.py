import yt_dlp as downloader
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware
import mimetypes
from dotenv import load_dotenv

app = FastAPI()

load_dotenv('.env')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_URL', 'http://localhost:5173')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def progress_hook(d):
    if d['status'] == 'downloading':
        # Show progress in terminal
        if '_downloaded_bytes' in d and '_total_bytes' in d:
            progress = (d['_downloaded_bytes'] / d['_total_bytes']) * 100
            speed = d.get('_speed_str', 'N/A')
            eta = d.get('_eta_str', 'N/A')
            print(f"Download Progress: {progress:.1f}% | Speed: {speed} | ETA: {eta}")
        else:
            print(f"Downloading... | Speed: {d.get('_speed_str', 'N/A')} | ETA: {d.get('_eta_str', 'N/A')}")
    elif d['status'] == 'finished':
        print("Download finished!")

class DownloadRequest(BaseModel):
    link: str
    format: str

class ContentRequest(BaseModel):
    link: str

def getContent(link):
    ydl_opts = {
        'skip_download': True,
        'outtmpl': '%(title)s-onlylinksweb.%(ext)s',  # Use video title plus onlylinksweb
        'cookiefile': 'cookies.txt',
        'restrictfilenames': True,
    }
    with downloader.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(link, download=False)
        return info

def downloadMedia(link, file_format):
    ydl_opts = {
        'outtmpl': '%(title)s-onlylinksweb-%(epoch)s.%(ext)s',  # Add timestamp to avoid conflicts
        'restrictfilenames': True,
        # Performance optimizations
        'concurrent_fragment_downloads': 10,  # Download multiple fragments simultaneously
        'buffersize': 1024,  # Increase buffer size for faster I/O
        'http_chunk_size': 10485760,  # 10MB chunks for better memory management
        'retries': 3,  # Retry failed downloads
        'fragment_retries': 3,  # Retry failed fragments
        'file_access_retries': 3,  # Retry file access issues
        'extractor_retries': 3,  # Retry extraction issues
        'sleep_interval': 0,  # No sleep between requests
        'max_sleep_interval': 0,  # No maximum sleep
        'sleep_interval_requests': 0,  # No sleep between requests

        'cookiefile': 'cookies.txt',  # Use cookies for better access
        'progress_hooks': [progress_hook],  # Add progress tracking for terminal logs
        # Network optimizations
        'socket_timeout': 30,  # Increase socket timeout
        'extractor_timeout': 60,  # Increase extractor timeout
        'nocheckcertificate': True,  # Skip SSL certificate verification for speed
        'prefer_ffmpeg': True,  # Prefer ffmpeg for post-processing
        'keepvideo': False,  # Don't keep video after audio extraction
    }
    if file_format.lower() == 'mp3':
        ydl_opts['format'] = 'bestaudio/best'
        ydl_opts['postprocessors'] = [{  # type: ignore
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }]
    elif file_format.lower() == 'mp4':
        ydl_opts['format'] = 'bestvideo[ext=mp4][vcodec^=avc1]+bestaudio[ext=m4a][acodec^=mp4a]/mp4'
    elif file_format.lower() == 'webm':
        ydl_opts['format'] = 'bestvideo[ext=webm]+bestaudio[ext=webm]/webm'
    elif file_format.lower() == 'm4a':
        ydl_opts['format'] = 'bestaudio[ext=m4a]/m4a'
    else:
        ydl_opts['format'] = 'best'

    with downloader.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(link, download=True)
        filename = ydl.prepare_filename(info)

        if file_format.lower() == 'mp3':
            filename = os.path.splitext(filename)[0] + '.mp3'
        return filename

@app.post("/download")
def download(request: DownloadRequest, background_tasks: BackgroundTasks):
    try:
        filepath = downloadMedia(request.link, request.format)
        if not os.path.exists(filepath):
            raise HTTPException(status_code=404, detail="File not found after download.")
        filename = os.path.basename(filepath)
        # Clean filename for safe download
        safe_filename = filename.replace('"', '').replace("'", '')
        mime_type, _ = mimetypes.guess_type(filename)
        headers = {
            "Content-Disposition": f'attachment; filename="{safe_filename}"'
        }
        background_tasks.add_task(os.remove, filepath)
        return FileResponse(
            filepath,
            filename=safe_filename,
            media_type=mime_type or 'application/octet-stream',
            headers=headers,
            background=background_tasks
        )
    except Exception as e:
        print("Download error:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/content")
def content(request: ContentRequest):
    try:
        info = getContent(request.link)
        if not info:
            raise HTTPException(status_code=404, detail="Could not fetch video info.")
        # Extract thumbnail and title
        thumbnail = info.get("thumbnail")
        title = info.get("title")
        return JSONResponse(content={"thumbnail": thumbnail, "title": title})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))