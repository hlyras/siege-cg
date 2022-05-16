Leader.carousel = async (carousel_name, index) => {
	let slides = document.querySelectorAll("[data-js='"+carousel_name+"-slide']");
    let prevButton = document.querySelector("[data-js='"+carousel_name+"-prev']");
    let nextButton = document.querySelector("[data-js='"+carousel_name+"-next']");
    let info = document.querySelectorAll("[data-js='"+carousel_name+"-info']");

    let lastSlideIndex = slides.length - 1;
    let currentSlideIndex = parseInt(index) || 0;

    let manipulateSlidesClasses = async correctSlideIndex => {
        slides.forEach(slide => slide.style.display = "none");
        slides[correctSlideIndex].style.display = "";

        // info.forEach(info => info.style.display = "none");
        // info[correctSlideIndex].style.display = "";

        Leader.switch(parseInt(currentSlideIndex));
    };

    prevButton.addEventListener("click", () => {
        let correctSlideIndex = currentSlideIndex === 0
        ? currentSlideIndex = lastSlideIndex
        : --currentSlideIndex

        manipulateSlidesClasses(correctSlideIndex);
    });

    nextButton.addEventListener("click", () => {
        let correctSlideIndex = currentSlideIndex === lastSlideIndex
        ? currentSlideIndex = 0
        : ++currentSlideIndex;

        manipulateSlidesClasses(correctSlideIndex);
    });

    manipulateSlidesClasses(currentSlideIndex);
};

Leader.detail = (leader) => {
    let card_box = document.getElementById("detail-leader-card");
    card_box.innerHTML = "";

    let card = lib.element.create("div", {
        class: "mobile-box b1 max-width-250 margin-top-10 radius-15 cursor-2 noselect"
    });

    // card container
    let imageContainer = lib.element.create("div", {
        style: `background-image: url(${leader.image});`,
        class: "bg min-height-300 radius-10 padding-2 cursor-2"
    });

    // info container
    let infoContainer = lib.element.create("div", {
        class: "mobile-box a1 center height-50 cursor-2",
        style: "color:#f0f0f0;"
    });

    infoContainer.append(lib.element.create("div", {
        class: "lucida-grande padding-3 margin-top-10 bold center cursor-2"
    }, leader.name));

    infoContainer.append(lib.element.create("div", {
        class: "lucida-grande em09 padding-3 margin-bottom-30 bold center cursor-2"
    }, leader.description));

    card.append(imageContainer);
    card_box.append(card);
    card_box.append(infoContainer);
};

Leader.draw = {
    slide: (leader, leader_id, slide_box) => {
        let cardBox = lib.element.create("div", {
            'data-js': "leader-carousel-slide",
            class: "mobile-box b1 max-width-125 margin-top-10 radius-15 cursor-2 noselect",
            style: leader.id != leader_id && "display:none;"
        });

        cardBox.addEventListener('contextmenu', function(ev) {
            ev.preventDefault();

            Leader.detail(leader);
            lib.display("detail-leader", "");

            return false;
        }, false);

        // card container
        let imageContainer = lib.element.create("div", {
            style: `background-image: url(${leader.image});`,
            class: "bg min-height-125 radius-top-10 padding-2 cursor-2"
        });

        // info container
        let infoContainer = lib.element.create("div", {
            class: "mobile-box a1 ground center height-50 radius-bottom-10 cursor-2"
        });

        infoContainer.append(lib.element.create("div", {
            class: "lucida-grande em07 padding-3 bold center cursor-2"
        }, leader.name));

        cardBox.append(imageContainer);
        cardBox.append(infoContainer);
        slide_box.append(cardBox);
    },
    info: (leader, leader_id, info_box) => {
        let info_div = lib.element.create("div", { 
            'data-js': "leader-carousel-info",
            class: "mobile-box a1 center radius-bottom-10 cursor-2",
            style: leader.id != leader_id && "display:none;"
        });

        info_div.append(lib.element.create("div", {
            class: "box b1 lucida-grande em08 bold center padding-5",
            style: "color:#f0f0f0;"
        }, leader.description));

        info_box.append(info_div);
    }
};

Leader.render = (leaders, leader_id, leader_carousel) => {
    let slide_box = document.getElementById("leader-carousel");
    slide_box.innerHTML = "";

    let info_box = document.getElementById("leader-info");
    info_box.innerHTML = "";

    for(let i in leaders) {
        Leader.draw.slide(leaders[i], leader_id, slide_box);
        // Leader.draw.info(leaders[i], leader_id, info_box);
    };

    Leader.carousel(leader_carousel, leader_id);
};

Leader.switch = async (leader_position) => {
    let player_deck = await API.response(Player.deck.get);
    if(!player_deck) { return false; }

    let leaders = await API.response(Leader.findByEmpireId, player_deck.empire_id);
    if(!leaders) { return false; }

    let leader = leaders[leader_position];

    let response = await API.response(Player.leader.set, leader.id);
    if(!response) { return false; }
};