import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login/index'
import Home from './components/Home/index'
import Jobs from './components/Jobs/index'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

// Replace your code here

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
