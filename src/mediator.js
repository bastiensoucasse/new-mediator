const HEADER_HEIGHT = 64;
const GLOBAL_SPACING = 64;
const CARD_WIDTH = 190;
const CARD_HEIGHT = CARD_WIDTH * 9 / 16;
const CARD_MARGIN = 16;
const ACTIVE_CARD_MULTIPLIER = 1.5;
const INITIAL_ACTIVE_CARD_POSITION = 0;

var userScroll = true;

function getCardsWrap() {
    return document.querySelector(".cards");
}

function getCards() {
    return document.querySelectorAll(".card");
}

function getActiveCard() {
    return document.querySelector(".card.active");
}

function getCardById(id) {
    return document.querySelector("#card-" + id);
}

function getCardByPosition(position) {
    return getCards()[position];
}

function getCardId(card) {
    return card.id.substr(5);
}

function getCardPosition(card) {
    for (var position = 0; position < getCards().length; position++)
        if (getCardId(getCardByPosition(position)) == getCardId(card))
            return position;

    return -1;
}

function setActiveCard(card) {
    userScroll = false;

    if (getActiveCard() != null) {
        document.querySelector("#background-" + getCardId(getActiveCard())).style.display = "none";
        getActiveCard().classList.remove("active");
    }

    card.classList.add("active");
    card.focus();
    getCardsWrap().scroll(getCardPosition(card) * (CARD_WIDTH + CARD_MARGIN), 0);
    document.querySelector("#background-" + getCardId(card)).style.display = "block";

    console.log("New active : " + getCardPosition(getActiveCard()));
}

function decreaseActiveCard() {
    var position = getCardPosition(getActiveCard()) - 1;
    if (position < 0)
        position = 0;

    if (position != getCardPosition(getActiveCard()))
        setActiveCard(getCardByPosition(position));
}

function increaseActiveCard() {
    var position = getCardPosition(getActiveCard()) + 1;
    if (position > getCards().length - 1)
        position = getCards().length - 1;

    if (position != getCardPosition(getActiveCard()))
        setActiveCard(getCardByPosition(position));
}

// TODO
function getPresentationDataById(id) {
    return null;
}

function init() {
    var body = document.querySelector("body");
    var main = document.querySelector("main");
    var cards = getCards();

    var backgrounds = document.createElement("div");
    backgrounds.classList.add("backgrounds");
    body.append(backgrounds);

    cards.forEach((card, position) => {
        var background = document.createElement("div");
        background.id = "background-" + getCardId(card);
        background.classList.add("background");
        if (position != INITIAL_ACTIVE_CARD_POSITION)
            background.style.display = "none";
        backgrounds.append(background);

        var img = document.createElement("img");
        img.classList.add("lazyload");
        img.setAttribute("data-src", "https://mediator.profuder.com/images/backdrops/originals/" + getCardId(card) + ".webp");
        img.setAttribute("width", "1920");
        img.setAttribute("height", "1080");
        img.setAttribute("loading", "lazy");
        img.setAttribute("alt", "");
        background.append(img);

        var data = getPresentationDataById(card.id.substr(5));
        if (data != null) {
            var presentation = document.createElement("div");
            presentation.classList.add("presentation");
            presentation.style.display = "none";
            main.append(presentation);

            var title = document.createElement("h1");
            title.innerText = data.title;
            presentation.append(title);

            var info = document.createElement("h2");
            info.innerText = data.info;
            presentation.append(info);

            var description = document.createElement("p");
            description.innerText = data.description;
            presentation.append(description);
        }
    });

    setActiveCard(getCardByPosition(INITIAL_ACTIVE_CARD_POSITION));
}

function handler() {
    document.addEventListener("keydown", ev => {
        switch (ev.code) {
            case "ArrowLeft":
                ev.preventDefault();
                ev.stopPropagation();
                decreaseActiveCard();
                break;
            case "ArrowRight":
                ev.preventDefault();
                ev.stopPropagation();
                increaseActiveCard();
                break;
            default:
                break;
        }
    });

    var scrolling;
    getCardsWrap().addEventListener("scroll", () => {
        window.clearTimeout(scrolling);
        scrolling = setTimeout(() => {
            if (!userScroll) {
                userScroll = true;
            } else {
                var position = getCardsWrap().scrollLeft / (CARD_WIDTH + CARD_MARGIN);

                if (position != getCardPosition(getActiveCard()))
                    setActiveCard(getCardByPosition(Math.round(position)));
            }
        }, 100);
    });

    getCards().forEach((card) => {
        card.addEventListener("click", () => {
            if (card != getActiveCard())
                setActiveCard(card);
        });

        card.addEventListener("focus", () => {
            if (card != getActiveCard())
                setActiveCard(card);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    handler();
});
