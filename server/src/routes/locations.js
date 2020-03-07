const express = require('express')
const router = express.Router()
const { getLocations, getDefaultCenter } = require('../controllers/locations')

router
    .route('/get-default-locations')
    .get(getLocations)

router
    .route('/get-default-center')
    .get(getDefaultCenter)

module.exports = router