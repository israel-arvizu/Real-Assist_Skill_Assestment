import './index.css'

export default function ChatBubble({type, content}){
    let timeStamp = new Date();
    timeStamp = timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    if(type === "user"){
        return(
            <div className="chat-wrapper human-wrapper">
                <p>{content}</p>
                <p className="chat-time">{timeStamp}</p>
            </div>
        )
    }else if(type === "error"){
        return (
            <div className="chat-wrapper error-wrapper">
                <p>{content}</p>
                <p className="chat-time">{timeStamp}</p>
            </div>
        )
    }else{
        return (
            <div className="chat-wrapper bot-wrapper">
                <p>{content}</p>
                <p className="chat-time">{timeStamp}</p>
            </div>
        )
    }

}
