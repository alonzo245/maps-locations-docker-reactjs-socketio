module.exports = {
    getLocations: () => {
        let locations = [{
                lat: -34.392,
                lng: 151.290
            },
            {
                lat: -34.280,
                lng: 150.075
            }
        ]
        if (Math.floor(Math.random() < 0.5 ? 0 : 1)) {
            locations = [{
                lat: -36.392,
                lng: 146.290
            }]
        }
        return locations
    }
}