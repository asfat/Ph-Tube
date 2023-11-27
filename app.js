function allContent(global) {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${global?global:filterContent()}`)
    .then(res=>res.json())
    .then(data=>diplayContent(data.data))

}

function filterContent(){
    const drawingBox=document.getElementById("drawing-box");
    const drawingDiv= document.createElement("div");
    drawingDiv.innerHTML=`
    <img class="drawing-img" src="./PHero-Tube/Icon.png" alt="">
    <h1 class="text-center">Opps!! Sorry, there is no<br> content here!</h1>
    `
    drawingBox.appendChild(drawingDiv)
    
}

const diplayContent=(data)=>{
    console.log(data);
    const contentContainer=document.getElementById("content-container");
    data.forEach((data)=>{
        const Minute=parseFloat((data.others.posted_date)/60).toFixed(2);
        console.log(Minute);
        const hour=parseInt(Minute/60);
        console.log(hour);
        console.log((data.others.posted_date)/60);
        const verified=data.authors[0].verified
        const contentBox=document.createElement("div")
        contentBox.classList.add("content-box");
        contentBox.classList.add("col-md-3");
        contentBox.classList.add("col-sm-12");
        contentBox.innerHTML=(`
        <img class="content-thumb-img" src="${data.thumbnail}" alt="">
        <p>${hour} hours ${Minute} Minute</p>
        <div class="col-4 d-flex">
            
            <img class="content-pr-img " src="${data.authors[0].profile_picture}" alt="">
            <div class="content-author-details">
                <h5 class="text-center">${data.title}</h5>
                <p>${data.authors[0].profile_name}${verified?'<span><i class="fa-solid fa-certificate" style="color: #00db7c;"></i></span>':''}</p>
                <p>${data.others.views}</p>
        
            </div>
        </div>
        `)
        contentContainer.appendChild(contentBox)
    });

}

function SortByView(){
    fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
    .then(res=>res.json())
    .then(data=>Sorting(data.data))
}
function Sorting(data) {
    data.sort(function(a, b) {
        var viewsA = parseInt(a.others.views);
        var viewsB = parseInt(b.others.views);

        return viewsB - viewsA; 
    });
    diplayContent(data)
    
}