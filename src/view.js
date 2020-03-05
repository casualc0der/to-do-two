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
        console.log(dbID)
        const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        try {
            const tasks = retrieveDB.filter(e => e.id === dbID)[0].todoListCollection
            tasks.forEach((e) => {
            createSection('div', 'todoDisplay', `T-${e.id}`, 'todotiles')
            const node = document.getElementById(`T-${e.id}`)
            node.innerHTML = e.title;
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
        
    }


return { createSection, createButton, renderProjects, renderTodos }
})();

export { viewController }