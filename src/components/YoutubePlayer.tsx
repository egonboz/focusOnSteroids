import { useState } from "react";
import { useFetch } from  "../hooks/useFetch";
interface youtubeSearchResult {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
}


const YoutubePlayer: React.FC = () => {
  const [searchParams, setSearchParams] = useState("");

  const url = `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_YOUTUBE_API_KEY}&type=video&q=${searchParams}`

  const {data, isLoading, hasError} = useFetch(url);

  return (
    <div className="flex flex-col gap-4 w-auto p-2 sm:w-1/2 max-w-xl">
      <p className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white text-center">
        Youtube Player
      </p>
      {/* <input 
        type="text"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        placeholder="Search for a video"
        className="bg-gray-100 rounded-xl p-2 sm:p-4 dark:text-black"
      /> */}
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="aspect-video w-full rounded-md shadow-md overflow-hidden">
          {!isLoading && !hasError && (data as { items: youtubeSearchResult[] }).items.map(e => {
            return (
            <iframe
              key={e.id.videoId}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${e.id.videoId}?si=DFyWVkUlcOUE4YHx&amp;controls=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            )}
          )}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/X4VbdwhkE10?si=2csrQ8sJkOY-WwZs&amp;controls=0"
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