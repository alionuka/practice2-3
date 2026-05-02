import {
  getAuthTokenAction,
  loginUserAction,
  logoutAction,
  registerUserAction,
} from "./auth";

import { uploadFileAction } from "./upload";
import { deleteSummaryAction, updateSummaryAction } from "./summary";
export const actions = {
  auth: {
    registerUserAction,
    loginUserAction,
    logoutAction,
    getAuthTokenAction,
  },
  upload: {
    uploadFileAction,
  },
  summary: {
    deleteSummaryAction,
    updateSummaryAction,
  },
};