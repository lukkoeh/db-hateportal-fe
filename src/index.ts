import { HateService } from "./services/hate.service";
import {CookieBanner, ICookieBannerSelectors} from "./CookieBanner";

const hateService = new HateService();

window.addEventListener("DOMContentLoaded", async () => {

    const selectors: ICookieBannerSelectors = {
        cookieBanner: "cookieBanner",
        btnCloseCookieBanner: "closeCookieBanner",
        btnShowCookieBanner: "showBannerAgain",
        btnAcceptCookies: "acceptCookies",
        btnDeclineCookies: "declineCookies",
        btnChooseCookies: "chooseCookies",
        cookieModal: "cookieModal",
        btnSaveCookieChoices: "saveCookieChoicesButton"
    }

    const cBanner: CookieBanner = new CookieBanner(selectors);

    initializeHateButton();

    updateHateCount(await hateService.getTotalHaters());
    setInterval(async () => {
        updateHateCount(await hateService.getTotalHaters());
    }, 2000);
});

function initializeHateButton(): void {
    const btnIHateDB: HTMLButtonElement | null = document.querySelector(".btn-i-hate-db");

    if (btnIHateDB) {
        btnIHateDB.addEventListener("click", async () => {
            hateService.increase();
            const newHateCount = await hateService.getTotalHaters();
            updateHateCount(newHateCount);
        });
    }
}

function updateHateCount(n: number): void {
    const hateCount: HTMLSpanElement | null = document.getElementById("hateCount");
    if (hateCount) {
        hateCount.innerText = String(n);
    }
}
