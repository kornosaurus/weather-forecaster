export default function WeatherIcon({ icon = 'sunny', width = "60px", title }) {
    return <img
        width={width}
        src={`src/assets/${icon}.svg`}
        title={title}
        data-testid={`weather-icon-${icon}`}
    />
}
