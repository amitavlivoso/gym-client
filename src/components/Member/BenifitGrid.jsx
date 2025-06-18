import yogaperson from "../../assets/image/yoga person.png";
import group5 from "../../assets/image/Group 5.png";
import desktoicon from "../../assets/image/desktop-icon.png";

const benefits = [
  {
    title: "Expert Trainers",
    description:
      "Experience the depth of knowledge from experts across all areas of yoga.",
    image: yogaperson,
  },
  {
    title: "Personalized Programs",
    description:
      "Get fitness routines tailored specifically for your goals and body type.",
    image: group5,
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community that supports and motivates you on your journey.",
    image: desktoicon,
  },
];

const BenifitGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-center mb-4">
            <div
              className=" p-3  h-14 w-14"
              style={{
                backgroundImage: `url(${benefit.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {benefit.title}
          </h3>
          <p className="text-gray-600 text-center">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BenifitGrid;
