import React from 'react'

function Gallery(props) {
    return (
        <div className="Gallery">
            {props.photos.map((photoObj, i) => {
                return <img src={props.constructImageURL(photoObj, "n")} alt={photoObj.title} key={i} />
            })}
        </div>
    )
}

export default Gallery;