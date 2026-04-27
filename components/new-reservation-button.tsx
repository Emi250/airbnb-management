"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addReservation } from "@/app/actions/reservations"

export function NewReservationButton({ properties }: { properties: { id: string, name: string }[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkInDate, setCheckInDate] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      await addReservation(formData)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<div className="flex items-center gap-2 text-muted-foreground text-sm cursor-pointer hover:text-foreground w-max mt-4" />}>
        <span className="text-lg leading-none">+</span> Nueva página
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Reserva</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="propertyId">Propiedad</Label>
            {properties.length === 0 ? (
              <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-200">
                Aún no tienes propiedades creadas. Ve a la pestaña de "Propiedades" para añadir una primero.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {properties.map(p => (
                  <label key={p.id} className="cursor-pointer">
                    <input type="radio" name="propertyId" value={p.id} className="peer sr-only" required />
                    <div className="rounded-md border border-muted bg-popover p-2 text-center text-sm transition-all hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:font-medium">
                      {p.name}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="guestName">Huésped</Label>
            <Input id="guestName" name="guestName" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in</Label>
              <Input 
                id="checkIn" 
                name="checkIn" 
                type="date" 
                required 
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out</Label>
              <Input 
                id="checkOut" 
                name="checkOut" 
                type="date" 
                required 
                min={checkInDate}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guestsCount">Nº Huéspedes</Label>
              <Input id="guestsCount" name="guestsCount" type="number" min="1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amountToPay">Monto a pagar (ARS)</Label>
              <Input id="amountToPay" name="amountToPay" type="number" min="0" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" placeholder="+54 9 11..." />
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Reserva"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
