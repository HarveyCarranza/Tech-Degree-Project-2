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
   let j = startIndex;

   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i <  endIndex){
         studentList[i].style.display = '';
         console.log(j);
         j++;
         
      } else {
         studentList[i].style.display = 'none';
      }

   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list){
   let pageNumber = (list.length/10);
   const pDiv = document.createElement('div');
   pDiv.className = 'pagination';
   const mainDiv = document.querySelector('div.page');
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

appendPageLinks(studentList);
showPage(studentList, page);


// Remember to delete the comments that came with this file, and replace them with your own code comments.