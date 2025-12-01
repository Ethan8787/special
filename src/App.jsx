import { useEffect, useState } from "react"
import { Routes, Route, Link, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function Home() {
    const linkStyle = {
        border: "1px solid #5d3aff",
        color: "white",
        padding: "1rem 1.5rem",
        borderRadius: "64px",
        textDecoration: "none",
        fontSize: "2rem",
        width: "100%",
        maxWidth: "380px",
        textAlign: "center",
        transition: "all 0.25s ease",
        boxShadow: "0 0 12px rgba(120, 60, 255, 0.25)",
    };

    const handleHover = (e, active) => {
        e.currentTarget.style.transform = active ? "scale(1.05)" : "scale(1)";
        e.currentTarget.style.transition = "transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)";
    }

    return (
        <div
            style={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                background: "#000000",
                width: "100%",
                padding: "1rem",
                boxSizing: "border-box",
            }}
        >
            <h1
                style={{
                    color: "white",
                    fontSize: "5rem",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    textAlign: "center",
                    textShadow: "0 0 10px #8b5dff, 0 0 20px #5d3aff",
                }}
            >
                Pagamo 素養任務
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Link
                    to="/view/en_pagamo.txt"
                    style={linkStyle}
                    onMouseOver={(e) => handleHover(e, true)}
                    onMouseOut={(e) => handleHover(e, false)}
                >
                    英文丨閱讀素養
                </Link>

                <Link
                    to="/view/zh_pagamo.txt"
                    style={linkStyle}
                    onMouseOver={(e) => handleHover(e, true)}
                    onMouseOut={(e) => handleHover(e, false)}
                >
                    中文素養丨閱讀素養
                </Link>
            </div>
        </div>
    )
}

function FileViewer() {
    const { file } = useParams()
    const [content, setContent] = useState("")

    useEffect(() => {
        const path = `${import.meta.env.BASE_URL}${file}`

        fetch(path)
            .then((res) => res.arrayBuffer())
            .then((buf) =>
                new TextDecoder("utf-8").decode(buf)
            )
            .then(setContent)
            .catch((err) =>
                setContent(`無法讀取檔案: ${err.message} 請在 IG 私訊 @ethan_tw_ 尋求協助 (https://www.instagram.com/ethan._.0430/)`)
            )
    }, [file])

    return (
        <div
            style={{
                minHeight: "100dvh",
                background: "#000000",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <Link
                to="/"
                style={{
                    alignSelf: "flex-start",
                    border: "1px solid #666",
                    color: "white",
                    padding: "0.6rem 1rem",
                    borderRadius: "20px",
                    fontSize: "1.2rem",
                    textDecoration: "none",
                    marginBottom: "1.5rem",
                    transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#333")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
                返回
            </Link>

            <div
                style={{
                    border: "1px solid #3d2a7a",
                    borderRadius: "32px",
                    padding: "1.5rem",
                    background: "rgba(0, 0, 0, 0)",
                    width: "100%",
                    maxWidth: "100%",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1em",
                    boxSizing: "border-box",
                    boxShadow: "0 0 15px rgba(130, 70, 255, 0.35)",
                }}

            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: (props) => (
                            <h1
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "1rem",
                                    borderBottom: "1px solid #444",
                                    paddingBottom: "0.5rem",
                                }}
                                {...props}
                            />
                        ),
                        p: (props) => (
                            <p
                                style={{
                                    margin: "0.4rem 0",
                                    lineHeight: 1.7,
                                }}
                                {...props}
                            />
                        ),
                        li: (props) => (
                            <li
                                style={{
                                    margin: "0.2rem 0",
                                }}
                                {...props}
                            />
                        ),
                        code: ({ inline, ...props }) =>
                            inline ? (
                                <code
                                    style={{
                                        background: "#222",
                                        padding: "0.1rem 0.3rem",
                                        borderRadius: "4px",
                                        fontFamily:
                                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                                    }}
                                    {...props}
                                />
                            ) : (
                                <pre
                                    style={{
                                        background: "#111",
                                        padding: "0.8rem",
                                        borderRadius: "6px",
                                        overflowX: "auto",
                                    }}
                                >
                                    <code {...props} />
                                </pre>
                            ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view/:file" element={<FileViewer />} />
        </Routes>
    )
}