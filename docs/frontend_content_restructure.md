# Reestruturação do Content das Páginas – Frontend

# 🎯 Objetivo

Esta documentação descreve o padrão adotado para reorganização do conteúdo das páginas no frontend, com foco em:

- Redução de complexidade das páginas;
- Melhor separação de responsabilidades;
- Aumento da modularidade e granularidade;
- Padronização da arquitetura para escalabilidade;

O objetivo não é apenas “quebrar componentes”, mas criar uma estrutura previsível e sustentável para páginas complexas.

---

# Problema Identificado

Antes da refatoração, as páginas apresentavam componentes page ou content muito volumosos:

Mistura de:

- Lógica de negócio;
- Orquestração de estado;
- Controle de efeitos (useEffect);
- Renderização de UI;

Que, como consequência apresentava dificuldades de reaproveitamento e manutenção, além de alto custo para adicionar regras ou filtros.

---

# Nova Abordagem Arquitetural

Cada página passa a ser organizada em três camadas bem definidas:

Página
 ├─ Hook de Orquestração **(Controller)**
 ├─ Componentes de UI **(Presentational)**
 └─ Contextos / Hooks compartilhados

---

# Estrutura de Pastas Padrão

src/modules/<page-name>/
├── components/
│   ├── content/
│   │   └── index.tsx        **Componente declarativo da página**
│   ├── <componentes-visuais>
│   └── ...
├── hooks/
│   └── use<Page>Name.ts     **Hook controlador da página**
└── index.ts (opcional)

Exemplo (Home):
src/modules/home/
├── components/
│   ├── content/
│   │   └── index.tsx
│   ├── repertorio-grid/
│   ├── pagination/
│   └── filters/
├── hooks/
│   └── useHomeRepertorios.ts

---

# Hook de Página (Controller)

Cada página deve possuir um hook principal, responsável por:

**Orquestrar:**

- Contextos;
- Hooks compartilhados;
- Estados locais da página;

**Centralizar:**

- useEffect;
- Lógica de busca;
- Regras de sincronização (filtros ↔ paginação);
- Expor apenas dados e ações prontas para a UI;

---

# Convenção de nome:

use<PageName>

**Exemplo:**

useHomeRepertorios
useForumPosts
useUserProfile

---

# Contrato de Retorno do Hook

O hook de página deve retornar objetos agrupados por responsabilidade:

return {
  data,      // Dados principais da página
  filters,   // Estado e setters de filtros
  view,      // Estado de UI (tabs, modos, etc)
}

Exemplo real:
return {
  repertorio: {
    repertorios,
    totalPages,
    totalRepertorios,
    currentPage,
    setPage,
    isLoading
  },
  filters,
  tipoVisualizacao,
  setTipoVisualizacao
}

---

# Componente Content (View Pura)

O componente content da página deve:

❌ Não conter useEffect

❌ Não conter lógica de negócio

❌ Não acessar contextos diretamente

✅ Apenas consumir dados do hook

✅ Renderizar componentes visuais

**Exemplo:**

export default function HomeContent() {
  const {
    repertorio,
    filters,
    tipoVisualizacao,
    setTipoVisualizacao,
  } = useHomeRepertorios();

  return (
    <>
      <Filters {...filters} />
      <Grid data={repertorio.repertorios} />
      <Pagination />
    </>
  );
}

---

# 🧪 Benefícios da Nova Arquitetura

✅ Redução drástica do tamanho das Content pages
✅ Melhor legibilidade
✅ Fácil manutenção
✅ Hooks reutilizáveis
✅ Efeitos previsíveis e controlados
✅ Menos bugs relacionados a dependências
✅ Melhor aderência às regras do React (exhaustive-deps)

# ⚠️ Boas Práticas

Sempre usar useCallback em funções expostas por contextos
Nunca esconder dependências em useEffect
Um hook de página = uma fonte de verdade
UI não deve conhecer regras de negócio
Prefira hooks a “componentes inteligentes”

# 🔄 Processo de Refatoração

Identificar página com alto acoplamento
Criar hook controlador da página

**Mover:**

- useEffect;
- Estados;
- Regras de sincronização;
- Simplificar o content;

Garantir que ESLint não aponte warnings

# 📌 Considerações Finais

Esta abordagem foi pensada para páginas complexas e em constante evolução.
Ela prioriza clareza, escalabilidade e previsibilidade, mesmo com um custo inicial de refatoração.

A partir deste padrão, novas páginas devem nascer já seguindo esta estrutura.