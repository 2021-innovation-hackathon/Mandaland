import React, { useRef, useState, useEffect } from "react"
import LoginButton from "../LoginButton/LoginButton"
import { connect } from "react-redux"
import "./Profile.css"

const Profile = ({ userImg }) => {
    const dropdownRef = useRef(null)
    const [isActive, setIsActive] = useState(false)
    const onClick = () => setIsActive(!isActive)

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive)
            }
        }

        if (isActive) {
            window.addEventListener("click", pageClickEvent)
        }

        return () => {
            window.removeEventListener("click", pageClickEvent)
        }
    }, [isActive])

    return (
        <div className="profileWrapper">
            <span className="alertIcon">
                {/* TO DO: icon 이 숫자를 포함하고 있어서 변경필요 */}
                <img src={window.location.origin + "/icons/bell.svg"} alt="bell" />
            </span>
            <img src={userImg === null ? window.location.origin + "/icons/user.svg" : userImg} alt="" className="profileBtn" onClick={() => onClick()} />
            <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                <ul>
                    <li>
                        <a href="/settings">
                            <span>Settings</span>
                        </a>
                    </li>
                    <li onClick={() => onClick()}>
                        <LoginButton />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { userImg: state.user.imagePath }
}

export default connect(mapStateToProps)(Profile)
