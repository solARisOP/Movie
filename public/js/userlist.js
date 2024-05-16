const subBtn = document.getElementById('subBtn')
var movieId = document.getElementById('movie_id');

subBtn.addEventListener('click', async ()=>{
    let movie_id = movieId.value;
    const x = /\s/.test(movie_id)
    if(x)
    {
        alert('id should not contain spaces');
    }
    else{
        let data = await fetch('/lists',{
            method:'PUT',
            headers : {
                'Authorization' : localStorage.getItem('token'),
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                remove : 0,
                movie_id,
                list_id : movieId.dataset.listid
            })
        })

        data = await data.json();
        alert(data.message + " " + "Reload to see Changes")
    }
})

const delMovie = async (ele)=>{
    let movie_id = ele.dataset.movieid;
    let data = await fetch('/lists',{
        method:'PUT',
        headers : {
            'Authorization' : localStorage.getItem('token'),
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            remove : 1,
            movie_id,
            list_id : ele.dataset.listid
        })
    })

    data = await data.json();
    alert(data.message + " Reload to see Changes")
}

const DeleteList = document.getElementById("del-list");
const myBtn = document.getElementById('myBtn');
const token = document.getElementById('token');

DeleteList.addEventListener('click', async ()=>{
    if (confirm("Are your sure this action is irreversible") == true) {
        let data = await fetch('/lists',{
            method:'DELETE',
            headers : {
                'Authorization' : localStorage.getItem('token'),
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                list_id : movieId.dataset.listid
            })
        })
        data = await data.json();
        if(data.message === 1)
        {
            token.value = localStorage.getItem('token');
            myBtn.click();
        }
        else{
            alert(data.message)
        }
    }
})