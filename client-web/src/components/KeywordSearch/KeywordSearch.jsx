import React from "react"
import "./KeywordSearch.css"

class KeywordSearch extends React.Component {
    renderMiniMandal(miniData) {
        return (
            <React.Fragment>
                {miniData.goals.map((goal, i) => {
                    const className = i === 4 ? "goal keyword" : "goal"
                    return <div className={className}>{goal}</div>
                })}
            </React.Fragment>
        )
    }

    renderContent() {
        // let tempMinis
        if (!tempMinis)
            return (
                <div className="keyword-guide">
                    <div className="guide-container">
                        <img src="/icons/calendar_big.svg" alt="no-keywords-image" />
                        <div className="text big">관심있는 키워드 검색을 통해</div>
                        <div className="text">다른 사람들의 미니 만다라트를 참고해보세요!</div>
                    </div>
                </div>
            )
        return (
            <div className="grid-scroll">
                <div className="mini-column-grid">
                    {tempMinis.map((mini) => {
                        return <div className="mini-container">{this.renderMiniMandal(mini)}</div>
                    })}
                </div>
                <div className="data-end-padding" />
            </div>
        )
    }

    getGridHeight() {
        console.log(tempMinis.length)
        const height = tempMinis ? 170 + tempMinis.length * 255 + "px" : "100%"
        return { height: height }
    }

    render() {
        return (
            <div className="keyword-search-container">
                <form>
                    <div>
                        <div className="search-container">
                            <div className="search-wrapper">
                                <input type="text" placeholder="키워드를 입력해주세요." />
                                <img className="search-button" src="/icons/search.svg" alt="search" />
                            </div>
                        </div>
                    </div>
                </form>
                {this.renderContent()}
            </div>
        )
    }
}

export default KeywordSearch
const tempMinis = [
    {
        id: 1,
        keyword: "하나수정",
        goals: ["11", "12", "13", "14", "하나수정", "16", "17", "18", "19"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 2,
        keyword: "둘",
        goals: ["21", "22", "23", "24", "둘", "26", "27", "28", "29"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 3,
        keyword: "셋",
        goals: ["31", "32", "33", "34", "셋", "36", "37", "38", "39"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 4,
        keyword: "넷",
        goals: ["41", "42", "43", "44", "넷", "46", "47", "48", "49"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 5,
        keyword: "가운데는 키워드",
        goals: ["51", "52", "53", "54", "가운데는 키워드", "56", "57", "58", "59"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 6,
        keyword: "여섯",
        goals: ["61", "62", "63", "64", "여섯", "66", "67", "68", "69"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 7,
        keyword: "일곱",
        goals: ["71", "72", "73", "74", "일곱", "76", "77", "78", "79"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 8,
        keyword: "여덟",
        goals: ["81", "82", "83", "84", "여덟", "86", "87", "88", "89"],
        mandalId: 1,
        userId: 1,
    },
    {
        id: 9,
        keyword: "아홉",
        goals: ["91", "92", "93", "94", "아홉", "96", "97", "98", "99"],
        mandalId: 1,
        userId: 1,
    },
]
