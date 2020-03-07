import React, { useEffect, useState, useContext } from "react"
import { GlobalContext } from '../context/GlobalState'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    if (!props.defaultCenter && !props.locations) return null
    return (<GoogleMap
        defaultZoom={3}
        defaultCenter={props.defaultCenter}>
        {props.locations && props.locations.map((location, i) =>
            <Marker key={i} position={location} onClick={props.onMarkerClick} />
        )}
    </GoogleMap>)
}

)

export const Map = () => {
    const { streamLocations, getDefaultCenter, defaultCenter, locations, loading } = useContext(GlobalContext)
    const [isMarkerShown, setIsMarkerShown] = useState(true)

    useEffect(() => {
        getDefaultCenter()
        streamLocations()
    }, [locations])

    const handleMarkerClick = () => {
        setIsMarkerShown(true)
        delayedShowMarker()
    }

    const delayedShowMarker = () => {
        setTimeout(() => {
            setIsMarkerShown(true)
        }, 3000)
    }

    if (loading) return null

    return (
        <MyMapComponent
            isMarkerShown={isMarkerShown}
            onMarkerClick={handleMarkerClick}
            defaultCenter={defaultCenter}
            locations={locations}
        />
    )

}