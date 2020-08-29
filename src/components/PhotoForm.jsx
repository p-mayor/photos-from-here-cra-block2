import React from 'react'

function PhotoForm(props) {
    const {
        formData,
        isPhotoButtonDisabled,
        locationDenied,
        isLocButtonDisabled,
        autoGal
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
            <fieldset>
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
                    <button type="submit" disabled={isPhotoButtonDisabled}>Get My Photos</button>
                </form>
            </fieldset>
            <br />
            <button type="button" onClick={props.handleRandomSearch}>
                Get Random Photos
            </button>
            <br />
            {autoGal ? (
                <button type="button" onClick={props.handleStopAutoGallery}>
                    Turn off Auto Gallery
                </button>
            )
            :
            (
                <button type="button" onClick={props.handleAutoGallery}>
                    Turn on Auto Gallery
                </button>
            )
            }

        </details>
    )
}

export default PhotoForm;