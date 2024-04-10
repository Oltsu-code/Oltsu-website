fetch('https://api.github.com/users/oltsu-code/repos')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById('project-container');

        data.forEach(repo => {
            const project = document.createElement('div');
            project.classList.add('item');
            if (repo.description == null) {
                repo.description = "No description";
            }
            project.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
                <a href="project/${repo.name}" target="_blank">View</a>
            `;
            projectsContainer.appendChild(project);
        });
    })
    .catch(error => {
        console.error('Error fetching GitHub repositories:', error)
        document.getElementById('project-container').innerHTML = `
            <h3>Error fetching GitHub repositories:</h3><br/>
            <p>${error}<p>
        `;
    });