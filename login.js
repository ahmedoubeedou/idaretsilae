let title    =   document.getElementById("title");
let price    =   document.getElementById("price");
let taxes    =   document.getElementById("taxes");
let ads      =   document.getElementById("ads");
let discount =   document.getElementById("discount");
let count    =   document.getElementById("count");
let catgorie =   document.getElementById("catgorie");
let creat    =   document.getElementById("creat");
let serche   =   document.getElementById("serche");
let delate   =   document.getElementById("delate");
let total    =   document.getElementById("total");
let tbody    =   document.getElementById("tbody");
let serchet  =   document.getElementById("serchet");
let serchec  =   document.getElementById("serchec");
let veri     =   document.getElementById("veri");
let arr;
let index;
if(localStorage.Producte != null)
{
arr = JSON.parse(localStorage.Producte)
}
else{
    arr=[];
}
//clear input
function clear()
{
  title.value    = "";  
  price.value    = "";
  taxes.value    = "";
  ads.value      = "";
  discount.value = "";
  count.value    = "";
  catgorie.value = "";
}
//cette function pour calculer la totale
function totals()
{
    let priceValue     = +price.value;
    let taxesValue     = +taxes.value;
    let adsValue       = +ads.value;
    let discountsValue = +discount.value;
    let totale = (priceValue  + taxesValue + adsValue) - discountsValue
    total.innerHTML = totale;
    if(totale <= 0){
        total.style.background="red";
        
    }
    else{
        total.style.background="green";
    }
}
totals()
//ferifications des inputs
function verifi()
{
if( title.value ==="" || +price.value <= 0 ||  +taxes.value <= 0||+ads.value <= 0 || +discount.value <= 0|| +count.value <= 0||catgorie.value==="")
{
veri.innerHTML = "remplie tous les champs ";
veri.style.color="red";
return 0;
}
}
//suprimer le message des champs
function delmesag()
{
    if(veri.innerHTML === "remplie tous les champs "){
        veri.innerHTML = "";
    }
}
//pour cree
function create()
{
verifi()
let produit={
    titles    : title.value,
    prices    : price.value,
    taxe      : taxes.value,
    ad        : ads.value,
    discounts : discount.value,
   totald     : total.innerHTML,
    catgories : catgorie.value,
}
if(creat.innerHTML === "UPDATE"){
    arr[index] =  produit;
    creat.innerHTML="CREATE"
     count.style.display="block";
     clear()
     totals()
}
else{
    let cont = +count.value;
    for(let i=0;i<cont;i++)  {
        arr.push(produit)
    }
   }
   if(arr.length >= 1){
    delate.style.display="block";
   }
   localStorage.setItem("Producte" , JSON.stringify(arr));
   remplie();
   clear();
   totals();
}
//function pour remplie le tableau
function remplie()
{
   let tbodys="";
   for(let i=0;i<arr.length;i++) 
   {
    tbodys+=`
   <tr>
   <td>${i+1}</td>
   <td>  ${arr[i].titles} </td>
   <td>  ${arr[i].prices} </td>
   <td>    ${arr[i].taxe} </td>
   <td>    ${arr[i].ad}   </td>
   <td>${arr[i].discounts}</td>
   <td>${arr[i].totald }   </td>
   <td>${arr[i].catgories}</td>
   <td><button onclick="update(id)" id=${i} class="delupd">UPDATE</button></td>
   <td> <button class="delupd" onclick="deletone(id)" id=${i}>DELATE</button></td>
   </tr>
   ` ;
 }
tbody.innerHTML= tbodys;
delate.innerHTML =` Deleat All (${arr.length})`;
}
remplie()
//function delate all
function delAll()
{
    arr=[];
    localStorage.clear();
    remplie();
    delate.style.display="none";  
}
//pour modifier un element
function update(i)
{
  let id = +i; 
  index = id;
  title.value    = arr[id].titles;  
  price.value    = arr[id].prices;
  taxes.value    = arr[id].taxe;
  ads.value      = arr[id].ad;
  total.innerHTML= arr[i].totald;
  count.value = 1;
  discount.value = arr[id].discounts;
  catgorie.value = arr[id].catgories;
  totals();
  count.style.display="none";
  creat.innerHTML = "UPDATE";
}
//pour suprimer un element
function deletone(i)
{
id = +i;
arr.splice(id,1);
localStorage.setItem("Producte" , JSON.stringify(arr));
remplie()
}
//function serche
function serches(tile)
{
    if(tile === "serchet"){
      serche.placeholder="Search BY Title" ;
      serchet.innerHTML = "Serche";
if(serchec.innerHTML==="Serche")
{
    serchec.innerHTML = "Search BY Categrie";
}
    }
    else{
       serche.placeholder="Search BY Categrie" ;
       serchec.innerHTML = "Serche";
       if(serchet.innerHTML==="Serche"){
        serchet.innerHTML = "Search BY Title";
       }
    }

}
//serche apartire d'un type donner
function serchtc(tile)
{
    if(tile === "Search BY Categrie"){
           let tbodys="";
           numberTitle = 0;
   for(let i=0;i<arr.length;i++) 
   {
    if(arr[i].catgories.includes((serche.value))){ 
        numberTitle++;
    tbodys+=`
   <tr>
   <td>${i+1}</td>
   <td>  ${arr[i].titles} </td>
   <td>  ${arr[i].prices} </td>
   <td>    ${arr[i].taxe} </td>
   <td>    ${arr[i].ad}   </td>
   <td>${arr[i].discounts}</td>
   <td>${arr[i].totald }   </td>
   <td>${arr[i].catgories}</td>
   <td><button onclick="update(id)" id=${i} class="delupd">UPDATE</button></td>
   <td> <button class="delupd" onclick="deletone(id)" id=${i}>DELATE</button></td>
   </tr>
   ` ;
    }
 }
tbody.innerHTML= tbodys;
delate.innerHTML =` Deleat All (${numberTitle})`;
    }
else if(tile === "Search BY Title"){
           let tbodys="";
           numberTitle = 0;
   for(let i=0;i<arr.length;i++) 
   {
    if(arr[i].titles.includes(serche.value)){ 
        numberTitle++;
    tbodys+=`
   <tr>
   <td>${i+1}</td>
   <td>  ${arr[i].titles} </td>
   <td>  ${arr[i].prices} </td>
   <td>    ${arr[i].taxe} </td>
   <td>    ${arr[i].ad}   </td>
   <td>${arr[i].discounts}</td>
   <td>${arr[i].totald }   </td>
   <td>${arr[i].catgories}</td>
   <td><button onclick="update(id)" id=${i} class="delupd">UPDATE</button></td>
   <td> <button class="delupd" onclick="deletone(id)" id=${i}>DELATE</button></td>
   </tr>
   ` ;
    }
 }
tbody.innerHTML= tbodys;
delate.innerHTML =` Deleat All (${numberTitle})`;
    }
else{
           let tbodys="";
           numberTitle = 0;
   for(let i=0;i<arr.length;i++) 
   {
    if(arr[i].titles.includes(serche.value) || arr[i].catgories.includes(serche.value)){ 
        numberTitle++;
    tbodys+=`
   <tr>
   <td>${i+1}</td>
   <td>  ${arr[i].titles} </td>
   <td>  ${arr[i].prices} </td>
   <td>    ${arr[i].taxe} </td>
   <td>    ${arr[i].ad}   </td>
   <td>${arr[i].discounts}</td>
   <td>${arr[i].totald }   </td>
   <td>${arr[i].catgories}</td>
   <td><button onclick="update(id)" id=${i} class="delupd">UPDATE</button></td>
   <td> <button class="delupd" onclick="deletone(id)" id=${i}>DELATE</button></td>
   </tr>
   ` ;
    }
 }
tbody.innerHTML= tbodys;
delate.innerHTML =` Deleat All (${numberTitle})`;
    }
}