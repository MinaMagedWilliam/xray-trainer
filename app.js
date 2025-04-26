// Initialize Appwrite client
const client = new Appwrite.Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Appwrite endpoint
    .setProject('680d35f30021babe5cc9') // Your Appwrite project ID
    .setKey('standard_ffedfecc971f828de454d03ec0d26988684e5dab152554a91e952b9f03b82b19dedc85b7e671d14d8e11d64c96cb9df2eb882be6c65d1abfe81bdfc516b7e6ac36c30a8f93f86112f2a9a65e67d31e3d24d7d5717bac2d5f96ffa0d5825322fe76aec8978fe93ff90234184b151631670f5670a4634aa519481dbfd00fb5d8bc');

// Initialize storage service
const storage = new Appwrite.Storage(client);

// Handle upload form submission
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get the selected file and diagnosis
  const file = document.getElementById('xrayImage').files[0];
  const diagnosis = document.getElementById('diagnosis').value.trim();

  if (!file || !diagnosis) {
    alert('Please select an image and enter a diagnosis.');
    return;
  }

  try {
    // Upload the file to Appwrite Storage
    const response = await storage.createFile('680d36a3002343bdd2ed', 'unique()', file); // Bucket ID
    console.log('✅ Uploaded!', response);
    alert('✅ X-ray uploaded successfully!');
    uploadForm.reset();
  } catch (error) {
    console.error('Error uploading image:', error.message);
    alert('Upload failed: ' + error.message);
  }
});

// Test Mode - Fetch random X-ray image
const testModeButton = document.getElementById('testModeButton');
testModeButton.addEventListener('click', async function () {
  try {
    // Fetch list of all X-ray files
    const files = await storage.listFiles('680d36a3002343bdd2ed'); // Bucket ID

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
