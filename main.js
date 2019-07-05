function returnAltDescription(dogImgUrl) {
    let altText = dogImgUrl.replace(/https:\/\/images.dog.ceo\/breeds\//, "");
    return altText.replace(/\/.+/, "");
}

function imgString(imgUrl) {
    return `<img class="dog-image" src="${imgUrl}" alt="${returnAltDescription(imgUrl)}">`
}

function liString(imgUrl) {
    return `<li>${imgString(imgUrl)}</li>`;
}

function displayListings(resultsArr) {
    liStringArr = [];
    resultsArr.forEach(result => {
        console.log(result);
        liStringArr.push(liString(result));
    });
    $('#js-display').html(`<ul>${liStringArr.join('\n')}</ul>`);
    $('.container').removeClass('max-width');
}

function fetchMultipleDogs(qty) {
    fetch(`https://dog.ceo/api/breeds/image/random/${qty}`)
        .then(result => result.json())
        .then(resultsJson => {
            displayListings(resultsJson.message);
        })
        .catch(err => displayErrorMessage(err));
}

function handleQtySubmit() {
    $('#js-get-qty').on('submit', function(e) {
        e.preventDefault();
        const qty = $('#qty').val();
        fetchMultipleDogs(qty);
    })
}

function displayBreedImage(imgUrl) {
    $('#js-display').html(imgString(imgUrl));
    $('.container').addClass('max-width');
}


function displayErrorMessage(errorStr) {
    const errString = `<h2>${errorStr}</h2>`
    $('#js-display').html(errString);
}


function fetchBreed(breed) {
    if (breed) {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(result => result.json())
            .then(resultJson => {
                console.log(resultJson);
                if (resultJson.status === "error") {
                    displayErrorMessage(resultJson.message);
                } else {
                    displayBreedImage(resultJson.message);
                    $('#js-display').prepend(`<h2>${breed}</h2>`)
                }
            })
            .catch(err => displayErrorMessage(err));
    } else {
        displayErrorMessage("Please enter a breed");
    }
}


function handleBreedSubmit() {
    $('#js-get-breed').on('submit', function(e) {
        e.preventDefault();
        const breed = $('#breed').val();
        fetchBreed(breed);
        $('#breed').val("");
    })
}


$(function() {
    handleQtySubmit();
    handleBreedSubmit();
})
