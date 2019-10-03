import React, { useState, useEffect, useRef } from 'react'
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

export default function Loading({text = 'Loading', speed = 300})
{
    const [ content, setContent ] = useState(text)

    useEffect(() => {
        const id = window.setInterval(() => {
            setContent((content) => {
                if (content == text + '...') {
                    return text
                } else {
                    return content + '.'
                }
            })
        }, speed)

        return () => window.clearInterval(id)
    }, [text, speed])    

    return (
        <p style={styles.content}>
            {content}
        </p>
    )
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
}