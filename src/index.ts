import { DbLoveService } from "./services/dbLoveService";
import {CookieBanner, ICookieBannerSelectors} from "./CookieBanner";

const dbLoveService = new DbLoveService();

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

    updateHateCount(await dbLoveService.getTotalDbLovers());
    setInterval(async () => {
        updateHateCount(await dbLoveService.getTotalDbLovers());
    }, 2000);
});

function initializeHateButton(): void {
    const btnIHateDB: HTMLButtonElement | null = document.querySelector(".btn-i-love-db");

    if (btnIHateDB) {
        btnIHateDB.addEventListener("click", async () => {
            dbLoveService.increase();
            const newHateCount = await dbLoveService.getTotalDbLovers();
            updateHateCount(newHateCount);
        });
    }
}

function updateHateCount(n: number): void {
    const dbLoveCount: HTMLSpanElement | null = document.getElementById("dbLoveCount");
    if (dbLoveCount) {
        dbLoveCount.innerText = String(n);
    }
}
