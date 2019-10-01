import React from 'react'
import { useRef, useState, useContext } from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'
import { Link } from 'react-router-dom'

function Instructions () {
    const theme = useContext(ThemeContext)

    return (
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='container-sm grid center-text battle-instruction'>
                <li>
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>See the winners</h3>
                    <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
                </li>
            </ol>
        </div>
    )
}

function PlayerInput({label, onSubmit}) {
    const [ disabled, setDisabled ] = useState(true)
    const theme = useContext(ThemeContext)
    const username = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()

        onSubmit(username.current.value)
    }

    return (
        <form className='column player' onSubmit={handleSubmit}>
            <label htmlFor='username' className='player-label'>
                {label}
            </label>
            <div className='row player-inputs'>
                <input
                    type='text'
                    id='username'
                    className={`input-${theme}`}
                    placeholder='Github username'
                    autoComplete='off'
                    ref={username}
                    onChange={() => { setDisabled(username.current.value.length == 0) }}
                />
                <button
                    className={`btn ${theme === 'light' ? 'dark' : 'light'}-btn`}
                    type='submit'
                    disabled={disabled}
                >
                    Submit
                </button> 
            </div>
        </form>
    )
}

PlayerInput.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

function PlayerPreview ({username, onReset, label}) {
    const theme = useContext(ThemeContext)

    return (
        <div className='column player'>
            <h3 className='player-label'>{label}</h3>
            <div className={`row bg-${theme}`}>
                <div className="player-info">
                    <img
                        className='avatar-small'
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                    />
                    <a
                        href={`https://github.com/${username}`}
                        className='link'
                    >
                        {username}
                    </a>
                </div>
                <button onClick={onReset} className={`btn ${theme}-btn`}>
                    <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
                </button>
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    label: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

export default function Battle() {
    const [ playerOne, setPlayerOne ] = useState(null)
    const [ playerTwo, setPlayerTwo ] = useState(null)

    return (
        <React.Fragment>
            <Instructions />

            <div className='players-container'>
                <h1 className='center-text header-lg'>Players</h1>
                <div className="row space-around">
                    {playerOne === null 
                        ? <PlayerInput 
                              label='Player one' 
                              onSubmit={(player) => setPlayerOne(player)} 
                          />
                        : <PlayerPreview 
                              label='Player one'
                              username={playerOne}
                              onReset={(player) => setPlayerOne(null)} 
                          />
                    }

                    {playerTwo === null 
                        ? <PlayerInput 
                              label='Player two' 
                              onSubmit={(player) => setPlayerTwo(player)} 
                          />
                        : <PlayerPreview 
                              label='Player two'
                              username={playerTwo}
                              onReset={(player) => setPlayerTwo(null)} 
                          />
                    }
                </div>

                {playerOne && playerTwo && (
                    <Link
                        className="btn dark-btn btn-space"
                        to={{
                            pathname: '/battle/results',
                            search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                        }}
                    >
                        Battle
                    </Link>
                )}
            </div>
        </React.Fragment>
    )
}