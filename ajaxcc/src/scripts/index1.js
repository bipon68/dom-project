//console.log(window)
import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/users'

let btn = document.querySelector('#loadData')
let p = document.querySelector('#output')

// way 1
// btn.addEventListener('click', function(){
//     const URL = 'https://jsonplaceholder.typicode.com/users'

//     const xhr = new XMLHttpRequest()
//     xhr.onreadystatechange = () =>{
//         //console.log(xhr.response)
//         p.innerHTML = xhr.response
//     }
//     xhr.open('GET', URL)
//     xhr.send()
// })

// way 2
// btn.addEventListener('click', function(){
//     fetch(URL)
//     //.then(res => console.log(res.json()))
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(user => {
//             p.innerHTML = `${p.innerHTML} <br> Name: ${user.name}`;
//         });
//     })
//     .catch(err => console.log(err))
// });

btn.addEventListener('click', function(){
    axios.get(URL)
        .then(res => {
            console.log(res.data)
            res.data.forEach(user => {
                p.innerHTML = `${p.innerHTML} <br> Name: ${user.name}`;
            });
        })
        .catch(err => console.log(err))
});