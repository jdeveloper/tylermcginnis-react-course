import React from 'react'

function LanguagesNav({selected, onUpdateLenguage}) {
    const lenguages = ['All', 'JavaScript', 'PHP', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className='flex-center'>
            {lenguages.map((lenguage) => (
                <li key={lenguage}>
                    <button 
                        className='btn-clear nav-link' 
                        style={ lenguage === selected ? {color: 'rgb(187, 42, 31)' } : null }
                        onClick={() => onUpdateLenguage(lenguage)}>
                        {lenguage}
                    </button>
                </li>
            ))}
        </ul>
    )
}

class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLenguage: 'All'
        }

        this.updateLenguage = this.updateLenguage.bind(this)
    }

    updateLenguage(lenguage) {
        this.setState({
            selectedLenguage: lenguage
        })
    }

    render() {
        const { selectedLenguage } = this.state
        return (
                <React.Fragment>
                    <LanguagesNav 
                        selected={selectedLenguage}
                        onUpdateLenguage={this.updateLenguage}
                    />
                </React.Fragment>
            )
    }
}

export default Popular