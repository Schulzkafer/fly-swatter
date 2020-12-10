    'use strict';

    let form = document.forms.form; 
    let name = form.elements.nameForm;
    let password = form.elements.passwordForm;
    let regButton = form.elements.regButton;
    let loginButton = form.elements.loginButton;
    let nameContainer = document.querySelector('#nameContainer');
    let logoutButton = document.querySelector('#Logout');
    let answer = null;

    loginButton.addEventListener('click', sendLog);
    regButton.addEventListener('click', sendReg);
   // logoutButton.addEventListener('click', sendLogout);
   
    function sendReg () {
    if (!name.value || !password.value) throw Error('complete inf-n');
    let user = {name: name.value, password: password.value}
    let json = JSON.stringify(user);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/registration');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        let statName = null;
        if (xhr.status !== 200) {
            answer = '<div class="answer"><span>Registration error</span><button class="close">Close</button></button></div>';
        container.insertAdjacentHTML('afterend', answer);
                } else {
            if (xhr.response == 'saved') {
            answer = '<div class="answer"><span>Registration success</span><button class="close">Close</button></button></div>';
            statName = name.value;
            } else {
                answer = '<div class="answer"><span>This name already exists!</span><button class="close">Close</button></button></div>';
            }
        container.insertAdjacentHTML('afterend', answer);

        }
        answer = document.querySelector('.answer')
    answer.addEventListener('click', ()=>closeFun(statName))
        }
    xhr.send(json)
    }

    function closeFun (stat){
    answer.remove();
    answer = null;

    if (stat) {
    name.value = '';
    password.value = '';
    registration.style.visibility = 'hidden';
    logoutButton.style.visibility = 'visible';
    nameContainer.insertAdjacentHTML('afterbegin', `<p>User:${stat}</p>`)
    start();
    }
    }

    function sendLog() {
        if (!name.value || !password.value) throw Error('complete inf-n');
        let user = {name: name.value, password: password.value};
        let statName = null;
        let json = JSON.stringify(user);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/login');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
                    if (xhr.status !== 200) throw Error();
                    if (xhr.response == 'noSuchUser') {
                        answer = '<div class="answer"><span>No such user</span><button class="close">Close</button></button></div>';
                        container.insertAdjacentHTML('afterend', answer);		
                    } else if (xhr.response == 'okUser') {
                        console.log(xhr.response)
                        answer = '<div class="answer"><span>Log-in success</span><button class="close">Close</button></button></div>';
                        statName = name.value;
                        container.insertAdjacentHTML('afterend', answer);
                    }				
                answer = document.querySelector('.answer');
                    console.log(answer)
                    document.querySelector('.answer').addEventListener('click', ()=>closeFun(statName))
                    }
            
    xhr.send(json);
    }

    function sendLogout() {//no save inf
        console.log('007')
        let arr = nameContainer.firstElementChild.innerHTML.split(':');
     // if (arr[0] != "User") return;
     // let user = arr[1];
     console.log(25345)
      //start();
       
    }

