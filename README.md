# WeatherApp

WeatherApp is a web application that provides weather forecasts for different locations. This project uses Vite, React, and Redux for the frontend, and it fetches weather data from [Weatherbit API](https://www.weatherbit.io/).

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Running the Project](#running-the-project)

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
