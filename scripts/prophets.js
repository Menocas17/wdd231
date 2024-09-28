const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards')

async function getProphetData () {

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const data = await response.json()
        return data.prophets
        
    }

    catch (error){
        console.error(error.mesaage)
    }


}

const displayProphets = (prophets)  => {
    prophets.forEach(prophet => {
        let card = document.createElement('article')
        let fullName = document.createElement('h2')
        let portrait = document.createElement('img')
        let placeOfBirth = document.createElement('p')
        let dateOfBirth = document.createElement('p')
        
        fullName.textContent = `${prophet.name} ${prophet.lastname}`
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.classList.add('card')
        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(placeOfBirth);
        card.appendChild(portrait);
        

        cards.appendChild(card);
    });

}

const prophetsData = async (filter = "all") => {

    let prophets = await getProphetData()

    switch(filter) {
        case "utah":
            prophets = prophets.filter((prophet)=> prophet.birthplace === "Utah");
            break;

        case "noUsBorn":
            prophets = prophets.filter((prophet)=> prophet.birthplace === "England");
            break;

        case "yearsLived":
            // prophets = prophets.filter ((prophet)=> (new Date(prophet.death).getFullYear() - new Date(prophet.birthdate).getFullYear()) >= 95);
            // break;

            prophets = prophets.filter ((prophet)=> {
                let deathYear;

                if (prophet.death === null) {
                    deathYear = new Date().getFullYear()
                }
                else {
                    deathYear = new Date(prophet.death).getFullYear();
                }
                
                return (deathYear - new Date(prophet.birthdate).getFullYear()) >= 95
                
            });
            break;


        case "children":
            prophets = prophets.filter ((prophet) => prophet.numofchildren >= 10);
            break;

        case "yearsOfService":
            prophets = prophets.filter ((prophet) => prophet.length >= 15);
            break;
            

    };

    displayProphets(prophets)
}

prophetsData()

const all = document.querySelector('#noFilter');
const utahBorn = document.querySelector('#utahBorn');
const noUsBorn = document.querySelector('#noUsBorn');
const yearsLived = document.querySelector('#yearsLived');
const children = document.querySelector('#children');
const yearsOfService = document.querySelector('#yearsOfService');


all.addEventListener('click', ( ) => {
    cards.innerHTML='';
    clearButtonClasses();
    prophetsData('all')
    all.classList.add("active");
})

utahBorn.addEventListener('click', ()=> {
    cards.innerHTML='';
    clearButtonClasses();
    prophetsData('utah')
    utahBorn.classList.add("active");
});

noUsBorn.addEventListener('click', () => {
    cards.innerHTML='';
    clearButtonClasses();
    prophetsData('noUsBorn')
    noUsBorn.classList.add("active");
})

yearsLived.addEventListener('click', () => {
    cards.innerHTML='';
    clearButtonClasses();
    prophetsData('yearsLived')
    yearsLived.classList.add("active");
})

children.addEventListener('click', () => {
    cards.innerHTML='';
    clearButtonClasses();
    prophetsData('children')
    children.classList.add("active");
})

yearsOfService.addEventListener('click', () => {
    cards.innerHTML='';
    clearButtonClasses();
    prophetsData('yearsOfService')
    yearsOfService.classList.add("active");
})

function clearButtonClasses() {
	filterbuttons = document.querySelectorAll("button");
	filterbuttons.forEach(button => button.className="");
}

