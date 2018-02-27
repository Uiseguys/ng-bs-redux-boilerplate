export class VideoPlayerPage {
    constructor() {
        this.thumbnail = {
            0: {
                src: 'https://www.w3schools.com/howto/img_fjords.jpg',
                style: {
                    left: '-60px',
                    width: '600px',
                    height: '68px',
                    clip: 'rect(0, 120px, 68px, 0)'
                }
            },
            1: {
                style: {
                    left: '-180px',
                    clip: 'rect(0, 240px, 68px, 120px)'
                }
            },
            2: {
                style: {
                    left: '-300px',
                    clip: 'rect(0, 360px, 68px, 240px)'
                }
            },
            3: {
                style: {
                    left: '-420px',
                    clip: 'rect(0, 480px, 68px, 360px)'
                }
            },
            4: {
                style: {
                    left: '-540px',
                    clip: 'rect(0, 600px, 68px, 480px)'
                }
            }
        };
    }
    render() {
        return [
            h("div", null,
                h("h2", null, "Video Player"),
                h("div", null,
                    h("fcl-video-player", { poster: "http://images.telvi.de/images/originals/2017/50/1/319b47392316aa2c54d5fbab.jpg", thumbnail: this.thumbnail },
                        h("source", { src: "http://techslides.com/demos/sample-videos/small.mp4", type: 'video/mp4' })),
                    h("section", { class: "box top" },
                        h("div", { class: "ntitle" }, "Summary"),
                        h("marked-element", null,
                            h("p", null, "Element providing a wrapper around the Video.js HTML5 video library"),
                            h("h5", { id: "example" }, "Example"),
                            h("pre", null,
                                h("code", null,
                                    "<fcl-video-player controls preload=",
                                    h("span", { class: "hljs-string" }, "\"auto\""),
                                    " width=",
                                    h("span", { class: "hljs-string" }, "\"640\""),
                                    " height=",
                                    h("span", { class: "hljs-string" }, "\"264\""),
                                    " poster=",
                                    h("span", { class: "hljs-string" }, "\"oceans-clip.png\""),
                                    "> <source src=",
                                    h("span", { class: "hljs-string" }, "\"oceans-clip.mp4\""),
                                    " ",
                                    h("span", { class: "hljs-class" },
                                        h("span", { class: "hljs-keyword" }, "type"),
                                        "="),
                                    h("span", { class: "hljs-string" }, "'video/mp4'"),
                                    " /> <source src=",
                                    h("span", { class: "hljs-string" }, "\"oceans-clip.webm\""),
                                    " ",
                                    h("span", { class: "hljs-class" },
                                        h("span", { class: "hljs-keyword" }, "type"),
                                        "="),
                                    h("span", { class: "hljs-string" }, "'video/webm'"),
                                    " /> <source src=",
                                    h("span", { class: "hljs-string" }, "\"oceans-clip.ogv\""),
                                    " ",
                                    h("span", { class: "hljs-class" },
                                        h("span", { class: "hljs-keyword" }, "type"),
                                        "="),
                                    h("span", { class: "hljs-string" }, "'video/ogg'"),
                                    " /> </fcl-video-player>")))),
                    h("section", { class: "box attribute-box" },
                        h("div", null, "Attributes"),
                        h("div", { class: "details" },
                            h("div", { class: "details-name" },
                                h("p", null,
                                    h("code", null, "width"))),
                            h("div", { class: "details-info" },
                                h("p", null,
                                    h("code", null, "integer")),
                                h("marked-element", null,
                                    h("p", null,
                                        "The ",
                                        h("code", null, "width"),
                                        " attribute specifies the width of a video player, in pixels")))),
                        h("div", { class: "details" },
                            h("div", { class: "details-name" },
                                h("p", null,
                                    h("code", null, "height"))),
                            h("div", { class: "details-info" },
                                h("p", null,
                                    h("code", null, "integer")),
                                h("marked-element", null,
                                    h("p", null,
                                        "The ",
                                        h("code", null, "height"),
                                        " attribute specifies the height of a video player, in pixels")))),
                        h("div", { class: "details" },
                            h("div", { class: "details-name" },
                                h("p", null,
                                    h("code", null, "preload"))),
                            h("div", { class: "details-info" },
                                h("p", null,
                                    h("code", null, "string")),
                                h("marked-element", null,
                                    h("p", null,
                                        "The ",
                                        h("code", null, "preload"),
                                        " attribute specifies if/how the video should be loaded")))),
                        h("div", { class: "details" },
                            h("div", { class: "details-name" },
                                h("p", null,
                                    h("code", null, "poster"))),
                            h("div", { class: "details-info" },
                                h("p", null,
                                    h("code", null, "string")),
                                h("marked-element", null,
                                    h("p", null,
                                        "The ",
                                        h("code", null, "poster"),
                                        " attribute specifies an image shown while downloading"))))))),
        ];
    }
    static get is() { return "video-player-page"; }
}
