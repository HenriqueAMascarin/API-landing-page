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
        navigator.clipboard.writeText(father.getElementsByTagName("a")[0].textContent);
        father.classList.add("active");
        father.getElementsByTagName("button")[0].textContent = "Copied!";
        setTimeout(function(){
            father.classList.remove("active");
            father.getElementsByTagName("button")[0].textContent = "Copy";
        },2000);
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
    let data;
    let link;
    try{
        data = get("https://api.shrtco.de/v2/shorten?url=" + $linkInput.value);
        link = JSON.parse(data);
        if(new URL($linkInput.value) && !!link.error_code === false){
            $linkInput.classList.remove("active")
            $errorLink.classList.remove("active");
            createDiv(link);
        }
    }catch(error){
        $linkInput.classList.add("active")
        $errorLink.classList.add("active");
        console.clear();
        data = null;
        link = null;
    }
}