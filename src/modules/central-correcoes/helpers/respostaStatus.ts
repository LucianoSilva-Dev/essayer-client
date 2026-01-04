import { RespostaAtividade } from "@/lib/apiCalls/tarefas/types";

export const respostaStatus = (res: RespostaAtividade): 'corrigido' | 'pendente' => {
  return res.feedback ? 'corrigido' : 'pendente'
}