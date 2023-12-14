// script.js

document.getElementById('poemInput').addEventListener('input', updateVisualization);

function getPartOfSpeech(word) {
    const tags = nlp(word).out('tags');
    
    // Extract the POS tag for the first token (assuming one word for simplicity)
    const firstTokenPOS = tags[0];

    // Map the POS tag to a simplified category
    switch (firstTokenPOS) {
        case 'Noun':
            return 'noun';
        case 'Verb':
            return 'verb';
        case 'Adjective':
            return 'adjective';
        default:
            return 'other';
    }
}


function isPunctuation(char) {
    return /[.,;:'"!?()—]/.test(char);
}

function updateVisualization() {
    const poemInput = document.getElementById('poemInput').value;
    const lines = poemInput.split('\n');

    const visualizationDiv = document.getElementById('visualization');
    visualizationDiv.innerHTML = '';

    let totalWidth = 0;

    lines.forEach(line => {
        const lineContainer = document.createElement('div');

        let word = '';
        let punctuation = '';

        for (let i = 0; i <= line.length; i++) {
            const char = line[i];

            if (isPunctuation(char) || char === ' ' || i === line.length) {
                // Handle punctuation marks
                if (punctuation) {
                    const punctuationBlock = document.createElement('div');
                    punctuationBlock.textContent = punctuation;
                    punctuationBlock.className = 'punctuation';
                    lineContainer.appendChild(punctuationBlock);

                    // Calculate width for punctuation marks
                    totalWidth += punctuation.length * 10;

                    // Reset punctuation for the next iteration
                    punctuation = '';
                }

                // Handle words
                if (word) {
                    const wordBlock = document.createElement('div');
                    const partOfSpeech = getPartOfSpeech(word);
                    wordBlock.className = `wordBlock ${partOfSpeech}`; 
                    wordBlock.style.width = `${word.length * 5}px`; // Adjust the multiplier based on your preference
                    lineContainer.appendChild(wordBlock);

                    // Calculate width for words
                    totalWidth += word.length * 10;

                    // Reset the word for the next iteration
                    word = '';
                }
            } else {
                // Build the word until a space or punctuation mark is encountered
                word += char;
            }

            // Accumulate punctuation until a non-punctuation character or the end of the line
            if (isPunctuation(char)) {
                punctuation += char;
            }
        }

        // Add a line break after each line container
        const lineBreak = document.createElement('br');
        lineContainer.appendChild(lineBreak);

        // Append the line container to the visualization
        visualizationDiv.appendChild(lineContainer);
    });

    // Set the width of the visualizationDiv based on the total width
    visualizationDiv.style.width = `${totalWidth}px`;
}


document.addEventListener("DOMContentLoaded", function () {
    const colors = ['#8B0000', '#704214', '#4F6B7F', '#6F4E87', '#2F4F4F', '#E6E6FA', '#87CEEB', '#FFD700', '#FFA07A', '#FF91A4'];

    // Create color picker div
    const colorPicker = document.createElement("div");
    colorPicker.classList.add("color-picker");
    
    // Append color boxes to the color picker
    colors.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color;

        colorBox.addEventListener("click", function () {
            // Remove border from all color boxes
            colorPicker.querySelectorAll(".color-box").forEach(box => {
                box.classList.remove("selected-color");
            });

            // Add border to the selected color box
            colorBox.classList.add("selected-color");
        });

        colorPicker.appendChild(colorBox);
    });

    // Append the color picker to the body
    document.body.appendChild(colorPicker);
});

document.getElementById('poemInput').addEventListener('input', updateVisualization);
