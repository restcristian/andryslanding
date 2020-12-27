import Highway from '@dogstudio/highway';
import Fade from './transitions';
import {
    WorkRenderer
} from './renderers'

const H = new Highway.Core({
    renderers: {
        work: WorkRenderer
    },
    transitions: {
        default: Fade
    }
});

// Menu toggle 

const menuBtn = document.getElementsByClassName('header__btn-toggle')[0];

menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('is-menu-open');
})