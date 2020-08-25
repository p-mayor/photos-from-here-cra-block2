import React from 'react'

function Photo(props) {
    if (props.total === null) {
        return <div>Loading...</div>
    } else if (props.total === "0") {
        return <h2>No photos found, try a different search</h2>
    } else {
        return (
            <div className="Photo">
                <div>
                    <img src={props.photoObj.photoURL} alt="flickr img" />
                    <figcaption><em>{props.photoObj.title || "No Title"}</em></figcaption>
                </div>
            </div>
        )
    }
}

export default Photo