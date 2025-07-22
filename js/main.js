document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('courseSurvey');
  const questions = document.querySelectorAll('.survey-question');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const progressBar = document.getElementById('progressBar');
  const resultsContainer = document.getElementById('resultsContainer');
  const programResults = document.getElementById('programResults');
  
  let currentQuestion = 0;
  const totalQuestions = questions.length;
  
  // RRC Programs Data
  const rrcPrograms = [
    {
      name: "Business Administration",
      category: "business",
      length: "2 years",
      delivery: "Full-time/Part-time",
      coOp: true,
      salary: "$45,000 - $65,000",
      description: "Develop essential business skills in management, marketing, and finance.",
      matchCriteria: ["career", "business", "office", "fulltime", "communication", "leadership"]
    },
    {
      name: "Computer Analyst/Programmer",
      category: "technology",
      length: "2 years",
      delivery: "Full-time",
      coOp: true,
      salary: "$55,000 - $85,000",
      description: "Learn software development, database design, and system analysis.",
      matchCriteria: ["technology", "technical", "analytical", "fulltime", "office", "remote"]
    },
    {
      name: "Nursing",
      category: "health",
      length: "2 years",
      delivery: "Full-time",
      coOp: true,
      salary: "$60,000 - $80,000",
      description: "Prepare for a career in healthcare with hands-on clinical experience.",
      matchCriteria: ["healthcare", "health", "fulltime", "essential", "communication"]
    },
    {
      name: "Graphic Design",
      category: "creative",
      length: "2 years",
      delivery: "Full-time",
      coOp: true,
      salary: "$40,000 - $60,000",
      description: "Develop visual communication skills for print and digital media.",
      matchCriteria: ["creative", "visual", "flexible", "preferred"]
    },
    {
      name: "Electrical Engineering Technology",
      category: "technology",
      length: "2 years",
      delivery: "Full-time",
      coOp: true,
      salary: "$50,000 - $75,000",
      description: "Gain skills in electrical systems design and implementation.",
      matchCriteria: ["technical", "hands-on", "field", "fulltime", "essential"]
    },
    {
      name: "Hospitality and Tourism Management",
      category: "business",
      length: "2 years",
      delivery: "Full-time/Part-time",
      coOp: true,
      salary: "$40,000 - $60,000",
      description: "Prepare for leadership roles in the hospitality industry.",
      matchCriteria: ["business", "varied", "communication", "leadership", "preferred"]
    }
  ];

  // Initialize survey
  function showQuestion(index) {
    questions.forEach((question, i) => {
      question.classList.toggle('active', i === index);
    });
    
    // Update buttons
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = index === totalQuestions - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = index === totalQuestions - 1 ? 'inline-block' : 'none';
    
    // Update progress bar
    const progress = ((index + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Navigation
  nextBtn.addEventListener('click', function() {
    if (validateCurrentQuestion()) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  });

  prevBtn.addEventListener('click', function() {
    currentQuestion--;
    showQuestion(currentQuestion);
  });

  // Validate current question before proceeding
  function validateCurrentQuestion() {
    const currentQ = questions[currentQuestion];
    const inputs = currentQ.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked');
    
    if (inputs.length === 0) {
      alert('Please select an option to continue');
      return false;
    }
    return true;
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateResults();
  });

  // Calculate matching programs
  function calculateResults() {
    const formData = new FormData(form);
    const responses = {};
    
    // Get all responses
    for (let [name, value] of formData.entries()) {
      if (!responses[name]) {
        responses[name] = [];
      }
      responses[name].push(value);
    }
    
    // Score programs based on responses
    const scoredPrograms = rrcPrograms.map(program => {
      let score = 0;
      program.matchCriteria.forEach(criteria => {
        if (Object.values(responses).flat().includes(criteria)) {
          score++;
        }
      });
      return { ...program, score };
    });
    
    // Sort by best match
    const sortedPrograms = scoredPrograms.sort((a, b) => b.score - a.score);
    
    // Display top 3 results
    displayResults(sortedPrograms.slice(0, 3));
  }

  // Display results
  function displayResults(programs) {
    form.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    if (programs.length === 0) {
      programResults.innerHTML = `
        <div class="no-results">
          <p>We couldn't find a perfect match based on your responses.</p>
          <p>Please contact <a href="mailto:academicadvising@rrc.ca">Academic Advising</a> for personalized guidance.</p>
        </div>
      `;
      return;
    }
    
    programResults.innerHTML = programs.map(program => `
      <div class="program-card">
        <h3>${program.name}</h3>
        <div class="program-details">
          <p><strong>Duration:</strong> ${program.length}</p>
          <p><strong>Delivery:</strong> ${program.delivery}</p>
          <p><strong>Co-op:</strong> ${program.coOp ? 'Available' : 'Not available'}</p>
          <p><strong>Average Salary:</strong> ${program.salary}</p>
        </div>
        <p class="program-description">${program.description}</p>
        <a href="https://www.rrc.ca/programs/" class="rrc-btn">Learn More</a>
      </div>
    `).join('');
  }

  // Initialize
  showQuestion(0);
});