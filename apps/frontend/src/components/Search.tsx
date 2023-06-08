import { ChangeEvent } from 'react';
import { optionType } from '../types';
import Header from './Header';
import Suggestions from './Suggestions';

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
    <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
      <Header />
      <div className="relative flex mt-10 md:mt-4">
        <input
          type="text"
          onChange={handleInputChange}
          value={term}
          className="px-2 py-1 rounded-l-md border-2 border-white"
        />

        <Suggestions options={options} onSelect={onOptionSelect} />

        <button
          className="rounded-r-md border-2 border-zinc-100 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-zinc-100 px-2 py-1 cursor-pointer"
          onClick={onSumbit}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
