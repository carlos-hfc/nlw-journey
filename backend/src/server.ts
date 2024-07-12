import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import { confirmParticipant } from "./route/confirm-participant"
import { confirmTrip } from "./route/confirm-trip"
import { createActivity } from "./route/create-activity"
import { createInvite } from "./route/create-invite"
import { createLink } from "./route/create-link"
import { createTrip } from "./route/create-trip"
import { getActivities } from "./route/get-activities"
import { getLinks } from "./route/get-links"
import { getParticipants } from "./route/get-participants"
import { getTripDetails } from "./route/get-trip-details"
import { updateTrip } from "./route/update-trip"

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)

app.listen({ port: 3333 }).then(() => console.log("HTTP server running"))
