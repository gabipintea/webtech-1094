import React from 'react'

import './CrewMemberEditor.css'

import CrewMemberStore from './CrewMemberStore'

import { withRouter } from 'react-router-dom'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

class CrewMemberEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      crewMembers: [],
      isAddDialogShown: false,
      isNewRecord: true,
      crewMember: {
        name: '',
        role: ''
      }
    }

    this.store = new CrewMemberStore(this.props.match.params.sid)

    this.handleChange = (evt) => {
      const crewMember = this.state.crewMember
      crewMember[evt.target.name] = evt.target.value
      this.setState({
        crewMember
      })
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }

    this.edit = (rowData) => {
      this.setState({
        isAddDialogShown: true,
        isNewRecord: false,
        crewMember: Object.assign({}, rowData)
      })
    }

    this.save = () => {
      if (this.state.isNewRecord) {
        this.store.addOne(this.state.crewMember)
      } else {
        this.store.saveOne(this.state.crewMember.id, this.state.crewMember)
      }
      this.setState({
        isAddDialogShown: false
      })
    }

    this.showDialog = () => {
      const emptyCrewMember = {
        name: '',
        role: ''
      }
      this.setState({
        isAddDialogShown: true,
        isNewRecord: true,
        crewMember: emptyCrewMember
      })
    }

    this.hideDialog = () => {
      this.setState({
        isAddDialogShown: false
      })
    }

    this.addDialogFooter = (
      <div className='centered'>
        <Button label='Save' icon="pi pi-save" className="p-button-rounded p-button-outlined" onClick={this.save} />
      </div>
    )

    this.tableFooter = (
      <div>
        <div className='centered'>
          <Button icon="pi pi-plus" className="p-button-rounded p-button-outlined" onClick={this.showDialog} />
        </div>
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
        </div>
      )
    }
  }

  componentDidMount () {
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        crewMembers: this.store.data
      })
    })
  }


  render () {
    const roleOptions = [{
      label: 'Captain',
      value: 'CAPTAIN'
    },{
      label: 'First mate',
      value: 'FIRST_MATE'
    },{
      label: 'Crew member',
      value: 'CREW'
    },{
      label: 'Mechanic',
      value: 'MECHANIC'
    }]
    return (
      <div className="crew-member-editor">
          <h3>
            i am the crew member editor for {this.props.match.params.sid}
          </h3>
          <div>
            <DataTable  value={this.state.crewMembers} 
                      header='List of crew members' 
                      footer={this.tableFooter}>
              <Column header='Name' field='name' />
              <Column header='Role' field='role' />
              <Column body={this.opsTemplate} />
            </DataTable>
            <Dialog   visible={this.state.isAddDialogShown} 
                      onHide={this.hideDialog} 
                      header='Add a crew member'
                      footer={this.addDialogFooter} 
                      className='p-fluid'>
              <div className='p-field'>
                <label htmlFor="name">Name</label>
                <InputText type="text" id="name" name="name" value={this.state.crewMember.name} onChange={this.handleChange} />
              </div>
              <div className='p-field'>
                <label htmlFor="role">Role</label>
                <Dropdown options={roleOptions} type="text" id="role" name="role" value={this.state.crewMember.role} onChange={this.handleChange} />
              </div>
            </Dialog>
          </div>
      </div>
    )
  }
}

export default withRouter(CrewMemberEditor)