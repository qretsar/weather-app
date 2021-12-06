import React, { useState } from "react";
import "./CitySelectionForm.css";

const CitySelectionForm = () => {
  //STATE
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState({
    name: "",
  });

  //FUNCTIONS
  const handleApiCall = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=7e20b6d5b2041f6e18663c44faa5c27b`;
    await fetch(url)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        return response;
      })
      .then((returnedResponse) => {
        // Your response to manipulate
        returnedResponse.json().then((data) => {
          setCity(data);
        });
      })
      .catch((error) => {
        // Your error is here!
        console.log(error);
      });
  };

  return (
    <div className="citySelection">
      <h1>Weather App</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleApiCall();
          setInputValue("");
        }}
      >
        <input
          onChange={(event) => setInputValue(event.target.value)}
          style={{ marginRight: "1rem" }}
          className="input"
          type="text"
          placeholder="type desired city"
          required
        ></input>
        <button onClick={handleApiCall}>Search</button>
      </form>
      <main>
        <section className={`more-info ${city.main ? "active" : ""}`}>
          <div>
            {" "}
            <h2>{city.name && `Current temperature in ${city.name}: `}</h2>
            <h1>
              {" "}
              {city.name && `${Math.round(city.main.temp - 273.15)} °C`}{" "}
            </h1>
          </div>
          <div>
            {" "}
            <p>
              {city.weather
                ? `Current weather is  : ${city.weather[0].main}`
                : ""}
            </p>
            <p>{city.main ? `Humidity : ${city.main.humidity}%` : ""}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CitySelectionForm;
