import React from 'react'
import flickrService from '../services/flickrService'
import googleMapsService from '../services/googleMapsService'
import Photo from '../components/Photo'
import Gallery from '../components/Gallery'
import PhotoForm from '../components/PhotoForm'

import { Button, Switch } from 'antd';

class Home extends React.Component {
    constructor(props) {
        super(props)

        const { randCity, randLat, randLon, randTerm } = this.getRandomInputs()

        this.state = {
            photos: [],
            total: null,
            currentNumber: 0,
            lat: randLat,
            lon: randLon,
            searchTerm: randTerm,
            city: randCity,
            photoCount: 40,
            locationDenied: false,
            isLocButtonDisabled: false,
            isPhotoButtonDisabled: false,
            isSameCity: false,
            autoGal: false,
            formData: {
                searchTerm: randTerm,
                city: randCity,
                photoCount: 40
            }
        }
    }

    // this lifecycle method runs after the components first render
    componentDidMount() {
        this.getPictures()
    }

    getRandomInputs() {

        const initCities = [
            ['Nassau, The Bahamas', [25.046591, -77.376602]],
            ['Seattle, WA', [47.606209, -122.332069]],
            ['London, England', [51.507351, -0.127758]],
            ['Madrid, Spain', [40.416775, -3.703790]],
            ['San Francisco, CA', [37.774929, -122.419418]],
            ['New York, New York', [40.7128, -74.0060]],
            ['Paris, France', [48.8566, 2.3522]],
            ['Hong Kong', [22.3193, 114.1694]],
            ['Tokyo, Japan', [35.6762, 139.6503]],
        ]
        const initTerms = ['chicken', 'dog', 'cat', 'sunset', 'night', 'sunrise']

        const randCityNum = Math.floor(Math.random() * initCities.length)
        const randTermNum = Math.floor(Math.random() * initTerms.length)

        const randCity = initCities[randCityNum][0]
        const randLat = initCities[randCityNum][1][0]
        const randLon = initCities[randCityNum][1][1]
        const randTerm = initTerms[randTermNum]

        return { randCity, randLat, randLon, randTerm }

    }

    // get pictures from the flickr api
    getPictures() {
        flickrService(this.state).then((responsePhotoObject) => {
            if (!responsePhotoObject) return
            const photosWithURLS = responsePhotoObject.photos.photo.map((photoObj) => {
                photoObj.photoURL = this.constructImageURL(photoObj, "c")
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
            this.setState((prevState) => {
                const newFormData = { ...prevState.formData }
                newFormData.city = city
                return {
                    formData: newFormData
                }
            })
        })
    }

    // construct an image URL from the photoObj we got from flickr
    constructImageURL(photoObj, size) {
        if (!photoObj) return
        return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + "_" + size + ".jpg";
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

    // get the location from the user
    getLocationHandler = () => {
        const onSuccess = (location) => {
            this.setState((prevState) => {
                return {
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                    isLocButtonDisabled: true,
                    searchTerm: prevState.formData.searchTerm,
                    photoCount: prevState.formData.photoCount
                }
            }, this.geocodeLocation)
        }
        const onFail = (err) => {
            console.warn(err.message)
            this.setState({ locationDenied: true })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onFail)

        // ref:https://stackoverflow.com/questions/44155442/how-i-can-disable-a-button-in-react-js-for-5-seconds-after-click-event
        setTimeout(() => this.setState({ isLocButtonDisabled: false }), 10000);
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
            if (this.state.isSameCity) {
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

    handleRandomSearch = () => {
        const { randCity, randLat, randLon, randTerm } = this.getRandomInputs()
        this.setState((prevState) => {
            return {
                city: randCity,
                lat: randLat,
                lon: randLon,
                searchTerm: randTerm,
                photoCount: prevState.formData.photoCount,
                formData: {
                    searchTerm: randTerm,
                    city: randCity,
                    photoCount: prevState.formData.photoCount
                }
            }
        }, this.getPictures)
    }

    handleAutoGallery = () => {
        if (this.state.autoGal) {
            clearInterval(this.autoGalInterval)
        } else {
            this.autoGalInterval = setInterval(() => {
                this.setState((prevState) => {
                    const atEndOfArray = prevState.currentNumber === prevState.photos.length - 1
                    if (atEndOfArray) {
                        return { currentNumber: 0 }
                    } else {
                        return { currentNumber: prevState.currentNumber + 1 }
                    }
                })
            }, 5000);
        }
        this.setState((prevState) => {
            return { autoGal: !prevState.autoGal }
        })
    }

    handleCurrentPhoto = (index) => {
        this.setState({
            currentNumber: index
        })
    }

    render() {
        const realPhotoCount = Math.min(this.state.total, this.state.photoCount)
        return (
            <div className="Home">
                <div>
                    <h3>
                        Flickr search: "{this.state.searchTerm}" in {this.state.city}
                    </h3>
                    <PhotoForm
                        inState={this.state}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        getLocationHandler={this.getLocationHandler}
                        handleRandomSearch={this.handleRandomSearch}
                        handleAutoGallery={this.handleAutoGallery}
                        handleStopAutoGallery={this.handleStopAutoGallery}
                    />
                    <Photo
                        total={this.state.total}
                        photoObj={this.state.photos[this.state.currentNumber]}
                    />
                </div>
                <div className="photoControls">
                    <Button type="secondary" onClick={this.handlePrev}>Prev.</Button>
                    <div>{this.state.currentNumber + 1}/ {realPhotoCount}</div>
                    <Button type="secondary" onClick={this.handleNext}>Next</Button>
                </div>
                <Switch onChange={this.handleAutoGallery} checkedChildren="Slideshow ON" unCheckedChildren="Slideshow OFF" />
                <Gallery
                    photos={this.state.photos}
                    searchTerm={this.state.searchTerm}
                    city={this.state.city}
                    constructImageURL={this.constructImageURL}
                    handleCurrentPhoto={this.handleCurrentPhoto}
                    currentNumber={this.state.currentNumber}
                />
            </div>
        )
    }
}

export default Home;