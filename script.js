document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const aspectRatio = document.getElementById('aspectRatio').value;
    const theme = document.getElementById('theme').value;
    const quality = document.getElementById('quality').value;
    const fontStyle = document.getElementById('fontStyle').value;
    const imageContainer = document.getElementById('imageContainer');
    const loading = document.getElementById('loading');

    if (!prompt) {
        alert('Please enter a prompt for the thumbnail.');
        return;
    }

    loading.classList.remove('hidden');
    imageContainer.innerHTML = '';

    try {
        const response = await fetch('/generate-thumbnail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `${prompt}, ${theme} theme, ${fontStyle} font style`,
                ratio: aspectRatio,
                quality: quality
            })
        });

        const data = await response.json();

        if (data.image) {
            const img = document.createElement('img');
            img.src = data.image;
            
            const watermark = document.createElement('div');
            watermark.textContent = 'Made with Azan Thumbnail Maker';
            watermark.style.position = 'absolute';
            watermark.style.bottom = '10px';
            watermark.style.right = '10px';
            watermark.style.color = 'white';
            watermark.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            watermark.style.padding = '5px';
            watermark.style.borderRadius = '5px';
            
            const container = document.createElement('div');
            container.style.position = 'relative';
            container.appendChild(img);
            container.appendChild(watermark);

            imageContainer.appendChild(container);
        } else {
            imageContainer.innerHTML = '<p>Error generating thumbnail. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        imageContainer.innerHTML = '<p>An error occurred. Please check the console.</p>';
    } finally {
        loading.classList.add('hidden');
    }
});
