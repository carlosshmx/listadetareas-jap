let lista = []


function mostrar(){
    let elementos = ``;
    if(localStorage.getItem("info")){
        lista = JSON.parse(localStorage.getItem("info"))

        lista.forEach(element => {

            let cardState = `d-flex justify-content-between bg-secondary text-white rounded p-2`
            let completedCheck = `bi bi-check-square`
            let importantCheck = `bi bi-exclamation-square`

            if(element.important){
                importantCheck = `bi bi-exclamation-square-fill`
                cardState = `d-flex justify-content-between rounded bg-warning bg-gradient  p-2`
            }
            if(element.completed){
                completedCheck = `bi bi-check-square-fill`
                cardState = `d-flex justify-content-between bg-success bg-gradient rounded p-2`
            }
            

        elementos += `<div class="${cardState}" id="indice${element.index}">
        <div class="editableInfo w-100">
            <h3>${element.titulo}</h3>
            <p>${element.descripcion}</p>
        </div>
        
        <div class="d-flex flex-column">
            <button type="button" name="editar" class="border-0 bg-transparent" onclick=mostrarEditor(${element.index})> <i class="bi bi-pencil-square"></i>

            <button type="button" name="completado" class="border-0 bg-transparent" onClick=completar(${element.index})> <i class="${completedCheck}"></i>

            <button type="button" name="importante" class="border-0 bg-transparent" onClick=importante(${element.index})> <i class="${importantCheck}"></i>

            <button type="button" name="eliminar" class="border-0 bg-transparent" onclick=borrar(${element.index})> <i class="bi bi-x-square"></i>
        </div>
    </div>
    <hr>`
        
    });
    }else{
        localStorage.setItem("info", '');
    }
    document.querySelector(".entregable").innerHTML = elementos;
}


document.addEventListener("DOMContentLoaded", () =>{
    mostrar();

    document.getElementById("btn").addEventListener("click", (event) =>{
        event.preventDefault();
        let titulo = document.getElementById("titulo");
        let descripcion = document.getElementById("descripcion")
        if(titulo.value && descripcion.value){
            let tarea = {
                titulo: titulo.value, 
                descripcion: descripcion.value,
                index: lista.length ? lista[lista.length-1].index + 1 : 1,
                completed: false,
                important: false
            };
            lista.push(tarea);
         
            localStorage.setItem("info",JSON.stringify(lista));
            mostrar();
            titulo.value = '';
            descripcion.value ='';
        }
    })

})


function borrar(index){
    lista = lista.filter(elem => elem.index != index);
    localStorage.setItem('info', JSON.stringify(lista));
    mostrar();
}

function guardar(index){
    let nuevoTitulo = document.getElementById(`tituloEdit${index}`)
    let nuevaDescripcion = document.getElementById(`descipcionEdit${index}`)
    let posicion = lista.findIndex(elem => elem.index == index);
    lista[posicion].titulo = nuevoTitulo.value;
    lista[posicion].descripcion = nuevaDescripcion.value;
    localStorage.setItem('info', JSON.stringify(lista));
    mostrar();
}

function mostrarEditor(index){
    mostrar();
    let tarea = lista.find(elem => elem.index == index);
    let tarjeta = document.querySelector(`#indice${index} .editableInfo`);
    tarjeta.innerHTML = `
                        <input type="text" value="${tarea.titulo}" class="mb-1 form-control" id="tituloEdit${index}"></input>
                        <textarea class="mb-1 form-control" id="descipcionEdit${index}">${tarea.descripcion}</textarea>
                        <button class="btn btn-success" onclick=guardar(${index}) >Guardar</button>`
    
}

function completar(index){
    let posicion = lista.findIndex(elem => elem.index == index);
    lista[posicion].completed = !lista[posicion].completed;
    localStorage.setItem('info', JSON.stringify(lista));
    mostrar();
}

function importante(index){
    let posicion = lista.findIndex(elem => elem.index == index);
    lista[posicion].important = !lista[posicion].important;
    localStorage.setItem('info', JSON.stringify(lista));
    mostrar();
}