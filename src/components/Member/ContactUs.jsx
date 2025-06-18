import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white text-gray-800 mt-10">
      {/* Header */}
      <section className="bg-gray-900 text-white text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Got a question, suggestion, or want to schedule a visit? We’re here to
          help!
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="How can we help you?"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>Livoso Fitness Club</strong>
              <br />
              123 Fit Street, Sector 9
              <br />
              Bhubaneswar, Odisha – 751003
            </p>
            <p>
              <strong>Email:</strong> support@livosogym.com
              <br />
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Opening Hours:</strong>
              <br />
              Mon–Sat: 5:00 AM – 10:00 PM
              <br />
              Sunday: 6:00 AM – 1:00 PM
            </p>
          </div>

          {/* Optional Map */}
          <div className="mt-6 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Gym Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.1384052990117!2d85.81840361438653!3d20.29605808638451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909a6521f0a9b%3A0x1b30970c19dbdcbd!2sBhubaneswar!5e0!3m2!1sen!2sin!4v1629732781285!5m2!1sen!2sin"
              width="100%"
              height="250"
              allowFullScreen=""
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
