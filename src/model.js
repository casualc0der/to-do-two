const model = (()=> {


const project = (id, name) => {

    const todoListCollection = [];
    return {id, name, todoListCollection};

}

const todoList = (id, title, desc, datedue, priority) => {
    return { id, title, desc, datedue, priority}
}

const projectDB = () => {
    const PDatabase = [];
    const fetchDB = () => PDatabase
    return { PDatabase, fetchDB };
}

const deleteProject = (id) => {
    const DB = JSON.parse(localStorage.getItem(['DATABASE']['PDatabase']))
    const loller = DB
    const mapper = loller.filter((e) => e.id !== id)
    localStorage.setItem(['DATABASE']['PDatabase'], JSON.stringify(mapper))
}



return { project, projectDB, deleteProject, todoList}

})();
export { model }