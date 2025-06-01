import { useRef, useState } from "react";
import RainIcon from '../assets/soundsIcons/rain.svg?react';
import FireIcon from '../assets/soundsIcons/fire.svg?react';
import WavesIcon from '../assets/soundsIcons/waves.svg?react';
import WindIcon from '../assets/soundsIcons/wind.svg?react';

const iconMap = {
  Rain: RainIcon,
  Fire: FireIcon,
  Waves: WavesIcon,
  Wind: WindIcon,
};

const WhiteNoiseButtons: React.FC = () => {

  

  const sounds = {
    Rain: useRef<HTMLAudioElement>(null),
    Fire: useRef<HTMLAudioElement>(null),
    Waves: useRef<HTMLAudioElement>(null),
    Wind: useRef<HTMLAudioElement>(null),
  };

    const [activeSounds, setActiveSounds] = useState<Record<string, boolean>>({
    Rain: false,
    Fire: false,
    Waves: false,
    Wind: false,
  });

  const toggleSound = (name: keyof typeof sounds) => {
    const audio = sounds[name].current;
    if (!audio) return;

    if (audio.paused) {
      audio.loop = true;
      audio.play();
      setActiveSounds((prev) => ({ ...prev, [name]: true }));
    } else {
      audio.pause();
      audio.currentTime = 0;
      setActiveSounds((prev) => ({ ...prev, [name]: false }));
    }
  };


  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-semibold text-gray-800">White Noise</p>
      <div className="flex flex-row gap-2">
        {Object.keys(sounds).map((key) => {
          const isActive = activeSounds[key];
          const Icon = iconMap[key as keyof typeof iconMap];

          return (
            <div key={key}>
              <button
                className={`rounded-2xl text-xl px-6 py-3 transition ease-in duration-200 ${
                  isActive ? "bg-gray-300" : "bg-gray-100"
                }`}
                onClick={() => toggleSound(key as keyof typeof sounds)}
              >
                <Icon className={`w-10 h-10 ${isActive ? 'text-gray-950' : 'text-gray-800'}`} />
              </button>
              <audio
                ref={sounds[key as keyof typeof sounds]}
                src={`/sounds/${key.toLowerCase()}.mp3`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhiteNoiseButtons