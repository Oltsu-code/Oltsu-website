fetch('https://api.github.com/users/oltsu-code/repos')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById('project-container');

        data.forEach(repo => {
            const project = document.createElement('div');
            project.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            `;
            projectsContainer.appendChild(project);
        });
    })
    .catch(error => console.error('Error fetching GitHub repositories:', error));

function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown.style.display === 'none' || dropdown.style.display.display == '') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

