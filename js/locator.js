/**
 * Pakistan-HIVSolutions Care Locator Logic
 */

let allLocations = [];

document.addEventListener('DOMContentLoaded', async () => {
    const locationsList = document.getElementById('locationsList');
    const provinceFilter = document.getElementById('provinceFilter');
    const citySearch = document.getElementById('citySearch');
    const typeFilter = document.getElementById('typeFilter');

    // Fetch data
    try {
        const response = await fetch('../data/locations.json');
        allLocations = await response.json();
        renderLocations(allLocations);
    } catch (error) {
        console.error('Error loading locations:', error);
        locationsList.innerHTML = '<div style="text-align: center; padding: 3rem;">Error loading facility data. Please try again later.</div>';
    }

    // Filter Logic
    [provinceFilter, citySearch, typeFilter].forEach(el => {
        el.addEventListener('input', filterLocations);
    });

    function filterLocations() {
        const province = provinceFilter.value;
        const city = citySearch.value.toLowerCase();
        const type = typeFilter.value;

        const filtered = allLocations.filter(loc => {
            const matchesProvince = province === 'all' || loc.province === province;
            const matchesCity = loc.city.toLowerCase().includes(city);
            const matchesType = type === 'all' || loc.type === type || loc.services.includes(type);
            return matchesProvince && matchesCity && matchesType;
        });

        renderLocations(filtered);
    }

    function renderLocations(locations) {
        if (locations.length === 0) {
            locationsList.innerHTML = '<div style="text-align: center; padding: 4rem; background: var(--white); border-radius: var(--radius);">No facilities found matching your criteria.</div>';
            return;
        }

        locationsList.innerHTML = locations.map(loc => `
            <div class="card" style="padding: 1.5rem; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center; border-left: 4px solid var(--accent);">
                <div>
                    <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.25rem;">${loc.type} | ${loc.province}</div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--primary);">${loc.name}</h3>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                        ${loc.services.map(s => `<span style="font-size: 0.75rem; background: #e2e8f0; padding: 0.25rem 0.75rem; border-radius: 100px; color: var(--primary); font-weight: 600;">${s}</span>`).join('')}
                    </div>
                    <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 0.25rem;"><strong>Address:</strong> ${loc.address}, ${loc.city}</p>
                </div>
                <div style="text-align: right;">
                    <div style="color: var(--accent); font-weight: 800; font-size: 1.1rem; margin-bottom: 0.5rem;">
                         <span data-icon="phone" style="width: 1rem; height: 1rem; vertical-align: middle;"></span> ${loc.contact}
                    </div>
                    <a href="tel:${loc.contact.replace(/-/g, '')}" class="btn btn-outline" style="color: var(--accent); border-color: var(--accent); padding: 0.5rem 1rem; font-size: 0.875rem;">Call Now</a>
                </div>
            </div>
        `).join('');

        // Re-inject icons for the newly rendered elements
        if (window.injectIcons) window.injectIcons();
    }
});
