import './index.css'

export default function ReccommendationBubbles({quickPrompt}){
    return(
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
    )
}
