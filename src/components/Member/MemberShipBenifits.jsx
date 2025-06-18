import React from "react";
import BenifitGrid from "./BenifitGrid";

const MemberShipBenifits = () => {
  return (
    <div>
      <div className=" flex justify-center items-center bg-gray-800 py-2">
        <p className="text-sm md:text-lg text-white  font-bold">
          This is our Client’s motivation, we work with Passion!
        </p>
      </div>

      {/* Membership Benefits */}

      <div className=" max-w-5xl md:max-w-7xl mx-auto md:mt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            Membership Benefits
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem Ipsum Dolor sit amet Consectetur, adipiscing elit.
          </p>
        </div>

        {/* Benefits Grid */}

        <BenifitGrid />
      </div>
    </div>
  );
};

export default MemberShipBenifits;
