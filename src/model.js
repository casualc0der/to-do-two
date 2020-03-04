const model = (()=> {


const project = (id, name) => {

    const todoLists = [];

    return {id, name, todoLists};

}

const projectDB = () => {

    const PDatabase = [];

    const fetchDB = () => PDatabase

    

    return { PDatabase, fetchDB };
}

const deleteProject = (id) => {

    
    const DB = JSON.parse(localStorage.getItem(['DATABASE']))
    // DB['PDatabase'].splice((DB['PDatabase'].indexOf(id)), 1)
    
    const lol = DB['PDatabase'][0]['id']
    // localStorage.setItem('DATABASE', JSON.stringify(DB))
    // console.log(`Delete prod`)
    console.log(lol)
    // console.log(DB)

    // const browserDB = PDatabase;
    

}



return { project, projectDB, deleteProject}

})();
export { model }