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
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" name="description" placeholder="Ej. Arreglo de plomería" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Mantenimiento", "Limpieza", "Servicios", 
                  "Impuestos", "Mobiliario", "Otro"
                ].map(cat => (
                  <label key={cat} className="cursor-pointer">
                    <input type="radio" name="category" value={cat} className="peer sr-only" required defaultChecked={cat === "Mantenimiento"} />
                    <div className="rounded-md border border-muted bg-popover px-2 py-1.5 text-center text-xs transition-all hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:font-medium">
                      {cat}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expenseType">Tipo de Gasto</Label>
              <div className="flex flex-col gap-2">
                {[
                  { value: "fijo", label: "Fijo" },
                  { value: "variable", label: "Variable" },
                  { value: "extraordinario", label: "Extraordinario" }
                ].map(type => (
                  <label key={type.value} className="cursor-pointer">
                    <input type="radio" name="expenseType" value={type.value} className="peer sr-only" required defaultChecked={type.value === "fijo"} />
                    <div className="rounded-md border border-muted bg-popover px-2 py-1.5 text-center text-xs transition-all hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:font-medium">
                      {type.label}
                    </div>
                  </label>
                ))}
              </div>
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
