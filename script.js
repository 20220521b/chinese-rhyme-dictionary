async function loadWords() {
    const response = await fetch("words.json");
    const words = await response.json();

    return words;
}

function isStrictRhyme(targetSyllable, wordSyllable) {
    return (
        targetSyllable.medial === wordSyllable.medial &&
        targetSyllable.final === wordSyllable.final
    );
}

async function searchWords() {
    const words = await loadWords();

    const initialSelect = document.getElementById("initial");
    const medialSelect = document.getElementById("medial");
    const finalSelect = document.getElementById("final");
    const toneSelect = document.getElementById("tone");
    const partOfSpeechSelect = document.getElementById("partOfSpeech");
    
    const selectedInitial = initialSelect.value;
    const selectedMedial = medialSelect.value;
    const selectedFinal = finalSelect.value;
    const selectedTone = toneSelect.value;
    const selectedPartOfSpeech = partOfSpeechSelect.value;
    const selectedStyles =
        Array.from(
            document.querySelectorAll("#styles input:checked")
        ).map(function(checkbox) {
            return checkbox.value;
        });

    const result = document.getElementById("results");

    const matchedWords = words.filter(function(word) {

        const lastSyllable =
            word.syllables[word.syllables.length - 1];

        const initialMatch =
            selectedInitial === "" ||
            selectedInitial === "all" ||
            lastSyllable.initial === selectedInitial;

        const medialMatch =
            selectedMedial === "" ||
            selectedMedial === "all" ||
            lastSyllable.medial === selectedMedial;

        const finalMatch =
            selectedFinal === "" ||
            selectedFinal === "all" ||
            lastSyllable.final === selectedFinal;

        const toneMatch =
            selectedTone === "" ||
            selectedTone === "all" ||
            String(lastSyllable.tone) === selectedTone;

        const partOfSpeechMatch =
            selectedPartOfSpeech === "" ||
            selectedPartOfSpeech === "all" ||
            word.partOfSpeech.includes(selectedPartOfSpeech);

        const styleMatch =
            selectedStyles.length === 0 ||
            selectedStyles.every(function(style) {
                return word.styles.includes(style);
            });
        
        return (
            initialMatch &&
            medialMatch &&
            finalMatch &&
            toneMatch &&
            partOfSpeechMatch &&
            styleMatch
        );
    });

    if (matchedWords.length === 0) {
        result.innerHTML = "<p>找不到符合的詞彙。</p>";
        return;
    }

    result.innerHTML = "";

    matchedWords.forEach(function(word) {
        const item = document.createElement("div");

        item.textContent = word.word;

        result.appendChild(item);
    });
}
