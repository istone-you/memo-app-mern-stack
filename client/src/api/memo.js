import axiosClient from "./axiosClient";

const memoApi = {
    create: () => axiosClient.post("memo"),
    getAll: () => axiosClient.get("memo"),
    getOne: (memoId) => axiosClient.get(`memo/${memoId}`),
};

export default memoApi;