import React from 'react'

function GalleryPhoto(props) {
    let image
    if(props.currentNumber === props.index){
        image = <img src={props.src} alt={props.alt} style={{outline: "2px solid brown"}}/>
    } else {
        image = <img src={props.src} alt={props.alt} />
    }
    return (
        <div className="GalleryPhoto" onClick={()=>props.handleCurrentPhoto(props.index)}>
            {image}
        </div>
    )
}

export default GalleryPhoto;