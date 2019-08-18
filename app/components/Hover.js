import React from 'react'

export default class Hover extends React.Component {
    state = {
        hovering: false
    }

    mouseOver = (id) => {
        this.setState({
            hovering: true
        })
    }

    mouseOut = (id) => {
        this.setState({
            hovering: false
        })
    }

    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}