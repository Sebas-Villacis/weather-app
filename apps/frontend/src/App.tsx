import './App.css';
import Forecast from './components/Forecast';
import MapWrapper from './components/MapWrapper';
import Search from './components/Search';
import useForecast from './hooks/useForecast';

const App = (): JSX.Element => {
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
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-full w-full">
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
      {/* <MapWrapper
        city={{
          name: 'City Of london',
          country: 'United Kingdom',
          latitude: 51.51988,
          longitude: -0.09446,
          wikiDataId: 'Q23311',
        }}
      /> */}
    </main>
  );
};

export default App;
