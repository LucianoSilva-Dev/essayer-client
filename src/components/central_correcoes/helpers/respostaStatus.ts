import { RespostaAtividade } from "@/apiCalls/tarefas/types";

export const respostaStatus = (res: RespostaAtividade): 'corrigido' | 'pendente' => {
  return res.feedback ? 'corrigido' : 'pendente'
}