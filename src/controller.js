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

    document.getElementById('addProject').addEventListener('click', () => {
    const projectName = document.getElementById('projectNameInput').value
    const x = model.project(uuidv4(), projectName);
    DATABASE.PDatabase.push(x)

    localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(DATABASE.PDatabase))
    const retrieveDB1 = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']))
    viewController.renderProjects(DATABASE.PDatabase)

    })
}

    const deleteProj = () => {
        const deleteButtons = document.querySelectorAll('.deleteButton')
        deleteButtons.forEach((e) => {
            e.addEventListener('click', () => {
                const deleteID = e.parentNode.id;
                console.log(deleteID)
                model.deleteProject(deleteID);
                const retrieveDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']))
                viewController.renderProjects(retrieveDB);

        })
    })
    };

    deleteProj();

    return { startUp, deleteProj }

})();

export { controller }

    

    // console.log(DATABASE)
    // console.log(deleteButtons)
    
    

 











// console.log(localDB)
