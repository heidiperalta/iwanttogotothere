import React, { Component } from 'react';
import GoogleMapsReact from 'google-map-react';
import Marker from './Marker';

const key = 'AIzaSyDM9yoWb3ehc6NwnpjvAKxLAB2fGRytpnQ';

class Map extends Component {

  static defaultProps = {
    center: {
      lat: 40.72802059048305,
      lng: -74.00786531223372
    },
    zoom: 14
  };

  render() {
    let { mPlaces, center, zoom } = this.props;
    mPlaces = mPlaces || [];

    return (
      <GoogleMapsReact
        bootstrapURLKeys={{ key }}
        defaultCenter={center}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={zoom}
      >
        { mPlaces.map( mplace => (
          <Marker 
            lng={mplace.location[0]} 
            lat={mplace.location[1]} 
            text={mplace.name} />
        ))}
      </GoogleMapsReact>
    );
  }
}

export default Map;
