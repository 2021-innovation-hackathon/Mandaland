import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./Navlist.css"

const Navlist = ({ title, iconPath, aLink, dropContent, open }) => {
    const isDropable = dropContent ? true : false
    const [drop, setDrop] = useState(false)

    const renderIconImage = () => {
        return iconPath ? <img className="navlist-icon" src={iconPath} alt="navlist-icon" /> : null
    }

    const renderWrapperStyle = () => {
        return open ? {} : { width: "0px", paddingRight: "0px" }
    }

    const renderLinkStyle = () => {
        return open ? {} : { visibility: "hidden" }
    }

    const onClickDropButton = () => {
        const newState = drop ? false : true
        setDrop(newState)
    }

    const renderDropButton = () => {
        return isDropable ? (
            <div className="navlist-drop-button" onClick={onClickDropButton}>
                ▾
            </div>
        ) : (
            <div className="navlist-drop-button hide">▾</div>
        )
    }

    const renderDropdownNavList = () => {
        if (!drop || !isDropable) return null
        const navlists = dropContent.map((info) => {
            const { dropTitle, dropLink } = info
            return <Navlist title={dropTitle} open={open} aLink={dropLink} />
        })
        return <div className="dropdown-list-container">{navlists}</div>
    }

    const renderNavList = () => {
        return (
            <React.Fragment>
                <div className="navlist-container english">
                    <div className="navlist-flex-container">
                        {renderIconImage()}
                        <Link to={aLink} className="navlist-link-wrapper" to={aLink} style={renderWrapperStyle()}>
                            <div className="navlist-link" style={renderLinkStyle()}>
                                {title}
                            </div>
                        </Link>
                        {renderDropButton()}
                    </div>
                </div>
                {renderDropdownNavList()}
            </React.Fragment>
        )
    }

    return renderNavList()
}

export default Navlist
