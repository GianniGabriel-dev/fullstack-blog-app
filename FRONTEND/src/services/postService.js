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

export const deletePostById = async (postId, token)=>{
  const response = await API.delete(`/${postId}/delete-post`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const editPostById = async (postId, token)=>{
  const response = await API.put(`/${postId}/update-post`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
