import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { Route, Switch } from "react-router"
import configureStore, { history } from "./configureStore"
import Home from "./pages/Home"
import "antd/dist/antd.css"
import "./App.css"

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/form" render={() => <div>form</div>} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
