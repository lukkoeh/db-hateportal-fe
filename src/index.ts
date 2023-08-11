import {HateService} from "./services/hate.service";
const hateService = new HateService();
hateService.getTotalHaters().then(response => {
    console.log(response);
})
window.addEventListener("DOMContentLoaded", ()=>{
    let btnprivacy : HTMLButtonElement | null = document.querySelector(".btn-privacy");
    if (btnprivacy) {
        btnprivacy.addEventListener("click", ()=> {
            let banner : HTMLDivElement | null = document.querySelector(".privacy-banner");
            if (banner) {
                banner.classList.add("hidden");
                let btnentry : HTMLButtonElement | null = document.querySelector(".btn-addentry");
                if (btnentry) {
                    btnentry.disabled = false;
                }
            }
        });
    }
});