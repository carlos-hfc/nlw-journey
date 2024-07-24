import { AtSign, Plus, XIcon } from "lucide-react"
import { FormEvent } from "react"

import { Button } from "../../components/button"

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
    <div
      role="dialog"
      className="fixed inset-0 flex items-center justify-center bg-black/60"
    >
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>

            <button onClick={closeGuestsModal}>
              <XIcon />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </header>

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
          className="flex items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-950 p-2.5"
        >
          <div className="flex flex-1 items-center gap-2 px-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <Button>
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
