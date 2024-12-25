import React from "react";
const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 w-full max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black mb-10">
            Get in <span className="text-[var(--Pink)]">touch</span>
          </h1>
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="fname">First Name:</label>
              <input type="text" name="fname" id="fname" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="lname">Last Name:</label>
              <input type="text" name="lname" id="lname" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label className="text-lg font-bold" htmlFor="email">Email Address:</label>
              <input type="email" name="email" id="email" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label className="text-lg font-bold" htmlFor="street">Street Address:</label>
              <input type="text" name="street" id="street" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="city">City:</label>
              <input type="text" name="city" id="city" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="state">State:</label>
              <input type="text" name="state" id="state" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="zipcode">ZipCode:</label>
              <input type="text" name="zipcode" id="zipcode" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="country">Country:</label>
              <input type="text" name="country" id="country" className="h-10 rounded-md p-4 border-b-2" />
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label className="text-lg font-bold" htmlFor="phone">Phone Number:</label>
              <input type="tel" name="phone" id="phone" className="h-10 rounded-md p-4 border-b-2" />
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13286.264708969924!2d72.98424626977534!3d33.64248880000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9675aaaaaaab%3A0xc5180922c44eb86b!2sNational%20University%20of%20Sciences%20%26%20Technology%20(NUST)!5e0!3m2!1sen!2s!4v1734370219502!5m2!1sen!2s"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
