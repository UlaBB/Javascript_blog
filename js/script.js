'use strict';

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




function titleClickHandler(event) {
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */

    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}