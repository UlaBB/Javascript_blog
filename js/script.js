
'use strict';



function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');

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
  // console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const correctArticle = document.querySelector(articleSelector);
  // console.log(correctArticle);

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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorsSelector = 'post-author';

function generateTitleLinks(customSelector = '') {
  // console.log(customSelector);
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);//wybiera mi wszystkie artyuklu z klasa "post"
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleID = article.getAttribute('id');
    // console.log(articleID);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;// zdobycie tytulu artykulu
    // console.log('Title of article', articleTitle);

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
  // console.log(links);
}
generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);// wyszukuje wszystkie artykuly

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    // console.log(wrapperTags);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      //<li><a href="#tag-ziemniaki">ziemniaki</a></li>

      /* add generated code to html variable */
      html = html + tagHTML;
      // console.log('Tag html:' + html);

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    wrapperTags.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();


/* Find link of tags */

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  // console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');


  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); // zamienia tekst #tag- na punsty ciag znakow

  /* find all tag links with class active */
  const activeTagLinks = clickedElement.querySelectorAll('a.active[href^="#tag-"]');


  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {

    /* add class active */
    hrefTagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('.post-tags a, .list.tags a');
  // console.log(linksToTags);

  /* START LOOP: for each link */
  for (let linkToTag of linksToTags) {
    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generatorAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);// wyszukuje wszystkie artykuly

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optAuthorsSelector);
    console.log(authorsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-authors attribute */
    let tagAuthor = article.getAttribute('data-author');
    console.log(tagAuthor);

    /* generate HTML of the autor link */
    const linkHTML = '<a href="#author-' + tagAuthor + '">' + 'by ' + tagAuthor + '</a>';

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /* insert HTML of all the links into the author wrapper */

    authorsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generatorAuthors();