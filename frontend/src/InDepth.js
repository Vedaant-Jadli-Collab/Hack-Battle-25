document.getElementById('githubBtn').addEventListener('click', function() {

  const githubUrl = "https://github.com/Vedaant-Jadli-Collab/Hack-Battle-25";
  window.open(githubUrl, "_blank");
});

const contributors = [
  {
    name: "Kumar Sarthak",
    linkedin: "https://www.linkedin.com/in/kumar-sarthak-193ba1370/"
  },
  {
    name: "Rajas Nimje",
    linkedin: "https://www.linkedin.com/in/rajas-nimje-32b815367/"
  },
  {
    name: "Shlok Domgaonkar",
    linkedin: "https://www.linkedin.com/in/shlok-domgaonkar-4938b2386/"
  },
  {
    name: "Vedaant Manoj Jadli",
    linkedin: "https://www.linkedin.com/in/vedaant-manoj-jadli-57b766378/"
  }
];

function loadContributors() {
  const container = document.getElementById('contributors-list');
  contributors.forEach(c => {
    const card = document.createElement('div');
    card.className = 'contributor-card';

    const name = document.createElement('div');
    name.className = 'contributor-name';
    name.textContent = c.name;

    const link = document.createElement('a');
    link.className = 'contributor-link';
    link.href = c.linkedin;
    link.textContent = "LinkedIn Profile";
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    card.appendChild(name);
    card.appendChild(link);
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', loadContributors);
