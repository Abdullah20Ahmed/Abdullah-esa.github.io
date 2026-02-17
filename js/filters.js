// filters.js - Project filtering functionality
(function() {
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        if (!filterBtns.length || !projects.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                // Filter projects
                projects.forEach(proj => {
                    const cats = proj.dataset.category;
                    if (filter === 'all' || (cats && cats.includes(filter))) {
                        proj.style.display = 'flex';
                        proj.style.animation = 'fadeIn 0.3s ease';
                    } else {
                        proj.style.display = 'none';
                    }
                });
            });
        });
    }
    
    document.addEventListener('DOMContentLoaded', initProjectFilters);
})();