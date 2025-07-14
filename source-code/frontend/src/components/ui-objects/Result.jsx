import { useState, useEffect } from "react"
import "./LinkEnter.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

export default function Result(props) {
  const [format, setFormat] = useState('');
  const [showError, setShowError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  useEffect(() => {
    // Check dark mode on mount and when errors are shown
    const checkDark = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
    checkDark();
  }, [showError]);

  const handleDownload = async (format) => {
    let hasError = false;
    if (!format) {
      setShowError('Please select a format');
      setTimeout(() => setShowError(false), 1000);
      hasError = true;
    }
    if (!props.link) {
      setShowError('Please enter a valid link');
      setTimeout(() => setShowError(false), 1000);
      hasError = true;
    }
    if (hasError) return;
    setDownloading(true);
    setShowTimeoutMessage(true); // Show message immediately when download starts

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: props.link, format })
      });
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      // Try to get filename from Content-Disposition
      let filename = 'download';
      const disposition = response.headers.get('Content-Disposition');
      console.log('Content-Disposition header:', disposition); // Debug log
      if (disposition) {
        // Try different patterns for filename extraction
        const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch) {
          filename = filenameMatch[1].replace(/['"]/g, '').trim();
          // Replace whitespaces with underscores
          filename = filename.replace(/\s+/g, '_');
          console.log('Extracted filename (quoted):', filename); // Debug log
        } else {
          // Fallback: try to extract filename without quotes
          const fallbackMatch = disposition.match(/filename=([^;]+)/);
          if (fallbackMatch) {
            filename = fallbackMatch[1].trim();
            filename = filename.replace(/\s+/g, '_');
            console.log('Extracted filename (unquoted):', filename); // Debug log
          }
        }
      }

      // If still no filename, use the video title from props
      if (filename === 'download' && props.title) {
        const safeTitle = props.title.replace(/[^a-zA-Z0-9\s-_]/g, '').replace(/\s+/g, '_');
        filename = `${safeTitle}_onlylinksweb.${format}`;
        console.log('Using fallback filename:', filename); // Debug log
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.setAttribute('download', filename);
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      // Store download info in localStorage
      if (props.title && props.link) {
        const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
        const today = new Date();
        const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        // Check if link already exists in history
        const existingIndex = history.findIndex(item => item.link === props.link);

        if (existingIndex !== -1) {
          // Update the date of existing entry
          history[existingIndex].date = dateString;
          // Move the updated entry to the top
          const updatedEntry = history.splice(existingIndex, 1)[0];
          history.unshift(updatedEntry);
        } else {
          // Add new entry if link doesn't exist
          history.unshift({ title: props.title, link: props.link, date: dateString });
        }

        localStorage.setItem('downloadHistory', JSON.stringify(history));
      }
    } catch (e) {
      setShowError('Download failed');
      setTimeout(() => setShowError(false), 2000);
    } finally {
      // Reset states when download completes
      setDownloading(false);
      setShowTimeoutMessage(false);
    }
  }

  return (
    <>
      {showError && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            pointerEvents: "none"
          }}
        >
          {/* Overlay background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)",
              transition: "opacity 0.1s cubic-bezier(.4,0,.2,1)",
              opacity: showError ? 1 : 0,
              pointerEvents: "auto"
            }}
          />
          {/* Alert popup */}
          <div
            style={{
              position: "absolute",
              top: 90,
              left: "47%",
              transform: "translateX(-50%)",
              minWidth: 320,
              maxWidth: "90vw",
              pointerEvents: "auto",
              transition: "opacity 0.1s cubic-bezier(.4,0,.2,1)",
              opacity: showError ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>{showError}</AlertTitle>
            </Alert>
          </div>
        </div>
      )}
      <div className="relative flex items-center justify-center min-h-[300px]" style={{ marginTop: '-300px' }}>
        {/* Skeleton box while loading - removed */}
        {/* {props.loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-80 z-20 rounded animate-pulse border-2 border-dashed">
            <div className="w-[300px] h-[180px] bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        )} */}
        {!props.loading && props.thumbnail && props.title ? (
          <div className="flex flex-col items-center justify-center w-[900px] relative">
            <img
              src={props.thumbnail}
              alt="thumbnail"
              className="rounded shadow mb-4 border border-[#ccc] rounded-[20px]"
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
            {/* Timeout message overlay */}
            {downloading && showTimeoutMessage && (
              <div className="timeoutmsg absolute flex items-center justify-center z-20 border-opacity-20 p-[20px]">
                <p className="text-white text-[15px] font-semibold text-center px-4">
                  Downloading may take some seconds..<br />We're ensuring the best quality for you💕
                </p>

              </div>
            )}
            <div className="text-lg font-semibold text-center mb-2 text-black dark:text-white">{props.title}</div>
            <div className="mb-[100px]"></div>
          </div>
        ) : null}
        <div
          className="overlay-controls absolute inset-0 flex flex-row items-center justify-center gap-4 z-10"
          style={{ pointerEvents: "auto" }}
        >
          <button
            className="dwbutton bg-[green] px-[12px] py-[6px] cursor-pointer rounded text-white font-semibold rounded-[10px] transform scale-100 active:scale-110 transition-transform duration-200"
            style={{ pointerEvents: "auto" }}
            onClick={() => handleDownload(format)}
            disabled={props.loading || downloading}
          >
            {downloading ? 'Downloading...' : 'Download'}
          </button>
          <Select
            className="z-20 px-[12px] h-[112px] py-[8px]"
            value={format}
            onValueChange={setFormat}
            disabled={props.loading || downloading}
          >
            <SelectTrigger className="w-[100px] h-[112px] format-select">
              <SelectValue placeholder="Format" className="text-black dark:text-gray-400 " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Format</SelectLabel>
                <SelectItem className="cursor-pointer" value="mp4">
                  MP4 (Video)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="mp3">
                  MP3 (Audio)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="m4a">
                  M4A (Audio)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="webm">
                  WebM
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  )
}