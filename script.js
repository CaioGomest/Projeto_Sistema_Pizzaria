let cart = [];
var areaPizzaQt = 1;
const q = (el)=>document.querySelector(el);
const qa = (el)=>document.querySelectorAll(el);
var keyPizza = 0;
var keySize = 0;


pizzaJson.map((item, index)=>{

    let pizzaItem = q('.pizza-item').cloneNode(true); 

    pizzaItem.setAttribute('data-key',index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; //pega a class da pizzaItem (.pizza-item--img) e seleciona o elemento IMG e depois muda o src 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;//toFixed(2) = todos os elementos ficam com 2 algarismos deposi da virgula 
   
    //Janela Area Da Pizza Selecionada 
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
       
        //para saber qual pizza é (na hora de colocar no carrinho)
        var key = pizzaItem.getAttribute('data-key');
        keyPizza = key;

        e.preventDefault(); //tira o evento de reload da pagina, que é algo padrao 
        q('.pizzaWindowArea').style.display = 'flex';
        setTimeout( ()=>q('.pizzaWindowArea').style.opacity = 1, 100)//como o js é rapido, não da tempo de aparecer a transiçao da opacidade do 0 para o 1, o js pula direto para o 1, entao deve ter um tempo até a opacidade ir para 1, ai entra o setTimeOut
        //preenchendo dados da pizza
        q('.pizzaBig img').src = item.img;
        q('.pizzaInfo h1').innerHTML = item.name;
        q('.pizzaInfo--desc').innerHTML = item.description;
        q('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price}`;
        q('.pizzaInfo--qt').innerHTML = areaPizzaQt;


       
        //selecionando tamanho 
        q('.pizzaInfo--size.selected').classList.remove('selected')
        qa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            //seleciona o grande sempre que abrir a area da pizza
            if(sizeIndex == 2){
            size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = item.sizes[sizeIndex]
            
            size.addEventListener('click', ()=>{
                q('.pizzaInfo--size.selected').classList.remove('selected')
                size.classList.add('selected')

                
            })
        })
    });

    q('.pizza-area').append(pizzaItem); 
})
function closeAreaPizza(){

    q('.pizzaWindowArea').style.opacity = 0;
    setTimeout( ()=>q('.pizzaWindowArea').style.display= 'none', 500)//como o js é rapido, não da tempo de aparecer a transiçao da opacidade do 0 para o 1, o js pula direto para o 1, entao deve ter um tempo até a opacidade ir para 1, ai entra o setTimeOut

}
// funçoes para add ou remove pizzas 
function addPizza(){
    areaPizzaQt = areaPizzaQt +1;
    
    q('.pizzaInfo--qt').innerHTML = areaPizzaQt;
}
function removePizza(){
    if(areaPizzaQt > 0){

        areaPizzaQt = areaPizzaQt - 1;
   
    q('.pizzaInfo--qt').innerHTML = areaPizzaQt;

    }else{
        return
    }
   
}
//carrinho
function addCarrinho(){

let size = q(".pizzaInfo--size.selected").getAttribute("data-key")
let keyQt = areaPizzaQt;
pizzaJson[keyPizza].sizes[size];

let identifier = pizzaJson[keyPizza].id+'@'+pizzaJson[keyPizza].sizes[size];


areaPizzaQt = 1;
let key = cart.findIndex((item)=> item.identifier == identifier)

if(key > -1){

    cart[key].qt += keyQt;
    
}else{cart.push({
    identifier,
    id:pizzaJson[keyPizza].name,
    size:pizzaJson[keyPizza].sizes[size], 
    qt:keyQt,
    });
}
upadetCart();
closeAreaPizza()
//console.log(`${keyQt} Pizzas do Sabor de ${pizzaJson[keyPizza].name} e o tamanho é ${pizzaJson[keyPizza].sizes[size]} `)
}

q('.menu-openner').addEventListener('click',()=>{ 
    if(cart.length > 0){
    q('aside').style.left = 0;
}});

q('.menu-closer').addEventListener('click',()=>{ 
    q('aside').style.left = '100vw';});
    

function upadetCart(){
    q('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        q('aside').classList.add("show");
        q('.cart').innerHTML = '';

        let desconto = 0;
        let subtotal = 0;
        let total = 0;

        for(let i in cart){

            let pizzaItem = pizzaJson.find((item) => item.name == cart[i].id);
            let cartItem = q('.models .cart--item').cloneNode(true);
            let qt = cart.qt;
            let nomeSize;
            subtotal += pizzaItem.price * cart[i].qt;
            
        

            switch (cart[i].size) {
                case '100g':
                case '320g':
                  nomeSize = 'P';
                  break;
                  
                case '530g':
                  nomeSize = 'M';
                  break;
              
                case '860g':
                  nomeSize = 'G';
                  break; 
              }
             
            
              
            let pizzaName = `${pizzaItem.name} (${nomeSize})`
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;  
            
//adicionar funçao + e - do carrinho!
            
              cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                upadetCart();
              } );
              cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1 ){
                cart[i].qt--;
                
              }else{
                cart.splice(i, 1);
              }

            
              upadetCart();
            } );
            

            q('.cart').append(cartItem);
        }
// adicionando descontos e preços 

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        q('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        q('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        q('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        q('aside').classList.remove("show");
    }

    q('.cart--finalizar').addEventListener('click', ()=>{

        let pedido = ''
        for (let t in cart) {
           
            pedido += ` ${cart[t].qt} Pizza de ${cart[t].id} de ${cart[t].size} \n`
    
        }

            var subpedido = 'Boa Noite! Gostaria de:\n'+ pedido;   
            console.log(subpedido) 

            var link = "https://wa.me/5511945894011?text=" + encodeURIComponent(subpedido);
            window.open(link);
    
    })
}


    

