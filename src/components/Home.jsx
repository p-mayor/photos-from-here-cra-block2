import React from 'react'
import flickrService from '../services/flickrService'
import googleMapsService from '../services/googleMapsService'
import Photo from './Photo'
import Gallery from './Gallery'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            total: null,
            currentNumber: 0,
            lat: 25.034281,
            lon: -77.396278,
            city: 'Nassau, The Bahamas',
            searchTerm: 'chicken',
            photoCount: 5,
            locationDenied: false,
            isLocButtonDisabled: false,
            isPhotoButtonDisabled: false,
            isSameCity: false,
            formData: {
                searchTerm: '',
                city: '',
                photoCount: 1
            }
        }
    }

    // this lifecycle method runs after the components first render
    componentDidMount() {
        this.getPictures()
    }

    // get the location from the user
    getLocationHandler = () => {

        const onSuccess = (location) => {
            this.setState({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
                isLocButtonDisabled: true
            }, () => {
                this.getPictures()
                this.geocodeLocation()
            })
        }
        const onFail = (err) => {
            console.warn(err.message)
            this.setState({ locationDenied: true })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onFail)

        // ref:https://stackoverflow.com/questions/44155442/how-i-can-disable-a-button-in-react-js-for-5-seconds-after-click-event
        setTimeout(() => this.setState({ isLocButtonDisabled: false }), 10000);
    }

    // get pictures from the flickr api
    getPictures() {
        flickrService(this.state).then((responsePhotoObject) => {
            if (!responsePhotoObject) return
            const photosWithURLS = responsePhotoObject.photos.photo.map((photoObj) => {
                photoObj.photoURL = this.constructImageURL(photoObj)
                return photoObj
            })
            this.setState({
                photos: photosWithURLS,
                total: responsePhotoObject.photos.total,
                currentNumber: 0,
                isPhotoButtonDisabled: true
            })
        })
        setTimeout(() => this.setState({ isPhotoButtonDisabled: false }), 10000);
    }

    // use googleMaps API to look up lat/lon based on city
    reverseGeocodeCity() {
        googleMapsService(this.state, true).then((loc) => {
            if (loc.status === "ZERO_RESULTS") {
                console.log("location not found")
                this.setState({
                    total: "0",
                    currentNumber: 0
                })
                return
            }
            const cityLat = loc.results[0].geometry.location.lat
            const cityLon = loc.results[0].geometry.location.lng
            this.setState({
                lat: cityLat,
                lon: cityLon
            }, this.getPictures)
        })
    }

    // use googleMaps API to look up city based on lat/lon
    geocodeLocation() {
        googleMapsService(this.state, false).then((loc) => {
            const array = loc.plus_code.compound_code.split(" ")
            array.shift()
            const city = array.join(" ")
            this.setState({
                city: city
            })
        })
    }

    // construct an image URL from the photoObj we got from flickr
    constructImageURL(photoObj) {
        if (!photoObj) return
        return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

    // handle incrementing this.state.currentNumber so we can cycle through the photo array
    handleNext = () => {
        this.setState((prevState) => {
            const atEndOfArray = prevState.currentNumber === prevState.photos.length - 1
            if (atEndOfArray) {
                return { currentNumber: 0 }
            } else {
                return { currentNumber: prevState.currentNumber + 1 }
            }
        })
    }

    handlePrev = () => {
        this.setState((prevState) => {
            const atStart = prevState.currentNumber === 0
            const finalIndex = prevState.photos.length - 1
            if (atStart) {
                return { currentNumber: finalIndex }
            } else {
                return { currentNumber: prevState.currentNumber - 1 }
            }
        })
    }

    // handle when the user submits the form data
    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.formData.city &&
            !this.state.formData.searchTerm
        ) return
        this.setState((prevState) => {
            const isSameCity = prevState.formData.city === prevState.city
            return {
                city: prevState.formData.city || prevState.city,
                searchTerm: prevState.formData.searchTerm || prevState.searchTerm,
                photoCount: prevState.formData.photoCount || prevState.photoCount,
                currentNumber: 0,
                isSameCity: isSameCity
            }
        }, () => {
            if(this.state.isSameCity) {
                this.getPictures()
            } else {
                this.reverseGeocodeCity()
            }
        });
    }

    // handle when the user changes the data in the input fields on the form
    handleChange = (event) => {
        const newformData = { ...this.state.formData };
        newformData[event.target.name] = event.target.value;

        this.setState({ formData: newformData });
    }

    render() {
        const realPhotoCount = Math.min(this.state.total, this.state.photoCount)
        return (
            <div className="Home">
                <div>
                    <div className="photoControls">
                        <button onClick={this.handlePrev}>Last Photo</button>
                        <strong>
                            Current Photo: {this.state.currentNumber + 1} / {realPhotoCount}
                        </strong>
                        <button onClick={this.handleNext}>Next Photo</button>
                    </div>
                    <Photo
                        total={this.state.total}
                        photoObj={this.state.photos[this.state.currentNumber]}
                    />
                </div>
                <fieldset>
                    <legend>Current Search:</legend>
                    Search Term: <strong>{this.state.searchTerm}</strong>,
                    City: <strong>{this.state.city}</strong>,
                    Photo Count: <strong>{this.state.photoCount}</strong>
                </fieldset>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Customize Your Search</legend>
                        <div>
                            <label htmlFor="searchTerm">Search Term: </label>
                            <br />
                            <input
                                type="text"
                                name="searchTerm"
                                value={this.state.formData.searchTerm}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city">City: </label>
                            <br />
                            <input
                                type="text"
                                name="city"
                                value={this.state.formData.city}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city">Photo Count: </label>
                            <br />
                            <input
                                type="number"
                                name="photoCount"
                                value={this.state.formData.photoCount}
                                onChange={this.handleChange}
                            />
                        </div>
                        <br />
                        <button disabled={this.state.isPhotoButtonDisabled}>Get More Photos</button>
                    </fieldset>
                    <br />
                </form>
                {this.state.locationDenied ?
                    "Check your location settings to enable geolocation features."
                    :
                    <button
                        onClick={this.getLocationHandler}
                        disabled={this.state.isLocButtonDisabled}
                    >
                        Get Photos From My Location
                    </button>
                }
                <Gallery
                    photos={this.state.photos}
                    searchTerm={this.state.searchTerm}
                    city={this.state.city}
                />
            </div>
        )
    }
}

export default Home;