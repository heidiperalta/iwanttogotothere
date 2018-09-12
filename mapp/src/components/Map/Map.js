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
    const mPlaces = this.props.mPlaces || [];

    return (
      <GoogleMapsReact
        bootstrapURLKeys={{ key }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {mPlaces.forEach( mPlace => {<Marker name={mPlace.name} />})}
      </GoogleMapsReact>
    );
  }
}

export default Map;
