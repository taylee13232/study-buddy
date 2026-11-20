const STORAGE_KEY = "study-buddy-material";
const fileInput = document.querySelector("#guide-file");
const materialStatus = document.querySelector("#material-status");
const materialName = document.querySelector("#material-name");
const clearMaterialButton = document.querySelector("#clear-material");
const notesDialog = document.querySelector("#notes-dialog");
const notesInput = document.querySelector("#notes-input");
const notesMessage = document.querySelector("#notes-message");

function showMaterial(name, text = "", kind = "file") {
  const material = { name, text, kind };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(material));
  } catch (error) {
    notesMessage.textContent = "This browser couldn't save the material. Try a smaller set of notes.";
    return false;
  }
  renderMaterial(material);
  return true;
}

function renderMaterial(material) {
  materialName.textContent = material.text
    ? `${material.name} · ready to use`
    : `${material.name} · selected (content extraction comes in a later phase)`;
  materialStatus.classList.add("has-material");
  clearMaterialButton.hidden = false;
}

function loadSavedMaterial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) renderMaterial(JSON.parse(saved));
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

document.querySelector("#open-notes").addEventListener("click", () => {
  notesMessage.textContent = "";
  notesInput.value = "";
  notesDialog.showModal();
  notesInput.focus();
});

document.querySelector("#cancel-notes").addEventListener("click", () => notesDialog.close());

document.querySelector("#save-notes").addEventListener("click", () => {
  const text = notesInput.value.trim();
  if (!text) {
    notesMessage.textContent = "Add some notes before saving.";
    notesInput.focus();
    return;
  }
  if (showMaterial("Pasted class notes", text, "notes")) notesDialog.close();
});

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  const readableTextFile = /\.(txt|html?)$/i.test(file.name);
  let text = "";
  if (readableTextFile) {
    try {
      text = await file.text();
    } catch (error) {
      materialName.textContent = `Couldn't read ${file.name}. Try pasting the notes instead.`;
      fileInput.value = "";
      return;
    }
  }
  showMaterial(file.name, text, "file");
});

clearMaterialButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  materialName.textContent = "No study material added yet";
  materialStatus.classList.remove("has-material");
  clearMaterialButton.hidden = true;
  fileInput.value = "";
});

const featureDetails = {
  exams: {
    title: "Practice exams",
    description: "The next phase will turn your study material into multiple-choice, true/false, and other practice questions, with timed or untimed sessions and explanations for missed answers."
  },
  games: {
    title: "Interactive learning games",
    description: "The next phase will bring your material to life with matching rounds, trivia challenges, and fill-in-the-blank activities with scores and feedback."
  },
  tutor: {
    title: "AI tutoring",
    description: "The next phase will let you ask follow-up questions about your notes, get simpler explanations and examples, and understand why an answer needs another look."
  }
};

const featureDialog = document.querySelector("#feature-dialog");
document.querySelectorAll("[data-feature]").forEach((button) => {
  button.addEventListener("click", () => {
    const feature = featureDetails[button.dataset.feature];
    document.querySelector("#feature-dialog-title").textContent = feature.title;
    document.querySelector("#feature-dialog-description").textContent = feature.description;
    featureDialog.showModal();
  });
});
document.querySelector("#close-feature").addEventListener("click", () => featureDialog.close());

loadSavedMaterial();
