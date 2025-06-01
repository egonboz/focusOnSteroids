import './App.css'
import NavBar from './components/NavBar'
import Timer from './components/Timer'
import WhiteNoiseButtons from './components/WhiteNoiseButtons'
import YoutubePlayer from './components/YoutubePlayer'

function App() {


  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <NavBar />
      <h1 className='text text-2xl font-bold text-gray-800'>Focus Session</h1>
      <Timer />
      <YoutubePlayer />
      <WhiteNoiseButtons />
    </div>
  )
}

export default App
