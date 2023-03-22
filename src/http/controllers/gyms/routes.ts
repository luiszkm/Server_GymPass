import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createGymController } from "./createGym";
import { gymsNearbyController } from "./gymsNearby";
import { searchGymController } from "./searchGyms";


export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  
  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', gymsNearbyController)
  app.post( '/gyms', createGymController)
}