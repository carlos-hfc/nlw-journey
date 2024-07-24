import "react-day-picker/style.css"

import { format } from "date-fns"
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"

import { Button } from "../../../components/button"
import { Modal } from "../../../components/modal"

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput(): void
  openGuestsInput(): void
  setDestination(destination: string): void
  eventStartAndEndDates?: DateRange
  setEventStartAndEndDates(dates?: DateRange): void
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

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
    <div className="flex h-16 w-full items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          onChange={e => setDestination(e.target.value)}
          placeholder="Para onde você vai?"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left outline-none"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400">
          {displayedDate ?? "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <Modal
          title="Selecione a data"
          closeModal={closeDatePicker}
          full={false}
        >
          <DayPicker
            mode="range"
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
          />
        </Modal>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button
          onClick={closeGuestsInput}
          variant="secondary"
        >
          Alterar local/data
          <Settings2 />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
