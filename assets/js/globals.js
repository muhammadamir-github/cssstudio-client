const global_configuration = {
    gtag_id: "UA-139069615-1",
    google_ad_client: "ca-pub-4336282269367311",
};

const global_requiredFiles = {
    icon: [
        { type: "icon", src: "icon2.png", isURL: false, isRaw: false, }
    ],
    css: [
        { type: "css", src: "misc/Loader.css", isURL: false, isRaw: false, },
        { type: "css", src: "misc/Notice.css", isURL: false, isRaw: false, },
        { type: "css", src: "misc/Notification.css", isURL: false, isRaw: false, },
        { type: "css", src: "MediaQueries.css", isURL: false, isRaw: false, },
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
    sideBar: null,
    bootLoader: null,
    pageHandler: null,
    paypalHandler: null,
    notificationHandler: null,
    api: {
        hostname: "http://localhost",
        port: "8000"
    },
    files: [
        {
            pageName: "profile",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Style.css", isURL: false, isRaw: false, },
                { type: "css", src: ".dactbtn{ width: 200px; height: 50px; position: relative; left: 25px; top: 25px; border: none; outline: none; background: #1a1a1a; color: white; transition: opacity 0.4s ease-in-out; cursor: pointer; } .dactbtn:hover{ opacity: 0.5; }.dwar{ display: block; position: relative; margin-left: 25px; left: 0px; text-align: left; width: 90%; font-size: 15px; } .pay{ margin-top: 100px; width: 100%; left: 50%; transform: translate(-50%); position: relative; display: inline-block; height: 100px; text-align: center;", isURL: false, isRaw: true, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Profile.js", isURL: false, isRaw: false, },
                { type: "js", src: "misc/Paypal.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "notifications",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Style.css", isURL: false, isRaw: false, },
                { type: "css", src: ".ntfs{ position: relative; left: 50%; transform: translate(-50%); border: 1px solid #f1f1f1; width: 70%; height: 750px; outline: none; margin-top: 50px; display: inline-block; overflow-x: hidden; overflow-y: scroll; padding-bottom: 30px; transition: opacity 0.3s ease-in-out; }", isURL: false, isRaw: true, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Notifications.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "storage",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Style.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/Fonts.css", isURL: false, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Storage.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "support",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Style.css", isURL: false, isRaw: false, },
                { type: "css", src: ".tkts{position:relative;left:50%;transform:translate(-50%);border:1px solid #f1f1f1;width:70%;height:300px;outline:0;margin-top:50px;display:inline-block;overflow-x:hidden;overflow-y:scroll;padding-bottom:30px;transition:opacity .3s ease-in-out}.ntkt{position:relative;left:50%;transform:translate(-50%);border:1px solid #f1f1f1;width:70%;max-height:300px;outline:0;margin-top:25px;display:inline-block;overflow:hidden;min-height:fit-content;padding-bottom:50px;transition:opacity .3s ease-in-out}.ntkt button{right:10px;top:20px;position:absolute;width:150px;height:40px;outline:0;border:none;background:#1a1a1a;color:#fff;border-radius:5px;font-family:sans-serif;font-size:11px;cursor:pointer}.ntkt button i{margin-left:5px;font-size:11px}.tkts table tbody tr:hover{opacity:.5;cursor:pointer}", isURL: false, isRaw: true, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Support.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "billing",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Style.css", isURL: false, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Billing.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "studio",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Style.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/Billy.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/PreviewSite.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/Fonts.css", isURL: false, isRaw: false, },
                { type: "js", src: "https://www.youtube.com/iframe_api", isURL: true, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "misc/Billy.js", isURL: false, isRaw: false, },
                { type: "js", src: "misc/Draggable.js", isURL: false, isRaw: false, },
                { type: "js", src: "misc/PublicEventHandler.js", isURL: false, isRaw: false, },
                { type: "js", src: "thirdparty/resumable.js", isURL: false, isRaw: false, },
                { type: "js", src: "pagehandlers/studio/*", isURL: false, isRaw: false, ignore: ["pagehandlers/studio/Animator.js"], },
                { type: "js", src: "pagehandlers/studio/functions/*", isURL: false, isRaw: false, ignore: [], },
                { type: "js", src: "pagehandlers/Studio.js", isURL: false, isRaw: false, },
            ],
        },
        {
            pageName: "login",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/Login.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/TopNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/BottomNavbar.css", isURL: false, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Login.js", isURL: false, isRaw: false, },
                { type: "js", src: "pagehandlers/Static.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "termsandconditions",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "misc/TopNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/BottomNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/TermsAndConditions.css", isURL: false, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Static.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "home",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "misc/TopNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/BottomNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/Home.css", isURL: false, isRaw: false, },
                { type: "css", src: ".pageheading{color: black; font-family: ProximaNovaBold; }", isURL: false, isRaw: true, },
                { type: "js", src: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", isURL: true, isRaw: false, },
                { type: "js", src: '(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "'+global_configuration.google_ad_client+'", enable_page_level_ads: true});', isURL: false, isRaw: true, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Static.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "features",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "misc/TopNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/BottomNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/Features.css", isURL: false, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Static.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "blog",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "misc/TopNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "misc/BottomNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/Blog.css", isURL: false, isRaw: false, },
                ...global_requiredFiles.js,
                { type: "js", src: "pagehandlers/Static.js", isURL: false, isRaw: false, },
                { type: "js", src: "pagehandlers/Blog.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "adminpanel",
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "pages/AdminPanelLogin.css", isURL: false, isRaw: false, },
                { type: "js", src: "thirdparty/jquery.min.js", isURL: false, isRaw: false, },
                { type: "js", src: "thirdparty/moment.min.js", isURL: false, isRaw: false, },
                { type: "js", src: "pagehandlers/AdminPanelLogin.js", isURL: false, isRaw: false, }
            ],
        },
        {
            pageName: "home.html", // adminpanel/home.html
            paths: [
                ...global_requiredFiles.icon,
                ...global_requiredFiles.css,
                { type: "css", src: "misc/TopNavbar.css", isURL: false, isRaw: false, },
                { type: "css", src: "pages/AdminPanel.css", isURL: false, isRaw: false, },
                { type: "css", src: ".pageheading{ color: black; font-family: ProximaNovaBold; }", isURL: false, isRaw: true, },
                { type: "js", src: "thirdparty/jquery.min.js", isURL: false, isRaw: false, },
                { type: "js", src: "thirdparty/moment.min.js", isURL: false, isRaw: false, },
                { type: "js", src: "thirdparty/chart.bundle.js", isURL: false, isRaw: false, },
                { type: "js", src: "pagehandlers/adminpanel/*", isURL: false, isRaw: false, ignore: [], },
                { type: "js", src: "pagehandlers/AdminPanel.js", isURL: false, isRaw: false, }
            ],
        },
    ],
};
