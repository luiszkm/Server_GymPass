import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createCheckInsController } from "./createCheckIns.controller";
import { historyCheckInsController } from "./historyCheckins.controller";
import { metricsCheckInsController } from "./metricsCheckIns.controller";
import { validateCheckInsController } from "./validateCheckIn.controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', historyCheckInsController)
  app.get('/check-ins/metrics', metricsCheckInsController)

  app.post('/gyms/:gymId/check-ins', createCheckInsController)
  app.patch('/check-ins/:checkInId.validate', validateCheckInsController)
}