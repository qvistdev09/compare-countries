import axios from "axios";

const client = axios.create({
  baseURL: "https://restcountries.com/v3.1/alpha/",
  timeout: 1000,
});

const apiClient = {
  fetchCountry: (code) => {
    return client.get(code).then((responseArray) => responseArray[0]);
  },
};

export default apiClient;
