import React, { useState, useEffect, useRef } from "react"; // Import useState, useEffect, and useRef
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsLayoutSidebar } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { IoCopyOutline, IoCopy } from "react-icons/io5";

export default function DownloadHistory() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHistory, setHistory] = useState();
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [historyItems, setHistoryItems] = useState([]);
    const hasOpenedOnce = useRef(false);
    const [copiedIdx, setCopiedIdx] = useState(null);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
        setHistoryItems(history);
        setHistory(history.length > 0);
    }, []);

    // Toggles panel open/close and button visibility
    function handleTogglePanel() {
        if (!isOpen && !hasOpenedOnce.current) {
            setShowSkeleton(true);
            hasOpenedOnce.current = true;
            setTimeout(() => {
                setShowSkeleton(false);
            }, 2000);
        }
        setIsOpen(!isOpen); // Toggles the isOpen state
    }

    return (
        <>
            {/* Open Button (visible when panel is closed) */}
            <div className="relative w-[200px] h-[800px] selection:bg-black selection:text-white">
                <button onClick={handleTogglePanel} id="btn1" className={isOpen ? "hidden" : ""}>
                    <BsLayoutSidebar
                        size={25}
                        className="m-[20px] cursor-pointer top-22 left-5 z-50"
                        title="Download History"
                    />
                </button>

                {/* Panel */}
                <div
                    id="dw-history"
                    className={`
                        bg-[#F2F0EF] dark:bg-[#111] h-[800px] overflow-y-auto
                        px-[10px] py-[20px] absolute top-0 left-0 w-[250px] mt-[0px] m-[0px] z-20
                        transition-[left] duration-500 ease-in-out 
                        ${isOpen ? "left-0" : "left-[-320px]"} 
                    `}
                >
                    {/* Close Button (visible when panel is open) */}
                    <button
                        onClick={handleTogglePanel} // Use the same toggle function
                        id="btn2"
                        className={!isOpen ? "hidden" : ""} // Conditionally hide/show
                    >
                        <IoIosCloseCircleOutline
                            size={35}
                            className="float-right mb-4 cursor-pointer"
                            title="Close"
                        />
                    </button>

                    {/* Download History Content */}
                    <p className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-black dark:text-white">Your Downloads</p>
                    <p className="mt-6 pl-1 italic text-[12px] text-[#a8a7a7] dark:text-[#333]">Note: Clearing local storage<br />or "On-device site data" will erase your download history.</p>
                    <p className="mt-2 mb-[20px] pl-1 italic text-[12px] text-[#a8a7a7] dark:text-[#333]">Download history is only valid for past 12 months</p>
                    {showSkeleton ? (
                        <div className="animate-pulse mt-4">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-2/3"></div>
                        </div>
                    ) : isHistory ? (
                        <>
                            {historyItems.map((item, idx) => (
                                <div key={idx} className="text-gray-700 dark:text-muted-foreground text-[15px] mb-[40px]">
                                    <span className="font-semibold">{item.title}</span><br />
                                    <div className="flex flex-row items-center mt-[10px]">
                                        <code>
                                            <a
                                                href={item.link}
                                                className="bg-muted relative rounded-[20px] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.link.length > 15 ? item.link.slice(0, 15) + '...' : item.link}
                                            </a>
                                        </code>
                                        <button
                                            type="button"
                                            aria-label="Copy link"
                                            className="ml-2 cursor-pointer"
                                            onClick={() => {
                                                navigator.clipboard.writeText(item.link);
                                                setCopiedIdx(idx);
                                                setTimeout(() => setCopiedIdx(null), 500);
                                            }}
                                        >
                                            {copiedIdx === idx ? <IoCopy /> : <IoCopyOutline />}
                                        </button>
                                        {item.date && (
                                            <p className="text-[10px] ml-[10px] text-gray-600 dark:text-gray-400 font-medium">
                                                {item.date}
                                            </p>
                                        )}
                                    </div>
                                    <hr className="mt-[20px]" />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className="text-gray-700 dark:text-muted-foreground text-0xl mt-[15px] pl-1">No downloads yet</p>
                    )}
                </div>
            </div>
        </>
    );
}
