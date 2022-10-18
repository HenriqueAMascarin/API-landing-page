let $linkInput = document.querySelector(".link-class");
let $btn = document.querySelector(".button-send");
let $linksGenerate = document.querySelector(".links-generate");
let $errorLink = document.querySelector(".error-link");

$btn.addEventListener("click", send);

document.querySelector(".link-flex").addEventListener("submit", function(e){
    e.preventDefault();
    send();
})

function get(url){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function changeBtn(father){
    father.classList.add("active");
    father.getElementsByTagName("button")[0].textContent = "Copied!";
    setTimeout(function(){
        father.classList.remove("active");
        father.getElementsByTagName("button")[0].textContent = "Copy";
    },2000);
}

$linksGenerate.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON" && e.target.parentNode.classList.contains("generated-div")){
        let father = e.target.parentNode;
        navigator.clipboard.writeText(father.getElementsByTagName("a")[0].textContent);
        changeBtn(father);
    }
})

function createElements(){
    div = document.createElement("div");
    p = document.createElement("p");
    span = document.createElement("span");
    button = document.createElement("button");
    a = document.createElement("a");
}

function createDiv(link){
    createElements();
    $linksGenerate.appendChild(div);
    div.setAttribute("class", "generated-div");

    p.textContent = $linkInput.value;
    div.appendChild(p);

    div.appendChild(span);

    a.textContent = link.result.full_short_link;
    div.appendChild(a).setAttribute("href", link.result.full_short_link);

    div.appendChild(button).textContent = "Copy";
    $linkInput.value = ""; 
}

function error(){
    console.clear();
    data = null;
    link = null;
    $linkInput.classList.add("active");
    $errorLink.classList.add("active");
}

function send(){
    let data;
    let link;
    data = get("https://api.shrtco.de/v2/shorten?url=" + $linkInput.value);
    link = JSON.parse(data);
    if(link.error_code){
        error();
        return;
    }
    $linkInput.classList.remove("active")
    $errorLink.classList.remove("active");
    createDiv(link);    
}