// ======================================================
// Website interaction logic
// ======================================================

const player = document.getElementById("audioPlayer");
const stagePanel = document.getElementById("stagePanel");

const stageContent = {
  motivation: [
    "Motivation",
    "VR classroom avatars need child-like voices that are not only realistic, but also clearly distinguishable from one another."
  ],
  pipeline: [
    "Voice Generation Pipeline",
    "The pipeline starts from fixed text, generates adult TTS source speech, and then converts it into child-like voices using Seed-VC."
  ],
  text: [
    "Text",
    "Five fixed source sentences are used so that the demo can compare voices under controlled linguistic content."
  ],
  tts: [
    "TTS",
    "The selected sentence is first generated as adult TTS speech. You can choose either the female or male adult source voice in the demo."
  ],
  source: [
    "Source Speech",
    "This is the adult TTS speech used as the source input for voice conversion."
  ],
  target: [
    "Target Voice",
    "The target child reference voice provides the speaker identity that Seed-VC tries to transfer onto the source speech."
  ],
  seed: [
    "Seed-VC",
    "Seed-VC converts the adult source speech toward the selected child target voice while preserving the sentence content."
  ],
  synthetic: [
    "Synthetic Child-like Stimuli",
    "The output is a converted child-like voice used for listening and acoustic analysis."
  ],
  listening: [
    "Listening Test",
    "Listeners judged whether two synthetic child-like voices sounded like the same speaker or different speakers."
  ],
  broad: [
    "Pilot / Broad Acoustic Exploration",
    "A broad acoustic analysis was used to explore which acoustic dimensions might help explain speaker differentiation."
  ],
  uw: [
    "Focused UW Related Vowel Study",
    "The focused analysis examined UW-related acoustic evidence as a promising cue area for speaker differentiation."
  ],
  evidence: [
    "Supporting Computational Evidence",
    "Computational measures were used as supporting evidence alongside human perception."
  ],
  adult: [
    "Adult Control",
    "Adult control material helped validate that the pipeline and evaluation logic behaved as expected."
  ]
};

function updateStagePanel(title, text) {
  if (!stagePanel) return;
  stagePanel.innerHTML = `<strong>${title}</strong><p>${text}</p>`;
}

document.querySelectorAll("[data-stage]").forEach((button) => {
  button.addEventListener("click", () => {
    const stage = button.dataset.stage;
    const content = stageContent[stage];

    document.querySelectorAll("[data-stage]").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    if (content) {
      updateStagePanel(content[0], content[1]);
    }
  });
});

// ======================================================
// Expandable problem cards
// ======================================================

const cardModal = document.getElementById("cardModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function openCardModal(title, text) {
  if (!cardModal || !modalTitle || !modalText) return;

  modalTitle.textContent = title;
  modalText.textContent = text;
  cardModal.classList.add("open");
  cardModal.setAttribute("aria-hidden", "false");
}

function closeCardModal() {
  if (!cardModal) return;

  cardModal.classList.remove("open");
  cardModal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".expand-card").forEach((card) => {
  card.addEventListener("click", () => {
    openCardModal(card.dataset.modalTitle, card.dataset.modalText);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCardModal(card.dataset.modalTitle, card.dataset.modalText);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeCardModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCardModal();
  }
});

// ======================================================
// Reveal animation
// ======================================================

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// ======================================================
// Dynamic thesis demo audio logic
// ======================================================

const AUDIO_ROOT = "assets/audio/";

const demoSentences = {
  s1: "Ben packed two blue toys and took a big red kite.",
  s2: "The small green frog jumped under the wooden bridge.",
  s3: "She found three shiny coins beside the quiet yellow boat.",
  s4: "Tom called the dog, but the bird stayed near the tall tree.",
  s5: "A boy saw five brown leaves falling into the cool pond."
};

const adultSourceFiles = {
  female: {
    s1: "fg_s1.wav",
    s2: "fg_s2.wav",
    s3: "fg_s3.wav",
    s4: "fg_s4.wav",
    s5: "fg_s5.wav"
  },
  male: {
    s1: "mprobe_s1.wav",
    s2: "mprobe_s2.wav",
    s3: "mprobe_s3.wav",
    s4: "mprobe_s4.wav",
    s5: "mprobe_s5.wav"
  }
};

const targetReferenceFiles = {
  A: "zenlong_03_F_native.wav",
  B: "zenlong_02_M_nonNative.wav",
  C: "zenlong_07_F_native.wav",
  D: "zenlong_04_M_nonNative.wav"
};

const syntheticVoiceNames = {
  A: {
    s1: "fg_s1__zenlong_03_F_native",
    s2: "fg_s2__zenlong_03_F_native",
    s3: "fg_s3__zenlong_03_F_native",
    s4: "fg_s4__zenlong_03_F_native",
    s5: "fg_s5__zenlong_03_F_native"
  },
  B: {
    s1: "mprobe_s1__zenlong_02_M_nonNative",
    s2: "mprobe_s2__zenlong_02_M_nonNative",
    s3: "mprobe_s3__zenlong_02_M_nonNative",
    s4: "mprobe_s4__zenlong_02_M_nonNative",
    s5: "mprobe_s5__zenlong_02_M_nonNative"
  },
  C: {
    s1: "fg_s1__zenlong_07_F_native",
    s2: "fg_s2__zenlong_07_F_native",
    s3: "fg_s3__zenlong_07_F_native",
    s4: "fg_s4__zenlong_07_F_native",
    s5: "fg_s5__zenlong_07_F_native"
  },
  D: {
    s1: "mprobe_s1__zenlong_04_M_nonNative",
    s2: "mprobe_s2__zenlong_04_M_nonNative",
    s3: "mprobe_s3__zenlong_04_M_nonNative",
    s4: "mprobe_s4__zenlong_04_M_nonNative",
    s5: "mprobe_s5__zenlong_04_M_nonNative"
  }
};

let currentDemoAudio = null;

function getSelectedSentenceId() {
  const select = document.getElementById("sentenceSelect");
  return select ? select.value : "s1";
}

function getSelectedAdultVoiceType() {
  const select = document.getElementById("adultVoiceSelect");
  return select ? select.value : "female";
}

function buildAdultSourcePath(sentenceId, voiceType) {
  const fileName = adultSourceFiles[voiceType][sentenceId];

  if (voiceType === "male") {
    return AUDIO_ROOT + "source_tts/male_probe_set_v1/" + fileName;
  }

  return AUDIO_ROOT + "source_tts/audio_set_v1/" + fileName;
}

function buildTargetReferencePath(childId) {
  const fileName = targetReferenceFiles[childId];
  return AUDIO_ROOT + "target_reference/" + fileName;
}

function buildSyntheticVoicePath(childId, sentenceId) {
  const voiceName = syntheticVoiceNames[childId][sentenceId];

  const fileName = voiceName.replace("__", "_");
  return AUDIO_ROOT + "converted_final/" + voiceName + "/vc_v2_" + fileName + "_1.0_10_0.7.wav";
}

function clearPlayingState() {
  document.querySelectorAll(".playing").forEach((element) => {
    element.classList.remove("playing");
  });
}

function playDemoAudio(audioPath, activeElement = null) {
  if (!audioPath) {
    console.warn("No audio path provided.");
    return;
  }

  if (currentDemoAudio) {
    currentDemoAudio.pause();
    currentDemoAudio.currentTime = 0;
  }

  clearPlayingState();

  currentDemoAudio = new Audio(audioPath);

  if (activeElement) {
    activeElement.classList.add("playing");
  }

  currentDemoAudio.play().catch((error) => {
    console.error("Audio playback failed:", error);
    alert(
      "Audio could not be played.\n\nPlease check whether this file exists:\n\n" +
      audioPath
    );
  });

  currentDemoAudio.addEventListener("ended", () => {
    if (activeElement) {
      activeElement.classList.remove("playing");
    }
  });
}

function updateDemoSelectionPreview() {
  const sentenceId = getSelectedSentenceId();
  const adultVoiceType = getSelectedAdultVoiceType();

  const textStep = document.getElementById("textStep");
  const ttsStep = document.getElementById("ttsStep");

  if (textStep) {
    textStep.title = demoSentences[sentenceId];
  }

  if (ttsStep) {
    ttsStep.title = "Selected adult TTS voice: " + adultVoiceType;
  }
}

const generateButton = document.getElementById("generateBtn");
if (generateButton) {
  generateButton.addEventListener("click", () => {
    const sentenceId = getSelectedSentenceId();
    const adultVoiceType = getSelectedAdultVoiceType();

    updateDemoSelectionPreview();

    updateStagePanel(
      "Demo selection updated",
      "Selected " +
        sentenceId.toUpperCase() +
        " with " +
        adultVoiceType +
        " adult TTS. Now click Source Speech, a child avatar, or Synthetic child voice."
    );
  });
}

const resetButton = document.getElementById("resetBtn");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    const sentenceSelect = document.getElementById("sentenceSelect");
    const adultVoiceSelect = document.getElementById("adultVoiceSelect");

    if (sentenceSelect) sentenceSelect.value = "s1";
    if (adultVoiceSelect) adultVoiceSelect.value = "female";

    if (currentDemoAudio) {
      currentDemoAudio.pause();
      currentDemoAudio.currentTime = 0;
    }

    clearPlayingState();
    updateDemoSelectionPreview();

    updateStagePanel(
      "Demo reset",
      "The demo has been reset to S1 and female adult TTS."
    );
  });
}

const sourceSpeechStep = document.getElementById("sourceSpeechStep");
if (sourceSpeechStep) {
  sourceSpeechStep.addEventListener("click", () => {
    const sentenceId = getSelectedSentenceId();
    const adultVoiceType = getSelectedAdultVoiceType();
    const audioPath = buildAdultSourcePath(sentenceId, adultVoiceType);

    playDemoAudio(audioPath, sourceSpeechStep);
    updateStagePanel(
      "Source Speech",
      "Playing selected adult TTS source speech: " + sentenceId.toUpperCase() + ", " + adultVoiceType + "."
    );
  });
}

document.querySelectorAll(".voice-card .target-voice-img").forEach((image) => {
  image.addEventListener("click", () => {
    const card = image.closest(".voice-card");
    const childId = card.dataset.child;
    const audioPath = buildTargetReferencePath(childId);

    playDemoAudio(audioPath, card);
    updateStagePanel(
      "Target Reference Voice",
      "Playing target/reference voice for Child " + childId + "."
    );
  });
});

document.querySelectorAll(".voice-card .synthetic-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".voice-card");
    const childId = card.dataset.child;
    const sentenceId = getSelectedSentenceId();
    const audioPath = buildSyntheticVoicePath(childId, sentenceId);

    playDemoAudio(audioPath, card);
    updateStagePanel(
      "Synthetic Child Voice",
      "Playing converted synthetic child voice for Child " + childId + " using " + sentenceId.toUpperCase() + "."
    );
  });
});

document.getElementById("sentenceSelect")?.addEventListener("change", updateDemoSelectionPreview);
document.getElementById("adultVoiceSelect")?.addEventListener("change", updateDemoSelectionPreview);

updateDemoSelectionPreview();
