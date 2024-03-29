import React from 'react'

class CrewMember extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.item.name,
      role: this.props.item.role      
    }

    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }

    this.edit = () => {
      this.setState({
        isEditing: true
      })
    }

    this.cancel = () => {
      this.setState({
        isEditing: false
      })
    }

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        name: this.state.name,
        role: this.state.role
      })

      this.setState({
        isEditing: false
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.select = () => {
      this.props.onSelect(this.props.item.id)
    }
  }
  render () {
    const { item } = this.props
    return (
      <div>
         {
          this.state.isEditing ?
            <>
            <span>
                <input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
              </span>
              <span>
                <input type='text' value={this.state.role} name='role' onChange={this.handleChange} />
              </span>
              
              <span>
                <input type='button' value='cancel' onClick={this.cancel} />
                <input type='button' value='save' onClick={this.save} />
              </span>
            </>
          :
            <>
            <span>
              {item.name}
            </span>
            <span>
              {item.role}
            </span>
            <span>
              <input type='button' value='delete' onClick={this.delete} />
              <input type='button' value='edit' onClick={this.edit} />              
            </span>
            </>
        }
      </div>
    )
  }
}

export default CrewMember