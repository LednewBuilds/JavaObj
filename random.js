window.onload = ()=> {

startCanvas();

const DynamicText = {
    element: document.createElement("div"),
    text: "Confused was a really good friend to me, but all of a sudden he started to change. I call him like this because he was always confused with things going around and never knew what to say clearly without being shy. " +
    "Everything began a couple months ago, I didn't know what that was by that time since I thought it was something usual and my sense of what was real still held on my mind. The changing wasn't abrupt and it took a bit of time for me to realize that " + 
    "was something wrong with him. He was acting too adorable with words and that scared me up my spine but I couldn't say anything because I thought he would try to kill me for being rude. "+
    "A month ago I decided to ask him about what was going on, but he refused to tell me allegedly saying that he didn't know, but I knew that there was something wrong with our friendship, I could feel it. "+
    "From past that moment he started to change more and more until he finally tell me what was going on... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ..."+
    "He was a gamer.",
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