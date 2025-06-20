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

    const [volumes, setVolumes] = useState<Record<string, number>>({
    Rain: 0.5,
    Fire: 0.5,
    Waves: 0.5,
    Wind: 0.5,
  });

    const [showVolumeSlider, setShowVolumeSlider] = useState<Record<string, boolean>>({
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

   const handleVolumeChange = (name: keyof typeof sounds, value: number) => {
    const audio = sounds[name].current;
    setVolumes((prev) => ({ ...prev, [name]: value }));
    if (audio) {
      audio.volume = value;
    }
  };

    const handleRightClick = (e: React.MouseEvent, name: keyof typeof sounds) => {
    e.preventDefault(); // Evita el menú del navegador
    setShowVolumeSlider((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };


  return (
    <div className="flex flex-col gap-6 mb-50">
      <p className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white text-center">White Noise</p>
      <div className="flex flex-row gap-2">
        {Object.keys(sounds).map((key) => {
          const isActive = activeSounds[key];
          const Icon = iconMap[key as keyof typeof iconMap];
          const showSlider = showVolumeSlider[key];

          return (
            <div key={key} className="flex flex-col items-center">
              <button
              className={`rounded-2xl text-xl px-6 py-3 transition ease-in duration-200 bg-gray-100
                ${isActive
                  ? `shadow-[inset_0_0_0_2px_rgba(0,0,0,0.8)] dark:shadow-[inset_0_0_0_4px_rgba(255,255,255,1)]`
                  : ``}`}
              onClick={() => toggleSound(key as keyof typeof sounds)}
              onContextMenu={(e) => handleRightClick(e, key as keyof typeof sounds)}
            >
              <Icon
                className={`w-6 h-6 sm:w-10 sm:h-10 text-gray-800`}
              />
            </button>

              {showSlider && (
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volumes[key]}
                  onChange={(e) =>
                    handleVolumeChange(key as keyof typeof sounds, parseFloat(e.target.value))
                  }
                  className="w-10 mt-2 sm:w-20 accent-gray-800 dark:accent-white transition ease-in duration-200"
                />
              )}
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