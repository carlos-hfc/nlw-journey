import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "../errors/client-error"
import { prisma } from "../lib/prisma"

export async function createLink(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/links",
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          url: z.string().url(),
        }),
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async request => {
      const { tripId } = request.params
      const { url, title } = request.body

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      })

      if (!trip) {
        throw new ClientError("Trip not found.")
      }

      const link = await prisma.link.create({
        data: {
          title,
          url,
          tripId,
        },
      })

      return { linkId: link.id }
    },
  )
}
