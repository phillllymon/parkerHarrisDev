console.log('Oh hello.');

window.addEventListener('DOMContentLoaded', () => {
    let mainTitle = document.getElementById("mainTitle");
    let shortContent = document.getElementById("shortContent");
    let bio = document.getElementById("bio");
    const shrinkBio = () => {
        bio.classList.remove("bioAlive");
        bio.classList.add("bioShrunk");
        document.bioShrunk = true;
    };
    let resume = document.getElementById("resume");
    const shrinkResume = () => {
        resume.classList.remove("resumeAlive");
        resume.classList.add("resumeShrunk");
    };
    let projects = document.getElementById("projects_total");
    const shrinkProjects = () => {
        projects.classList.remove("projects_total");
        projects.classList.add("projects_shrunk");
    };

    let currentLink = 'homeLink';
    

    //projects stuff
    let checkMateyLink = document.getElementById("checkMateyLink");
    let checkMateyProject = document.getElementById("checkMatey");
    let windWavesLink = document.getElementById("windWavesLink");
    let graffitiLink = document.getElementById("graffitiLink");
    let chessMoveLink = document.getElementById("chessMoveLink");

    let windWavesProject = document.getElementById("windWaves");
    let dontDieLink = document.getElementById("dontDieLink");
    let dontDieProject = document.getElementById("dontDieTogether");
    let graffitiProject = document.getElementById("graffiti");
    let chessMoveProject = document.getElementById("chessMove");

    let currentProject = graffitiProject;
    let currentProjectLink = graffitiLink;

    const projectsSection = document.getElementById("projects_total");

    document.getElementById("homeLink").addEventListener('click', () => {
        document.getElementById(currentLink).classList.remove("linkIshSpecial");
        currentLink = 'homeLink';
        document.getElementById(currentLink).classList.add("linkIshSpecial");
        mainTitle.innerHTML = "Parker Harris";
        shortContent.innerHTML = '<span class="black_text">Skills: </span>Ruby / Rails, Javascript, React, Redux, SQL, PHP, HTML / CSS';
        shrinkBio();
        shrinkResume();
        shrinkProjects();
    });
    document.getElementById("contactLink").addEventListener('click', () => {
        document.getElementById(currentLink).classList.remove("linkIshSpecial");
        currentLink = 'contactLink';
        document.getElementById(currentLink).classList.add("linkIshSpecial");
        mainTitle.innerHTML = "Contact Parker:";
        shortContent.innerHTML = "rparkerharris@gmail.com &nbsp&nbsp 802-760-7970";
        shrinkBio();
        shrinkResume();
        shrinkProjects();
    });
    document.getElementById("bioLink").addEventListener('click', () => {
        document.bioShrunk = false;
        document.getElementById(currentLink).classList.remove("linkIshSpecial");
        currentLink = 'bioLink';
        document.getElementById(currentLink).classList.add("linkIshSpecial");
        const message = "Hi, I'm Parker.";
        let currMessage = "";
        const messageInterval = setInterval(() => {
            currMessage += message[currMessage.length];
            if (!document.bioShrunk) mainTitle.innerHTML = currMessage;
            if (currMessage.length === message.length) {
                clearInterval(messageInterval);
            }
        }, 150);
        shortContent.innerHTML = '';
        bio.classList.remove("bioHidden");
        bio.classList.add("bioAlive");
        shrinkResume();
        shrinkProjects();
    });
    document.getElementById("resumeLink").addEventListener('click', () => {
        document.getElementById(currentLink).classList.remove("linkIshSpecial");
        currentLink = 'resumeLink';
        document.getElementById(currentLink).classList.add("linkIshSpecial");
        mainTitle.innerHTML = "Resume";
        shortContent.innerHTML = '';
        resume.classList.remove("resumeHidden");
        resume.classList.add("resumeAlive");
        shrinkBio();
        shrinkProjects();
    });
    document.getElementById("projectsLink").addEventListener('click', () => {
        document.getElementById(currentLink).classList.remove("linkIshSpecial");
        currentLink = 'projectsLink';
        document.getElementById(currentLink).classList.add("linkIshSpecial");
        mainTitle.innerHTML = "Projects:";
        shortContent.innerHTML = ''
        shrinkBio();
        shrinkResume();
        document.getElementById("projects_total").classList.remove("hidden_project");
        projects.classList.remove("projects_shrunk");
        projects.classList.add("projects_total");

        
        currentProject.classList.add("hidden_project");
        
        
        currentProjectLink.classList.remove("specialProject");
        
        graffitiLink.classList.add("specialProject");
        graffitiProject.classList.remove("hidden_project");
        currentProject = graffitiProject;
        currentProjectLink = graffitiLink;
    });
    
    [
        [checkMateyLink, checkMateyProject, "projects_total"],
        [windWavesLink, windWavesProject, "projects_total"],
        [dontDieLink, dontDieProject, "projects_total"],
        [graffitiLink, graffitiProject, "projects_tall"],
        [chessMoveLink, chessMoveProject, "projects_tall"]
    ].forEach((projectSet) => {
        const link = projectSet[0];
        const project = projectSet[1];
        link.addEventListener("click", () => {
            projectsSection.classList.remove("projects_total");
            projectsSection.classList.remove("projects_tall");
            projectsSection.classList.add(projectSet[2]);
            if (currentProject) {
                currentProject.classList.add("hidden_project");
            }
            if (currentProjectLink) {
                currentProjectLink.classList.remove("specialProject");
            }
            link.classList.add("specialProject");
            project.classList.remove("hidden_project");
            currentProject = project;
            currentProjectLink = link;
        });
    });

    // animate slideshows
    [
        ["graffiti_pic", 7],
        ["checkMatey_pic", 5]
    ].forEach((picSet) => {
        const picHolder = document.getElementById(picSet[0]);
        let i = 0;
        picHolder.classList.add(`${picSet[0]}${i}`);
        setInterval(() => {
            picHolder.classList.remove(`${picSet[0]}${i}`);
            i = (i + 1) % picSet[1];
            picHolder.classList.add(`${picSet[0]}${i}`);
        }, 3000);
    });
});