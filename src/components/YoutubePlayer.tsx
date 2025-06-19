const YoutubePlayer: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-auto p-2 sm:w-1/2">
      <p className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white text-center">
        Youtube Player
      </p>
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="aspect-video w-full rounded-md shadow-md overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/jfKfPfyJRdk?si=DFyWVkUlcOUE4YHx&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayer;