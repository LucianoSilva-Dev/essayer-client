export interface Competencia {
  id: string
  nome: string
  descricao: string
  nota: number
  analiseIA: string
}

export interface Correcao {
  id: string
  textoRedacao: string
  notaTotal: number
  totalCorrecoes: number
  competencias: Competencia[]
}