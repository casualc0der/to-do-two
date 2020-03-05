import { model } from './model'
import { v4 as uuidv4 } from 'uuid';

const init = (() => {

    const loadDB = () => {
    if(['DATABASE']['PDatabase'] in localStorage){ 

        const savedDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']))
        let DATABASE = model.projectDB()
        savedDB.forEach((e) => {
            DATABASE.PDatabase.push(e)
        })
       
        return DATABASE;
    }
    else {
        let DATABASE = model.projectDB()
        const x = model.project(uuidv4(), 'Default Project');
        DATABASE.PDatabase.push(x);
        localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(DATABASE.PDatabase));
        
        

        return DATABASE
    }
}
    return { loadDB }
})();

export { init }