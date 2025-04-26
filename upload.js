
// Initialize Supabase
const supabaseUrl = 'https://rgdqkqtncubgshdyofzp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZHFrcXRuY3ViZ3NoZHlvZnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2OTM1NzEsImV4cCI6MjA2MTI2OTU3MX0.OXXiTLSYLFvswyXbEsUXJUdmqEcB84f8v6XzOsiw5Zo';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  // Upload image to Supabase Storage
  const { data, error } = await supabase.storage
    .from('xrays')
    .upload(file.name, file);

  if (error) {
    console.error('Error uploading image:', error.message);
    alert('Upload failed: ' + error.message);
    return;
  }

  // Get the URL of the uploaded image
  const fileURL = supabase.storage.from('xrays').getPublicUrl(data.path).publicURL;

  console.log('✅ Uploaded!', fileURL, diagnosis);
  alert('✅ X-ray uploaded successfully!');

  uploadForm.reset();
});
