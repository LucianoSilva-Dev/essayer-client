// components/JoinClass/InfoSection.tsx
import InfoItem from './InfoItem';
import { FaChalkboardTeacher, FaUserGraduate, FaStar } from 'react-icons/fa';

export default function InfoSection() {
  return (
    <div className="max-w-sm">
      <h2 className="text-xl font-bold text-primary mb-6">Como funciona</h2>
      <InfoItem
        icon={<FaChalkboardTeacher size={24} />}
        title="Para professores"
        description="Gerencie suas turmas, crie tarefas e acompanhe o progresso dos alunos."
      />
      <InfoItem
        icon={<FaUserGraduate size={24} />}
        title="Para alunos"
        description="Acesse às tarefas e correções usando o código de convite."
      />
      <InfoItem
        icon={<FaStar size={24} />}
        title="Benefícios da Turma"
        description="Mais conexão, menos complicação, melhor aprendizado."
      />
    </div>
  );
}
