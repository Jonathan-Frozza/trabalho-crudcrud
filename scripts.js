

const lista = document.getElementById("listaClientes");


function carregarClientes() {
    fetch("https://crudcrud.com/api/971bda3059c944dd9d56f8a88004717a/clientes")
        .then(res => res.json())
        .then(clientes => {
            lista.innerHTML = ""; 
            clientes.forEach(cliente => {
                const item = document.createElement("li");
                item.innerHTML = `
                    ${cliente.nome} - ${cliente.email}
                    <button class="btn-excluir" data-id="${cliente._id}">Excluir</button>
                `;
                lista.appendChild(item);
            });
        });
}


document.getElementById("add").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    fetch("https://crudcrud.com/api/971bda3059c944dd9d56f8a88004717a/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email })
    })
    .then(res => res.json())
    .then(cliente => {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        carregarClientes(); 
    });
});


lista.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-excluir")) {
        const id = event.target.getAttribute("data-id");
        fetch(`https://crudcrud.com/api/971bda3059c944dd9d56f8a88004717a/clientes/${id}`, {
            method: "DELETE"
        }).then(() => carregarClientes());
    }
});


document.addEventListener("DOMContentLoaded", carregarClientes);
