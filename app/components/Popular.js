import React from 'react'

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
        const lenguages = ['All', 'JavaScript', 'PHP', 'Ruby', 'Java', 'CSS', 'Python']
        return (
            <ul className='flex-center'>
                {lenguages.map((lenguage) => (
                    <li key={lenguage}>
                        <button 
                            className='btn-clear nav-link' 
                            style={ lenguage === this.state.selectedLenguage ? {color: 'rgb(187, 42, 31)' } : null }
                            onClick={() => this.updateLenguage(lenguage)}>
                            {lenguage}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Popular