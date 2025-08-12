type LessonContentProps = {
  videoUrl: string | null;
  textContent: string | null;
};

const LessonContent: React.FC<LessonContentProps> = ({ videoUrl, textContent }) => {
  if (videoUrl && videoUrl.trim() !== "") {
    return (
      <div className="w-full max-w-4xl">
        <video width="100%" controls>
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
    );
  }

  if (textContent && textContent.trim() !== "") {
    return (
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        <p className="text-gray-800 whitespace-pre-line">{textContent}</p>
      </div>
    );
  }

  return (
    <div className="text-gray-500 text-lg">
      Esta lección no contiene video ni texto disponible.
    </div>
  );
};

export default LessonContent;
