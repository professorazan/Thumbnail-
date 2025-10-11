document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const promptInput = document.getElementById('prompt');
    const reEditPromptInput = document.getElementById('re-edit-prompt');
    const ratioSelect = document.getElementById('ratio');
    const qualitySelect = document.getElementById('quality');
    const themeSelect = document.getElementById('theme');
    const thumbnailDisplay = document.getElementById('thumbnail-display');
    const reEditSection = document.getElementById('re-edit-section');

    const apiKey = "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";
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

    const generateThumbnail = async () => {
        const prompt = promptInput.value;
        if (!prompt) {
            alert("Please enter a prompt.");
            return;
        }

        thumbnailDisplay.innerHTML = '<p>Generating...</p>';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "google/gemini-flash-1.5", // Or any other image generation model
                    messages: [{ role: "user", content: prompt }],
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const imageBase64 = data.choices[0].message.content; // Adjust based on actual API response structure for images

            if (imageBase64) {
                 thumbnailDisplay.innerHTML = `<img src="data:image/png;base64,${imageBase64}" alt="Generated Thumbnail">`;
                 reEditPromptInput.value = prompt;
                 reEditSection.classList.remove('hidden');
            } else {
                 thumbnailDisplay.innerHTML = '<p>Could not generate thumbnail. Please try again.</p>';
            }
        } catch (error) {
            console.error("Error generating thumbnail:", error);
            thumbnailDisplay.innerHTML = '<p>An error occurred. Please check the console for details.</p>';
        }
    };

    const regenerateThumbnail = async () => {
        const prompt = reEditPromptInput.value;
        if (!prompt) {
            alert("Please enter a prompt.");
            return;
        }

        thumbnailDisplay.innerHTML = '<p>Regenerating...</p>';
        promptInput.value = prompt; // Update the main prompt as well

        // This would be a new API call similar to generateThumbnail
        // For demonstration, we'll just call the same function
        generateThumbnail();
    };


    generateBtn.addEventListener('click', generateThumbnail);
    regenerateBtn.addEventListener('click', regenerateThumbnail);
});
