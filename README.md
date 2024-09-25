# WeatherApp

WeatherApp is a web application that provides weather forecasts for different locations. This project uses Vite, React, and Redux for the frontend, and it fetches weather data from [Weatherbit API](https://www.weatherbit.io/).

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Running the Project](#running-the-project)

## Features

-   [x] Search for the weather forecast of any location in the world by:
    -   [x] City name.
    -   [x] Given Latitude and longitude.
    -   [x] User's current location (via browser Geolocation API).
-   [x] Display the current selected weather data, including:
    -   [x] Temperature.
    -   [x] Weather condition.
    -   [x] Humidity.
    -   [x] Wind speed.
    -   [x] Weather icon that describes the weather conditions.
-   [x] Display the weather forecast for today, as well as either 3 days or 7 days ahead.
-   [x] Uses Redux to manage the application's state.
-   [x] Responsive design that works on both desktop, tablet, and mobile devices.
-   [x] Dark mode support.
-   [x] Error handling for invalid locations and network errors.
-   [x] Loading spinner while fetching data.
-   [x] Data persistence using local storage to remember the user's last search input.
-   [x] Caching of weather data to reduce the number of API requests.
-   [x] Data pooling every 5 minutes to keep the weather data up-to-date.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   You have installed [Node.js](https://nodejs.org/) (version 14 or higher) and [npm](https://www.npmjs.com/) (version 6 or higher).
-   You have a GitHub account.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/MaorBezalel/WeatherApp.git
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Running the Project

1. Set up the environment variables:

    - Create a `.env` file in the root directory of the project.
    - Add the following line to the `.env` file:

        ```properties
        VITE_WEATHER_API_KEY=<your-api-key>
        ```

2. Start the development server:

    ```sh
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` to see the application running.
