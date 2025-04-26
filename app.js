// Initialize Appwrite client
const client = new Appwrite.Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Appwrite endpoint
    .setProject('680d35f30021babe5cc9') // Your Appwrite project ID
    .setKey('standard_ffedfecc971f828de454d03ec0d26988684e5dab152554a91e952b9f03b82b19dedc85b7e671d14d8e11d64c96cb9df2eb882be6c65d1abfe81bdfc516b7e6ac36c30a8f93f86112f2a9a65e67d31e3d24d7d5717bac2d5f96ffa0d5825322fe76aec8978fe93ff90234184b151631670f5670a4634aa519481dbfd00fb5d8bc');

// Initialize storage service
const storage = new Appwrite.Storage(client);

// Test Mode - Fetch random X-ray image
const testModeButton = document.getElementById('testModeButton');
testModeButton.addEventListener('click', async function () {
  try {
    // Fetch list of all X-ray files
    const files = await storage.listFiles('680d36a3002343bdd2ed'); // Bucket ID
    if (files.files.length === 0) {
      alert('No X-ray images found!');
      return;
    }

    // Pick a random file
    const randomFile = files.files[Math.floor(Math.random() * files.files.length)];

    // Display the image
    const imageDisplay = document.getElementById('xrayDisplay');
    imageDisplay.src = randomFile.url;
    imageDisplay.style.display = 'block';

    // Prompt for diagnosis
    const diagnosis = prompt('What is the diagnosis for this X-ray?');
    if (diagnosis) {
      alert('You typed: ' + diagnosis);  // Add logic to compare it with the correct diagnosis
    }
  } catch (error) {
    console.error('Error fetching files:', error.message);
    alert('Failed to fetch X-ray files: ' + error.message);
  }
});

// Study Mode - Display all X-rays and diagnoses
const studyModeButton = document.getElementById('studyModeButton');
studyModeButton.addEventListener('click', async function () {
  try {
    // Fetch list of all X-ray files
    const files = await storage.listFiles('680d36a3002343bdd2ed'); // Bucket ID
    if (files.files.length === 0) {
      alert('No X-ray images found!');
      return;
    }

    // Create a container for the images and diagnoses
    const studyContainer = document.getElementById('studyContainer');
    studyContainer.innerHTML = ''; // Clear existing content

    // Loop through all files and display them
    files.files.forEach(file => {
      const div = document.createElement('div');
      div.classList.add('study-item');

      const img = document.createElement('img');
      img.src = file.url;
      img.alt = 'X-ray Image';
      img.style.width = '100px';
      img.style.height = 'auto';

      const diagnosisInput = document.createElement('input');
      diagnosisInput.type = 'text';
      diagnosisInput.placeholder = 'Enter diagnosis';

      div.appendChild(img);
      div.appendChild(diagnosisInput);
      studyContainer.appendChild(div);
    });

  } catch (error) {
    console.error('Error fetching files for study mode:', error.message);
    alert('Failed to fetch X-ray files: ' + error.message);
  }
});
