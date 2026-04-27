import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, CreditCard, TrendingUp, TrendingDown, Home } from "lucide-react"
import { getDashboardMetrics } from "./actions/dashboard"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos del Mes
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.currentMonthIncome)}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.incomeChange >= 0 ? "+" : ""}{metrics.incomeChange.toFixed(1)}% vs mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gastos del Mes
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.currentMonthExpenses)}</div>
            <p className="text-xs text-muted-foreground">
              Proyectado para todo el mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganancia Neta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.currentNetProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(metrics.currentNetProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Margen de {metrics.currentMargin.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos Acumulados Anual
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.currentYearIncome)}</div>
            <p className="text-xs text-muted-foreground">
              Año {new Date().getFullYear()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Próximas Reservas</CardTitle>
            <CardDescription>
              Las próximas 5 reservas confirmadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.upcomingReservations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No hay próximas reservas.</p>
              ) : (
                metrics.upcomingReservations.map((res) => (
                  <div key={res.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{res.guestName}</p>
                      <p className="text-sm text-muted-foreground">
                        {res.property.name} - {format(res.checkIn, "dd MMM", { locale: es })} al {format(res.checkOut, "dd MMM", { locale: es })}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      +{formatCurrency(res.amountToPay)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>
              Avisos importantes de tus propiedades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.currentMargin < 15 && metrics.currentMargin > 0 && (
                 <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-medium">Margen de ganancia bajo ({metrics.currentMargin.toFixed(1)}%)</span>
                 </div>
              )}
              {metrics.currentNetProfit < 0 && (
                 <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded-md">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-medium">Pérdida neta proyectada este mes</span>
                 </div>
              )}
              {metrics.upcomingReservations.some(r => r.amountToPay === 0) && (
                <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
                  <span className="text-sm font-medium">Hay reservas sin monto a pagar cargado</span>
                </div>
              )}
              {metrics.currentNetProfit > 0 && metrics.currentMargin >= 15 && (
                <p className="text-sm text-muted-foreground">Todo parece estar en orden. Buen trabajo.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
