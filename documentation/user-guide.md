[← Prev: README](../README.md) | [Next: Technical Overview →](technical-overview.md)

# OnlyLinks User Guide

Welcome to OnlyLinks! This guide will help you use the application to download videos from various platforms.

## 🎯 What is OnlyLinks?

OnlyLinks is a web-based video downloader that allows you to:
- Download videos from YouTube, Vimeo, and many other platforms
- Choose from multiple formats (MP4, MP3, WebM, M4A)
- Get high-quality downloads with proper filenames
- View your download history
- Enjoy a clean, modern interface

## 🚀 Getting Started

### 📖 How to Use OnlyLinks

### Step 1: Enter a Video URL

1. **Find the URL** of the video you want to download
   - YouTube: Copy the URL from your browser's address bar
   - Example: `https://youtu.be/dQw4w9WgXcQ`

2. **Paste the URL** into the input field
   - The field is located in the center of the page
   - It has a placeholder: "eg: https://youtu.be/dQw4w9WgXcQ?feature=shared"

3. **Click the Download Button** (green button with download icon)
   - The system will fetch video information
   - You'll see a loading indicator

### Step 2: Preview and Select Format

1. **Video Preview**
   - Once loaded, you'll see the video thumbnail
   - The video title will be displayed below the thumbnail

2. **Select Format**
   - Choose from the dropdown menu:
     - **MP4 (Video)**: Best quality video format
     - **MP3 (Audio)**: Audio-only format (192kbps)
     - **WebM**: Alternative video format
   - The format selector is next to the download button

### Step 3: Download

1. **Click Download**
   - Press the green "Download" button
   - A glass overlay will appear showing download progress

2. **Wait for Completion**
   - The download may take several seconds depending on file size
   - Progress is shown in the terminal (backend console)
   - The overlay message: "Downloading may take some seconds.. We're ensuring the best quality for you💕"

3. **File Download**
   - Your browser will automatically download the file
   - The filename will be: `{video_title}_onlylinksweb.{format}`
   - Example: `Rick_Astley_-_Never_Gonna_Give_You_Up_onlylinksweb.mp4`

## 🎛️ Features

### Download History

- **Access History**: Click the sidebar button (left side of the screen)
- **View Past Downloads**: See all your previous downloads with dates
- **Copy Links**: Click the copy icon to copy the original video URL
- **Automatic Updates**: History updates automatically when you download

### Supported Platforms

OnlyLinks supports downloading from:
- **YouTube** (youtube.com, youtu.be)
- **Vimeo** (vimeo.com)
- **Dailymotion** (dailymotion.com)
- **Facebook** (facebook.com)
- **Instagram** (instagram.com)
- **Twitter** (twitter.com)
- **And many more** (via yt-dlp)

### Supported Formats

| Format | Description | Best For |
|--------|-------------|----------|
| **MP4** | High-quality video | General video downloads |
| **MP3** | Audio-only (192kbps) | Music and podcasts |
| **WebM** | Web-optimized video | Web playback |
| **M4A** | Audio-only | Apple devices |

## 🎨 Interface Guide

### Main Interface Elements

1. **Header**
   - Application title and navigation

2. **Input Section**
   - URL input field
   - Download button (green with icon)

3. **Preview Section**
   - Video thumbnail
   - Video title
   - Download controls

4. **Sidebar**
   - Download history
   - Toggle button

5. **Footer**
   - Copyright information
   - Credits to yt-dlp

### Dark/Light Mode

- The interface automatically adapts to your system theme

## 🔧 Troubleshooting

### Common Issues

#### "Please enter a valid link"
- **Cause**: Invalid or unsupported URL
- **Solution**: 
  - Check the URL is correct
  - Ensure it's from a supported platform
  - Try copying the URL again

#### "Download failed"
- **Cause**: Network issues or video unavailable
- **Solution**:
  - Check your internet connection
  - Verify the video is publicly accessible
  - Try again in a few minutes

#### "Please select a format"
- **Cause**: No format selected before download
- **Solution**: Choose a format from the dropdown menu

#### Slow Downloads
- **Cause**: Large file size or network speed
- **Solution**:
  - Be patient - high-quality downloads take time
  - Check your internet speed
  - Try downloading during off-peak hours

#### File Not Downloading
- **Cause**: Browser blocking downloads
- **Solution**:
  - Check browser download settings
  - Allow pop-ups for the site
  - Check download folder permissions

### Error Messages

| Error Message | What It Means | How to Fix |
|---------------|---------------|------------|
| "Not found" | Video doesn't exist or is private | Check URL and video availability |
| "Download failed" | Network or server issue | Try again or check connection |
| "Please select a format" | No format chosen | Select a format from dropdown |

## 💡 Tips and Best Practices

### For Best Results

1. **Use Official URLs**
   - Copy URLs directly from the video platform
   - Avoid shortened URLs when possible

2. **Check Video Availability**
   - Ensure the video is publicly accessible
   - Some private or region-restricted videos may not work

3. **Choose Appropriate Format**
   - **MP4**: For videos you want to watch
   - **MP3**: For audio-only content
   - **WebM**: For web compatibility

4. **Be Patient**
   - High-quality downloads take time
   - Don't close the browser during download

### Performance Tips

1. **Close Other Tabs**
   - Free up system resources
   - Improve download speed

2. **Use Wired Connection**
   - More stable than WiFi
   - Faster download speeds

3. **Download During Off-Peak Hours**
   - Less network congestion
   - Better performance

## 🔒 Privacy and Security

### Data Handling

- **No Data Stored**: Videos are not stored on our servers
- **Local History**: Download history is stored in your browser only
- **No Tracking**: We don't track your downloads or browsing

### Safe Downloads

- **Virus-Free**: All downloads are direct from source platforms
- **No Ads**: Clean interface without advertisements
- **Open Source**: Transparent codebase for security

## 📱 Browser Compatibility

### Supported Browsers

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

### Browser Requirements

- **JavaScript Enabled**: Required for the application to work
- **Downloads Allowed**: Browser must allow file downloads
- **Modern Browser**: Chrome 80+, Firefox 75+, Safari 13+

## 🆘 Getting Help

### Self-Help Resources

1. **Check this guide** for common issues
2. **Try different formats** if one doesn't work
3. **Verify the URL** is correct and accessible

### Contact Support

If you need additional help:
1. Check the [Installation Guide](installation-guide.md)
2. Create an issue on GitHub with:
   - Error message
   - Video URL (if applicable)
   - Browser and OS information

## 🎉 Advanced Features

### Download History Management

- **View History**: Access your download history from the sidebar
- **Copy URLs**: Easily copy original video URLs
- **Automatic Updates**: History updates with each download

### File Naming

- **Consistent Format**: `{title}_onlylinksweb.{format}`
- **Safe Characters**: Special characters are replaced with underscores
- **Unique Names**: Timestamps prevent filename conflicts

### Quality Selection

- **Best Available**: Automatically selects the highest quality
- **Format-Specific**: Each format uses optimal settings
- **No Quality Loss**: Downloads are not re-encoded

## 🔄 Updates and Maintenance

### Keeping Updated

- **Regular Updates**: Check for new versions
- **Feature Improvements**: New features added regularly
- **Bug Fixes**: Issues resolved in updates

### Backup Your History

- **Export History**: Copy your download history if needed
- **Browser Sync**: History syncs across devices (if enabled)
- **Local Storage**: History is stored locally in your browser

---

**Happy downloading with OnlyLinks!** 🚀

For technical support or feature requests, please visit our GitHub repository. 

[← Prev: README](../README.md) | [Next: Technical Overview →](technical-overview.md)