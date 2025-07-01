import API from "./api.js";

export const getAllPosts = async () => {
  const response = await API.get("/");
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await API.get(`/post/${postId}/comments`);
  console.log(response.data);
  return response.data;
};
