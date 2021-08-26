import React from "react"
import "./Main.css"

const Main = () => {
    const embedId = "t_wQPvxQ6GM"
    return (
        <div className="video">
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}?rel=0&autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    )
}

export default Main
