document.getElementById('apply').addEventListener('click', () => {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        chrome.storage.local.set({ profilePic: reader.result }, () => {
          alert('Profile picture uploaded successfully!');
        });
      };
      
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
  });
  