// charts.js - Chart.js configuration and management
(function() {
    let skillsChart = null;
    
    function createRadarChart() {
        const ctxRadar = document.getElementById('skillsRadar')?.getContext('2d');
        if (!ctxRadar) return;
        
        // Destroy existing chart if it exists
        if (skillsChart) {
            skillsChart.destroy();
        }
        
        const isLight = document.body.classList.contains('light');
        
        skillsChart = new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['SQL', 'Python', 'Power BI', 'Excel', 'Tableau', 'Statistics'],
                datasets: [{
                    label: 'Proficiency',
                    data: [90, 80, 85, 95, 75, 70],
                    backgroundColor: 'rgba(45, 212, 191, 0.2)',
                    borderColor: '#2dd4bf',
                    pointBackgroundColor: '#2dd4bf',
                    pointBorderColor: isLight ? '#0f172a' : '#ffffff',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#2dd4bf',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        beginAtZero: true,
                        grid: {
                            color: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
                        },
                        pointLabels: {
                            color: isLight ? '#334155' : '#9aa7b9',
                            font: {
                                size: 11,
                                weight: '500'
                            }
                        },
                        ticks: {
                            color: isLight ? '#64748b' : '#9aa7b9',
                            backdropColor: 'transparent',
                            stepSize: 20,
                            callback: function(value) {
                                return value + '';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Proficiency: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize chart when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Small delay to ensure DOM is fully loaded
        setTimeout(createRadarChart, 100);
    });
    
    // Update chart when theme changes
    window.addEventListener('themechange', function() {
        setTimeout(createRadarChart, 50);
    });
})();