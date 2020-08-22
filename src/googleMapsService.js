function googleMapsService(state, isReverse) {
    const apiKey = process.env.REACT_APP_GMAPS_API_KEY
    const reverseGeoQuery = `address=${state.city}&key=${apiKey}`
    const geocodeQuery = `latlng=${state.lat},${state.lon}&key=${apiKey}`
    let URL = `https://maps.googleapis.com/maps/api/geocode/json?`
    
    if(isReverse){
        URL += reverseGeoQuery
    } else {
        URL += geocodeQuery
    }
    return fetch(URL).then(response => response.json())
}

export default googleMapsService