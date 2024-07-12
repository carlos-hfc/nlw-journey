import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import { confirmParticipant } from "./route/confirm-participant"
import { confirmTrip } from "./route/confirm-trip"
import { createActivity } from "./route/create-activity"
import { createTrip } from "./route/create-trip"
import { getActivity } from "./route/get-activities"

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
app.register(getActivity)

app.listen({ port: 3333 }).then(() => console.log("HTTP server running"))
