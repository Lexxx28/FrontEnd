import api from "../api";

export async function registerUser(data) {
  try {
    const response = api.post("users/register/", data);
    return response.data;
  } catch (err) {
    if (err.status == 400) {
      throw new Error("Username Already Exist");
    }
    throw new Error(err.message);
  }
}
