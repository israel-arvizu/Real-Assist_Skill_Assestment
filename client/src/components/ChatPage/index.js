import { useState, useEffect, useRef} from 'react';
import ChatBubble from '../ChatBubbles';
import ReccommendationBubbles from '../RecommendationBubbles';
import './chatpage.css'

export default function ChatPage (){
    const [interactions, setInteractions] = useState([])
    const [chatLog, setChatLog] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [typing, setTyping] = useState(false)
    const [inputText, setInputText] = useState("Ask RealAssist Something...")
    const [errors, setErrors] = useState("")
    const messagesEndRef = useRef();
    let typingTimeout = null;

    useEffect(() => {
        autoScroll()
        if(chatLog.length > 0){
            setInteractions([[chatLog]])
        }
    }, [chatLog])


    function autoScroll(){
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
    }

    const handleMessage = async (e) => {
        e.preventDefault();
        setErrors("")
        setInputText("Message...")

        const newMessage = {role: 'user', content: currentMessage}

        if(!currentMessage){
            return
        }
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
                clearTimeout(typingTimeout)
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
                break;
            case 2:
                newChatLog = [{role: 'user', content: 'Give me creative ideas to reach out to new customers'}]
                break;
            case 3:
                newChatLog = [{role: 'user', content: 'How do I create a email drop campaign content for my clients'}]
                break;
            case 4:
                newChatLog = [{role: 'user', content: 'Can you write an anwser to my clients email'}]
                break;
            default:
                return
        }
        typingTimeout = setTimeout(() => {
            setTyping(true)
        }, 300)
        setChatLog(newChatLog)
        processData(newChatLog)
        return;
    }

    function restartChat(){
        setErrors("")
        setChatLog([])
        setInteractions([])
        setInputText("Ask RealAssist Something...")
    }

    return (
        <div className="chatpage_page_wrapper">
            <div className="chatpage-sidebar-wrapper">
                <div className='top-sidebar-content'>
                    <button onClick={restartChat}> New Chat </button>
                    {interactions?.length >= 1 ?
                    <div className="interactions-wrapper">
                        {/* To be implemented when we fetch the users past chats */}
                        {interactions?.map((chatInteraction) =>{
                            return(
                                <div>
                                    <p>New Chat Created...</p>
                                </div>
                            )
                        })}
                    </div>
                    : null}
                </div>
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
                            <ReccommendationBubbles quickPrompt={quickPrompt}/>
                        }
                        <div className="cp-input-wrapper">
                            <form onSubmit={handleMessage}>
                                <input
                                    type="text"
                                    placeholder={inputText}
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    required
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
