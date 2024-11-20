//console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const imageContainer = document.getElementById("dog-image-container")
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById("dog-breeds")
    const breedDropdown = document.getElementById("breed-dropdown")

    fetch(imgUrl)
        .then((response) => response.json())
        .then((data) => {
            const images = data.message
            images.forEach((url) => {
                const img = document.createElement("img")
                img.src = url
                img.alt = "A random dog"
                img.style.width = "200px"
                img.style.margin = "10px"
                imageContainer.appendChild(img)
            })
        })
        .catch((error) => {
            console.error("Error fetching dog images:", error)
        })
    
    fetch(breedUrl)
        .then((response) => response.json()) 
        .then((data) => {
            const breeds = Object.keys(data.message)
            const filteredBreeds = [...breeds]
            
            const displayBreeds = (breadsToDisplay) => {
                breedList.innerHTML = ""
                breadsToDisplay.forEach((breed) => {
                    const li = document.createElement("li")
                    li.textContent = breed
                    breedList.appendChild(li)

                    li.addEventListener("click", () => {
                        li.style.color = "pink"
                    })
                })
            }

            displayBreeds(breeds)

            breedDropdown.addEventListener("change", () => {
                const selectedLetter = breedDropdown.value
                const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter))
                displayBreeds(filteredBreeds)
            })
        })
        .catch((error) => {
            console.error("Error fetching dog breeds:", error)
        })
})