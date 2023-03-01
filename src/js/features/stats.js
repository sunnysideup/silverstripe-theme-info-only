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
        projectHoursLeft: 0,
        projectDaysLeft: 0,
        completeDate: new Date()
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
        if (project.isActive) {
            calcStats.activeProjects++;
            calcStats.projectHoursLeft += project.HoursLeft;
            calcStats.projectDaysLeft = Math.round(calcStats.projectHoursLeft/5);
            calcStats.completeDate = new Date(new Date().getTime()+(calcStats.projectDaysLeft*24*60*60*1000));
        }
    }
}

function displayStats() {
    document.getElementById("stats-total-sites").innerHTML = calcStats.totalSites;
    document.getElementById("stats-current-sites").innerHTML = calcStats.sitesWithCurrentProject;
    document.getElementById("stats-inactive-sites").innerHTML = calcStats.totalSites-calcStats.sitesWithCurrentProject;
    document.getElementById("stats-total-projects").innerHTML = calcStats.totalProjects;
    document.getElementById("stats-active-projects").innerHTML = calcStats.activeProjects;
    document.getElementById("stats-past-projects").innerHTML = calcStats.totalProjects-calcStats.activeProjects;
    document.getElementById("stats-project-hours").innerHTML = Math.round(calcStats.projectHoursLeft).toLocaleString("en-US");
    document.getElementById("stats-project-days").innerHTML = calcStats.projectDaysLeft.toLocaleString("en-GB");
    document.getElementById("stats-completion-day").innerHTML = calcStats.completeDate.toLocaleDateString("en-GB");
}