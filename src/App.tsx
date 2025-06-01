import './App.css';
import NavBar from './components/NavBar';
import Timer from './components/Timer';
import WhiteNoiseButtons from './components/WhiteNoiseButtons';
import YoutubePlayer from './components/YoutubePlayer';

function App() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center mt-14 gap-6 transition-colors duration-300">
      <NavBar />
      <h1 className="text-2xl font-bold mt-8">Focus Session</h1>
      <Timer />
      <YoutubePlayer />
      <WhiteNoiseButtons />
    </div>
  );
}

export default App;
