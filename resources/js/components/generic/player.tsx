import { PauseIcon, PlayIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
// import song from './assets/audio/song.mp3';

export default function AudioPlayer({
  customSong,
}: {
  customSong?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded flex gap-1">
      <audio ref={audioRef} src={customSong ?? '/song.mp3'} preload="auto" />
      
      <button
        onClick={togglePlay}
        className="text-white px-2 py-2"
      >
        {isPlaying ?  <PauseIcon strokeWidth={1} /> : <PlayIcon strokeWidth={1} />}
      </button>

      <div className="w-full h-2 bg-white/25 rounded mt-4 overflow-hidden">
        <div
          className="h-full bg-white rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
