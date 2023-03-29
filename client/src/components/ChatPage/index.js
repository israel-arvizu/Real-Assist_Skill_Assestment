import { useState, useEffect, useRef} from 'react';
import ChatBubble from '../ChatBubbles';
import './chatpage.css'

export default function ChatPage (){
    const [chatLog, setChatLog] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [typing, setTyping] = useState(false)
    const [errors, setErrors] = useState("")
    const messagesEndRef = useRef();
    let typingTimeout = null;

    useEffect(() => {
        autoScroll()
    }, [chatLog])

    function autoScroll(){
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
    }

    const handleMessage = async (e) => {
        e.preventDefault();
        setErrors("")

        const newMessage = {role: 'user', content: currentMessage}

        const newChatLog = [...chatLog, newMessage]

        setChatLog(newChatLog)
        setCurrentMessage("")

        typingTimeout = setTimeout(() => {
            setTyping(true)
        }, 300)

        await processData(newChatLog)
    }

    async function processData(chatMessages){
        await fetch("http://localhost:3005/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messagesContent: chatMessages
            })
        }).then((res) => {return res.json()})
        .then((data) => {

            if(data?.error){
                clearTimeout(typingTimeout)
                setTyping(false)
                setErrors(data.error.message)
            }else{
                setTyping(false)
                setChatLog([...chatMessages, data.message])
            }
        })
    }

    function quickPrompt(promptChoice){
        let newChatLog = [];
        switch(promptChoice){
            case 1:
                newChatLog = [{role: 'user', content: 'Create blog content specific to real estate'}]
                setChatLog(newChatLog)
                processData(newChatLog)
                break;
            case 2:
                newChatLog = [{role: 'user', content: 'Give me creative ideas to reach out to new customers'}]
                setChatLog(newChatLog)
                processData(newChatLog)
                break;
            case 3:
                newChatLog = [{role: 'user', content: 'How do I create a email drop campaign content for my clients'}]
                setChatLog(newChatLog)
                processData(newChatLog)
                break;
            case 4:
                newChatLog = [{role: 'user', content: 'Can you write an anwser to my clients email'}]
                setChatLog(newChatLog)
                processData(newChatLog)
                break;
        }
        return;
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
                        {chatLog.length > 0 ?
                            <div className="cp-chat-bubble-container">
                            {chatLog.map((chat) => {
                                return(
                                    <ChatBubble type={chat.role} content={chat.content} />
                                )
                            })}
                            {typing ?
                                <ChatBubble type={"bot"} content={"Assistant is typing..."} /> : null
                            }
                            {errors ?
                                <ChatBubble type={"error"} content={`Error Occurred, ${errors}`} /> : null
                            }
                            <div ref={messagesEndRef}/>
                            </div>
                         :
                            <div id="cp-recommendation-wrapper">
                                <h2>Example of types of questions to ask RealAssist</h2>
                                <div>
                                    <article className="cp-recommendation-article" onClick={() => quickPrompt(1)}>
                                        <p>Creating blog content specific to real estate</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
                                        </svg>
                                    </article>
                                    <article className="cp-recommendation-article" onClick={() => quickPrompt(2)}>
                                        <p>Creative ideas to reach out to new customers</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
                                        </svg>
                                    </article>
                                    <article className="cp-recommendation-article" onClick={() => quickPrompt(3)}>
                                        <p>Creating email drop campaign content for your clients</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
                                        </svg>
                                    </article>
                                    <article className="cp-recommendation-article" onClick={() => quickPrompt(4)}>
                                        <p>Writing anwsers to your clients text/emails</p>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#443DF6"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17V8H7C6.44772 8 6 7.55228 6 7Z" fill="#443DF6"/>
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
