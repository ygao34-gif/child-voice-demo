const player = document.getElementById('audioPlayer');
const stagePanel = document.getElementById('stagePanel');
const audioBase = 'assets/audio/';

const stageText = {
  motivation: ['Motivation', 'The VR classroom needs several child-like avatar voices that are distinguishable, usable, and ethically safer than collecting large amounts of real child speech.'],
  pipeline: ['Voice generation pipeline', 'The study turns a source sentence into speech, combines it with a target child-like reference voice, and generates synthetic child-like stimuli.'],
  text: ['Text input', 'The sentence shown to the audience. Replace this text with one of your final thesis source sentences.'],
  tts: ['TTS stage', 'Text is converted into an initial source voice. This stage can play your TTS/source audio.'],
  source: ['Source speech', 'The source speech carries the linguistic content that should remain understandable after conversion.'],
  target: ['Target voice', 'The target reference provides the child-like voice characteristics used by the conversion system.'],
  seed: ['Seed-VC', 'The conversion stage maps source speech content toward the target voice identity.'],
  synthetic: ['Synthetic child-like stimuli', 'The final output: child-like synthetic speech used for demo, listening judgement, and acoustic analysis.'],
  listening: ['Listening test', 'Human listeners judge whether pairs of voices sound like the same or different speakers.'],
  broad: ['Broad acoustic exploration', 'Acoustic analysis explores which dimensions may explain the perceptual judgements.'],
  uw: ['Focused UW-related vowel study', 'A focused analysis checks whether UW-related vowel/formant structure helps explain voice differentiation.'],
  evidence: ['Supporting computational evidence', 'Speaker embeddings and computational separability provide an additional comparison to human perception.'],
  adult: ['Adult control', 'The adult-control material helps interpret whether observed patterns are specific to synthetic child-like speech or more general.']
};

function playAudio(file, element){
  document.querySelectorAll('.playing').forEach(el => el.classList.remove('playing'));
  if(!file) return;
  player.src = audioBase + file;
  player.currentTime = 0;
  player.play().catch(() => {
    stagePanel.innerHTML = `<strong>Audio blocked by browser</strong><p>Click again, or replace the placeholder file in <code>assets/audio/${file}</code>.</p>`;
  });
  if(element) element.classList.add('playing');
}

player.addEventListener('ended', () => {
  document.querySelectorAll('.playing').forEach(el => el.classList.remove('playing'));
});

function updateStage(button){
  const stage = button.dataset.stage;
  const audio = button.dataset.audio;
  const [title, text] = stageText[stage] || ['Pipeline stage', 'This stage can be edited in script.js.'];
  document.querySelectorAll('.pipe-card,.mini-stage,.adult-control').forEach(el => el.classList.remove('active'));
  button.classList.add('active');
  stagePanel.innerHTML = `<strong>${title}</strong><p>${text}</p>${audio ? `<p class="audio-note">Playing: <code>${audio}</code></p>` : ''}`;
  if(audio) playAudio(audio, button);
}

document.querySelectorAll('[data-stage]').forEach(btn => {
  btn.addEventListener('click', () => updateStage(btn));
});

document.querySelectorAll('.playable,.voice-card').forEach(el => {
  el.addEventListener('click', (e) => {
    const file = el.dataset.audio;
    playAudio(file, el);
    e.stopPropagation();
  });
});

document.getElementById('generateBtn')?.addEventListener('click', () => {
  const sentence = document.getElementById('sentenceInput').value.trim() || 'Please open your book.';
  stagePanel.innerHTML = `<strong>Demo sentence generated</strong><p>Current sentence: “${sentence}”</p><p>Now click a child voice card to play the output placeholder audio.</p>`;
  document.querySelector('.voice-board')?.scrollIntoView({behavior:'smooth', block:'center'});
});

document.getElementById('resetBtn')?.addEventListener('click', () => {
  document.getElementById('sentenceInput').value = 'Please open your book.';
  stagePanel.innerHTML = `<strong>Demo reset</strong><p>The demo sentence has been reset. Replace the placeholder audio files later with your final thesis clips.</p>`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: .12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section')];
const navLinks = [...document.querySelectorAll('.top-nav a')];
window.addEventListener('scroll', () => {
  const current = sections.find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 110 && rect.bottom > 110;
  });
  if(!current) return;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
});

// Expandable problem cards
const cardModal = document.getElementById('cardModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

function openProblemModal(card){
  if(!cardModal || !modalTitle || !modalText) return;
  modalTitle.textContent = card.dataset.modalTitle || 'Thesis point';
  modalText.textContent = card.dataset.modalText || '';
  cardModal.classList.add('open');
  cardModal.setAttribute('aria-hidden', 'false');
}

function closeProblemModal(){
  if(!cardModal) return;
  cardModal.classList.remove('open');
  cardModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.expand-card').forEach(card => {
  card.addEventListener('click', () => openProblemModal(card));
  card.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault();
      openProblemModal(card);
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeProblemModal);
});

document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') closeProblemModal();
});
