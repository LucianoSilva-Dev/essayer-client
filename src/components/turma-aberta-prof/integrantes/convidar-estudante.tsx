import { getCodigoConvite } from "@/apiCalls/turma-aberta-prof";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ConvidarEstudanteProps{
  idTurma: string
}

const ConvidarEstudante: FC<ConvidarEstudanteProps> = ({idTurma}: ConvidarEstudanteProps) => {
  const [code, setCode] = useState<string>('')

  useEffect(()=>{
    (async () => {
      const {codigoConvite} = await getCodigoConvite(idTurma)

      if(!codigoConvite) return

      setCode(codigoConvite)
    })()
  }, [idTurma])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      toast.info('Código copiado!')
    } catch (e) {
      console.error(e)
      toast.error('Falha ao copiar o texto')
    }
  }

  return (
    <button
      className="w-full py-3 rounded-full cursor-pointer bg-[#075F70] text-white font-semibold shadow-md hover:bg-[#054551] transition-colors"
      onClick={handleCopy}
    >
      Convidar estudante
    </button>
  );
};

export default ConvidarEstudante;
