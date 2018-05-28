import './index.css'
import { createCredentials } from 'crypto';

// Step 1: Added Event listener
window.onload = function(){

    const taskField = document.querySelector('#taskField')
    const addTaskBtn = document.querySelector('#addTaskBtn')
    const allTasksParent = document.querySelector('#allTasks')

    taskField.addEventListener('keypress', function(event){
        //console.log('keypress working')
        if(event.keyCode === 13){
            //console.log('keypress code 13 for Enter keydf')
            createNewTask(allTasksParent, event.target.value)
            this.value = ''
        }else{

        }
    })
}

// Step 2: Create new task
function createNewTask(parent, task){
    //console.log('Calling new task function', task)

    // Step 2.1: Added single element
    let col = create({'class': 'col-sm-3'})
    let singleTask = create({'class': 'single-task d-flex'})
    let singleTaskP = create('p')
    singleTaskP.innerHTML = task

    singleTask.appendChild(singleTaskP)
    col.appendChild(singleTask)
    parent.appendChild(col)

    // Step 2.2: Remove single element
    let span = create('span', {'class': 'ml-auto'})
    span.innerHTML = `<i class="fas fa-times-circle"></i>`
    singleTask.appendChild(span)
    span.addEventListener('click', function(){
        //console.log('item deleted')
        parent.removeChild(col)
    })

     // Step 3: Create color palet or Task controller calling
     //Step 3.1: added task controller
     let taskController = createTaskController(singleTask)
     taskController.style.visibility = 'hidden'
     singleTask.appendChild(taskController)

     //Step 3.2: mouse hover show/hide task controller
     singleTask.onmouseenter = function(){
        taskController.style.visibility = 'visible' 
     }
     singleTask.onmouseleave = function(){
        taskController.style.visibility = 'hidden' 
     }


}

// Step 3: Create color palet or Task controller function
function createTaskController(parent){
    //console.log('Calling task controller')

    
    let controlPanel = create({'class': 'task-control-panel d-flex align-items-center'})
    //parent.appendChild(controlPannel)

    //Step 3.3: added color palet
    let colorPalette = createColorPalette(parent)
    controlPanel.appendChild(colorPalette)
    // if no retrun from createColorPalette then showing this error: Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.

    let editBtn = createEditBtn(parent)
    controlPanel.appendChild(editBtn)


    return controlPanel
}

// Step 4: edit task or content
function createEditBtn(parent){
    //console.log('edit')
    let span = create('span', {'class': 'ml-auto ml-2'})
    span.innerHTML = `<i class="fas fa-edit"></i>`
    span.style.color = '#fff'
    span.addEventListener('click', function(){
        let p = parent.querySelector('p')
        let textArea = create('textarea', {'class': 'inner-textarea'})
        textArea.style.width = parent.offsetWidth + 'px'
        textArea.style.height = parent.offsetHeight + 'px'
        textArea.innerHTML = p.innerHTML

        textArea.addEventListener('keypress', function(event){
            if(event.keyCode === 13){
                //console.log('textaread edit')
                event.stopPropagation()
                if(this.value){
                    p.innerHTML = this.value
                   parent.removeChild(this)
                }else{
                    alert('Please put some data')
                }
            }else{
                console.log('textaread not edit')
                
            }
        })

        parent.appendChild(textArea)

    })

    return span
}

function createColorPalette(parent){
    //console.log('Calling color palette')
    const colors = ['palegreen', 'skyblue', 'powderblue', 'salmon', 'grey', 'red' ]

    let colorDiv = create({'class': 'd-flex'})

    colors.forEach(color =>{
       let div = create({'class': 'color-circle ml-1'})
       div.style.background = color
       div.addEventListener('click', function(){
           parent.style.background = color
       })
       colorDiv.appendChild(div)
    })
    return colorDiv
}


window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}