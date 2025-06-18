import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 mt-10">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Gym</h1>
        <p className="text-lg max-w-3xl mx-auto">
          We’re not just a gym — we’re a lifestyle transformation center. Our
          mission is to empower individuals to become the healthiest version of
          themselves.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At GymPro, our goal is to make fitness fun, accessible, and
              results-driven. We offer modern equipment, certified trainers, and
              tailored programs to support your journey — from beginners to
              athletes.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mission"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-bold text-lg mb-2">Dedication</h4>
              <p className="text-gray-600">
                We believe in pushing limits and showing up every day — no
                matter where you start.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Community</h4>
              <p className="text-gray-600">
                You're not alone — our gym is built on motivation, friendship,
                and shared wins.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Integrity</h4>
              <p className="text-gray-600">
                Honest coaching, real results. We lead with ethics in everything
                we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Meet Our Trainers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Aarav Singh",
              role: "Strength & Conditioning Coach",
              img: "https://randomuser.me/api/portraits/men/75.jpg",
            },
            {
              name: "Priya Mehta",
              role: "Certified Yoga Instructor",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Ravi Kapoor",
              role: "CrossFit Specialist",
              img: "https://randomuser.me/api/portraits/men/42.jpg",
            },
          ].map((trainer, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition"
            >
              <img
                src={trainer.img}
                alt={trainer.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="font-bold text-lg">{trainer.name}</h4>
              <p className="text-sm text-gray-500">{trainer.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-black text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-300">
              <li>24/7 access with smart gym entry</li>
              <li>Personalized fitness and diet plans</li>
              <li>State-of-the-art equipment</li>
              <li>Fun group classes including Zumba, HIIT, Yoga</li>
              <li>Affordable membership plans</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1571019613914-85f342c1d4dd?auto=format&fit=crop&w=800&q=80"
            alt="Why Choose Us"
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Us Today!</h2>
        <p className="text-gray-600 mb-6">
          Your transformation starts now. Book a free session or take a tour of
          our facility.
        </p>
        <Link
          to="/join"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
