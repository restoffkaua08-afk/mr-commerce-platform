# MR Commerce Platform — README

<div align="center">

<img src="./assets/readme/banner-top.svg" width="100%" alt="MR Commerce Platform" />

<br/>

<img src="./web/public/brand/mr-monogram-gold.png" width="110" alt="Logo MR" />

# MR Commerce Platform

### Plataforma full-stack para descoberta e organização de produtos

**Next.js • React • TypeScript • Fastify • MySQL**

<br/>

> Uma plataforma web desenvolvida para oferecer uma experiência moderna, organizada e escalável de descoberta de produtos.

</div>

---

## ✦ Sobre o projeto

A **MR Commerce Platform** é uma aplicação web full-stack desenvolvida com foco em arquitetura organizada, experiência de usuário e evolução contínua.

O projeto separa claramente a interface web da API responsável pelas regras de negócio e acesso aos dados.

A plataforma possui estrutura para catálogo de produtos, exploração por categorias e marcas, favoritos e integração com dados de produtos por meio de uma API própria.

Este repositório representa também a evolução prática de conhecimentos em desenvolvimento full-stack, arquitetura de aplicações web, APIs, bancos de dados e organização de projetos.

---

## ◈ Visão do sistema

<div align="center">

<img src="./assets/readme/screenshot-home.png" width="90%" alt="Página inicial da MR Commerce Platform" />

</div>

---

## ✦ Funcionalidades

### Catálogo

* Listagem de produtos
* Consulta de produtos
* Página de detalhes
* Organização por categorias
* Organização por marcas
* Área de exploração de produtos

### Experiência

* Interface responsiva
* Navegação estruturada
* Sistema de favoritos
* Tema da aplicação
* Identidade visual própria da MR
* Páginas institucionais e legais

### Backend

* API construída com Fastify
* Arquitetura modular
* Validação de dados com Zod
* Integração com MySQL
* Rotas de catálogo
* Rotas de produtos
* Módulo de afiliados
* Health check da API
* Rate limiting
* CORS
* Headers de segurança
* Variáveis de ambiente

### Qualidade

* TypeScript
* ESLint
* Testes de integração
* Vitest
* Scripts de validação
* Build independente de frontend e backend

---

## ◈ Arquitetura

```text
┌──────────────────────────────┐
│          USUÁRIO             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       FRONTEND / WEB         │
│                              │
│ Next.js + React + TypeScript │
└──────────────┬───────────────┘
               │
               │ HTTP / API
               ▼
┌──────────────────────────────┐
│           API                │
│                              │
│ Fastify + TypeScript + Zod   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          MySQL               │
│                              │
│ Produtos • Catálogo • Dados  │
└──────────────────────────────┘
```

A separação entre **frontend**, **backend** e **banco de dados** facilita manutenção, testes e futuras evoluções da plataforma.

---

## ✦ Tecnologias

### Frontend

| Tecnologia   | Utilização                |
| ------------ | ------------------------- |
| Next.js      | Framework principal       |
| React        | Construção da interface   |
| TypeScript   | Tipagem e desenvolvimento |
| Tailwind CSS | Estilização               |
| Lucide React | Ícones                    |
| next-themes  | Gerenciamento de tema     |

### Backend

| Tecnologia | Utilização                  |
| ---------- | --------------------------- |
| Node.js    | Runtime                     |
| Fastify    | API HTTP                    |
| TypeScript | Desenvolvimento do servidor |
| Zod        | Validação de dados          |
| MySQL2     | Comunicação com MySQL       |
| dotenv     | Variáveis de ambiente       |
| Vitest     | Testes                      |

### Banco de dados

**MySQL**

Responsável pela persistência dos dados utilizados pelo catálogo e pelos módulos da plataforma.

---

## ◈ Estrutura do projeto

```text
mr-commerce-platform/
│
├── web/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── tests/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── database/
│   │   ├── modules/
│   │   │   ├── affiliate/
│   │   │   ├── catalog/
│   │   │   └── products/
│   │   ├── routes/
│   │   └── server.ts
│   ├── tests/
│   └── package.json
│
├── INSTALAR-MR.ps1
├── INICIAR-MR.ps1
├── PARAR-MR.ps1
├── VALIDAR-MR.ps1
└── package.json
```

---

## ✦ Executando localmente

### Pré-requisitos

Tenha instalado:

* Node.js
* npm
* MySQL
* Git

Clone o projeto:

```bash
git clone SEU_REPOSITORIO_AQUI
cd mr-commerce-platform
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

Em outro terminal:

```bash
cd web
npm install
npm run dev
```

A aplicação web ficará disponível localmente na porta configurada pelo Next.js.

---

## ◈ Variáveis de ambiente

O projeto possui arquivos `.env.example` para documentar as configurações necessárias.

Crie seus arquivos locais a partir dos exemplos disponíveis.

```text
.env.example
        ↓
.env.local
```

> **Importante:** arquivos contendo credenciais, senhas e outras informações privadas não devem ser enviados ao repositório.

---

## ✦ Testes e validação

Backend:

```bash
npm --prefix server test
```

Frontend:

```bash
npm --prefix web test
```

Verificação geral:

```bash
npm run test
```

Verificação de tipos e lint:

```bash
npm run lint
```

Build completo:

```bash
npm run build
```

---

## ◈ Roadmap

A MR Commerce Platform continuará evoluindo.

Entre as próximas possibilidades estão:

* [ ] Evolução da página individual de produtos
* [ ] Sistema de carrinho
* [ ] Autenticação de usuários
* [ ] Área do cliente
* [ ] Checkout
* [ ] Integração com meios de pagamento
* [ ] Sistema de pedidos
* [ ] Integração com fornecedores
* [ ] Rastreamento de pedidos
* [ ] Painel administrativo
* [ ] Deploy em ambiente de produção

O roadmap representa possibilidades planejadas e não funcionalidades já disponíveis na versão atual.

---

## ✦ Princípios do projeto

> **Organização antes de complexidade.**

> **Experiência antes de excesso de funcionalidades.**

> **Arquitetura preparada para evolução.**

A MR foi desenvolvida pensando não apenas na interface atual, mas na possibilidade de evolução gradual da plataforma.

---

## ◈ Status

**Em desenvolvimento ativo.**

Este projeto representa um MVP e continuará recebendo melhorias, novas funcionalidades e refinamentos arquiteturais.

---

<div align="center">

### MR Commerce Platform

**Construindo experiências digitais com identidade, tecnologia e propósito.**

<img src="./assets/readme/banner-bottom.svg" width="100%" alt="MR Commerce Platform" />

</div>
