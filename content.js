function replaceProfilePictures(imageUrl) {
  const selectors = [
    'img.ivm-view-attr__img--centered.EntityPhoto-circle-3.update-components-actor__avatar-image.evi-image.lazy-image.ember-view',
    'img.ivm-view-attr__img--centered.EntityPhoto-circle-1.evi-image.lazy-image.ember-view',
    'img.avatar.member.EntityPhoto-circle-2.evi-image.ember-view',
    'img.ivm-view-attr__img--centered.ivm-image-view-model__circle-img.evi-image.lazy-image.ember-view',
    'img.ivm-view-attr__img--centered.ivm-image-view-model__square-img.evi-image.lazy-image.ember-view',
    'img[alt*="profile"]'
  ];

  const allProfilePictures = selectors.flatMap(selector => 
    [...document.querySelectorAll(selector)]
  );

  allProfilePictures.forEach(img => {
    img.src = imageUrl;
    img.srcset = imageUrl;
  });
}

function updateProfilePictures() {
  chrome.storage.local.get(['profilePic'], ({ profilePic }) => {
    const imageUrl = profilePic ? profilePic : chrome.runtime.getURL('images/default-profile-pic.jpg');
    replaceProfilePictures(imageUrl);
  });
}

window.addEventListener('load', updateProfilePictures);

const observer = new MutationObserver(updateProfilePictures);
observer.observe(document.body, { childList: true, subtree: true });
