import { Link2, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { api } from "../../lib/axios"
import { CreateLinkModal } from "./create-link-modal"

interface Link {
  id: string
  title: string
  url: string
  tripId: string
}

export function ImportantLinks() {
  const { tripId } = useParams<"tripId">()

  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then(response => setLinks(response.data.links))
  }, [tripId])

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      <div className="space-y-5">
        {links.map(link => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="size-5 shrink-0 text-zinc-400" />
          </div>
        ))}
      </div>

      <Button
        size="full"
        variant="secondary"
        onClick={openCreateLinkModal}
      >
        <Plus />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  )
}
