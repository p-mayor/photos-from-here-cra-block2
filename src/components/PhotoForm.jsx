import React from 'react'

function PhotoForm(props) {
    const { searchTerm, city, photoCount, formData, isPhotoButtonDisabled } = props.inState
    return (
        <>
            <fieldset>
                <legend>Current Search:</legend><span>
                    Search Term: <strong>{searchTerm}</strong>,City: <strong>{city}
                    </strong>,Photo Count: <strong>{photoCount}</strong>
                </span>
            </fieldset>
            <form onSubmit={props.handleSubmit}>
                <fieldset>
                    <legend>Customize Your Search</legend>
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
                    <button disabled={isPhotoButtonDisabled}>Get More Photos</button>
                </fieldset>
                <br />
            </form>
        </>
    )
}

export default PhotoForm;