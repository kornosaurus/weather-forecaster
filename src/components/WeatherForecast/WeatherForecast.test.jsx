import { render, screen, within } from "@testing-library/react"
import "@testing-library/jest-dom"
import WeatherForecast from "./WeatherForecast"
import { formatTemperature } from "../../utils/temperature"

test("Does not render when no forecast is available", async () => {
    const { container } = render(
        <WeatherForecast
            weather={null}
        />
    )

    expect(container).toBeEmptyDOMElement()
})

test("Renders a 5 day weather forecast", async () => {
    const weatherData = {
        forecast: [
            {
                day: "Monday",
                temperature: 16,
                condition: "Partly Cloudy",
                icon: "partly_cloudy"
            },
            {
                day: "Tuesday",
                temperature: 17,
                condition: "Sunny",
                icon: "sunny"
            },
            {
                day: "Wednesday",
                temperature: 14,
                condition: "Rainy",
                icon: "rain"
            },
            {
                day: "Thursday",
                temperature: 15,
                condition: "Cloudy",
                icon: "cloud"
            },
            {
                day: "Friday",
                temperature: 18,
                condition: "Sunny",
                icon: "sunny"
            }
        ]
    }

    render(
        <WeatherForecast
            weather={weatherData}
        />
    )

    const days = screen.getAllByTestId("forecast-item")

    expect(days).toHaveLength(5)

    const tuesday = days[1]

    const temperature = within(tuesday).getByText(formatTemperature(17))
    const icon = within(tuesday).getByTestId("weather-icon-sunny")

    expect(temperature).toBeVisible()
    expect(icon).toBeVisible()
})
