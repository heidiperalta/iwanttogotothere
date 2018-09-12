import React, { Component } from "react";
import { get, getTokenFromCookie } from '../../helpers/fetchHelper';
import Sidebar from '../Sidebar/Sidebar';
import Login from '../Login/Login';
import Map from '../Map/Map';
import "./App.css";

class App extends Component {
  state = {
    user: null,
    errorMessage: "",
    mPlaces: []
  };

  setErrorMessage = message => {
    this.setState({
      errorMessage: message || "Whoops! something went wrong... sorry :("
    });
  };

  setUser = (user) => {
    this.setState({ user });
  }

  setMplaces = (mPlaces) => {
    this.setState({ mPlaces });
  }

  getMplaces = async (currentLatLng) => {

    const query = `lat=${currentLatLng.lat}&long=${currentLatLng.long}`;
    const mPlacesRes = await get(`/api/mplaces/?${query}`);

    if (!mPlacesRes) {
      this.setErrorMessage();
      return;
    }

    // Show error message if received
    if (mPlacesRes.messages && mPlacesRes.messages.length) {
      this.setErrorMessage(mPlacesRes.messages[0]);
      return;
    }

    if (mPlacesRes.data && mPlacesRes.data.length 
      && mPlacesRes.data.mPlaces) {
      
        this.setMplaces(mPlacesRes.data.mPlaces);
    }
    else {
      this.setErrorMessage();
    }
  }

  componentWillMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            this.getMplaces({
              lat: position.coords.latitude,
              long: position.coords.longitude
            });
        });
    }
  }

  componentDidMount() {
    const token = getTokenFromCookie();

    // No
    if (token) {
      this.setState({ user: token });
    }
  }

  render() {
    if (!this.state.user) {
      return (
        <div className="main_container">
          <Sidebar />
          <div className="main-content_container">
            <Login setUser={this.setUser} />
          </div>
        </div>
      );
    }

    return (
      <div className="main_container">
        
        <Sidebar mPlaces={this.state.mPlaces}/>
        
        <div className="main-content_container">
          <span>{this.state.errorMessage}</span>
          <Map mPlaces={this.state.mPlaces} />
        </div>

      </div>
    );
  }

}

export default App;
