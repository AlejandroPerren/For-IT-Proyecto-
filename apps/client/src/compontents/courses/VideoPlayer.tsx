import React from "react";

type VideoPlayerProps = {
  src: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div className="w-full max-w-4xl">
      <video width="100%" controls>
        <source src={src} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
};

export default VideoPlayer;
