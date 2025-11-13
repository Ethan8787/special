import {useEffect, useState} from "react";
import {Routes, Route, Link, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Home() {
    return (<div
        style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            background: "#151515",
            width: "100%",
            padding: "1rem",
            boxSizing: "border-box",
        }}
    >
        <h1
            style={{
                color: "white",
                fontSize: "3rem",
                fontWeight: "bold",
                letterSpacing: "1px",
                textAlign: "center",
                maxWidth: "100%",
            }}
        >
            Pagamo 答案
        </h1>

        <div
            style={{
                display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center",
            }}
        >
            <Link
                to="/view/en_pagamo.txt"
                style={{
                    border: "1px solid #444",
                    color: "white",
                    padding: "1.5rem 3rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontSize: "1.4rem",
                    background: "#151515",
                    width: "100%",
                    maxWidth: "380px",
                    textAlign: "center",
                    transition: "all 0.25s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#222")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#151515")}
            >
                英文丨閱讀素養
            </Link>

            <Link
                to="/view/zh_pagamo.txt"
                style={{
                    border: "1px solid #444",
                    color: "white",
                    padding: "1.5rem 3rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontSize: "1.4rem",
                    background: "#151515",
                    width: "100%",
                    maxWidth: "380px",
                    textAlign: "center",
                    transition: "all 0.25s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#222")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#151515")}
            >
                中文素養丨閱讀素養
            </Link>
        </div>
    </div>);
}

function FileViewer() {
    const {file} = useParams();
    const [content, setContent] = useState("");

    useEffect(() => {
        const path = `${import.meta.env.BASE_URL}${file}`;

        fetch(path)
            .then((res) => res.arrayBuffer())
            .then((buf) => {
                if (typeof TextDecoder !== "undefined") {
                    return new TextDecoder("utf-8").decode(buf);
                }
                return String.fromCharCode(...new Uint8Array(buf));
            })
            .then(setContent)
            .catch((err) => setContent(`無法讀取檔案: ${err.message}`));
    }, [file]);

    return (<div
        style={{
            minHeight: "100dvh",
            background: "#151515",
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
                color: "#ccc",
                padding: "0.8rem 1.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                marginBottom: "1.5rem",
                transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#333")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
            ← 返回
        </Link>

        <div
            style={{
                border: "1px solid #444",
                borderRadius: "10px",
                padding: "1.5rem",
                background: "#151515",
                width: "100%",
                maxWidth: "100%",

                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "break-word",

                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: "1rem",
                lineHeight: 1.7,
                boxSizing: "border-box",
            }}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: (props) => (<h1
                        style={{
                            fontSize: "2rem",
                            marginBottom: "1rem",
                            borderBottom: "1px solid #444",
                            paddingBottom: "0.5rem",
                        }}
                        {...props}
                    />), p: (props) => (<p
                        style={{
                            margin: "0.4rem 0", lineHeight: 1.7,
                        }}
                        {...props}
                    />), li: (props) => (<li
                        style={{
                            margin: "0.2rem 0",
                        }}
                        {...props}
                    />), code: ({inline, ...props}) => inline ? (<code
                        style={{
                            background: "#222",
                            padding: "0.1rem 0.3rem",
                            borderRadius: "4px",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        }}
                        {...props}
                    />) : (<pre
                        style={{
                            background: "#111", padding: "0.8rem", borderRadius: "6px", overflowX: "auto",
                        }}
                    >
                                    <code {...props} />
                                </pre>),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    </div>);
}

export default function App() {
    return (<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/view/:file" element={<FileViewer/>}/>
    </Routes>);
}