import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

function Home() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                background: "#0e0e0e",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <h1
                style={{
                    color: "rgba(255, 255, 255, 0)",
                    fontSize: "2rem",
                    fontWeight: "500",
                    letterSpacing: "1px",
                }}
            >
                ---------------------------------------------------------------------------------------------------------------------------------
            </h1>
            <div style={{ display: "flex", gap: "1.5rem" }}>
                <Link
                    to="/en_pagamo.txt"
                    style={{
                        border: "1px solid #444",
                        color: "white",
                        padding: "1rem 2.5rem",
                        borderRadius: "12px",
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        background: "#151515",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                        transition: "all 0.25s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#222")}
                    onMouseOut={(e) => (e.target.style.background = "#151515")}
                >
                    英文丨閱讀素養
                </Link>

                <Link
                    to="/zh_pagamo.txt"
                    style={{
                        border: "1px solid #444",
                        color: "white",
                        padding: "1rem 2.5rem",
                        borderRadius: "12px",
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        background: "#151515",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                        transition: "all 0.25s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#222")}
                    onMouseOut={(e) => (e.target.style.background = "#151515")}
                >
                    中文素養丨閱讀素養
                </Link>
            </div>
            <h1
                style={{
                    color: "rgba(255, 255, 255, 0)",
                    fontSize: "2rem",
                    fontWeight: "500",
                    letterSpacing: "1px",
                }}
            >
                ---------------------------------------------------------------------------------------------------------------------------------
            </h1>
        </div>
    );
}

function FileViewer() {
    const { lang } = useParams();
    const [content, setContent] = useState("");

    useEffect(() => {
        const filename = lang === "zh" ? "zh_pagamo.txt" : "en_pagamo.txt";
        const path = `${import.meta.env.BASE_URL}${filename}`;

        fetch(path)
            .then((res) => res.arrayBuffer())
            .then((buf) => new TextDecoder("utf-8").decode(buf))
            .then(setContent)
            .catch((err) => setContent(`無法讀取檔案: ${err.message}`));
    }, [lang]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0e0e0e",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <Link
                to="/"
                style={{
                    alignSelf: "flex-start",
                    border: "1px solid #666",
                    color: "#ccc",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    marginBottom: "1.5rem",
                    transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#333")}
                onMouseOut={(e) => (e.target.style.background = "transparent")}
            >
                ← 返回
            </Link>
            <div
                style={{
                    border: "1px solid #444",
                    borderRadius: "10px",
                    padding: "1.5rem",
                    background: "#151515",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.7",
                    fontSize: "1rem",
                    maxWidth: "800px",
                    width: "100%",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                }}
            >
                {content}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:lang" element={<FileViewer />} />
        </Routes>
    );
}
