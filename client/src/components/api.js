import axios from "axios";

const URL = "http://localhost:3000";

export const deleteClientProfile = async (id) => {
  try {
    return await axios.delete(`${URL}/client/${id}`);
  } catch (error) {
    console.log("Error while calling deleteUser API", error);
  }
};

export const deleteWorkerProfile = async (id) => {
  try {
    return await axios.delete(`${URL}/worker/${id}`);
  } catch (error) {
    console.log("Error while calling deleteUser API", error);
  }
};