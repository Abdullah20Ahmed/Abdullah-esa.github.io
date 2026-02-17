// theme.js - Theme management
(function() {
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    
    // Initialize theme from localStorage
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light');
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-sun"></i> Light / Dark';
            }
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        body.classList.toggle('light');
        const isLight = body.classList.contains('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        if (toggle) {
            toggle.innerHTML = isLight ? 
                '<i class="fas fa-sun"></i> Light / Dark' : 
                '<i class="fas fa-moon"></i> Light / Dark';
        }
        
        // Dispatch custom event for charts to update
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: isLight ? 'light' : 'dark' }
        }));
    }
    
    // Add event listener when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
        }
    });
})();