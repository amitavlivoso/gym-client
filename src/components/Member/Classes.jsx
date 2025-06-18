import React, { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import yegavideo from "../../assets/image/gymvdo.mp4";

// Replace with actual thumbnails

const classes = [
  {
    title: "Vinyasa Flow",
    video: yegavideo,
    thumbnail:
      "https://images.unsplash.com/photo-1516827003699-2880f453d93b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw0OTI4ODQ4fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
  },
  {
    title: "Fitness Yoga",
    video: yegavideo,
    thumbnail:
      "https://images.unsplash.com/photo-1596196589876-49bcc4632fdf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
  },
  {
    title: "Chakras",
    video: yegavideo,
    thumbnail:
      "https://images.unsplash.com/photo-1552196634-24a18d82ac56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHwxMjA0MDExMHx8ZW58MHx8fHw%3D&w=1000&q=80",
  },
];

const ClassesSection = () => {
  const [playingIndex, setPlayingIndex] = useState(null);

  return (
    <div className="mx-auto max-w-7xl text-center mt-16 mb-8 px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 font-poppins">
        Classes We Offer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
        {classes.map((cls, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-md"
          >
            {playingIndex === index ? (
              <video
                src={cls.video}
                controls
                autoPlay
                className="w-full h-[445px] object-cover rounded-xl"
              />
            ) : (
              <div
                className="relative w-full h-[445px] cursor-pointer"
                onClick={() => setPlayingIndex(index)}
              >
                <img
                  src={cls.thumbnail}
                  alt={cls.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black/40 transition-opacity duration-300">
                  <PlayCircleOutlineIcon
                    style={{ fontSize: 64, color: "white" }}
                  />
                </div>
                <div className="absolute bottom-0 w-full bg-black/60 text-white py-3 font-semibold text-lg">
                  {cls.title}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesSection;
