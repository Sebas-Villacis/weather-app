import { useCallback, useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { citiesWindWeatherType } from '../types';

const useWind = (lat: number, lon: number, cityId: string) => {
  const [citiesWind, setCitiesWind] = useState<Array<citiesWindWeatherType>>(
    [],
  );

  const getNearCitiesWind = useCallback(async () => {
    const url = `http://localhost:3333/weather/near-cities?lat=${lat}&lon=${lon}&cityId=${cityId}`;
    const data = await fetchData(url);
    console.log({
      data,
    });
    setCitiesWind(data);
  }, []);

  useEffect(() => {
    getNearCitiesWind();
  }, []);

  return {
    citiesWind,
  };
};

export default useWind;
