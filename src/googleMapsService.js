function googleMapsService(state) {
    const apiKey = process.env.REACT_APP_GMAPS_API_KEY
    let URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${state.city}&key=${apiKey}`
    return fetch(URL).then(response => response.json())
}

export default googleMapsService