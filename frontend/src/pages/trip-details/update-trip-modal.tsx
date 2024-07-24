import { format } from "date-fns"
import { Calendar, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface UpdateTripModalProps {
  closeUpdateTripModal(): void
}

export function UpdateTripModal({
  closeUpdateTripModal,
}: UpdateTripModalProps) {
  const { tripId } = useParams<"tripId">()

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [destination, setDestination] = useState("")
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => {
      setDestination(response.data.trip.destination)
      setEventStartAndEndDates({
        from: new Date(response.data.trip.startsAt) ?? undefined,
        to: new Date(response.data.trip.endsAt) ?? undefined,
      })
    })
  }, [tripId])

  async function updateTrip() {
    if (
      !eventStartAndEndDates ||
      !eventStartAndEndDates.from ||
      !eventStartAndEndDates.to ||
      !destination.trim()
    )
      return

    await api.put(`/trips/${tripId}`, {
      destination,
      startsAt: eventStartAndEndDates?.from,
      endsAt: eventStartAndEndDates?.to,
    })

    window.location.reload()
  }

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d 'de' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
      : null

  return (
    <Modal
      title="Atualizar viagem"
      closeModal={closeUpdateTripModal}
    >
      <div className="space-y-3">
        <Input
          icon={<MapPin />}
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Para onde você vai?"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />

        <button
          onClick={openDatePicker}
          className="flex h-14 w-full flex-1 items-center gap-2 rounded-lg border border-zinc-950 bg-zinc-950 px-4"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-400">
            {displayedDate ?? "Quando?"}
          </span>
        </button>

        <Button
          size="full"
          onClick={updateTrip}
        >
          Atualizar viagem
        </Button>

        {isDatePickerOpen && (
          <Modal
            title="Selecione a data"
            closeModal={closeDatePicker}
            full={false}
          >
            <DayPicker
              mode="range"
              defaultMonth={eventStartAndEndDates?.from ?? new Date()}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </Modal>
        )}
      </div>
    </Modal>
  )
}
