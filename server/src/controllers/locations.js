const {getLocations} = require('../mockDb')
let locations = getLocations()
    setInterval(() => {
        console.log('output location:', locations)
        locations = getLocations()
    }, 3000)

// @desc Stream all location 
// @route GET /api/v1/locations/stream
// @access Public
exports.streamLocations = io => {
    io.broadcast.emit('locations', locations)
}

// @desc Get all location 
// @route GET /api/v1/get-default-locations
// @access Public
exports.getLocations = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            data: [{
                lat: -34.497,
                lng: 150.644
            }]
        })

    } catch (err) {
        return res.status(500).json({
            success: false
        })
    }
}

// @desc Get default center 
// @route GET /api/v1/get-default-center
// @access Public
exports.getDefaultCenter = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            data: {
                lat: -34.397,
                lng: 150.644
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            data: locations
        })
    }
}