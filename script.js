const imageContainer = document.getElementById("imagesBox");

const fetchingDBImages = () => {
  return fetch("https://dragonball-api.com/api/characters?limit=58").then((response) =>
    response.json(),
  );
};

const displayingImages = async () => {
  let imagesArr;
  try {
    imagesArr = await fetchingDBImages();
  } catch (err) {
    console.log(err);
  }

  imagesArr = imagesArr.items;
  imagesArr.map((eachItem) => {
    const eachImgCard = document.createElement("a");
    const eachImageEle = document.createElement("img");
    const textBox = document.createElement("div");
    const characterTitle = document.createElement("h2");
    const characterTag = document.createElement("p");
    const characterTagVal = document.createElement("p");

    eachImgCard.classList.add("each-card");
    eachImageEle.classList.add("each-image");

    textBox.classList.add("img-details");
    characterTitle.classList.add("def-clr", "text-title");

    eachImageEle.src = eachItem.image;
    eachImageEle.alt = `image-${eachItem.name}`;
    characterTagVal.classList.add("def-clr", "custom-clr");
    characterTitle.classList.add("def-clr", "text-title");

    characterTitle.textContent = eachItem.name;
    characterTagVal.textContent = `${eachItem.race} - ${eachItem.gender}`;

    eachImgCard.appendChild(eachImageEle);
    textBox.appendChild(characterTitle);
    textBox.appendChild(characterTagVal);
    textBox.appendChild(characterTag);

    let characterDetails = {
      Affiliation: eachItem.affiliation,
      KI: eachItem.ki,
      "Total KI": eachItem.maxKi,
    };

    for (let each in characterDetails) {
      const characterTag = document.createElement("p");
      const characterTagVal = document.createElement("p");

      characterTag.textContent = `${each}:`;
      characterTagVal.textContent = characterDetails[each];

      characterTag.classList.add("def-clr");
      characterTagVal.classList.add("def-clr", "custom-clr");

      characterTagVal.style.marginBottom = "8px";

      textBox.appendChild(characterTag);
      textBox.appendChild(characterTagVal);
    }
    eachImgCard.href = `https://dragonball-api.com/api/characters/${eachItem.id}`;
    eachImgCard.appendChild(textBox);
    imageContainer.appendChild(eachImgCard);
  });
};

displayingImages();

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY;
  if (currentScroll % 1000 === 0) {
    displayingImages();
  }
});
