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