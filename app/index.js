import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular.js'
import './index.css'

class App extends React.Component {
    render() {
        const name = 'Jota'

        return (
            <div className="container">
                <Popular />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
    )