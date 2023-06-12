# Weather App

This is a basic weather app that based on the user input displays possible options that match the search field. Once selected the option and press the search button a new window with the forecast weather data will be displayed along with a HeatMap. The user must be login to use the app.

## Set up

##### Environment keys configuration

On the root directory create an ` touch .override` file and copy the keys found in `.override.example` and fill them with your configurations.

##### APIS registration

For the Weather API, signup in `https://openweathermap.org/api` to get the API key, which is necessary to call the APIs. As for the Geolocation API, signup to: `https://rapidapi.com/damngoodapis/api/geolocation/` and subscribe to the API.

##### Build up

Run the command `docker compose build` and then `docker compose up`.
Note: If the configuration key `APP_ENV` is set to development, we must run the Prisma migration in another terminal:

```
docker exec -it backend sh
npm run migrate:all
```

##### Populate users table

Run the command:

```
docker exec -it backend sh
npm run createUsers
```

## Tips and Tricks

To clean all the docker containers, images and volumes run the following:

```
docker compose down
docker system prune -a --volumes
```

In case there is a change in the `DOCKERFILE` and `DOCKERFILE-COMPOSE.YML` run the `docker compose build`
Delete all node_modules found in a Directory: `find . -name "node_modules" -type d -prune -exec rm -rf '{}' +`
