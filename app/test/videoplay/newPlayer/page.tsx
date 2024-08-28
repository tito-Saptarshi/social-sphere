export default function VideoPlay() {
    const videoUrl = 'https://vidstream.to/series/watch-berserk-35682';
  
    return (
      <div>
        video player
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          Watch on Vidstream
        </a>
      </div>
    );
  }