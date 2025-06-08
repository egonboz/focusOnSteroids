
const YoutubePlayer: React.FC = () => {

    return (
        <div className="flex flex-col gap-6">
            <p className="text-xl font-semibold text-gray-800 dark:text-white text-center">Youtube Player</p>
            <div className="bg-gray-100 rounded-xl p-4 flex justify-center items-center">
                <iframe 
                    className="rounded-md shadow-md"
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/jfKfPfyJRdk?si=DFyWVkUlcOUE4YHx&amp;controls=0" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen />
            </div>
        </div>
    )
}

export default YoutubePlayer;