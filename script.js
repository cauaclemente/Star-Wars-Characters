let currentPageUrl = "https://swapi.dev/api/people/";
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const mainContent = document.getElementById("main-content");

window.onload = async () => {
    await loader();

    try {
        backButton.style.visibility = "hidden";
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert("Erro ao carregar cards");
    }
};

async function loadCharacters(url) {
    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        mainContent.innerHTML = ""; // limpar os resultados anteriores

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(
                /\D/g,
                ""
            )}.jpg')`;
            card.className = "cards";

            const characterNameBg = document.createElement("div");
            characterNameBg.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = "visible"

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

        const characterImage = document.createElement("div")
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
        characterImage.className = "character-image"

        const name = document.createElement("span")
        name.className = "character-details"
        name.innerText = `Nome: ${character.name}`

        const characterHeight = document.createElement("span")
        characterHeight.className = "character-details"
        characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

        const mass = document.createElement("span")
        mass.className = "character-details"
        mass.innerText = `Peso: ${convertMass(character.mass)}`

        const eyeColor = document.createElement("span")
        eyeColor.className = "character-details"
        eyeColor.innerText = `Cor dos olhos: ${convertEyecolor(character.eye_color)}`

        const birthYear = document.createElement("span")
        birthYear.className = "character-details"
        birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

        modalContent.appendChild(characterImage)
        modalContent.appendChild(name)
        modalContent.appendChild(characterHeight)
        modalContent.appendChild(mass)
        modalContent.appendChild(eyeColor)
        modalContent.appendChild(birthYear)

        }

        mainContent.appendChild(card);
        });

        backButton.disabled = responseJson.previous ? false : true;
        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

        nextButton.disabled = responseJson.next ? false : true;
        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";

        currentPageUrl = url;
    } catch (error) {
        alert("Erro ao carregar os personagens");
        console.log(error);
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    await loader();

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);
    } catch (error) {
        console.log(error);
        alert("Erro ao carregar a proxima página");
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    await loader();

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);
    } catch (error) {
        console.log(error);
        alert("Erro ao carregar a página anterior");
    }
}

function loader() {
    mainContent.innerHTML = "";
    backButton.style.visibility = "hidden";
    nextButton.style.visibility = "hidden";

    for (let e = 0; e < 10; e++) {
        const card = document.createElement("div");
        card.className = "cards";
        card.style.background = 'white';
    
        const characterNameBg = document.createElement("div");
        characterNameBg.className = "character-name-bg";
    
        const characterName = document.createElement("span");
        characterName.className = "character-name";
        characterName.innerText = `Nome`;
    
        characterNameBg.appendChild(characterName);
        card.appendChild(characterNameBg);
    
        mainContent.appendChild(card);
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
}

function convertEyecolor(eyeColor){
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecido"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown"){
        return "desconhecido"
    }

    return (height / 100).toFixed(2);
}

function convertMass(mass) {
    if(mass==="unknown"){
        return "desconhecido"
    }
    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if(birthYear === "unknown") {
        return "desconhecido"
    }

    return birthYear
}