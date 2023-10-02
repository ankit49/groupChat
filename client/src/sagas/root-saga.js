import { all } from "redux-saga/effects";
import authSagas from "./auth-saga";
import groupSagas from "./group-saga";

export default function* rootSaga() {
  yield all([authSagas(), groupSagas()]);
}
