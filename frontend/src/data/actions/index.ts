import { uploadFileAction } from "./upload";
import { loginUserAction, logoutAction, registerUserAction } from "./auth";
export const actions = {

  auth: {
  registerUserAction,
  loginUserAction,
  logoutAction,
},
  upload: {
    uploadFileAction,
  },
};
