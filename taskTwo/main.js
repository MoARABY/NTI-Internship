
async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        // calling addSearch function to set options to select
        addSearch(products)
    } catch (error) {
        console.error('Error while fetching :', error);
    }
}
async function fetchProductsByCat(category) {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        const FilterProducts = products.filter(product => product.category === category);
        console.log(FilterProducts)

        // calling addSearch function to set options to select
        addProducts(FilterProducts)
    } catch (error) {
        console.error('Error while fetching :', error);
    }
}


const addProducts=(products)=>{
    let productsDiv=document.getElementById("products-div")
    let main=document.getElementById("main")
    let productCounter=0
    let pageCounter=1

    productsDiv.innerHTML = "";

    products.forEach(product => {
        productsContainer=document.createElement("div")
        productsContainer.setAttribute("class",`products-container-${pageCounter}`)
        productsContainer.setAttribute("id","products-container")
        productsDiv.appendChild(productsContainer)
        if(productCounter === 4){
            pageCounter++
            productCounter=0
        }
        const productDiv = document.createElement('div');
        // productDiv.setAttribute("class",`product-div-${pageCounter}`)
        productDiv.setAttribute("class","product-div")
        productDiv.setAttribute("id","product-div")

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
        productDiv.appendChild(productTitle);  

        const productImage = document.createElement('img');
        productImage.src = product.image
        productDiv.appendChild(productImage);

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: $${product.price}`;
        productDiv.appendChild(productPrice);

        const productDesc = document.createElement('p');
        productDesc.textContent = product.description;
        productDiv.appendChild(productDesc);

        productsContainer.appendChild(productDiv)
        productsDiv.appendChild(productsContainer)
        productCounter++

    });
}

const addSearch=(products)=>{
    const search=document.getElementById("search-head")
    const allCats=document.createElement("option")
    search.innerHTML=""

    allCats.value="all"
    allCats.textContent="all"
    search.appendChild(allCats)
    const allCategories=[]
    products.forEach(product => {
        allCategories.push(product.category)
    });
    const categories=new Set(allCategories)
    console.log(categories)
    categories.forEach(category => {
        const option=document.createElement("option")
        option.value=category
        option.textContent = category;
        search.appendChild(option);
    });

    // calling addProducts function to build html structure 
    addProducts(products)
}
const searchBTN=document.getElementById("searchBTN")
searchBTN.onclick=()=>{
    const searchHead=document.getElementById("search-head")
    if(searchHead.value === "all"){
        fetchProducts()
    } else {
        fetchProductsByCat(searchHead.value)

    }
}

fetchProducts()