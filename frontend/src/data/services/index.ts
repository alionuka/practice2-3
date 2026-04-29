import { loginUserService, registerUserService } from "./auth";
import { getHomePageData } from "./home-page";

export const services = {
  auth: {
    registerUserService,
    loginUserService,
  },
  homePage: {
    getHomePageData,
  },
};