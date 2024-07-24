import { AtSign, User, XIcon } from "lucide-react"
import { FormEvent } from "react"

interface ConfirmTripModalProps {
  closeConfirmTripModal(): void
  createTrip(event: FormEvent): void | Promise<void>
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
}: ConfirmTripModalProps) {
  return (
    <div
      role="dialog"
      className="fixed inset-0 flex items-center justify-center bg-black/60"
    >
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>

            <button onClick={closeConfirmTripModal}>
              <XIcon />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>
            , nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              16 a 27 de agosto de 2024
            </span>
            , preencha seus dados abaixo:
          </p>
        </header>

        <form
          onSubmit={createTrip}
          className="space-y-3"
        >
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-950 px-4">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 font-medium text-lime-950 hover:bg-lime-400">
            Confirmar criação da viagem
          </button>
        </form>
      </div>
    </div>
  )
}
