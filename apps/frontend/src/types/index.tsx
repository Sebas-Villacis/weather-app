export type optionType = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  wikiDataId: string;
};

export type forecastType = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  list: [
    {
      dt: number;
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      };
      weather: [
        {
          description: string;
          icon: string;
          id: number;
          main: string;
        },
      ];
      wind: {
        speed: number;
        gust: number;
        deg: number;
      };
      clouds: {
        all: number;
      };
      pop: number;
      visibility: number;
    },
  ];
};

export type citiesWindWeatherType = {
  lat: number;
  lon: number;
  temp: number;
};
