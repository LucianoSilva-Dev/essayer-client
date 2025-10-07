```
essayer-client
├──public
│   ├──criarTurmaStudents.png
│   ├──entrarTurmaStudents.png
│   ├──Exit_icon.png
│   ├──exitIcon.svg
│   ├──favicon_2d.png
│   ├──favicon_incita.jpg
│   ├──favicon.ico
│   ├──fireIncita.svg
│   ├──google-icon.svg
│   ├──imagotipo incita.jpg
│   ├──perfil.png
│   ├──perfil.svg
│   ├──placeholder-logo.png
│   ├──placeholder-logo.svg
│   ├──placeholder-user.jpg
│   ├──placeholder.jpg
│   ├──placeholder.svg
│   ├──turmaFluxo.png
│   ├──turmaLamp.png
│   ├──turmaLapis.png
│   ├──turmaPc.png
│   └──turmaPrancheta.png
├──src
│   ├──apiCalls
│   │   ├──auth
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──repertorio
│   │   │   ├──helpers.ts
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──requisicao-professor
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──requisicao-senha
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──requisicao-usuario
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──turma
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──turma-aberta-prof
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──usuario
│   │   │   ├──index.ts
│   │   │   └──types.ts
│   │   ├──api-client.ts
│   │   └──types.ts
│   ├──app
│   │   ├──(auth)
│   │   │   ├──forgot-password
│   │   │   │   ├──reset-password
│   │   │   │   │   └──page.tsx
│   │   │   │   ├──verify-code
│   │   │   │   │   └──page.tsx
│   │   │   │   └──page.tsx
│   │   │   ├──login
│   │   │   │   └──page.tsx
│   │   │   └──register
│   │   │   │   ├──confirmation
│   │   │   │   │   └──page.tsx
│   │   │   │   └──page.tsx
│   │   ├──adicionar
│   │   │   └──page.tsx
│   │   ├──admin
│   │   │   ├──repertorio
│   │   │   │   └──[id]
│   │   │   │   │   └──page.tsx
│   │   │   └──page.tsx
│   │   ├──criar_turma
│   │   │   └──page.tsx
│   │   ├──entrar_turma
│   │   │   └──page.tsx
│   │   ├──landing
│   │   │   ├──loading.tsx
│   │   │   └──page.tsx
│   │   ├──main
│   │   │   └──page.tsx
│   │   ├──profile
│   │   │   ├──editar
│   │   │   │   └──page.tsx
│   │   │   ├──loading.tsx
│   │   │   └──page.tsx
│   │   ├──repertorio
│   │   │   └──[id]
│   │   │   │   ├──editar
│   │   │   │   │   └──page.tsx
│   │   │   │   ├──loading.tsx
│   │   │   │   └──page.tsx
│   │   ├──turma_aberta_aluno
│   │   │   └──[turmaId]
│   │   │   │   └──page.tsx
│   │   ├──turma_aberta_prof
│   │   │   └──[turmaId]
│   │   │   │   └──page.tsx
│   │   ├──turmas_aluno
│   │   │   └──page.tsx
│   │   ├──turmas_professor
│   │   │   └──page.tsx
│   │   ├──constants.ts
│   │   ├──globals.css
│   │   ├──layout.tsx
│   │   ├──page.tsx
│   │   ├──swiper-hover.css
│   │   └──utils.ts
│   ├──components
│   │   ├──admin
│   │   │   ├──AdminPageContent
│   │   │   │   ├──repertorio
│   │   │   │   │   └──[id]
│   │   │   │   │   │   └──page.tsx
│   │   │   │   └──AdminPage.tsx
│   │   │   ├──professor-list.tsx
│   │   │   └──repertorio-list.tsx
│   │   ├──auth
│   │   │   ├──login
│   │   │   │   ├──confirmation-code.tsx
│   │   │   │   └──login-form.tsx
│   │   │   ├──New_Password
│   │   │   │   ├──forgot-password.tsx
│   │   │   │   ├──reset-password.tsx
│   │   │   │   └──verify-code.tsx
│   │   │   └──register
│   │   │   │   ├──register-aluno.tsx
│   │   │   │   ├──register-form.tsx
│   │   │   │   └──register-professor.tsx
│   │   ├──criar-turma
│   │   │   ├──components
│   │   │   │   ├──carrossel-imagens.tsx
│   │   │   │   └──criar-turma-button.tsx
│   │   │   ├──form
│   │   │   │   ├──criar-turma-form.tsx
│   │   │   │   └──FormActions.tsx
│   │   │   └──criar-turma-page.tsx
│   │   ├──entrar-turma
│   │   │   ├──background.tsx
│   │   │   ├──InfoItem.tsx
│   │   │   ├──InfoSection.tsx
│   │   │   ├──JoinBox.tsx
│   │   │   └──JoinClassPage.tsx
│   │   ├──forms
│   │   │   ├──artigo-form.tsx
│   │   │   ├──citacao-form.tsx
│   │   │   └──obra-form.tsx
│   │   ├──header
│   │   │   ├──auth-buttons.tsx
│   │   │   ├──header.tsx
│   │   │   ├──logo.tsx
│   │   │   ├──mobile-menu.tsx
│   │   │   ├──nav-item.tsx
│   │   │   └──nav-links.tsx
│   │   ├──landing
│   │   │   ├──card
│   │   │   │   ├──card-description.tsx
│   │   │   │   ├──card-icon.tsx
│   │   │   │   ├──card-title.tsx
│   │   │   │   ├──card.tsx
│   │   │   │   ├──tag-list.tsx
│   │   │   │   └──tag.tsx
│   │   │   ├──featured-repertories
│   │   │   │   ├──featured-repertories.tsx
│   │   │   │   └──repertories.css
│   │   │   ├──header
│   │   │   │   ├──auth-buttons.tsx
│   │   │   │   ├──header.tsx
│   │   │   │   ├──logo.tsx
│   │   │   │   ├──mobile-menu.tsx
│   │   │   │   ├──nav-item.tsx
│   │   │   │   └──nav-links.tsx
│   │   │   ├──ui
│   │   │   │   └──button.tsx
│   │   │   ├──como-funciona.tsx
│   │   │   ├──footer.tsx
│   │   │   ├──inicio.tsx
│   │   │   ├──main-topics.tsx
│   │   │   ├──page.tsx
│   │   │   ├──quote-card.tsx
│   │   │   └──sobre.tsx
│   │   ├──main
│   │   │   ├──filters
│   │   │   │   ├──FilterButton.tsx
│   │   │   │   ├──FilterGroup.tsx
│   │   │   │   └──RepertorioFilters.tsx
│   │   │   ├──MainPageContent.tsx
│   │   │   ├──Pagination.tsx
│   │   │   └──RepertorioGrid.tsx
│   │   ├──profile
│   │   │   ├──ProfilePageContent
│   │   │   │   ├──editar
│   │   │   │   │   └──page.tsx
│   │   │   │   ├──loading.tsx
│   │   │   │   └──ProfilePage.tsx
│   │   │   ├──ProfAccount.tsx
│   │   │   └──UserAccount.tsx
│   │   ├──repertorio
│   │   │   ├──[id]
│   │   │   │   ├──components
│   │   │   │   │   ├──content
│   │   │   │   │   │   ├──ArtigoContent.tsx
│   │   │   │   │   │   ├──CitacaoContent.tsx
│   │   │   │   │   │   └──ObraContent.tsx
│   │   │   │   │   ├──CommentCard.tsx
│   │   │   │   │   ├──CommentSection.tsx
│   │   │   │   │   ├──CreatorInfo.tsx
│   │   │   │   │   └──RepertorioActions.tsx
│   │   │   │   ├──edit
│   │   │   │   │   └──page.tsx
│   │   │   │   ├──loading.tsx
│   │   │   │   └──page.tsx
│   │   │   ├──adicionar
│   │   │   │   ├──AdicionarRepertorioContent.tsx
│   │   │   │   └──loading.tsx
│   │   │   ├──form
│   │   │   │   ├──EixoSelector.tsx
│   │   │   │   ├──FormActions.tsx
│   │   │   │   ├──RecorteSelector.tsx
│   │   │   │   └──RepertorioTypeSelector.tsx
│   │   │   ├──repertorio-card.tsx
│   │   │   └──repertorio-form.tsx
│   │   ├──shared
│   │   │   └──confirmation-modal.tsx
│   │   ├──sidebar
│   │   │   ├──sidebar-bottom-items.tsx
│   │   │   ├──sidebar-desktop.tsx
│   │   │   ├──sidebar-logo.tsx
│   │   │   ├──sidebar-mobile.tsx
│   │   │   ├──sidebar-navigation.tsx
│   │   │   ├──sidebar.tsx
│   │   │   └──types.ts
│   │   ├──turma-aberta-aluno
│   │   │   ├──comunidade
│   │   │   │   ├──integrante-item.tsx
│   │   │   │   └──integrante-list.tsx
│   │   │   ├──correcoes
│   │   │   │   ├──correcao-item.tsx
│   │   │   │   └──correcao-list.tsx
│   │   │   ├──tarefas
│   │   │   │   ├──tarefa-item.tsx
│   │   │   │   └──tarefa-list.tsx
│   │   │   └──turma-aberta-aluno-page.tsx
│   │   ├──turma-aberta-prof
│   │   │   ├──correcoes
│   │   │   │   ├──correcao-item.tsx
│   │   │   │   └──correcao-list.tsx
│   │   │   ├──header-Turma-prof
│   │   │   │   ├──turma-header.tsx
│   │   │   │   └──turma-info.tsx
│   │   │   ├──integrantes
│   │   │   │   ├──convidar-estudante.tsx
│   │   │   │   ├──integrante-item.tsx
│   │   │   │   └──integrante-list.tsx
│   │   │   ├──tarefas
│   │   │   │   ├──criar-tarefa-button.tsx
│   │   │   │   ├──tarefa-card.tsx
│   │   │   │   └──tarefa-list.tsx
│   │   │   ├──ui
│   │   │   │   ├──date-selector.tsx
│   │   │   │   └──search-bar.tsx
│   │   │   └──turma-aberta-page.tsx
│   │   ├──turmas-aluno
│   │   │   ├──correcoes
│   │   │   │   ├──correcao-item.tsx
│   │   │   │   └──correcao-list.tsx
│   │   │   ├──notificacoes
│   │   │   │   ├──notificacao-card.tsx
│   │   │   │   └──notificacao-list.tsx
│   │   │   ├──tarefas
│   │   │   │   ├──tarefa-ativa-card.tsx
│   │   │   │   └──tarefa-list.tsx
│   │   │   └──turmas-aluno-page.tsx
│   │   ├──turmas-professor
│   │   │   ├──CorrecoesCard.tsx
│   │   │   ├──CriarTurmaCard.tsx
│   │   │   ├──EntrarTurmaCard.tsx
│   │   │   ├──ListaTurmas.tsx
│   │   │   └──turmas-professor-page.tsx
│   │   ├──header.tsx
│   │   ├──loading.tsx
│   │   └──page-transition.tsx
│   ├──constants
│   │   ├──eixos.ts
│   │   └──icons.ts
│   ├──contexts
│   │   ├──admin-context.tsx
│   │   ├──auth-context.tsx
│   │   ├──citacao-context.tsx
│   │   ├──profile-context.tsx
│   │   └──repertorio-context.tsx
│   ├──hooks
│   │   ├──useRepertorioFilters.ts
│   │   ├──useRepertorioForm.tsx
│   │   ├──useTurmaAbertaAluno.ts
│   │   ├──useTurmaData.ts
│   │   └──useTurmasAluno.ts
│   ├──lib
│   │   └──utils.ts
│   └──types
│   │   ├──admin.ts
│   │   ├──profile.ts
│   │   ├──repertorio.ts
│   │   ├──turma.ts
│   │   └──user.ts
├──.github
│   └──PULL_REQUEST_TEMPLATE.md
├──.next
│   ├──cache
│   │   ├──images
│   │   │   ├──5kD5ClMZhcKT5GAqRykCnJwORyWjZkGmVKOSabvVD2Q
│   │   │   │   └──60.1759857317525.e6Bgj5XZGcuGIJ1fqygPs3lTJ7WsJuU_VmG4X-MHXoc.Vy8iMTQ3NGEtMTk5YmY5ZjgyY2Mi.webp
│   │   │   ├──9dGMcsf4wNIXhlGywvtRcixoJWrZtnltj85ctvTCAwQ
│   │   │   │   └──60.1759857307158.6g202xy1lImLbWGUsTJwyq0eoDyDMNQoDs_Dvg9y28c.Vy8iNTFiOS0xOTliZjlmODJjZCI.webp
│   │   │   ├──fa9FYouX_T_upAg1molsXx1usyU-Xr6XyxyqtFv_o6M
│   │   │   │   └──60.1759857307160.1LrFnt7ts5Je33aG2Pp43N7o1j4jRKqELOzbfy8_B_U.Vy8iMTQ3NGEtMTk5YmY5ZjgyY2Mi.webp
│   │   │   ├──GJIO9MjnMwjWKGF12nWO26G17bH0ogHFYLar025NsmA
│   │   │   │   └──60.1759857307159.M0_eT6GfPtib75bgzrg6-ukBMbfAVAytja6GQmG2hQY.Vy8iNzI1Ny0xOTliZjlmODJjYyI.webp
│   │   │   ├──kEQC9mI5f5f7PYcw4jgn3gK1CJL9KKUujnQVHdfDu8A
│   │   │   │   └──60.1759857307159.igSmH65RUfSEojhTFVz3D8kj_nEYhIdOzaacanRyy_c.Vy8iN2IwZC0xOTliZjlmODJjZCI.webp
│   │   │   ├──KxwmFh9BWNgi2fIXOtSUX-ZJxqv6lp7e7bk0JrTPs34
│   │   │   │   └──60.1759857307159.u-lCR54Wf4WZmCrAF5LGP_17z9etHyAPMADj_Hsx09Y.Vy8iNjA5OS0xOTliZjlmODJjZCI.webp
│   │   │   ├──LExsfzwG1p4o-PA9JwIESpI9_HlInVIS52pJafV5Xg4
│   │   │   │   └──60.1759856843597.xK2dvwS3DyelhDVfG_8YlHtHjG49yHiuQjRfhSz1Wpk.Vy8iZGE2ZC0xOTliZjlmODJjNCI.webp
│   │   │   ├──O2xfjzFiLWfIO12ZwrKVDEIFicfAz8pIehYGPYNtG_0
│   │   │   │   └──60.1759857088164.-X9wnXyEvKQn8T5ndlJOMHVvRREAd_2Z6kD95SYSBfI.Vy8iMTEzNmQtMTk5YmY5ZjgyYzQi.webp
│   │   │   ├──oRA-4WBLOBOITSvLc63bfsxyRjNgRyb1khqsP3ojSJI
│   │   │   │   └──60.1759856954054.wW4xfYIb7FAIpkNI-2RcP2VcyTQSevZjMlf1d-VQzcs.Vy8iZGE2ZC0xOTliZjlmODJjNCI.webp
│   │   │   └──tZHvNILUcUfaeWNg6rEdry6JfJOsWobTReqQKM9E1rI
│   │   │   │   └──2592000.1762448790780.RqWGWbYF31dG0z1Lu34v6bLxfXSPX0pIPe8HRLu_0no.IjFmNmU2NDI4MDZkNGIxODdmZTUyNjg4MmVjNDE5Y2YxIg.webp
│   │   ├──swc
│   │   │   └──plugins
│   │   │   │   └──v7_windows_x86_64_8.0.0
│   │   ├──webpack
│   │   │   ├──client-development
│   │   │   │   ├──0.pack.gz
│   │   │   │   ├──1.pack.gz
│   │   │   │   ├──2.pack.gz
│   │   │   │   ├──3.pack.gz
│   │   │   │   ├──4.pack.gz
│   │   │   │   ├──5.pack.gz
│   │   │   │   ├──6.pack.gz
│   │   │   │   ├──7.pack.gz
│   │   │   │   ├──index.pack.gz
│   │   │   │   └──index.pack.gz.old
│   │   │   └──server-development
│   │   │   │   ├──0.pack.gz
│   │   │   │   ├──1.pack.gz
│   │   │   │   ├──2.pack.gz
│   │   │   │   ├──3.pack.gz
│   │   │   │   ├──4.pack.gz
│   │   │   │   ├──5.pack.gz
│   │   │   │   ├──6.pack.gz
│   │   │   │   ├──7.pack.gz
│   │   │   │   ├──8.pack.gz
│   │   │   │   ├──9.pack.gz
│   │   │   │   ├──index.pack.gz
│   │   │   │   └──index.pack.gz.old
│   │   └──.rscinfo
│   ├──server
│   │   ├──app-paths-manifest.json
│   │   ├──interception-route-rewrite-manifest.js
│   │   ├──middleware-build-manifest.js
│   │   ├──middleware-manifest.json
│   │   ├──middleware-react-loadable-manifest.js
│   │   ├──next-font-manifest.js
│   │   ├──next-font-manifest.json
│   │   ├──pages-manifest.json
│   │   ├──server-reference-manifest.js
│   │   └──server-reference-manifest.json
│   ├──static
│   │   ├──chunks
│   │   │   └──polyfills.js
│   │   └──development
│   │   │   ├──_buildManifest.js
│   │   │   └──_ssgManifest.js
│   ├──types
│   │   ├──cache-life.d.ts
│   │   └──package.json
│   ├──app-build-manifest.json
│   ├──build-manifest.json
│   ├──package.json
│   ├──react-loadable-manifest.json
│   └──trace
├──eslint.config.mjs
├──next.config.ts
├──package-lock.json
├──package.json
├──postcss.config.mjs
├──README.md
├──tailwind.config.ts
├──tsconfig.json
└──.gitignore
```