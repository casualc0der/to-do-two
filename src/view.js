import { controller } from './controller'

const viewController = (() => {

    const createSection = (type, attachId, sectionId, sectionClass) => {
        const newSection = document.createElement(type)
        newSection.id = sectionId
        newSection.classList.add(sectionClass)
        const node = document.getElementById(attachId)
        node.appendChild(newSection)
    }

    const createButton = (innerText, attachId, buttonId) => {
        const newButton = document.createElement('button')
        newButton.id = buttonId
        newButton.textContent = innerText
        const node = document.getElementById(attachId)
        node.appendChild(newButton)
    }

    const clearSection = (sectionID) => {

        const node = document.getElementById(sectionID);
        while(node.firstChild) {
            node.removeChild(node.lastChild);
        }
    
    }

    const startUpRender =  () => { 

        createSection('input','root','projectNameInput', 'projectNameInput' )
        createButton('Add Project', 'root', 'addProject') 
        createSection('div', 'root', 'projectDisplay', 'projectIcons')
        createSection('div', 'root', 'todoDisplay', 'todoIcons')
    }

    const renderProjects = (db) => {
        clearSection('projectDisplay')
        db.map((e) => {   
        createSection('div', 'projectDisplay', e.id, 'projectTiles')
                    
                    const tile = document.getElementById(e.id)
                    tile.innerHTML = e.name
                    createButton('x', e.id, `B~${e.id}`)
                    document.getElementById(`B~${e.id}`).classList.add("deleteButton")
                    tile.addEventListener('click', () => renderTodos(e.id))
        })
      
           
            

     
            controller.deleteProjectButtons();

    }

    const renderTodos = (dbID) => {
    

        clearSection('todoDisplay')
        viewController.createSection('input','todoDisplay',dbID, 'taskNameInput' )
        viewController.createButton('Add Task', 'todoDisplay', 'addTask')
        document.getElementById('addTask').addEventListener('click', () => {
            controller.addTask()
            renderTodos(dbID);
        
        });
        
        const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        try {
            
            const tasks = retrieveDB.filter(e => e.id === dbID)[0].todoListCollection
            tasks.forEach((e) => {
            createSection('div', 'todoDisplay', `T-${e.id}`, 'todotiles')
            const node = document.getElementById(`T-${e.id}`)
            node.innerHTML = `  <ul>
                                <li>${e.title}</li>            
                               <li>${e.description || ''}</li> 
                               <li>${e.datedue || ''}</li> 
                               <li>${e.priority || ''}</li> 
                               </ul>                `;
            node.addEventListener('click', () => {
                createForm(dbID, e.id)         
                
            
            })
            createButton('x', `T-${e.id}`, `BB${e.id}`)
            document.getElementById(`BB${e.id}`).classList.add('deleteTodoButton')
            document.getElementById(`BB${e.id}`).addEventListener('click', () => {
            controller.deleteTask(dbID, e.id)
            renderTodos(dbID);
            })
        })

        } catch (error) {
            console.log('Project Deleted!')
        }

        const createForm = (dbID, id) => {

            try {
                clearSection('myModal')
                createSection('div','myModal', `F-${id}`, 'taskForm')
                createSection('input',`F-${id}`,'title', 'taskFormFields')
                createSection('input',`F-${id}`,'description', 'taskFormFields')
                createSection('input',`F-${id}`,'dueDate', 'taskFormFields')
                createSection('select',`F-${id}`,'priority', 'taskFormFields')
                createSection('option','priority','high', 'taskFormFields')
                createSection('option','priority','normal', 'taskFormFields')
                createSection('option','priority','low', 'taskFormFields')
                createButton('Update', 'myModal', 'updateFormButton' )
                document.getElementById('high').value = 'High'
                document.getElementById('high').textContent = 'High'
                document.getElementById('normal').value = 'Normal'
                document.getElementById('normal').textContent = 'Normal'
                document.getElementById('low').value = 'Low'
                document.getElementById('low').textContent = 'Low'


                const details = controller.retrieveTodo(dbID, id)
                console.log(details)
                const title = document.getElementById('title')
                const description = document.getElementById('description')
                const dueDate = document.getElementById('dueDate')
                dueDate.type = 'date'
                const priority = document.getElementById('priority')

                 if(details.title === undefined) {
                    title.value = ''
                    title.placeholder = 'Title'
                 }
                 else {
                    title.value = details.title;
                 }       
                
                 if(details.description === undefined) {

                    description.value = ''
                    description.placeholder = 'Description'
                 }
                 else {
                    description.value = details.description;
                 }
                

                dueDate.value = details.dueDate;

                if(details.priority === undefined) {
                    priority.value = details.priority = ''
                    priority.placeholder = 'Priority'
                }
                else {
                    priority.value = details.priority;
                }
                


                document.getElementById('updateFormButton')
                    .addEventListener('click', ()=> {
                        const title = document.getElementById('title').value
                        const description = document.getElementById('description').value
                        const dueDate = document.getElementById('dueDate').value
                        const priority = document.getElementById('priority').value
                        controller.editTodo(dbID, id, title,description,dueDate,priority)})
                        renderTodos(dbID);





            } catch (error) {
                clearSection('myModal')
                
            }
           

           

            
        }
        
    }


return { createSection, createButton, renderProjects, renderTodos, startUpRender }
})();

export { viewController }