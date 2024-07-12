import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import nodemailer from "nodemailer"
import z from "zod"

import { dayjs } from "../lib/dayjs"
import { getMailClient } from "../lib/mail"
import { prisma } from "../lib/prisma"

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
        }),
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async request => {
      const { tripId } = request.params
      const { email } = request.body

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      })

      if (!trip) {
        throw new Error("Trip not found.")
      }

      const participant = await prisma.participant.create({
        data: {
          email,
          tripId,
        },
      })

      const formattedStartDate = dayjs(trip.startsAt).format("LL")
      const formattedEndDate = dayjs(trip.endsAt).format("LL")

      const mail = await getMailClient()

      const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`

      const message = await mail.sendMail({
        from: {
          name: "Equipe plann.er",
          address: "contact@plann.er",
        },
        to: participant.email,
        subject: `Confirme sua presença viagem para ${trip.destination} em ${formattedStartDate}`,
        html: `
          <div style="font-family: sans-serif;font-size: 1rem;line-height: 1.6;">
            <p>
              Você foi convidado para participar de uma viagam para <strong>${trip.destination}</strong> nas datas de
              <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.
            </p>
            <p></p>
            <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
            <p></p>
            <p>
              <a href="${confirmationLink}">Confirmar viagem</a>
            </p>
            <p></p>
            <p>Caso você não saiba do que se trata esse e-mail, apenas ignore-o.</p>
          </div>
        `.trim(),
      })

      console.log(nodemailer.getTestMessageUrl(message))

      return { participantId: participant.id }
    },
  )
}