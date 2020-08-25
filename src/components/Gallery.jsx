import React from 'react'

function Gallery(props) {
    return (
        <>
            <h2><u>Gallery</u></h2>
            <div className="Gallery">
                {props.photos.map((photoObj, i) => {
                    return <img src={photoObj.photoURL} alt="photoObj.title" key={i} />
                })}
            </div>
        </>
    )
}

export default Gallery;