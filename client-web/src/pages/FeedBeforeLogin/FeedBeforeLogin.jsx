import React from 'react'
import FeedTitle from '../../components/FeedTitle/FeedTitle';
import HeaderText from '../../components/Typography/HeaderText';
import BodyText from '../../components/Typography/BodyText';
import MiniMandalBox from '../../components/MiniMandalBox/MiniMandalBox';
import './FeedBeforeLogin.css'

const FeedBeforeLogin = (props) => {
    // TO DO: remove margin
    // const rmMargin = {
    //     margin: 0
    // }
    const curMandalMarginstyle = {
        justifyContent :"space-between",
    }    
    const keywordArr = [
        '디자인', '개발', '환경사랑', '고시', '취미생활', '문화. 예술', '건강', '사진', 
        '영화', ' 음악', '동물', '음식', '뮤지컬', '루틴', '알고리즘', '언어'
    ]
    
    return (
        <div>
            <FeedTitle />
            <section>
                <article className="keyword-section">
                    <HeaderText text="만다라트 키워드"/>
                    <div class="keyword-wrapper">
                        {keywordArr.map((ele) => {
                            return <BodyText fontsize="20" text={ele} />
                        })}
                    </div>
                </article>
                <article className="popular-section">
                    <HeaderText text="이달의 인기 만다라트"/>
                    <div className="currentMandals" style={curMandalMarginstyle}>
                        {/* 일단 인기만다라트를 측정할 척도가 없으므로 더미로 넣음 */}
                        {currentMandalArr.map((mandal) => {
                            return <MiniMandalBox key={mandal.id} size="mini" title={mandal.title} startDate={mandal.startDate} endDate={mandal.endDate}  getHeart={true} userInfo={mandal} thumbnail={mandal.thumbnailPath} imagePath={mandal.imagePath} name={mandal.userName} heartNum={mandal.heartNum} backgroundColor={true}/>
                        })}
                    </div>

                </article>
            </section>
        </div>
    )
}
const currentMandalArr = [
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

export default FeedBeforeLogin;
