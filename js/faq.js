/**
 * Pakistan-HIVSolutions FAQ Logic
 */

let allFAQs = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    const faqList = document.getElementById('faqList');
    const faqSearch = document.getElementById('faqSearch');
    const faqCategories = document.getElementById('faqCategories');

    // Fetch data
    try {
        const response = await fetch('../data/faqs.json');
        allFAQs = await response.json();
        
        // Generate Category Pills
        const categories = ['all', ...new Set(allFAQs.map(item => item.category))];
        faqCategories.innerHTML = categories.map(cat => `
            <button class="btn category-pill ${cat === 'all' ? 'active' : ''}" 
                    data-category="${cat}" 
                    style="border-radius: 100px; padding: 0.5rem 1.5rem; background: ${cat === 'all' ? 'var(--primary)' : 'var(--white)'}; color: ${cat === 'all' ? 'white' : 'var(--primary)'}; border: 1px solid var(--primary); font-weight: 600; cursor: pointer;">
                ${cat === 'all' ? 'All Topics' : cat}
            </button>
        `).join('');

        renderFAQs(allFAQs);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading FAQs:', error);
        faqList.innerHTML = '<div style="text-align: center; padding: 3rem;">Error loading FAQ data. Please try again later.</div>';
    }

    function setupEventListeners() {
        // Category Filtering
        faqCategories.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-pill')) {
                // Update active pill
                document.querySelectorAll('.category-pill').forEach(btn => {
                    btn.style.background = 'var(--white)';
                    btn.style.color = 'var(--primary)';
                    btn.classList.remove('active');
                });
                e.target.style.background = 'var(--primary)';
                e.target.style.color = 'white';
                e.target.classList.add('active');

                currentCategory = e.target.getAttribute('data-category');
                filterFAQs();
            }
        });

        // Search Filtering
        faqSearch.addEventListener('input', filterFAQs);
    }

    function filterFAQs() {
        const query = faqSearch.value.toLowerCase();
        
        const filtered = allFAQs.filter(faq => {
            const matchesQuery = faq.question.toLowerCase().includes(query) || 
                                faq.answer.toLowerCase().includes(query);
            const matchesCategory = currentCategory === 'all' || faq.category === currentCategory;
            return matchesQuery && matchesCategory;
        });

        renderFAQs(filtered);
    }

    function renderFAQs(faqs) {
        if (faqs.length === 0) {
            faqList.innerHTML = '<div style="text-align: center; padding: 4rem; background: var(--white); border-radius: var(--radius);">No questions found matching your search.</div>';
            return;
        }

        faqList.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item" id="faq-${index}">
                <div class="faq-question">
                    <span>${faq.question}</span>
                    <span data-icon="chevronRight" style="transition: transform 0.3s; width: 1.5rem; height: 1.5rem;"></span>
                </div>
                <div class="faq-answer">
                    ${faq.answer}
                </div>
            </div>
        `).join('');

        // Setup Accordion Toggle
        document.querySelectorAll('.faq-item').forEach(item => {
            item.querySelector('.faq-question').addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // Re-inject icons
        if (window.injectIcons) window.injectIcons();
    }
});
