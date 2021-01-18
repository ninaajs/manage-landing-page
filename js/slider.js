
export default class Slider {
    constructor({
        sliderIdSelector, 
        trackIdSelector,
        prevIdButtonSelector,
        nextIdButtonSelector
    } = {}){
        this.slider = document.getElementById(`${sliderIdSelector || 'slider'}`);
        this.track = document.getElementById(`${trackIdSelector || 'trackSlider'}`);
        this.slides = document.querySelectorAll(`${trackIdSelector || '#trackSlider li'}`);
        this.prevButton = document.getElementById(`${prevIdButtonSelector || 'prevButtonSlider'}`);
        this.nextButton = document.getElementById(`${nextIdButtonSelector || 'nextButtonSlider'}`);
        
        this.currentPosition = 0;
        this.sizeSlide = this.slides.length;
        this.widthSlide = this.slides[0].offsetWidth + parseInt(getComputedStyle(this.slides[0]).marginRight);
        this.addListeners();
        this.getPagination();
    }
    getPrevSlider(){
        this.currentPosition = this.currentPosition === 0 ? 0 : this.currentPosition - 1;
        this.disabledElement()
        this.moveSlide();
    }
    getNextSlider(){
        this.currentPosition = this.currentPosition === this.sizeSlide - 1 ?  this.sizeSlide - 1 : this.currentPosition + 1;

        this.disabledElement();
        this.moveSlide();
    }
    moveSlide(){
        this.track.style.transform = `translateX(-${this.widthSlide * this.currentPosition}px)`;
        Array.from(this.containerPagination.children).forEach((page) => page.classList.remove('slider__page--active'));
        
        this.containerPagination.children[this.currentPosition].classList.add('slider__page--active');
    }
   
    disabledElement(){
        this.prevButton.disabled = this.currentPosition === 0;
        this.nextButton.disabled = this.currentPosition === this.sizeSlide - 1;
    }
    addListeners(){
        this.prevButton.addEventListener('click', this.getPrevSlider.bind(this));
        this.nextButton.addEventListener('click', this.getNextSlider.bind(this));
        this.disabledElement();
    }
    getPagination(){
        const fragment = document.createDocumentFragment();

        const containerPagination = document.createElement('ul');
        containerPagination.classList.add('slider__pagination');
        for (let i = 0; i < this.sizeSlide; i++) {
            const pageContainer = document.createElement('li');
            pageContainer.classList.add('slider__page');
            const pageButton = document.createElement('button');
            pageButton.classList.add('slider__btn');
            pageButton.setAttribute('role', 'button');
            pageButton.addEventListener('click', ()=> {
                this.currentPosition = i;
                this.moveSlide();
            });
            pageContainer.appendChild(pageButton);
            
            fragment.appendChild(pageContainer);
            
        }
        containerPagination.appendChild(fragment);
        containerPagination.firstChild.classList.add('slider__page--active');
        this.slider.appendChild(containerPagination);
        this.containerPagination = containerPagination;
    }
}
