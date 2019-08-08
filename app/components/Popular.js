import React from 'react'

class Popular extends React.Component {
    render() {
        const lenguages = ['All', 'JavaScript', 'PHP', 'Ruby', 'Java', 'CSS', 'Python']
        return (
            <ul className='flex-center'>
                {lenguages.map((lenguage) => (
                    <li key={lenguage}>
                        <button className='btn-clear nav-link'>
                            {lenguage}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Popular