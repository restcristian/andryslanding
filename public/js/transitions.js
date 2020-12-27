import Highway from '@dogstudio/highway';
import {
    TimelineMax,
    TweenMax
} from 'gsap';

class Fade extends Highway.Transition {
    in ({
        from,
        to,
        done
    }) {
        const tl = new TimelineMax();

        const nextViewToRender = to.getAttribute('data-router-view');

        if (nextViewToRender === "home") {
            TweenMax.to(document.body, {
                backgroundColor: '#beecfa',
                duration: .6
            })
            document.body.classList.remove('is-menu-white');
        }

        tl
            .to(from, {
                y: "-100%",
                duration: .4,
                onStart: function () {
                    document.body.classList.remove('is-menu-open')
                }
            })
            .from(to, {
                y: "100%",
                duration: .4,
                onComplete: function () {
                    from.remove();
                    done();
                }
            })
    }
    out({
        from,
        done
    }) {
        done();
    }
}

export default Fade;