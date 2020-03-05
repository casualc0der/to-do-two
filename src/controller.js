import { viewController } from './view';
import { model } from './model'
import { init } from './init'
import { v4 as uuidv4 } from 'uuid';

const controller = (() => {

const startUp = () => {
    const DATABASE  = init.loadDB();
    viewController.startUpRender();
    viewController.renderProjects(DATABASE.PDatabase)
    deleteProjectButtons();
    
document.getElementById('addProject').addEventListener('click', () => {
    addProject();
    })
};

    const deleteProjectButtons = () => {
        const deleteButtons = document.querySelectorAll('.deleteButton')
       
        deleteButtons.forEach((e) => {
            e.addEventListener('click', () => {
                const deleteID = e.parentNode.id;
                console.log(deleteID)
                model.deleteProject(deleteID);        
                const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']))
                localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(retrieveDB))
                viewController.renderProjects(retrieveDB);
                console.log(retrieveDB)

        })
    })
    };

    

    const addProject = () => {
        const projectName = document.getElementById('projectNameInput').value;
        if (projectName === '' || projectName === undefined) return;
        const retrievedDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        const x = model.project(uuidv4(), projectName);
        retrievedDB.push(x);
        localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(retrievedDB));
        const loadDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        viewController.renderProjects(loadDB);
    }



    const addTask= () =>  {
        const task = document.getElementsByClassName('taskNameInput')[0].value
        const taskId = document.getElementsByClassName('taskNameInput')[0].id
        if (task === '' || task === undefined) return;
        const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        retrieveDB.filter(e => e.id === taskId)[0].todoListCollection.push(model.todoList(uuidv4(), task))
        localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(retrieveDB))
        
     

    }

    const deleteTask = (dbId, Tid) => {
        const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        const index = retrieveDB.filter(e => e.id === dbId)[0].todoListCollection
        index.filter(e => {
            if (e.id === Tid){
                const i = index.indexOf(e)
                retrieveDB.filter(e => e.id === dbId)[0].todoListCollection.splice(i,1)
                console.log (retrieveDB)
                localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(retrieveDB))
            }
            
        })

    }

    const editTodo = (dbId, Tid, title, description, datedue, priority) => {
        // console.log(`editing ${dbId} -- ${Tid}`)
        const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        const index = retrieveDB.filter(e => e.id === dbId)[0].todoListCollection
        index.filter(e => {
            if (e.id === Tid){
                const i = index.indexOf(e)
                retrieveDB.filter(e => e.id === dbId)[0].todoListCollection[i].title = title
                retrieveDB.filter(e => e.id === dbId)[0].todoListCollection[i].description = description
                retrieveDB.filter(e => e.id === dbId)[0].todoListCollection[i].datedue = datedue
                retrieveDB.filter(e => e.id === dbId)[0].todoListCollection[i].priority = priority
                console.log (retrieveDB)
                localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(retrieveDB))
                viewController.renderTodos(dbId);
            }
            
        })
    }

    const retrieveTodo = (dbId, Tid) => {
        
        const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        const QUERY = retrieveDB.filter(e => e.id === dbId)[0].todoListCollection
        .filter(e => e.id === Tid)[0]            
        return {title: QUERY.title, description: QUERY.description, dueDate: QUERY.datedue, priority: QUERY.priority}
    }

    return { startUp, deleteProjectButtons, addTask, deleteTask, editTodo,retrieveTodo  }

})();

export { controller }

    

    
    

 











// console.log(localDB)
