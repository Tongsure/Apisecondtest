// Fetchdata();
// async function Fetchdata(){
//   try{
//     const pokemonName = document.getElementById("Image").value.toLowerCase();
//     // const Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//     const Response = await fetch(`https://localhost:7139/api/Region`)
//     if(!Response.ok){
//       throw new Error("Could not fetch Resource");
//     }
    
//     const data = await Response.json();
//     console.log(data)
//     // const pokemonsprite = data.sprites.front_default;
//     // const imgElement = document.getElementById("PokemonSprite")
//     // if(pokemonsprite){
//     //   imgElement.src = pokemonsprite;
//     //   imgElement.style.display = "block";
//     // }else{
//     //   imgElement.src = "";
     
//     // }
//   }catch(error){
//     console.error(error)
//   }
// }
GetAll()
$("#updatedbtn").prop('disabled',true);
var Updatedata = {}
$(document).ready(function(){
  $("#btn").on('click',function(){
    var ID = $("#Image").val();
   if(ID){
    GetById(ID);
   }else{
    alert("Please input ID first");
   }
  })
  $("#btn-submit").on('click',function(){
    var CodeValue = $("#code").val();
    var nameValue = $("#name").val();
    if(CodeValue && nameValue){
      Post(CodeValue,nameValue)
    }else{
      if(!CodeValue && !nameValue){
        alert("Please Fill All the boxes")
      }else if(!nameValue){
        alert("Please Fill Name");
      }else if(!CodeValue){
        alert("Please Fill Code")
      }
    }
    
  })
  $("tbody").on('click','.btnDelete', function(){
    var DeleteId = $(this).parent().siblings().eq(0).text();
    alert(DeleteId)
    if(DeleteId){
      DeleteById(DeleteId);
    }else{
      alert("Please input Id");
    }
  })
  var Index;
  $("tbody").on('click','.updatebtn',function(){
    Index = $(this).parent().parent().index();
   
    var  Id = $(this).parent().siblings().eq(0).text();
    var  code = $(this).parent().siblings().eq(1).text();
    var  name = $(this).parent().siblings().eq(2).text();
    $("#updateId").val(Id)
    $("#Updatename").val(name);
    $("#Updatecode").val(code);
    $(".PopUpcardUpdate").show();
    $("#updatedbtn").prop('disabled',false);
    
   
   
   
   
  })
  $("#updatedbtn").click(function(){
    var ID =  $("#updateId").val();
    var Name =  $("#Updatename").val();
    var code = $("#Updatecode").val();
    $(".updatebtn").parent().parent().eq(Index).children().eq(1).text(code)
   $(".updatebtn").parent().parent().eq(Index).children().eq(2).text(Name);
    Updatedata.code = code;
    Updatedata.name = Name;
    $(".PopUpcardUpdate").hide();
    UpdateById(ID)
  })

})


  function Post(Code,Name){
    fetch('https://localhost:7139/api/Region', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: Code,
        Name: Name
      })
    })
      .then(response => response.json())
      .then(data => 
        $("tbody").append(`<tr>
                           <td>${data.id}</td>
                           <td>${data.code}</td>
                           <td>${data.name}</td>
                           <td>
                           <button class="btnDelete btn btn-danger">Delete</button>
                           <button  class="updatebtn btn btn-primary">Update</button>
                           </td>
                           </tr>
                          `)

      )
  }
  
  var GETdata = {}
  function GetAll(){
    try{
      fetch('https://localhost:7139/api/Region', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
       
      })
        .then(response => response.json())
        .then(data => 
          data.forEach(region => {
            GETdata = region;
            var Table = `<tr>
                         <td>${region.id}</td>
                         <td>${region.code}</td>
                         <td>${region.name}</td>
                         <td>
                           <button class="btnDelete btn btn-danger">Delete</button>
                           <button  class="updatebtn btn btn-primary">Update</button>
                        </td>
                          </tr>
                        `
            $("tbody ").append(Table)
            console.log(GETdata);
            // $("#regions-list").append(`<li>${region.id}</li>`);
            // $("#regions-list").append(`<li>${region.name}</li>`);
            // $("#regions-list").append(`<li>${region.code}</li>`)
            // $("#regions-list").append(``)
          })
          
        )
        
    }catch(Erorr){
      $("#regions-list").append(`<li>${Erorr}</li>`)
    }
  }
  
  function GetById(Id){
    fetch(`https://localhost:7139/api/Region/${Id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      // Assuming 'data' is an object with 'id', 'name', and 'code' properties
      $("tbody").append(`
        <tr>
          <td> ${data.id}</td>
          <td> ${data.name}</td>
          <td> ${data.code}</td>
       </tr>
      `);
    })
  
  }
  DeleteById()
  function DeleteById(Id){
    fetch(`https://localhost:7139/api/Region/${Id}`,{
      method:'DELETE',
      headers:{       
        'Content-Type':'application/json'
      },
      
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }
  // UpdateById('ea15ce05-eba0-4ed2-67eb-08dc8a09aaa8','Chrea Tongsure','9420')
  function UpdateById(id){
    var Url = `https://localhost:7139/api/Region/${id}`;
    console.log(Updatedata)
    fetch(Url,{
      method:'PUT',
      
      body: JSON.stringify(Updatedata),
      headers:{
        'Content-Type':'application/json'
      }
    })  
    
  }
   
 
 