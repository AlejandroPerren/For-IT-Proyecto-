type LessonContentProps = {
  videoUrl?: string | null;
  textContent?: string | null;
  quiz?: {
    id: number;
    question: string;
    options: string[];
    correctAnswer?: string;
  }[];
};
const LessonContent: React.FC<LessonContentProps> = ({
  videoUrl,
  textContent,
  quiz,
}) => {
  const hasVideo = videoUrl && videoUrl.trim() !== "";
  const hasText = textContent && textContent.trim() !== "";

  if (!hasVideo && !hasText && (!quiz || quiz.length === 0)) {
    return (
      <div className="text-gray-500 text-lg">
        Esta lección no contiene video, texto ni quiz disponible.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      {hasVideo && (
        <div className="w-full">
          {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
            <iframe
              width="100%"
              height="480"
              src={videoUrl.replace("watch?v=", "embed/")}
              title="Video de la lección"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          ) : (
            <video width="100%" controls className="rounded-lg shadow-lg">
              <source src={videoUrl} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
          )}
        </div>
      )}

      {hasText && (
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-800 whitespace-pre-line">{textContent}</p>
        </div>
      )}

      {quiz && quiz.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-3">Quiz</h3>
          {quiz.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              <ul className="mt-2 space-y-2">
                {q.options.map((opt, i) => (
                  <li key={i}>
                    <button className="w-full text-left p-2 bg-white rounded hover:bg-gray-100 border">
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonContent;
