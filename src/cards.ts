let app: HTMLElement | null, wrap: HTMLElement | null, backgrounds: HTMLElement;
let cards: Map<number, Card>;

class Card {
    static width: number = 190;
    static height: number = Card.width * 9 / 16;
    static margin: number = 16;
    static multiplier: number = 1.5;

    id: number;
    view: HTMLElement;
    background: HTMLElement;

    constructor(id: number, view: HTMLElement, background: HTMLElement) {
        this.id = id;
        this.view = view;
        this.background = background;
    }

    getIndex() {
        for (let index = 0; index < cards.size; index++) {
            let card = getByIndex(index);
            if (card != undefined && card == this)
                return index;
        }

        return -1;
    }

    setActive(active = true) {
        if (active) {
            this.view.classList.add("active");
            this.background.classList.add("active");

            this.view.focus({ preventScroll: true });

            if (wrap == null)
                return;

            let index = this.getIndex();
            if (index == -1)
                return;

            let position = index * (Card.width + Card.margin);
            wrap.scrollTo(position, 0);
        } else {
            this.view.classList.remove("active");
            this.background.classList.remove("active");
        }
    }
}

function initDOM() {
    app = document.querySelector("#app");
    if (app == null)
        throw new Error("Could not retrieve app DOM.");

    wrap = document.querySelector("#wrap");
    if (wrap == null)
        throw new Error("Could not retrieve wrap DOM.");

    backgrounds = document.createElement("div");
    backgrounds.id = "backgrounds";
    app.appendChild(backgrounds);
}

function initCards() {
    cards = new Map<number, Card>();

    let views = document.getElementsByClassName("card");
    for (let index = 0; index < views.length; index++) {
        let view = <HTMLElement>views[index];
        view.setAttribute("href", "javascript:void(0)");

        let id = Number(view.id.substr(5));

        let background = document.createElement("div");
        background.id = "background-" + id;
        background.classList.add("background");
        if (index == 0)
            background.classList.add("active");
        backgrounds.appendChild(background);

        let image = document.createElement("img");
        image.classList.add("lazyload");
        image.setAttribute("data-src", "https://mediator.profuder.com/images/backdrops/originals/" + id + ".webp");
        image.setAttribute("width", String(window.innerWidth));
        image.setAttribute("height", String(window.innerHeight));
        image.setAttribute("loading", "lazy");
        image.setAttribute("alt", "");
        background.append(image);

        let card = new Card(id, view, background);
        cards.set(index, card);
    }
}

function getByIndex(index: number) {
    return cards.get(index);
}

function getById(id: number) {
    for (let index = 0; index < cards.size; index++) {
        let card = getByIndex(index);
        if (card != undefined && card.id == id)
            return card;
    } return undefined;
}

function getActive() {
    for (let index = 0; index < cards.size; index++) {
        let card = getByIndex(index);
        if (card != undefined && card.view.classList.contains("active"))
            return card;
    } return undefined;
}

function initHandlers() {
    document.addEventListener("keydown", (event) => {
        let selectedIndex = -1, previousIndex = cards.keys().next().value;

        switch (event.code) {
            case "ArrowLeft":
                event.preventDefault();
                event.stopPropagation();

                cards.forEach((card, index) => {
                    if (card.view.classList.contains("active"))
                        selectedIndex = previousIndex;
                    previousIndex = index;
                });
                break;
            case "ArrowRight":
                event.preventDefault();
                event.stopPropagation();

                cards.forEach((_card, index) => {
                    let card = getByIndex(previousIndex)
                    if (card != undefined && card.view.classList.contains("active"))
                        selectedIndex = index;
                    previousIndex = index;
                });
                break;
            default:
                break;
        }

        if (selectedIndex != -1) {
            let active = getActive();
            if (active != undefined)
                active.setActive(false);

            let card = getByIndex(selectedIndex)
            if (card != undefined)
                card.setActive();
        }
    });

    cards.forEach((card, _index) => {
        card.view.addEventListener("click", () => {
            let active = getActive();
            if (active != undefined)
                active.setActive(false);
            card.setActive();
        });

        card.view.addEventListener("focus", () => {
            let active = getActive();
            if (active != undefined)
                active.setActive(false);
            card.setActive();
        });
    });

    if (wrap == null)
        return;

    let scrolling: number;
    wrap.addEventListener("scroll", () => {
        window.clearTimeout(scrolling);
        scrolling = window.setTimeout(() => {
            if (wrap == null)
                return;

            var position: number, card;

            position = Math.round(wrap.scrollLeft) / (Card.width + Card.margin);
            card = getByIndex(position);
            if (card != undefined) {
                let active = getActive();
                if (active != undefined)
                    active.setActive(false);
                card.setActive();
            }

            position = (Math.round(wrap.scrollLeft) - Card.width * Card.multiplier - Card.margin) / (Card.width + Card.margin) + 1;
            card = getByIndex(position);
            if (card != undefined) {
                let active = getActive();
                if (active != undefined)
                    active.setActive(false);
                card.setActive();
            }
        }, 300);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initDOM();
    initCards();
    initHandlers();

    let card = getByIndex(cards.keys().next().value);
    if (card != undefined)
        card.setActive();
});
