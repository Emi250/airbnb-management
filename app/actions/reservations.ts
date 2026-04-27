"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getReservationsGroupedByProperty() {
  const properties = await prisma.property.findMany({
    include: {
      reservations: {
        orderBy: {
          checkIn: "asc"
        }
      }
    },
    orderBy: {
      name: "asc"
    }
  })

  return properties
}

export async function addReservation(formData: FormData) {
  const propertyId = formData.get("propertyId") as string
  const guestName = formData.get("guestName") as string
  const checkInStr = formData.get("checkIn") as string
  const checkOutStr = formData.get("checkOut") as string
  const amountToPayStr = formData.get("amountToPay") as string
  const guestsCountStr = formData.get("guestsCount") as string
  const phone = formData.get("phone") as string
  
  // Fix timezone issue by appending time
  const checkIn = new Date(`${checkInStr}T12:00:00`)
  const checkOut = new Date(`${checkOutStr}T12:00:00`)
  const amountToPay = parseFloat(amountToPayStr)
  const guestsCount = parseInt(guestsCountStr)
  
  if (checkOut <= checkIn) {
    return // Invalid date range
  }
  
  // Calcular noches
  const timeDiff = checkOut.getTime() - checkIn.getTime()
  const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))

  await prisma.reservation.create({
    data: {
      propertyId,
      guestName,
      checkIn,
      checkOut,
      nights,
      amountToPay,
      guestsCount,
      phone,
      currency: 'ARS',
      reservationStatus: 'confirmed',
      paymentStatus: 'pending',
      bookingChannel: 'Airbnb',
    }
  })
  
  revalidatePath('/calendar')
  revalidatePath('/')
}

export async function deleteReservation(formData: FormData) {
  const id = formData.get("id") as string
  if (!id) return

  await prisma.reservation.delete({
    where: { id }
  })
  
  revalidatePath('/calendar')
  revalidatePath('/')
}
