console.log(pizzaJson)
var areaPizzaQt = 1;
const q = (el)=>document.querySelector(el);
const qa = (el)=>document.querySelectorAll(el);


pizzaJson.map((item, index)=>{

    let pizzaItem = q('.pizza-item').cloneNode(true);  

    pizzaItem.setAttribute('data-key',index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; //pega a class da pizzaItem (.pizza-item--img) e seleciona o elemento IMG e depois muda o src 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;//toFixed(2) = todos os elementos ficam com 2 algarismos deposi da virgula 
    
    //Janela Area Da Pizza Selecionada 
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
       
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


