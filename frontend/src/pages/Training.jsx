import React from "react";
import crafting from "../assets/sc/22.jpg";
import marketing from "../assets/sc/23.jpg";
import packaging from "../assets/sc/24.jpg";

const Training = () => {
  return (
    <div>
      {/* Quote */}
      <div className="m-16 italic text-2xl">
        <blockquote className="text-center break-words">
          <p>“Every artist was first an amateur.”</p>
          <div className="mt-5 text-center">
            <p>― Ralph Waldo Emerson</p>
          </div>
        </blockquote>
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        <div className="card bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <div className="overflow-hidden">
            <img
              className="w-full h-56 object-cover group-hover:opacity-75 transition-opacity duration-300"
              src={crafting}
              alt="Crafting Skills"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">Crafting Essentials</h3>
            <p className="mt-2 text-gray-600">
              Master the fundamentals of creating handmade goods, from selecting
              materials to learning essential crafting techniques.
            </p>
            <a
              href="https://www.udemy.com/course/beginner-crochet-basics/?utm_source=bing&utm_medium=udemyads&utm_campaign=BG-Search_DSA_Gamma_NonP_la.EN_cc.ROW-English&campaigntype=Search&portfolio=Bing-ROW-English&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_1323814388460138_._ad__._kw_Lifestyle%20en_._de_c_._dm__._pl__._ti_dat-2334538064298665:loc-144_._li_152893_._pd__._&matchtype=b&msclkid=89c25e5ba7261dd114a939377f4624da"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 mt-4 inline-block hover:underline cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="card bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <div className="overflow-hidden">
            <img
              className="w-full h-56 object-cover group-hover:opacity-75 transition-opacity duration-300"
              src={marketing}
              alt="Marketing Skills"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">Selling Handmade Goods</h3>
            <p className="mt-2 text-gray-600">
              Learn how to market and sell your handmade products on platforms
              like Etsy, Instagram, and your own e-commerce website.
            </p>
            <a
              href="https://www.udemy.com/course/sales-101-how-to-sell-anything-49-amazing-sales-tips/?couponCode=2021PM25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 mt-4 inline-block hover:underline cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="card bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <div className="overflow-hidden">
            <img
              className="w-full h-56 object-cover group-hover:opacity-75 transition-opacity duration-300"
              src={packaging}
              alt="Packaging Skills"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">Eco-Friendly Packaging</h3>
            <p className="mt-2 text-gray-600">
              Discover innovative ways to package your products sustainably
              while creating an unforgettable unboxing experience.
            </p>
            <a
              href="https://www.udemy.com/course/use-eco-friendly-sustainable-design-to-green-your-home/?couponCode=2021PM25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 mt-4 inline-block hover:underline cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Course Videos */}
      <div className="my-16">
  <h2 className="text-3xl text-center mb-6 font-semibold">Course Videos</h2>
  <div className="flex flex-wrap justify-center gap-8">
    <div className="card bg-gray-200 rounded-lg shadow-md overflow-hidden w-80 h-48">
      <video
        data-testid="course-video"
        className="h-full w-full rounded-lg object-cover"
        controls
      >
        <source
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/BlTHC8iPiqt683o5/five-business-coworkers-walking-towards-the-business-center-friendly-talking-to-each-other_s0zjotyajl__66641a2206e05eb484f77895e433f512__P360.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="card bg-gray-200 rounded-lg shadow-md overflow-hidden w-80 h-48">
      <video
        data-testid="course-video"
        className="h-full w-full rounded-lg object-cover"
        controls
      >
        <source
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r9E0QYuleiv25jmq9/videoblocks-the-business-people-sitting-at-the-table-and-discuss_rkgsahahi__fffcb2b352af8609b372293939aaf983__P360.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>

       
      
    </div>
  );
};

export default Training;
