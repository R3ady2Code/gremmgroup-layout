document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation();
    initRelizedProjects();
    initSelects();
    initPartnerSlider();
    initRequestModal();
});

const anotherProjectItems = document.querySelectorAll(".another-projects__item");
if (anotherProjectItems) {
    anotherProjectItems.forEach((item) => {
        let element = item.querySelector(".another-projects__cover");

        function showElement() {
            anime.remove(element);

            anime.set(element, {
                translateY: 0
            });
            anime({
                targets: element,
                translateX: ["-1000%", 0],
                opacity: [0, 1],
                easing: "easeOutQuad",
                duration: 700
            });
        }

        function hideElement() {
            anime.remove(element);
            anime({
                targets: element,
                translateY: [0, "100%"],
                opacity: [1, 0],
                easing: "easeInOutSine",
                duration: 500
            });
        }

        function moveCover(event) {
            const rect = item.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;

            element.style.left = `${mouseX - element.offsetWidth / 2}px`;
        }

        item.addEventListener("mouseenter", showElement);
        item.addEventListener("mouseleave", hideElement);
        item.addEventListener("mousemove", moveCover);
    });
}

const projectItems = document.querySelectorAll(".our-projects__grid .our-projects__item");
if (projectItems) {
    projectItems.forEach((item) => {
        let element = item.querySelector(".our-projects__hover-item path");

        function showElement() {
            anime.remove(element);

            anime.set(element, { opacity: 1 });
            anime({
                targets: element,
                strokeDashoffset: [-anime.setDashoffset(element), 0],
                easing: "easeInOutSine",
                duration: 700
            });
        }

        function hideElement() {
            anime.remove(element);
            anime({
                targets: element,
                strokeDashoffset: [0, anime.setDashoffset(element)],
                easing: "easeInOutSine",

                duration: 500
            });
        }

        item.addEventListener("mouseenter", showElement);
        item.addEventListener("mouseleave", hideElement);
    });
}

const animeteSVGFooter = document.querySelector(".footer__logo path");

if (animeteSVGFooter) {
    const options = {
        root: null,
        threshold: 0.5
    };

    function showElement() {
        anime.remove(animeteSVGFooter);

        anime.set(animeteSVGFooter, { opacity: 1 });
        anime({
            targets: animeteSVGFooter,
            strokeDashoffset: [anime.setDashoffset(animeteSVGFooter), 0],
            easing: "easeInOutSine",
            duration: 1500
        });
    }

    function hideElement() {
        anime.remove(animeteSVGFooter);
        anime({
            targets: animeteSVGFooter,
            easing: "easeInOutSine",
            strokeDashoffset: [0, anime.setDashoffset(animeteSVGFooter)],
            duration: 1700
        });
    }

    const observeCB = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                showElement();
            } else {
                hideElement();
            }
        });
    };

    const observer = new IntersectionObserver(observeCB, options);
    observer.observe(animeteSVGFooter);
}

const newProjectsSwiper = document.querySelector("#new-projects__slider");

if (newProjectsSwiper) {
    const swiper = new Swiper("#new-projects__slider", {
        direction: "vertical",
        loop: true,

        pagination: {
            el: ".new-projects__pagination",
            type: "fraction"
        }

        // autoplay: {
        //     delay: 5000
        // }
    });
}

const planningSwiper = document.querySelector("#planning-slider");
if (planningSwiper) {
    const slider = new Swiper("#planning-slider", {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 5,

        breakpoints: {
            700: { spaceBetween: 10 }
        },

        pagination: {
            el: ".planning-projects__pagination",
            type: "fraction"
        },

        navigation: {
            nextEl: ".planning-projects__button_right",
            prevEl: ".planning-projects__button_left"
        }

        // autoplay: {
        //     delay: 5000
        // }
    });
}

const formInputs = document.querySelectorAll(".form-input");
formInputs.forEach((formInput) => {
    formInput.addEventListener("focusin", () => {
        formInput.classList.add("form-input_focus");
    });

    formInput.addEventListener("focusout", () => {
        const value = formInput.querySelector("input").value;

        if (!value.trim()) {
            formInput.classList.remove("form-input_focus");
        }
    });

    const input = formInput.querySelector("input");
    console.log(input);

    formInput.onclick = () => input.focus();
});

const formText = document.querySelectorAll(".form-text");
formText.forEach((ft) => {
    ft.addEventListener("focusin", () => {
        ft.classList.add("form-text_focus");
    });

    ft.addEventListener("focusout", () => {
        const value = ft.querySelector("textarea").value;

        if (!value.trim()) {
            ft.classList.remove("form-text_focus");
        }
    });
});

function initMobileNavigation() {
    const button = document.querySelector(".mobile-nav__button");
    const navigation = document.querySelector(".mobile-nav");

    function open() {
        anime.remove(navigation);

        navigation.classList.add("mobile-nav_open");

        anime({
            targets: navigation,
            height: ["310px"],
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutQuad"
        });
        header.classList.add("header_open-nav");
    }

    function close() {
        anime.remove(navigation);

        button.classList.remove("mobile-nav__button_open");
        header.classList.remove("header_open-nav");

        anime({
            targets: navigation,
            height: 0,
            opacity: [1, 0],
            duration: 300,
            easing: "easeInOutQuad",
            complete: () => {
                navigation.classList.remove("mobile-nav_open");
                navigation.removeAttribute("style");
            }
        });
    }

    if (button) {
        button.addEventListener("click", () => {
            button.classList.toggle("mobile-nav__button_open");

            if (button.classList.contains("mobile-nav__button_open")) {
                open();
            } else {
                close();
            }
        });

        document.addEventListener("click", function (e) {
            if (isClickOutside(header, e.target)) {
                close();
                document.removeEventListener("click", this);
            }
        });
    }
}

function initRelizedProjects() {
    const relizedProject = document.querySelector(".realized-projects");
    if (relizedProject) {
        const items = relizedProject.querySelectorAll(".realized-projects__item");

        items.forEach((item) => {
            const footer = item.querySelector(".realized-projects__footer");
            item.addEventListener("click", () => item.classList.toggle("realized-projects__item_open"));

            footer.addEventListener("click", (e) => e.stopPropagation());
        });
    }
}

const header = document.querySelector("header");

function isClickOutside(targetElement, clickedElement) {
    return !targetElement.contains(clickedElement);
}

function initSelects() {
    const formSelects = document.querySelectorAll(".form-select");
    formSelects.forEach((select) => {
        const isAreaSelect = select.classList.contains("form-select_area");
        const options = select.querySelector(".form-select__options");
        const optionsValues = options.querySelectorAll("li");

        function documentClick(e) {
            if (isClickOutside(select, e.target)) {
                close();
            }
        }

        function setValue(val) {
            const label = select.querySelector("label");
            label.innerText = val;
        }

        function open() {
            select.classList.add("form-select_open");
            anime.remove(options);

            anime({
                targets: options,
                height: ["53px", isAreaSelect ? "280px" : "392.64px"],
                easing: "easeInOutSine",
                duration: 100
            });

            document.addEventListener("click", documentClick);
        }

        function close() {
            anime.remove(options);

            anime({
                targets: options,
                height: [isAreaSelect ? "280px" : "392.64px", "53px"],
                easing: "easeInOutSine",
                duration: 100,
                complete: () => select.classList.remove("form-select_open")
            });

            document.removeEventListener("click", documentClick);
        }

        optionsValues.forEach((option) => {
            option.onclick = (e) => {
                e.stopPropagation();
                setValue(option.innerText);
                close();
            };
        });

        select.onclick = open;
    });
}

function initPartnerSlider() {
    const swiper = new Swiper(".our-partners__swiper", {
        slidesPerView: "auto",
        spaceBetween: 5,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 2000,
        effect: "slide",
        breakpoints: {
            720: {
                centeredSlides: true,
                spaceBetween: 10
            }
        }
    });
}

function initRequestModal() {
    const button = document.querySelector(".rent-cover .main-button");
    const modal = document.querySelector(".request-modal__wrapper");
    const closeButton = modal.querySelector(".request-modal__close");

    button.onclick = () => modal.classList.add("request-modal__wrapper_open");
    closeButton.onclick = () => modal.classList.remove("request-modal__wrapper_open");
}
