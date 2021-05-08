import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { Route, Switch } from "react-router"
import configureStore, { history } from "./configureStore"
import Home from "./pages/Home"
import "antd/dist/antd.css"

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" component={() => <div>form</div>} />
            <Route path="/form" render={() => <div>form</div>} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
