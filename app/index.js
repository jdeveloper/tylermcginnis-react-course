import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Results from './components/Results'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                   theme: theme === 'light' ? 'dark' : 'light' 
                }))
            }
        }
    }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Nav />

                            <Switch>
                                <Route exact={true} path="/" component={Popular} />
                                <Route exact={true} path="/battle" component={Battle} />
                                <Route path="/battle/results" component={Results} />
                                <Route render={()=>(<h1>404</h1>)} />
                            </Switch>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
    )