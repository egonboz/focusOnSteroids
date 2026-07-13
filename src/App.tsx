import './App.css';
import NavBar from './components/NavBar';
import Timer from './components/Timer';
import WhiteNoiseButtons from './components/WhiteNoiseButtons';
import YoutubePlayer from './components/YoutubePlayer';

function App() {
  return (
    <div className="flex flex-col items-center gap-5 bg-white dark:bg-neutral-900 min-h-screen text-gray-800 dark:text-white transition-colors duration-300">
      <NavBar />
      <Timer/>
      <YoutubePlayer />
      <WhiteNoiseButtons />
    </div>
  );
}

export default App;
