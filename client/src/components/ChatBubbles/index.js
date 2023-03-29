import './index.css'

export default function ChatBubble({type, content}){
    if(type === "user"){
        return(
            <div className="chat-wrapper human-wrapper">
                <p>{content}</p>
                <p className="chat-time">8:30pm</p>
            </div>
        )
    }else{
        return (
            <div className="chat-wrapper bot-wrapper">
                <p>{content}</p>
                <p className="chat-time">8:30pm</p>
            </div>
        )
    }

}
