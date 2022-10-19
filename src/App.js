import './App.css'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login/index'
import Home from './components/Home/index'
import Jobs from './components/Jobs/index'

// Replace your code here

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/jobs" component={Jobs} />
    </Switch>
  </>
)

export default App
