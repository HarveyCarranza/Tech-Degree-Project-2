/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

/*** Selecting the elements with the class "student-item" and declaring them 
 * to the studentList variable
 */
const studentList = document.getElementsByClassName("student-item");
let page = 1;
const pageItems = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page){
   const startIndex = (page * pageItems) - pageItems;
   const endIndex = page * pageItems;

   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i <  endIndex){
         list[i].style.display = '';
         
      } else {
         list[i].style.display = 'none';
      }

   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const mainDiv = document.querySelector('div.page');
function appendPageLinks(list){
   let pageNumber = (list.length/10);
   let pDiv = document.createElement('div');
   pDiv.className = 'pagination';
   mainDiv.appendChild(pDiv);
   const ul = document.createElement('ul');
   pDiv.appendChild(ul);
   for(let i = 0; i < pageNumber; i++){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = (i+1);
      li.appendChild(a);
      ul.appendChild(li);
   }
      const a = document.querySelectorAll("div.pagination a");
      for(let i = 0; i < a.length; i++){
         if(a[i].textContent == 1){
            a[i].className = 'active';
         }
      }
         ul.addEventListener('click', (e) => {
            for(let i = 0; i < a.length; i++){
                  a[i].className = '';
                  let page = e.target.textContent;
                  e.target.className = 'active';
                  showPage(list, page);
            }
        });
};
const searchBar = document.createElement('input');
const pageHeader = document.querySelector('div.page-header');
function search (list){
   
   searchBar.placeholder = 'Search for students...';
   searchBar.className = 'student-search';
   const searchButton = document.createElement('button');
   searchButton.textContent = 'Search';
   searchButton.className = 'student-search';
   pageHeader.appendChild(searchButton);
   pageHeader.appendChild(searchBar);

   searchBar.addEventListener('keyup', (e) => {
      e.onkeyup = liveSearch(list);
   });

  searchButton.addEventListener('click', (e) =>{
     liveSearch(list);
  });

}
let newUl = document.createElement('ul');
let span = document.createElement('span');
span.textContent = 'No results found, try again';
pageHeader.appendChild(span);
span.style.display = 'none';
function liveSearch (list){
   newUl = [];
   let navigation = document.querySelector('div.pagination');
   let filter = searchBar.value.toUpperCase();
   let  ul = document.querySelector('.student-list');
   let li = ul.getElementsByTagName('li');
  
   for(let i = 0; i < list.length; i++){
      let h3 = li[i].getElementsByTagName('h3')[0].textContent;
      
      if(h3.toUpperCase().indexOf(filter) > -1){
         li[i].style.display = '';
         newUl.push(li[i]);

      } else {
         li[i].style.display = 'none';
      } 
   }  
      if(newUl.length == 0){
         span.style.display = '';
      }else {
         span.style.display = 'none';
      }
      mainDiv.removeChild(navigation);
      appendPageLinks(newUl);
      showPage(newUl, page);
   if(searchBar.value === ''){
      mainDiv.removeChild(navigation);
      appendPageLinks(studentList);
      showPage(studentList, page);
      span.textContent = '';
   } 


}

search(studentList);
appendPageLinks(studentList);
showPage(studentList, page);


// Remember to delete the comments that came with this file, and replace them with your own code comments.