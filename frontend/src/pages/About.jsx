import React from "react";
import picture from "../assets/sc/21.png";
import NewsLetter from "../Components/NewsLetter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faSmile,
  faHandHoldingHeart,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";

const Services = [
  {
    heading: "Ethically Handmade",
    description:
      "Every product is lovingly handcrafted with care and attention to detail.",
    icon: faHandHoldingHeart,
  },
  {
    heading: "Eco-Friendly",
    description:
      "Our commitment to sustainability ensures minimal impact on the environment.",
    icon: faLeaf,
  },
  {
    heading: "Personalized Experience",
    description:
      "Get custom-made items tailored to your preferences for a truly unique experience.",
    icon: faSmile,
  },
  {
    heading: "Recyclable Packaging",
    description:
      "We use eco-conscious packaging that’s easy to recycle and kind to the planet.",
    icon: faRecycle,
  },
];

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-[90%] max-w-[1200px] my-10">
        <div className="flex justify-center items-center">
          <img
            src={picture}
            className="max-h-96 object-contain rounded-md shadow-md"
            alt="Sample"
          />
        </div>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl font-semibold mb-5 text-[var(--Brown)]">
            About Craftsy
          </h1>
          <p className="text-justify text-lg text-[var(--Brown)] mb-10">
            At <strong>Craftsy</strong>, we believe in the magic of
            craftsmanship. Our mission is to bring you a collection of unique,
            high-quality, and sustainable handmade products. Each creation is a
            testament to the skill and dedication of talented artisans who pour
            their hearts into every piece.
          </p>
          <p className="text-justify text-lg text-[var(--Brown)]">
            By supporting <strong>Craftsy</strong>, you are joining a movement
            that values creativity, individuality, and community empowerment.
            Together, we are making a positive impact on the environment and
            uplifting local businesses. Discover the charm of handmade products
            with <strong>Craftsy</strong>.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-[var(--Light)] w-full">
        <h1 className="font-bold text-3xl text-center text-[var(--Brown)] py-10">
          Why Choose Craftsy?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {Services.map((service, index) => {
            return (
              <div
                key={index}
                className="block m-3 p-4 border rounded-md shadow-md cursor-pointer hover:scale-105 transition-all text-center"
              >
                <div className="p-4">
                  <div className="bg-white rounded-full w-20 h-20 flex justify-center items-center mx-auto mb-4">
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="h-8 text-[var(--Brown)]"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    {service.heading}
                  </h2>
                  <p className="text-md text-gray-600">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetter />
    </div>
  );
};

export default About;
