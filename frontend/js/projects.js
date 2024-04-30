const projectContainer = document.getElementById('project-list-container');

async function fetchProjects() {
  try {
    const response = await fetch('https://api.github.com/users/oltsu-code/repos');
    const data = await response.json();

    data.forEach(renderProject);
  } catch (error) {
    renderError(error);
  }
}

function renderProject(repo) {
  const description = repo.description || "No description";
  const projectElement = document.createElement('div');
  projectElement.classList.add('item');
  projectElement.innerHTML = `
    <h3>${repo.name}</h3>
    <p>${description}</p>
    <a href="project/${repo.name}" target="_blank">View</a>
  `;
  projectContainer.appendChild(projectElement);
}

function renderError(error) {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error');
  errorMessage.textContent = `Couldn't fetch GitHub repositories! Check console for more info.`;
  projectContainer.appendChild(errorMessage);
  console.error(`Error fetching GitHub repositories: ${error}`);
}

fetchProjects();
