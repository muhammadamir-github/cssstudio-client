const global_configuration = {
    gtag_id: ""
};

const global_requiredFiles = {
    icon: [
        { type: "icon", src: "icon2.png", isURL: false, isRaw: false, }
    ],
    css: [
        { type: "css", src: "misc/Body.css", isURL: false, isRaw: false, },
        { type: "css", src: "misc/Loader.css", isURL: false, isRaw: false, },
        { type: "css", src: "misc/Notification.css", isURL: false, isRaw: false, },
        { type: "css", src: "thirdparty/fontawesome.all.css", isURL: false, isRaw: false, }
    ],
    js: [
        { type: "js", src: "thirdparty/jquery.min.js", isURL: false, isRaw: false, },
        { type: "js", src: "thirdparty/moment.min.js", isURL: false, isRaw: false, },
        { type: "js", src: "https://www.googletagmanager.com/gtag/js?id="+global_configuration.gtag_id, isURL: true, isRaw: false, },
        { type: "js", src: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '"+global_configuration.gtag_id+"');", isURL: false, isRaw: true, }
    ]
};

export default {
    window: {
        body: null,
        head: null
    },
    mouse: {
        x: 0,
        y: 0,
    },
    sideBar: null,
    bootLoader: null,
    pageHandler: null,
    paypalHandler: null,
    windowHandler: null,
    notificationHandler: null,
    elements: null,
    components: null,
    randomizer: null,
    colorPicker: null,
    tooltip: null,
    imageManager: null,
    draggableFactory: null,
    resizeableFactory: null,
    api: {
        hostname: "http://localhost",
        port: "8000"
    },
    files: [
        {
            pageName: "studio",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Style.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/Studio.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/PreviewSite.css", isURL: false, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "thirdparty/beautify-css.js", isURL: false, isRaw: false, },
                { type: "js", src: "pagehandlers/studio/functions/*", isURL: false, isRaw: false, ignore: [], },
                { type: "js", src: "pagehandlers/Studio.js", isURL: false, isRaw: false, },
            ],
        },
    ],
};
