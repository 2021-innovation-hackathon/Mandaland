import React from "react"
import "./GoalCheck.css"

class GoalCheck extends React.Component {
    state = { check: this.props.isCheck }

    onGoalClick = (miniMandalIndex, goalIndex) => {
        if (this.props.onCheck) {
            const check = this.state.check === 1 ? 0 : 1
            this.setState({ check: check })
            this.props.onCheck(miniMandalIndex, goalIndex, check)
        }
    }

    renderBackgroundColor = () => {
        return this.state.check === 1 ? { backgroundColor: "rgb(240, 103, 86)" } : {}
    }

    render() {
        const { className, index, goal } = this.props
        const [key_i, i] = index
        return (
            <div className={className} key={i} style={this.renderBackgroundColor()} onClick={() => this.onGoalClick(key_i, i)}>
                {goal}
            </div>
        )
    }
}

export default GoalCheck
