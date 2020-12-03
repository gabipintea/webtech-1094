import React from 'react'
import Ship from './Ship'
import ShipAddForm from './ShipAddForm'
import store from './ShipStore'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      ships: []
    }

    this.add = (ship) => {
      store.addOne(ship)
    }

  }

  componentDidMount () {
    store.getAll()
    store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        ships: store.data
      })
    })
  }

  render () {
    return (
      <div>
        {
          this.state.ships.map(e => <Ship key={e.id} item={e} />)
        }
        <ShipAddForm onAdd={this.add} />
      </div>
    ) 
  }
}

export default App