import React from 'react'
import { Image } from 'antd';

function GalleryPhoto(props) {
    let image
    if(props.currentNumber === props.index){
        image = <Image src={props.src} alt={props.alt} width={230} style={{outline: "1px solid brown"}} />
    } else {
        image = <Image src={props.src} alt={props.alt} width={230} />
    }
    return (
        <div className="GalleryPhoto" onClick={()=>props.handleCurrentPhoto(props.index)}>
            {image}
        </div>
    )
}

export default GalleryPhoto;