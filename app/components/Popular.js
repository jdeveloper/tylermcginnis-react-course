import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api.js'

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

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRrequird,
    onUpdateLenguage: PropTypes.func.isRrequird
}

class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLenguage: 'All',
            repos: {},
            error: null,
        }

        this.updateLenguage = this.updateLenguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this.updateLenguage(this.state.selectedLenguage)
    }

    updateLenguage(lenguage) {
        this.setState({
            selectedLenguage: lenguage,
            error: null,
        })

        if(!this.state.repos[lenguage]){
            fetchPopularRepos(lenguage)
                .then((data) => { 
                    this.setState(({repos}) => ({
                        repos: {
                            ...repos,
                            [lenguage]: data
                        }
                    }))
                })
                .catch(() => this.setState({error: `There was an error fetching the repositories.`}))
        }
    }

    isLoading() {
        const { selectedLenguage, repos, error } = this.state
        
        return !repos[selectedLenguage] && error === null
    }

    render() {
        const { selectedLenguage, repos, error } = this.state
        return (
                <React.Fragment>
                    <LanguagesNav 
                        selected={selectedLenguage}
                        onUpdateLenguage={this.updateLenguage}
                    />

                    {this.isLoading() && <p>LOADING</p>}

                    {error && <p>{error}</p>}

                    {repos[selectedLenguage] && <pre>{JSON.stringify(repos[selectedLenguage], null, 2)}</pre>}
                </React.Fragment>
            )
    }
}

export default Popular