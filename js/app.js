/**
 * Script Helper - Main Application
 * =================================
 * H2 Title Extractor for Lists, Excel, and SRT files
 *
 * @author Script Helper
 * @version 2.0.0
 * @license MIT
 *
 * Table of Contents:
 * 1. Toast Notification System
 * 2. Text Processing Utilities
 * 3. Timestamp Utilities
 * 4. List Generation
 * 5. Excel Export
 * 6. SRT Generation
 * 7. Event Handlers
 * 8. Initialization
 */

'use strict';

/* =============================================================================
   0. Internationalization (i18n)
   Internacionalização (i18n)
   ========================================================================== */

const i18n = {
  currentLang: 'en',

  translations: {
    en: {
      subtitle: 'H2 Title Extractor',
      description: 'Extract titles marked with <code>##</code> and generate lists, Excel, or SRT files',
      inputPlaceholder: 'Paste your text here... Use ## to mark titles',
      outputPlaceholder: 'The numbered list will appear here...',
      copyList: 'Copy List',
      imageAgent: 'Perplexity: Image Agent',
      generateList: 'Generate List',
      generateExcel: 'Generate Excel',
      generateSRT: 'Generate SRT',
      toggleLabel: 'Include topic titles in SRT (as separate entry)',
      yes: 'YES',
      no: 'NO',
      srtTitle: 'SRT & Timestamps',
      timestampsLabel: 'Timestamps (for video description):',
      srtLabel: 'Complete SRT:',
      copyTimestamps: 'Copy Timestamps',
      downloadSRT: 'Download SRT',
      // Toast messages
      noTitlesFound: 'No titles found. Use ## to mark titles.',
      noTopicsFound: 'No topics found. Use ## to mark titles.',
      titlesExtracted: '{count} titles extracted!',
      topicsFound: '{count} topics found!',
      listCopied: 'List copied!',
      noListToCopy: 'No list to copy. Generate the list first.',
      failedToCopy: 'Failed to copy.',
      excelGenerated: 'Excel generated with {count} topics!',
      srtUpdated: 'SRT updated!',
      timestampsCopied: 'Timestamps copied!',
      noTimestampsToCopy: 'No timestamps to copy.',
      srtDownloaded: 'SRT downloaded!',
      noSrtToDownload: 'No SRT to download.'
    },
    pt: {
      subtitle: 'Extrator de Títulos H2',
      description: 'Extraia títulos marcados com <code>##</code> e gere listas, Excel ou arquivos SRT',
      inputPlaceholder: 'Cole seu texto aqui... Use ## para marcar títulos',
      outputPlaceholder: 'A lista numerada aparecerá aqui...',
      copyList: 'Copiar Lista',
      imageAgent: 'Perplexity: Agente de Imagens',
      generateList: 'Gerar Lista',
      generateExcel: 'Gerar Excel',
      generateSRT: 'Gerar SRT',
      toggleLabel: 'Incluir títulos dos tópicos no SRT (como entrada separada)',
      yes: 'SIM',
      no: 'NÃO',
      srtTitle: 'SRT & Timestamps',
      timestampsLabel: 'Timestamps (para descrição do vídeo):',
      srtLabel: 'SRT Completo:',
      copyTimestamps: 'Copiar Timestamps',
      downloadSRT: 'Baixar SRT',
      // Toast messages
      noTitlesFound: 'Nenhum título encontrado. Use ## para marcar títulos.',
      noTopicsFound: 'Nenhum tópico encontrado. Use ## para marcar títulos.',
      titlesExtracted: '{count} títulos extraídos!',
      topicsFound: '{count} tópicos encontrados!',
      listCopied: 'Lista copiada!',
      noListToCopy: 'Nenhuma lista para copiar. Gere a lista primeiro.',
      failedToCopy: 'Falha ao copiar.',
      excelGenerated: 'Excel gerado com {count} tópicos!',
      srtUpdated: 'SRT atualizado!',
      timestampsCopied: 'Timestamps copiados!',
      noTimestampsToCopy: 'Nenhum timestamp para copiar.',
      srtDownloaded: 'SRT baixado!',
      noSrtToDownload: 'Nenhum SRT para baixar.'
    }
  },

  /**
   * Get translation for a key
   * Obtém tradução para uma chave
   * @param {string} key - Translation key
   * @param {Object} params - Parameters to replace in the string
   * @returns {string} - Translated string
   */
  t(key, params = {}) {
    let text = this.translations[this.currentLang][key] || this.translations['en'][key] || key;

    // Replace parameters like {count}
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });

    return text;
  },

  /**
   * Set current language and update UI
   * Define idioma atual e atualiza UI
   * @param {string} lang - Language code ('en' or 'pt')
   */
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('scriptHelperLang', lang);
    this.updateUI();
  },

  /**
   * Update all translatable elements in the UI
   * Atualiza todos os elementos traduzíveis na UI
   */
  updateUI() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = this.t(key);
    });

    // Update elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Update toggle status
    const toggleStatus = document.getElementById('toggleStatus');
    const toggle = document.getElementById('toggleTitlesSRT');
    if (toggleStatus && toggle) {
      toggleStatus.textContent = toggle.checked ? this.t('yes') : this.t('no');
    }
  },

  /**
   * Initialize i18n system
   * Inicializa sistema i18n
   */
  init() {
    // Load saved language or detect from browser
    const savedLang = localStorage.getItem('scriptHelperLang');
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    this.currentLang = savedLang || browserLang;

    // Set select value
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
      langSelect.value = this.currentLang;
      langSelect.addEventListener('change', (e) => this.setLanguage(e.target.value));
    }

    this.updateUI();
  }
};

/* =============================================================================
   1. Toast Notification System
   Sistema de Notificação Toast
   ========================================================================== */

const Toast = {
  /**
   * Show a toast notification
   * Exibe uma notificação toast
   * @param {string} message - Message to display / Mensagem a exibir
   * @param {string} type - Type: 'success' | 'error' | 'warning'
   */
  show(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠'
    };

    toast.innerHTML = `
      <span class="toast__icon">${icons[type] || icons.success}</span>
      ${message}
    `;

    container.appendChild(toast);

    // Remove toast after animation
    // Remove o toast após a animação
    setTimeout(() => toast.remove(), 2800);
  }
};

/* =============================================================================
   2. Text Processing Utilities
   Utilitários de Processamento de Texto
   ========================================================================== */

const TextUtils = {
  /**
   * Remove any existing numbering from the beginning of a title
   * Remove qualquer numeração existente do início do título
   * Patterns: "1.", "2)", "3-", "4 -", etc.
   * @param {string} title - Title to clean / Título a limpar
   * @returns {string} - Cleaned title / Título limpo
   */
  removeNumbering(title) {
    return title.replace(/^\d+[\.\)\-]\s*/, '').trim();
  },

  /**
   * Extract H2 titles from text
   * Extrai títulos H2 do texto
   * @param {string} text - Input text / Texto de entrada
   * @returns {string[]} - Array of titles / Array de títulos
   */
  extractTitles(text) {
    const lines = text.split('\n');
    const titles = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('##')) {
        const titleWithoutHash = trimmed.replace(/^##\s*/, '');
        titles.push(this.removeNumbering(titleWithoutHash));
      }
    });

    return titles;
  },

  /**
   * Divide text into topics with their content
   * Divide texto em tópicos com seu conteúdo
   * @param {string} text - Input text / Texto de entrada
   * @returns {Object[]} - Array of topic objects / Array de objetos de tópico
   */
  divideIntoTopics(text) {
    const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalizedText.split('\n');
    const topics = [];
    let currentTopic = null;
    let autoCounter = 1;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('##')) {
        if (currentTopic) {
          topics.push(currentTopic);
        }

        const titleWithoutHash = trimmed.replace(/^##\s*/, '');
        const title = this.removeNumbering(titleWithoutHash);

        currentTopic = {
          number: autoCounter,
          title: title || '(No title)',
          content: ''
        };
        autoCounter++;
      } else if (currentTopic) {
        currentTopic.content += line + ' ';
      }
    }

    if (currentTopic) {
      topics.push(currentTopic);
    }

    return topics;
  }
};

/* =============================================================================
   3. Timestamp Utilities
   Utilitários de Timestamp
   ========================================================================== */

const TimestampUtils = {
  // Configuration / Configuração
  config: {
    CHARS_PER_BLOCK: 500,        // Max characters per SRT block / Máx. caracteres por bloco SRT
    WORDS_PER_BLOCK: 100,        // Max words per block / Máx. palavras por bloco
    BLOCK_DURATION: 35,          // Duration in seconds / Duração em segundos
    BLOCK_INTERVAL: 30,          // Interval between blocks / Intervalo entre blocos
    TOPIC_INTERVAL: 60,          // Interval between topics / Intervalo entre tópicos
    TITLE_DURATION: 5            // Duration for title display / Duração para exibição do título
  },

  /**
   * Pad number with leading zeros
   * Adiciona zeros à esquerda do número
   * @param {number} num - Number to pad / Número a preencher
   * @param {number} size - Target size / Tamanho alvo
   * @returns {string} - Padded string / String preenchida
   */
  pad(num, size = 2) {
    return num.toString().padStart(size, '0');
  },

  /**
   * Convert seconds to time components
   * Converte segundos em componentes de tempo
   * @param {number} seconds - Total seconds / Total de segundos
   * @returns {Object} - Time components / Componentes de tempo
   */
  secondsToComponents(seconds) {
    return {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: Math.floor(seconds % 60),
      milliseconds: Math.floor((seconds % 1) * 1000)
    };
  },

  /**
   * Format time for SRT (00:00:00,000)
   * Formata tempo para SRT (00:00:00,000)
   * @param {number} seconds - Seconds to format / Segundos a formatar
   * @returns {string} - Formatted SRT time / Tempo SRT formatado
   */
  formatForSRT(seconds) {
    const t = this.secondsToComponents(seconds);
    return `${this.pad(t.hours)}:${this.pad(t.minutes)}:${this.pad(t.seconds)},${this.pad(t.milliseconds, 3)}`;
  },

  /**
   * Format time for display (0:00 or 0:00:00)
   * Formata tempo para exibição (0:00 ou 0:00:00)
   * @param {number} seconds - Seconds to format / Segundos a formatar
   * @returns {string} - Formatted display time / Tempo de exibição formatado
   */
  formatSimple(seconds) {
    const t = this.secondsToComponents(seconds);
    if (t.hours > 0) {
      return `${t.hours}:${this.pad(t.minutes)}:${this.pad(t.seconds)}`;
    }
    return `${t.minutes}:${this.pad(t.seconds)}`;
  },

  /**
   * Calculate next topic start time
   * Calcula o tempo de início do próximo tópico
   * @param {number} currentEndTime - Current end time / Tempo final atual
   * @returns {number} - Next start time / Próximo tempo de início
   */
  calculateNextTopicStart(currentEndTime) {
    const nextMinute = Math.ceil(currentEndTime / 60) * 60;
    return nextMinute + this.config.TOPIC_INTERVAL;
  },

  /**
   * Generate SRT entry
   * Gera entrada SRT
   * @param {number} index - Entry index / Índice da entrada
   * @param {number} startTime - Start time in seconds / Tempo inicial em segundos
   * @param {number} endTime - End time in seconds / Tempo final em segundos
   * @param {string} text - Subtitle text / Texto da legenda
   * @returns {string} - Formatted SRT entry / Entrada SRT formatada
   */
  generateSRTEntry(index, startTime, endTime, text) {
    return `${index}\n${this.formatForSRT(startTime)} --> ${this.formatForSRT(endTime)}\n${text}\n\n`;
  },

  /**
   * Generate timestamp line for descriptions
   * Gera linha de timestamp para descrições
   * @param {number} time - Time in seconds / Tempo em segundos
   * @param {number} number - Topic number / Número do tópico
   * @param {string} title - Topic title / Título do tópico
   * @returns {string} - Formatted timestamp line / Linha de timestamp formatada
   */
  generateTimestampLine(time, number, title) {
    return `${this.formatSimple(time)} - ${number}. ${title}`;
  }
};

/* =============================================================================
   4. List Generation
   Geração de Lista
   ========================================================================== */

const ListGenerator = {
  /**
   * Generate numbered list from titles
   * Gera lista numerada a partir dos títulos
   * @param {string[]} titles - Array of titles / Array de títulos
   * @returns {string} - Numbered list / Lista numerada
   */
  generate(titles) {
    return titles.map((title, index) => `${index + 1}. ${title}`).join('\n');
  }
};

/* =============================================================================
   5. Excel Export
   Exportação para Excel
   ========================================================================== */

const ExcelExporter = {
  /**
   * Export titles and content to Excel files
   * Exporta títulos e conteúdo para arquivos Excel
   * @param {string} text - Input text / Texto de entrada
   * @param {number} limit - Max items per file / Máx. itens por arquivo
   */
  export(text, limit = 20) {
    const lines = text.split('\n');
    const titles = [];
    const contents = [];
    let currentTitle = '';
    let currentContent = '';

    // Extract titles and their content
    // Extrai títulos e seus conteúdos
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('##')) {
        if (currentTitle) {
          titles.push(currentTitle);
          contents.push(currentContent.trim());
          currentContent = '';
        }
        const titleWithoutHash = trimmed.substring(2).trim();
        currentTitle = TextUtils.removeNumbering(titleWithoutHash);
      } else if (currentTitle.length > 0) {
        currentContent += trimmed + ' ';
      }
    });

    // Push last title and content
    // Adiciona último título e conteúdo
    if (currentTitle) {
      titles.push(currentTitle);
      contents.push(currentContent.trim());
    }

    if (titles.length === 0) {
      Toast.show(i18n.t('noTopicsFound'), 'warning');
      return;
    }

    // Generate filename base
    // Gera base do nome do arquivo
    const baseFilename = titles[0]
      .replace(/[:\\/\?*\[\]]/g, '')
      .substring(0, 50);

    // Create Excel files in parts
    // Cria arquivos Excel em partes
    for (let i = 0; i < titles.length; i += limit) {
      const data = [['title', 'input']];

      for (let j = i; j < Math.min(i + limit, titles.length); j++) {
        const titleNumber = j + 1;
        const fullContent = titles[j] + ' ' + contents[j];
        data.push([titleNumber, fullContent]);
      }

      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Titles');

      const partNum = Math.floor(i / limit) + 1;
      const totalParts = Math.ceil(titles.length / limit);

      const filename = totalParts > 1
        ? `${baseFilename}_${partNum}of${totalParts}.xlsx`
        : `${baseFilename}.xlsx`;

      XLSX.writeFile(workbook, filename);
    }

    Toast.show(i18n.t('excelGenerated', { count: titles.length }), 'success');
  }
};

/* =============================================================================
   6. SRT Generation
   Geração de SRT
   ========================================================================== */

const SRTGenerator = {
  lastSRT: '',
  lastTopics: [],

  /**
   * Generate complete SRT from topics
   * Gera SRT completo a partir dos tópicos
   * @param {Object[]} topics - Array of topic objects / Array de objetos de tópico
   * @param {boolean} includeTitles - Include titles as separate entries / Incluir títulos como entradas separadas
   * @returns {Object} - { srt: string, topicsData: array }
   */
  generateComplete(topics, includeTitles = true) {
    const cfg = TimestampUtils.config;
    let srtContent = '';
    let globalCounter = 1;
    let srtTime = 0;
    let realTime = 0;
    const topicsData = [];

    /**
     * Add block to SRT
     * Adiciona bloco ao SRT
     */
    const addBlock = (text, duration = cfg.BLOCK_DURATION) => {
      const endTime = srtTime + duration;
      srtContent += TimestampUtils.generateSRTEntry(globalCounter, srtTime, endTime, text);
      globalCounter++;
      srtTime += duration + cfg.BLOCK_INTERVAL;
      realTime += duration;
    };

    topics.forEach((topic, index) => {
      const topicStartTime = realTime;

      // Add title as separate entry if enabled
      // Adiciona título como entrada separada se habilitado
      if (includeTitles) {
        const titleWithDots = `${topic.number}. ${topic.title}...`;
        addBlock(titleWithDots, cfg.TITLE_DURATION);
      }

      // Process content into blocks
      // Processa conteúdo em blocos
      const words = topic.content.trim().split(/\s+/).filter(w => w.length > 0);
      let currentBlock = '';
      let wordsInBlock = 0;

      for (const word of words) {
        if (currentBlock.length + word.length <= cfg.CHARS_PER_BLOCK &&
            wordsInBlock < cfg.WORDS_PER_BLOCK) {
          currentBlock += word + ' ';
          wordsInBlock++;
        } else {
          // Try to break at last period
          // Tenta quebrar no último ponto
          const lastPeriod = currentBlock.lastIndexOf('.');

          if (lastPeriod !== -1 && lastPeriod !== currentBlock.length - 1) {
            const remainder = currentBlock.substring(lastPeriod + 1);
            currentBlock = currentBlock.substring(0, lastPeriod + 1);
            addBlock(currentBlock.trim());
            currentBlock = remainder + word + ' ';
            wordsInBlock = remainder.split(/\s+/).length + 1;
          } else {
            addBlock(currentBlock.trim());
            currentBlock = word + ' ';
            wordsInBlock = 1;
          }
        }
      }

      // Add last block of topic
      // Adiciona último bloco do tópico
      if (currentBlock.trim()) {
        addBlock(currentBlock.trim());
      }

      topicsData.push({
        number: topic.number,
        title: topic.title,
        realTime: topicStartTime
      });

      // Add interval between topics
      // Adiciona intervalo entre tópicos
      if (index < topics.length - 1) {
        srtTime = TimestampUtils.calculateNextTopicStart(srtTime);
      }
    });

    return {
      srt: srtContent.trim(),
      topicsData
    };
  },

  /**
   * Generate timestamps for video description
   * Gera timestamps para descrição de vídeo
   * @param {Object[]} topicsData - Topics data from SRT generation
   * @returns {string} - Formatted timestamps
   */
  generateTimestamps(topicsData) {
    return topicsData
      .map(t => TimestampUtils.generateTimestampLine(t.realTime, t.number, t.title))
      .join('\n');
  },

  /**
   * Download SRT file
   * Faz download do arquivo SRT
   * @param {string} content - SRT content / Conteúdo SRT
   * @param {string} filename - Filename / Nome do arquivo
   */
  download(content, filename = 'subtitles.srt') {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/* =============================================================================
   7. Event Handlers
   Manipuladores de Eventos
   ========================================================================== */

const EventHandlers = {
  /**
   * Handle list generation
   * Manipula geração de lista
   */
  generateList() {
    const text = document.getElementById('inputText').value;
    const titles = TextUtils.extractTitles(text);

    if (titles.length === 0) {
      Toast.show(i18n.t('noTitlesFound'), 'warning');
      return;
    }

    const list = ListGenerator.generate(titles);
    document.getElementById('outputTitles').value = list;
    Toast.show(i18n.t('titlesExtracted', { count: titles.length }), 'success');
  },

  /**
   * Handle list copy
   * Manipula cópia da lista
   */
  copyList() {
    const list = document.getElementById('outputTitles').value;

    if (!list) {
      Toast.show(i18n.t('noListToCopy'), 'warning');
      return;
    }

    navigator.clipboard.writeText(list)
      .then(() => Toast.show(i18n.t('listCopied'), 'success'))
      .catch(() => Toast.show(i18n.t('failedToCopy'), 'error'));
  },

  /**
   * Handle Excel generation
   * Manipula geração de Excel
   */
  generateExcel() {
    const text = document.getElementById('inputText').value;
    ExcelExporter.export(text, 20);
  },

  /**
   * Handle SRT generation
   * Manipula geração de SRT
   */
  generateSRT() {
    const text = document.getElementById('inputText').value;
    SRTGenerator.lastTopics = TextUtils.divideIntoTopics(text);

    if (SRTGenerator.lastTopics.length === 0) {
      Toast.show(i18n.t('noTopicsFound'), 'warning');
      return;
    }

    document.getElementById('srtOptions').classList.remove('hidden');
    this.regenerateSRT();
    Toast.show(i18n.t('topicsFound', { count: SRTGenerator.lastTopics.length }), 'success');
  },

  /**
   * Regenerate SRT with current options
   * Regenera SRT com opções atuais
   */
  regenerateSRT() {
    const includeTitles = document.getElementById('toggleTitlesSRT').checked;
    const { srt, topicsData } = SRTGenerator.generateComplete(SRTGenerator.lastTopics, includeTitles);
    const timestamps = SRTGenerator.generateTimestamps(topicsData);

    SRTGenerator.lastSRT = srt;
    document.getElementById('outputSRT').value = srt;
    document.getElementById('outputTimestamps').value = timestamps;
    document.getElementById('srtSection').classList.remove('hidden');
  },

  /**
   * Handle toggle change
   * Manipula mudança do toggle
   */
  toggleTitles() {
    const toggle = document.getElementById('toggleTitlesSRT');
    document.getElementById('toggleStatus').textContent = toggle.checked ? i18n.t('yes') : i18n.t('no');

    if (SRTGenerator.lastTopics.length > 0) {
      this.regenerateSRT();
      Toast.show(i18n.t('srtUpdated'), 'success');
    }
  },

  /**
   * Handle timestamps copy
   * Manipula cópia dos timestamps
   */
  copyTimestamps() {
    const timestamps = document.getElementById('outputTimestamps').value;

    if (!timestamps) {
      Toast.show(i18n.t('noTimestampsToCopy'), 'warning');
      return;
    }

    navigator.clipboard.writeText(timestamps)
      .then(() => Toast.show(i18n.t('timestampsCopied'), 'success'))
      .catch(() => Toast.show(i18n.t('failedToCopy'), 'error'));
  },

  /**
   * Handle SRT download
   * Manipula download do SRT
   */
  downloadSRT() {
    if (!SRTGenerator.lastSRT) {
      Toast.show(i18n.t('noSrtToDownload'), 'warning');
      return;
    }

    const filename = SRTGenerator.lastTopics.length > 0
      ? SRTGenerator.lastTopics[0].title.replace(/[:\\/\?*\[\]]/g, '').substring(0, 50) + '.srt'
      : 'subtitles.srt';

    SRTGenerator.download(SRTGenerator.lastSRT, filename);
    Toast.show(i18n.t('srtDownloaded'), 'success');
  }
};

/* =============================================================================
   8. Initialization
   Inicialização
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize i18n system
  // Inicializa sistema i18n
  i18n.init();

  // Bind event listeners
  // Vincula listeners de eventos
  document.getElementById('btnGenerateList').addEventListener('click', () => EventHandlers.generateList());
  document.getElementById('btnCopyList').addEventListener('click', () => EventHandlers.copyList());
  document.getElementById('btnGenerateExcel').addEventListener('click', () => EventHandlers.generateExcel());
  document.getElementById('btnGenerateSRT').addEventListener('click', () => EventHandlers.generateSRT());
  document.getElementById('toggleTitlesSRT').addEventListener('change', () => EventHandlers.toggleTitles());
  document.getElementById('btnCopyTimestamps').addEventListener('click', () => EventHandlers.copyTimestamps());
  document.getElementById('btnDownloadSRT').addEventListener('click', () => EventHandlers.downloadSRT());

  console.log('Script Helper initialized successfully! / Script Helper inicializado com sucesso!');
});
