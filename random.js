window.onload = ()=> {

startCanvas();

const DynamicText = {
    element: document.createElement("div"),
    text: "",
    i: 0,
    buildtext: () => {
        setTimeout(()=>{
            DynamicText.element.innerHTML += DynamicText.text[DynamicText.i];
            DynamicText.i++;
            if(DynamicText.element.innerHTML.length < DynamicText.text.length){
                DynamicText.buildtext();
            }
        }, 175 * Math.random());
    },
}
DynamicText.element.style = "display: block; width: 720px; font-family:Arial; font-weight: bold; font-size: 22px;";
DynamicText.buildtext();
document.body.insertBefore(DynamicText.element, document.body.childNodes[1]);

}