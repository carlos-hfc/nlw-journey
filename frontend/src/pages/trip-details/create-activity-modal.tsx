import { Calendar, Tag } from "lucide-react"
import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface CreateActivityModalProps {
  closeCreateActivityModal(): void
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams<"tripId">()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get("title")?.toString()
    const occursAt = data.get("occursAt")?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occursAt,
    })

    window.location.reload()
  }

  return (
    <Modal
      title="Cadastrar atividade"
      description="Todos os convidados podem visualizar as atividades."
      closeModal={closeCreateActivityModal}
    >
      <form
        onSubmit={createActivity}
        className="space-y-3"
      >
        <Input
          icon={<Tag />}
          name="title"
          placeholder="Qual a atividade?"
        />

        <Input
          icon={<Calendar />}
          type="datetime-local"
          name="occursAt"
          placeholder="Data e horário da atividade"
        />

        <Button size="full">Salvar atividade</Button>
      </form>
    </Modal>
  )
}
