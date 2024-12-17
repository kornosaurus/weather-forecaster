import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"
import WeatherIcon from "../WeatherIcon"
import { formatTemperature } from "../../utils/temperature"

function CurrentWeather({ weather }) {
    if (!weather) {
        return (
            <Box sx={{ textAlign: "center" }}>
                <Typography color="textSecondary" data-testid="current-weather-information">
                    Select a city to see the current weather and a 5-day weather forecast
                </Typography>
            </Box>
        )
    }

    const { currentWeather } = weather

    return (
        <Box sx={{ mx: 'auto', width: 1 }} data-testid="current-weather">
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', pb: 0.5 }}>
                    <Typography component="div" variant="subtitle1">
                        The weather right now
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardContent sx={{ flex: '0 1 auto', pr: 0.5 }}>
                        <WeatherIcon width="80px" icon={currentWeather.icon} title={currentWeather.condition} />
                    </CardContent>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography
                            component="div"
                            variant="h6"
                        >
                            {currentWeather.condition}
                        </Typography>
                        <Typography
                            variant="h4"
                            component="div"
                        >
                            {formatTemperature(currentWeather.temperature)}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box >
    )
}

export default React.memo(CurrentWeather)
