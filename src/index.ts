import { HateService } from "./services/hate.service";

const hateService = new HateService();

window.addEventListener("DOMContentLoaded", async () => {
    initializePrivacyButton();
    initializeHateButton();
    updateHateCount(await hateService.getTotalHaters());
    setInterval(async () => {
        updateHateCount(await hateService.getTotalHaters());
    }, 2000);
});

function initializePrivacyButton(): void {
    const btnPrivacy: HTMLButtonElement | null = document.querySelector(".btn-privacy");

    if (btnPrivacy) {
        btnPrivacy.addEventListener("click", () => {
            const banner: HTMLDivElement | null = document.querySelector(".privacy-banner");
            if (banner) {
                banner.classList.add("hidden");
                const btnEntry: HTMLButtonElement | null = document.querySelector(".btn-i-hate-db");
                if (btnEntry) {
                    btnEntry.disabled = false;
                }
            }
        });
    }
}

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
