import { useEffect, useState, useRef, Suspense } from "react";
import Header from "./components/ui-objects/Header";
import LinkEnter from "./components/ui-objects/LinkEnter";
import Result from "./components/ui-objects/Result";
import DownloadHistory from "./components/ui-objects/DownloadHistory";

export default function App() {
    const [selectedValue, setSelectedValue] = useState("");
    const [currentYear, setCurrentYear] = useState(null);
    const [link, setLink] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(false);
    const resultRef = useRef(null);

    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    // Fetch thumbnail and title when link is set
    useEffect(() => {
        if (link) {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/content`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ link })
            })
                .then(async res => {
                    if (!res.ok) throw new Error("Not found");
                    const data = await res.json();
                    setThumbnail(data.thumbnail);
                    setTitle(data.title);
                })
                .catch(() => {
                    setThumbnail(null);
                    setTitle(null);
                })
                .finally(() => setLoading(false));
        }
    }, [link]);

    // Scroll Result into center when thumbnail and title are fetched
    useEffect(() => {
        if (!loading && thumbnail && title && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                window.scrollBy({ top: 350, behavior: 'smooth' });
            }, 500); // wait for scrollIntoView to finish
        }
    }, [loading, thumbnail, title]);

    return (
        <>
            <Header />
            <hr />
            {/* Flex container for side-by-side layout */}
            <div className="flex flex-row items-start w-full min-h-[800px]">
                <DownloadHistory />
                <div className="flex-1 flex justify-center">
                    <LinkEnter type={selectedValue} selectedValue={selectedValue} setSelectedValue={setSelectedValue} setLink={setLink} loading={loading} />
                </div>
            </div>
            {(!loading && thumbnail && title) && (
                <Suspense fallback="Loading...">
                    <div ref={resultRef}>
                        <Result class="ml-0 z-1 border-2 border-dashed mb-10 md:mb-[200px]" x="500px" y="500px" thumbnail={thumbnail} title={title} loading={loading} link={link} />
                    </div>
                </Suspense>
            )}
            <footer className="footer mb-[17.8px]">
                <hr />
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="copyright text-sm text-[#000]-500 sm:text-center dark:text-gray-400">© {currentYear} <a href="https://siddheshumeshsarang.vercel.app" className="hover:underline">SIDDHESHUMESHSARANG</a> All Rights Reserved.
                    </span>
                    <span className="credits text-sm text-[#000]-500 sm:text-center dark:text-gray-400">
                        powered by <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" className="hover:underline">yt-dlp</a>
                    </span>
                </div>
            </footer>
        </>
    )
}