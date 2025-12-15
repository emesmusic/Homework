import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay';
export default class Weather extends Component {
    state = { weatherData: null, loading: false, buttonClicked: false };


    async displayWeather() {
        this.setState({ loading: true});
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.095518750314945&longitude=-74.22198168692783&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=America/New_York&temperature_unit=fahrenheit');
        this.setState({ weatherData: await response.json(), loading: false });


    }

    render() {
        const { loading, buttonClicked, weatherData } = this.state;
        const data = weatherData?.current;
        if (loading) {
            return (<p>Loading...</p>);
        } else if (!buttonClicked) {
            return (
            <>
                <button onClick={() => {
                    this.setState({ buttonClicked: true });
                    this.displayWeather()

                }}>Get The Weather!</button>
            </>
            );
        }


        else {

            return (
                <WeatherDisplay temperature={data.temperature_2m} unit={weatherData.current_units.temperature_2m} weatherCode={data.weather_code} />
            )
        }



    }

}