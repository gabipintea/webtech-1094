import React from 'react'
import store from './ShipStore'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

import { withRouter } from 'react-router-dom'

import './ShipEditor.css'

class ShipEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ships: [],
      isAddDialogShown: false,
      isNewRecord: true,
      ship: {
        name: '',
        displacement: '',
        portOfSail: ''
      }
    }

    this.hideDialog = () => {
      this.setState({
        isAddDialogShown: false
      })
    }

    this.showDialog = () => {
      this.setState({
        isAddDialogShown: true,
        isNewRecord: true
      })
    }

    this.edit = (rowData) => {
      this.setState({
        isAddDialogShown: true,
        isNewRecord: false,
        ship: Object.assign({}, rowData)
      })
    }

    this.select = (id) => {
      this.props.history.push(`/ships/${id}`)
    }

    this.save = () => {
      if (this.state.isNewRecord) {
        store.addOne(this.state.ship)
      } else {
        store.saveOne(this.state.ship.id, this.state.ship)
      }
      this.setState({
        isAddDialogShown: false
      })
    }

    this.delete = (id) => {
      store.deleteOne(id)
    }

    this.handleShipChange = (evt) => {
      const ship = this.state.ship
      ship[evt.target.name] = evt.target.value
      this.setState({
        ship: ship
      })
    }

    this.tableFooter = (
      <div className='centered'>
        <Button icon="pi pi-plus" className="p-button-rounded p-button-outlined" onClick={this.showDialog} />
      </div>
    ) 

    this.addDialogFooter = (
      <div className='centered'>
        <Button label='Save' icon="pi pi-save" className="p-button-rounded p-button-outlined" onClick={this.save} />
      </div>
    )

    this.opsTemplate = (rowData) => {
      return (
        <div className='ops'>
          <span className='spaced'>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-outlined p-button-danger" onClick={() => this.delete(rowData.id)} />
          </span>
          <span className='spaced'>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-outlined p-button-info" onClick={() => this.edit(rowData)} />
          </span>
          <span className='spaced'>
            <Button icon="pi pi-search-plus" className="p-button-rounded p-button-outlined p-button-info" onClick={() => this.select(rowData.id)} />
          </span>
        </div>
      )
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
      <div className='ship-editor'>
        <DataTable  value={this.state.ships} 
                    header='List of ships' 
                    footer={this.tableFooter}>
          <Column header='Name' field='name' />
          <Column header='Port of sail' field='portOfSail' />
          <Column header='Displacement' field='displacement' />
          <Column body={this.opsTemplate} />
        </DataTable>
        <Dialog   visible={this.state.isAddDialogShown} 
                  onHide={this.hideDialog} 
                  header='Add a ship'
                  footer={this.addDialogFooter} 
                  className='p-fluid'>
        <div className='p-field'>
          <label htmlFor="name">Name</label>
          <InputText type="text" id="name" name="name" value={this.state.ship.name} onChange={this.handleShipChange} />
        </div>
        <div className='p-field'>
          <label htmlFor="portOfSail">Port</label>
          <InputText type="text" id="portOfSail" name="portOfSail" value={this.state.ship.portOfSail} onChange={this.handleShipChange} />
        </div>
        <div className='p-field'>
          <label htmlFor="displacement">Displacement</label>
          <InputText type="text" id="displacement" name="displacement" value={this.state.ship.displacement} onChange={this.handleShipChange} />
        </div>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(ShipEditor)