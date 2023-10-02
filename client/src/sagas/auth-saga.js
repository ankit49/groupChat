import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import toast from "react-hot-toast";
import history from "../helpers/history";
import authAction from "../actions/auth-action";

const api_url = "http://localhost:5000/api";

function* loginSaga(req) {
  try {
    let { data } = yield axios.post(`${api_url}/auth/login`, {
      email: req.userCredentials.email,
      password: req.userCredentials.password,
    });
    if (data.token) {
      yield localStorage.setItem("token", data.token);
      yield history.push("/app");
    }
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* getCurrentUserSaga() {
  try {
    let savedToken = yield localStorage.getItem("token");
    let { data } = yield axios.get(`${api_url}/auth/getCurrentUser`, {
      headers: { Authorization: `Bearer ${savedToken}` },
    });
    yield put({ type: authAction.LOGIN_SUCCESS, data });
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* logoutSaga() {
  yield localStorage.removeItem("token");
  yield history.push("/");
  toast.success("Successfully Logged out");
}

function* listAllUserSaga() {
  try {
    let { data } = yield axios.get(`${api_url}/auth/listUsers`);
    yield put({ type: authAction.LIST_ALL_USER_SUCCESS, data });
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* addUserSaga(req) {
  try {
    let savedToken = yield localStorage.getItem("token");
    yield axios.post(`${api_url}/auth/addUser`, req.userCredentials, {
      headers: { Authorization: `Bearer ${savedToken}` },
    });
    yield call(listAllUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* deleteUserSaga(req) {
  try {
    let savedToken = yield localStorage.getItem("token");
    yield axios.post(
      `${api_url}/auth/deleteUser`,
      { email: req.email },
      {
        headers: { Authorization: `Bearer ${savedToken}` },
      }
    );
    yield call(listAllUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* editUserSaga(req) {
  try {
    let savedToken = yield localStorage.getItem("token");
    yield axios.post(`${api_url}/auth/updateUser`, req.data, {
      headers: { Authorization: `Bearer ${savedToken}` },
    });
    yield call(listAllUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

export default function* authSagas() {
  yield takeLatest(authAction.LOGIN, loginSaga);
  yield takeLatest(authAction.ADD_USER, addUserSaga);
  yield takeLatest(authAction.EDIT_USER, editUserSaga);
  yield takeLatest(authAction.DELETE_USER, deleteUserSaga);
  yield takeLatest(authAction.LOGOUT, logoutSaga);
  yield takeLatest(authAction.GET_CURRENT_USER, getCurrentUserSaga);
  yield takeLatest(authAction.LIST_ALL_USERS, listAllUserSaga);
}
