import Forecast from '../components/Forecast';
import Search from '../components/Search';
import useForecast from '../hooks/useForecast';

const Weather = () => {
  const {
    term,
    options,
    forecast,
    handleInputChange,
    onOptionSelect,
    onSumbit,
    city,
  } = useForecast();
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-[100vh] w-full">
      {forecast ? (
        <Forecast data={forecast} optionSelected={city} />
      ) : (
        <Search
          term={term}
          options={options}
          handleInputChange={handleInputChange}
          onOptionSelect={onOptionSelect}
          onSumbit={onSumbit}
        />
      )}
    </main>
  );
};

export default Weather;
