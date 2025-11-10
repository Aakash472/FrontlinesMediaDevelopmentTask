import axios from "axios";

const fetchCompanies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(`${import.meta.env.VITE_URL}/findAll`)
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, message: response.data.message };
  }
};

export default fetchCompanies