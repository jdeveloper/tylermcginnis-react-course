import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
    render() {
        const name = 'Jota'

        return (
            <React.Fragment>
                <h1>Wellcome back {name}!!</h1>
                <p>enjoy this site</p>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
    )