# Tardezinha do Tavão 🍻

Convite digital responsivo e surpreendente para o evento "Tardezinha do Tavão" - Open Cooler.

## 🚀 Como usar

### Instalação

```bash
yarn
```

### Desenvolvimento

```bash
yarn dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para produção

```bash
yarn build
```

Os arquivos otimizados estarão na pasta `dist/`, prontos para deploy em Vercel, Netlify, ou qualquer plataforma estática.

## ⚙️ Personalização rápida

### Adicionar música de fundo

1. Coloque seu arquivo MP3 na pasta `public/` com o nome `musica.mp3`
2. Ou altere o nome do arquivo no componente `src/components/BackgroundMusic.jsx` (linha 58)

```jsx
<source src="/musica.mp3" type="audio/mpeg" />
// Altere para o nome do seu arquivo, ex: "/minha-musica.mp3"
```

### Alterar dados do evento

Edite o arquivo `src/App.jsx`:

```jsx
// Linha 17
const MAP_LINK = 'https://share.google/dEN6sGfzkz9miqL1N'

// Componente InfoCard (linhas 32-50)
<InfoCard
  icon="📅"
  label="Data"
  value="31/01/2026"  // ← Altere aqui
  delay={0.4}
/>
<InfoCard
  icon="🕐"
  label="Horário"
  value="18:00"  // ← Altere aqui
  delay={0.5}
/>
<InfoCard
  icon="📍"
  label="Local"
  value="Padre João Batista, 278"  // ← Altere aqui
  delay={0.6}
/>
```

### Alterar textos

- **Título do evento**: `src/components/Hero.jsx` (linha 11)
- **Subtítulo**: `src/components/Hero.jsx` (linha 20)
- **Rodapé**: `src/App.jsx` (linha 76)
- **Seção "Como funciona"**: `src/components/OpenCoolerSection.jsx` (linhas 8-25)

### Alterar link do mapa

Altere a constante `MAP_LINK` no arquivo `src/App.jsx` (linha 17).

## 🎨 Tecnologias

- **React 18** - Biblioteca UI
- **Vite** - Build tool moderna e rápida
- **TailwindCSS** - Estilização utility-first
- **Framer Motion** - Animações suaves
- **Canvas API** - Efeito de aurora animado

## 📱 Responsividade

O projeto é totalmente responsivo, testado para:
- Mobile: 360px+
- Tablet: 768px+
- Desktop: 1024px+
- Ultrawide: 1920px+

## ♿ Acessibilidade

- Contraste adequado
- Foco visível em elementos interativos
- Labels e aria-labels apropriados
- Respeita `prefers-reduced-motion`
- Navegação por teclado funcional

## 📦 Deploy

### Vercel

```bash
yarn build
vercel --prod
```

### Netlify

1. Conecte seu repositório
2. Build command: `yarn build`
3. Publish directory: `dist`

### Outros

O build gera arquivos estáticos na pasta `dist/` que podem ser servidos por qualquer servidor web estático.

## 🎯 Características

- ✨ Efeito de aurora animado em canvas
- 📱 Design mobile-first totalmente responsivo
- 🎨 Paleta de cores inspirada em pôr do sol + neon
- ⚡ Performance otimizada
- ♿ Acessibilidade básica implementada
- 🎭 Microinterações com Framer Motion
- 📋 Modal de confirmação com cópia para WhatsApp

---

Feito com ❤️ para a Tardezinha do Tavão

# niver
# niver
