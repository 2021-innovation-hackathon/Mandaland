import React from "react"
import { connect } from "react-redux"
import { fetchLand, saveLand } from "../../actions"
import Voxelpainter from "./Three"

import "./Mandaland.css"
class Mandaland extends React.Component {
    componentDidMount = () => {
        this.props.fetchLand()
    }

    onSave = (landId, newCubes) => {
        this.props.saveLand(landId, newCubes)
    }

    render() {
        if (!this.props.land || this.props.land.length === 0) {
            return null
        } else {
            const App = document.querySelector(".App")
            return (
                <div>
                    <Voxelpainter landId={this.props.land.land.id} landcubes={this.props.land.land.cubes} count={this.props.land.count + 100} onSave={this.onSave} />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        land: state.land,
    }
}

export default connect(mapStateToProps, { fetchLand, saveLand })(Mandaland)
