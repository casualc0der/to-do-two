import { viewController } from './view';
import { model } from './model'
import { init } from './init'
import { v4 as uuidv4 } from 'uuid';

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
    localStorage.setItem('DATABASE', JSON.stringify(DATABASE))
    viewController.renderProjects(DATABASE.PDatabase)

})

const deleteButtons = document.querySelectorAll('.deleteButton')

deleteButtons.forEach((e) => {
    e.addEventListener('click', () => {
        const deleteID = e.parentNode.id;
        console.log(deleteID)
        // console.log(`my ID is.. ${deleteID}`)
        model.deleteProject(deleteID);
        const retrieveDB = JSON.parse(localStorage.getItem('DATABASE'))
        console.log(`controller DB`)
        console.log(retrieveDB)
        viewController.renderProjects(DATABASE.PDatabase);

    })
})

    

    // console.log(DATABASE)
    // console.log(deleteButtons)
    
    

 











// console.log(localDB)
