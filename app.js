const client = new Appwrite.Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('680d35f30021babe5cc9')
    .setKey('standard_ffedfecc971f828de454d03ec0d26988684e5dab152554a91e952b9f03b82b19dedc85b7e671d14d8e11d64c96cb9df2eb882be6c65d1abfe81bdfc516b7e6ac36c30a8f93f86112f2a9a65e67d31e3d24d7d5717bac2d5f96ffa0d5825322fe76aec8978fe93ff90234184b151631670f5670a4634aa519481dbfd00fb5d8bc');

const storage = new Appwrite.Storage(client);
const bucketId = '680d36a3002343bdd2ed';

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('xrayImage').files[0];
  const diagnosis = document.getElementById('diagnosis').value;

  try {
    const upload = await storage.createFile(bucketId, Appwrite.ID.unique(), file, [
      Appwrite.Permission.read(Appwrite.Role.any()),
    ]);

    alert('X-ray uploaded! Note: Save diagnosis separately in a database later.');
    document.getElementById('uploadForm').reset();
  } catch (err) {
    console.error(err);
    alert('Upload failed!');
  }
});

// Test Mode
document.getElementById('testModeButton').addEventListener('click', async () => {
  try {
    const result = await storage.listFiles(bucketId);
    if (result.files.length === 0) return alert('No X-rays uploaded yet.');

    const randomFile = result.files[Math.floor(Math.random() * result.files.length)];
    const previewURL = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${randomFile.$id}/view?project=680d35f30021babe5cc9`;

    const img = document.getElementById('xrayDisplay');
    img.src = previewURL;
    img.style.display = 'block';

    const guess = prompt('What is your diagnosis?');
    alert(`You guessed: ${guess}\n(Feedback system coming soon!)`);
  } catch (err) {
    console.error(err);
    alert('Error in Test Mode');
  }
});

// Study Mode
document.getElementById('studyModeButton').addEventListener('click', async () => {
  const container = document.getElementById('studyContainer');
  container.innerHTML = '';

  try {
    const result = await storage.listFiles(bucketId);
    if (result.files.length === 0) return alert('No X-rays uploaded yet.');

    result.files.forEach((file) => {
      const item = document.createElement('div');
      item.className = 'study-item';

      const img = document.createElement('img');
      img.src = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${file.$id}/view?project=680d35f30021babe5cc9`;
      img.alt = 'X-ray';

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Type diagnosis';

      item.appendChild(img);
      item.appendChild(input);
      container.appendChild(item);
    });
  } catch (err) {
    console.error(err);
    alert('Error loading study images');
  }
});
