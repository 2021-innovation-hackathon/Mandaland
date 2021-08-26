import React from "react"
import { connect } from "react-redux"
import MandalViewChanger from "../../components/MandalViewChanger/MandalViewChanger"
import BasicMandal from "../../components/BasicMandal/BasicMandal"
import { fetchMandal, fetchLog, patchLog } from "../../actions"

class Mandalart extends React.Component {
    componentDidMount() {
        this.props.fetchMandal(this.props.match.params.mandalId)
        this.props.fetchLog(this.props.match.params.userId, this.props.match.params.mandalId)
    }

    renderContents() {
        if (this.props && this.props.mandal)
            return (
             <BasicMandal mandal={this.props.mandal} log={this.props.log} patchLog={this.props.patchLog} />
            )
        return null;
    }

    render() {
        return (
            <div>
                <MandalViewChanger />
                {this.renderContents()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mandal: state.mandal[ownProps.match.params.mandalId],
        log: state.log,
    }
}

export default connect(mapStateToProps, { fetchMandal, fetchLog, patchLog })(Mandalart)
