import axios from "axios";

// Get user location and currency
export const getUserCurrency = async () => {
  try {
    const { data } = await axios.get("https://ipapi.co/json/", {
      headers: {
        Accept: "application/json",
      },
    });
    return data.currency || "INR";
  } catch (err) {
    console.error("Location error:", err);
    return "INR"; // Default fallback
  }
};

// Get exchange rate from INR to another currency
export const getExchangeRate = async (toCurrency) => {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/INR`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response.data.rates[toCurrency] || 1;
  } catch (err) {
    console.error("Exchange rate error:", err);
    return 1; // Default fallback
  }
};
