"use strict";

let col=4
let first=1;

function Product (name,type){
this.name=name,
this.type=type
this.price=generatePrice(100,500)
this.val=this.checkPrice()
Product.products.push(this)


}


Product.products=[]


function updateStorage(allproducts)
{
let data=JSON.stringify(allproducts)

    localStorage.setItem("prods",data)
}

function generatePrice(min,max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;

}


Product.prototype.checkPrice=function()
{
    if(this.price <200)
    {
        return "USED";
    }

    else 
    {
        return "New";

    }
}


let form=document.getElementById('form')

form.addEventListener('submit',handleSub)

function handleSub(event)
{
    event.preventDefault();

    let userName=event.target.user.value

    let mobileType=event.target.type.value

 new Product(userName,mobileType)

 updateStorage(Product.products)

render()
}



let table =document.getElementById('table')


function header()
{

    let arr=['User','Type','Price','Condition']
    let tr=document.createElement('tr')
    table.appendChild(tr)
    let th;

    for(let j =0 ; j < col; j++)
    {
        th=document.createElement('th')
        tr.appendChild(th)
        th.textContent=arr[j]
    }

}

function render()
{

table.textContent=''
header()
let tr=document.createElement('tr')
let td;

for(let j =0 ; j < Product.products.length; j++)
{

 tr=document.createElement('tr')
 table.appendChild(tr)

td=document.createElement('td')
tr.appendChild(td)
td.textContent=`${Product.products[j].name}`

td=document.createElement('td')
tr.appendChild(td)
td.textContent=`${Product.products[j].type}`

td=document.createElement('td')
tr.appendChild(td)
td.textContent=`${Product.products[j].price}`

td=document.createElement('td')
tr.appendChild(td)
td.textContent=`${Product.products[j].val}`

}


updateStorage(Product.products)


}
function getData()
{
let getdata=localStorage.getItem("prods");

let parsedData=JSON.parse(getdata);


if(parsedData!==null)
{
for(let i = 0 ; i < parsedData.length ; i++)
{
    
    let newUser = new Product(parsedData[i].name , parsedData[i].type)
    newUser.price=Product.products[i].price
    newUser.val=Product.products[i].val
}


}



render()
}


getData()