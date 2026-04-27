import { getReportData } from "@/app/actions/reports"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)
}

export default async function AISummaryPage() {
  const currentYear = new Date().getFullYear().toString()
  const data = await getReportData(currentYear, "all")

  const totalIncome = data.kpis.totalIncome
  const totalExpense = data.kpis.totalExpense
  const profitMargin = data.kpis.profitMargin

  // Simulated "AI" insights based on actual data
  const bestProperty = data.incomeByProperty[0]
  const worstProperty = data.incomeByProperty[data.incomeByProperty.length - 1]
  const topExpense = data.expensesByCategory[0]

  const isHealthy = profitMargin >= 30

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-100 rounded-full">
          <Sparkles className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Análisis con IA</h1>
          <p className="text-muted-foreground mt-1">Resumen ejecutivo y recomendaciones basadas en el rendimiento de {currentYear}.</p>
        </div>
      </div>

      <Card className="border-purple-100 shadow-md">
        <CardHeader className="bg-purple-50/50 border-b border-purple-100/50 pb-4">
          <CardTitle className="text-lg flex items-center text-purple-900">
            Resumen Ejecutivo del Portafolio
          </CardTitle>
          <CardDescription>Generado a partir de los datos históricos de todas tus propiedades.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
          
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Salud Financiera General</h3>
              <p>
                Durante el año {currentYear}, el portafolio generó ingresos por <strong>{formatCurrency(totalIncome)}</strong> con gastos operativos de <strong>{formatCurrency(totalExpense)}</strong>. 
                Esto resulta en un margen de ganancia del <strong>{profitMargin.toFixed(1)}%</strong>. 
                {isHealthy 
                  ? " Este margen es excelente y supera el promedio de la industria del 30%, indicando una operación altamente eficiente." 
                  : " Este margen está por debajo del 30% recomendado. Es aconsejable revisar los gastos operativos para mejorar la rentabilidad."}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Rendimiento por Propiedad</h3>
              {bestProperty ? (
                <p>
                  La propiedad estrella es <strong>{bestProperty.name}</strong>, liderando la facturación con <strong>{formatCurrency(bestProperty.value)}</strong>. 
                  {worstProperty && worstProperty.name !== bestProperty.name && (
                    <span> En contraste, <strong>{worstProperty.name}</strong> muestra el menor rendimiento relativo con {formatCurrency(worstProperty.value)}.</span>
                  )}
                </p>
              ) : (
                <p>Aún no hay suficientes datos de facturación para determinar la mejor propiedad.</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Puntos de Fuga de Capital</h3>
              {topExpense ? (
                <p>
                  La categoría <strong>{topExpense.name}</strong> representa el mayor rubro de egresos ({formatCurrency(topExpense.value)}). 
                  Se recomienda evaluar proveedores alternativos o estrategias de optimización para esta categoría durante el próximo trimestre para aumentar el margen neto.
                </p>
              ) : (
                <p>Aún no hay gastos registrados suficientes para analizar los puntos de fuga.</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-lg mt-6">
            <Lightbulb className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Recomendación Estratégica</h3>
              <p className="text-sm">
                {isHealthy 
                  ? "Con una caja saludable, considera reinvertir parte de las ganancias en mejoras estéticas para justificar un aumento del 10-15% en la tarifa por noche de tus propiedades de menor rendimiento." 
                  : "Implementa una auditoría estricta de costos variables. Considera automatizar procesos como el check-in o la limpieza para reducir el gasto recurrente y acercarte al margen ideal del 30-40%."}
              </p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
