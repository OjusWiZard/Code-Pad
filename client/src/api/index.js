import axios from "axios";
import Modal from "../components/modal";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
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

export const signUp = async (formData, history, formMessage, openModal) => {
  try {
    await API.post(`/accounts/users/`, formData, config);
    openModal("You are signed in", "Okay");
    <Modal />;
    history.push("/login");
  } catch (error) {
    await formMessage(error?.response?.data);
  }
};

export const signIn = async (formData, history, formMessage, openModal) => {
  try {
    const { data } = await API.post(`/accounts/jwt/create`, formData, config);
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    await userInfo(history);
    openModal("You are logged in", "Okay");
    <Modal />;
    history.push("/");

  } catch (error) {
    await formMessage(error?.response?.data);
    // await openModal("Enter the valid credentials", null);
    // <Modal />;
  }
};

export const signOut = (history, openModal) => {
  openModal("See you soon!", "Okay");
  <Modal />
  localStorage.clear();
  history.push("/");
};

export const userInfo = async (history) => {
  try {
    const { data } = await API.get(`/accounts/users/me`, config);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {

  }
};

export const editUserInfo = async (formData, history, openModal, formMessage) => {
  try {
    const { data } = await API.patch(`/accounts/users/me/`, formData, config);

    localStorage.setItem("user", JSON.stringify(data));
    openModal("Information updated", "Okay");
    <Modal />;
    history.push("/");
  } catch (error) {
    await formMessage(error?.response?.data);
  }
};

export const getAllEvents = async (history) => {
  try {
    const { data } = await API.get("/events/");
    return data;
  } catch (error) {

  }
};

export const getEvent = async (slug, history) => {
  try {
    const { data } = await API.get(`/events/${slug}`, config);
    return data;
  } catch (error) {

  }
};

export const getProblem = async (slug, history) => {
  try {
    const { data } = await API.get(`/problems/${slug}`);
    return data;
  } catch (error) {

  }
};

export const codeSubmission = async (formData, openModal, setDisabled) => {
  try {
    let res = await API.post(`/submissions/`, formData, config);
    let id;
    openModal("Processing - Wait for the verdict", "okay");
    <Modal />;
    id = res.data.id;
    if (!id) {
      openModal("Too many submissions");
      <Modal />
      setDisabled(false);
      return;
    } else {
      const interval = setInterval(() => {
        API.get(`/viewsubmission/${id}`).then(res => {
          if (res.data.status !== "In Queue" && res.data.status !== "Processing") {

            openModal(`${res.data.status} - ${res.data.testcases_passed} passed`, "okay");

            <Modal />;
            clearInterval(interval);
            setDisabled(false);
            return res.data;
          }
        })
      }, 2000)
    }
  } catch (error) {
    setDisabled(false);
    openModal("Please Login to Continue");
    <Modal />
  }
};

export const getLeaderboard = async (slug) => {
  try {
    const { data } = await API.get(`/leaderboard/${slug}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLeaderboardPagination = async (text) => {
  try {
    const { data } = await API.get(`/leaderboard/${text.split("/")[4]}${text.split("/")[5]}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubmissionsPagination = async (text) => {
  try {

    const { data } = await API.get(`/submissions/${text.split("/")[4]}${text.split("/")[5]}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLeaderboardUser = async (slug, username) => {
  try {
    const { data } = await API.get(`/leaderboard/${slug}?username=${username}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (formData, history, openModal) => {
  try {
    await API.post(
      `/accounts/users/reset_password/`,
      formData,
      config
    );
    openModal("Check your email", "Okay");
    <Modal />;
    history.push("/");
  } catch (error) { }
};

export const resetPassword = async (formData, uid, token, history) => {
  try {
    await API.post(
      `/accounts/users/reset_password_confirm/`,
      { ...formData, uid, token },
      config
    );
    history.push("/");
  } catch (error) { }
};

export const getSubmissions = async (slug) => {
  try {
    const { data } = await API.get(`/submissions/${slug}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};
