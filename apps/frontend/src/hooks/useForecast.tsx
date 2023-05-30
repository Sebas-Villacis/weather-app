import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { forecastType, optionType } from '../types';

const useForecast = () => {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getOptions = async (value: string) => {
    const url = `http://localhost:3333/geo/locations?q=${value.trim()}`;
    const data = await fetchData(url);
    console.log({
      data,
    });
    setOptions(data);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === '') return;

    getOptions(value);
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
    const data = await fetchData(
      `http://localhost:3333/weather/forecast?lat=${city.latitude}&lon=${city.longitude}`,
    );

    const foreCastData = {
      ...data.city,
      list: data.list.slice(0, 16),
    };
    setForecast(foreCastData);
  };

  useEffect(() => {
    if (city) {
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
