import { format } from "date-fns"
import { Calendar, MapPin, Settings2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { api } from "../../lib/axios"
import { UpdateTripModal } from "./update-trip-modal"

interface Trip {
  id: string
  destination: string
  startsAt: string
  endsAt: string
  isConfirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams<"tripId">()

  const [trip, setTrip] = useState<Trip>()
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false)

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true)
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false)
  }

  const displayedDate =
    trip && trip.startsAt && trip.endsAt
      ? format(trip.startsAt, "d 'de' LLL")
          .concat(" até ")
          .concat(format(trip.endsAt, "d 'de' LLL"))
      : null

  return (
    <header className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button
          variant="secondary"
          onClick={openUpdateTripModal}
        >
          Alterar local/data
          <Settings2 />
        </Button>
      </div>

      {isUpdateTripModalOpen && (
        <UpdateTripModal closeUpdateTripModal={closeUpdateTripModal} />
      )}
    </header>
  )
}
