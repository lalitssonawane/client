import axios from "axios";

const baseURL = "http://localhost:5000/";

const API = axios.create({
  baseURL,
});

API.interceptors.request.use(
  (config) => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      config.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchPost = (id) => API.get(`posts/${id}`);
export const fetchPosts = (page) => API.get(`posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("posts", newPost);
export const likePost = (id) => API.patch(`posts/${id}/likePost`);
export const comment = (value, id) =>
  API.patch(`${"posts"}/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`${"posts"}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`posts/${id}`);

export const signIn = (formData) => API.post("user/signin", formData);
export const signup = (formData) => API.post("user/signup", formData);

export const getPost = (id) => API.get(`posts/${id}`);
