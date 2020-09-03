

// function titleClickHandler() {
//     const links = document.querySelectorAll('.titles a');
//     console.log(links);
// }

// const buttonTest = document.getElementById('button-test');

// buttonTest.addEventListener('click', titleClickHandler);



// function titleClickHandler() {
//     console.log('Link was clicked!');
// }

// const links = document.querySelectorAll('.titles a');

// for (let link of links) {
//     link.addEventListener('click', titleClickHandler);// funkcj nasluchujacej mozemy uzyc tylko dla poj. elemencie dlatego dla wielu ele. nalezy dac petle
// }




// 'use strict';

// function titleClickHandler(event) {
//     console.log('Link was clicked!');

//     /* [DONE] remove class 'active' from all article links  */
//     const activeLinks = document.querySelectorAll('.titles a.active');
//     for (let activeLink of activeLinks) {
//         activeLink.classList.remove('active');
//     }
//     console.log(activeLinks);

//     /* [IN PROGRESS] add class 'active' to the clicked link */
//     console.log('clickedElement:', clickedElement);
//     console.log('clickedElement (with plus): ' + clickedElement);


//     /* [DONE] remove class 'active' from all articles */
//     const activeArticles = document.querySelectorAll('.posts article.active');
//     for (let activeArticle of activeArticles) {
//         activeArticle.classList.remove('active');
//     }



//     /* get 'href' attribute from the clicked link */



//     /* find the correct article using the selector (value of 'href' attribute) */

//     /* add class 'active' to the correct article */
// }

// const links = document.querySelectorAll('.titles a');

// for (let link of links) {
//     link.addEventListener('click', titleClickHandler);
// }



'use strict';

function titleClickHandler(event) {// od zdarzenia, od kliku!
    event.preventDefault();// usuwa w adresie strony hash z linku
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */
    // console.log('clickedElement:', clickedElement);
    // console.log('clickedElement (with plus): ' + clickedElement);

    function addClassActive() {
        clickedElement.classList.add('active');
    }
    addClassActive();

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    let articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const correctArticle = document.querySelector(articleSelector);
    console.log(correctArticle);

    /* add class 'active' to the correct article */
    function addClassArticle() {
        correctArticle.classList.add('active');
    }
    addClassArticle();
}

const links = document.querySelectorAll('.titles a'); // wybieramy wszystkie linki a w klasie title
for (let link of links) {
    link.addEventListener('click', titleClickHandler); // ponieważ "nasluchiwacz" dziala tylko na jeden ele. robimy petle
}