/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Selecting the Li with the class student-item
 const studentList = document.querySelectorAll('li.student-item');
 // setting my initial page number to 1 so it will display page one 
 // upon the initial call
 let page = 1;
 // setting the items per page to 10
 const itemsPerPage = 10;

/*** 
A function that by using some basic math calculates the start and
ending index and then uses a for loop to set the display to either empty
(display) or none. The loop sets this by looping through all of the items
in the list and then setting the value's to each list item by using
their index. If the items index falls within the range it is displayed,
if not it is hidden.
***/
function showPage(list, page){
   let startI = (page * itemsPerPage) - itemsPerPage;
   let endI = (page * itemsPerPage);

      for (let i = 0; i < list.length; i++){
         if(i >= startI && i< endI){
            list[i].style.display = '';
         }
         else {
            list[i].style.display = 'none';
         }
      }
}

/*** 
The appendPageLinks function adds the pagination links to the div with
the page class. it selects the div with the page class, then creates the
new div called pagination, sets the div's class to 'pagination' so that
the already set up style can take effect. It is then appended to the 
earlier selected div.
***/

function appendPageLinks(list){
   const pageDiv = document.querySelector('div.page');
   const pagination = document.createElement('div');
   pagination.className = 'pagination';
   pageDiv.appendChild(pagination);
   // create a variable to store the total number of pages
   // by dividing the length of the list by the total items per page (10)
   let totalPages = list.length / itemsPerPage;
   const li = document.createElement('li');

/*
   a for loop  that creates an a element, sets it's href to # (to I
   believe reload the page), then sets it's text content to the value
   of the current index +1. Then an if condition checks to see if the
   text content is 1 and if it is, the class name is changed to 'active'
   to apply the already created styles. The a element is then appended
   to the li.
*/

   for(let i = 0; i < totalPages; i++){
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = (i+1);
      if(a.textContent == 1){
         a.className = 'active';
      }
      li.appendChild(a);
   }
   /*
   Once the loop has been completed the li with all of the pagination links
   is added to the pagination div.
   */

   pagination.appendChild(li);
   const a = li.querySelectorAll('a');

/*
   an event listener is added to the pagination div that is listening for clicks
   once the pagination link is clicked, the class is wiped from all of the a's
   and then applied to the event target.
*/
   pagination.addEventListener('click', (e) => {
      for(let i = 0; i < totalPages; i++){
         a[i].className = '';
      }
      e.target.className = 'active';
      page = e.target.textContent;
      showPage(list, page)
   });

}

/* 
   Function to search the array of names and display the results dynamically.
*/
   function search(list) {
      // Selecting the div with the class pageheader, and then creating an input element called searchBar.
      const pageHeader = document.querySelector('div.page-header');
      const searchBar =  document.createElement('input');
      // setting the class and placeholder text for searchBar
      searchBar.className = 'student-search';
      searchBar.placeholder = 'Search for student...';
      // creating and setting the class and textcontent for the search bar button.
      const searchButton = document.createElement('button');
      searchButton.className = 'student-search';
      searchButton.textContent = 'Search';
      // appending the button and searchBar to the pageHeader.
      pageHeader.appendChild(searchButton);
      pageHeader.appendChild(searchBar);

      searchButton.addEventListener('click', (e) => {
         getSearchResults(list);

      });

      searchBar.addEventListener('keyup', (e) => {
         getSearchResults(list);

      });
}
/*
      Function that updates the li's displayed on the page and stores those 
      being displayed into the newUL variable.
*/
function getSearchResults(list){
   //Everytime the getSearchResults function runs, it clears the previously stored li's.
   const searchBar = document.querySelector('input.student-search');
   page = 1;
   let newUl = [];
   let filter = searchBar.value.toUpperCase();
   // selecting the ul and li elements with their class and tag names
   let ul = document.querySelector('.student-list');
   let li = ul.getElementsByTagName('li');
   
   /*
      for loop to display all li's that have the character's entered
      or searched in the search bar.
      h3 selects all elements with the h3 tag within the li selected above
      and then grabs the text content of the first result at index i
      */

   for(let i = 0; i < list.length; i++){
      let h3 = li[i].getElementsByTagName('h3')[0].textContent;
      // if indexOf returns a match between h3 and searchBar.value then the display is set to ''
      // if there is no match then the display is set to none, thus hiding the li.
         if(h3.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = '';
            // storing all matches into the just cleared ul variable to use to display
            // the search results pagination.
            newUl.push(li[i]);
      } else {
         li[i].style.display = 'none';
         }          
      } 
   // once newUl has a length of 0 an error will be appended to the page.
   // letting the user know there are no results by calling the noResults function
   if(newUl.length == 0){
      noResults();
   // if the error message is on the page, remove it when newUl != 0.
   // remove it by selecting it and then it's parent and then removing child.
       } else if(document.getElementById('error-message')){
         const errorDiv = document.getElementById('error-message');
         let errorParent = errorDiv.parentNode;
         errorParent.removeChild(errorDiv);
       }

   // calling the reappendPages function with the newUl variable and page declared at the beginning
   reappendPages(newUl,page);
}
/**
* Selecting the div with class page and the div with class paginatino
* removing the pagination from the event listeners below are triggered
* which call the getSearchResults function.
*/
function reappendPages(list, page){
   const pageDiv = document.querySelector('div.page');
   const pagination = pageDiv.querySelector('div.pagination');  
   pageDiv.removeChild(pagination);
   appendPageLinks(list);
   showPage(list, page);
}

function noResults(){
   const pageHeader = document.querySelector('div.page');
   if(document.getElementById('error-message')){
      return;
   } else {
   const errorDiv = document.createElement('div');
   errorDiv.textContent = 'No results, try again.'
   errorDiv.ClassName = 'student-search';
   errorDiv.id = 'error-message';
   pageHeader.appendChild(errorDiv);
   }
}



appendPageLinks(studentList);
showPage(studentList, page);
search(studentList);
