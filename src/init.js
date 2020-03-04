import { model } from './model'

const init = (() => {

    const loadDB = () => {
    if('DATABASE' in localStorage){ 

        const savedDB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']))
        let DATABASE = model.projectDB()
        savedDB.forEach((e) => {
            DATABASE.PDatabase.push(e)
        })
       
        return DATABASE;
    }
    else {
        let DATABASE = model.projectDB()
        return DATABASE
    }
}
    return { loadDB }
})();

export { init }