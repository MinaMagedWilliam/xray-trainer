
const client = new Appwrite.Client(); 
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('680d35f30021babe5cc9')
    .setKey('standard_ffedfecc971f828de454d03ec0d26988684e5dab152554a91e952b9f03b82b19dedc85b7e671d14d8e11d64c96cb9df2eb882be6c65d1abfe81bdfc516b7e6ac36c30a8f93f86112f2a9a65e67d31e3d24d7d5717bac2d5f96ffa0d5825322fe76aec8978fe93ff90234184b151631670f5670a4634aa519481dbfd00fb5d8bc');
 // Add this line with your API Key
const storage = new Appwrite.Storage(client);

// Handle form submission
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const file = document.getElementById('xrayImage').files[0];
  const diagnosis = document.getElementById('diagnosis').value.trim();

  if (!file || !diagnosis) {
    alert('Please select an image and enter a diagnosis.');
    return;
  }

  try {
    // Upload image to Appwrite Storage
    const response = await storage.createFile('680d36a3002343bdd2ed', 'unique()', file);
    console.log('✅ Uploaded!', response);
    alert('✅ X-ray uploaded successfully!');
    uploadForm.reset();
  } catch (error) {
    console.error('Error uploading image:', error.message);
    alert('Upload failed: ' + error.message);
  }
});
