import { useState } from 'react'

export default function useHover() {
    const [ hovering, setHovering ] = useState(false)

    const onHover = (id) => setHovering(true)
    const offHover = (id) => setHovering(false)

    return { hovering, attrs: { onMouseOver: onHover, onMouseOut: offHover } }
}