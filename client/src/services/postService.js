import api from "./api";

export async function getPosts() {
  const response = await api.get("/posts");

  return response.data.data;
}

export async function createPost(content, image = null) {
  const formData = new FormData();

  formData.append("content", content);

  if (image) {
    formData.append("images", image);
  }

  const response = await api.post("/posts", formData);

  return response.data.data;
}

export async function togglePostLike(postId) {
  const response = await api.patch(`/posts/${postId}/like`);

  return response.data.data;
}
