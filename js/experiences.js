const experiences = [
  {
    company: "Plus Impact",
    position: "In-house Software Engineer",
    year: "Jun 2025 - Present",
  },
  {
    company: "EDKA Digital",
    position: "Senior Full Stack Developer",
    year: "Jun 2024 - Jun 2025",
  },
  {
    company: "KBZ Bank",
    position: "Software Engineer",
    year: "April 2023 - Jun 2024",
  },
  {
    company: "Web3re Technologies",
    position: "Web Developer",
    year: "May 2022 - March 2023",
  },
  {
    company: "ACE Data Systems",
    position: "Junior Mobile Developer",
    year: "December 2021 - Jun 2022",
  },
];

const expTimeline = document.querySelector(".timeline");

experiences.forEach((exp) => {
  const timelineItem = `
        <div class="timeline-item">
          <div class="date">${exp.year}</div>

          <div class="smile">
            <img src="./imgs/exp-3.png" class="smile-img" />
          </div>

          <div class="content">
            <div class="company">${exp.company}</div>
            <div class="position">${exp.position}</div>
          </div>
        </div>
    `;

  expTimeline.innerHTML += timelineItem;
});
