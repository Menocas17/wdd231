// Creating the hambutton funcionatily

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', ()=> {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
})


// Adding the last modified date to the page

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;


// Creating the list of courser and dinamically add them to the page

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const numberOfCredits = document.querySelector('#credits');


const totalNumberOfCredits = courses.reduce((previousCredits, course) => {
    return previousCredits + course.credits;
}, 0);

numberOfCredits.textContent = `(${totalNumberOfCredits} total credits required)`;


const courseList = document.querySelector('#courses');
const courseDetails = document.querySelector('#course-details')

function displayCourseDetails (course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">X</button>
    <h2>${course.subject} ${course.number}</h2>
    <div class="course-info">
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    </div>
    
    `;
    courseDetails.showModal();

    document.querySelector('#closeModal').addEventListener('click', () => {
        courseDetails.close();
    });

}

function createCourseItem (filteredCourses) {
    filteredCourses.forEach(course => {
        let listItem = document.createElement('li')

        listItem.classList.add('course-item')

        if (course.completed) {
            listItem.classList.add('completed')
        }

        listItem.innerHTML = `${course.subject} ${course.number}`;

        listItem.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseList.appendChild(listItem);

    

    });
}

createCourseItem(courses);

const allButton = document.querySelector('#all');
const cseButton = document.querySelector('#cse');
const wddButton = document.querySelector('#wdd');

function menuButtonclick (buttonId) {
    switch(buttonId) {
        case 'all':
            courseList.innerHTML= '';
            createCourseItem(courses);
            break;
        
        case 'cse':
            courseList.innerHTML= '';
            createCourseItem(courses.filter (course => course.subject === 'CSE'));
            break;

        case 'wdd':
            courseList.innerHTML= '';
            createCourseItem(courses.filter(course => course.subject === 'WDD'));
            break;
    }
}

allButton.addEventListener('click', ()=> {
    menuButtonclick('all');
    allButton.classList.add('active')
    cseButton.classList.remove ('active')
    wddButton.classList.remove ('active')
});

cseButton.addEventListener('click', ()=> {
    menuButtonclick('cse');
    allButton.classList.remove('active')
    cseButton.classList.add ('active')
    wddButton.classList.remove ('active')
})

wddButton.addEventListener('click', ()=> {
    menuButtonclick('wdd');
    allButton.classList.remove('active')
    cseButton.classList.remove ('active')
    wddButton.classList.add ('active')
})
