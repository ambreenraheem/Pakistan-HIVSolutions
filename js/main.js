/**
 * Pakistan-HIVSolutions Main Library
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.color = '#ffffff';
        } else {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.color = 'inherit';
        }
    });

    // Handle Active Link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPath) && currentPath !== '/') {
            link.style.color = 'var(--accent)';
            link.style.fontWeight = '700';
        }
    });

    // Implementation of Search (Global if applicable)
    window.globalSearch = (query) => {
        console.log('Searching for:', query);
        // Redirect to search results or filter current page
    };
});
