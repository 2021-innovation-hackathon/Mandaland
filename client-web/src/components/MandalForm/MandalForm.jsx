import React from "react"
import { reduxForm, Field } from "redux-form"
import SubmitButton from "../../components/SubmitButton/SubmitButton"
import "./MandalForm.css"

class MandalForm extends React.Component {
    renderDate = () => {
        return (
            <div className="date-container">
                <Field component="input" type="date" name="startDate" className="start-date" />
                ~
                <Field component="input" type="date" name="endDate" className="end-date" />
            </div>
        )
    }

    renderSmallGrid = (key_i) => {
        const mini = Array(9)
            .fill(0)
            .map((_, i) => {
                const className = i === 4 ? "goal keyword" : "goal"
                return <Field component="input" className={className} name={`${key_i}-${i}`} key={`${key_i}-${i}`} />
            })

        const className = key_i === 4 ? "mini-container center-mandal" : "mini-container"
        return (
            <div className={className} key={key_i}>
                {mini}
            </div>
        )
    }

    renderBigGrid = () => {
        return (
            <div className="mandal-big-grid">
                {Array(9)
                    .fill(0)
                    .map((_, i) => this.renderSmallGrid(i))}
            </div>
        )
    }

    renderDescription = () => {
        return (
            <div className="description-container english">
                <div className="title">
                    <span className="pixel"> TITLE : </span>
                    <Field component="input" name="title" placeholder="제목을 입력해주세요." />
                </div>
                <div className="devider" />
                <div className="contents">
                    <span className="pixel"> CONTENTS : </span>
                    <Field component="input" name="contents" placeholder="내용을 입력해주세요." />
                </div>
            </div>
        )
    }

    renderEditButton = () => {
        return (
            <div className="button-wrapper">
                <SubmitButton text="SUBMIT" />
            </div>
        )
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
                <div className="mandalart-container-wrapper">
                    {this.renderDate()}
                    <div className="mandalart-container">
                        {this.renderDescription()}
                        {this.renderBigGrid()}
                    </div>
                </div>
                {this.renderEditButton()}
            </form>
        )
    }
}

export default reduxForm({
    form: "mandalForm",
})(MandalForm)
