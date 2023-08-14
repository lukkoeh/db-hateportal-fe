export interface ICookieBannerSelectors {
    cookieBanner: string;
    btnCloseCookieBanner: string;
    btnShowCookieBanner: string;
    btnAcceptCookies: string;
    btnDeclineCookies: string;
    btnChooseCookies: string;
    cookieModal: string;
    btnSaveCookieChoices: string;
}

export class CookieBanner {
    public consent: boolean;
    private cookieBanner: HTMLElement;
    private btnShowCookieBanner: HTMLElement;
    private btnCloseCookieBanner: HTMLElement;
    private acceptCookiesButton: HTMLElement;
    private declineCookiesButton: HTMLElement;
    private chooseCookiesButton: HTMLElement;
    private cookieModal: HTMLElement;
    private saveCookieChoicesButton: HTMLElement;

    constructor(selectors: ICookieBannerSelectors) {
        this.consent = false;
        this.cookieBanner = document.getElementById(selectors.cookieBanner) as HTMLElement;
        this.btnCloseCookieBanner = document.getElementById(selectors.btnCloseCookieBanner) as HTMLElement;
        this.btnShowCookieBanner = document.getElementById(selectors.btnShowCookieBanner) as HTMLElement;
        this.acceptCookiesButton = document.getElementById(selectors.btnAcceptCookies) as HTMLElement;
        this.declineCookiesButton = document.getElementById(selectors.btnDeclineCookies) as HTMLElement;
        this.chooseCookiesButton = document.getElementById(selectors.btnChooseCookies) as HTMLElement;
        this.cookieModal = document.getElementById(selectors.cookieModal) as HTMLElement;
        this.saveCookieChoicesButton = document.getElementById(selectors.btnSaveCookieChoices) as HTMLElement;
        this.init();

    }

    private init(): void {
        const cookiePreferences = this.getCookie("cookiePreferences");
        if (!cookiePreferences) {
            this.showBanner();
        }
        this.btnCloseCookieBanner.addEventListener("click", () => this.closeCookieBanner());
        this.btnShowCookieBanner.addEventListener("click", () => this.showBanner());
        this.acceptCookiesButton.addEventListener("click", () => this.acceptAllCookies());
        this.declineCookiesButton.addEventListener("click", () => this.declineAllCookies());
        this.chooseCookiesButton.addEventListener("click", () => this.showCookieChoices());
        this.saveCookieChoicesButton.addEventListener("click", () => this.saveCookieChoices());
    }

    private closeCookieBanner(): void {
        this.hideBanner();
        this.declineAllCookies();
    }

    private acceptAllCookies(): void {
        this.setCookie("cookiePreferences", JSON.stringify({accepted: true, analytics: true}), 365);
        this.hideBanner();
        this.consent = true;
    }

    private declineAllCookies(): void {
        this.setCookie("cookiePreferences", JSON.stringify({accepted: false, analytics: false}), 365);
        this.hideBanner();
        this.consent = true;
    }


    private saveCookieChoices(): void {
        const analytics = (<HTMLInputElement>document.getElementById("analyticsCookie")).checked;

        this.setCookie("cookiePreferences", JSON.stringify({accepted: true, analytics}), 365);

        this.hideCookieChoices();
        this.consent = true;

    }

    private getCookie(name: string): object | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(';').shift();
            return cookieValue !== undefined ? JSON.parse(cookieValue) : null;
        }
        return null;
    }

    private setCookie(name: string, value: string, days: number): void {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    private showBanner(): void {
        this.cookieBanner.classList.remove("animate-fadeOutToBottom");
        this.cookieBanner.classList.add("animate-fadeInFromBottom");
        this.cookieBanner.classList.remove("hidden");
    }

    private hideBanner(): void {
        const handleAnimationEnd = () => {
            this.cookieBanner.classList.add("hidden");
            this.cookieBanner.removeEventListener("animationend", handleAnimationEnd);
        };
        this.cookieBanner.addEventListener("animationend", handleAnimationEnd);
        this.cookieBanner.classList.replace("animate-fadeInFromBottom", "animate-fadeOutToBottom");
    }

    private showCookieChoices(): void {
        this.cookieBanner.classList.add("hidden");
        this.cookieModal.classList.replace("hidden", "block");
    }

    private hideCookieChoices(): void {
        const handleAnimationEnd = () => {
            this.cookieModal.classList.add("hidden");
            this.cookieModal.classList.remove("animate-fadeOutToBottom");
            this.cookieModal.removeEventListener("animationend", handleAnimationEnd);
        };
        this.cookieModal.addEventListener("animationend", handleAnimationEnd);
        this.cookieModal.classList.add("animate-fadeOutToBottom");
    }
}