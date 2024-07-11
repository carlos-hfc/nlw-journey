import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import { confirmTrip } from "./route/confirm-trip"
import { createTrip } from "./route/create-trip"

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTrip)
app.register(confirmTrip)

app.listen({ port: 3333 }).then(() => console.log("HTTP server running"))
