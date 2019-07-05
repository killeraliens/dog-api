function returnAltDescription(dogImgUrl) {
    let altText = dogImgUrl.replace(/https:\/\/images.dog.ceo\/breeds\//, "");
    return altText.replace(/\/.+/, "");
}

function renderDogLiString(dogImgUrl) {
    return `<li><img class="dog-image" src="${dogImgUrl}" alt="${returnAltDescription(dogImgUrl)}"></li>`
}

function displayDogListings(resultsArr) {
    liStringArr = [];
    resultsArr.forEach(result => {
        console.log(result);
        liStringArr.push(renderDogLiString(result));
    })
    const displayUl = $('#js-show-listings');
    displayUl.html(liStringArr.join('\n'));
    displayUl.removeClass('hidden');
}

function fetchMultipleDogs(qty) {
    fetch(`https://dog.ceo/api/breeds/image/random/${qty}`)
        .then(result => result.json())
        .then(resultsJson => {
            displayDogListings(resultsJson.message);
        })
        .catch(err => alert("something went horribly wrong"));
}

function handleQtySubmit() {
    $('#js-get-qty').on('submit', function(e) {
        e.preventDefault();
        const qty = $('#qty').val();
        fetchMultipleDogs(qty);
    })
}

handleQtySubmit();