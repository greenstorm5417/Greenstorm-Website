// hobbies.js

document.addEventListener('DOMContentLoaded', () => {
    // Photo Gallery Lightbox
    const images = document.querySelectorAll('.photo-gallery img');

    images.forEach(img => {
        img.addEventListener('click', () => {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');

            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = img.src;
            enlargedImg.alt = img.alt;

            // Append to overlay
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            // Close overlay on click
            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        });
    });

    // Example: Adding GSAP Animations to Hobbies List Items
    const hobbiesItems = document.querySelectorAll('.hobbies ul li');

    hobbiesItems.forEach((item, index) => {
        gsap.from(item, {
            duration: 1,
            opacity: 0,
            y: 50,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });
});
