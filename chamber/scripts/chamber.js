// adding the year and last modified to the footer 

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// adding the funcionality to the ham button 

const hamButton = document.querySelector('#menu');
const navMenu = document.querySelector('.open-menu');
const header = document.querySelector('.header')

hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('open');
    navMenu.classList.toggle('open');
    header.classList.toggle('gap')
})

// fetching the members data from the Json file

const url = './data/members.json'

const cards = document.querySelector('#cards-section');

const getMembersData = async () => {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const data = await response.json();
        return data
    }

    catch (error) {
        console.error(error.message)
    }
}
 

// Creating the function to display the members data in the webpage 

const displayMembersData = (membersData) => {
    membersData.forEach (member => {
        let card = document.createElement('article');
        let companyName = document.createElement('h3');
        let companyLogo = document.createElement('img');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p')
        let websiteUrl = document.createElement('a');

        companyName.textContent = `${member.name}`;
        address.textContent = `${member.address}`;
        phoneNumber.textContent = `${member.phoneNumber}`;
        websiteUrl.textContent = 'Visit Website';

        websiteUrl.setAttribute('href', member.websiteUrl)
        
        companyLogo.setAttribute('src', member.image);
        companyLogo.setAttribute('alt', `Logo of ${member.name}`);
        companyLogo.setAttribute('loading', 'lazy');
        companyLogo.setAttribute('width', '200');
        companyLogo.setAttribute('height', '200');

   
        websiteUrl.classList.add('card-button')
        card.appendChild(companyLogo);
        card.appendChild(companyName);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(websiteUrl);

        cards.classList.add('grid-view')
        cards.appendChild(card);

    })
}

const membersDirectory = async (data) => {
    let members = await getMembersData();

    displayMembersData(members);
}

membersDirectory()

const gridButton = document.querySelector('#gridButton');
const listButton = document.querySelector('#listButton');


const swapingViews = (button) => {
    
    if (button === 'list'){
      gridButton.classList.remove('grid-button'); 
      listButton.classList.add('list-button')

      cards.classList.remove('grid-view');
      cards.classList.add('list-view');

      
      

    }

    if (button=== 'grid') {
        gridButton.classList.add('grid-button');
        listButton.classList.remove('list-button');

        cards.classList.add('grid-view');
        cards.classList.remove('list-view');
    }
    

    
}

gridButton.addEventListener('click', () =>{
    swapingViews('grid');
})

listButton.addEventListener('click', ()=> {
    swapingViews('list');
})

