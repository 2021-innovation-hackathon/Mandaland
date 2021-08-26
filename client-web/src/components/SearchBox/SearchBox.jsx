import React, { useEffect, setState, useState } from "react"
import { connect } from "react-redux"
import { getUserList, getAllMandal } from '../../actions'
import "./SearchBox.css"

  


const SearchBox = (props) => {
    useEffect(()=> {
        props.getUserList()
        props.getAllMandal()
    }, [])

    const enterkey = (e) => {
        if (window.event.keyCode == 13) {
            search(curSelect)
        }
    } 
    const search = (curSelect) => {
        const keyword = document.querySelector('.inputBox').value;
        if(curSelect == "username") {
            const id = searchByUsername(keyword)
           { id != undefined && (window.location.href = `/mandalplan/view/${id}`) }
        }
        else {
            const id = searchBytopic(keyword)
            {id != undefined && (window.location.href = `/mandalplan/view/${id}`) }
        }
    }
    const searchByUsername = (username) => {
        let correspondResult = [];

        if(props.userlist != undefined) {
            correspondResult = props.userlist.filter((ele) => {
                return ele.name.includes(username)
            })
        }
        if(correspondResult.length == 0) {
            alert("사용자가 존재하지 않습니다");
            return
        }
        return correspondResult[0].id
    }
    const searchBytopic = (topic) => {
        let titlecorrespondResult = [];

        if(props.allmandal != undefined) {
            titlecorrespondResult = props.allmandal.filter((ele) => {
                if(ele.title != undefined) {
                    return ele.title.includes(topic)
                }
                return false
            })
        }
        if(titlecorrespondResult.length == 0) {
            alert("주제가 존재하지 않습니다")
            return
        }
        return titlecorrespondResult[0].userId
    }
    let curSelect = "topic";
    return (
        
        <div className="inputBoxAlign">
            <div className="inputBoxWrapper">
                <select name="" id="selectBox" className="selectBoxStyle pixel" onChange={(e)=> {curSelect = e.target.value}}>
                    <option value="topic">주제</option>
                    <option value="username">사용자</option>
                </select>
                <input type="text" placeholder="검색어를 입력하세요" className="inputBox" onKeyUp={(e) => enterkey(e)} />
                
                <img src={window.location.origin + "/icons/search.svg"} alt="searchButton" className="searchIconStyle" onClick={(curSelect) => search(curSelect)}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userlist:state.userlist.userlist,
        allmandal:state.allmandal.allmandal,
    }
}

export default connect(mapStateToProps, { getUserList, getAllMandal })(SearchBox)
