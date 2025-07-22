document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('courseSurvey');
  const resultsDiv = document.getElementById('results');
  const programResults = document.getElementById('programResults');
  
  // RRC Programs Database
  const rrcPrograms = [
    {
      name: "Business Administration",
      description: "2-year diploma with co-op opportunities in management, marketing, and finance.",
      matchKeywords: ["business", "office", "communication"]
    },
    {
      name: "Computer Science",
      description: "2-year diploma focusing on software development and programming.",
      matchKeywords: ["technology", "technical", "fulltime"]
    },
    {
      name: "Nursing",
      description: "2-year diploma preparing students for healthcare careers with clinical experience.",
      matchKeywords: ["health", "healthcare", "fulltime"]
    },
    {
      name: "Graphic Design",
      description: "2-year creative program focusing on visual communication.",
      matchKeywords: ["creative", "visual", "flexible"]
    },
    {
      name: "Electrical Engineering",
      description: "2-year technical program with hands-on electrical systems training.",
      matchKeywords: ["technical", "hands-on", "fulltime"]
    }
  ];

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const responses = [];
    
    // Collect all responses
    for (let [name, value] of formData.entries()) {
      responses.push(value);
    }
    
    // Score programs based on matches
    const scoredPrograms = rrcPrograms.map(program => {
      let score = 0;
      program.matchKeywords.forEach(keyword => {
        if (responses.includes(keyword)) score++;
      });
      return { ...program, score };
    }).filter(program => program.score > 0)
      .sort((a, b) => b.score - a.score);
    
    // Display results
    if (scoredPrograms.length > 0) {
      programResults.innerHTML = scoredPrograms.map(program => `
        <div class="program-card">
          <h3>${program.name}</h3>
          <p>${program.description}</p>
          <p><strong>Match Score:</strong> ${program.score}/3</p>
          <a href="https://www.rrc.ca/programs/" class="rrc-btn">Program Details</a>
        </div>
      `).join('');
    } else {
      programResults.innerHTML = `
        <div class="program-card">
          <p>No strong matches found. We recommend:</p>
          <a href="contact.html" class="rrc-btn">Contact Academic Advising</a>
        </div>
      `;
    }
    
    form.style.display = 'none';
    resultsDiv.style.display = 'block';
    window.scrollTo(0, 0);
  });
});