
'use strict';

function titleClickHandler(event) {
    event.preventDefault();
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

// const links = document.querySelectorAll('.titles a'); 
// for (let link of links) {
//     link.addEventListener('click', titleClickHandler); 
// }
// console.log(links);

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);//wybiera mi wszystkie artyuklu z klasa "post"
    let html = '';
    for (let article of articles) {
        /* get the article id */
        const articleID = article.getAttribute('id');
        console.log(articleID);


        /* find the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;// zdobycie tytulu artykulu
        console.log('Title of article', articleTitle);


        /* get the title from the title element */

        const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
        // console.log(linkHTML);

        /* create HTML of the link */
        // titleList.innerHTML = titleList.innerHTML + linkHTML;
        // titleList.insertAdjacentHTML('beforeend', linkHTML);// pierwszy sposob

        /* insert link into titleList */

        /*insert link into hmtl variable */
        html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
    console.log(links);
}

generateTitleLinks();