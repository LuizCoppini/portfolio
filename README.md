# Luiz Coppini — Portfolio

Portfólio pessoal desenvolvido em React + Vite, hospedado gratuitamente no GitHub Pages.

## 🚀 Como usar

### 1. Clone / fork este repositório

```bash
git clone https://github.com/LuizCoppini/portfolio.git
cd portfolio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode localmente

```bash
npm run dev
```

### 4. Personalize o conteúdo

Edite o objeto `DATA` no topo do arquivo `src/App.jsx`:
- Projetos, competições, seminários
- Links do LinkedIn, GitHub, e-mail
- Link do currículo

### 5. Configure o `vite.config.js`

- Se o repositório for `github.com/LuizCoppini/portfolio`, defina `base: "/portfolio/"`
- Se for `github.com/LuizCoppini/LuizCoppini.github.io`, deixe `base: "/"`

### 6. Deploy automático com GitHub Actions

O arquivo `.github/workflows/deploy.yml` já está configurado.

**Ative o GitHub Pages:**
1. Vá em **Settings → Pages**
2. Em "Source", selecione **GitHub Actions**
3. Faça um push para `main` — o deploy acontece automaticamente!

## 🛠 Tecnologias

- React 18
- Vite 5
- 100% CSS-in-JS (sem dependências de UI)
- Fontes: Syne + JetBrains Mono (Google Fonts)
- Deploy: GitHub Pages via Actions

## 📁 Estrutura

```
portfolio/
├── .github/workflows/deploy.yml   # CI/CD automático
├── src/
│   ├── App.jsx                    # Todo o código (dados + componentes)
│   └── main.jsx                   # Entry point
├── index.html
├── vite.config.js
└── package.json
```
