import { Link2, Tag } from "lucide-react"
import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface CreateLinkModalProps {
  closeCreateLinkModal(): void
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams<"tripId">()

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get("title")?.toString()
    const url = data.get("url")?.toString()

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    })

    window.location.reload()
  }

  return (
    <Modal
      title="Cadastrar link"
      description="Todos os convidados podem visualizar os links importantes."
      closeModal={closeCreateLinkModal}
    >
      <form
        onSubmit={createLink}
        className="space-y-3"
      >
        <Input
          icon={<Tag />}
          name="title"
          placeholder="Título do link"
        />

        <Input
          icon={<Link2 />}
          type="url"
          name="url"
          placeholder="URL"
        />

        <Button size="full">Salvar link</Button>
      </form>
    </Modal>
  )
}
