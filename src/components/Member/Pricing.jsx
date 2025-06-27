import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCurrency, getExchangeRate } from "../currencyUtils";

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const navigate = useNavigate();

  const basePlans = [
    {
      name: "Standard",
      price: 499,
      period: "per month",
      description: "This pack contains all the basic things...",
      features: [
        "Try free for 7 days",
        "Unlimited articles and podcasts",
        "Unlimited access to yoga classes",
        "Discount on select trainings",
      ],
      popular: false,
    },
    {
      name: "Projected",
      price: 1499,
      period: "per month",
      description: "This pack contains all the basic things...",
      features: [
        "Try free for 7 days",
        "Unlimited articles and podcasts",
        "Unlimited access to yoga classes",
        "Discount on select trainings",
      ],
      popular: false,
    },
    {
      name: "Private",
      price: 4499,
      period: "per month",
      description: "This pack contains all the basic things...",
      features: [
        "Try free for 7 days",
        "Unlimited articles and podcasts",
        "Unlimited access to yoga classes",
        "Discount on select trainings",
      ],
      popular: false,
    },
  ];

  useEffect(() => {
    const fetchCurrency = async () => {
      const userCurrency = await getUserCurrency();
      const rate = await getExchangeRate(userCurrency);
      setCurrency(userCurrency);
      setExchangeRate(rate);
    };
    fetchCurrency();
  }, []);

  const formatPrice = (inrPrice) => {
    const converted = inrPrice * exchangeRate;
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(converted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
          Pricing Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {basePlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300
                bg-white text-gray-900 border border-gray-200
                ${selectedPlan === index ? "ring-4 ring-indigo-300" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 w-full bg-[#FF6F29] py-2 text-center">
                  <span className="text-white font-semibold text-sm">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-extrabold">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="ml-2 mb-1">/{plan.period}</span>
                </div>
                <p className="mb-6">{plan.description}</p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="h-6 w-6 mr-2 flex-shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/join")}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300
                    border-2 ${
                      selectedPlan === index
                        ? "bg-[#FF6F29] text-white"
                        : "bg-white text-gray-900"
                    } hover:shadow-md`}
                >
                  {selectedPlan === index ? "Selected ✓" : "Select Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-16 text-center text-gray-600 max-w-2xl mx-auto">
          All plans come with a 7‑day free trial. Cancel anytime during your
          trial and you won’t be charged.
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
