import React from 'react'
import GalleryPhoto from './GalleryPhoto'

function Gallery(props) {
    return (
        <div className="Gallery">
            {props.photos.map((photoObj, i) => {
                return (
                    <GalleryPhoto
                        src={props.constructImageURL(photoObj, "n")}
                        alt={photoObj.title}
                        key={i}
                        index={i}
                        handleCurrentPhoto={props.handleCurrentPhoto}
                        currentNumber={props.currentNumber}
                    />
                )
            })}
        </div>
    )
}

export default Gallery;