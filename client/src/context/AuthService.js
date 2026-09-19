import api from "../services/api";

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  const { _id, ...userData } = user;

  return {
    ...userData,
    id: user.id || _id,
  };
}

export async function registerUser(formData) {
  const response = await api.post("/auth/register", {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  });

  return {
    token: response.data.data.token,
    user: normalizeUser(response.data.data.user),
  };
}

export async function loginUser(formData) {
  const response = await api.post("/auth/login", {
    email: formData.email,
    password: formData.password,
  });

  return {
    token: response.data.data.token,
    user: normalizeUser(response.data.data.user),
  };
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");

  return normalizeUser(response.data.data);
}

export async function logoutUser() {
  const response = await api.post("/auth/logout");

  return response.data.message;
}
