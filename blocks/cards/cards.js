import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholder = await fetchPlaceholders('');
  // retrieve the value for key 'foo'
  console.table("DATA", placeholder);
  const { addToCart, bestMatch } = placeholder;
  console.log("en...", addToCart, "/", bestMatch);
  
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}

// export default async function decorate(block) {
//   // fetch placeholders from the 'en' folder
//   const placeholders = await fetchPlaceholders('Key');
//   // retrieve the value for key 'foo'
//   const { foo } = placeholders;
//   console.log("...", foo);
//   }
