import React from "react"
import { connect } from "react-redux"
import { fetchLand, saveLand } from "../../actions"
import history from "../../history"
import Voxelpainter from "./Three"

import "./Mandaland.css"
class Mandaland extends React.Component {
    componentDidMount = () => {
        this.props.fetchLand(this.props.match.params.userId)
    }

    onSave = (landId, newCubes) => {
        this.props.saveLand(landId, newCubes)
    }

    render() {
        if (!this.props.user || !this.props.user.isSignedIn) history.push("/")
        if (!this.props.land || this.props.land.length === 0) {
            return null
        } else {
            return (
                <div>
                    <Voxelpainter userId={this.props.land.land.userId} landId={this.props.land.land.id} landcubes={this.props.land.land.cubes} count={this.props.land.count + 100} onSave={this.onSave} />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        land: state.land,
    }
}

export default connect(mapStateToProps, { fetchLand, saveLand })(Mandaland)
