export default function StatsCard() {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex ">
          {/* Stat 1 */}

          <div className="text-center lg:text-left lg:pr-8">
            <div className="mb-2">
              <span className="text-5xl lg:text-6xl font-bold text-black">
                96%
              </span>

              <span className="text-2xl lg:text-3xl font-medium text-pink-500 ml-2">
                Client Satisfaction
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Our Members Love Their Results And Experience
            </p>
          </div>

          {/* Divider 1 */}

          <div className="hidden lg:block w-px bg-pink-500 mx-8"></div>

          {/* Stat 2 */}

          <div className="text-center lg:text-left lg:pr-8">
            <div className="mb-2">
              <span className="text-5xl lg:text-6xl font-bold text-black">
                +5
              </span>

              <span className="text-2xl lg:text-3xl font-medium text-pink-500 ml-2">
                Years Of Experience
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Trust In Our Proven Track Record Of Transforming
            </p>
          </div>

          {/* Divider 2 */}

          <div className="hidden lg:block w-px bg-pink-500 mx-8"></div>

          {/* Stat 3 */}

          <div className="text-center lg:text-left lg:pr-8">
            <div className="mb-2">
              <span className="text-5xl lg:text-6xl font-bold text-black">
                +800
              </span>

              <span className="text-2xl lg:text-3xl font-medium text-pink-500 ml-2">
                Active Members
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Join Our Thriving Fitness Community
            </p>
          </div>

          {/* Divider 3 */}

          <div className="hidden lg:block w-px bg-pink-500 mx-8"></div>

          {/* Stat 4 */}

          <div className="text-center lg:text-left">
            <div className="mb-2">
              <span className="text-5xl lg:text-6xl font-bold text-black">
                24/7
              </span>

              <span className="text-2xl lg:text-3xl font-medium text-pink-500 ml-2">
                Support Available
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Expert Assistance Whenever You Need It
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
