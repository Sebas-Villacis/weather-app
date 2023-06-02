import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { forecastType, optionType } from '../types';
import { useDebounce } from './useDebounce';

const useForecast = () => {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const debouncedSearch = useDebounce(term, 500);

  useEffect(() => {
    const getOptions = async () => {
      const url = `http://localhost:3333/geo/locations?q=${term}`;
      const locations: any = await fetchData(url, {
        signalKey: 'LOCATIONS_API',
      });

      console.log({
        locations,
      });
      setOptions(locations.data);
    };

    if (debouncedSearch && !city) getOptions();
  }, [debouncedSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === '') return;
  };

  const onOptionSelect = (option: optionType) => {
    console.log('optionselected:', option);
    setCity(option);
  };

  const onSumbit = async () => {
    if (!city) return;
    // forecastData;
    console.log({
      city,
    });
    const forecastData: any = await fetchData(
      `http://localhost:3333/weather/forecast?lat=${city.latitude}&lon=${city.longitude}`,
    );

    const foreCastData = {
      ...forecastData.data.city,
      list: forecastData.data.list.slice(0, 16),
    };
    setForecast(foreCastData);
  };

  useEffect(() => {
    if (city) {
      console.log('entra al usefect city');
      setTerm(city.name);
      setOptions([]);
    }

    /* return () => {
      setTerm('');
      setOptions([]);
      setCity(null);
    } */
  }, [city]);

  return {
    term,
    options,
    forecast,
    onOptionSelect,
    handleInputChange,
    onSumbit,
    city,
  };
};

export default useForecast;
