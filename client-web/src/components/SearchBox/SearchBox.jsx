import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getUserList } from '../../actions'
import "./SearchBox.css"

  
const clickSearch = (e) => {
    console.log(e.target.value);
}

const SearchBox = (props) => {
    useEffect(()=> {
        props.getUserList()
    }, [])
    console.log(props)

    const enterkey = (e) => {
        if (window.event.keyCode == 13) {
            // 엔터키가 눌렸을 때 실행할 내용
            console.log(e.target.value) //input태그에 들어온 내용
            window.location.href = `/mandalplan/view/${searchByUsername(e.target.value)}`
        }
    } 
    // const searchByKeyword = (keyword) => {
    //     let
    // }
    const searchByUsername = (username) => {
        let correspondResult = [];
        console.log(props.userlist)
        if(props.userlist != undefined) {
            correspondResult = props.userlist.filter((ele) => {
                return ele.name.includes(username)
            })
        }
        return correspondResult[0].id
    }
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
        userlist:state.userlist.userlist
    }
}

export default connect(mapStateToProps, { getUserList })(SearchBox)
