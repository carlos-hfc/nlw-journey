import { XIcon } from "lucide-react"
import { PropsWithChildren, ReactNode } from "react"

interface ModalProps extends PropsWithChildren {
  closeModal(): void
  title: string
  description?: ReactNode
  full?: boolean
}

export function Modal({
  closeModal,
  description,
  title,
  children,
  full = true,
}: ModalProps) {
  return (
    <div
      role="dialog"
      className="fixed inset-0 flex items-center justify-center bg-black/60"
    >
      <div
        className={`space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape ${full ? "w-[640px]" : ""}`}
      >
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>

            <button onClick={closeModal}>
              <XIcon />
            </button>
          </div>

          {description && (
            <p className="text-sm text-zinc-400">{description}</p>
          )}
        </header>

        {children}
      </div>
    </div>
  )
}
