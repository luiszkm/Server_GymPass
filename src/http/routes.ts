import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register.controller";
import { authenticateController } from "./controllers/authenticate.controller";
import { UserProfileController } from "./controllers/userProfile.controller";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)


  // «««««««« Authenticated »»»»»»»»» //
  app.get('/me', { onRequest: [verifyJWT] }, UserProfileController)
}