// make sections list for navication bar
const sections = document.querySelectorAll('section');
const sectionsArray = Array.from(sections);

// create navication bar which has links for every section
const navlist = document.getElementById('navbar__list');
sectionsArray.forEach(section => {
    const sectionId = section.id;
    const sectionName = section.dataset.nav;
    const item = document.createElement('li');
    const aLink = document.createElement('a');

    // setting the link
    aLink.href = `#${sectionId}`;
    aLink.classList = "menu__link";
    aLink.textContent = sectionName;

    // show The links and the navication bar
    item.appendChild(aLink);
    navlist.appendChild(item);
}
)

// Add smooth when the user click on the link
const sectionsLink = document.querySelectorAll(".menu__link");

sectionsLink.forEach(Link => {
    Link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent page reload

        const goalId = Link.getAttribute('href').substring(1); // this variable get id for section element and remove "#" from it
        const goalSection = document.getElementById(goalId);

        if (goalSection) {
            goalSection.scrollIntoView({ behavior: "smooth" });
        }
    })
});

// get the location of section
function getSectionlocation(section) {
    return section.getBoundingClientRect().top;
}

// check the location of section if it in user screen
function isSectionInView(section) {
    section = getSectionlocation(section);
    return section >= 0 && section < window.innerHeight;
}

// set class "active" to differentiate between sections and the active section
function getActiveSection() {
    sections.forEach((section) => {
        if (isSectionInView(section)) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    })
}

// event lisntener for scroll
window.addEventListener("scroll", getActiveSection);


window.addEventListener("DOMContentLoaded", loadComments);// when the page reload we show the comments it was saved in local storage

// create new comment
// show the comment in website
document.getElementById('comment_form').addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    const name_inp = document.getElementById('name');
    const email_inp = document.getElementById('email');
    const comment_inp = document.getElementById('comment');

    const name = name_inp.value.trim();
    const email = email_inp.value.trim();
    const comment = comment_inp.value.trim();

    if (name === '') {
        alert("Please enter your name");
        return;
    }

    if (email && !email.includes('@')) {
        alert("Please enter correct email");
        return;
    }

    if (comment === '') {
        alert("Please enter your comment");
        return;
    }

    const newComment = { name: name, text: comment, email: email, date: new Date().toLocaleString() };

    // save comments in local storage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    // add new comment
    addComment(newComment);

    // reset
    this.reset();
})

// add new comment & set the text content of it
function addComment(comment, index) {
    const comments_list = document.getElementById('comments__list');// get the div we will add comments in it
    // create elements of comments  
    const new_comment = document.createElement('div');
    const heading = document.createElement('h3');
    const mail = document.createElement('p');
    const paragraph = document.createElement('p');
    const del = document.createElement('button')
    const date = document.createElement('p');

    // set the text content of elements
    new_comment.classList.add('new_comment');
    heading.textContent = comment.name;
    mail.textContent = comment.email;
    paragraph.textContent = comment.text;
    date.classList.add('comment_date');
    date.textContent = `The comment date: ${comment.date}`;

    del.classList.add("delete");
    del.textContent = "delete";

    del.addEventListener("click", () => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));

        new_comment.remove();

        comments_list.innerHTML = '';
        loadComments();
    })

    // show the elements 
    new_comment.appendChild(heading);
    new_comment.appendChild(mail);
    new_comment.appendChild(paragraph);
    new_comment.appendChild(del);
    new_comment.appendChild(date);
    comments_list.appendChild(new_comment);
}

// save comment in local storage
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach((comment, index) => {
        addComment(comment, index); // We pass the index
    });
}