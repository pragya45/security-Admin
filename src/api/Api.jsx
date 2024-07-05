import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginApi = (data) => Api.post("/api/users/login", data);
export const registerApi = (data) => Api.post("/api/users/register", data);

// Admin APIs for Articles
export const createArticleApi = (data) => Api.post("/api/articles", data);
export const getArticlesApi = () => Api.get("/api/articles");
export const getArticleByIdApi = (id) => Api.get(`/api/articles/${id}`);
export const deleteArticleApi = (id) => Api.delete(`/api/articles/${id}`);
export const updateArticleApi = (id, data) =>
  Api.put(`/api/articles/${id}`, data);

// Admin APIs for Quizzes
export const createQuizApi = (data) => Api.post("/api/quizzes", data);
export const getQuizzesApi = () => Api.get("/api/quizzes");
export const getQuizByIdApi = (id) => Api.get(`/api/quizzes/${id}`);
export const addQuestionApi = (quizId, data) =>
  Api.post(`/api/quizzes/${quizId}/questions`, data);
export const updateQuizApi = (id, data) => Api.put(`/api/quizzes/${id}`, data);
export const updateQuestionApi = (quizId, questionId, data) =>
  Api.put(`/api/quizzes/${quizId}/questions/${questionId}`, data);
export const deleteQuizApi = (id) => Api.delete(`/api/quizzes/${id}`);
// Admin APIs for Reports
export const getReportsApi = () => Api.get("/api/reports");
export const deleteReportApi = (id) => Api.delete(`/api/reports/${id}`);
export const createReportApi = (data) => Api.post("/api/reports", data);

// Admin APIs for Users
export const getUsersApi = () => Api.get("/api/users");
export const getUsersCountApi = () => Api.get("/api/users/count");
export const getAuditLogsApi = () => Api.get("/api/admin/audit-logs");
