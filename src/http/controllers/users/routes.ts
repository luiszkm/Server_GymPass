import { FastifyInstance } from "fastify";
import { authenticateController } from "./authenticate.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { UserProfileController } from "./userProfile.controller";
import { registerController } from "./register.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)


  // «««««««« Authenticated »»»»»»»»» //
  app.get('/me', { onRequest: [verifyJWT] }, UserProfileController)
}