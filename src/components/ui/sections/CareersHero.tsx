import React from "react";
import IconSection from "./IconSection";

const CareersHero: React.FC = () => {
  return (
    <section className="bg-primary- flex flex-col ">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
          Join Our Team and Build a Future with Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-16">
          We’re always looking for passionate, talented individuals to help us
          grow and deliver the best products to our customers.
        </p>
        <IconSection />
        <button className="bg-[#36A2EB] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-primary-2 transition duration-300 ease-in-out">
          Explore Careers
        </button>
      </div>
    </section>
  );
};

export default CareersHero;
