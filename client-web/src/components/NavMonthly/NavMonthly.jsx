import React from "react"
import { connect } from "react-redux"
import "./NavMonthly.css"
import { getMonthDays, weekDay, monthList } from "./Calendar.js"
import { calculateColor } from "./calculateColor"
import { fetchMonthLog } from "../../actions"

class NavMonthly extends React.Component {
    nowDate = new Date()
    state = {
        theFirst: new Date(this.nowDate.getFullYear(), this.nowDate.getMonth(), 1),
    }

    componentDidMount = () => {
        this.props.fetchMonthLog(this.state.theFirst.getMonth())
    }

    renderClassName() {
        const { open } = this.props
        return open ? "" : "close"
    }

    onClickLeft = () => {
        let displayeYear = this.state.theFirst.getFullYear()
        let displayedMonth = this.state.theFirst.getMonth() - 1
        if (displayedMonth === -1) {
            displayeYear--
            displayedMonth = 11
        }
        this.setState({ theFirst: new Date(displayeYear, displayedMonth, 1) })
        this.props.fetchMonthLog(displayedMonth)
    }

    onClickRight = () => {
        let displayeYear = this.state.theFirst.getFullYear()
        let displayedMonth = this.state.theFirst.getMonth() + 1
        if (displayedMonth === 12) {
            displayeYear++
            displayedMonth = 0
        }
        this.setState({ theFirst: new Date(displayeYear, displayedMonth, 1) })
        this.props.fetchMonthLog(displayedMonth)
    }

    renderMonthTitle = () => {
        const monthYearTitle = `${monthList[this.state.theFirst.getMonth()]}, ${this.state.theFirst.getFullYear()}`
        const paths = ["/icons/arrow_left.svg", "/icons/arrow_right.svg"].map((path) => window.location.origin + path)
        return (
            <div className="month-title-wrapper">
                <div className="month-title-container">
                    <img src={paths[0]} alt="left-arrow" className="arrow-button left" onClick={this.onClickLeft} />
                    <div>{monthYearTitle}</div>
                    <img src={paths[1]} alt="right-arrow" className="arrow-button right" onClick={this.onClickRight} />
                </div>
            </div>
        )
    }

    renderDayTileColor = (day) => {
        if (!this.props.log.monthLog || !this.props.log.monthLog[day]) return {}
        return { backgroundColor: calculateColor(this.props.log.monthLog[day]) }
    }

    renderTiles = (days) => {
        const emptyArray = Array(this.state.theFirst.getDay()).fill(" ")
        const daysArray = Array.from({ length: days }, (_, i) => i + 1)
        return (
            <div className="tile-container">
                {weekDay.map((day) => (
                    <div className="weekday-tile" key={day}>
                        {day}
                    </div>
                ))}
                {emptyArray.map((_, i) => (
                    <div className="day-tile empty" key={i}></div>
                ))}
                {daysArray.map((day) => (
                    <div className="day-tile" key={day} style={this.renderDayTileColor(day)}>
                        {day}
                    </div>
                ))}
            </div>
        )
    }

    renderCalendar = () => {
        const monthDays = getMonthDays(this.state.theFirst)
        const thisMonthDays = monthDays[this.state.theFirst.getMonth()]
        return <div className="calendar-content-container">{this.renderTiles(thisMonthDays)}</div>
    }

    render = () => {
        return (
            <div className={`navmonthly-container english ${this.renderClassName()}`}>
                <div className="navmonthly-title">Monthly progress</div>
                <div className="calendar-container">
                    {this.renderMonthTitle()}
                    {this.renderCalendar()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        log: state.log,
    }
}

export default connect(mapStateToProps, { fetchMonthLog })(NavMonthly)
