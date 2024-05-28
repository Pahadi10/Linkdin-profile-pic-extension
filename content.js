let originalProfilePictures = [];

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
    if (!originalProfilePictures.some(p => p.element === img)) {
      originalProfilePictures.push({ element: img, src: img.src, srcset: img.srcset });
    }
    img.src = imageUrl;
    img.srcset = imageUrl;
  });
}

function restoreOriginalProfilePictures() {
  originalProfilePictures.forEach(({ element, src, srcset }) => {
    element.src = src;
    element.srcset = srcset;
  });
  originalProfilePictures = [];
}

function updateProfilePictures() {
  chrome.storage.local.get(['profilePic'], ({ profilePic }) => {
    if (profilePic) {
      replaceProfilePictures(profilePic);
    } else {
      restoreOriginalProfilePictures();
    }
  });
}

window.addEventListener('load', updateProfilePictures);

const observer = new MutationObserver(updateProfilePictures);
observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateProfilePictures') {
    updateProfilePictures();
  }
});
