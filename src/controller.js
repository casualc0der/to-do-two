import { viewController } from './view';
import { model } from './model'
import { init } from './init'
import { v4 as uuidv4 } from 'uuid';

const controller = (() => {

const startUp = () => {
    const DATABASE  = init.loadDB();
    
    viewController.createSection('input','root','projectNameInput', 'projectNameInput' )
    viewController.createButton('Add Project', 'root', 'addProject')
    viewController.createSection('div', 'root', 'projectDisplay', 'projectIcons')
    viewController.createSection('div', 'root', 'todoDisplay', 'todoIcons')
    viewController.renderProjects(DATABASE.PDatabase)
    deleteProjectButtons();
    
document.getElementById('addProject').addEventListener('click', () => {
    addProject();
    })
}

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
        const retrievedDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        const x = model.project(uuidv4(), projectName);
        retrievedDB.push(x);
        localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(retrievedDB));
        const loadDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']));
        viewController.renderProjects(loadDB);
    }
    

    return { startUp, deleteProjectButtons }

})();

export { controller }

    

    
    

 











// console.log(localDB)
