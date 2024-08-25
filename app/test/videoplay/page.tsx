export default function VideoPlay() {
  return (
    <div>
      video player
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/0V1wlxlYikY`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
