import api from "./api";

export async function getProfile(userId) {
  const response = await api.get(`/users/${userId}`);

  return response.data.data;
}

export async function updateProfile(profileData) {
  const response = await api.patch("/users/update-profile", profileData);

  return response.data.data;
}

export async function updateProfilePicture(imageFile) {
  const formData = new FormData();
  formData.append("profilePicture", imageFile);

  const response = await api.patch("/users/profile-picture", formData);

  return response.data.data;
}
