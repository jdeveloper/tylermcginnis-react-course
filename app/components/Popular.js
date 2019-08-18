import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api.js'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

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

function ReposGrid({ repos }) {
    return (
        <ul className="grid space-around">
            {repos.map((repo, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url}>
                        <Card
                            header={`#${index + 1}`}
                            avatar={avatar_url}
                            href={html_url}
                            name={name}
                        >
                            <ul className="card-list">
                                <li>
                                    <Tooltip text="Github username">
                                        <FaUser color="rgb(255, 191, 16)" size={22} />
                                        <a href={`https://github.com/${login}`}>
                                            {login}
                                        </a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <FaStar color="rgb(255, 215, 0)" size={22} />
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaCodeBranch color="rgb(219, 195, 245)" size={22} />
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                                    {open_issues.toLocaleString()} open issues
                                </li>
                            </ul> 
                        </Card>  
                    </li>
                )
            })}
        </ul>
        )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRrequird
}

class Popular extends React.Component {
    state = {
        selectedLenguage: 'All',
        repos: {},
        error: null,
    }

    componentDidMount = () => {
        this.updateLenguage(this.state.selectedLenguage)
    }

    updateLenguage = (lenguage) => {
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

    isLoading = () => {
        const { selectedLenguage, repos, error } = this.state
        
        return !repos[selectedLenguage] && error === null
    }

    render = () => {
        const { selectedLenguage, repos, error } = this.state
        return (
                <React.Fragment>
                    <LanguagesNav 
                        selected={selectedLenguage}
                        onUpdateLenguage={this.updateLenguage}
                    />

                    {this.isLoading() && <Loading text='Fetching Repos' />}

                    {error && <p className="centet-text error">{error}</p>}

                    {repos[selectedLenguage] && <ReposGrid repos={repos[selectedLenguage]} />}
                </React.Fragment>
            )
    }
}

export default Popular