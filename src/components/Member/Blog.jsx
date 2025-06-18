import Teacher1 from "../../assets/image/teacher1.jpg";

import Teacher2 from "../../assets/image/teacher2.jpg";

const BlogSection = () => {
  const articles = [
    {
      id: 1,

      image: Teacher1,

      category: "Yoga",

      title: "3 Balancing Poses For Winter",

      description:
        "I neglect my balance far too often, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",

      author: {
        name: "Lawrence Stitt",

        avatar: Teacher1,
      },
    },

    {
      id: 2,

      image: Teacher2,

      category: "Yoga",

      title: "3 Balancing Poses For Winter",

      description:
        "I neglect my balance far too often, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",

      author: {
        name: "Lawrence Stitt",

        avatar: Teacher2,
      },
    },

    {
      id: 3,

      image: Teacher1,

      category: "Yoga",

      title: "3 Balancing Poses For Winter",

      description:
        "I neglect my balance far too often, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",

      author: {
        name: "Lawrence Stitt",

        avatar: Teacher1,
      },
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      {/* Latest Posts Section */}

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Latest Post & Articles
        </h2>

        {/* Articles Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Article Image */}

              <div className="relative flex items-center  justify-center overflow-hidden ">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-[278px] object-cover "
                />
              </div>

              {/* Article Content */}

              <div className="p-6">
                {/* Category Tag */}

                <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mb-3">
                  {article.category}
                </span>

                {/* Article Title */}

                <h3 className="text-xl font-semibold text-[#ff6f59] mb-3 hover:text-coral-500 cursor-pointer transition-colors">
                  {article.title}
                </h3>

                {/* Article Description */}

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.description}
                </p>

                {/* Author Info */}

                <div className="flex items-center">
                  <img
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />

                  <span className="text-gray-700 text-sm font-medium">
                    {article.author.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Button */}

        <div className="text-center">
          <button className="bg-[#FF6F59] hover:bg-indigo-700 text-gray-900 font-bold py-2 px-8 rounded shadow-lg transform transition hover:scale-105 duration-300 mb-8">
            Read More
          </button>
        </div>
      </div>

      {/* Newsletter Section */}

      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Subscribe To Our Newsletter
        </h2>

        <p className="text-gray-600 mb-8">
          Get Updates For New Classes And New Products
        </p>

        {/* Newsletter Form */}

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto border border-gray-300  rounded-4xl bg-white shadow-md">
          <input
            type="email"
            placeholder="Your Email Address"
            className="flex-1 px-6 py-3  border-gray-300 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-none"
          />

          <button className="bg-red-500 hover:bg-coral-600 text-white font-medium px-8 py-3 rounded-4xl transition-colors duration-300 whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
