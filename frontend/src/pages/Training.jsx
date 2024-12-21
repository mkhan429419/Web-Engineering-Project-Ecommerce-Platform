import business from "../assets/business.jpg";
import market from "../assets/market.jpg";
import financial from "../assets/financial.jpg";
const Training = () => {
  return (
    <div>
      {/* Quote */}
      <div className="m-16 italic text-2xl">
        <blockquote className="text-center break-words">
          <p>
            “You educate a man; you educate a man. You educate a woman; you
            educate a generation.”
          </p>
          <div className="mt-5 text-center">
            <p>― Brigham Young</p>
          </div>
        </blockquote>
      </div>
      {/* Course Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        <div className="card bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <div className="overflow-hidden">
            <img
              className="w-full h-56 object-cover group-hover:opacity-75 transition-opacity duration-300"
              src={business}
              alt="Course 1"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">Basic Business Skills</h3>
            <p className="mt-2 text-gray-600">
              Learn the fundamentals of running a business in a rural setting.
              From marketing to finance, this course covers everything.
            </p>
            <a
              href="https://www.coursera.org/specializations/wharton-business-foundations"
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
              src={market}
              alt="Course 2"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">Online Marketplace Setup</h3>
            <p className="mt-2 text-gray-600">
              This training helps you set up an online marketplace and start
              selling your products globally.
            </p>
            <a
              href="https://www.coursera.org/learn/foundations-of-digital-marketing-and-e-commerce"
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
              src={financial}
              alt="Course 3"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">Financial Literacy</h3>
            <p className="mt-2 text-gray-600">
              Gain knowledge on how to manage finances, investment, and savings
              in a small business environment.
            </p>
            <a
              href="https://www.coursera.org/learn/financial-planning"
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
        <h2 className="text-3xl text-center mb-6 font-semibold">
          Course Videos
        </h2>
        <div className="flex justify-center space-x-8">
          <div className="card bg-gray-200 rounded-lg shadow-md overflow-hidden">
            <video className="h-full w-full rounded-lg" controls>
              <source
                src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/BlTHC8iPiqt683o5/five-business-coworkers-walking-towards-the-business-center-friendly-talking-to-each-other_s0zjotyajl__66641a2206e05eb484f77895e433f512__P360.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="card bg-gray-200 rounded-lg shadow-md overflow-hidden">
            <video className="h-full w-full rounded-lg" controls>
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
