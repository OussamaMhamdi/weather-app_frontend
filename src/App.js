
import React from 'react';
import "./App.css";
import Form from "./app_component/form.component";

import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./app_component/weather.component";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      description: "",
      error: false    
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }
  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    if (city) {
      const api_call = await fetch(
        `http://localhost:4000/weather?address=${city}`
      );
        
      const response = await api_call.json();
      console.log(response);
      this.setState({
        city: `${response.cityName}`,
        main: response.weather[0].main,
        celsius: response.temperature,
        description: response.description,
        error: false
      });
      console.log(response.weather[0].id);

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

    } else {
      this.setState({
        error: true
      });
    }
  };

  render(){
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather 
        city={this.state.city}
        weatherIcon={this.state.icon}
        temp_celsius={this.state.celsius}
        description={this.state.description}  />
      </div>
    );
  }
}


export default App;
