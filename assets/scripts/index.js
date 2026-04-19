// Vanilla 3D Tilt Effect
const tiltCard = document.getElementById('vanilla-tilt-card');

if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top; // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: max 10 degrees
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    tiltCard.style.transition = 'none'; // remove transition for smooth tracking
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    tiltCard.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  });
  
  tiltCard.addEventListener('mouseenter', () => {
    tiltCard.style.transition = 'none';
  });
}

// Add smooth staggered fade for project cards on load
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100 * (index + 1) + 400); // 400ms delay after main page load
});
