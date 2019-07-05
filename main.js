function retrieveMultipleDogs(qty) {
    fetch(`https://dog.ceo/api/breeds/image/random/${qty}`)
        .then(result => result.json())
        .then(resultsJson => {
            console.log(resultsJson);
            resultsJson.message.forEach(result => console.log(result))
        })
        .catch(err => alert("something went horribly wrong"))

}

function handleQtySubmit() {
    $('#js-get-qty').on('submit', function(e) {
        e.preventDefault();
        const qty = $('#qty').val();
        retrieveMultipleDogs(qty);
    })

}

handleQtySubmit();