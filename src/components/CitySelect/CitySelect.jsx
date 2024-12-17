import React from "react"
import { Autocomplete, Box, TextField } from "@mui/material"

function CitySelect({ onChange, cities }) {
    return (
        <Box sx={{ width: 1 }} data-testid="city-select">
            <Autocomplete
                autoComplete
                options={cities}
                renderInput={(params) => <TextField label="City" {...params} />}
                noOptionsText="No cities found"
                onChange={(_, city) => {
                    onChange(city)
                }}
            />
        </Box>
    )
}

export default React.memo(CitySelect)
