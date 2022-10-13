let $linkInput = document.querySelector(".link-class");
let $btn = document.querySelector(".button-send");
let $linksGenerate = document.querySelector(".links-generate");
let $errorLink = document.querySelector(".error-link");
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
}
$linksGenerate.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON" && e.target.parentNode.classList.contains("generated-div")){
        let father = e.target.parentNode;
        navigator.clipboard.writeText(father.child(document.querySelector(".generated-div a")).textContent);
        div.appendChild(button).textContent = "Copied!";
        console.log("copiou");
    }
})
    


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
            let data = get("https://api.shrtco.de/v2/shorten?url=" + $linkInput.value);
            let link = JSON.parse(data);
            createDiv(link);
        }
    }catch(error){
        $linkInput.classList.add("active")
        $errorLink.classList.add("active");
    }
}