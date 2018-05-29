//console.log(window)
import axios from 'axios'

// const URL = 'https://jsonplaceholder.typicode.com/users'

//json server
const BASE_URL = 'http://localhost:3000/contacts/'

window.onload = function(){

    let tbody = document.querySelector('#tbody')

    // step1: GET 
    // get data using json server from db.json file 
    // get data from server and fill the table when page loaded complete
    axios.get(BASE_URL)
        .then(res => {
            res.data.forEach(contact => {
              createTDElement(contact, tbody)  
            });
        })
        .catch()


        // step2: POST 
        // add eventlistener to save new contact
        let saveContactBtn = document.querySelector('#saveContact')
        saveContactBtn.addEventListener('click', function(){
            createNewContact()
        })
}

// step2: POST 
// post data
// Create New Contact Function
function createNewContact() {
    let nameField = document.querySelector('#nameField')
    let phoneField = document.querySelector('#phoneField')
    let emailField = document.querySelector('#emailField')
    
    let contact = {
        name: nameField.value,
        phone: phoneField.value,
        email: emailField.value
    }

    axios.post(BASE_URL, contact)
        .then(res => {

            let tbody = document.querySelector('#tbody')

            // creating name input field
            // const tdName = document.createElement('td')
            // tdName.innerHTML = contact.name
            // if(tdName.innerHTML === ''){
            //     alert('Please put some name')
            // }else{

            // }

            createTDElement(res.data, tbody)

            nameField.value = ''
            phoneField.value = ''
            emailField.value = ''
        })
        .catch(err => console.log(err))
}


// Get Data
// creating TR Element and Appending to it's parent element
function createTDElement(contact, parentElement){
    const TR = document.createElement('tr')

    // step 2.1
    // creating name input field
    const tdName = document.createElement('td')
    tdName.innerHTML = contact.name
    TR.appendChild(tdName)

    // step 2.2
    // creating phone input field
    const tdPhone = document.createElement('td')
    tdPhone.innerHTML = contact.phone ? contact.phone : 'N/A'
    TR.appendChild(tdPhone)

    // step 2.3
    // creating email input field
    const tdEmail = document.createElement('td')
    tdEmail.innerHTML = contact.email ? contact.email : 'N/A'
    TR.appendChild(tdEmail)

    // step 2.4
    // creating td for action button field
    const tdActions = document.createElement('td')

    // step3: PUT
    // creating Edit button
    const tdEditBtn = document.createElement('button')
    tdEditBtn.className = 'btn btn-warning'
    tdEditBtn.innerHTML = 'Edit'
    tdEditBtn.addEventListener('click', function(){
       // console.log('I am edit button')
      // $('#contactEditModal').modal('toggle')
      let mainModal = $('#contactEditModal')
      mainModal.modal('toggle')

        let editName = document.querySelector('#edit-name')
        let editPhone = document.querySelector('#edit-phone')
        let editEmail = document.querySelector('#edit-email')

        editName.value = contact.name
        editPhone.value = contact.phone ? contact.phone : ''
        editEmail.value = contact.email ? contact.email : ''

        let updateBtn = document.querySelector('#updateBtn')
        updateBtn.addEventListener('click', function(){
            axios.put(`${BASE_URL}/${contact.id}`, {
                name: editName.value,
                phone: editPhone.value,
                email: editEmail.value
            })
            .then(res => {
                tdName.innerHTML = res.data.name
                tdPhone.innerHTML = res.data.phone
                tdEmail.innerHTML = res.data.email

                mainModal.modal('hide')
            })
            .catch(err => console.log(err))
        })

    })
    tdActions.appendChild(tdEditBtn)

    // step4: DELETE
    // creating Delete button
    const tdDeleteBtn = document.createElement('button')
    tdDeleteBtn.className = 'btn btn-danger ml-1'
    tdDeleteBtn.innerHTML = 'Delete'
    tdDeleteBtn.addEventListener('click', function(){
        //console.log(contact)
        axios.delete(`${BASE_URL}/${contact.id}`)
            .then(res => {
                parentElement.removeChild(TR)
            })
            .catch(err => console.log(err))
    })
    tdActions.appendChild(tdDeleteBtn)

    // apppend action button all into tr  
    TR.appendChild(tdActions)

    // apppend tr  into parent 
    parentElement.appendChild(TR)
}

