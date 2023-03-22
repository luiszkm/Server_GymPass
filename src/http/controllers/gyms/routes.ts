import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { createGymController } from "./createGym.controller";
import { gymsNearbyController } from "./gymsNearby.controller";
import { searchGymController } from "./searchGyms.controller";


export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', gymsNearbyController)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGymController)
  
}