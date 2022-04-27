Empire.carousel = async (carousel_name, index) => {
	let slides = document.querySelectorAll("[data-js='"+carousel_name+"-slide']");
    let prevButton = document.querySelector("[data-js='"+carousel_name+"-prev']");
    let nextButton = document.querySelector("[data-js='"+carousel_name+"-next']");
    let info = document.querySelectorAll("[data-js='"+carousel_name+"-info']");

    let lastSlideIndex = slides.length - 1;
    let currentSlideIndex = parseInt(index) || 0;

    let manipulateSlidesClasses = async correctSlideIndex => {
        slides.forEach(slide => slide.style.display = "none");
        slides[correctSlideIndex].style.display = "";

        info.forEach(info => info.style.display = "none");
        info[correctSlideIndex].style.display = "";

        Empire.switch(parseInt(currentSlideIndex + 1));
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

Empire.draw = {
    slide: (empire, empire_id, slide_box) => {
        let empire_div = lib.element.create("div", { 
            'data-js': "empire-carousel-slide",
            class: "box a2 container center",
            style: empire.id != empire_id && "display:none;"
        });

        empire_div.append(lib.element.create("img", {
            class: "max-height-80 image-prop center opacity-08 noselect",
            src: empire.image_white
        }));

        slide_box.append(empire_div);
    },
    info: (empire, empire_id, info_box) => {
        let info_div = lib.element.create("div", { 
            'data-js': "empire-carousel-info",
            class: "box a2 container center",
            style: empire.id != empire_id && "display:none;"
        });

        info_div.append(lib.element.create("div", {
            class: "box b1 lucida-grande bold center margin-top-5",
            style: "color:#f0f0f0"
        }, empire.name));

        info_div.append(lib.element.create("div", {
            class: "box b1 lucida-grande em08 bold center padding-5",
            style: "color:#f0f0f0"
        }, empire.description));

        info_box.append(info_div);
    }
};

Empire.render = (empires, empire_id, empire_carousel) => {
    let slide_box = document.getElementById("empire-carousel");
    slide_box.innerHTML = "";

    let info_box = document.getElementById("empire-info");
    info_box.innerHTML = "";

    for(let i in empires) {
        Empire.draw.slide(empires[i], empire_id, slide_box);
        Empire.draw.info(empires[i], empire_id, info_box);
    };

    Empire.carousel(empire_carousel, empire_id);
};

Empire.switch = async (empire_id) => {
    let response = await API.response(Player.empire.set, empire_id);
    if(!response) { return false; }

    let player_deck = await API.response(Player.deck.get);
    if(!player_deck) { return false; }

    let leaders = await API.response(Leader.findByEmpireId, player_deck.empire_id);
    if(!leaders) { return false; }

    let player_leader = await API.response(Player.leader.get);
    if(!player_leader) { return false; }

    for(let i in leaders) {
        if(leaders[i].id == player_leader.leader_id) {
            player_leader.position = i;
        }
    }

    Card.render(empire_id);
    Leader.render(leaders, player_leader.position, "leader-carousel");
};