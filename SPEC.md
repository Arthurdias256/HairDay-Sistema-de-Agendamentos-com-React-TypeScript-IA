# HairDay — especificação e andamento

## Primeira etapa
- Formulário de data, horário e cliente; agenda diária agrupada por período; validação e bloqueio de horários ocupados.
- Dados mantidos somente em memória: são perdidos ao atualizar ou fechar a página.
- Horários de uma em uma hora, dentro das faixas observadas no Agents, são provisórios e devem ser confirmados no enunciado. Não há regra de bloqueio de datas passadas nesta etapa.
- A ação do ícone dos agendamentos não foi implementada porque seu significado não foi confirmado.

## Pendências e limitações
- Notion, tela do Figma e Style Guide não retornaram conteúdo na consulta desta etapa. Confirmar regras, persistência, identidade visual e assets originais antes de finalizar.
- A fonte Catamaran e o logotipo original ainda não estão disponíveis localmente; a interface usa alternativas.
- O projeto encontrado usa Vite 7 e não possui Tailwind, divergindo do Agents. Decidir a atualização da stack após verificar compatibilidade e requisitos.
- O build passou com aviso: Node.js 22.11.0 está abaixo do mínimo 22.12.0 indicado pelo Vite instalado.
- Comparação visual e testes manuais de acessibilidade e responsividade ainda são necessários.
