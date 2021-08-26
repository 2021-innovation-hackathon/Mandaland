import React from "react"
import { connect } from "react-redux"
import "./Navbar.css"
import NavProfile from "../NavProfile/NavProfile"
import Navlist from "../Navlist/Navlist"
import NavMonthly from "../NavMonthly/NavMonthly"

class Navbar extends React.Component {
    state = { open: true }
    componentDidMount = () => {
        console.log(this.props)
    }

    getDropContent = () => {
        let userId
        if (!this.props.user) userId = ""
        else userId = this.props.user.id
        const dropContent = [
            { dropTitle: "My", dropLink: `/mandalplan/view/${userId}` },
            { dropTitle: "New", dropLink: "/mandalplan/new" },
        ]
        return dropContent
    }

    onToggleClick = () => {
        const state = this.state.open ? false : true
        this.setState({ open: state })
    }

    renderNavWidth = () => {
        return this.state.open ? 280 : 102
    }

    renderToggleTitle = () => {
        return this.state.open ? "Close" : "Open"
    }

    renderNavlists = () => {
        const imagePaths = ["/icons/home.svg", "/icons/search_white.svg", "/icons/plan.svg", "/icons/land.svg", "/icons/setting.svg"].map((path) => window.location.origin + path)
        const tempLink = "/"
        if (this.props && this.props.user.isSignedIn) {
            return (
                <React.Fragment>
                    <Navlist title="Home" iconPath={imagePaths[0]} open={this.state.open} aLink={tempLink} />
                    <Navlist title="Feed" iconPath={imagePaths[1]} open={this.state.open} aLink={`/feed/view/${this.props.user.id}`} />
                    <Navlist title="Mandalplan" iconPath={imagePaths[2]} open={this.state.open} aLink={`/mandalplan/view/${this.props.user.id}`} dropContent={this.getDropContent()} />
                    <Navlist title="Mandaland" iconPath={imagePaths[3]} open={this.state.open} aLink={`/mandaland/${this.props.user.id}`} />
                    <Navlist title="Setting" iconPath={imagePaths[4]} open={this.state.open} aLink={"/setting"} />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Navlist title="Home" iconPath={imagePaths[0]} open={this.state.open} aLink={tempLink} />
                    <Navlist title="Feed" iconPath={imagePaths[1]} open={this.state.open} aLink={"/feed/before"} />
                </React.Fragment>
            )
        }
    }

    renderContents = () => {
        return (
            <nav className="navbar" style={{ width: this.renderNavWidth() + "px" }}>
                <NavProfile open={this.state.open} userProfile={this.props.user} />
                <div className="wrapNavmenu">{this.renderNavlists()}</div>
                <NavMonthly open={this.state.open} />
                <div className="toggle-button-wrapper">
                    <div className="toggle-button" onClick={this.onToggleClick}>
                        {this.renderToggleTitle()}
                    </div>
                </div>
                <div className="marginDiv"></div>
            </nav>
        )
    }

    render() {
        return <React.Fragment>{this.renderContents()}</React.Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(Navbar)
