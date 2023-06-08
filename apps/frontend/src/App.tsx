import './App.css';
import Login from './pages/Login';

const App = (): JSX.Element => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-[100vh] w-full">
      <Login />
    </main>
  );
};

export default App;
