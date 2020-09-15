
'use strict';

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  authorsSelector: '.post-author',
  tagsListSelector: '.tags',
  cloudClassCount: '5',
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors'
};


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


function generateTitleLinks(customSelector = '') {
  // console.log(customSelector);
  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);//wybiera mi wszystkie artyuklu z klasa "post"
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleID = article.getAttribute('id');
    // console.log(articleID);

    /* find the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;// zdobycie tytulu artykulu
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


function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' };
  // argumentem będzie all tags, kluczami tagi
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

  return opt.cloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapperTags = article.querySelector(opt.articleTagsSelector);
    // console.log(wrapperTags);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');// pobieramy wszystkie atrybuty data-tags
    // console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' '); //dzieli tekst na elementy tablicy
    // console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;
      // console.log('Tag html:' + html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) { // 
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    wrapperTags.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opt.tagsListSelector);
  console.log(tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');// łączy ele. tablicy w tekst
  // console.log(allTags);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';


  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    const tagLinkHTML =
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '">' +
      tag +
      '</a></li>';
    allTagsHTML += tagLinkHTML;
    console.log('taglinkHTML', tagLinkHTML);
    /*[NEW] END LOOP: for each tag in allTags*/
  }


  /*[NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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

function calculateAuthorParams(authors) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    } else if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

// function calculateAuthorClass(count, params) {
//   const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * (optCloudClassCount - 1) + 1); //1
//   return optCloudClassPrefix + classNumber;
// }

function generatorAuthors() {

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);// wyszukuje wszystkie artykuly

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find authors wrapper */
    const authorsWrapper = article.querySelector(opt.authorsSelector);
    // console.log(authorsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-authors attribute */
    let tagAuthor = article.getAttribute('data-author');
    // console.log(tagAuthor);

    /* generate HTML of the autor link */
    const linkHTML = '<a href="#author-' + tagAuthor + '">' + 'by ' + tagAuthor + '</a>';

    /* add generated code to html variable */
    html = html + linkHTML;
    // console.log(html);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(tagAuthor)) {
      /*   [NEW] add generated code to allAuthors object */
      allAuthors[tagAuthor] = 1;
    } else {
      allAuthors[tagAuthor]++;
    }

    /* insert HTML of the author link into the authors wrapper */

    authorsWrapper.innerHTML = html;
    /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */
  const authorsList = document.querySelector(opt.authorsListSelector);
  console.log(authorsList);

  const authorParams = calculateAuthorParams(allAuthors);
  console.log(authorParams);

  let allAuthorsHTML = '';

  for (let author in allAuthors) {
    // /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a class="tag-size4" href="#author-' + author + '">' + author + '</a></li> ';
    const authorLinkHTML = '<li><a href="#author-' + author + '"class="tag-size4"';
    allAuthorsHTML += authorLinkHTML;
  }
  authorsList.innerHTML = allAuthorsHTML;
}
generatorAuthors();


function authorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked! awsome');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', ''); // zamienia tekst #tag- na punsty ciag znakow
  console.log(author);

  /* find all tag links with class active */
  const activeAuthorsLinks = clickedElement.querySelectorAll('a.active[href^="#author-"]');// href zaczynajace się od #author
  console.log(activeAuthorsLinks);

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorsLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  // const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let allAuthorsLink of allAuthorsLinks) {

    /* add class active */
    allAuthorsLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  for (let allLinksToAuthor of allLinksToAuthors) {
    /* add tagClickHandler as event listener for that link */
    allLinksToAuthor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();