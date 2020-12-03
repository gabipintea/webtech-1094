import React from 'react'

class Ship extends React.Component {
    render () {
        const { item } = this.props
        
        return (
            <div>
                <span>{item.name}</span>
                <span>{item.portOfSail}</span>
                <span>{item.displacement}</span>
            </div>
        )
    }
}

export default Ship

