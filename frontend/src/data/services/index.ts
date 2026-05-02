import { loginUserService, registerUserService } from "./auth";
import { getHomePageData } from "./home-page";
import { deleteFileService, uploadFileService } from "./upload";
import { getUserMe, updateUserProfileService } from "./user";
import {
  generateTranscript,
  saveSummaryService,
  getSummariesService,
  deleteSummaryService,
  getSummaryByDocumentIdService,
  updateSummaryService,
} from "./summary";

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
    deleteFileService,
  },
  user: {
    getUserMe,
    updateUserProfileService,
  },
  summarize: {
  generateTranscript,
  saveSummaryService,
  getSummariesService,
  deleteSummaryService,
  getSummaryByDocumentIdService,
  updateSummaryService,
  },
};