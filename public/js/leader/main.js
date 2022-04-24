Leader.draw = {
	slide: (leader, leader_id, slide_box) => {
		let leader_div = lib.element.create("div", { 
            'data-js': "leader-carousel-slide",
            class: "box a2 container center",
            style: leader.id != leader_id && "display:none;"
        });

        leader_div.append(lib.element.create("img", {
            class: "max-height-80 image-prop center opacity-08 noselect",
            src: leader.image_white
        }));

        slide_box.append(leader_div);
	},
	info: (leader, leader_id, info_box) => {
		let info_div = lib.element.create("div", { 
	        'data-js': "leader-carousel-info",
	        class: "box a2 container center",
	        style: leader.id != leader_id && "display:none;"
	    });

	    info_div.append(lib.element.create("div", {
			class: "box b1 lucida-grande bold center margin-top-5",
			style: "color:#f0f0f0"
		}, leader.name));

	    info_div.append(lib.element.create("div", {
			class: "box b1 lucida-grande em08 bold center padding-5",
			style: "color:#f0f0f0"
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
    	console.log(leaders);
    	// Leader.draw.slide(leaders[i], leader_id, slide_box);
    	// Leader.draw.info(leaders[i], leader_id, info_box);
    };

	Leader.carousel(leader_carousel, leader_id);
};