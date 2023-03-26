import axiosClient from "./axiosClient";

const memoApi = {
    create: () => axiosClient.post("memo"),
    getAll: () => axiosClient.get("memo"),
    getOne: (memoId) => axiosClient.get(`memo/${memoId}`),
    update: (memoId, params) => axiosClient.put(`memo/${memoId}`, params),
};

export default memoApi;