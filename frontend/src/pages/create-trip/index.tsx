import { FormEvent, useState } from "react"
import { DateRange } from "react-day-picker"
import { useNavigate } from "react-router-dom"

import { api } from "../../lib/axios"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { InviteGuestsModal } from "./invite-guests-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [destination, setDestination] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get("email")?.toString().trim()

    if (!email || emailsToInvite.includes(email)) return

    setEmailsToInvite(prev => [...prev, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite(prev =>
      prev.filter(emailsInvited => emailsInvited !== emailToRemove),
    )
  }

  async function createTrip(event: FormEvent) {
    event.preventDefault()

    if (
      emailsToInvite.length === 0 ||
      !eventStartAndEndDates ||
      !eventStartAndEndDates.from ||
      !eventStartAndEndDates.to ||
      !destination.trim() ||
      !ownerEmail ||
      !ownerName
    )
      return

    const createTripResponse = await api.post("/trips", {
      destination,
      startsAt: eventStartAndEndDates?.from,
      endsAt: eventStartAndEndDates?.to,
      ownerName,
      ownerEmail,
      emailsToInvite,
    })

    navigate(`/trips/${createTripResponse.data.tripId}`)
  }

  return (
    <main className="flex h-dvh w-full items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="m-auto w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/logo.svg"
            alt="plann.er"
          />

          <p className="text-lg text-zinc-300">
            Convide seu amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er, você automaticamente concorda
          <br /> com nossos{" "}
          <a className="cursor-pointer text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="cursor-pointer text-zinc-300 underline">
            política de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />
      )}
    </main>
  )
}
