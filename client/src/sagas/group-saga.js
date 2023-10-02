import { takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import toast from "react-hot-toast";
import groupAction from "../actions/group-action";
import { getCurrentUserSaga } from "./auth-saga";

const api_url = "http://localhost:5000/api";

function* createGroupSaga(req) {
  try {
    yield axios.post(`${api_url}/group/create`, req.data);
    yield call(getCurrentUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* groupUpdateSaga(req) {
  try {
    yield axios.post(`${api_url}/group/update`, req.data);
    yield call(getCurrentUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* groupDeleteSaga(req) {
  try {
    yield axios.post(`${api_url}/group/delete`, { id: req.id });
    yield call(getCurrentUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* addGroupMessageSaga(req) {
  try {
    yield axios.post(`${api_url}/group/addMessage`, {
      messageData: req.messageData,
    });
    yield call(getCurrentUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* addLikeSaga(req) {
  try {
    yield axios.post(`${api_url}/group/addLike`, req.data);
    yield call(getCurrentUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* removeLikeSaga(req) {
  try {
    yield axios.post(`${api_url}/group/removeLike`, req.data);
    yield call(getCurrentUserSaga);
  } catch (error) {
    toast.error(error.response.data);
  }
}

export default function* groupSagas() {
  yield takeLatest(groupAction.CREATE_GROUP, createGroupSaga);
  yield takeLatest(groupAction.GROUP_UPDATE, groupUpdateSaga);
  yield takeLatest(groupAction.GROUP_DELETE, groupDeleteSaga);
  yield takeLatest(groupAction.ADD_GROUP_MESSAGE, addGroupMessageSaga);
  yield takeLatest(groupAction.ADD_LIKE, addLikeSaga);
  yield takeLatest(groupAction.REMOVE_LIKE, removeLikeSaga);
}
