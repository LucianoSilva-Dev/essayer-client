import { RespostaAtividade } from "@/apiCalls/tarefas/types";

export const notaTotal = (res: RespostaAtividade): number | string => {
  if(!res.feedback) return '-'
  const feedback = res.feedback

  return feedback.notaC1 + feedback.notaC2 + feedback.notaC3 + feedback.notaC4 + feedback.notaC5
}