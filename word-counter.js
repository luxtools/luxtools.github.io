const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const sentenceCount = document.getElementById('sentence-count');

function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

function countSentences(text) {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
    .length;
}

function updateCounts() {
  const text = textInput.value;
  wordCount.textContent = countWords(text);
  charCount.textContent = text.length;
  sentenceCount.textContent = countSentences(text);
}

textInput.addEventListener('input', updateCounts);
