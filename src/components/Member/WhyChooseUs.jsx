"use client";
import whychooseus from "../../assets/image/whychooseus.jpg";
export default function WhyChooseUs() {
  return (
    <div className="mx-auto h-[707px] max-w-full text-center mt-16 mb-8  grid grid-cols-1 md:grid-cols-2 gap-0  ">
      <div
        className=" "
        style={{
          backgroundImage: `url(${whychooseus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <img src={aboutimg} alt="hghg"  className=' object-cover rounded cursor-pointer hover:opacity-80 transition'/> */}
      </div>

      <div className="bg-[#FF6F59] flex flex-col justify-center items-center text-white gap-14 ">
        <h2 className="text-6xl font-extrabold">Why Choose Us ?</h2>

        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut tenetur{" "}
          <br />
          possimus nam totam, repellat expedita ullam amet velit.
        </p>

        <div className="flex flex-row gap-12 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold">500+</span>

            <span className="text-lg mt-2">Happy Customers</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold">10+</span>

            <span className="text-lg mt-2">Years of Experience</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold">1000+</span>

            <span className="text-lg mt-2">Satisfied People</span>
          </div>
        </div>
      </div>
    </div>
  );
}
