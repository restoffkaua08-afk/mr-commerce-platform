# README — MR Commerce Platform

<div align="center">

<img
width="100%"
src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:FFFFFF,45:F8F4E8,100:C9A227&text=MR%20COMMERCE%20PLATFORM&fontColor=202124&fontSize=42&fontAlignY=38&animation=fadeIn&desc=FULL-STACK%20E-COMMERCE%20PLATFORM&descAlignY=59&descSize=15"
/>

<br>

<img
src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=2800&pause=900&color=B08D21&center=true&vCenter=true&width=850&lines=Plataforma+Full+Stack;Next.js+%E2%80%A2+TypeScript+%E2%80%A2+Fastify+%E2%80%A2+MySQL;Cat%C3%A1logo+e+descoberta+de+produtos;Frontend+%2B+API+%2B+Banco+de+Dados;Construindo+uma+experi%C3%AAncia+de+e-commerce+moderna"
/>

<br>

**Uma plataforma de comércio digital construída com foco em experiência, organização e evolução arquitetural.**

<br>

![Status](https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-C9A227?style=for-the-badge\&labelColor=F8F4E8)
![Full Stack](https://img.shields.io/badge/PROJETO-FULL%20STACK-B08D21?style=for-the-badge\&labelColor=F8F4E8)
![MR](https://img.shields.io/badge/MR-COMMERCE%20PLATFORM-202124?style=for-the-badge\&labelColor=C9A227)

</div>

<br>

# `> PROJECT.OVERVIEW`

## MR Commerce Platform

A **MR Commerce Platform** é uma aplicação web full-stack criada para explorar a construção de uma plataforma moderna de comércio digital.

O projeto combina uma interface própria com uma arquitetura separada entre **frontend, backend e banco de dados**, permitindo que cada camada possa evoluir de maneira independente.

Mais do que desenvolver uma interface visual, o objetivo deste projeto é aplicar conceitos reais de desenvolvimento de software, como:

* arquitetura cliente-servidor;
* APIs;
* organização modular;
* banco de dados;
* validação;
* segurança;
* testes;
* responsividade;
* integração entre sistemas;
* evolução incremental de software.

A plataforma permanece em desenvolvimento e funciona atualmente como um **MVP técnico**, servindo como base para novas funcionalidades e integrações.

<br>

<div align="center">

![Next.js](https://img.shields.io/badge/FRONTEND-NEXT.JS-C9A227?style=for-the-badge\&labelColor=202124)
![Fastify](https://img.shields.io/badge/BACKEND-FASTIFY-C9A227?style=for-the-badge\&labelColor=202124)
![MySQL](https://img.shields.io/badge/DATABASE-MYSQL-C9A227?style=for-the-badge\&labelColor=202124)

</div>

<br>

# `> PROJECT.PREVIEW`

<div align="center">

### Interface da plataforma

<br>

<img
width="95%"
src="./.github/assets/home.png"
alt="MR Commerce Platform - Página Inicial"
/>

<br><br>

> **Preview real da interface da MR Commerce Platform.**

</div>

<br>

## Exploração de produtos

<div align="center">

<img
width="95%"
src="./.github/assets/catalogo.png"
alt="MR Commerce Platform - Catálogo"
/>

</div>

<br>

> Os arquivos das imagens devem ser adicionados em `.github/assets/` para que os previews sejam exibidos corretamente no GitHub.

<br>

# `> SYSTEM.FEATURES`

## Funcionalidades atuais

A plataforma já possui uma estrutura funcional voltada à descoberta e organização de produtos.

### Catálogo

* Listagem de produtos
* Consulta de produtos
* Exploração do catálogo
* Organização por categorias
* Organização por marcas
* Consulta individual de produtos
* Comunicação entre frontend e API

### Interface

* Layout responsivo
* Identidade visual própria
* Navegação estruturada
* Componentização
* Sistema de favoritos
* Gerenciamento de tema
* Páginas institucionais
* Estrutura preparada para evolução

### API

* API HTTP construída com Fastify
* Arquitetura modular
* Rotas de catálogo
* Rotas de produtos
* Módulo de afiliados
* Validação de dados
* Comunicação com banco MySQL
* Health Check
* CORS
* Rate Limiting
* Headers de segurança
* Configuração por variáveis de ambiente

### Engenharia

* TypeScript
* ESLint
* Testes automatizados
* Testes de integração
* Vitest
* Scripts de desenvolvimento
* Build separado entre frontend e backend

<br>

# `> SYSTEM.ARCHITECTURE`

<div align="center">

### Arquitetura da aplicação

</div>

```text
                         ┌─────────────────────────┐
                         │        USUÁRIO          │
                         │                         │
                         │    Browser / Mobile     │
                         └────────────┬────────────┘
                                      │
                                      ▼
                 ┌─────────────────────────────────────┐
                 │              FRONTEND               │
                 │                                     │
                 │       Next.js + React + TypeScript  │
                 │                                     │
                 │     Interface • Navegação • UX      │
                 └──────────────────┬──────────────────┘
                                    │
                                    │ HTTP / API
                                    ▼
                 ┌─────────────────────────────────────┐
                 │               BACKEND               │
                 │                                     │
                 │       Node.js + Fastify + Zod       │
                 │                                     │
                 │       API • Regras • Validação      │
                 └──────────────────┬──────────────────┘
                                    │
                                    ▼
                 ┌─────────────────────────────────────┐
                 │              DATABASE               │
                 │                                     │
                 │                MySQL                │
                 │                                     │
                 │        Produtos • Catálogo          │
                 └─────────────────────────────────────┘
```

A separação entre as camadas permite desenvolver, testar e evoluir cada parte do sistema com menor acoplamento.

<br>

# `> CORE.TECH_STACK`

<div align="center">

### Linguagens

<img src="https://skillicons.dev/icons?i=ts,js,html,css&theme=light" />

<br><br>

### Front-end

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind&theme=light" />

<br><br>

### Back-end

<img src="https://skillicons.dev/icons?i=nodejs,ts&theme=light" />

<br><br>

### Banco de Dados

<img src="https://skillicons.dev/icons?i=mysql&theme=light" />

<br><br>

### Ferramentas

<img src="https://skillicons.dev/icons?i=git,github,vscode,npm&theme=light" />

</div>

<br>

# `> STACK.DETAILS`

## Front-end

| Tecnologia       | Aplicação                            |
| ---------------- | ------------------------------------ |
| **Next.js**      | Framework principal da aplicação web |
| **React**        | Construção da interface              |
| **TypeScript**   | Tipagem estática                     |
| **Tailwind CSS** | Estilização da interface             |
| **Lucide React** | Sistema de ícones                    |
| **next-themes**  | Gerenciamento de tema                |

<br>

## Back-end

| Tecnologia     | Aplicação                              |
| -------------- | -------------------------------------- |
| **Node.js**    | Runtime do servidor                    |
| **Fastify**    | Construção da API                      |
| **TypeScript** | Tipagem e desenvolvimento              |
| **Zod**        | Validação de dados                     |
| **MySQL2**     | Comunicação com MySQL                  |
| **dotenv**     | Gerenciamento de variáveis de ambiente |
| **Vitest**     | Testes automatizados                   |

<br>

## Banco de Dados

A persistência da aplicação utiliza:

<div align="center">

<img src="https://skillicons.dev/icons?i=mysql&theme=light" />

### MySQL

</div>

O banco armazena os dados utilizados pelos módulos de catálogo e produtos da aplicação.

<br>

# `> PROJECT.STRUCTURE`

```text
mr-commerce-platform/
│
├── web/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── tests/
│   └── package.json
│
├── server/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── database/
│   │   │
│   │   ├── modules/
│   │   │   ├── affiliate/
│   │   │   ├── catalog/
│   │   │   └── products/
│   │   │
│   │   ├── routes/
│   │   └── server.ts
│   │
│   ├── tests/
│   └── package.json
│
├── .github/
│   └── assets/
│       ├── home.png
│       └── catalogo.png
│
├── INSTALAR-MR.ps1
├── INICIAR-MR.ps1
├── PARAR-MR.ps1
├── VALIDAR-MR.ps1
│
└── package.json
```

<br>

# `> GETTING.STARTED`

## Executando o projeto localmente

### Pré-requisitos

Antes de começar, tenha instalado:

* Node.js
* npm
* MySQL
* Git

<br>

## 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/mr-commerce-platform.git
```

Entre no projeto:

```bash
cd mr-commerce-platform
```

<br>

## 2. Instale as dependências

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd ../web
npm install
```

<br>

## 3. Configure o ambiente

O projeto utiliza variáveis de ambiente para configurações locais e informações sensíveis.

Utilize os arquivos `.env.example` existentes no projeto como referência.

```text
.env.example
      │
      ▼
.env.local
```

> Nunca publique senhas, credenciais, tokens ou arquivos `.env` reais no GitHub.

<br>

## 4. Inicie o backend

```bash
cd server
npm run dev
```

<br>

## 5. Inicie o frontend

Abra outro terminal:

```bash
cd web
npm run dev
```

A aplicação poderá então ser acessada pelo endereço informado pelo Next.js no terminal.

Normalmente:

```text
http://localhost:3000
```

<br>

# `> DEVELOPMENT.WORKFLOW`

O projeto também possui scripts auxiliares para facilitar o ambiente local.

```text
INSTALAR-MR.ps1
```

Responsável por auxiliar na instalação/configuração do ambiente.

```text
INICIAR-MR.ps1
```

Responsável pela inicialização da aplicação.

```text
PARAR-MR.ps1
```

Responsável por interromper os serviços relacionados ao projeto.

```text
VALIDAR-MR.ps1
```

Utilizado para auxiliar na validação do ambiente e do sistema.

<br>

# `> QUALITY.ASSURANCE`

## Testes

### Backend

```bash
npm --prefix server test
```

### Frontend

```bash
npm --prefix web test
```

### Projeto

```bash
npm run test
```

<br>

## Lint

```bash
npm run lint
```

<br>

## Build

```bash
npm run build
```

Essas verificações ajudam a manter maior consistência e confiabilidade durante a evolução da aplicação.

<br>

# `> SECURITY`

O projeto utiliza algumas práticas importantes para desenvolvimento de aplicações web.

Entre elas:

* Variáveis de ambiente
* Validação de dados
* CORS
* Rate Limiting
* Headers de segurança
* Separação entre frontend e backend
* Validação de entradas
* Arquivos sensíveis fora do versionamento

### Importante

Nunca envie para o GitHub:

```text
.env
.env.local
senhas
tokens
chaves privadas
credenciais de banco
```

Utilize somente arquivos como:

```text
.env.example
```

para documentar as variáveis necessárias.

<br>

# `> PROJECT.ROADMAP`

A MR Commerce Platform está em evolução.

### Próximas etapas

* [ ] Evoluir a página individual de produtos
* [ ] Implementar carrinho de compras
* [ ] Criar autenticação de usuários
* [ ] Desenvolver área do cliente
* [ ] Implementar sistema de pedidos
* [ ] Desenvolver checkout
* [ ] Integrar meios de pagamento
* [ ] Integrar fornecedores
* [ ] Implementar acompanhamento de pedidos
* [ ] Criar painel administrativo
* [ ] Evoluir sistema de favoritos
* [ ] Adicionar avaliações
* [ ] Melhorar mecanismos de busca e filtros
* [ ] Preparar ambiente de produção
* [ ] Realizar deploy público

> Os itens do roadmap representam funcionalidades planejadas e não necessariamente recursos disponíveis na versão atual.

<br>

# `> ENGINEERING.PRINCIPLES`

> **Uma boa interface chama atenção. Uma boa arquitetura permite que ela continue evoluindo.**

A MR Commerce Platform foi construída considerando alguns princípios:

### Organização

Manter responsabilidades separadas e uma estrutura compreensível.

### Modularidade

Permitir que funcionalidades evoluam sem transformar toda alteração em uma reescrita do sistema.

### Experiência

Tecnologia deve servir à experiência do usuário, e não o contrário.

### Evolução

O projeto não precisa nascer com todas as funcionalidades.

Precisa possuir uma base capaz de receber as próximas.

<br>

# `> PROJECT.STATUS`

<div align="center">

### 🚧 Desenvolvimento ativo

A **MR Commerce Platform** atualmente representa um MVP técnico em evolução.

<br>

![Development](https://img.shields.io/badge/STATUS-DESENVOLVIMENTO%20ATIVO-C9A227?style=for-the-badge\&labelColor=202124)
![Architecture](https://img.shields.io/badge/ARQUITETURA-FULL%20STACK-B08D21?style=for-the-badge\&labelColor=202124)

<br>

O objetivo é continuar transformando a plataforma em uma aplicação cada vez mais completa, robusta e próxima de um ambiente real de produção.

</div>

<br>

# `> DEVELOPER`

<div align="center">

## Desenvolvido por Kauã Restoff

Projeto desenvolvido como parte da evolução prática em **Desenvolvimento Full Stack e Engenharia de Software**.

<br>

<a href="https://github.com/restoffkaua08-afk">
  <img
    src="https://img.shields.io/badge/GitHub-restoffkaua08--afk-202124?style=for-the-badge&logo=github&logoColor=white"
    alt="GitHub - Kauã Restoff"
  />
</a>

 

<a href="https://www.linkedin.com/in/kau%C3%A3-restoff-2821163a0">
  <img
    src="https://img.shields.io/badge/LinkedIn-Kauã%20Restoff-C9A227?style=for-the-badge&logo=linkedin&logoColor=white"
    alt="LinkedIn - Kauã Restoff"
  />
</a>

 

<a href="https://restoff-dev.vercel.app">
  <img
    src="https://img.shields.io/badge/PORTFÓLIO-ABRIR-B08D21?style=for-the-badge&labelColor=202124"
    alt="Portfólio - Kauã Restoff"
  />
</a>

</div>

<br>

---

<br>

<div align="center">

## `BUILD • TEST • EVOLVE`

**Construindo uma plataforma preparada para evoluir.**

<br>

`NEXT.JS` • `REACT` • `TYPESCRIPT` • `FASTIFY` • `MYSQL`

<br><br>

<img
src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&duration=3000&pause=1000&color=B08D21&center=true&vCenter=true&width=800&lines=Interface+%2B+API+%2B+Banco+de+Dados;Arquitetura+pensada+para+evoluir;MR+Commerce+Platform"
/>

<br><br>

![Status](https://img.shields.io/badge/STATUS-CONSTRUINDO%20A%20PRÓXIMA%20VERSÃO-C9A227?style=flat-square\&labelColor=202124)

<br><br>

**MR Commerce Platform © 2026**

<br>

**Desenvolvido por Kauã Restoff**

<br><br>

<img
width="100%"
src="https://capsule-render.vercel.app/api?type=waving&height=120&section=footer&color=0:C9A227,50:F8F4E8,100:FFFFFF"
/>

</div>
