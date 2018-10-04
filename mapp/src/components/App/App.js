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

  constructor() {
    super();

    const token = getTokenFromCookie();

    // TODO: remove check for this.state.user when I get anonymous coords
    // from browser
    if (token && navigator.geolocation) {
      
      // Get initial list of places
      navigator.geolocation.getCurrentPosition( position => {
            
        const { latitude, longitude } = position.coords;
        const apiResponse = this.getMplaces({ 
          lat: latitude, 
          long: longitude 
        });

        if (apiResponse.error) {
          this.setErrorMessage(apiResponse.error);
          return;
        }

        //this.setMplaces(apiResponse.mplaces);
        this.setState({
          user: token,
          mPlaces: apiResponse.mplaces
        })
      });
    }
  }

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

  getMplaces = async (coords) => {
    const query = `lat=${coords.lat}&long=${coords.long}`;
    
    const mPlacesReq = await get(`/api/mplaces/?${query}`);
    const mPlacesRes = { error: undefined, mplaces: [] };

    if (!mPlacesReq) {
      mPlacesRes.error = `Error retrieving m'places`;
      return;
    }
    
    if (mPlacesReq.messages && mPlacesReq.messages.length) {
      mPlacesRes.error = mPlacesReq.messages[0];
      return;
    }

    if (mPlacesReq.data && mPlacesReq.data.length 
      && mPlacesReq.data[0].mplaces) {
      
      mPlacesRes.mplaces = mPlacesReq.data[0].mplaces;
    }
   
    return mPlacesRes;
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
