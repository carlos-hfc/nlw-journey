import { AtSign } from "lucide-react"
import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface CreateInviteModalProps {
  closeCreateInviteModal(): void
}

export function CreateInviteModal({
  closeCreateInviteModal,
}: CreateInviteModalProps) {
  const { tripId } = useParams<"tripId">()

  async function createInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get("email")?.toString()

    await api.post(`/trips/${tripId}/invites`, {
      email,
    })

    window.location.reload()
  }

  return (
    <Modal
      title="Cadastrar participante"
      description="Todos os convidados podem visualizar as atividades."
      closeModal={closeCreateInviteModal}
    >
      <form
        onSubmit={createInvite}
        className="space-y-3"
      >
        <Input
          icon={<AtSign />}
          type="email"
          name="email"
          placeholder="Digite o e-mail do participante"
        />

        <Button size="full">Convidar participante</Button>
      </form>
    </Modal>
  )
}
