import { useEffect, useMemo, useState } from "react"
import { Box, Container, Typography } from "@mui/material"
import * as WeatherApi from '../../api/weather'
import CitySelect from '../CitySelect'
import CurrentWeather from '../CurrentWeather'
import WeatherForecast from '../WeatherForecast'

export default function App() {
    const [loading, setLoading] = useState(true)
    const [selectedCity, setSelectedCity] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    const cities = useMemo(() => {
        if (weatherData === null) {
            return []
        }
        return weatherData.map(({ city }) => city)
    }, [weatherData])

    const selectedCityWeatherData = useMemo(() => {
        if (weatherData === null || selectedCity === null) {
            return null
        }
        return weatherData.find(({ city }) => city === selectedCity)
    }, [weatherData, selectedCity])

    useEffect(() => {
        const controller = new AbortController()

        WeatherApi.get(controller.signal)
            .then((data) => {
                setWeatherData(data)
                setLoading(false)
            }).catch((e) => {
                // TODO We should handle errors and the abort here
                console.error(e)
            })

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <>
            <Box sx={{ p: 2, pb: 10 }}>
                <Typography variant="button">
                    WEATHER FORECASTER™
                </Typography>
            </Box>
            <Container maxWidth="sm">
                {loading ? (
                    <Typography sx={{ textAlign: 'center' }} data-testid="loading">Loading...</Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <CitySelect
                            cities={cities}
                            onChange={setSelectedCity}
                        />
                        <CurrentWeather weather={selectedCityWeatherData} />
                        <WeatherForecast weather={selectedCityWeatherData} />
                    </Box>
                )}
            </Container>
        </>
    )
}
