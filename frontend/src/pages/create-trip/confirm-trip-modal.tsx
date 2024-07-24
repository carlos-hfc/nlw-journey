import { AtSign, User } from "lucide-react"
import { FormEvent } from "react"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"

interface ConfirmTripModalProps {
  closeConfirmTripModal(): void
  createTrip(event: FormEvent): void | Promise<void>
  setOwnerName(name: string): void
  setOwnerEmail(email: string): void
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
}: ConfirmTripModalProps) {
  return (
    <Modal
      title="Confirmar criação de viagem"
      closeModal={closeConfirmTripModal}
      description={
        <>
          Para concluir a criação da viagem para{" "}
          <span className="font-semibold text-zinc-100">
            Florianópolis, Brasil
          </span>
          , nas datas de{" "}
          <span className="font-semibold text-zinc-100">
            16 a 27 de agosto de 2024
          </span>
          , preencha seus dados abaixo:
        </>
      }
    >
      <form
        onSubmit={createTrip}
        className="space-y-3"
      >
        <Input
          icon={<User />}
          name="name"
          onChange={e => setOwnerName(e.target.value)}
          placeholder="Seu nome completo"
        />

        <Input
          icon={<AtSign />}
          type="email"
          name="email"
          onChange={e => setOwnerEmail(e.target.value)}
          placeholder="Seu e-mail pessoal"
        />

        <Button size="full">Confirmar criação da viagem</Button>
      </form>
    </Modal>
  )
}
