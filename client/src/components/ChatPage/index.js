import { useState } from 'react';
import ChatBubble from '../ChatBubbles';
import './chatpage.css'

export default function ChatPage (){
    const [chatLog, setChatLog] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    let messages = true;

    const handleMessage = async (e) => {
        e.preventDefault();

        const newChatLog = [...chatLog, {role: 'user', content: currentMessage}]
        setChatLog([...newChatLog])
        console.log(`This is chat log send: ${newChatLog}`)
        fetch("http://localhost:3005/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messagesContent: newChatLog
            })
        }).then((res) => res.json())
        .then((data) => console.log(data))

        console.log("handle message ended")
        setCurrentMessage("")
    }

    return (
        <div className="chatpage_page_wrapper">
            <div className="chatpage-sidebar-wrapper">
                <button> New Chat </button>
                <div>
                    <a href="/">Account</a>
                    <a href="/">Contact Us</a>
                    <button>Log Out</button>
                </div>
            </div>
            <main id="cp-main">
                <div className="cp-main-wrapper">
                    <div>
                        <h1>RealAssist.AI</h1>
                        <p>This is a private message between you and Assistant</p>
                    </div>
                    <div className="cp-chat-container">
                        {messages ?
                            <div className="cp-chat-bubble-container">
                                <ChatBubble type="bot" />
                                <ChatBubble type="human" />
                                <ChatBubble type="bot" />
                            </div>
                         :
                            <div id="cp-recommendation-wrapper">
                                <h2>Example of types of questions to ask RealAssist</h2>
                                <div>
                                    <article className="cp-recommendation-article">
                                        <p>Creating blog content specific to real estate</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
                                        </svg>
                                    </article>
                                    <article className="cp-recommendation-article">
                                        <p>Creative ideas to reach out to new customers</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
                                        </svg>
                                    </article>
                                    <article className="cp-recommendation-article">
                                        <p>Creating email drop campaign content for your clients</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
                                        </svg>
                                    </article>
                                    <article className="cp-recommendation-article">
                                        <p>Writing anwsers to your clients text/emails</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
                                        </svg>
                                    </article>
                                </div>
                            </div>
                        }

                        <div className="cp-input-wrapper">
                            <form onSubmit={handleMessage}>
                                <input
                                    type="text"
                                    placeholder="Ask RealAssist Something..."
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    // required
                                />

                                <button type="submit">
                                    <img src="/arrow-icon.png" alt="Arrow" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
