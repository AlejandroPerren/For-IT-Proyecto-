import NavCourse from "../compontents/courses/NavCurse";
import VideoPlayer from "../compontents/courses/VideoPlayer";


const CoursePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className="col-span-1 border-r border-gray-300">
        <NavCourse />
      </div>

      <div className="col-span-3 flex items-center justify-center p-4">
        <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" />
      </div>
    </div>
  );
};

export default CoursePage;
