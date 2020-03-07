export default (state, action) => {
    switch (action.type) {
        case 'GET_LOCATIONS':
            return {
                ...state,
                loading: false,
                locations: action.payload
            }
        case 'GET_DEFAULT_CENTER':
            return {
                ...state,
                loading: false,
                defaultCenter: action.payload
            }
        case 'LOCATIONS_ERROR':
            return {
                ...state,
                location: state.locations
            }
        default:
            return state
    }
}