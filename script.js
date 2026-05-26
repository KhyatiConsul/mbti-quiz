let scores = { I: 0, E: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
let currentIndex = 0;
let isTransitioning = false;


const screens = {
  landing:  document.getElementById('screen-landing'),
  question: document.getElementById('screen-question'),
  analysis: document.getElementById('screen-analysis'),
  result:   document.getElementById('screen-result')
};

const els = {
  btnStart:      document.getElementById('btn-start'),
  btnRestart:    document.getElementById('btn-restart'),

  qLogLabel:     document.getElementById('q-log-label'),
  qAxisLabel:    document.getElementById('q-axis-label'),
  questionText:  document.getElementById('question-text'),
  optionA:       document.getElementById('option-a'),
  optionB:       document.getElementById('option-b'),
  optionAText:   document.getElementById('option-a-text'),
  optionBText:   document.getElementById('option-b-text'),
  progressFill:  document.getElementById('progress-fill'),
  progressCount: document.getElementById('progress-count'),

  analysisLog:   document.getElementById('analysis-log'),
  analysisBar:   document.getElementById('analysis-bar'),
  analysisPct:   document.getElementById('analysis-pct'),

  resultStage1:  document.getElementById('result-stage-1'),
  resultStage2:  document.getElementById('result-stage-2'),
  resultStage3:  document.getElementById('result-stage-3'),
  resultStats:   document.getElementById('result-stats'),
  resultDesc:    document.getElementById('result-description'),
  resultType:    document.getElementById('result-type'),
  resultArchetype: document.getElementById('result-archetype'),
  resultAxes:    document.getElementById('result-axes')
};


function showScreen(name) {
  return new Promise(resolve => {
    const next = screens[name];

    // Exit all currently active screens
    Object.values(screens).forEach(s => {
      if (s.classList.contains('active')) {
        s.classList.add('exit');
        s.classList.remove('active');
        setTimeout(() => s.classList.remove('exit'), 500);
      }
    });

    // Enter the new screen after a short delay
    setTimeout(() => {
      next.classList.add('active');
      resolve();
    }, 420);
  });
}


els.btnStart.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  resetState();
  showScreen('question').then(() => {
    loadQuestion(0);
    isTransitioning = false;
  });
});


function loadQuestion(index) {
  const q = QUESTIONS[index];

  // Update header metadata
  els.qLogLabel.textContent  = q.log;
  els.qAxisLabel.textContent = `AXIS: ${q.axis}`;

  // Update progress
  const pct = Math.round((index / QUESTIONS.length) * 100);
  els.progressFill.style.width  = pct + '%';
  els.progressCount.textContent =
    String(index + 1).padStart(2, '0') + ' / ' +
    String(QUESTIONS.length).padStart(2, '0');

  // Update question text with re-animation
  els.questionText.style.animation = 'none';
  els.questionText.offsetHeight;    // force reflow
  els.questionText.style.animation = '';
  els.questionText.textContent = q.text;

  // Update options
  els.optionAText.textContent = q.options[0].text;
  els.optionBText.textContent = q.options[1].text;

  // Re-animate options
  els.optionA.classList.remove('selected');
  els.optionB.classList.remove('selected');

  const wrap = els.optionA.closest('.options-wrap');
  wrap.style.animation = 'none';
  wrap.offsetHeight;
  wrap.style.animation = '';

  // Accessibility
  els.optionA.setAttribute('aria-label', `Option A: ${q.options[0].text}`);
  els.optionB.setAttribute('aria-label', `Option B: ${q.options[1].text}`);

  // Update progress bar aria
  const progressBar = document.querySelector('.progress-bar-wrap');
  if (progressBar) progressBar.setAttribute('aria-valuenow', index + 1);
}

function handleAnswer(choiceIndex) {
  if (isTransitioning) return;
  isTransitioning = true;

  const q = QUESTIONS[currentIndex];
  const chosen = q.options[choiceIndex];

  // Visual feedback
  const btn = choiceIndex === 0 ? els.optionA : els.optionB;
  btn.classList.add('selected');

  // Score
  scores[chosen.score]++;

  // Advance
  setTimeout(() => {
    currentIndex++;

    if (currentIndex < QUESTIONS.length) {
      loadQuestion(currentIndex);
      isTransitioning = false;
    } else {
      // All questions answered — go to analysis
      runAnalysis();
    }
  }, 320);
}

els.optionA.addEventListener('click', () => handleAnswer(0));
els.optionB.addEventListener('click', () => handleAnswer(1));

// Keyboard support
document.addEventListener('keydown', e => {
  if (!screens.question.classList.contains('active')) return;
  if (isTransitioning) return;
  if (e.key === 'a' || e.key === 'A' || e.key === '1') handleAnswer(0);
  if (e.key === 'b' || e.key === 'B' || e.key === '2') handleAnswer(1);
});


function runAnalysis() {
  showScreen('analysis').then(() => {
    els.analysisLog.innerHTML = '';
    els.analysisBar.style.width = '0%';
    els.analysisPct.textContent = '0%';

    const total    = ANALYSIS_LINES.length;
    const interval = 320;

    ANALYSIS_LINES.forEach((line, i) => {
      setTimeout(() => {
        // Append log line
        const span = document.createElement('span');
        span.className = `log-line ${line.type}`;
        span.textContent = `> ${line.text}`;
        els.analysisLog.appendChild(span);

        // Scroll into view
        span.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Update bar
        const pct = Math.round(((i + 1) / total) * 100);
        els.analysisBar.style.width = pct + '%';
        els.analysisPct.textContent = pct + '%';

        // After last line, proceed to results
        if (i === total - 1) {
          setTimeout(() => {
            buildResult();
            showScreen('result').then(() => {
              revealResultStages();
              isTransitioning = false;
            });
          }, 700);
        }
      }, i * interval);
    });
  });
}


function calcType() {
  let type = '';
  type += scores.I >= scores.E ? 'I' : 'E';
  type += scores.N >= scores.S ? 'N' : 'S';
  type += scores.T >= scores.F ? 'T' : 'F';
  type += scores.J >= scores.P ? 'J' : 'P';
  return type;
}

function calcStats(type) {

  const margins = [
    Math.abs(scores.I - scores.E),
    Math.abs(scores.N - scores.S),
    Math.abs(scores.T - scores.F),
    Math.abs(scores.J - scores.P)
  ];
  const avgMargin   = margins.reduce((a, b) => a + b, 0) / 4;
  const consistency = Math.round(50 + (avgMargin / 5) * 50);

  const minMargin = Math.min(...margins);
  const volatility = minMargin <= 1 ? 'High' : minMargin <= 2 ? 'Moderate' : 'Low';

  const perceptionMap = {
    NF: 'Interpretive',
    NT: 'Abstract',
    SF: 'Empathic',
    ST: 'Concrete'
  };
  const percKey = type[1] + type[2];
  const perception = perceptionMap[percKey] || 'Mixed';

  const orientationMap = { I: 'Internal', E: 'External' };
  const orientation = orientationMap[type[0]];

  return { consistency, volatility, perception, orientation };
}

function buildResult() {
  const type  = calcType();
  const stats = calcStats(type);

  els.resultStats.innerHTML = [
    { label: 'Behavioral consistency',  value: stats.consistency + '%' },
    { label: 'Pattern volatility',      value: stats.volatility },
    { label: 'Dominant perception',     value: stats.perception },
    { label: 'Primary orientation',     value: stats.orientation },
    { label: 'Observations recorded',   value: '20 / 20' },
    { label: 'Classification status',   value: 'COMPLETE' }
  ].map(row => `
    <div class="stat-row">
      <span class="stat-label">${row.label}</span>
      <span class="stat-value mono">${row.value}</span>
    </div>
  `).join('');

  const lines = DESCRIPTIONS[type] || DESCRIPTIONS['INFJ'];
  els.resultDesc.innerHTML = lines
    .map(line => `<p class="description-line">${line}</p>`)
    .join('');

  els.resultType.textContent          = type;
  els.resultType.setAttribute('data-type', type);
  els.resultArchetype.textContent     = ARCHETYPES[type] || '';

  const axes = [
    { label: 'I vs E', a: 'I', b: 'E', scoreA: scores.I, scoreB: scores.E },
    { label: 'N vs S', a: 'N', b: 'S', scoreA: scores.N, scoreB: scores.S },
    { label: 'T vs F', a: 'T', b: 'F', scoreA: scores.T, scoreB: scores.F },
    { label: 'J vs P', a: 'J', b: 'P', scoreA: scores.J, scoreB: scores.P }
  ];

  els.resultAxes.innerHTML = axes.map(axis => {
    const total   = axis.scoreA + axis.scoreB || 1;
    const pct     = Math.round((axis.scoreA / total) * 100);
    const domA    = axis.scoreA >= axis.scoreB;
    return `
      <div class="axis-row">
        <span class="axis-label mono">${axis.label}</span>
        <div class="axis-bar-track">
          <div class="axis-bar-fill" style="width: 0%" data-pct="${pct}"></div>
        </div>
        <div class="axis-pair">
          <span class="${domA ? 'dominant' : ''}">${axis.a} ${axis.scoreA}</span>
          <span class="${!domA ? 'dominant' : ''}">${axis.scoreB} ${axis.b}</span>
        </div>
      </div>
    `;
  }).join('');

  els.resultStage1.classList.remove('hidden');
  els.resultStage2.classList.add('hidden');
  els.resultStage3.classList.add('hidden');
}


function revealResultStages() {
  triggerStageAnimation(els.resultStage1);

  setTimeout(() => {
    els.resultStage2.classList.remove('hidden');
    triggerStageAnimation(els.resultStage2);
  }, 1400);

  setTimeout(() => {
    els.resultStage3.classList.remove('hidden');
    triggerStageAnimation(els.resultStage3);

    setTimeout(animateAxeBars, 300);
  }, 2600);
}

function triggerStageAnimation(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = '';
}

function animateAxeBars() {
  document.querySelectorAll('.axis-bar-fill').forEach(bar => {
    const pct = bar.getAttribute('data-pct');
    bar.style.width = pct + '%';
  });
}


els.btnRestart.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  resetState();
  showScreen('landing').then(() => {
    isTransitioning = false;
  });
});


function resetState() {
  scores       = { I: 0, E: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
  currentIndex = 0;
}


(function init() {
  screens.landing.classList.add('active');
})();