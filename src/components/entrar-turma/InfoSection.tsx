import { InfoItem } from "./InfoItem"
import { MessageSquare, Users, Rocket } from "lucide-react"

export function InfoSection() {
  return (
    // Largura: w-full (mobile) | lg:max-w-[45%] (desktop)
    <div className="w-full max-w-full space-y-8 lg:max-w-[45%] lg:w-auto">
      
      {/* Título Principal ("Como funciona") */}
      {/* Tamanho: text-[30px] (mobile) | lg:text-[40px] (desktop) */}
      {/* Alinhamento: text-center (mobile) | lg:text-left (desktop) */}
      <h2 className="text-[30px] lg:text-[40px] font-semibold leading-[49px] text-[#075F70] text-center lg:text-left">
        Como funciona
      </h2>

      {/* Espaçamento entre os InfoItems */}
      <div className="space-y-6 lg:space-y-12">
        <InfoItem
          icon={<MessageSquare className="h-7 w-7 text-teal-600" />}
          title="Para professores"
          description="Gerencie suas turmas, crie tarefas e acompanhe o progresso dos alunos."
        />

        <InfoItem
          icon={<Users className="h-7 w-7 text-teal-600" />}
          title="Para alunos"
          description="Acesse à tarefas e correções usando o código de convite."
        />

        <InfoItem
          icon={<Rocket className="h-7 w-7 text-teal-600" />}
          title="Benefícios da Turma"
          description="Mais conexão, menos complicação, melhor aprendizado."
        />
      </div>
    </div>
  )
}