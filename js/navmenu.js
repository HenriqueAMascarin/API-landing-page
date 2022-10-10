(function(){
    let $hamburguer = document.querySelector(".hamburguer");
    let $navmenu = document.querySelector(".main-nav")
    let $ul = document.querySelector(".main-nav ul")
    let $headerdiv = document.querySelector(".header-div")

    $hamburguer.addEventListener("click", () =>{
        $navmenu.classList.toggle("active");
        $hamburguer.classList.toggle("active");
    });

    $ul.addEventListener("click", function(e){
        if(e.target.tagName === "A"){
            $navmenu.classList.remove("active");
            $hamburguer.classList.remove("active");
        }
    });
})()