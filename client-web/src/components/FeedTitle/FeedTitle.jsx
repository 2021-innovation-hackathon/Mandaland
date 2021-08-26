import React from 'react'
import './FeedTitle.css'

const FeedTitle = ({subtitle}) => {
    return (
        <div>
            <div className="feed-title english">
                <span>FEED</span>
                {subtitle && 
                    <>
                        <div className="vertical-devider" />
                        <span>{subtitle}</span>
                    </>
                }
                
            </div>
            
        </div>
    )
}

export default FeedTitle
