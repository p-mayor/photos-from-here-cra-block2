function flickrService(state) {
    const proxyServer = "https://shrouded-mountain-15003.herokuapp.com/"
    const domain = "https://flickr.com"
    const path = "/services/rest/"
    const apiKey = "d354ec6250a62eb1abebd8a6501e836c"
    const photoCount = 5
    const queryString = `api_key=${apiKey}&format=json&nojsoncallback=1`
    + `&method=flickr.photos.search&safe_search=1&per_page=${photoCount}`
    + `&lat=${state.lat}&lon=${state.lon}&text=${state.searchTerm}`

    const URL = `${proxyServer + domain + path}?${queryString}`

    return fetch(URL).then((response) => {
        return response.json()
    })
}

export default flickrService;