import React from "react"
import { connect } from "react-redux"
import { signIn, signOut } from "../../actions"
import "./LoginButton.css"

class LoginButton extends React.Component {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: process.env.REACT_APP_GOOGLE_AUTH_KEY,
                    scope: "email",
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance()
                    this.onAuthChange(this.auth.isSignedIn.get())
                    this.auth.isSignedIn.listen(this.onAuthChange)
                })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            const userInfo = [
                this.auth.currentUser.get().getId(),
                this.auth.currentUser.get().getBasicProfile().getEmail(),
                this.auth.currentUser.get().getBasicProfile().getGivenName(),
                this.auth.currentUser.get().getBasicProfile().getImageUrl().replace("=s96-c", ""),
            ]
            this.props.signIn(userInfo)
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            if (this.props) {
                return (
                    <React.Fragment>
                        <span className="link" onClick={this.onSignOutClick}>
                            로그아웃
                        </span>
                    </React.Fragment>
                )
            }
            return null
        } else {
            return (
                <span id="login" className="link" onClick={this.onSignInClick}>
                    로그인
                </span>
            )
        }
    }

    render() {
        return this.renderAuthButton()
    }
}

const mapStateToProps = (state) => {
    return {
        authorization: state.user.authorization,
        isSignedIn: state.user.isSignedIn,
        userName: state.user.userName,
    }
}

export default connect(mapStateToProps, { signIn, signOut })(LoginButton)
