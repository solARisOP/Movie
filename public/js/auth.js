const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const eventsBlock = document.getElementById('events');
const token = document.getElementById('token');
const subBtn = document.getElementById("myBtn");

signupBtn.addEventListener('click', async ()=>{
    eventsBlock.style.pointerEvents="none";
    
    let usernameVal = username.value;
    let passwordVal = password.value;

    var data = await fetch('/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username : usernameVal, password : passwordVal })
    })
    data = await data.json()
    eventsBlock.style.pointerEvents="auto";
    alert(data.message)
})

loginBtn.addEventListener('click', async ()=>{
    eventsBlock.style.pointerEvents="none";
    
    let usernameVal = username.value;
    let passwordVal = password.value;

    var data = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ username : usernameVal, password : passwordVal })
    })
    data = await data.json()
    if('title' in data)
    {
        alert(data.message)
    }
    else
    {
        var authtoken = "Bearer";
        authtoken = authtoken.concat(" ", data.token)
        localStorage.setItem('token', authtoken);
        token.value = localStorage.getItem('token', authtoken);
        subBtn.click();
    }
    eventsBlock.style.pointerEvents="auto";
})

