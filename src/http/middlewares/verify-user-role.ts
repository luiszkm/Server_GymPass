import { FastifyReply, FastifyRequest } from "fastify";

export  function verifyUserRole(roletoVerify: 'ADMIN'| 'MEMBER') {
  return  async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roletoVerify) {
      return reply.status(401).send({
        message: 'unauthorized'
      })
    }
  }
}