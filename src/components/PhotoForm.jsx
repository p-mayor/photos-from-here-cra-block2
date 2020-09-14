import React from 'react'
import { Collapse, Button, Input } from 'antd';

function PhotoForm(props) {
    const {
        formData,
        isPhotoButtonDisabled,
        locationDenied,
        isLocButtonDisabled
    } = props.inState
    const locationButton = locationDenied ?
        <div>Update your device's location settings to enable geolocation features.</div> :
        (<Button
            onClick={props.getLocationHandler}
            disabled={isLocButtonDisabled}
        >
            Get My Location
        </Button>)

    const { Panel } = Collapse;
    return (
        <Collapse accordion>
            <Panel header="Click to Customize Your Search">
                <Button onClick={props.handleRandomSearch}>
                    Get Random Photos
                </Button>
                <hr/>
                <form onSubmit={props.handleSubmit}>
                    <Input.Group>
                        <Input
                            addonBefore="Search Term:"
                            type="text"
                            name="searchTerm"
                            value={formData.searchTerm}
                            onChange={props.handleChange}
                        />
                        <Input
                            addonBefore="City:"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={props.handleChange}
                        />
                        {locationButton}
                        <Input
                            addonBefore="Photo Count:"
                            type="number"
                            name="photoCount"
                            value={formData.photoCount}
                            onChange={props.handleChange}
                        />
                    </Input.Group>
                    <Button htmlType="submit" type="primary" disabled={isPhotoButtonDisabled}>Get My Photos</Button>
                </form>
            </Panel>
        </Collapse>
    )
}

export default PhotoForm;