import { AtSign, Plus, XIcon } from "lucide-react"
import { FormEvent } from "react"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"

interface InviteGuestsModalProps {
  closeGuestsModal(): void
  emailsToInvite: string[]
  addNewEmailToInvite(event: FormEvent<HTMLFormElement>): void
  removeEmailFromInvites(email: string): void
}

export function InviteGuestsModal({
  addNewEmailToInvite,
  closeGuestsModal,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <Modal
      title="Selecionar convidados"
      closeModal={closeGuestsModal}
      description="Os convidados irão receber e-mails para confirmar a participação na viagem."
    >
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email, index) => (
          <div
            key={`${email}-${index}`}
            className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
          >
            <span className="text-zinc-300">{email}</span>
            <button
              type="button"
              onClick={() => removeEmailFromInvites(email)}
            >
              <XIcon className="size-4 text-zinc-400" />
            </button>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-zinc-800" />

      <form
        onSubmit={addNewEmailToInvite}
        className="flex items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-950 pr-2.5"
      >
        <Input
          icon={<AtSign className="size-5 text-zinc-400" />}
          type="email"
          name="email"
          placeholder="Digite o e-mail do convidado"
        />

        <Button>
          Convidar
          <Plus className="size-5" />
        </Button>
      </form>
    </Modal>
  )
}
