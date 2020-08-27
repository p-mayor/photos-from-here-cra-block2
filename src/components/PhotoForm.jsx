import React from 'react'

function PhotoForm(props) {
    const {
        formData,
        isPhotoButtonDisabled,
        locationDenied,
        isLocButtonDisabled
    } = props.inState
    const locationButton = locationDenied ?
        <div>Update your device's location settings to enable geolocation features.</div> :
        (<button
            type="button"
            onClick={props.getLocationHandler}
            disabled={isLocButtonDisabled}
        >
            Get My Location
        </button>)
    return (
        <details>
            <summary>Click to Customize Your Search</summary>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor="searchTerm">Search Term:</label>
                    <br />
                    <input
                        type="text"
                        name="searchTerm"
                        value={formData.searchTerm}
                        onChange={props.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <br />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={props.handleChange}
                    />
                </div>
                {locationButton}
                <div>
                    <label htmlFor="city">Photo Count:</label>
                    <br />
                    <input
                        type="number"
                        name="photoCount"
                        value={formData.photoCount}
                        onChange={props.handleChange}
                    />
                </div>
                <br />
                <button type="submit" disabled={isPhotoButtonDisabled}>Get More Photos</button>
            </form>
        </details>
    )
}

export default PhotoForm;