import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { fetchDataType, forecastType, optionType } from '../types';
import { useDebounce } from './useDebounce';

const useForecast = () => {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const debouncedSearch: string = useDebounce(term, 500);

  useEffect(() => {
    const getOptions = async () => {
      const url = `http://localhost:3333/geo/locations?q=${term}`;
      const locations: fetchDataType = await fetchData(url, {
        signalKey: 'LOCATIONS_API',
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
    setCity(option);
  };

  const onSumbit = async () => {
    if (!city) return;
    const forecastData: fetchDataType = await fetchData(
      `http://localhost:3333/weather/forecast?lat=${city.latitude}&lon=${city.longitude}`,
    );

    const data = {
      ...forecastData.data.city,
      list: forecastData.data.list.slice(0, 20),
    };
    setForecast(data);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
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
