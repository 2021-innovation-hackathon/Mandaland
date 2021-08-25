import React from "react"
import { Link } from "react-router-dom"

import "./SearchBox.css"

const enterkey = (e) => {
    if (window.event.keyCode == 13) {
        // 엔터키가 눌렸을 때 실행할 내용
        console.log(e.target.value) //input태그에 들어온 내용
    }
}   
const clickSearch = (e) => {
    console.log(e.target.value);
}

const SearchBox = () => {
    return (
        <div className="inputBoxAlign">
            <div className="inputBoxWrapper">
                <select name="" id="" className="selectBoxStyle pixel">
                    <option value="">주제</option>
                    <option value="">사용자</option>
                </select>
                <input type="text" placeholder="검색어를 입력하세요" className="inputBox" onKeyUp={(e) => enterkey(e)} />
                <img src={window.location.origin + "/icons/search.svg"} alt="searchButton" className="searchIconStyle" onClick={(e) => clickSearch(e)}/>
            </div>
        </div>
    )
}

export default SearchBox
