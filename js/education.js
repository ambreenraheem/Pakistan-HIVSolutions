/**
 * Pakistan-HIVSolutions Education Hub Logic
 */

let allArticles = [];

document.addEventListener('DOMContentLoaded', async () => {
    const articlesGrid = document.getElementById('articlesGrid');
    const articleSearch = document.getElementById('articleSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    // Fetch data
    try {
        const response = await fetch('../data/articles.json');
        allArticles = await response.json();
        renderArticles(allArticles);
    } catch (error) {
        console.error('Error loading articles:', error);
        articlesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">Error loading articles. Please try again later.</div>';
    }

    // Search Logic
    articleSearch.addEventListener('input', filterArticles);
    categoryFilter.addEventListener('change', filterArticles);

    function filterArticles() {
        const query = articleSearch.value.toLowerCase();
        const category = categoryFilter.value;

        const filtered = allArticles.filter(article => {
            const matchesQuery = article.title.toLowerCase().includes(query) || 
                                article.summary.toLowerCase().includes(query);
            const matchesCategory = category === 'all' || article.category === category;
            return matchesQuery && matchesCategory;
        });

        renderArticles(filtered);
    }

    function renderArticles(articles) {
        if (articles.length === 0) {
            articlesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">No articles found matching your criteria.</div>';
            return;
        }

        articlesGrid.innerHTML = articles.map(article => `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="font-size: 0.75rem; color: var(--accent); font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">${article.category}</div>
                    <h3 style="margin-bottom: 1rem;">${article.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${article.summary}</p>
                </div>
                <a href="#" class="btn btn-primary" style="padding: 0.5rem 1rem; width: fit-content; font-size: 0.875rem;">Read More</a>
            </div>
        `).join('');
    }
});
