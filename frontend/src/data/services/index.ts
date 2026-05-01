import { loginUserService, registerUserService } from "./auth";
import { getHomePageData } from "./home-page";
import { uploadFileService } from "./upload";
import { getUserMe } from "./user";
import { generateTranscript, saveSummaryService } from "./summary";

export const services = {
  auth: {
    registerUserService,
    loginUserService,
  },
  homePage: {
    getHomePageData,
  },
  upload: {
    uploadFileService,
  },
  user: {
    getUserMe,
  },
  summarize: {
  generateTranscript,
  saveSummaryService,
},
};