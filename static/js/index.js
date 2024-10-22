document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if the link is an internal section
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Else, allow normal navigation (e.g., to /hobbies)
        });
    });

    // Adding a Fade-In Effect to Main Content
    const mainContent = document.querySelector('main');
    mainContent.classList.add('animate__animated', 'animate__fadeIn');

    // Implementing Random Green Noise Background in Intro Section
    const canvas = document.getElementById('noiseCanvas');
    const ctx = canvas.getContext('2d');
    
    // Scale factor to control noise zoom level (1 = normal, < 1 = zoomed out, > 1 = zoomed in)
    const scaleFactor = 3; // Adjust this value to control the zoom level of the noise

    // Set canvas dimensions to match the intro section
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        generateNoise();
    }

    // Generate random green noise with scaling factor
    function generateNoise() {
        const scaledWidth = Math.floor(canvas.width / scaleFactor);
        const scaledHeight = Math.floor(canvas.height / scaleFactor);
        
        const imageData = ctx.createImageData(scaledWidth, scaledHeight);
        const data = imageData.data;

        // Populate the noise image data
        for (let i = 0; i < data.length; i += 4) {
            const green = Math.floor(Math.random() * 128); // Reduced range for darker green
            data[i] = 0;           // Red channel
            data[i + 1] = green;  // Green channel
            data[i + 2] = 0;       // Blue channel
            data[i + 3] = 255;     // Alpha channel
        }

        // Scale the noise to fill the canvas
        const scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = scaledWidth;
        scaledCanvas.height = scaledHeight;
        const scaledCtx = scaledCanvas.getContext('2d');
        scaledCtx.putImageData(imageData, 0, 0);

        // Draw the scaled noise onto the main canvas, filling it
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(scaledCanvas, 0, 0, canvas.width, canvas.height);
    }

    // Initial canvas setup
    resizeCanvas();

    // Regenerate noise on window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // Optional: Regenerate noise periodically for dynamic effect
    setInterval(() => {
        generateNoise();
    }, 1000); // Regenerate every 1000ms
});
