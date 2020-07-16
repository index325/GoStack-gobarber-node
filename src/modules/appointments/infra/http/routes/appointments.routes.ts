import { Router } from "express";
import AppointmentController from "../controllers/AppointmentsController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (req, res) => {
// const appointmentsRepository = new AppointmentsRepository();
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;
