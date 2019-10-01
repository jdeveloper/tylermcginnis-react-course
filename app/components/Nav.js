import React, { useContext } from 'react'
import ThemeContext from '../contexts/theme'
import { NavLink } from 'react-router-dom'

const styles = {
    activeLink: {
        color: 'rgb(187, 46, 31)'
    }
}

export default function Nav ({toggleTheme}) {
    const theme = useContext(ThemeContext)

    return (
        <nav className='row space-between'>
            <ul className="row nav">
                <li>
                    <NavLink 
                        to='/' 
                        exact={true}
                        className='nav-link'
                        activeStyle={styles.activeLink}
                    >
                        Popular
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/battle' 
                        className='nav-link'
                        activeStyle={styles.activeLink}
                    >
                        Battle
                    </NavLink>
                </li>
            </ul>
            <button
                style={{fontSize: 30}}
                className='btn-clear'
                onClick={toggleTheme}
            >
                {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}