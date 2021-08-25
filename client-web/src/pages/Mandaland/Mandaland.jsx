import React from "react"
import { connect } from "react-redux"
import { fetchLand, saveLand } from "../../actions"
import Voxelpainter from "./Three"
// import CustomButton from "../../components/CustomButton/CustomButton"

import "./Mandaland.css"

class Mandaland extends React.Component {
    componentDidMount = () => {
        this.props.fetchLand()
    }

    onSave = (newCubes) => {
        this.props.saveLand(newCubes)
    }

    render() {
        if (!this.props.land || this.props.land.length === 0) {
            return null
        } else {
            const App = document.querySelector(".App")
            return (
                <div>
                    <Voxelpainter landcubes={this.props.land.cubes} onSave={this.onSave} />
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
