const projModal = document.getElementById("project-modal");

const closeButtons = document.querySelectorAll("#closeBtn");

const projForm = document.getElementById("form1");

const addButtons = document.querySelectorAll(".add");

const taskForm = document.getElementById("form2");


closeButtons.forEach((closeButton) => {

    closeButton.addEventListener("click", (e) => {
        const modal = e.target.closest("dialog");

        if(modal){
            const form = modal.querySelector("form");

            if(form){
                form.reset();
            }

            modal.close();
        }
    })
})

addButtons.forEach((addButton) => {
    addButton.addEventListener("click", (e) => {
        const modalId = e.target.getAttribute("data-modal");


        const modal = document.getElementById(modalId);
        
        if(modal){
            modal.showModal();
        }
    })
})
