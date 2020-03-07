/* eslint-disable max-len */
import { controller } from "./controller";

const viewController = (() => {
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  };
  const modal = document.getElementById("Modal");
  modal.style.display = "none";
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const createSection = (type, attachId, sectionId, sectionClass) => {
    const newSection = document.createElement(type);
    newSection.id = sectionId;
    newSection.classList.add(sectionClass);
    const node = document.getElementById(attachId);
    node.appendChild(newSection);
  };

  const createButton = (innerText, attachId, buttonId) => {
    const newButton = document.createElement("button");
    newButton.id = buttonId;
    newButton.textContent = innerText;
    const node = document.getElementById(attachId);
    node.appendChild(newButton);
  };

  const clearSection = sectionID => {
    const node = document.getElementById(sectionID);
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  };

  const clearInputText = sectionID => {
    const node = document.getElementById(sectionID);
    node.value = "";
    node.innerHTML = "";
  };

  const startUpRender = () => {
    createSection("div", "sidebar", "projectArea", "projects");
    createSection(
      "input",
      "projectArea",
      "projectNameInput",
      "projectNameInput"
    );
    document.getElementById("projectNameInput").maxLength = "15";

    createButton("Add List", "projectArea", "addProject");
    createSection("div", "projectArea", "projectDisplay", "projectIcons");
    createSection("div", "root", "todoDisplay", "todoIcons");
  };

  const renderProjects = db => {
    clearSection("projectDisplay");
    db.map(e => {
      createSection("div", "projectDisplay", e.id, "projectTiles");
      createSection("div", e.id, `P${e.id}`, "projTitle");
      const tile = document.getElementById(`P${e.id}`);
      tile.innerHTML = e.name;
      createButton("x", e.id, `B~${e.id}`);
      document.getElementById(`B~${e.id}`).classList.add("deleteButton");
      tile.addEventListener("click", () => {
        renderTodos(e.id);
      });
    });

    controller.deleteProjectButtons();
  };

  const renderTodos = dbID => {
    clearSection("todoDisplay");
    clearSection("navbar");
    const modal = document.getElementById("Modal");
    modal.style.display = "none";

    viewController.createSection(
      "h6",
      "navbar",
      "projectHeading",
      "projeheading"
    );
    viewController.createSection("input", "navbar", dbID, "taskNameInput");
    viewController.createButton("Add Task", "navbar", "addTask");

    document.getElementById("addTask").addEventListener("click", () => {
      controller.addTask();

      renderTodos(dbID);
    });

    const retrieveDB = JSON.parse(
      localStorage.getItem(["DATABASE"]["PDatabase"])
    );
    try {
      document.getElementById("projectHeading");
      // eslint-disable-next-line arrow-parens
      const projectTitle = retrieveDB.filter(e => e.id === dbID)[0];

      // eslint-disable-next-line arrow-parens
      const tasks = retrieveDB.filter(e => e.id === dbID)[0].todoListCollection;
      document.getElementById("projectHeading").innerHTML = projectTitle.name;

      tasks.forEach(e => {
        createSection("div", "todoDisplay", `TT-${e.id}`, "todotiles");
        createSection("div", `TT-${e.id}`, `T-${e.id}`, "todotilesdetail");
        const node = document.getElementById(`T-${e.id}`);
        node.innerHTML = `  <ul>
                                <li><h2>${e.title}</h6></li>            
                               <li>${e.description || ""}</li> 
                               <li> ${e.datedue || ""}</li> 
                               <li>${e.priority || ""}</li> 
                               </ul>                `;
        node.addEventListener("click", () => {
          createForm(dbID, e.id);
          const modal = document.getElementById("Modal");
          modal.style.display = "block";
        });
        createButton("x", `TT-${e.id}`, `BB${e.id}`);
        document.getElementById(`BB${e.id}`).classList.add("deleteTodoButton");
        document.getElementById(`BB${e.id}`).addEventListener("click", () => {
          controller.deleteTask(dbID, e.id);
          const modal = document.getElementById("Modal");
          modal.style.display = "none";
          renderTodos(dbID);
        });
      });
    } catch (error) {
      document.getElementById("addTask").classList.add("hidden");
      document
        .getElementsByClassName("taskNameInput")[0]
        .classList.add("hidden");
      const modal = document.getElementById("Modal");
      modal.style.display = "none";
    }

    const createForm = (dbID, id) => {
      try {
        clearSection("myModal");
        createSection("div", "myModal", `F-${id}`, "taskForm");
        const modal = document.getElementById("Modal");
        const modalContent = document.getElementById("modal-content");
        modal.appendChild(modalContent);

        createSection("input", `F-${id}`, "title", "taskFormFields");
        createSection("input", `F-${id}`, "description", "taskFormFields");
        createSection("input", `F-${id}`, "dueDate", "taskFormFields");
        createSection("select", `F-${id}`, "priority", "taskFormFields");
        createSection("option", "priority", "high", "taskFormFields");
        createSection("option", "priority", "normal", "taskFormFields");
        createSection("option", "priority", "low", "taskFormFields");
        createButton("Update", "myModal", "updateFormButton");
        document.getElementById("high").value = "High";
        document.getElementById("high").textContent = "High";
        document.getElementById("normal").value = "Normal";
        document.getElementById("normal").textContent = "Normal";
        document.getElementById("low").value = "Low";
        document.getElementById("low").textContent = "Low";

        const details = controller.retrieveTodo(dbID, id);
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const dueDate = document.getElementById("dueDate");
        dueDate.type = "date";
        const priority = document.getElementById("priority");

        if (details.title === undefined) {
          title.value = "";
          title.placeholder = "Title";
        } else {
          title.value = details.title;
        }

        if (details.description === undefined) {
          description.value = "";
          description.placeholder = "Description";
        } else {
          description.value = details.description;
        }

        dueDate.value = details.dueDate;

        if (details.priority === undefined) {
          priority.value = details.priority = "";
          priority.placeholder = "Priority";
        } else {
          priority.value = details.priority;
        }

        document
          .getElementById("updateFormButton")
          .addEventListener("click", () => {
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const dueDate = document.getElementById("dueDate").value;
            const priority = document.getElementById("priority").value;
            controller.editTodo(
              dbID,
              id,
              title,
              description,
              dueDate,
              priority
            );
            const modal = document.getElementById("Modal");
            modal.style.display = "none";

            //  document.getElementById('myModal').classList.remove('shown')
            //  document.getElementById('myModal').classList.add('hidden')
          });

        renderTodos(dbID);
      } catch (error) {
        clearSection("myModal");
        const modal = document.getElementById("Modal");
        modal.style.display = "none";
      }
    };
  };

  return {
    createSection,
    createButton,
    clearInputText,
    clearSection,
    renderProjects,
    renderTodos,
    startUpRender
  };
})();

export { viewController };
