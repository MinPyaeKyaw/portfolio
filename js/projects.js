const projects = [
  {
    title: "Project Title One",
    desc: "ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ်",
    link: "https://www.google.com",
    date: "3rd March 2023",
    tectStacks: ["React", "Node", "Postgresql"],
  },
  {
    title: "Project Title Two",
    desc: "ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ်",
    link: "https://www.google.com",
    date: "3rd March 2023",
    tectStacks: ["React", "Node", "MySQL"],
  },
  {
    title: "Project Title Three",
    desc: "ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ်",
    link: "https://www.google.com",
    date: "3rd March 2023",
    tectStacks: ["React", "Node", "MongoDB"],
  },
  {
    title: "One",
    desc: "ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ်",
    link: "https://www.google.com",
    date: "3rd March 2025",
    tectStacks: ["React", "Node", "Postgresql"],
  },
  {
    title: "Two",
    desc: "ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ်",
    link: "https://www.google.com",
    date: "3rd March 2025",
    tectStacks: ["React", "Node", "MySQL"],
  },
  {
    title: "Three",
    desc: "ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ် ဘာဖြစ်တယ် ညာဖြစ်တယ်",
    link: "https://www.google.com",
    date: "3rd March 2025",
    tectStacks: ["React", "Node", "MongoDB"],
  },
];

const projectContainer = document.querySelector(".project-container");

projects.forEach((project) => {
  const techStacks = project.tectStacks
    .map((tectStk) => `<div class="tech-stack">${tectStk}</div>`)
    .join("");

  const projectItem = `<div class="project-item">
          <a href="${project.link}">
            <div class="project-shape-shadow">
              <svg viewBox="0 0 300 170">
                <path
                  d="M 0 0 H 300 V 140 Q 220 180 150 160 Q 80 140 0 170 Z"
                  fill="black"
                />
              </svg>
            </div>

            <div class="project-shape">
              <svg viewBox="0 0 300 170">
                <path
                  d="M 0 0 H 300 V 140 Q 220 180 150 160 Q 80 140 0 170 Z"
                  fill="#e5e5e5"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>

              <div class="project-info">
                <h2>${project.title}</h2>
                <small>${project.date}</small>

                <div class="tech-stack-container">
                  ${techStacks}
                </div>
              </div>

              <a class="open-link" href="${project.link}">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="green"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  ></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>

            <p class="project-desc">
                ${project.desc}
            </p>
          </a>
        </div>`;

  projectContainer.innerHTML += projectItem;
});
