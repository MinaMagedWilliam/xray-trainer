// Initialize Supabase
const { createClient } = supabase;
const supabase = createClient('https://rgdqkqtncubgshdyofzp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZHFrcXRuY3ViZ3NoZHlvZnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2OTM1NzEsImV4cCI6MjA2MTI2OTU3MX0.OXXiTLSYLFvswyXbEsUXJUdmqEcB84f8v6XzOsiw5Zo');

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
    .upload('xrays/' + file.name, file);

  if (error) {
    console.error('Error uploading image:', error);
    alert('Upload failed, try again.');
    return;
  }

  // Get the URL of the uploaded image
  const fileURL = supabase.storage.from('xrays').getPublicUrl(data.path).publicURL;

  // Save diagnosis and image URL to Supabase Database (optional)
  // For now, we'll just log the URL and diagnosis
  console.log('✅ Uploaded!', fileURL, diagnosis);

  // Display success message
  alert('✅ X-ray uploaded successfully!');
  uploadForm.reset();
});
