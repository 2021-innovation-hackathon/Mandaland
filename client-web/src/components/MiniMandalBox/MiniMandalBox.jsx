import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BodyText from "../Typography/BodyText"
import "./MiniMandalBox.css"

const MiniMandalBox = (props) => {
    console.log(props)
    return (
        <div className={`${props.backgroundColor == true ? "bgShadow" : ""}`}>
            <Link to={`/mandalart/${props.owner}/${props.mandalId}`}>
                <div className={`${props.size}MandalBox ${props.size}Mandal ${props.backgroundColor == true ? "transform" : ""}`}>
                    <ul>
                        <li>
                            {/* TO DO: 이미지 변경 가능하도록 */}
                            {/* feed에서 상단에 프로필과 하트가 있는 바를 나타내는 영역 <-- */}
                            {props.getHeart && (
                                <div className="userInfoArea">
                                    <div className="wrapUserPic">
                                        <img src={props.imagePath} alt="" className="userPic" />
                                        <div className="typography">
                                            <BodyText fontsize={14} text={props.name} />
                                        </div>
                                    </div>
                                    <div className="userHeartArea">
                                        <img src={window.location.origin + "/images/heart.png"} alt="" className="heartIcon" />
                                        {/* TO DO: db -> heart count */}
                                        <BodyText fontsize={12} text={props.heartNum} />
                                    </div>
                                </div>
                            )}
                            {/* --> */}

                            {props.thumbnail == undefined ? (
                                <img src={window.location.origin + "/images/thumbnail.png"} alt="thumbnail" className="mandalthumbnail" />
                            ) : (
                                <img src={window.location.origin + `${props.thumbnail}`} alt="thumbnail" className="mandalthumbnail" />
                            )}
                        </li>
                        <li>
                            <div className={`textTitleDate ${props.backgroundColor == true ? "bgYellow" : ""}`}>
                                <span>{props.title}</span>
                                {props.startDate != null && (
                                    <span>
                                        {props.startDate} ~ {props.endDate}
                                    </span>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </Link>
        </div>
    )
}
// 만다라트 주인을 넣어줘야할듯
const mapStateToProps = (state) => {
    return { user: state.user }
}

export default connect(mapStateToProps)(MiniMandalBox)
