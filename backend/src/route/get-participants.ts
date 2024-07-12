import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"

import { prisma } from "../lib/prisma"

export async function getParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/participants",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async request => {
      const { tripId } = request.params

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: {
            select: {
              id: true,
              name: true,
              email: true,
              isConfirmed: true,
            },
          },
        },
      })

      if (!trip) {
        throw new Error("Trip not found.")
      }

      return { participants: trip.participants }
    },
  )
}