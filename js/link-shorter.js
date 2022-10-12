let $linkInput = document.querySelector(".link-class");
let $btn = document.querySelector(".button-send");
let $linksGenerate = document.querySelector(".links-generate");
let $errorLink = document.querySelector(".error-link")

$btn.addEventListener("click", send);

function get(url){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function createElements(){
    div = document.createElement("div");
    p = document.createElement("p");
    span = document.createElement("span");
    button = document.createElement("button");
    a = document.createElement("a");
    return ;
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

function send(){
    try{
        if(new URL($linkInput.value)){
            $linkInput.classList.remove("active")
            $errorLink.classList.remove("active");
            var data = get("https://api.shrtco.de/v2/shorten?url=" + $linkInput.value);
            var link = JSON.parse(data);
            createDiv(link);
        }
    }catch(error){
        $linkInput.classList.add("active")
        $errorLink.classList.add("active");
    }
    
    
}