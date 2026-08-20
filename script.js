async function loadWords() {
    const response = await fetch("words.json");
    const words = await response.json();

    return words;
}

async function searchWords() {
    const words = await loadWords();

    const initialSelect = document.getElementById("initial");
    const medialSelect = document.getElementById("medial");
    const finalSelect = document.getElementById("final");
    const toneSelect = document.getElementById("tone");

    const selectedInitial = initialSelect.value;
    const selectedMedial = medialSelect.value;
    const selectedFinal = finalSelect.value;
    const selectedTone = toneSelect.value;
    console.log("聲母：", selectedInitial);
    console.log("介音：", selectedMedial);
    console.log("韻母：", selectedFinal);
    console.log("聲調：", selectedTone);

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

        return (
            initialMatch &&
            medialMatch &&
            finalMatch &&
            toneMatch
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
