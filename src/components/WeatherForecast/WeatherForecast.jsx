import { Box, Card, CardContent, Grid2 as Grid, Typography } from "@mui/material"
import React from "react"
import WeatherIcon from "../WeatherIcon"
import { formatTemperature } from "../../utils/temperature"

function ForecastItem({ forecastItem }) {
    return (
        <Grid size="grow" data-testid="forecast-item">
            <Box sx={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
                <Typography variant="subtitle2">
                    {forecastItem.day}
                </Typography>
                <Box sx={{ display: "flex", gap: '8px' }} >
                    <WeatherIcon width="25px" icon={forecastItem.icon} title={forecastItem.condition} />
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {formatTemperature(forecastItem.temperature)}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}

function WeatherForecast({ weather }) {
    if (!weather) {
        return null
    }
    const { forecast } = weather
    return (
        <Box sx={{ mx: 'auto', width: 1 }} data-testid="weather-forecast">
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', pb: 0.5 }}>
                    <Typography component="div" variant="subtitle1">Forecast</Typography>
                </CardContent>
                <CardContent>
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        {forecast.map((forecastItem) => (
                            <ForecastItem key={forecastItem.day} forecastItem={forecastItem} />
                        ))}
                    </Grid>
                </CardContent>
            </Card >
        </Box >
    )
}

export default React.memo(WeatherForecast)
