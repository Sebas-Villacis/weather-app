import { ChangeEvent } from 'react';
import { optionType } from '../types';

type Props = {
  term: string;
  options: [];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSumbit: () => void;
};

const Search = ({
  term,
  options,
  handleInputChange,
  onOptionSelect,
  onSumbit,
}: Props): JSX.Element => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-[100vh] w-full">
      <section className="w-full md:max-w-[500]px p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather
          <span className="font-black">Forecast</span>{' '}
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from the dropdown
        </p>
        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            onChange={handleInputChange}
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white"
          />

          {options && options.length > 0 && (
            <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
              {options.map((option: optionType, index: number) => (
                <li key={`${option.name} - ${index}`}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            className="rounded-r-md border-2 border-zinc-100 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSumbit}
          >
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default Search;
