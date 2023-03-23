import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import { Card, Container, TextField, Grid, Button, Box } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
  WiSmoke,
  WiDayHaze,
  WiCloud
} from 'react-icons/wi'
import Typography from '@mui/material/Typography'
import { Translate } from '@mui/icons-material'

interface WeatherData {
  current_temperature: number
  temperature: string
  country_code: string
  weather_type: string
  humidity: number
  pressure: number
  visibility: number
  wind: number
  wind_direction: number
  sunrise: string
  sunset: string
  description: string
  city: string
  country: string
}

const App: React.FC = () => {
  const [data, setData] = useState<WeatherData>({
    temperature: '',
    weather_type: '',
    current_temperature: 0,
    country_code: '',
    humidity: 0,
    pressure: 0,
    visibility: 0,
    wind: 0,
    wind_direction: 0,
    sunrise: '',
    sunset: '',
    description: '',
    city: 'Lucknow',
    country: 'India'
  })

  useEffect(() => {
    getData()
    console.log(data)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const getWeatherIcon = (weatherType: any) => {
    switch (weatherType) {
      case 'Clear':
        return (
          <>
            <WiDaySunny size={64} />
            <Typography variant='subtitle1'>Clear</Typography>
          </>
        )
      case 'Clouds':
        return (
          <>
            <WiCloudy size={64} />
            <Typography variant='subtitle1'>Clouds</Typography>
          </>
        )
      case 'Rain':
        return (
          <>
            <WiRain size={64} />
            <Typography variant='subtitle1'>Rain</Typography>
          </>
        )
      case 'Thunderstorm':
        return (
          <>
            <WiThunderstorm size={64} />
            <Typography variant='subtitle1'>Thunderstorm</Typography>
          </>
        )
      case 'Snow':
        return (
          <>
            <WiSnow size={64} />
            <Typography variant='subtitle1'>Snow</Typography>
          </>
        )
      case 'Mist':
        return (
          <>
            <WiFog size={64} />
            <Typography variant='subtitle1'>Mist</Typography>
          </>
        )
      case 'Smoke':
        return (
          <>
            <WiSmoke size={64} />
            <Typography variant='subtitle1'>Smoke</Typography>
          </>
        )
      case 'Haze':
        return (
          <>
            <WiDayHaze size={64} />
            <Typography variant='subtitle1'>Haze</Typography>
          </>
        )
      case 'Fog':
        return (
          <>
            <WiFog size={64} />
            <Typography variant='subtitle1'>Fog</Typography>
          </>
        )
      default:
        return (
          <>
            <WiCloud size={64} />
            <Typography variant='subtitle1'>Cloudy</Typography>
          </>
        )
    }
  }

  const getData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data.city},${data.country}&appid=cd1ce9e361ead037e65bbb8dac9d1102&units=metric`
      )
      .then(function (response) {
        const { main, sys, wind, weather, visibility } = response.data
        setData({
          current_temperature: main.temp,
          temperature: `${main.temp_min}/${main.temp_max}`,
          humidity: main.humidity,
          pressure: main.pressure,
          weather_type: weather[0].main,
          country_code: sys.country,
          visibility: visibility,
          wind: wind.speed,
          wind_direction: wind.deg,
          sunrise: new Date(sys.sunrise * 1000).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          }),
          sunset: new Date(sys.sunset * 1000).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          }),
          description: weather[0].description,
          city: data.city,
          country: data.country
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        <Card raised style={{ transform: 'translate3d(0, 100px, 0)' }}>
          <CardContent
            style={{ border: 'dotted', borderRadius: '20px', margin: '20px' }}
          >
            <Typography
              gutterBottom
              variant='h2'
              component='div'
              style={{ textAlign: 'center' }}
            >
              Weather App
            </Typography>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={4}>
                <TextField
                  variant='filled'
                  fullWidth
                  label='City'
                  name='city'
                  value={data.city}
                  onChange={handleInputChange}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      getData()
                    }
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='filled'
                  fullWidth
                  label='Country'
                  name='country'
                  value={data.country}
                  onChange={handleInputChange}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      getData()
                    }
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  style={{ borderRadius: '20px' }}
                  variant='contained'
                  onClick={getData}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mt: 3, p: 2, border: '1px dashed grey' }}
                  style={{ borderRadius: '20px' }}
                >
                  <Typography variant='h5' sx={{ marginRight: '10px' }}>
                    {data.city}, {data.country_code}. Weather
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      color: 'grey',
                      fontSize: '14px',
                      fontWeight: 'lighter'
                    }}
                  >
                    As of{' '}
                    {new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true
                    })}
                  </Typography>
                  <Typography
                    variant='h2'
                    gutterBottom
                    style={{ justifyContent: 'center', display: 'flex' }}
                  >
                    {data.current_temperature}&deg;
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      {getWeatherIcon(data.weather_type)}
                    </Box>
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      color: 'grey',
                      fontSize: '25px',
                      fontWeight: 'lighter'
                    }}
                  >
                    {data.weather_type}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                container
                spacing={2}
                className='mt-2'
                justifyContent='center'
                alignItems='center'
                style={{ padding: '20px' }}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1'>
                          <strong>High/Low</strong>
                        </Typography>
                        <Typography variant='subtitle1'>
                          {data.temperature}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography
                          variant='subtitle1'
                          sx={{ marginRight: '10px' }}
                        >
                          <strong>Wind</strong>
                        </Typography>
                        <Typography
                          variant='subtitle1'
                          sx={{ marginLeft: '10px' }}
                        >
                          {data.wind} km/hr
                        </Typography>
                      </div>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography
                          variant='subtitle1'
                          sx={{ marginRight: '10px' }}
                        >
                          <strong>Humidity</strong>
                        </Typography>
                        <Typography
                          variant='subtitle1'
                          sx={{ marginLeft: '10px' }}
                        >
                          {data.humidity} %
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1'>
                          <strong>Wind Direction</strong>
                        </Typography>
                        <Typography variant='subtitle1'>
                          {data.wind_direction}&deg; deg
                        </Typography>
                      </div>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1'>
                          <strong>Pressure</strong>
                        </Typography>
                        <Typography variant='subtitle1'>
                          {data.pressure}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1'>
                          <strong>Sunrise</strong>
                        </Typography>
                        <Typography variant='subtitle1'>
                          {data.sunrise}
                        </Typography>
                      </div>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1'>
                          <strong>Visibility</strong>
                        </Typography>
                        <Typography variant='subtitle1'>
                          {data.visibility}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={5} sx={{ borderBottom: '1px dotted' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1'>
                          <strong>Sunset</strong>
                        </Typography>
                        <Typography variant='subtitle1'>
                          {data.sunset}
                        </Typography>
                      </div>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default App
