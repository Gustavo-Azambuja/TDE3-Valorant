const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const agentsContainer = document.getElementById('agents');

// Fetch agent data from the Valorant API
async function fetchAgents() {
  const response = await fetch('https://valorant-api.com/v1/agents');
  const data = await response.json();
  return data.data;
}

// Display agent data on the page
function displayAgents(agents) {
  agentsContainer.innerHTML = '';
  agents.forEach(agent => {
    const agentCard = document.createElement('div');
    agentCard.classList.add('agent-card');

    const agentImage = document.createElement('img');
    agentImage.src = agent.fullPortrait;

    agentCard.appendChild(agentImage);
    agentsContainer.appendChild(agentCard);
  });
}

// Filter agents based on the search input
function filterAgents(agents, query) {
  return agents.filter(agent =>
    agent.displayName.toLowerCase().includes(query.toLowerCase())
  );
}

// Add event listener to the search button
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchAgents()
      .then(agents => filterAgents(agents, query))
      .then(displayAgents)
      .catch(error => console.error(error));
  } else {
    fetchAgents().then(displayAgents).catch(error => console.error(error));
  }
});

// Fetch and display agents initially
fetchAgents().then(displayAgents).catch(error => console.error(error));