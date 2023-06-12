# Weather App

This is a basic weather app that based on the user input displays possible options that match the search field. Once selected the option and press the search button a new window with the forecast weather data will be displayed along with a HeatMap. The user must be login to use the app.

## Set up

##### Environment keys configuration

On the root directory create an ` touch .override` file and copy the keys found in `.override.example` and fill them with your configurations.

##### APIS registration

For the Weather API, signup in `https://openweathermap.org/api` to get the API key, which is necessary to call the APIs. As for the Geolocation API, signup to: `https://rapidapi.com/damngoodapis/api/geolocation/` and subscribe to the API.

##### Build up

Run the command `docker compose build` and then `docker compose up`.

###### Note: Prisma recommends performing migrations for the production database in an automated step and advises against performing it locally 🙅‍♂️.If you have set the environmental key: `BACKEND_ENV ` to development the Prisma migrations have to be runned manually. For more information about running scripts **Check the section Run scripts**

## Run Scripts

###### Note: Currently running the scripts inside docker works only when the environment key `BACKEND_ENV ` is set to development.

Enter the backend container: by running `docker exec -it backend sh`. Then, run this command `npm run migrate:all` if you want to run the Prisma migrations manually, otherwise you can run any other script such as `npm run createUsers`
which fills the Postgres database with fake users.

## Tips and Tricks

To clean all the docker containers, images and volumes run the following:

```
docker compose down
docker system prune -a --volumes
```

In case there is a change in the `DOCKERFILE` and `DOCKERFILE-COMPOSE.YML` run the `docker compose down && docker compose build`
Delete all node_modules found in a Directory: `find . -name "node_modules" -type d -prune -exec rm -rf '{}' +`
