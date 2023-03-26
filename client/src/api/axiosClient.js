import axios from "axios";

const baseURL = "http://18.179.33.114:5000/api/v1";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: baseURL,
});

//APIを叩く前の前処理
axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`, //JWTトークンをヘッダーにセット
        },
    };
});


axiosClient.interceptors.response.use(response => {
    return response.data;
}, (error) => {
    throw error.response;
});

export default axiosClient;