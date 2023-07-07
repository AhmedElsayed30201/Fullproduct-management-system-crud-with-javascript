let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;

console.log(title,price,taxes,ads,discount,count,total,category,submit);

// First Function Get Total
let getTotal = () => {
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040"
     }
    else{
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }
    
}


// Seconed Function create product
let dataProduc;
if(localStorage.product != null){
    dataProduc = JSON.parse(localStorage.product)  
}else{
    dataProduc = [];
}

submit.onclick = function(){

    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        category : category.value.toLowerCase(),
        count : count.value,
    }
    
    if
    (
    title.value != "" 
    && price.value != "" 
    && category.value != ""
    && newPro.count <= 100 
    )
    {
        if(mood === 'create'){
            // count
        if(newPro.count > 1 ){
            for(let i = 0; i < newPro.count ; i++){
                dataProduc.push(newPro);
            }
        }else{
            dataProduc.push(newPro);
        }
       
        }else{
            dataProduc[temp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
    
        }
        // clear Input
        clearData();
    }

    // save localstroge
    localStorage.setItem('product', JSON.stringify(dataProduc));

    // Show Data
    showData();

  

}



// clear input
function clearData(){
    title.value = "",
    price.value = "",
    taxes.value = "",
    ads.value   = "",
    discount.value = "",
    total.innerHTML = "",
    count.value = "",
    category.value = ""
}


// read
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataProduc.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduc[i].title}</td>
            <td>${dataProduc[i].price}</td>
            <td>${dataProduc[i].taxes}</td>
            <td>${dataProduc[i].ads}</td>
            <td>${dataProduc[i].discount}</td>
            <td>${dataProduc[i].total}</td>
            <td>${dataProduc[i].category}</td>
            <td><button onclick='updataData(${i})' id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>
        `
    }
   
    document.getElementById('tbody').innerHTML = table;
    let btnData = document.getElementById('dataAll');
    if(dataProduc.length > 0 ){
        btnData.innerHTML = `<button onclick='deleteAll()'>delete all ( ${dataProduc.length} )</button>`;
    }else{
        btnData.innerHTML = '';
    }
}

// Show Data
showData();

// delete
// First Function Delete
function deleteData(i){
    dataProduc.splice(i,1);
    localStorage.product = JSON.stringify(dataProduc);
    showData();
}
// seconed Function Delete
function deleteAll(){
    localStorage.clear();
    dataProduc.splice(0);
    showData();
}




// update
function updataData(i){
    title.value = dataProduc[i].title;
    price.value = dataProduc[i].price;
    ads.value = dataProduc[i].ads;
    taxes.value = dataProduc[i].taxes;
    discount.value = dataProduc[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduc[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

// search
let searchMood = 'title';

// First Function Search
function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id === 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
        
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

// Seconed Function Search
function searchDate(value)
{
    let table = '';
    for(let i = 0; i < dataProduc.length; i++){
    if(searchMood === 'title'){
            if(dataProduc[i].title.includes(value.toLowerCase())){

                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduc[i].title}</td>
                    <td>${dataProduc[i].price}</td>
                    <td>${dataProduc[i].taxes}</td>
                    <td>${dataProduc[i].ads}</td>
                    <td>${dataProduc[i].discount}</td>
                    <td>${dataProduc[i].total}</td>
                    <td>${dataProduc[i].category}</td>
                    <td><button onclick='updataData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>
                `

            }

    }else{
            if(dataProduc[i].category.includes(value.toLowerCase())){

                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduc[i].title}</td>
                    <td>${dataProduc[i].price}</td>
                    <td>${dataProduc[i].taxes}</td>
                    <td>${dataProduc[i].ads}</td>
                    <td>${dataProduc[i].discount}</td>
                    <td>${dataProduc[i].total}</td>
                    <td>${dataProduc[i].category}</td>
                    <td><button onclick='updataData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>
                `

            }
      
    }
}
    document.getElementById('tbody').innerHTML = table;
}


// clean data