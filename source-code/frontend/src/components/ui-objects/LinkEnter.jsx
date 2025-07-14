import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BsDownload } from "react-icons/bs";
import Option from "./Option";

export default function LinkEnter({ type, selectedValue, setSelectedValue, setShowFlex, setLink, loading }) {
    const [showError, setShowError] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [showInputError, setShowInputError] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check dark mode on mount and when errors are shown
        const checkDark = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
        checkDark();
    }, [showError, showInputError]);

    const handleVerfication = () => {
        let hasError = false;
        if (!selectedValue || selectedValue.trim() === "") {
            setShowError(true);
            setTimeout(() => setShowError(false), 1000);
            hasError = true;
        }
        if (!inputValue || inputValue.trim() === "") {
            setShowInputError(true);
            setTimeout(() => setShowInputError(false), 1000);
            hasError = true;
        }
        if (hasError) return;

        // Strict URL validation to block malicious links
        const strictUrlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
        const dangerousSchemes = /^(javascript|data|vbscript|file|about|blob):/i;
        const dangerousKeywords = /(<script>|<\/script>|<img|<iframe|<object|<embed|<svg|<link|<style|<base|<form|<input|<body|<video|<audio|<source|<meta|<applet|<frame|<frameset|<marquee|<math|<table|<textarea|<button|<select|<option|<canvas|<map|<area|<isindex|<plaintext|<xss)/i;
        const trimmedInput = inputValue.trim();

        // Disallow dangerous schemes
        if (dangerousSchemes.test(trimmedInput)) {
            setShowInputError(true);
            setTimeout(() => setShowInputError(false), 1000);
            return;
        }
        // Disallow dangerous keywords
        if (dangerousKeywords.test(trimmedInput)) {
            setShowInputError(true);
            setTimeout(() => setShowInputError(false), 1000);
            return;
        }

        // Regex verification based on selected application
        const regexMap = {
            instagram: /^(https?:\/\/)(www\.)?instagram\.com\//i,
            facebook: /^(https?:\/\/)(www\.)?facebook\.com\//i,
            youtube: /^(https?:\/\/)(www\.)?(youtube\.com|youtu\.be)\//i,
            "x (twitter)": /^(https?:\/\/)(www\.)?(twitter\.com|x\.com)\//i,
            other: strictUrlRegex
        };
        const appKey = selectedValue.toLowerCase();
        let regex = regexMap[appKey] || strictUrlRegex;

        // Check both the domain and the strict URL pattern
        if (!regex.test(trimmedInput) || !strictUrlRegex.test(trimmedInput)) {
            setShowInputError(true);
            setTimeout(() => setShowInputError(false), 1000);
            return;
        }
        // If all checks pass, set the link for App to fetch thumbnail/title
        setLink(trimmedInput);
    };

    return (
        <>
        {(showError || showInputError) && (
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
                opacity: (showError || showInputError) ? 1 : 0,
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
                opacity: (showError || showInputError) ? 1 : 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {showError && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Please select an application</AlertTitle>
                </Alert>
              )}
              {showInputError && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Please enter a valid {selectedValue} link</AlertTitle>
                </Alert>
              )}
            </div>
          </div>
        )}
        <div className="block justify-center items-center min-h-[0vh] z-10 mt-50 mr-[170px] link-enter-panel">
           <div className="flex flex-col items-center gap-2">
                <h3 className="thetext mb-[20px] scroll-m-20 text-3xl font-semibold tracking-tight">
                     {!selectedValue || selectedValue == "reset" ? 
                      <>
                      {"Welcome to OnlyLinks!"}
                      <p className="instructions text-muted-foreground text-[18px] ml-[4px]">Kindly select an application to continue</p>
                      </>
                      :
                      <>
                      {`Enter or Paste your ${selectedValue} link below`}
                      <p
                        className="lorem text-muted-foreground text-sm ml-[5px]"
                        style={{
                          visibility: "hidden"
                        }}
                      >lorem</p>
                      </>
                     }
                </h3>
                <Option selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                <Input 
                    className="linkbox px-[60px] py-[30px] pl-[15px] w-[800px] m-[30px] mt-[0] text-2xl border-[#181818]" 
                    type="url"
                    spellCheck="false"
                    placeholder="eg: https://youtu.be/dQw4w9WgXcQ?feature=shared"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
           </div>
                <Button 
                    className={`proceed px-[60px] py-[30px] w-[200px] ml-[320px] border-[#181818] cursor-pointer transform scale-100 active:scale-110 transition-transform duration-200${loading ? ' proceedloading' : ''}`}
                    type="submit"
                    onClick={handleVerfication}
                    disabled={loading}
                >
                    {loading ? <p>Loading</p> : <BsDownload size={100}/>} 
                </Button>
        </div>
        </>
    )
}