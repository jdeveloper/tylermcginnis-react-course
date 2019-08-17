import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default class Loading extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: props.text
        }
    }

    componentDidMount() {
        const {text, speed} = this.props

        this.inserval = window.setInterval(() => {
            this.setState( ( {content} ) => {
                if (content == text + '...') {
                    return {
                        content: text
                    }
                }

                return {
                    content: content + '.'
                }
            })
        }, speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}