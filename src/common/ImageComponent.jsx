import { useEffect, useState } from "react"
import { Blurhash } from "react-blurhash"

function ImageComponent({ 
        src = '', 
        alt = '', 
        loading = '', 
        height = '250px', 
        width = '180px' }) {
            
    const [imageLoading, setImageLoading] = useState(true)

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoading(false)
        }
        img.src = src
    }, [])

    return (
        <>
            <div style={{ display: imageLoading ? 'block' : 'none' }}>
                <Blurhash
                    hash="L9RW0bxu~qM{R%xuxaWBofofoLt7"
                    width={width}
                    height={height}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            </div>
            <div style={{ display: imageLoading ? 'none' : 'block' }}>
                <img src={src} alt={alt || ''} loading={loading || 'lazy'} />
            </div>
        </>
    )
}

export default ImageComponent