import React, { useState, useEffect, useReducer, useRef } from 'react'
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

function popularReducer(state, action) {
    if (action.type === 'success') {
        return {
            ...state,
            [action.selectedLenguage]: action.repos,
            error: null
        }
    } else if (action.type === 'error') {
        return {
            ...state,
            error: action.error.message
        }
    } else {
        throw new Error('unkown action: '+action.type);
    }
}

export default function Popular(){
    const [ selectedLenguage, setSelectedLenguage ] = useState('All')
    const [ state, dispatch ] = useReducer(popularReducer, {error: null})

    const fetchedLanguages = useRef([])

    const isLoading = () => !state[selectedLenguage] && state.error === null

    useEffect(() => { 
        if (fetchedLanguages.current.includes(selectedLenguage) === false) {
            fetchedLanguages.current.push(selectedLenguage)

            fetchPopularRepos(selectedLenguage)
                .then((repos) => dispatch({type: 'success', repos, selectedLenguage}))
                .catch((error) => dispatch({type: 'error', error}))
        }
    }, [fetchedLanguages, selectedLenguage])

    return (
            <React.Fragment>
                <LanguagesNav 
                    selected={selectedLenguage}
                    onUpdateLenguage={setSelectedLenguage}
                />

                {isLoading() && <Loading text='Fetching Repos' />}

                {state.error && <p className="centet-text error">{state.error}</p>}

                {state[selectedLenguage] && <ReposGrid repos={state[selectedLenguage]} />}
            </React.Fragment>
        )
}