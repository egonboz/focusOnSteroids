import './App.css';
import NavBar from './components/NavBar';
import Timer from './components/Timer';
import WhiteNoiseButtons from './components/WhiteNoiseButtons';
import YoutubePlayer from './components/YoutubePlayer';

function App() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-900 text-gray-800 dark:text-white flex flex-col items-center mt-14 gap-6 transition-colors duration-300">
      <NavBar />
      <Timer />
      <YoutubePlayer />
      <WhiteNoiseButtons />
    </div>
  );
}

export default App;
