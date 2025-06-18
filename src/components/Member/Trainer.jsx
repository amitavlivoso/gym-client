import React from "react";
import Trainer1 from '../../assets/image/teacher1.jpg'
import Trainer2 from '../../assets/image/teacher2.jpg'
import Trainer3 from '../../assets/image/teacher3.jpg'

const Trainer = () => {
  return (
    <div>
      <div className="mx-auto max-w-5xl  md:max-w-7xl text-center mt-16 mb-8 ">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
          Meet our teachers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-18 mb-16">
          <a href="">
            <img
              src={Trainer1}
              alt="hghg"
              className="w-[377px] h-[445px] object-cover rounded cursor-pointer hover:opacity-80 transition"
            />

            <h2 className="font-bold text-2xl">Bianca melas</h2>

            <p>Gym instructor</p>
          </a>

          <a href="">
            <img
              src={Trainer2}
              alt="hghg"
              className="w-[377px] h-[445px] object-cover rounded cursor-pointer hover:opacity-80 transition"
            />

            <h2 className="font-bold text-2xl">Bianca melas</h2>

            <p>Gym instructor</p>
          </a>

          <a href="">
            <img
              src={Trainer3}
              alt="hghg"
              className="w-[377px] h-[445px] object-cover rounded cursor-pointer hover:opacity-80 transition"
            />

            <h2 className="font-bold text-2xl">Bianca melas</h2>

            <p>Gym instructor</p>
          </a>
        </div>

        <button className="bg-[#FF6F59] hover:bg-indigo-700 text-gray-900 font-bold py-2 px-8 rounded shadow-lg transform transition hover:scale-105 duration-300 mb-8">
          See More
        </button>
      </div>
    </div>
  );
};

export default Trainer;
