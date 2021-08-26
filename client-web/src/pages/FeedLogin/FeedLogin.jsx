import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { getUserList } from '../../actions'
import FeedTitle from '../../components/FeedTitle/FeedTitle'
import HeaderText from '../../components/Typography/HeaderText'
import MiniMandalBox from '../../components/MiniMandalBox/MiniMandalBox'
import { keywordArr, renderMandalKeyword } from '../FeedBeforeLogin/FeedBeforeLogin'
import './FeedLogin.css'

const FeedLogin = (props) => {
    useEffect(()=> {
        props.getUserList()
    }, [])
    const currentUser = localStorage.getItem("id");
    let cnt = 0;
    const curMandalMarginstyle = {
        justifyContent :"space-between",
    }    

    const friendInfoMandals = (friendInfo) => {
        return (
            <Link to={`/mandalplan/view/${friendInfo.id}`}>
                <div className="bgShadow alignBoxes">
                    <div className="friendInfoBox friendInfo transform">
                        <ul>
                            <li className="profileArea">
                                <img src={window.location.origin + "/images/thumbnail.png"} className="imageStyle"></img>
                                <span className="nameText english">{friendInfo.name}</span>
                                <span>{friendInfo.email}</span>
                            </li>
                            <li className="resolution">
                                “ 하루하루를 성실하게 보내는 개발자입니다. ”
                            </li>
                        </ul>
                    </div>
                </div> 
            </Link>
        )
    }
    
    return (
        <div>
            <FeedTitle />
            <section>
                {renderMandalKeyword(keywordArr)}
            </section>
            <section className="wrapMargin">
                <HeaderText text="친구 만다라트"/>
                <article className="wrapSection">
                    {
                    (props.userlist != undefined) &&
                        props.userlist.map((friendInfo) => {
                            if((friendInfo.id != currentUser) && (cnt < 4)) {
                                cnt++
                                return (
                                    friendInfoMandals(friendInfo)
                                )
                            }
                    })
                    }
                </article>
            </section>
            <section className="wrapMargin">
                <HeaderText text="이런 만다라트는 어떠세요?"/>
                <article>
                <div className="currentMandals" style={curMandalMarginstyle}>
                    {/* 일단 인기만다라트를 측정할 척도가 없으므로 더미로 넣음 -> 더미이기때문에 이를 클릭하면 해당하는 userid와 mandalid가 없으므로 undefined되어 제대로 링크이동이 안됨*/}
                    {popularMandal.map((mandal) => {
                        return <MiniMandalBox key={mandal.id} size="mini" title={mandal.title} startDate={mandal.startDate} endDate={mandal.endDate}  getHeart={true} userInfo={mandal} thumbnail={mandal.thumbnailPath} imagePath={mandal.imagePath} name={mandal.userName} heartNum={mandal.heartNum} backgroundColor={true}/>
                    })}
                </div>
                </article>
            </section>
        </div>
    )
}

const popularMandal = [
    {
        id: 1,
        title: "행복하고 당당한 2021년의 나!!!",
        startDate: "2021.08.19",
        endDate: "2022.10.19",
        userName:"김민영",
        heartNum:30,
        imagePath: "https://lh3.googleusercontent.com/a-/AOh14Gj_4JMsoLLdEkDJ-_tb9MojLHH-DFAxWEZbDYe5Sw=s96-c",
        thumbnailPath:"/images/cat2.png",
    },
    {
        id: 2,
        title: "냥하쓰 멋지게 살자",
        startDate: "2021.03.03",
        endDate: "2022.10.19",
        userName:"김양하",
        heartNum:25,
        imagePath: "https://lh3.googleusercontent.com/a-/AOh14GgNjvW-PSK8WofI2yQbvZDMnrjp8OnPeZugi5d0=s96-c",
        thumbnailPath:"/images/thumbnail2.png",
    },
    {
        id: 3,
        title: "김서영의 만다라트",
        startDate: "2021.04.03",
        endDate: "",
        userName:"김서영",
        heartNum:22,
        imagePath: "https://lh3.googleusercontent.com/a-/AOh14Gj_4JMsoLLdEkDJ-_tb9MojLHH-DFAxWEZbDYe5Sw=s96-c",
        thumbnailPath:"/images/thumbnail3.png",
    },
    {
        id: 3,
        title: "오주머니의 만다라트",
        startDate: "2021.04.03",
        endDate: "",
        heartNum:10,
        userName:"오주연",
        imagePath: "https://lh3.googleusercontent.com/a-/AOh14Gj_4JMsoLLdEkDJ-_tb9MojLHH-DFAxWEZbDYe5Sw=s96-c",
        thumbnailPath:"/images/thubnail4.png",
    },
]

const mapStateToProps = (state) => {
    return {
        userlist:state.userlist.userlist,
    }
}


export default  connect(mapStateToProps, { getUserList })(FeedLogin)
