import React from "react"
import { connect } from "react-redux"
import { createMandal } from "../../actions"
import MandalViewChanger from "../../components/MandalViewChanger/MandalViewChanger"
import MandalForm from "../../components/MandalForm/MandalForm"
import KeywordSearch from "../../components/KeywordSearch/KeywordSearch"
import "./NewMandalart.css"

class NewMandalart extends React.Component {
    onSubmit = (formValues) => {
        const { title, contents, thumbnailPath, startDate, endDate, ...miniData } = formValues
        this.props.createMandal({ title, contents, thumbnailPath, startDate, endDate }, miniData)
    }

    render() {
        return (
            <div className="form-page-container">
                <div>
                    <MandalViewChanger />
                    <MandalForm onSubmit={this.onSubmit} />
                </div>
                <KeywordSearch />
            </div>
        )
    }
}

export default connect(null, { createMandal })(NewMandalart)
