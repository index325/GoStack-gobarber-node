import { Router } from "express";
import ProvidersController from "../controllers/ProvidersController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const providersRouter = Router();

const appointmentsController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get("/", appointmentsController.index);
providersRouter.get(
  "/:id/month-availability",
  providerDayAvailabilityController.index
);
providersRouter.get(
  "/:id/day-availability",
  providerMonthAvailabilityController.index
);

export default providersRouter;
