import React from 'react'
import ShipEditor from './ShipEditor'
import CrewMemberEditor from './CrewMemberEditor'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <ShipEditor />
          </Route>
          <Route path='/ships/:sid' exact>
            <CrewMemberEditor />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App