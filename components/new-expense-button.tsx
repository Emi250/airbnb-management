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
import { addExpense } from "@/app/actions/expenses"
import { Plus } from "lucide-react"

interface Property {
  id: string
  name: string
}

export function NewExpenseButton({ properties }: { properties: Property[] }) {
  const [open, setOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    await addExpense(formData)
    setOpen(false) // Close modal on submit
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-primary hover:bg-primary/90 text-primary-foreground" />}>
        <Plus className="mr-2 h-4 w-4" /> Añadir Gasto
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Gasto</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="propertyId">Propiedad</Label>
            <Select name="propertyId" required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una propiedad" />
              </SelectTrigger>
              <SelectContent>
                {properties.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" name="description" placeholder="Ej. Arreglo de plomería" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <Select name="category" defaultValue="Mantenimiento" required>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="Limpieza">Limpieza</SelectItem>
                  <SelectItem value="Servicios">Servicios (Luz, Gas, etc)</SelectItem>
                  <SelectItem value="Impuestos">Impuestos</SelectItem>
                  <SelectItem value="Mobiliario">Mobiliario</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expenseType">Tipo de Gasto</Label>
              <Select name="expenseType" defaultValue="fijo" required>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Gasto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fijo">Fijo</SelectItem>
                  <SelectItem value="variable">Variable</SelectItem>
                  <SelectItem value="extraordinario">Extraordinario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Monto (ARS)</Label>
              <Input id="amount" name="amount" type="number" min="0" step="1" required />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit">Guardar Gasto</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
