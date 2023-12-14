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

function updateVisualization() {
    const poemInput = document.getElementById('poemInput').value;
    const lines = poemInput.split('\n');

    const visualizationDiv = document.getElementById('visualization');
    visualizationDiv.innerHTML = '';

    let totalWidth = 0;

    lines.forEach(line => {
        const lineContainer = document.createElement('div');

        const words = line.split(/\s+/);

        words.forEach(word => {
            const wordBlock = document.createElement('div');
            const partOfSpeech = getPartOfSpeech(word);
            wordBlock.className = `wordBlock ${partOfSpeech}`; 
            wordBlock.style.width = `${word.length * 10}px`; // Adjust the multiplier based on your preference
            lineContainer.appendChild(wordBlock);

            totalWidth += word.length * 10; // Accumulate the width for each word
        });

        // Add a line break after each line container
        const lineBreak = document.createElement('br');
        lineContainer.appendChild(lineBreak);

        // Append the line container to the visualization
        visualizationDiv.appendChild(lineContainer);
    });

    // Set the width of the visualizationDiv based on the total width
    visualizationDiv.style.width = `${totalWidth}px`;
}

// Color picker event listener
document.getElementById('colorPicker').addEventListener('change', function() {
    const selectedColor = this.value;
    
    // Update the background color of the selected color circle
    const colorCircle = document.getElementById('selectedColorCircle');
    colorCircle.style.backgroundColor = selectedColor;
    colorCircle.style.width = '30px'; // Adjust the size of the circle as needed
    colorCircle.style.height = '30px';
});

// Save color button event listener
document.getElementById('saveColorButton').addEventListener('click', function() {
    const selectedColor = document.getElementById('colorPicker').value;
    
    // Save the color to local storage
    localStorage.setItem('savedColor', selectedColor);
    alert('Color saved!');
});

// Initialize the color circle with the default color
const defaultColor = document.getElementById('colorPicker').value;
const colorCircle = document.getElementById('selectedColorCircle');
colorCircle.style.backgroundColor = defaultColor;
colorCircle.style.width = '30px'; // Adjust the size of the circle as needed
colorCircle.style.height = '30px';