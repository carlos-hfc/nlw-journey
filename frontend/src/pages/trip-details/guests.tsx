import { CircleCheck, CircleDashed, UserCog } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { api } from "../../lib/axios"
import { CreateInviteModal } from "./create-invite-modal"

interface Participant {
  id: string
  name?: string | null
  email: string
  isConfirmed: boolean
}

export function Guests() {
  const { tripId } = useParams<"tripId">()

  const [isInviteGuestModalOpen, setIsInviteGuestModalOpen] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then(response => setParticipants(response.data.participants))
  }, [tripId])

  function openInviteGuestModal() {
    setIsInviteGuestModalOpen(true)
  }

  function closeInviteGuestModal() {
    setIsInviteGuestModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index + 1}`}
              </span>
              <span className="block truncate text-sm text-zinc-400">
                {participant.email}
              </span>
            </div>
            {participant.isConfirmed ? (
              <CircleCheck className="size-5 shrink-0 text-lime-300" />
            ) : (
              <CircleDashed className="size-5 shrink-0 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button
        size="full"
        variant="secondary"
        onClick={openInviteGuestModal}
      >
        <UserCog />
        Gerenciar convidados
      </Button>

      {isInviteGuestModalOpen && (
        <CreateInviteModal closeCreateInviteModal={closeInviteGuestModal} />
      )}
    </div>
  )
}
