import videojs from 'video.js';
export class FclVideoPLayer {
    constructor() {
        this.poster = null;
        this.controls = true;
        this.autoPlay = false;
        this.toggle = false;
    }
    // When clicked invert the state of the toggle property
    toggleClick() {
        this.toggle = true;
        this.autoPlay = true;
        this.el.querySelector("img").style.display = 'none';
        this.el.querySelector("video").style.display = 'block';
    }
    render() {
        if (this.poster != null && this.toggle == false) {
            return (h("div", { class: "fcl-video-class" },
                h("fcl-image", { class: "video-img-block", onClick: () => this.toggleClick(), brokenUrl: "assets/img/broken-image.png", src: this.poster }),
                h("video", { class: "video-js vjs-default-skin" },
                    h("slot", null, " "))));
        }
        else {
            if (this.poster != null) {
                this.el.getElementsByTagName('video')[0].play();
            }
            return (h("div", { class: "fcl-video-class" },
                h("video", { class: "video-js vjs-default-skin" },
                    h("slot", null, " "))));
        }
    }
    componentDidLoad() {
        if (this.poster == null) {
            this.autoPlay = false;
            this.el.querySelector("video").style.display = 'block';
        }
        else {
            this.el.querySelector("video").style.display = 'block';
        }
        const options = {
            controls: true,
            autoplay: this.autoPlay,
            preload: 'metadata'
        };
        videojs(this.el.getElementsByTagName('video')[0], options);
    }
    componentWillUpdate() {
        if (this.poster == null) {
            this.autoPlay = false;
        }
        const options = {
            controls: true,
            autoplay: this.autoPlay,
            preload: 'metadata'
        };
        videojs(this.el.getElementsByTagName('video')[0], options);
    }
    static get is() { return "fcl-video-player"; }
    static get properties() { return { "controls": { "type": Boolean, "attr": "controls" }, "el": { "elementRef": true }, "poster": { "type": String, "attr": "poster" }, "toggle": { "state": true } }; }
    static get style() { return "/**style-placeholder:fcl-video-player:**/"; }
}
