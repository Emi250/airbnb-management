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
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Añadir Gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Gasto</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="propertyId">Propiedad</Label>
            <select 
              name="propertyId" 
              id="propertyId"
              required
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled selected>Seleccione una propiedad</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" name="description" placeholder="Ej. Arreglo de plomería" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <select 
                name="category" 
                id="category"
                required
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Servicios">Servicios (Luz, Gas, etc)</option>
                <option value="Impuestos">Impuestos</option>
                <option value="Mobiliario">Mobiliario</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expenseType">Tipo de Gasto</Label>
              <select 
                name="expenseType" 
                id="expenseType"
                required
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="fijo">Fijo</option>
                <option value="variable">Variable</option>
                <option value="extraordinario">Extraordinario</option>
              </select>
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
