
const client = new Appwrite.Client(); 
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('680d35f30021babe5cc9');

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
    const response = await storage.createFile('YOUR_BUCKET_ID', 'unique()', file);
    console.log('✅ Uploaded!', response);
    alert('✅ X-ray uploaded successfully!');
    uploadForm.reset();
  } catch (error) {
    console.error('Error uploading image:', error.message);
    alert('Upload failed: ' + error.message);
  }
});
