const cargarPosts=async()=>{
    let url="https://jsonplaceholder.typicode.com/posts";
    const api=await fetch (url);
    const data=await api.json();
    console.log(data);
    tabla=document.querySelector("#lista");
    data.map(item=>{
        tabla.innerHTML+=`
        <tr>
        <th scope="row">${item.id}</th>
        <td>${item.title}</td>
        <td>${item.body}</td>
        <td><button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#editModal">EDITAR
        </button></button></td>
        <td><button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#deleteModal">ELIMINAR
        </button></button></td>
        </tr>`;
    })
}
const addPost=async ()=>{
    let titulo=document.querySelector("#titulo").value; 
    let body=document.querySelector("#body").value; 
    const post={
title:titulo,
        body:body,
        userId:1
    };

const api= await fetch('https://jsonplaceholder.typicode.com/posts', {
   
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
});
const respuesta=await api.json();
tabla=document.querySelector("#lista");
tr=document.createElement("tr");
tr.innerHTML=`
<tr>
        <th scope="row">${respuesta.id}</th>
        <td>${respuesta.title}</td>
        <td>${respuesta.body}</td>
        <td><button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#editModal">EDITAR
        </button></button></td>
        <td><button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#deleteModal">ELIMINAR
        </button></button></td>
        </tr>`;
    
        tabla.appendChild(tr);
        if(respuesta!=null){
            Swal.fire({
                icon:'success',
                tittle: 'INSERTAR',
                text: 'SE INSERTO CORRECTAMENTE!!'
            })
        }else{
            Swal.fire({
                icon:'error',
                title: 'ERROR',
                text:'ALGO FALLO!!!'

            })
        }
    }
    