interface AnaliseFeedbackProps {
  feedback: string
  title?: string
}

export function AnaliseFeedback({
  feedback,
  title = "Análise da inteligência artificial"
}: AnaliseFeedbackProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[48px] shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {/* Usamos 'whitespace-pre-line' para respeitar as quebras de linha (\n) do mock */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {feedback}
        </p>
      </div>
    </div>
  )
}