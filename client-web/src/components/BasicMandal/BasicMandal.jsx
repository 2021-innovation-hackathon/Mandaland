import React from 'react'
import history from '../../history'
import CustomButton from "../../components/CustomButton/CustomButton"
import GoalCheck from "../../components/GoalCheck/GoalCheck"
import "./BasicMandal.css"

const BasicMandal = (props) => {

    const renderDate = () => {
        if (!props.mandal || !props.mandal.mandal) return null
        let { startDate, endDate } = props.mandal.mandal
        startDate = startDate ? startDate.replaceAll("-", ".") : startDate
        endDate = endDate ? endDate.replaceAll("-", ".") : endDate
        return (
            <div className="date-container view">
                <div>{startDate}</div>
                <div className="tilda-padding">~</div>
                <div>{endDate}</div>
            </div>
        )
    }

    const onCheck = () => (miniMandalIndex, goalIndex, check) => {
        if (props.patchLog) {
            props.log.checks[miniMandalIndex][goalIndex] = check
            props.patchLog(miniMandalIndex, goalIndex, check, props.log)
        }
    }

    const renderSmallGrid = (miniMandal, key_i) => {
        const mini = miniMandal.goals.map((goal, i) => {
            const className = i === 4 ? "goal keyword" : "goal"
            const check = props.log.checks ? props.log.checks[key_i][i] : 0
            const onCheckCallback = key_i === 4 || i === 4 ? null : onCheck
            return <GoalCheck isCheck={check} className={className} key={i} index={[key_i, i]} goal={goal} onCheck={onCheckCallback} />
        })

        const className = key_i === 4 ? "mini-container center-mandal" : "mini-container"
        return (
            <div className={className} key={key_i}>
                {mini}
            </div>
        )
    }

    const renderBigGrid = () => {
        if (!props.mandal || !props.mandal.miniMandals) return null
        return <div className="mandal-big-grid">{props.mandal.miniMandals.map((miniMandal, i) => renderSmallGrid(miniMandal, i))}</div>
    }

    const renderDescription = () => {
        if (!props.mandal || !props.mandal.mandal) return null
        return (
            <div className="description-container">
                <div className="title">
                    <span className="pixel"> TITLE : </span>
                    <span className="bold">{props.mandal.mandal.title}</span>
                </div>
                <div className="devider" />
                <div className="contents">
                    <span className="pixel"> CONTENTS : </span>
                    {props.mandal.mandal.contents}
                </div>
            </div>
        )
    }

    const renderEditButton = () => {

        if (props.mandal.userId && localStorage.getItem("id") === props.mandal.userId) {
        return (
            <div className="button-wrapper">
                <CustomButton
                    text="EDIT"
                    onClick={() => {
                    history.push(`/mandalplan/edit/${props.mandal.id}`)
                    }}
                />
            </div>
            )
        }
    }

        return (
            <React.Fragment>
                <div className="mandalart-container-wrapper view">
                    {renderDate()}
                    <img src="/icons/pixel_arrow_left_x2.png" alt="arrow-left" />
                    <div className="mandalart-container view">
                        {renderDescription()}
                        {renderBigGrid()}
                    </div>
                    <img src="/icons/pixel_arrow_right_x2.png" alt="arrow-right" />
                </div>
                {renderEditButton()}
            </React.Fragment>
        )
}

export default BasicMandal
