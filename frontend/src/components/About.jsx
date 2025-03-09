const About = () => {
  return (
    <section className=" py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <div className="relative">
          <img
            src="/images/res.jpg"
            alt="Food Delivery"
            className="rounded-2xl shadow-lg"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm">
            Fast & Fresh 🚀
          </div>
        </div>

        {/* Right Side - Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About <span className="text-primary">BiteRush</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At <strong>BiteRush</strong>, we believe in bringing delicious meals
            straight to your doorstep. Our mission is to connect food lovers
            with their favorite restaurants, delivering fresh, hot, and
            flavorful dishes within minutes.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're craving a juicy burger, healthy salad, or a spicy
            bowl of noodles, we've got you covered. 🍔🥗🍜
          </p>

          {/* Stats Section */}
          <div className="flex gap-6 mt-6">
            <div>
              <h3 className="text-2xl font-bold text-primary">500+</h3>
              <p className="text-gray-600 text-sm">Meals</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">10K+</h3>
              <p className="text-gray-600 text-sm">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">30min</h3>
              <p className="text-gray-600 text-sm">Avg Delivery Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
