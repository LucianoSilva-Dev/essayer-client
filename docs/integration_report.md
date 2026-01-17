# Relatório de Integração Frontend-Backend

Aqui está o status da integração de cada página do projeto **essayer-client** com o backend:

---

## 🟢 Integradas  
Estas páginas estão conectadas ao backend e consumindo dados reais via API.

### **Autenticação:**
- `/login` (Login)  
- `/register` (Cadastro)  
- `/forgot-password` (Recuperação de senha – assumido integrado baseado na estrutura)

### **Principal:**
- `/main` (Listagem de repertórios)  
- `/repertorio/[id]` (Detalhes do repertório)  
- `/profile` (Dados do usuário)

### **Turmas (Aluno):**
- `/turmas_aluno` (Listagem de turmas)  
- `/turma_aberta_aluno/[id]` (Detalhes da turma, tarefas, correções)  
- `/entrar_turma` (Entrar em turma via código)

### **Turmas (Professor):**
- `/turmas_professor` (Listagem de turmas criadas)  
- `/turma_aberta_prof/[id]` (Gerenciamento da turma, alunos, correções)  
- `/criar_turma` (Criação de nova turma)  
- `/central_correcoes` (Visão geral de correções)

### **Redação:**
- `/praticar_redacao` (Redação livre)

### **Admin:**
- `/admin` (Painel administrativo)

### **Adicionar:**
- `/adicionar` (Adicionar Repertório)

---

## 🟡 Parcialmente Integradas  
Estas páginas têm partes integradas, mas funcionalidades incompletas ou em construção.

### **/criar_tarefa:**
- Passos 1 e 2 parecem funcionais.  
- Passos 3, 4 e 5 estão marcados como “Em construção” (placeholders).

---

## 🔴 Não Integradas (Mockadas)  
Estas páginas usam dados estáticos (hardcoded) e não se comunicam com o backend.

### **/fazer-tarefa (Revisão/Visualização de Tarefa):**
- O componente `RevisaoRedacaoPage` usa um objeto `MOCK_TAREFA` fixo no código.  
- Não busca dados da API.

---

## ⚪ Estáticas / Navegação  
Páginas que são principalmente informativas ou de navegação.

- `/` (Landing Page)  
- `/faq` (Perguntas Frequentes)
