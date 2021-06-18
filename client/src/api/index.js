import axios from "axios";
import Modal from "../components/modal/Modal";


const API = axios.create({
  baseURL: "https://codepad-ncs.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("accessToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return req;
});

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signUp = async (formData, history, openModal) => {
  try {
    await API.post(`/accounts/users/`, formData, config);
    history.push("/login");
  } catch (error) {
    await openModal(error.response.data);
  }
};

export const signIn = async (formData, history, openModal) => {
  try {
    const { data } = await API.post(
      `/accounts/jwt/create`,
      formData,
      config
    );
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    history.push("/");
    userInfo();
  } catch (error) {   
    await openModal(error.response.data);
  }
};

export const signOut = (history) => {
  localStorage.clear();
  history.push("/");
};

export const userInfo = async () => {
  try {
    const { data } = await API.get(`/accounts/users/me`, config);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.log("error Login: ", error.response.data);
    <Modal errorMessage="You are Logged out!!" />;
    localStorage.clear();
  }
};

export const editUserInfo = async (formData, history) => {
  try {
    const { data } = await API.patch(
      `/accounts/users/me/`,
      formData,
      config
    );
    localStorage.setItem("user", JSON.stringify(data));
    history.push("/");
  } catch (error) {
    console.log("error Edit: ", error.response.data);
    <Modal errorMessage={error.response.data} />;
  }
};

export const getAllEvents = async () => {
  try {
    const { data } = await API.get("/events/");

    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getEvent = async (slug) => {
  try {
    const { data } = await API.get(`/events/${slug}`, config);

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getProblem = async (slug) => {
  try {
    const { data } = await API.get(`/problems/${slug}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};