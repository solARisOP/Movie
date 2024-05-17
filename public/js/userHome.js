const myForm = document.getElementById('getlistform');
const token = document.getElementById('token')
const subBtn = document.getElementById('subBtn')

const getList = (ele)=>{
   myForm.action = `/lists/${ele.dataset.id}`;
   token.value = localStorage.getItem('token');
   subBtn.click();
}

var name_ele = document.getElementById('name');
var description_ele = document.getElementById('description');
var subBtn2 = document.getElementById('subBtn2');

subBtn2.addEventListener('click', async () =>{
   const token = localStorage.getItem('token');
   let name = name_ele.value, description = description_ele.value;
   let data = await fetch('/lists',{
      method:'POST',
      headers : {
          'Authorization' : token,
          'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
         name,
         description
      })
   })
   data = await data.json();
   alert(data.message + " please reload to see changes")
})

var movie = document.getElementById("movie_name")
var id = document.getElementById("movie_id")
var tokens = document.getElementById("tokens")

const searchContent = ()=>{
   if(movie.value==='' && id.value==='') return false;
   tokens.value = localStorage.getItem('token');
   return true;
}

