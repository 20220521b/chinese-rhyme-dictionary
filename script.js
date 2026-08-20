async function loadWords() {
    const response = await fetch("words.json");

    console.log("JSON 請求成功：", response.ok);

    const words = await response.json();

    console.log("讀到的詞彙：", words);

    return words;
}

async function searchWords() {
    const words = await loadWords();

    const finalSelect = document.getElementById("final");
    const result = document.getElementById("results");

    const selectedFinal = finalSelect.value;

    const matchedWords = words.filter(function(word) {
        const lastSyllable = word.syllables[word.syllables.length - 1];
        return lastSyllable.final === selectedFinal;
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
