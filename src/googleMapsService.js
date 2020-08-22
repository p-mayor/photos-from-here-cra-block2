function googleMapsService(state, isReverse) {
    const apiKey = process.env.REACT_APP_GMAPS_API_KEY
    
    if(isReverse){
        let URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${state.city}&key=${apiKey}`
        return fetch(URL).then(response => response.json())
    } else {
        let revURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.lat},${state.lon}&key=${apiKey}`
        return fetch(revURL).then(response => response.json())
    }
}

export default googleMapsService