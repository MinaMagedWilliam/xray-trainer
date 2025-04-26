const imageInput = document.getElementById('xrayImage');
const previewDiv = document.getElementById('preview');
const uploadForm = document.getElementById('uploadForm');

// Preview selected image
imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewDiv.innerHTML = `<img src="${e.target.result}" style="width: 100%; margin-top: 10px; border-radius: 8px;">`;
    };
    reader.readAsDataURL(file);
  }
});

// Handle form submission
uploadForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const file = imageInput.files[0];
  const diagnosis = document.getElementById('diagnosis').value.trim();

  if (!file || !diagnosis) {
    alert('Please select an image and enter a diagnosis.');
    return;
  }

  // Here, normally you would upload to Firebase/Supabase
  alert('✅ (Simulation) Uploaded successfully!\n\n(Real upload needs Firebase/Supabase)');

  // Reset form
  uploadForm.reset();
  previewDiv.innerHTML = '';
});
