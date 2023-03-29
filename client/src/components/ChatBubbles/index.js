import './index.css'

export default function ChatBubble({type}){
    if(type === "human"){
        return(
            <div className="chat-wrapper human-wrapper">
                <p>Hey, this is a human saying something</p>
                <p className="chat-time">8:30pm</p>
            </div>
        )
    }else{
        return (
            <div className="chat-wrapper bot-wrapper">
                <p>Hey, this is Real Assist Ai, How can I help you?</p>
                <p className="chat-time">8:30pm</p>
            </div>
        )
    }

}
