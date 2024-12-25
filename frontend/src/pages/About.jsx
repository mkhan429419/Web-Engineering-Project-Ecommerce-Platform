import React from "react";
import sample from "../assets/sample.png";
import NewsLetter from "../Components/NewsLetter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchange,
  faFileContract,
  faShippingFast,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
const Services = [
  {
    heading: "Fast Shipping",
    description:
      "Get your orders delivered swiftly with our expedited shipping services.",
    icon: faExchange,
  },
  {
    heading: "Secure Payments",
    description:
      "Enjoy safe and hassle-free transactions with encrypted payment options.",
    icon: faShippingFast,
  },
  {
    heading: "24/7 Customer Support",
    description:
      "Our support team is available round-the-clock to assist you with any queries.",
    icon: faLock,
  },
  {
    heading: "Easy Returns",
    description:
      "Hassle-free returns and exchanges to ensure your complete satisfaction.",
    icon: faFileContract,
  },
];
const About = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-[90%] max-w-[1200px]">
        <div className="flex justify-center items-center">
          <img src={sample} className="max-h-96 object-contain" alt="Sample" />
        </div>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-3xl font-semibold mb-5 text-[var(--Brown)]">
            We are an ecommerce site
          </h1>
          <p className="text-justify text-lg text-[var(--Brown)] mb-10 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            reprehenderit, quidem alias consequatur quia, aliquid perspiciatis
            modi voluptas, saepe repellendus quo in odit at deserunt et dolorum
            asperiores corrupti eum.
          </p>
        </div>
      </div>
      <div className="bg-[var(--Light)] w-full">
        <h1 className="font-bold text-3xl text-center text-[var(--Brown)] py-10">
          Our Services
        </h1>
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {Services.map((service, index) => {
            return (
              <div
                key={index}
                className="block m-3 p-2 border rounded-md shadow-md cursor-pointer hover:scale-105 transition-all text-center"
              >
                <div className="p-4 e">
                  <div className="bg-white rounded-full w-20 justify-self-center h-20 flex justify-center items-center">
                    <FontAwesomeIcon icon={service.icon} className="h-7" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {service.heading}
                  </h2>
                  <h2 className="text-md text-gray-600 mt-2">
                    {service.description}
                  </h2>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
