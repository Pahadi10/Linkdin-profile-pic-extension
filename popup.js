document.getElementById('apply').addEventListener('click', () => {
  const fileInput = document.getElementById('upload');
  const file = fileInput.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      chrome.storage.local.set({ profilePic: reader.result }, () => {
        alert('Profile picture uploaded successfully!');
        // Notify the content script to update the profile pictures
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'updateProfilePictures' });
        });
      });
    };
    
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image file.');
  }
});

document.getElementById('remove').addEventListener('click', () => {
  chrome.storage.local.remove('profilePic', () => {
      alert('Profile picture removed!');
      // Notify the content script to update the profile pictures
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'updateProfilePictures' });
      });
  });
});
