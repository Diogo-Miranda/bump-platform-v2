# SDD — Bump Streaming List
**Feature:** Visualização de streaming por turno
**Data:** 2026-03-29
**Status:** Rascunho — pendente revisão

---

## 1. Visão Geral

A tela **Streaming List** exibe o conteúdo em exibição ao vivo para uma marca específica, organizado por turnos do dia (Manhã, Tarde, Noite). Para cada turno/localidade há uma campanha ativa com preview do conteúdo que está sendo transmitido, contexto climático e ações de gestão.

**Figma ref:** `node-id=614:762` — `Bump - STREAMING LIST`

---

## 2. Rota

```
app/(private)/streaming/[brandId]/page.tsx
```

- Rota privada (protegida por `AuthGuard` via layout)
- Parâmetro `brandId`: identifica a marca cujo streaming é exibido
- Não há sub-rotas nesta feature

---

## 3. Estrutura de Arquivos

### 3.1 Feature

```
app/features/streaming/
├── types.ts
├── services.ts
└── schemas.ts
```

### 3.2 Components

```
app/components/streaming/
├── StreamingOverview.tsx         # container principal da página
├── StreamingPageHeader.tsx       # área: título da marca + seletor de data
├── StreamingFilters.tsx          # linha de pills de filtro
├── StreamingDayPart.tsx          # seção de um turno (Manhã/Tarde/Noite)
├── StreamingContentPreview.tsx   # preview com step 01 (imagem) + step 02 (banner)
└── StreamingActionPills.tsx      # pills de ação do item
```

### 3.3 Rota

```
app/(private)/streaming/
└── [brandId]/
    └── page.tsx
```

---

## 4. Tipos (`features/streaming/types.ts`)

```ts
export type DayPart = 'morning' | 'afternoon' | 'evening'
export type WeatherType = 'sun' | 'rain' | 'cloud'

/**
 * Parametrizable creative displayed in Step 01 of each item.
 * Represents the brand slogan/creative for that time slot.
 */
export interface StreamingCreative {
  imageUrl: string        // background image URL (brand slogan/creative)
  copyText: string        // uppercase text overlaid on the image (time slot slogan)
}

/**
 * Fixed brand banner displayed in Step 02 of each item.
 */
export interface StreamingBrandBanner {
  brandLogoUrl: string
  backgroundUrl: string      // background asset URL (e.g. yellow bg)
  taglineLeft: string        // ex: "A VIDA É AQUI FORA"
  taglineRight: string       // ex: "FEITA DA NATUREZA COM INGREDIENTES 100% NATURAIS"
  taglineLeftColor: string   // hex, ex: "#0070a6"
  taglineRightColor: string  // hex, ex: "#00569e"
}

export interface StreamingItem {
  id: string

  // --- Item header ---
  dayPart: DayPart           // 'morning' | 'afternoon' | 'evening'
  timeRange: string          // ex: "8:00 - 11:59"

  // --- Campaign ---
  campaign: string           // ex: "Dia Mundial do Meio Ambiente"
  weather: string            // ex: "Manhã ensolarada 26ºC"
  weekday: string            // ex: "Sexta-feira"
  location: string           // ex: "São Paulo, SP"
  weatherIcon: WeatherType

  // --- Parametrizable creative (Step 01) ---
  creative: StreamingCreative

  // --- Brand banner (Step 02) ---
  brandBanner: StreamingBrandBanner

  // --- Stats below the preview ---
  activePdvs: number         // ex: 7 → displays "Online em 7 PDV's"
  impressions: string        // ex: "+5k" → displays "Número de impressões +5k"

  // --- Status ---
  status: 'online' | 'offline'
}

export interface StreamingData {
  brandId: string
  brandName: string
  date: string               // ISO date: "2025-10-20"
  items: StreamingItem[]
}

export type StreamingFilter =
  | 'latest'
  | 'network'
  | 'city'
  | 'shift'
  | 'completed'
```

---

## 5. Services (`features/streaming/services.ts`)

```ts
// Main function — fetches streaming data for a brand on a given date
getStreamingByBrand(brandId: string, date?: string): StreamingData

// TODO: replace mock with real API call via proxy (next.config.ts rewrites → BACKEND_URL)
```

**Mock data** deve cobrir 4 itens — espelhando o Figma:

| # | dayPart | campaign | weather | weekday | location | weatherIcon | creative.copyText | activePdvs | impressions |
|---|---------|----------|---------|---------|----------|-------------|-------------------|------------|-------------|
| 1 | morning | Dia Mundial do Meio Ambiente | Manhã ensolarada 26ºC | Sexta-feira | São Paulo, SP | sun | BOM DIA PLANETA. UM BRINDE A VOCÊ, HOJE E SEMPRE. | 7 | +5k |
| 2 | afternoon | Dia Mundial do Meio Ambiente | Tarde nublada com chuva 26ºC | Sexta-feira | São Paulo, SP | rain | SOL BAIXANDO, CONSCIÊNCIA SUBINDO. HOJE O BRINDE É COM A TERRA. | 7 | +5k |
| 3 | evening | Dia Mundial do Meio Ambiente | Noite 26ºC | Sexta-feira | São Paulo, SP | sun | QUE TAL UMA CORONA PARA RELAXAR AO PÔR DO SOL. | 7 | +5k |
| 4 | evening | Dia Mundial do Meio Ambiente | Noite 26ºC | Sexta-feira | Rio de Janeiro, RJ | rain | CALOR NO AR, BRISA DE CONSCIÊNCIA. HOJE, BRINDE PELO PLANETA. | 7 | +5k |

`creative.imageUrl` e campos do `brandBanner` podem usar URLs placeholder no mock.

---

## 6. Schemas (`features/streaming/schemas.ts`)

Não há formulários de input nesta tela na versão inicial.
Reservar o arquivo para validação futura de filtros ou parâmetros de query.

---

## 7. Detalhamento dos Componentes

### 7.1 `page.tsx`

```
- Server Component
- Chama getStreamingByBrand(brandId) → StreamingData
- Passa para <StreamingOverview />
- Sem lógica de UI
```

### 7.2 `StreamingOverview.tsx`

- Server Component
- Fundo branco
- Composição:

```tsx
<div className="relative min-h-screen w-screen bg-white">
  <PageHeader />                          {/* fora do content wrapper */}

  <div className="px-[calc(12.5%+26px)]"> {/* content wrapper — margens iguais */}
    <StreamingPageHeader ... />
    <StreamingFilters ... />
    {data.items.map(item => (
      <StreamingDayPart key={item.id} ... />
    ))}
  </div>

  <PageFooter showActionPills={false} />  {/* fora do content wrapper */}
</div>
```

- Recebe `StreamingData` como prop
- **Não usa `overflow-hidden`** — a página faz scroll vertical para exibir todos os day parts

### 7.3 `StreamingPageHeader.tsx`

**Lado esquerdo (col ~12.5%):**
- Título bipartido:
  - "NOW" — DM Sans Italic, 32px, cor `#075edd`
  - " Streaming" — DM Sans Regular, 32px, preto
  - "/ [brandName]" — segunda linha, 32px, preto
- Subtítulo descritivo — DM Sans Regular, 16px, leading 1.6, largura ~356px

**Lado direito (col ~62.5%-right):**
- Contêiner com borda `#dadada`, border-radius 64px, 506×120px
- Data em texto grande: DM Sans Regular, 64px, alinhado à direita
- Seta de navegação (SVG Vector9) para navegar entre datas

**Props:**
```ts
interface StreamingPageHeaderProps {
  brandName: string
  brandId: string
  description: string
  date: string
}
```

**Nota:** A navegação de data deve ser Client Component pois requer interação.
Isolar a parte interativa em `DateNavigator.tsx` ("use client") dentro desta pasta.

### 7.4 `StreamingFilters.tsx`

- Client Component (estado de filtro ativo)
- Label "FILTROS" — DM Mono Regular, 12px, uppercase
- 5 pills com borda azul (`#075edd`), fundo branco, texto azul, rounded-full:
  - Últimos publicados
  - Rede
  - Cidade
  - Turno
  - Streaming concluídos

**Estado:**
```ts
const [activeFilter, setActiveFilter] = useState<StreamingFilter>('latest')
```

**Props:**
```ts
interface StreamingFiltersProps {
  onFilterChange?: (filter: StreamingFilter) => void
}
```

### 7.5 `StreamingDayPart.tsx`

**Componente central da feature.** Cada instância representa um item de streaming completo e autossuficiente. Todos os dados são recebidos via props — nenhuma prop é opcional no sentido de exibição (tudo sempre aparece).

Estrutura visual:

```
[dayPart label — 64px]                [timeRange — 64px, direita]
─────────────────────────────────────────────────────────────────
|  [linha vertical esquerda]
|
|  [campaign — 32px, underline]
|  [weather + weekday + location — 32px, #d7d7d7]
|
|  [StreamingContentPreview]    ← creative + brandBanner
|
|  [activePdvs + impressions — 16px]
|  [StreamingActionPills]       ← sempre 4 botões, sempre visíveis
|
                                             [weatherIcon — direita]
```

**Props — explícitas e tipadas:**
```ts
interface StreamingDayPartProps {
  // Header
  dayPart: DayPart          // 'morning' | 'afternoon' | 'evening' → display label derived
  timeRange: string         // ex: "8:00 - 11:59"

  // Campaign
  campaign: string          // ex: "Dia Mundial do Meio Ambiente"
  weather: string           // ex: "Manhã ensolarada 26ºC"
  weekday: string           // ex: "Sexta-feira"
  location: string          // ex: "São Paulo, SP"
  weatherIcon: WeatherType  // determines which SVG icon to render

  // Parametrizable creative (Step 01)
  creative: StreamingCreative

  // Brand banner (Step 02)
  brandBanner: StreamingBrandBanner

  // Stats below the preview
  activePdvs: number        // ex: 7 → "Online em 7 PDV's"
  impressions: string       // ex: "+5k" → "Número de impressões +5k"

  // Actions
  itemId: string
  status: 'online' | 'offline'
  onViewAnimation: (id: string) => void
  onSettings: (id: string) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}
```

**Regra:** `StreamingDayPart` **não faz fetch, não tem estado interno**. É um componente puramente de apresentação — Server Component.

**Notas visuais:**
- `StreamingDayPart` renderiza em fluxo normal dentro do content wrapper — sem `position: absolute` relativo ao viewport
- Label do turno: derivado de `dayPart` (`morning` → `Manhã`, `afternoon` → `Tarde`, `evening` → `Noite`)
- Linha vertical: SVG `Line4` rotacionado 90°, 605px de altura, `position: absolute` relativo ao próprio componente (não ao viewport)
- Label turno: DM Sans Regular, 64px, leading 1.08 — coluna esquerda
- Horário: DM Sans Regular, 64px, `text-right` — coluna direita, dentro do wrapper
- `weatherIcon`: posicionado à direita dentro do componente (não ultrapassa a margem direita do wrapper)
- Separação vertical entre seções: `pt-[clamp(60px,8vh,100px)]` entre cada `StreamingDayPart`

### 7.6 `StreamingContentPreview.tsx`

Dois strips horizontais empilhados, fullwidth da área de conteúdo.

**Dimensões fixas do componente:**

| Propriedade | Valor |
|-------------|-------|
| Largura | `w-full` — 100% do content wrapper (≈1244px a 1728px) |
| Altura total | `h-[200px]` (dois strips de 100px cada) |
| Altura por strip | `h-[100px]` |
| Overflow | `overflow-hidden` — obrigatório em ambos os strips e no container pai |

**Step 01 — Criativo da marca (parametrizável por item):**

```tsx
<div className="relative w-full h-[100px] overflow-hidden">
  <img
    src={creative.imageUrl}
    alt=""
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
  <p className="absolute inset-0 flex items-center px-8 text-white uppercase font-bold tracking-tight"
     style={{ fontFamily: 'Antonio', fontSize: 'clamp(20px, 2.34vw, 40px)' }}>
    {creative.copyText}
  </p>
</div>
```

Regras da imagem:
- `object-cover` + `object-center`: a imagem preenche o espaço disponível sem distorcer; se for maior que o container, é recortada pelo centro
- `absolute inset-0 w-full h-full`: garante que a imagem nunca ultrapasse os limites do strip
- `overflow-hidden` no container pai: garante o corte mesmo se o browser ignorar as dimensões do `img`
- O resize é automático — nenhum asset precisa ser pré-processado antes de ser passado como prop

**Step 02 — Banner da marca:**

```tsx
<div className="relative w-full h-[100px] overflow-hidden">
  <img
    src={brandBanner.backgroundUrl}
    alt=""
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
  <div className="absolute inset-0 flex items-center justify-between px-8">
    <span style={{ color: brandBanner.taglineLeftColor, fontFamily: 'Antonio', fontSize: '21px' }}>
      {brandBanner.taglineLeft}
    </span>
    <img src={brandBanner.brandLogoUrl} alt="brand logo" className="h-[64px] w-auto object-contain flex-shrink-0" />
    <span style={{ color: brandBanner.taglineRightColor, fontFamily: 'Antonio', fontSize: '21px' }} className="text-right">
      {brandBanner.taglineRight}
    </span>
  </div>
</div>
```

Logo da marca:
- `h-[64px] w-auto object-contain`: a logo é redimensionada para caber na altura do strip sem distorcer
- `flex-shrink-0`: a logo não comprime mesmo com taglines longas

**Props:**
```ts
interface StreamingContentPreviewProps {
  creative: StreamingCreative
  brandBanner: StreamingBrandBanner
}
```

**Regra geral:** Nenhum elemento dentro de `StreamingContentPreview` pode crescer além de `h-[200px]` ou `w-full`. Todo conteúdo extravazante (imagem maior, texto longo) é contido por `overflow-hidden` + `object-cover`/`object-contain` conforme o tipo do elemento.

### 7.7 `StreamingActionPills.tsx`

Linha de **exatamente 4 pills**, sempre visíveis em todos os itens — sem renderização condicional de quais aparecem.

| Pill | Label fixo | Ação |
|------|-----------|------|
| 1 | VER ANIMAÇÃO | `onViewAnimation(itemId)` |
| 2 | CONFIGURAÇÕES | `onSettings(itemId)` |
| 3 | DELETAR | `onDelete(itemId)` |
| 4 | TORNAR OFFLINE ou TORNAR ONLINE | `onToggleStatus(itemId)` — label alterna conforme `status` |

Estilo: `bg-[#f2f2f2]`, `rounded-full`, `px-8 py-6`, texto DM Mono 16px uppercase preto.

**Props:**
```ts
interface StreamingActionPillsProps {
  itemId: string
  status: 'online' | 'offline'
  onViewAnimation: (id: string) => void
  onSettings: (id: string) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}
```

**Regra:** Este componente é Client Component (`"use client"`) por receber handlers de evento.
Na versão inicial (mock), os handlers podem logar no console.

---

## 8. Ícones de Clima

Dois SVGs inline (já existentes no Figma como assets vetoriais):

| Tipo | Componente |
|------|-----------|
| `sun` | `WeatherSunIcon` — sol com raios ao redor |
| `rain` | `WeatherRainIcon` — nuvem com gotas |

Criar em `app/components/ui/icons/` como Server Components SVG inline.
Tamanho: 24×24px (aspect ratio 1:1).

---

## 9. Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| "NOW" no título | DM Sans Italic | 32px | Regular | `#075edd` |
| Título / Turno / Horário | DM Sans | 32-64px | Regular | preto |
| Subtítulo | DM Sans | 16px | Regular | preto |
| Data | DM Sans | 64px | Regular | preto |
| Contexto climático | DM Sans | 32px | Regular | `#d7d7d7` |
| Labels filtros/pills ação | DM Mono | 12-16px | Regular | variável |
| Copy step 01 | Antonio | ~40px | Bold | branco |
| Taglines step 02 | Antonio | ~21px | Bold | azul |
| Footer | DM Mono | 12px | Regular | preto |

**Nota:** DM Mono e DM Sans já são usados no projeto. Antonio Bold precisa ser verificado/adicionado.

---

## 10. Layout e Responsividade

### 10.1 Referências

- Tela de referência: `1728×1117`
- Usar `clamp()` para sizing responsivo conforme padrão do projeto
- Fundo: `bg-white`

### 10.2 Content Wrapper — regra central de layout

Todo o conteúdo da página (exceto `PageHeader` e `PageFooter`) **deve estar dentro de um único wrapper** com margens horizontais iguais em ambos os lados:

```tsx
<div className="px-[calc(12.5%+26px)]">
  {/* StreamingPageHeader, StreamingFilters, lista de StreamingDayPart */}
</div>
```

| Propriedade | Valor |
|-------------|-------|
| Padding horizontal (left = right) | `calc(12.5% + 26px)` |
| Margem a 1728px | ≈ 242px cada lado |
| Área de conteúdo a 1728px | ≈ 1244px |

**Regra:** Nenhum elemento de conteúdo deve ultrapassar essa margem ou usar `left`/`right` absolutos que gerem assimetria. Posicionamento absoluto dentro dos componentes pode ser usado, mas relativo ao wrapper — nunca relativo ao viewport.

### 10.3 Elementos fora do wrapper (exceções permitidas)

| Elemento | Motivo |
|----------|--------|
| `PageHeader` | `absolute top-8 left-8 right-8` — padrão existente do projeto |
| `PageFooter` | Posicionamento absoluto existente — não alterar |

### 10.4 Grid interno

Dentro do content wrapper, usar grid de 8 colunas implícitas baseado em `%` relativo à área interna (não ao viewport):

- Col 1 = `12.5%` da área de conteúdo → elementos secundários como ícone de clima
- Conteúdo principal (`campaign`, `weather`, previews, stats, pills) ocupa da col 1 até a col 7
- Horário (`timeRange`) alinhado à direita da col 8

---

## 11. Integração com Layout Existente

- `PageHeader` (existente) → reutilizar diretamente. Já contém: B Logo + HeaderButtons (BUMPER.AI pill + NS avatar)
- `PageFooter` (existente) → reutilizar com `showActionPills={false}`
- Não duplicar nenhuma lógica de header/footer

---

## 12. Checklist de Implementação

### Feature
- [ ] `app/features/streaming/types.ts`
- [ ] `app/features/streaming/services.ts` (com mock)
- [ ] `app/features/streaming/schemas.ts` (vazio, reservado)

### Components
- [ ] `app/components/streaming/StreamingOverview.tsx`
- [ ] `app/components/streaming/StreamingPageHeader.tsx`
- [ ] `app/components/streaming/DateNavigator.tsx` ("use client")
- [ ] `app/components/streaming/StreamingFilters.tsx` ("use client")
- [ ] `app/components/streaming/StreamingDayPart.tsx` — Server Component, props explícitas
- [ ] `app/components/streaming/StreamingContentPreview.tsx` — creative + brandBanner como props
- [ ] `app/components/streaming/StreamingActionPills.tsx` — Client Component, sempre 4 pills
- [ ] `app/components/ui/icons/WeatherSunIcon.tsx`
- [ ] `app/components/ui/icons/WeatherRainIcon.tsx`

### Rota
- [ ] `app/(private)/streaming/[brandId]/page.tsx`

### Assets
- [ ] Verificar se fonte Antonio Bold está disponível / adicionar ao projeto
- [ ] Imagens de conteúdo virão da API (não são assets estáticos)

---

## 13. Questões em Aberto

| # | Questão | Impacto |
|---|---------|---------|
| 1 | A navegação de data (seta no date picker) redireciona para a mesma rota com query param `?date=YYYY-MM-DD` ou recarrega via server action? | Afeta DateNavigator e page.tsx |
| 2 | Os filtros (Rede, Cidade, Turno) abrem um dropdown/modal ou são navegação direta? | Afeta StreamingFilters |
| 3 | "VER ANIMAÇÃO" abre um modal overlay ou navega para uma rota específica? | Afeta StreamingActionPills e estrutura de rotas |
| 4 | "DELETAR" e "TORNAR OFFLINE" são mutações diretas ou precisam de confirmação modal? | Afeta UX e estado |
| 5 | A imagem do Step 01 (`creative.imageUrl`) e o asset de fundo do Step 02 (`brandBanner.backgroundUrl`) virão de URL da API ou de assets estáticos do projeto? | Afeta services.ts e StreamingContentPreview |
| 6 | Quantos day parts/itens máximos por página? Há paginação ou scroll infinito? | Afeta layout e performance |
| 7 | A fonte Antonio Bold já está importada em algum outro contexto do projeto? | Afeta globals.css / next/font |
