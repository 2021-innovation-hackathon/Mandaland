import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Mandalart from '../Mandalart/Mandalart'
import FeedTitle from '../../components/FeedTitle/FeedTitle'
import BasicMandal from '../../components/BasicMandal/BasicMandal'
import { fetchMandal, fetchLog } from '../../actions'
import './FeedMandalart.css'

const FeedMandalart = (props) => {
    useEffect(() => {
        props.fetchMandal(props.match.params.mandalId)
        props.fetchLog(props.match.params.userId, props.match.params.mandalId)
    }, [])

    return (
        <div>
            <FeedTitle subtitle="이달의 인기 만다라트"/>
            {(props != null && props.mandal != null) && ( <BasicMandal mandal={props.mandal} log={props.log}/>) }
            {/* patchLog 넘겨주면 안됨(체크 가능하게 하는 것) */}
            {console.log(props.mandal)}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        mandal: state.mandal[ownProps.match.params.mandalId],
        log: state.log,
    }
}

export default connect(mapStateToProps, { fetchMandal, fetchLog })(FeedMandalart)
