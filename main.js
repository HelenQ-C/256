let indexData = []; 

fetch('index.json')
  .then(response => response.json())
  .then(data => {
    indexData = data;
  })
  .catch(error => {
    console.error('Error loading index data:', error);
  });

  function populateOverlay() {
    const overlay = document.getElementById('index-overlay');
    overlay.innerHTML = ''; 
  
    const activeCategories = [];
    if (isReligiousOn) activeCategories.push('Religious');
    if (isEerieOn) activeCategories.push('Eerie');
    if (isRetroOn) activeCategories.push('Retro Object');
    if (isTwoThousandsOn) activeCategories.push('2000s');
    if (isFuturismOn) activeCategories.push('Futurism');
    if (isCybersigilismOn) activeCategories.push('Cybersigilism');
  
    // Determine whether to show all items or filter based on active categories
    const itemsToDisplay = activeCategories.length > 0
      ? indexData.filter(item => activeCategories.includes(item.category))
      : indexData;
  
    if (itemsToDisplay.length === 0) {
      const message = document.createElement('p');
      message.textContent = 'No items available for the selected categories.';
      overlay.appendChild(message);
      return;
    }
  
    itemsToDisplay.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('index-item');
  
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('image-column');
  
      const img = document.createElement('img');
      img.src = item.image;
      img.style.width = '100%';
      img.style.height = 'auto';
  
      if (isDarkModeOn) {
        img.style.filter = 'invert(1) grayscale(1)';
      }
  
      imageDiv.appendChild(img);
  
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info-column');
  
      if (item.title) {
        const title = document.createElement('p');
        title.textContent = item.title;
        infoDiv.appendChild(title);
      }
  
      if (item.author) {
        const author = document.createElement('p');
        author.textContent = `Author: ${item.author}`;
        infoDiv.appendChild(author);
      }
  
      if (item.year) {
        const year = document.createElement('p');
        year.textContent = `Year: ${item.year}`;
        infoDiv.appendChild(year);
      }
  
      if (item.source) {
        const source = document.createElement('p');
        source.innerHTML = `Source: ${item.source}`;
        infoDiv.appendChild(source);
      }
  
      if (item.category) {
        const category = document.createElement('p');
        category.textContent = `Category: ${item.category}`;
        infoDiv.appendChild(category);
      }
  
      itemDiv.appendChild(imageDiv);
      itemDiv.appendChild(infoDiv);
  
      overlay.appendChild(itemDiv);
    });
  }

const IMAGE_WIDTH = 100;

const religiousImages = [];

for (let i = 1; i <= 26; i++) {
  religiousImages.push(`Assets/Religious_image${i}.jpg`);
}

const futurismImages = [];

for (let i = 1; i <= 32; i++) {
  futurismImages.push(`Assets/Futurism_image${i}.jpg`);
}

const cybersigilismImages = [];

for (let i = 1; i <= 44; i++) {
  cybersigilismImages.push(`Assets/Cybersigilism_image${i}.jpg`);
}

const eerieImages = [];

for (let i = 1; i <= 34; i++) {
  eerieImages.push(`Assets/Eerie_image${i}.jpg`);
}

const retroImages = [];

for (let i = 1; i <= 36; i++) {
  retroImages.push(`Assets/Retro_image${i}.jpg`);
}

const twothousandsImages = [];

for (let i = 1; i <= 32; i++) {
  twothousandsImages.push(`Assets/2000s_image${i}.jpg`);
}


let images = futurismImages.concat(religiousImages,cybersigilismImages,eerieImages,retroImages,twothousandsImages);

// img preload 
function preloadImages(imageArray) {
    imageArray.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }
  preloadImages(futurismImages);
  preloadImages(religiousImages);
  preloadImages(cybersigilismImages);
  preloadImages(eerieImages);
  preloadImages(twothousandsImages)

  let currentImage = images[Math.floor(Math.random() * images.length)];  // random image to start

  const customCursor = document.createElement('img'); // image as cursor 
  customCursor.src = currentImage;
  customCursor.id = 'custom-cursor';
  customCursor.style.position = 'absolute';
  customCursor.style.pointerEvents = 'none';
  customCursor.style.width = `${IMAGE_WIDTH}px`; 
  customCursor.style.zIndex = '1000';
  document.body.appendChild(customCursor);

  let cursorWidth = IMAGE_WIDTH / 2; //center the image on cursor
  let cursorHeight = IMAGE_WIDTH / 2;

  // calculating image dimension after load >> accuracy 
  customCursor.onload = function() {
    cursorWidth = customCursor.offsetWidth / 2;
    cursorHeight = customCursor.offsetHeight / 2;
  };

  // positioning image cursor
  document.addEventListener('mousemove', function (e) {
    if (!isDragModeOn) {
      customCursor.style.left = `${e.pageX - cursorWidth}px`; //current mouse cordinates 
      customCursor.style.top = `${e.pageY - cursorHeight}px`;
    }
  });

  // Array to keep track of stamped images
  const stampedImages = [];

  let isBlendingModeOn = false; // initial stage
  let isDragModeOn = false;
  let isStaticModeOn = false;
  let isDarkModeOn = false;
  let isFuturismOn = false;
  let isReligiousOn = false;
  let isIndexModeOn = false;
  let isCybersigilismOn = false;
  let isEerieOn = false;
  let isRetroOn = false;
  let isTwoThousandsOn = false;

  // Variables for dragging
  let draggedStamp = null;
  let offsetX = 0;
  let offsetY = 0;

  const clearButton = document.getElementById('clear-stamps-button');
  const blendButton = document.getElementById('toggle-blend-button');
  const dragButton = document.getElementById('drag-button');
  const staticButton = document.getElementById('static-button');
  const darkButton = document.getElementById('dark-button');
  const religiousButton = document.getElementById('religious-button')
  const futurismButton = document.getElementById('futurism-button');
  const cybersigilismButton = document.getElementById('cybersigilism-button');
  const eerieButton = document.getElementById('eerie-button');
  const retroButton = document.getElementById('retro-button');
  const twothousandsButton = document.getElementById('twothousands-button')


  // event listeners
  clearButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent stamping when clicking the button
    stampedImages.forEach(function(stamp) {
      stamp.remove();
    });
    stampedImages.length = 0; // clear all
  });

  blendButton.addEventListener('click', function(event) {
    event.stopPropagation(); // prevent effects when hovering over to the button
    isBlendingModeOn = !isBlendingModeOn;

    if (isBlendingModeOn) {
      blendButton.classList.add('button-clicked');
    } else {
      blendButton.classList.remove('button-clicked');
    }
  });

  dragButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isDragModeOn = !isDragModeOn;

    if (isDragModeOn) {
      dragButton.classList.add('button-clicked');
      customCursor.style.display = 'none'; 
      document.body.style.cursor = 'default'; //back to default
      stampedImages.forEach(function(stamp) {
        stamp.style.cursor = 'move'; 
        stamp.addEventListener('mousedown', startDrag); //drag
      });
    } else {
      dragButton.classList.remove('button-clicked');
      customCursor.style.display = 'block';
      document.body.style.cursor = 'none';
      stampedImages.forEach(function(stamp) {
        stamp.style.cursor = 'default';
        stamp.removeEventListener('mousedown', startDrag);
      });
    }
  });

  staticButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isStaticModeOn = !isStaticModeOn;

    if (isStaticModeOn) {
      staticButton.classList.add('button-clicked');
    } else {
      staticButton.classList.remove('button-clicked');
    }
  });

  darkButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isDarkModeOn = !isDarkModeOn;
  
    if (isDarkModeOn) {
      darkButton.classList.add('button-clicked');
      document.body.classList.add('dark-mode');
  
      // Invert the stamped images
      stampedImages.forEach(function(stamp) {
        stamp.style.filter = 'invert(1) grayscale(1)';
      });
  
      // Invert the custom cursor
      customCursor.style.filter = 'invert(1) grayscale(1)';
    } else {
      darkButton.classList.remove('button-clicked');
      document.body.classList.remove('dark-mode');
  
      // Remove the inversion from stamped images
      stampedImages.forEach(function(stamp) {
        stamp.style.filter = '';
      });
  
      // Reset the custom cursor filter
      customCursor.style.filter = '';
    }
  
    // Update the overlay if it's active
    if (isIndexModeOn && indexOverlay.classList.contains('active')) {
      populateOverlay();
    }
  });

  religiousButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isReligiousOn = !isReligiousOn;
    updateImageSet();
  
    if (isIndexModeOn && indexOverlay.classList.contains('active')) {
      populateOverlay();
    }
  });
  
  eerieButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isEerieOn = !isEerieOn;
    updateImageSet();
  
    if (isIndexModeOn && indexOverlay.classList.contains('active')) {
      populateOverlay();
    }
  });
  
  retroButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isRetroOn = !isRetroOn;
    updateImageSet();
  
    if (isIndexModeOn && indexOverlay.classList.contains('active')) {
      populateOverlay();
    }
  });
  
  twothousandsButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isTwoThousandsOn = !isTwoThousandsOn; // Use consistent variable name
    updateImageSet();
  
    if (isIndexModeOn && indexOverlay.classList.contains('active')) {
      populateOverlay();
    }
  });
  
  futurismButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isFuturismOn = !isFuturismOn;
    updateImageSet();
  
    if (isIndexModeOn && indexOverlay.classList.contains('active')) {
      populateOverlay();
    }
  });
  
  cybersigilismButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    isCybersigilismOn = !isCybersigilismOn;
    updateImageSet();
  
    if (isIndexModeOn && indexOverlay.classList.contains('active')) {
      populateOverlay();
    }
  });

  function updateImageSet() {
    images = []; // Reset the images array
  
    if (isFuturismOn) {
      images = images.concat(futurismImages);
      futurismButton.classList.add('button-clicked');
    } else {
      futurismButton.classList.remove('button-clicked');
    }
  
    if (isReligiousOn) {
      images = images.concat(religiousImages);
      religiousButton.classList.add('button-clicked');
    } else {
      religiousButton.classList.remove('button-clicked');
    }
  
    if (isCybersigilismOn) {
      images = images.concat(cybersigilismImages);
      cybersigilismButton.classList.add('button-clicked');
    } else {
      cybersigilismButton.classList.remove('button-clicked');
    }

    if (isEerieOn) {
      images = images.concat(eerieImages);
      eerieButton.classList.add('button-clicked');
    } else {
      eerieButton.classList.remove('button-clicked');
    }

    if (isRetroOn) {
      images = images.concat(retroImages);
      retroButton.classList.add('button-clicked');
    } else {
      retroButton.classList.remove('button-clicked');
    }

    if (isTwoThousandsOn) {
      images = images.concat(twothousandsImages);
      twothousandsButton.classList.add('button-clicked');
    } else {
      twothousandsButton.classList.remove('button-clicked');
    }
  
    // If no categories are selected, use all images
    if (!isFuturismOn && !isReligiousOn && !isCybersigilismOn && !isEerieOn && !isRetroOn && !isTwoThousandsOn) {
      images = futurismImages.concat(religiousImages, cybersigilismImages, eerieImages, retroImages, twothousandsImages);
    }
  
    // Update the current image and custom cursor
    currentImage = images[Math.floor(Math.random() * images.length)];
    customCursor.src = currentImage;
  
    // Update cursor dimensions after the new image loads
    customCursor.onload = function() {
      cursorWidth = customCursor.offsetWidth / 2;
      cursorHeight = customCursor.offsetHeight / 2;
  
      // Apply inversion if dark mode is on
      if (isDarkModeOn) {
        customCursor.style.filter = 'invert(1)';
      } else {
        customCursor.style.filter = '';
      }
    };
  }
  
  // Call updateImageSet() to initialize the image set
  updateImageSet();

  function hideCustomCursor() {
    customCursor.style.display = 'none'; 
  }

  function showCustomCursor() {
    if (!isDragModeOn) {
      customCursor.style.display = 'block'; // if drag button "clicked" hide custom cursor
    }
  }

  const buttons = document.querySelectorAll('button'); 

  buttons.forEach(function(button) {
    button.addEventListener('mouseenter', hideCustomCursor);
    button.addEventListener('mouseleave', showCustomCursor);
  });

  function startDrag(e) { //drag function
    e.preventDefault();
    draggedStamp = e.target;
    draggedStamp.isDragging = true;

    const rect = draggedStamp.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }

  // Function to handle dragging
  function drag(e) {
    if (draggedStamp) {
      // Update position of draggedStamp
      draggedStamp.style.left = `${e.pageX - offsetX}px`;
      draggedStamp.style.top = `${e.pageY - offsetY}px`;
    }
  }

  function stopDrag(e) {
        document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    if (draggedStamp) {
      draggedStamp.isDragging = false;
      draggedStamp = null;
    }
  }

  document.addEventListener('click', function (e) {
    // Do not stamp if clicking on a button or if drag mode is on
    if (e.target.tagName.toLowerCase() === 'button' || isDragModeOn) {
      return;
    }
  
    const stamp = document.createElement('img');
    stamp.src = currentImage;
    stamp.style.position = 'absolute';
    stamp.style.zIndex = '999'; // ensure stamps are below buttons
    const randomWidth = Math.floor(Math.random() * 150) + 300; // 300 - 450 image width
    stamp.style.width = `${randomWidth}px`;
  
    stamp.style.visibility = 'hidden';
    document.body.appendChild(stamp); // hide stamp at first before loading all images 
    stamp.onload = function() {
      const stampWidth = stamp.offsetWidth;
      const stampHeight = stamp.offsetHeight;
  
      stamp.style.left = `${e.pageX - stampWidth / 2}px`; 
      stamp.style.top = `${e.pageY - stampHeight / 2}px`;
  
      if (isBlendingModeOn) {
        stamp.style.mixBlendMode = 'difference';
      }
  
      // Apply inversion if dark mode is on
      if (isDarkModeOn) {
        stamp.style.filter = 'invert(1) grayscale(1)';
      }
  
      // motions calculation:
      stamp.velocityX = (Math.random() - 0.5) * 0.75; 
      stamp.velocityY = (Math.random() - 0.5) * 0.75; 
  
      // Make the stamp visible after positioning
      stamp.style.visibility = 'visible';
  
      stampedImages.push(stamp);       // Store the stamp in the array
  
      currentImage = images[Math.floor(Math.random() * images.length)];       // new random image
      customCursor.src = currentImage;
      customCursor.style.width = `${IMAGE_WIDTH}px`; // Reset width
  
      customCursor.onload = function() {       // update cursor dimension after load
        cursorWidth = customCursor.offsetWidth / 2;
        cursorHeight = customCursor.offsetHeight / 2;
  
        // Apply inversion if dark mode is on
        if (isDarkModeOn) {
          customCursor.style.filter = 'invert(1) grayscale(1)';
        } else {
          customCursor.style.filter = '';
        }
      };
    };
  });

  const indexButton = document.getElementById('index-button');
  const indexOverlay = document.getElementById('index-overlay');

indexButton.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent stamping when clicking the button
  indexOverlay.classList.toggle('active'); // Toggle the overlay
  isIndexModeOn = !isIndexModeOn;

  if (isIndexModeOn) {
    indexButton.classList.add('button-clicked');
  } else {
    indexButton.classList.remove('button-clicked');
  }

  document.body.classList.toggle('overlay-active');

  // When the overlay is activated, populate it
  if (indexOverlay.classList.contains('active')) {
    populateOverlay();
  }
});

indexOverlay.addEventListener('mouseenter', hideCustomCursor);
indexOverlay.addEventListener('mouseleave', showCustomCursor);

  // animation loop 
  function animateStamps() {
    if (!isStaticModeOn) {
      stampedImages.forEach(function(stamp) {
        if (stamp.isDragging) {
          return; // Skip movement if the stamp is being dragged
        }

        // Parse current position
        let currentX = parseFloat(stamp.style.left);
        let currentY = parseFloat(stamp.style.top);

        // Update positions
        let newX = currentX + stamp.velocityX;
        let newY = currentY + stamp.velocityY;

        // Get stamp dimensions
        const stampWidth = stamp.offsetWidth;
        const stampHeight = stamp.offsetHeight;

        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Bounce off the edges
        if (newX <= 0 || newX + stampWidth >= windowWidth) {
          stamp.velocityX = -stamp.velocityX;
          newX = currentX + stamp.velocityX;
        }
        if (newY <= 0 || newY + stampHeight >= windowHeight) {
          stamp.velocityY = -stamp.velocityY;
          newY = currentY + stamp.velocityY;
        }

        // Apply new positions
        stamp.style.left = `${newX}px`;
        stamp.style.top = `${newY}px`;
      });
    }

    requestAnimationFrame(animateStamps);
  }

  // Start the animation loop
  requestAnimationFrame(animateStamps);

    // Parts of this code is been helped written by ChatGPT :)