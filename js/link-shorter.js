let $linkInput = document.querySelector(".link-input");
let $btn = document.querySelector(".button-send");
let $linksgenerate = document.querySelector(".links-generate");
var div = document.createElement("div");
var p = document.createElement("p");
var span = document.createElement("span");
var button = document.createElement("button");
var a = document.createElement("a");

$btn.addEventListener("click", send);

function get(url){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function createDiv(link){
    $linksgenerate.appendChild(div);
    div.setAttribute("class", "generated-div");
    setTimeout(() => {
        p.textContent = $linkInput.value;
        div.appendChild(p);
        div.appendChild(span);
        a.textContent = link.result.full_short_link;
        div.appendChild(a).setAttribute("href", link.result.full_short_link);
        div.appendChild(button).textContent = "Copy";
    }, 300);
}

function send(){
    let data = get("https://api.shrtco.de/v2/shorten?url=" + $linkInput.value);
    let link = JSON.parse(data);
    createDiv(link);
}