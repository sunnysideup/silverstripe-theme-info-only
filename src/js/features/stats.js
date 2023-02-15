let calcStats = {};

refreshStats();

export function refreshStats() {
    calculateStats();
    displayStats();
}

function calculateStats() {
    calcStats = {
        totalSites: 0,
        sitesWithCurrentProject: 0,
        totalProjects: 0,
        activeProjects: 0,
        projectHoursLeft: 0
    }
    //count site stats
    for (var i = 0; i < window.stats.sites.length; i++) {
        const site = window.stats.sites[i];
        calcStats.totalSites++;
        if (site.isCurrent) {
            calcStats.sitesWithCurrentProject++;
        }
    }
    //count project stats
    for (var i = 0; i < window.stats.projects.length; i++) {
        const project = window.stats.projects[i];
        calcStats.totalProjects++;
        calcStats.projectHoursLeft += project.HoursLeft;
        if (project.isActive) {
            calcStats.activeProjects++;
        }
    }
}

function displayStats() {
    document.getElementById("stats-total-sites").innerHTML = calcStats.totalSites;
    document.getElementById("stats-current-sites").innerHTML = calcStats.sitesWithCurrentProject;
    document.getElementById("stats-total-projects").innerHTML = calcStats.totalProjects;
    document.getElementById("stats-active-projects").innerHTML = calcStats.activeProjects;
    document.getElementById("stats-project-hours").innerHTML = calcStats.projectHoursLeft;
}