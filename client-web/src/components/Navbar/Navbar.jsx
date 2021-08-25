import React from "react"
import { connect } from "react-redux"
import "./Navbar.css"
import NavProfile from "../NavProfile/NavProfile"
import Navlist from "../Navlist/Navlist"
import NavMonthly from "../NavMonthly/NavMonthly"

class Navbar extends React.Component {
    state = { open: true }

    dropContent = [
        { dropTitle: "My", dropLink: "/mandalplan" },
        { dropTitle: "New", dropLink: "/mandalplan/new" },
    ]

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

    renderContents = () => {
        const imagePaths = ["/icons/home.svg", "/icons/search_white.svg", "/icons/plan.svg", "/icons/land.svg", "/icons/setting.svg"].map((path) => window.location.origin + path)
        const tempLink = "/"

        return (
            <nav className="navbar" style={{ width: this.renderNavWidth() + "px" }}>
                <NavProfile open={this.state.open} userProfile={this.props.user} />
                <div className="wrapNavmenu">
                    <Navlist title="Home" iconPath={imagePaths[0]} open={this.state.open} aLink={tempLink} />
                    <Navlist title="Feed" iconPath={imagePaths[1]} open={this.state.open} aLink={tempLink} />
                    <Navlist title="Mandalplan" iconPath={imagePaths[2]} open={this.state.open} aLink={"/mandalplan"} dropContent={this.dropContent} />
                    <Navlist title="Mandaland" iconPath={imagePaths[3]} open={this.state.open} aLink={tempLink} />
                    <Navlist title="Setting" iconPath={imagePaths[4]} open={this.state.open} aLink={tempLink} />
                </div>
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

export default connect(mapStateToProps)(Navbar)
