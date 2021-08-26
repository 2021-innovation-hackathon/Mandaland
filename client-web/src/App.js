import { Router, Route, Switch } from "react-router-dom"
import history from "./history"

import Main from "./pages/Main"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Mandalart from "./pages/Mandalart/Mandalart"
import MyMandalList from "./pages/MyMandalList/MyMandalList"
import FeedBeforeLogin from "./pages/FeedBeforeLogin/FeedBeforeLogin"
import NewMandalart from "./pages/NewMandalart/NewMandalart"
import EditMandalart from "./pages/EditMandalart/EditMandalart"
import Mandaland from "./pages/Mandaland/Mandaland"
import FeedLogin from "./pages/FeedLogin/FeedLogin"

import "./components/reset.css"
import "./components/common.css"

function App() {
    const style = {
        fontFamily: "AppleSDGothic",
    }
    return (
        <div className="App" style={style}>
            <Router history={history}>
                <Header />
                <div className="main-container">
                    <Navbar />
                    <Switch>
                        <div className="main-body">
                            <Route path="/" exact component={Main} />
                            <Route path="/mandalplan/view/:userId" exact component={MyMandalList} />
                            <Route path="/mandalplan/new" exact component={NewMandalart} />
                            <Route path="/mandalplan/edit/:mandalId" exact component={EditMandalart} />
                            <Route path="/mandalart/:userId/:mandalId" exact component={Mandalart} />
                            <Route path="/feed/before" exact component={FeedBeforeLogin} />
                            <Route path="/feed/view/:userId" exact component={FeedLogin} />
                            <Route path="/mandaland/:userId" exact component={Mandaland} />
                        </div>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
