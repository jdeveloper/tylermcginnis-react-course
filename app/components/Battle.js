import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'

function Instructions () {
    return (
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='container-sm grid center-text battle-instruction'>
                <li>
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className='bg-light' color='#727272' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>See the winners</h3>
                    <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140} />
                </li>
            </ol>
        </div>
    )
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }

    render() {
        return (
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className='player-label'>
                    {this.props.label}
                </label>
                <div className='row player-inputs'>
                    <input
                        type='text'
                        id='username'
                        className='input-light'
                        placeholder='Github username'
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button
                        className='btn dark-btn'
                        type='submit'
                        disabled={!this.state.username}
                    >
                        Submit
                    </button> 
                </div>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

function PlayerPreview ({username, onReset, label}) {
    return (
        <div className='column player'>
            <h3 className='player-label'>{label}</h3>
            <div className='row bg-light'>
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
                <button onClick={onReset}>
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

export default class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleReset(id) {
        this.setState({
            [id]: null
        })
    }

    handleSubmit(id, player) {
        this.setState({
            [id]: player
        })
    }

    render() {
        const { playerOne, playerTwo } = this.state

        return (
            <React.Fragment>
                <Instructions />

                <div className='players-container'>
                    <h1 className='center-text header-lg'>Players</h1>
                    <div className="row space-around">
                        {playerOne === null 
                            ? <PlayerInput 
                                  label='Player one' 
                                  onSubmit={(player) => this.handleSubmit('playerOne', player)} 
                              />
                            : <PlayerPreview 
                                  label='Player one'
                                  username={playerOne}
                                  onReset={(player) => this.handleReset('playerOne')} 
                              />
                        }

                        {playerTwo === null 
                            ? <PlayerInput 
                                  label='Player two' 
                                  onSubmit={(player) => this.handleSubmit('playerTwo', player)} 
                              />
                            : <PlayerPreview 
                                  label='Player two'
                                  username={playerTwo}
                                  onReset={(player) => this.handleReset('playerTwo')} 
                              />
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}