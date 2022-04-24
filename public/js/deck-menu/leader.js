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

        info.forEach(info => info.style.display = "none");
        info[correctSlideIndex].style.display = "";

        Leader.switch(parseInt(currentSlideIndex + 1));
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

Leader.switch = async (leader_id) => {
    let response = await API.response(Player.leader.set, leader_id);
    if(!response) { return false; }

    Leader.render(leader_id);
};