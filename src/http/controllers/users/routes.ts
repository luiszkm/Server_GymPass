import { FastifyInstance } from "fastify";
import { authenticateController } from "./authenticate.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { UserProfileController } from "./userProfile.controller";
import { registerController } from "./register.controller";
import { refreshController } from "./refresh.controller copy";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)
  // «««««««« Authenticated »»»»»»»»» //
  app.get('/me', { onRequest: [verifyJWT] }, UserProfileController)
}