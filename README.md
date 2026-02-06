# Script Helper - H2 Title Extractor

> **[Português](#português)** | **[English](#english)**

---

## English

### Description

**Script Helper** is a web-based tool for extracting H2 titles (marked with `##`) from text and generating:

- **Numbered Lists** - Clean, formatted lists of all titles
- **Excel Files** - Spreadsheets with titles and their content
- **SRT Subtitles** - Subtitle files with automatic timestamps

Perfect for content creators, video producers, and anyone working with scripts or documentation.

### Features

- **Smart Numbering** - Automatically removes existing numbering (1., 2), 3-, etc.) and renumbers correctly
- **Excel Export** - Exports to `.xlsx` files, splitting into parts if over 20 items
- **SRT Generation** - Creates subtitle files with configurable timing
- **Timestamps** - Generates YouTube-ready timestamps for video descriptions
- **Toggle Titles** - Option to include/exclude topic titles in SRT
- **Dark Theme** - Modern, eye-friendly dark interface
- **Toast Notifications** - Elegant feedback for all actions
- **Responsive Design** - Works on desktop and mobile devices

### How to Use

1. **Paste your text** in the input area
2. Use `##` to mark titles (e.g., `## Introduction`)
3. Click the desired action:
   - **Generate List** - Creates a numbered list
   - **Generate Excel** - Downloads an Excel file
   - **Generate SRT** - Creates subtitles and timestamps

### Example Input

```markdown
## Introduction to the Topic
This is the content for the introduction...

## Main Concepts
Here we explore the main concepts...

## Conclusion
Final thoughts and summary...
```

### Installation

No installation required! Simply:

1. Clone or download this repository
2. Open `index.html` in your browser

```bash
git clone https://github.com/yourusername/script-helper.git
cd script-helper
open index.html  # or double-click the file
```

### Project Structure

```
script-helper/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── app.js          # Application logic
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

### Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, animations
- **JavaScript (ES6+)** - Modular, clean code
- **SheetJS** - Excel file generation

### License

MIT License - feel free to use, modify, and distribute.

---

## Português

### Descrição

**Script Helper** é uma ferramenta web para extrair títulos H2 (marcados com `##`) de textos e gerar:

- **Listas Numeradas** - Listas limpas e formatadas de todos os títulos
- **Arquivos Excel** - Planilhas com títulos e seus conteúdos
- **Legendas SRT** - Arquivos de legenda com timestamps automáticos

Perfeito para criadores de conteúdo, produtores de vídeo e qualquer pessoa que trabalhe com roteiros ou documentação.

### Funcionalidades

- **Numeração Inteligente** - Remove automaticamente numeração existente (1., 2), 3-, etc.) e renumera corretamente
- **Exportação Excel** - Exporta para arquivos `.xlsx`, dividindo em partes se houver mais de 20 itens
- **Geração de SRT** - Cria arquivos de legenda com timing configurável
- **Timestamps** - Gera timestamps prontos para descrições de vídeos do YouTube
- **Toggle de Títulos** - Opção para incluir/excluir títulos dos tópicos no SRT
- **Tema Escuro** - Interface moderna e confortável para os olhos
- **Notificações Toast** - Feedback elegante para todas as ações
- **Design Responsivo** - Funciona em desktop e dispositivos móveis

### Como Usar

1. **Cole seu texto** na área de entrada
2. Use `##` para marcar títulos (ex: `## Introdução`)
3. Clique na ação desejada:
   - **Gerar Lista** - Cria uma lista numerada
   - **Gerar Excel** - Faz download de um arquivo Excel
   - **Gerar SRT** - Cria legendas e timestamps

### Exemplo de Entrada

```markdown
## Introdução ao Tema
Este é o conteúdo da introdução...

## Conceitos Principais
Aqui exploramos os conceitos principais...

## Conclusão
Considerações finais e resumo...
```

### Instalação

Não requer instalação! Simplesmente:

1. Clone ou baixe este repositório
2. Abra `index.html` no seu navegador

```bash
git clone https://github.com/yourusername/script-helper.git
cd script-helper
open index.html  # ou clique duas vezes no arquivo
```

### Estrutura do Projeto

```
script-helper/
├── index.html          # Arquivo HTML principal
├── css/
│   └── styles.css      # Folha de estilos
├── js/
│   └── app.js          # Lógica da aplicação
├── README.md           # Este arquivo
└── .gitignore          # Regras de ignore do Git
```

### Tecnologias

- **HTML5** - Marcação semântica
- **CSS3** - Custom properties, Flexbox, animações
- **JavaScript (ES6+)** - Código modular e limpo
- **SheetJS** - Geração de arquivos Excel

### Licença

Licença MIT - sinta-se livre para usar, modificar e distribuir.

---

## Contributing / Contribuindo

Contributions are welcome! Feel free to open issues or submit pull requests.

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou enviar pull requests.

---

Made with care for content creators worldwide.

Feito com carinho para criadores de conteúdo no mundo todo.
