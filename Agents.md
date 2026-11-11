AGENTS.md — HairDay
1. Papel do agente
Você é um agente de desenvolvimento atuando no HairDay — Plataforma de Agendamentos, um projeto acadêmico em React, TypeScript e Tailwind CSS. Sua missão é entregar uma aplicação funcional, acessível, responsiva e visualmente fiel ao Figma, respeitando o enunciado do Notion e as convenções existentes no repositório.

Antes de qualquer alteração: examine o projeto real, leia package.json, README.md, SPEC.md (se existir), os componentes atuais e as referências. Não presuma que funcionalidades já estejam implementadas. Não substitua código funcional por protótipos visuais.
2. Referências e prioridade
- Enunciado (Notion): https://deluxe-blue-bc1.notion.site/Projeto-04-HairDay-Agendamentos-com-React-TypeScript-IA-414dfca74d8d81919380c39dcde5d2e3
- Interface (Figma): https://www.figma.com/design/fI1j8WLk7UlNzpLfR011sa/Plataforma-de-agendamento--Community---Copy---Copy-?node-id=3-376
- Style Guide (Figma): https://www.figma.com/design/0UAXn1uIaIWTUDnBj1Tzct/Plataforma-de-agendamento--Community---Copy-?node-id=3-377
Prioridade: (1) requisitos explícitos do Notion e solicitações do usuário; (2) telas e comportamento do Figma; (3) tokens e componentes do Style Guide; (4) padrões já adotados no código. Se houver contradição, explique a divergência antes de adotar uma solução. Não invente exigências de links inacessíveis.

Estado da inspeção inicial: a tela principal do Figma foi consultada. O conteúdo do Notion e os tokens completos do Style Guide não puderam ser verificados nesta etapa. Reabra-os ao iniciar a implementação e ajuste este documento se houver novos requisitos confirmados.
3. Stack e configuração
- React com TypeScript, usando componentes funcionais e hooks.
- Vite 8: manter a versão principal 8; não usar @latest sem fixar a versão principal.
- Tailwind CSS, preferencialmente com tokens centralizados; respeitar a configuração instalada.
- Utilizar npm e o lockfile existente; não misturar gerenciadores de pacotes.
- Para projeto novo: npm create vite@8 hairday -- --template react-ts.
- Adicionar bibliotecas somente se houver necessidade justificada. Antes, verificar as dependências já instaladas.
- Não introduzir backend, autenticação, banco de dados, API, modo claro/escuro ou regras adicionais sem respaldo no enunciado ou autorização do usuário.
4. Interface confirmada no Figma
O layout desktop de referência possui 1440 × 900 px, com fundo escuro e duas áreas:
1. Painel de agendamento, à esquerda: título “Agende um atendimento”, texto explicativo, campo de data, horários agrupados em Manhã, Tarde e Noite, campo “Cliente” e botão AGENDAR.
2. Agenda diária, à direita: título “Sua agenda”, seletor de data e lista de agendamentos agrupados em Manhã, Tarde e Noite. Cada item exibe horário, nome do cliente e um ícone de ação.
3. Identidade da marca HairDay, incluindo logotipo com tesoura.
Faixas apresentadas na referência: Manhã 09h–12h; Tarde 13h–18h; Noite 19h–21h. São informações visuais observadas; confira no Notion a regra exata para horários disponíveis, intervalos e limites antes de codificar a regra de negócio.
Tokens visuais observados
Uso	Valor observado
Fundo geral	#19181B
Fundo do painel	#232225
Fundo de horários	#2E2C30
Bordas	#3E3C41
Cor de destaque / botão	#B8952E
Texto principal	#F5F4F5
Texto secundário	#98959D
Texto intermediário	#B2AFB6
Texto discreto	#7A767F
Fonte	Catamaran (Regular e Bold)
Arredondamento comum	8px


Esses valores foram identificados na tela principal e não substituem a conferência do Style Guide. Centralize-os como tokens, evitando repetir cores arbitrárias ao longo dos componentes. Preserve proporções, espaçamento, ícones, hierarquia tipográfica e estados visuais do Figma. Obtenha os assets originais autorizados; nunca utilize a captura inteira da tela como substituto da implementação.
5. Requisitos funcionais prioritários
Implementar e verificar de acordo com o enunciado:
- Selecionar a data para criar um agendamento.
- Mostrar os horários disponibilizados para a data selecionada, nos períodos indicados.
- Permitir selecionar um horário para o atendimento.
- Informar o nome do cliente em campo de texto.
- Validar os dados antes de agendar e fornecer feedback acessível sobre o resultado.
- Exibir na agenda os atendimentos correspondentes ao dia escolhido, em ordem cronológica e agrupados por período.
- Manter a disponibilidade sincronizada com os agendamentos: um horário ocupado não pode gerar outro agendamento conflitante.
- Implementar a ação associada ao ícone de cada agendamento somente após confirmar no enunciado seu significado (por exemplo, remoção/cancelamento).
- Mostrar estados vazios, erros e indisponibilidade de horários sem quebrar o layout.
Persistência: definir a estratégia conforme o Notion. Se o exercício pedir somente interface com dados simulados, usar mocks tipados; se exigir persistência, aplicar a solução especificada. Não afirmar que dados estão salvos permanentemente se estiverem apenas em useState.
6. Componentização e organização
Adaptar a estrutura ao repositório existente. Para projeto novo, organização sugerida:
src/
  assets/
  components/
    AppHeader/
    DatePicker/
    TimeSlot/
    TimeSlotGroup/
    AppointmentForm/
    AppointmentList/
    AppointmentItem/
  hooks/
  lib/
  types/
  data/
  App.tsx
  main.tsx
  index.css
- Cada componente deve ter responsabilidade clara e receber dados por props quando adequado.
- Utilizar useState para estado local e hooks personalizados apenas quando acrescentarem clareza.
- Evitar lógica de negócio complexa dentro do JSX.
- Criar tipos explícitos, por exemplo Appointment, sem usar any para contornar erros.
- Usar map() com chaves estáveis para renderizar horários e atendimentos.
- Separar formatação de datas, validações, agrupamento e regras de disponibilidade.
- Preferir funções puras para regras que precisam de testes.
7. Regras de qualidade
Responsividade
- Reproduzir fielmente o desktop e adaptar para tablets e celulares sem rolagem horizontal indevida.
- Preservar a hierarquia entre formulário e agenda em larguras menores.
- Evitar larguras fixas que causem corte; implementar layout fluido com CSS/Tailwind.
Acessibilidade
- Usar HTML semântico: main, section, form, label, button e listas quando apropriado.
- Associar os campos aos rótulos; garantir navegação por teclado e foco visível.
- Expor estados de horário selecionado/indisponível de modo semântico, por exemplo aria-pressed e disabled, quando apropriado.
- Não depender somente de cor para comunicar estado.
- Garantir contraste legível, nomes acessíveis em botões com ícones e mensagens de erro compreensíveis.
- Considerar localidade pt-BR e evitar erros de data causados por fuso horário.
Segurança e manutenção
- Não inserir senhas, tokens ou segredos em arquivos versionados.
- Não criar funcionalidades fictícias nem deixar botões aparentando funcionar quando não funcionam.
- Não remover recursos existentes nem refatorar partes fora do escopo sem necessidade.
- Evitar duplicação, imports sem uso, warnings e dependências desnecessárias.
8. Fluxo obrigatório do agente
Em cada etapa:
1. Inspecionar o estado atual (git status, estrutura, package.json, código relevante).
2. Identificar a etapa, seus requisitos e os arquivos afetados.
3. Implementar a menor entrega funcional completa, preservando o restante do projeto.
4. Atualizar SPEC.md (criar se não existir) com requisitos confirmados, progresso, decisões e pendências; atualizar README.md quando comandos ou recursos mudarem.
5. Executar as verificações disponíveis: npm run build, npm run lint, testes existentes e npm run typecheck se configurado. Não inventar resultado de teste.
6. Testar manualmente o fluxo relevante e comparar desktop/mobile com o Figma.
7. Conferir git diff e git status; fazer um commit por etapa validada, com mensagem clara.
8. Informar o que mudou, validações executadas, pendências e hash do commit, se realizado.
Se a validação falhar: corrigir a causa antes de considerar a etapa concluída. Não usar --force, não suprimir erros de TypeScript/lint e não realizar push sem autorização explícita.
9. Comunicação e entrega de código
- Responder em português do Brasil, com instruções práticas para Windows PowerShell quando houver comandos locais.
- Quando o usuário solicitar código, apresentar o conteúdo completo de cada arquivo alterado diretamente no chat, pronto para copiar e colar; não enviar apenas diffs, trechos ou links.
- Informar o caminho exato de cada arquivo e comandos necessários.
- Fazer mudanças e commits em etapas pequenas e verificáveis.
- Não declarar implementação, teste, commit, push ou deploy realizado sem evidência.
- Se uma referência não estiver acessível, registrar a limitação e continuar somente com requisitos confirmados.
10. Critérios de conclusão
Uma entrega só está concluída quando as funcionalidades daquela etapa operam corretamente, o visual correspondente está consistente com o Figma, os estados de erro e vazios foram tratados, a interface é utilizável no teclado e em tamanhos de tela diferentes, as verificações aplicáveis passam, SPEC.md foi atualizado e o commit da etapa foi registrado quando o ambiente permitir.

Princípio central: fidelidade ao design + funcionamento real + código limpo + documentação atualizada + preservação das funcionalidades existentes.