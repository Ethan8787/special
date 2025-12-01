import {useEffect, useState} from "react";
import {Routes, Route, Link, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const API_KEY = "api_data";
const EXTERNAL_API_URL = "https://ethan8787.github.io/special/api.json";

function Home() {
    const linkStyle = {
        border: "1px solid #444",
        color: "white",
        padding: "1rem 1.5rem",
        borderRadius: "12px",
        textDecoration: "none",
        fontSize: "2rem",
        background: "#151515",
        width: "100%",
        maxWidth: "380px",
        textAlign: "center",
        transition: "all 0.25s ease",
    };

    const onMouseOver = (e) => (e.currentTarget.style.background = "#222");
    const onMouseOut = (e) => (e.currentTarget.style.background = "#151515");

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
                fontSize: "5rem",
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
                style={linkStyle}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                英文丨閱讀素養
            </Link>

            <Link
                to="/view/zh_pagamo.txt"
                style={linkStyle}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                中文素養丨閱讀素養
            </Link>
        </div>
    </div>);
}

function FileViewer() {
    const {file} = useParams();
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const isApiCall = file === API_KEY;
        const path = isApiCall ? EXTERNAL_API_URL : `/${file}`;

        fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Error! Status Code: ${res.status}`);
                }

                if (isApiCall) {
                    return res.text().then(text => {
                        if (text.trim().toLowerCase().startsWith('<!doctype html>')) {
                            return "Invalid API response: Received HTML content instead of JSON.";
                        }

                        let cleanedText = text.trim();
                        if (cleanedText.startsWith('export default')) {
                            cleanedText = cleanedText.substring('export default'.length).trim();
                        }
                        if (cleanedText.endsWith(';')) {
                            cleanedText = cleanedText.substring(0, cleanedText.length - 1).trim();
                        }

                        try {
                            const data = JSON.parse(cleanedText);
                            return "```json\n" + JSON.stringify(data, null, 2) + "\n```";
                        } catch (e) {
                            return e.message;
                        }
                    });

                } else {
                    return res.arrayBuffer();
                }
            })
            .then((contentData) => {
                let textContent;
                if (typeof contentData === 'string') {
                    textContent = contentData;
                } else {
                    if (typeof TextDecoder !== "undefined") {
                        textContent = new TextDecoder("utf-8").decode(contentData);
                    } else {
                        textContent = String.fromCharCode(...new Uint8Array(contentData));
                    }
                }
                setContent(textContent);
                setIsLoading(false);
            })
            .catch((err) => {
                setContent(`${err.message}`);
                setIsLoading(false);
            });
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
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                textDecoration: "none",
                marginBottom: "1.5rem",
                transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#333")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
            返回
        </Link>

        {isLoading ? (<div style={{color: '#00bfff', fontSize: '1.5rem', marginTop: '50px'}}>
            Loading...
        </div>) : (<div
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
        </div>)}
    </div>);
}

export default function App() {
    return (<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/view/:file" element={<FileViewer/>}/>
    </Routes>);
}