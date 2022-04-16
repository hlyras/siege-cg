const Card = {};

Card.list = async () => {
	let response = await fetch("/card/list");
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.cards;
};

Card.draw = (deck, card, switchTo, fromDeck) => {
	let cardBox = lib.element.create("div", {
		class: "mobile-box b3 max-width-100 margin-top-10 radius-15 opacity-out-08 noselect",
		onclick: `${switchTo}('${card.id}', '${fromDeck}')`
	});

	// card container
	let imageContainer = lib.element.create("div", {
		style: `background-image: url(${card.image});`,
		class: "container bg min-height-100 radius-top-10"
	});

	// power
	let power = lib.element.create("div", {
		class: "mobile-box container width-25 height-25 margin-top-5 margin-left-5 border-st-2 radius-30 center",
		style: card.hero && "background-color: #000;color:#fff;" || !card.hero && "background-color: #fff;color:#000;"
	});

	power.append(lib.element.create("div", { class: "box bold em07 lucida-grande center" }, '15'));

	imageContainer.append(power);

	// info container
	let infoContainer = lib.element.create("div", {
		class: "mobile-box a1 ground center height-50 radius-bottom-10"
	});

	infoContainer.append(lib.element.create("div", {
		class: "lucida-grande em07 bold center"
	}, card.name));

	cardBox.append(imageContainer);
	cardBox.append(infoContainer);
	deck.append(cardBox);
};

// ability_id: 6
// deck: false
// id: 15
// image: "image/card/special/burn.png"
// name: "Fogaréu"
// power: false

// 
// deck: 1
// hero: true
// id: 19
// image: "image/card/rome/agripa.png"
// name: "Marco Vipsânio Agripa"
// power: 15
// range_id: 1


/*
<div class="mobile-box b3 max-width-125 margin-top-10 shadow-2-hover opacity-out-08">
	<div class="bg min-height-150 radius-top-15" style="background-image: url(image/card/weather/clear.png)">
		<div class="box"></div>
	</div>
	<div class="mobile-box a1 ground lucida-grande em08 bold center height-50 radius radius-bottom-15">Nome</div>
</div>
*/

// <div className={"mobile-box b3 max-width-125 radius-10 margin-top-10 shadow-2-hover opacity-out-08 cursor-3"} onClick={() => switchCardTo(card.id) } >
// 	<div className="bg min-height-150 radius-top-15" style={{ backgroundImage: "url('"+images[card.image].default+"')" }}>
// 		<div className="mobile-box b1 container">
// 			{card.power && <div className="mobile-box b1 container padding-2 min-width-30"><div className="mobile-box dot container ring" style={card.hero ? { backgroundColor:'#111', color: '#fff'} : { backgroundColor : '#fff', color: '#111' }}><div className="center noselect bold">{card.power}</div></div></div>}
// 			{card.range && <div className="mobile-box b1 container padding-2 margin-top-10"><div className="mobile-box dot container ring" style={card.hero ? { backgroundColor:'#111'} : { backgroundColor : '#fff' }}><div className="center noselect bold"><div className="size-20 bg" style={{backgroundImage: "url("+images[card.range_img].default+")"}} /></div></div></div>}
// 			{card.ability && <div className="mobile-box b1 container padding-2 margin-top-10"><div className="mobile-box dot container ring" style={card.hero ? { backgroundColor:'#111'} : { backgroundColor : '#fff' }}><div className="center noselect bold"><div className="size-20 bg" style={{backgroundImage: "url("+images[card.ability_img].default+")"}} /></div></div></div>}
// 		</div>
// 	</div>
// 	<div className="mobile-box a1 min-height-50 radius-bottom-30 container ground">
// 		<div className="mobile-box b1 em08 bold"><div className="center padding-3 noselect" style={{fontColor:'black'}}>{card.name}</div></div>
// 	</div>
// </div>

// Product.save = async (product) => {
// 	let response = await fetch("/product/save", {
// 		method: "POST",
// 		headers: {'Content-Type': 'application/json'},
// 	    body: JSON.stringify(product)
// 	});
// 	response = await response.json();

// 	if(API.verifyResponse(response)){ return false };
// 	alert(response.done);

// 	return response.product[0];
// };

// Product.findById = async (id) => {
// 	let response = await fetch("/product/id/" + id);
// 	response = await response.json();
	
// 	if(API.verifyResponse(response)){ return false };
	
// 	return response.product[0];
// };

/*

E-mailer

Collect E-mail from store;
Send Email and store on db
Email text personalized
User that register own the lead
E-mail can be send

*/