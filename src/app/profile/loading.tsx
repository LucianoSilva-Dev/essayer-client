export default function Loading() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 w-full animate-pulse">
      {/* Título e Botão */}
      <div className="flex justify-between items-center mb-10">
        <div className="w-64 h-10 bg-gray-200 rounded"></div>
        <div className="w-40 h-12 bg-gray-200 rounded-full"></div>
      </div>

      {/* Campos de Formulário */}
      <div className="space-y-8">
        {/* Nome e Sobrenome */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="w-24 h-6 bg-gray-200 rounded"></div>
            <div className="w-full h-16 bg-gray-200 rounded-2xl"></div>
          </div>
          <div className="space-y-2">
            <div className="w-32 h-6 bg-gray-200 rounded"></div>
            <div className="w-full h-16 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="w-full h-16 bg-gray-200 rounded-2xl"></div>
        </div>

        {/* Senha */}
        <div className="space-y-2">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="w-full h-16 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}