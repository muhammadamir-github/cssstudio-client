const global_host = "http://localhost:8000";

var draggingelementofid;
var WebFonts = '';
var plan = '';
var animations = [''];
var shuffledanimations = shuffleArray(animations);
var ea = [];
var token = '';
var elementtype = '';
var body = document.getElementsByTagName('body')[0];

var styler_pos1 = 0, styler_pos2 = 0, styler_pos3 = 0, styler_pos4 = 0;
var bgimageManager_pos1 = 0, bgimageManager_pos2 = 0, bgimageManager_pos3 = 0, bgimageManager_pos4 = 0;
var elementEditor_pos1 = 0, elementEditor_pos2 = 0, elementEditor_pos3 = 0, elementEditor_pos4 = 0;
var videoManager_pos1 = 0, videoManager_pos2 = 0, videoManager_pos3 = 0, videoManager_pos4 = 0;
var elementStyles_pos1 = 0, elementStyles_pos2 = 0, elementStyles_pos3 = 0,elementStyles_pos4 = 0;

var lastelementadded;

var storageUsed, storageLimit, storageLeft;
var spaceUsedByImages, spaceUsedByVideos, FreeSpace;

//var fontawesome_icons = ["fa-500px", "fa-address-book", "fa-address-book-o", "fa-address-card", "fa-address-card-o", "fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right", "fa-amazon", "fa-ambulance", "fa-american-sign-language-interpreting", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left", "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up", "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down", "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-alt", "fa-arrows-h", "fa-arrows-v", "fa-asl-interpreting", "fa-assistive-listening-systems", "fa-asterisk", "fa-at", "fa-audio-description", "fa-automobile", "fa-backward", "fa-balance-scale", "fa-ban", "fa-bandcamp", "fa-bank", "fa-bar-chart", "fa-bar-chart-o", "fa-barcode", "fa-bars", "fa-bath", "fa-bathtub", "fa-battery", "fa-battery-0", "fa-battery-1", "fa-battery-2", "fa-battery-3", "fa-battery-4", "fa-battery-empty", "fa-battery-full", "fa-battery-half", "fa-battery-quarter", "fa-battery-three-quarters", "fa-bed", "fa-beer", "fa-behance", "fa-behance-square", "fa-bell", "fa-bell-o", "fa-bell-slash", "fa-bell-slash-o", "fa-bicycle", "fa-binoculars", "fa-birthday-cake", "fa-bitbucket", "fa-bitbucket-square", "fa-bitcoin", "fa-black-tie", "fa-blind", "fa-bluetooth", "fa-bluetooth-b", "fa-bold", "fa-bolt", "fa-bomb", "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-braille", "fa-briefcase", "fa-btc", "fa-bug", "fa-building", "fa-building-o", "fa-bullhorn", "fa-bullseye", "fa-bus", "fa-buysellads", "fa-cab", "fa-calculator", "fa-calendar", "fa-calendar-check-o", "fa-calendar-minus-o", "fa-calendar-o", "fa-calendar-plus-o", "fa-calendar-times-o", "fa-camera", "fa-camera-retro", "fa-car", "fa-caret-down", "fa-caret-left", "fa-caret-right", "fa-caret-square-o-down", "fa-caret-square-o-left", "fa-caret-square-o-right", "fa-caret-square-o-up", "fa-caret-up", "fa-cart-arrow-down", "fa-cart-plus", "fa-cc", "fa-cc-amex", "fa-cc-diners-club", "fa-cc-discover", "fa-cc-jcb", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-stripe", "fa-cc-visa", "fa-certificate", "fa-chain", "fa-chain-broken", "fa-check", "fa-check-circle", "fa-check-circle-o", "fa-check-square", "fa-check-square-o", "fa-chevron-circle-down", "fa-chevron-circle-left", "fa-chevron-circle-right", "fa-chevron-circle-up", "fa-chevron-down", "fa-chevron-left", "fa-chevron-right", "fa-chevron-up", "fa-child", "fa-chrome", "fa-circle", "fa-circle-o", "fa-circle-o-notch", "fa-circle-thin", "fa-clipboard", "fa-clock-o", "fa-clone", "fa-close", "fa-cloud", "fa-cloud-download", "fa-cloud-upload", "fa-cny", "fa-code", "fa-code-fork", "fa-codepen", "fa-codiepie", "fa-coffee", "fa-cog", "fa-cogs", "fa-columns", "fa-comment", "fa-comment-o", "fa-commenting", "fa-commenting-o", "fa-comments", "fa-comments-o", "fa-compass", "fa-compress", "fa-connectdevelop", "fa-contao", "fa-copy", "fa-copyright", "fa-creative-commons", "fa-credit-card", "fa-credit-card-alt", "fa-crop", "fa-crosshairs", "fa-css3", "fa-cube", "fa-cubes", "fa-cut", "fa-cutlery", "fa-dashboard", "fa-dashcube", "fa-database", "fa-deaf", "fa-deafness", "fa-dedent", "fa-delicious", "fa-desktop", "fa-deviantart", "fa-diamond", "fa-digg", "fa-dollar", "fa-dot-circle-o", "fa-download", "fa-dribbble", "fa-drivers-license", "fa-drivers-license-o", "fa-dropbox", "fa-drupal", "fa-edge", "fa-edit", "fa-eercast", "fa-eject", "fa-ellipsis-h", "fa-ellipsis-v", "fa-empire", "fa-envelope", "fa-envelope-o", "fa-envelope-open", "fa-envelope-open-o", "fa-envelope-square", "fa-envira", "fa-eraser", "fa-etsy", "fa-eur", "fa-euro", "fa-exchange", "fa-exclamation", "fa-exclamation-circle", "fa-exclamation-triangle", "fa-expand", "fa-expeditedssl", "fa-external-link", "fa-external-link-square", "fa-eye", "fa-eye-slash", "fa-eyedropper", "fa-fa", "fa-facebook", "fa-facebook-f", "fa-facebook-official", "fa-facebook-square", "fa-fast-backward", "fa-fast-forward", "fa-fax", "fa-feed", "fa-female", "fa-fighter-jet", "fa-file", "fa-file-archive-o", "fa-file-audio-o", "fa-file-code-o", "fa-file-excel-o", "fa-file-image-o", "fa-file-movie-o", "fa-file-o", "fa-file-pdf-o", "fa-file-photo-o", "fa-file-picture-o", "fa-file-powerpoint-o", "fa-file-sound-o", "fa-file-text", "fa-file-text-o", "fa-file-video-o", "fa-file-word-o", "fa-file-zip-o", "fa-files-o", "fa-film", "fa-filter", "fa-fire", "fa-fire-extinguisher", "fa-firefox", "fa-first-order", "fa-flag", "fa-flag-checkered", "fa-flag-o", "fa-flash", "fa-flask", "fa-flickr", "fa-floppy-o", "fa-folder", "fa-folder-o", "fa-folder-open", "fa-folder-open-o", "fa-font", "fa-font-awesome", "fa-fonticons", "fa-fort-awesome", "fa-forumbee", "fa-forward", "fa-foursquare", "fa-free-code-camp", "fa-frown-o", "fa-futbol-o", "fa-gamepad", "fa-gavel", "fa-gbp", "fa-ge", "fa-gear", "fa-gears", "fa-genderless", "fa-get-pocket", "fa-gg", "fa-gg-circle", "fa-gift", "fa-git", "fa-git-square", "fa-github", "fa-github-alt", "fa-github-square", "fa-gitlab", "fa-gittip", "fa-glass", "fa-glide", "fa-glide-g", "fa-globe", "fa-google", "fa-google-plus", "fa-google-plus-circle", "fa-google-plus-official", "fa-google-plus-square", "fa-google-wallet", "fa-graduation-cap", "fa-gratipay", "fa-grav", "fa-group", "fa-h-square", "fa-hacker-news", "fa-hand-grab-o", "fa-hand-lizard-o", "fa-hand-o-down", "fa-hand-o-left", "fa-hand-o-right", "fa-hand-o-up", "fa-hand-paper-o", "fa-hand-peace-o", "fa-hand-pointer-o", "fa-hand-rock-o", "fa-hand-scissors-o", "fa-hand-spock-o", "fa-hand-stop-o", "fa-handshake-o", "fa-hard-of-hearing", "fa-hashtag", "fa-hdd-o", "fa-header", "fa-headphones", "fa-heart", "fa-heart-o", "fa-heartbeat", "fa-history", "fa-home", "fa-hospital-o", "fa-hotel", "fa-hourglass", "fa-hourglass-1", "fa-hourglass-2", "fa-hourglass-3", "fa-hourglass-end", "fa-hourglass-half", "fa-hourglass-o", "fa-hourglass-start", "fa-houzz", "fa-html5", "fa-i-cursor", "fa-id-badge", "fa-id-card", "fa-id-card-o", "fa-ils", "fa-image", "fa-imdb", "fa-inbox", "fa-indent", "fa-industry", "fa-info", "fa-info-circle", "fa-inr", "fa-instagram", "fa-institution", "fa-internet-explorer", "fa-intersex", "fa-ioxhost", "fa-italic", "fa-joomla", "fa-jpy", "fa-jsfiddle", "fa-key", "fa-keyboard-o", "fa-krw", "fa-language", "fa-laptop", "fa-lastfm", "fa-lastfm-square", "fa-leaf", "fa-leanpub", "fa-legal", "fa-lemon-o", "fa-level-down", "fa-level-up", "fa-life-bouy", "fa-life-buoy", "fa-life-ring", "fa-life-saver", "fa-lightbulb-o", "fa-line-chart", "fa-link", "fa-linkedin", "fa-linkedin-square", "fa-linode", "fa-linux", "fa-list", "fa-list-alt", "fa-list-ol", "fa-list-ul", "fa-location-arrow", "fa-lock", "fa-long-arrow-down", "fa-long-arrow-left", "fa-long-arrow-right", "fa-long-arrow-up", "fa-low-vision", "fa-magic", "fa-magnet", "fa-mail-forward", "fa-mail-reply", "fa-mail-reply-all", "fa-male", "fa-map", "fa-map-marker", "fa-map-o", "fa-map-pin", "fa-map-signs", "fa-mars", "fa-mars-double", "fa-mars-stroke", "fa-mars-stroke-h", "fa-mars-stroke-v", "fa-maxcdn", "fa-meanpath", "fa-medium", "fa-medkit", "fa-meetup", "fa-meh-o", "fa-mercury", "fa-microchip", "fa-microphone", "fa-microphone-slash", "fa-minus", "fa-minus-circle", "fa-minus-square", "fa-minus-square-o", "fa-mixcloud", "fa-mobile", "fa-mobile-phone", "fa-modx", "fa-money", "fa-moon-o", "fa-mortar-board", "fa-motorcycle", "fa-mouse-pointer", "fa-music", "fa-navicon", "fa-neuter", "fa-newspaper-o", "fa-object-group", "fa-object-ungroup", "fa-odnoklassniki", "fa-odnoklassniki-square", "fa-opencart", "fa-openid", "fa-opera", "fa-optin-monster", "fa-outdent", "fa-pagelines", "fa-paint-brush", "fa-paper-plane", "fa-paper-plane-o", "fa-paperclip", "fa-paragraph", "fa-paste", "fa-pause", "fa-pause-circle", "fa-pause-circle-o", "fa-paw", "fa-paypal", "fa-pencil", "fa-pencil-square", "fa-pencil-square-o", "fa-percent", "fa-phone", "fa-phone-square", "fa-photo", "fa-picture-o", "fa-pie-chart", "fa-pied-piper", "fa-pied-piper-alt", "fa-pied-piper-pp", "fa-pinterest", "fa-pinterest-p", "fa-pinterest-square", "fa-plane", "fa-play", "fa-play-circle", "fa-play-circle-o", "fa-plug", "fa-plus", "fa-plus-circle", "fa-plus-square", "fa-plus-square-o", "fa-podcast", "fa-power-off", "fa-print", "fa-product-hunt", "fa-puzzle-piece", "fa-qq", "fa-qrcode", "fa-question", "fa-question-circle", "fa-question-circle-o", "fa-quora", "fa-quote-left", "fa-quote-right", "fa-ra", "fa-random", "fa-ravelry", "fa-rebel", "fa-recycle", "fa-reddit", "fa-reddit-alien", "fa-reddit-square", "fa-refresh", "fa-registered", "fa-remove", "fa-renren", "fa-reorder", "fa-repeat", "fa-reply", "fa-reply-all", "fa-resistance", "fa-retweet", "fa-rmb", "fa-road", "fa-rocket", "fa-rotate-left", "fa-rotate-right", "fa-rouble", "fa-rss", "fa-rss-square", "fa-rub", "fa-ruble", "fa-rupee", "fa-s15", "fa-safari", "fa-save", "fa-scissors", "fa-scribd", "fa-search", "fa-search-minus", "fa-search-plus", "fa-sellsy", "fa-send", "fa-send-o", "fa-server", "fa-share", "fa-share-alt", "fa-share-alt-square", "fa-share-square", "fa-share-square-o", "fa-shekel", "fa-sheqel", "fa-shield", "fa-ship", "fa-shirtsinbulk", "fa-shopping-bag", "fa-shopping-basket", "fa-shopping-cart", "fa-shower", "fa-sign-in", "fa-sign-language", "fa-sign-out", "fa-signal", "fa-signing", "fa-simplybuilt", "fa-sitemap", "fa-skyatlas", "fa-skype", "fa-slack", "fa-sliders", "fa-slideshare", "fa-smile-o", "fa-snapchat", "fa-snapchat-ghost", "fa-snapchat-square", "fa-snowflake-o", "fa-soccer-ball-o", "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc", "fa-sort-amount-desc", "fa-sort-asc", "fa-sort-desc", "fa-sort-down", "fa-sort-numeric-asc", "fa-sort-numeric-desc", "fa-sort-up", "fa-soundcloud", "fa-space-shuttle", "fa-spinner", "fa-spoon", "fa-spotify", "fa-square", "fa-square-o", "fa-stack-exchange", "fa-stack-overflow", "fa-star", "fa-star-half", "fa-star-half-empty", "fa-star-half-full", "fa-star-half-o", "fa-star-o", "fa-steam", "fa-steam-square", "fa-step-backward", "fa-step-forward", "fa-stethoscope", "fa-sticky-note", "fa-sticky-note-o", "fa-stop", "fa-stop-circle", "fa-stop-circle-o", "fa-street-view", "fa-strikethrough", "fa-stumbleupon", "fa-stumbleupon-circle", "fa-subscript", "fa-subway", "fa-suitcase", "fa-sun-o", "fa-superpowers", "fa-superscript", "fa-support", "fa-table", "fa-tablet", "fa-tachometer", "fa-tag", "fa-tags", "fa-tasks", "fa-taxi", "fa-telegram", "fa-television", "fa-tencent-weibo", "fa-terminal", "fa-text-height", "fa-text-width", "fa-th", "fa-th-large", "fa-th-list", "fa-themeisle", "fa-thermometer", "fa-thermometer-0", "fa-thermometer-1", "fa-thermometer-2", "fa-thermometer-3", "fa-thermometer-4", "fa-thermometer-empty", "fa-thermometer-full", "fa-thermometer-half", "fa-thermometer-quarter", "fa-thermometer-three-quarters", "fa-thumb-tack", "fa-thumbs-down", "fa-thumbs-o-down", "fa-thumbs-o-up", "fa-thumbs-up", "fa-ticket", "fa-times", "fa-times-circle", "fa-times-circle-o", "fa-times-rectangle", "fa-times-rectangle-o", "fa-tint", "fa-toggle-down", "fa-toggle-left", "fa-toggle-off", "fa-toggle-on", "fa-toggle-right", "fa-toggle-up", "fa-trademark", "fa-train", "fa-transgender", "fa-transgender-alt", "fa-trash", "fa-trash-o", "fa-tree", "fa-trello", "fa-tripadvisor", "fa-trophy", "fa-truck", "fa-try", "fa-tty", "fa-tumblr", "fa-tumblr-square", "fa-turkish-lira", "fa-tv", "fa-twitch", "fa-twitter", "fa-twitter-square", "fa-umbrella", "fa-underline", "fa-undo", "fa-universal-access", "fa-university", "fa-unlink", "fa-unlock", "fa-unlock-alt", "fa-unsorted", "fa-upload", "fa-usb", "fa-usd", "fa-user", "fa-user-circle", "fa-user-circle-o", "fa-user-md", "fa-user-o", "fa-user-plus", "fa-user-secret", "fa-user-times", "fa-users", "fa-vcard", "fa-vcard-o", "fa-venus", "fa-venus-double", "fa-venus-mars", "fa-viacoin", "fa-viadeo", "fa-viadeo-square", "fa-video-camera", "fa-vimeo", "fa-vimeo-square", "fa-vine", "fa-vk", "fa-volume-control-phone", "fa-volume-down", "fa-volume-off", "fa-volume-up", "fa-warning", "fa-wechat", "fa-weibo", "fa-weixin", "fa-whatsapp", "fa-wheelchair", "fa-wheelchair-alt", "fa-wifi", "fa-wikipedia-w", "fa-window-close", "fa-window-close-o", "fa-window-maximize", "fa-window-minimize", "fa-window-restore", "fa-windows", "fa-won", "fa-wordpress", "fa-wpbeginner", "fa-wpexplorer", "fa-wpforms", "fa-wrench", "fa-xing", "fa-xing-square", "fa-y-combinator", "fa-y-combinator-square", "fa-yahoo", "fa-yc", "fa-yc-square", "fa-yelp", "fa-yen", "fa-yoast", "fa-youtube", "fa-youtube-play", "fa-youtube-square"];

var fontawesome_solid = ["ad","address-book","address-card","adjust","air-freshener","align-center","align-justify","align-left","align-right","allergies","ambulance","american-sign-language-interpreting","anchor","angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left","angle-right","angle-up","angry","ankh","apple-alt","archive","archway","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-up","arrow-circle-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-down","arrow-left","arrow-right","arrow-up","arrows-alt","arrows-alt-h","arrows-alt-v","assistive-listening-systems","asterisk","at","atlas","atom","audio-description","award","baby","baby-carriage","backspace","backward","bacon","balance-scale","balance-scale-left","balance-scale-right","ban","band-aid","barcode","bars","baseball-ball","basketball-ball","bath","battery-empty","battery-full","battery-half","battery-quarter","battery-three-quarters","bed","beer","bell","bell-slash","bezier-curve","bible","bicycle","biking","binoculars","biohazard","birthday-cake","blender","blender-phone","blind","blog","bold","bolt","bomb","bone","bong","book","book-dead","book-medical","book-open","book-reader","bookmark","border-all","border-none","border-style","bowling-ball","box","box-open","boxes","braille","brain","bread-slice","briefcase","briefcase-medical","broadcast-tower","broom","brush","bug","building","bullhorn","bullseye","burn","bus","bus-alt","business-time","calculator","calendar","calendar-alt","calendar-check","calendar-day","calendar-minus","calendar-plus","calendar-times","calendar-week","camera","camera-retro","campground","candy-cane","cannabis","capsules","car","car-alt","car-battery","car-crash","car-side","caret-down","caret-left","caret-right","caret-square-down","caret-square-left","caret-square-right","caret-square-up","caret-up","carrot","cart-arrow-down","cart-plus","cash-register","cat","certificate","chair","chalkboard","chalkboard-teacher","charging-station","chart-area","chart-bar","chart-line","chart-pie","check","check-circle","check-double","check-square","cheese","chess","chess-bishop","chess-board","chess-king","chess-knight","chess-pawn","chess-queen","chess-rook","chevron-circle-down","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-down","chevron-left","chevron-right","chevron-up","child","church","circle","circle-notch","city","clinic-medical","clipboard","clipboard-check","clipboard-list","clock","clone","closed-captioning","cloud","cloud-download-alt","cloud-meatball","cloud-moon","cloud-moon-rain","cloud-rain","cloud-showers-heavy","cloud-sun","cloud-sun-rain","cloud-upload-alt","cocktail","code","code-branch","coffee","cog","cogs","coins","columns","comment","comment-alt","comment-dollar","comment-dots","comment-medical","comment-slash","comments","comments-dollar","compact-disc","compass","compress","compress-arrows-alt","concierge-bell","cookie","cookie-bite","copy","copyright","couch","credit-card","crop","crop-alt","cross","crosshairs","crow","crown","crutch","cube","cubes","cut","database","deaf","democrat","desktop","dharmachakra","diagnoses","dice","dice-d20","dice-d6","dice-five","dice-four","dice-one","dice-six","dice-three","dice-two","digital-tachograph","directions","divide","dizzy","dna","dog","dollar-sign","dolly","dolly-flatbed","donate","door-closed","door-open","dot-circle","dove","download","drafting-compass","dragon","draw-polygon","drum","drum-steelpan","drumstick-bite","dumbbell","dumpster","dumpster-fire","dungeon","edit","egg","eject","ellipsis-h","ellipsis-v","envelope","envelope-open","envelope-open-text","envelope-square","equals","eraser","ethernet","euro-sign","exchange-alt","exclamation","exclamation-circle","exclamation-triangle","expand","expand-arrows-alt","external-link-alt","external-link-square-alt","eye","eye-dropper","eye-slash","fan","fast-backward","fast-forward","fax","feather","feather-alt","female","fighter-jet","file","file-alt","file-archive","file-audio","file-code","file-contract","file-csv","file-download","file-excel","file-export","file-image","file-import","file-invoice","file-invoice-dollar","file-medical","file-medical-alt","file-pdf","file-powerpoint","file-prescription","file-signature","file-upload","file-video","file-word","fill","fill-drip","film","filter","fingerprint","fire","fire-alt","fire-extinguisher","first-aid","fish","fist-raised","flag","flag-checkered","flag-usa","flask","flushed","folder","folder-minus","folder-open","folder-plus","font","football-ball","forward","frog","frown","frown-open","funnel-dollar","futbol","gamepad","gas-pump","gavel","gem","genderless","ghost","gift","gifts","glass-cheers","glass-martini","glass-martini-alt","glass-whiskey","glasses","globe","globe-africa","globe-americas","globe-asia","globe-europe","golf-ball","gopuram","graduation-cap","greater-than","greater-than-equal","grimace","grin","grin-alt","grin-beam","grin-beam-sweat","grin-hearts","grin-squint","grin-squint-tears","grin-stars","grin-tears","grin-tongue","grin-tongue-squint","grin-tongue-wink","grin-wink","grip-horizontal","grip-lines","grip-lines-vertical","grip-vertical","guitar","h-square","hamburger","hammer","hamsa","hand-holding","hand-holding-heart","hand-holding-usd","hand-lizard","hand-middle-finger","hand-paper","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-rock","hand-scissors","hand-spock","hands","hands-helping","handshake","hanukiah","hard-hat","hashtag","hat-wizard","haykal","hdd","heading","headphones","headphones-alt","headset","heart","heart-broken","heartbeat","helicopter","highlighter","hiking","hippo","history","hockey-puck","holly-berry","home","horse","horse-head","hospital","hospital-alt","hospital-symbol","hot-tub","hotdog","hotel","hourglass","hourglass-end","hourglass-half","hourglass-start","house-damage","hryvnia","i-cursor","ice-cream","icicles","icons","id-badge","id-card","id-card-alt","igloo","image","images","inbox","indent","industry","infinity","info","info-circle","italic","jedi","joint","journal-whills","kaaba","key","keyboard","khanda","kiss","kiss-beam","kiss-wink-heart","kiwi-bird","landmark","language","laptop","laptop-code","laptop-medical","laugh","laugh-beam","laugh-squint","laugh-wink","layer-group","leaf","lemon","less-than","less-than-equal","level-down-alt","level-up-alt","life-ring","lightbulb","link","lira-sign","list","list-alt","list-ol","list-ul","location-arrow","lock","lock-open","long-arrow-alt-down","long-arrow-alt-left","long-arrow-alt-right","long-arrow-alt-up","low-vision","luggage-cart","magic","magnet","mail-bulk","male","map","map-marked","map-marked-alt","map-marker","map-marker-alt","map-pin","map-signs","marker","mars","mars-double","mars-stroke","mars-stroke-h","mars-stroke-v","mask","medal","medkit","meh","meh-blank","meh-rolling-eyes","memory","menorah","mercury","meteor","microchip","microphone","microphone-alt","microphone-alt-slash","microphone-slash","microscope","minus","minus-circle","minus-square","mitten","mobile","mobile-alt","money-bill","money-bill-alt","money-bill-wave","money-bill-wave-alt","money-check","money-check-alt","monument","moon","mortar-pestle","mosque","motorcycle","mountain","mouse-pointer","mug-hot","music","network-wired","neuter","newspaper","not-equal","notes-medical","object-group","object-ungroup","oil-can","om","otter","outdent","pager","paint-brush","paint-roller","palette","pallet","paper-plane","paperclip","parachute-box","paragraph","parking","passport","pastafarianism","paste","pause","pause-circle","paw","peace","pen","pen-alt","pen-fancy","pen-nib","pen-square","pencil-alt","pencil-ruler","people-carry","pepper-hot","percent","percentage","person-booth","phone","phone-alt","phone-slash","phone-square","phone-square-alt","phone-volume","photo-video","piggy-bank","pills","pizza-slice","place-of-worship","plane","plane-arrival","plane-departure","play","play-circle","plug","plus","plus-circle","plus-square","podcast","poll","poll-h","poo","poo-storm","poop","portrait","pound-sign","power-off","pray","praying-hands","prescription","prescription-bottle","prescription-bottle-alt","print","procedures","project-diagram","puzzle-piece","qrcode","question","question-circle","quidditch","quote-left","quote-right","quran","radiation","radiation-alt","rainbow","random","receipt","recycle","redo","redo-alt","registered","remove-format","reply","reply-all","republican","restroom","retweet","ribbon","ring","road","robot","rocket","route","rss","rss-square","ruble-sign","ruler","ruler-combined","ruler-horizontal","ruler-vertical","running","rupee-sign","sad-cry","sad-tear","satellite","satellite-dish","save","school","screwdriver","scroll","sd-card","search","search-dollar","search-location","search-minus","search-plus","seedling","server","shapes","share","share-alt","share-alt-square","share-square","shekel-sign","shield-alt","ship","shipping-fast","shoe-prints","shopping-bag","shopping-basket","shopping-cart","shower","shuttle-van","sign","sign-in-alt","sign-language","sign-out-alt","signal","signature","sim-card","sitemap","skating","skiing","skiing-nordic","skull","skull-crossbones","slash","sleigh","sliders-h","smile","smile-beam","smile-wink","smog","smoking","smoking-ban","sms","snowboarding","snowflake","snowman","snowplow","socks","solar-panel","sort","sort-alpha-down","sort-alpha-down-alt","sort-alpha-up","sort-alpha-up-alt","sort-amount-down","sort-amount-down-alt","sort-amount-up","sort-amount-up-alt","sort-down","sort-numeric-down","sort-numeric-down-alt","sort-numeric-up","sort-numeric-up-alt","sort-up","spa","space-shuttle","spell-check","spider","spinner","splotch","spray-can","square","square-full","square-root-alt","stamp","star","star-and-crescent","star-half","star-half-alt","star-of-david","star-of-life","step-backward","step-forward","stethoscope","sticky-note","stop","stop-circle","stopwatch","store","store-alt","stream","street-view","strikethrough","stroopwafel","subscript","subway","suitcase","suitcase-rolling","sun","superscript","surprise","swatchbook","swimmer","swimming-pool","synagogue","sync","sync-alt","syringe","table","table-tennis","tablet","tablet-alt","tablets","tachometer-alt","tag","tags","tape","tasks","taxi","teeth","teeth-open","temperature-high","temperature-low","tenge","terminal","text-height","text-width","th","th-large","th-list","theater-masks","thermometer","thermometer-empty","thermometer-full","thermometer-half","thermometer-quarter","thermometer-three-quarters","thumbs-down","thumbs-up","thumbtack","ticket-alt","times","times-circle","tint","tint-slash","tired","toggle-off","toggle-on","toilet","toilet-paper","toolbox","tools","tooth","torah","torii-gate","tractor","trademark","traffic-light","train","tram","transgender","transgender-alt","trash","trash-alt","trash-restore","trash-restore-alt","tree","trophy","truck","truck-loading","truck-monster","truck-moving","truck-pickup","tshirt","tty","tv","umbrella","umbrella-beach","underline","undo","undo-alt","universal-access","university","unlink","unlock","unlock-alt","upload","user","user-alt","user-alt-slash","user-astronaut","user-check","user-circle","user-clock","user-cog","user-edit","user-friends","user-graduate","user-injured","user-lock","user-md","user-minus","user-ninja","user-nurse","user-plus","user-secret","user-shield","user-slash","user-tag","user-tie","user-times","users","users-cog","utensil-spoon","utensils","vector-square","venus","venus-double","venus-mars","vial","vials","video","video-slash","vihara","voicemail","volleyball-ball","volume-down","volume-mute","volume-off","volume-up","vote-yea","vr-cardboard","walking","wallet","warehouse","water","wave-square","weight","weight-hanging","wheelchair","wifi","wind","window-close","window-maximize","window-minimize","window-restore","wine-bottle","wine-glass","wine-glass-alt","won-sign","wrench","x-ray","yen-sign","yin-yang"];
var fontawesome_brands = ["500px","accessible-icon","accusoft","acquisitions-incorporated","adn","adobe","adversal","affiliatetheme","airbnb","algolia","alipay","amazon","amazon-pay","amilia","android","angellist","angrycreative","angular","app-store","app-store-ios","apper","apple","apple-pay","artstation","asymmetrik","atlassian","audible","autoprefixer","avianex","aviato","aws","bandcamp","battle-net","behance","behance-square","bimobject","bitbucket","bitcoin","bity","black-tie","blackberry","blogger","blogger-b","bluetooth","bluetooth-b","bootstrap","btc","buffer","buromobelexperte","buysellads","canadian-maple-leaf","cc-amazon-pay","cc-amex","cc-apple-pay","cc-diners-club","cc-discover","cc-jcb","cc-mastercard","cc-paypal","cc-stripe","cc-visa","centercode","centos","chrome","chromecast","cloudscale","cloudsmith","cloudversify","codepen","codiepie","confluence","connectdevelop","contao","cpanel","creative-commons","creative-commons-by","creative-commons-nc","creative-commons-nc-eu","creative-commons-nc-jp","creative-commons-nd","creative-commons-pd","creative-commons-pd-alt","creative-commons-remix","creative-commons-sa","creative-commons-sampling","creative-commons-sampling-plus","creative-commons-share","creative-commons-zero","critical-role","css3","css3-alt","cuttlefish","d-and-d","d-and-d-beyond","dashcube","delicious","deploydog","deskpro","dev","deviantart","dhl","diaspora","digg","digital-ocean","discord","discourse","dochub","docker","draft2digital","dribbble","dribbble-square","dropbox","drupal","dyalog","earlybirds","ebay","edge","elementor","ello","ember","empire","envira","erlang","ethereum","etsy","evernote","expeditedssl","facebook","facebook-f","facebook-messenger","facebook-square","fantasy-flight-games","fedex","fedora","figma","firefox","first-order","first-order-alt","firstdraft","flickr","flipboard","fly","font-awesome","font-awesome-alt","font-awesome-flag","fonticons","fonticons-fi","fort-awesome","fort-awesome-alt","forumbee","foursquare","free-code-camp","freebsd","fulcrum","galactic-republic","galactic-senate","get-pocket","gg","gg-circle","git","git-alt","git-square","github","github-alt","github-square","gitkraken","gitlab","gitter","glide","glide-g","gofore","goodreads","goodreads-g","google","google-drive","google-play","google-plus","google-plus-g","google-plus-square","google-wallet","gratipay","grav","gripfire","grunt","gulp","hacker-news","hacker-news-square","hackerrank","hips","hire-a-helper","hooli","hornbill","hotjar","houzz","html5","hubspot","imdb","instagram","intercom","internet-explorer","invision","ioxhost","itch-io","itunes","itunes-note","java","jedi-order","jenkins","jira","joget","joomla","js","js-square","jsfiddle","kaggle","keybase","keycdn","kickstarter","kickstarter-k","korvue","laravel","lastfm","lastfm-square","leanpub","less","line","linkedin","linkedin-in","linode","linux","lyft","magento","mailchimp","mandalorian","markdown","mastodon","maxcdn","medapps","medium","medium-m","medrt","meetup","megaport","mendeley","microsoft","mix","mixcloud","mizuni","modx","monero","napster","neos","nimblr","node","node-js","npm","ns8","nutritionix","odnoklassniki","odnoklassniki-square","old-republic","opencart","openid","opera","optin-monster","osi","page4","pagelines","palfed","patreon","paypal","penny-arcade","periscope","phabricator","phoenix-framework","phoenix-squadron","php","pied-piper","pied-piper-alt","pied-piper-hat","pied-piper-pp","pinterest","pinterest-p","pinterest-square","playstation","product-hunt","pushed","python","qq","quinscape","quora","r-project","raspberry-pi","ravelry","react","reacteurope","readme","rebel","red-river","reddit","reddit-alien","reddit-square","redhat","renren","replyd","researchgate","resolving","rev","rocketchat","rockrms","safari","salesforce","sass","schlix","scribd","searchengin","sellcast","sellsy","servicestack","shirtsinbulk","shopware","simplybuilt","sistrix","sith","sketch","skyatlas","skype","slack","slack-hash","slideshare","snapchat","snapchat-ghost","snapchat-square","soundcloud","sourcetree","speakap","speaker-deck","spotify","squarespace","stack-exchange","stack-overflow","stackpath","staylinked","steam","steam-square","steam-symbol","sticker-mule","strava","stripe","stripe-s","studiovinari","stumbleupon","stumbleupon-circle","superpowers","supple","suse","symfony","teamspeak","telegram","telegram-plane","tencent-weibo","the-red-yeti","themeco","themeisle","think-peaks","trade-federation","trello","tripadvisor","tumblr","tumblr-square","twitch","twitter","twitter-square","typo3","uber","ubuntu","uikit","uniregistry","untappd","ups","usb","usps","ussunnah","vaadin","viacoin","viadeo","viadeo-square","viber","vimeo","vimeo-square","vimeo-v","vine","vk","vnv","vuejs","waze","weebly","weibo","weixin","whatsapp","whatsapp-square","whmcs","wikipedia-w","windows","wix","wizards-of-the-coast","wolf-pack-battalion","wordpress","wordpress-simple","wpbeginner","wpexplorer","wpforms","wpressr","xbox","xing","xing-square","y-combinator","yahoo","yammer","yandex","yandex-international","yarn","yelp","yoast","youtube","youtube-square","zhihu"];
var fontawesome_regular = ["address-book","address-card","angry","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-up","bell","bell-slash","bookmark","building","calendar","calendar-alt","calendar-check","calendar-minus","calendar-plus","calendar-times","caret-square-down","caret-square-left","caret-square-right","caret-square-up","chart-bar","check-circle","check-square","circle","clipboard","clock","clone","closed-captioning","comment","comment-alt","comment-dots","comments","compass","copy","copyright","credit-card","dizzy","dot-circle","edit","envelope","envelope-open","eye","eye-slash","file","file-alt","file-archive","file-audio","file-code","file-excel","file-image","file-pdf","file-powerpoint","file-video","file-word","flag","flushed","folder","folder-open","frown","frown-open","futbol","gem","grimace","grin","grin-alt","grin-beam","grin-beam-sweat","grin-hearts","grin-squint","grin-squint-tears","grin-stars","grin-tears","grin-tongue","grin-tongue-squint","grin-tongue-wink","grin-wink","hand-lizard","hand-paper","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-rock","hand-scissors","hand-spock","handshake","hdd","heart","hospital","hourglass","id-badge","id-card","image","images","keyboard","kiss","kiss-beam","kiss-wink-heart","laugh","laugh-beam","laugh-squint","laugh-wink","lemon","life-ring","lightbulb","list-alt","map","meh","meh-blank","meh-rolling-eyes","minus-square","money-bill-alt","moon","newspaper","object-group","object-ungroup","paper-plane","pause-circle","play-circle","plus-square","question-circle","registered","sad-cry","sad-tear","save","share-square","smile","smile-beam","smile-wink","snowflake","square","star","star-half","sticky-note","stop-circle","sun","surprise","thumbs-down","thumbs-up","times-circle","tired","trash-alt","user","user-circle","window-close","window-maximize","window-minimize","window-restore"];

var ImgGallery1And2_ImgRowEndNumbers = [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90];
var ImgGallery3_ImgRowEndNumbers = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90];
var ImgSlider1_ImgSlideDivisions = [4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120];

window.onresize = function(event) {

};

//------------------------------------------------------------------

class sidebar{
  constructor(){}

  open(){
    document.getElementsByTagName('sidebar')[0].style.left = '0px';
    $('.ulLine').css({'display':'block'});
    document.getElementById('openclose').setAttribute('class','fas fa-angle-left');
  }

  close(){
    document.getElementsByTagName('sidebar')[0].style.left = '-170px';
    setTimeout(function(){;$('.ulLine').css({'display':'none'})},500);
    document.getElementById('openclose').setAttribute('class','fas fa-angle-right');
  }
//
}

//------------------------------------------------------------------

var alphabets

class validator{
	constructor(){}

	isNumber(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if(charCode > 31 && (charCode < 48 || charCode > 57)){
            return false;
        }

        return true;
	}
}

//------------------------------------------------------------------

var validate = new validator;

//------------------------------------------------------------------

class duplicator{
  constructor(){}

  duplicate(){
    var element = document.getElementsByClassName('selected')[0];
    var etype = $(element).attr('data-e-type');
    var copy = element.cloneNode(true);

    var hcenterline = document.getElementsByClassName('hcenterline')[0];
    var vcenterline = document.getElementsByClassName('vcenterline')[0];

    copy.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
    copy.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';
    copy.addEventListener('click',site.elementClicked);
    copy.addEventListener('contextmenu',site.elementClicked);

    if(etype == 'video-overlay'){
    	var random = randomize.elementId(25);

        copy.id = random;
        copy.getElementsByTagName('iframe')[0].id = random+'videoPlayer';
    }

    document.getElementsByClassName('previewsite')[0].appendChild(copy);

    site.selectElement(copy);
  }
}

//------------------------------------------------------------------

var elementDuplicator = new duplicator;

//------------------------------------------------------------------

class elementPresenceChecker{
	constructor(){}

	ByElementType(DataEType){
		var elements = document.getElementsByClassName(DataEType); // DataEType == className

		for(var i=0; i<elements.length; i++){
			if(elements[i].getAttribute("data-e-type") == DataEType){
				return true;
			}
		}

		return false;
	}
}

//------------------------------------------------------------------

var checkElement = new elementPresenceChecker;

//------------------------------------------------------------------

class elementStyleChanger{
	constructor(){}

	show(){
		var element = document.getElementsByClassName("selected")[0];
		var elementType = element.getAttribute("data-e-type");

		var stylesDiv = document.createElement("styles");
		var curvedBorder = document.createElement("curvedborder");

		var heading = document.createElement('p');
        heading.innerText = 'Element Styles';
        heading.className = 'heading';

        close = document.createElement('i');
        close.setAttribute('class','fas fa-times close');
        close.addEventListener('click',function(){
            elementStyles.close();
        });

		stylesDiv.addEventListener("mousedown",elementStyles.mousedown);

		var categories = document.createElement("div");
		categories.className = "styles-categories";

		stylesDiv.appendChild(curvedBorder);
		stylesDiv.appendChild(heading);
        stylesDiv.appendChild(close);

		var stylesCategories = ["Colors","Designs"];
		var stylesCategoriesIcons = ["fas fa-palette","fas fa-pencil-ruler"];

		for(var i=0; i<stylesCategories.length; i++){
			var category = document.createElement("div");
			var icon = document.createElement("i");
			var p = document.createElement("p");

			category.className = "styles-category";
			icon.className = stylesCategoriesIcons[i];
			p.innerText = stylesCategories[i];
			category.setAttribute("data-category",stylesCategories[i]);

			category.appendChild(icon);
			category.appendChild(p);

			categories.appendChild(category);

			category.addEventListener("click",function(e){
				elementStyles.switchTab(this);
			});

			var previews = document.createElement("previews");
			previews.setAttribute("data-category",stylesCategories[i]);
			stylesDiv.appendChild(previews);
		}

        stylesDiv.appendChild(categories);

		body.appendChild(stylesDiv);

		elementStyles.getStyles(elementType);
	}

	switchTab(category){
		$('.styles-category-selected').removeClass("styles-category-selected");
		category.classList.add("styles-category-selected");

	    var tabToSwitch = category.getAttribute("data-category");
	    var allTabs = document.getElementsByTagName("styles")[0].getElementsByTagName("previews");

	    for(var i=0; i<allTabs.length; i++){
	    	if(allTabs[i].getAttribute("data-category") == tabToSwitch){
	    		allTabs[i].style.display = "block";
	    	}else{
	    		allTabs[i].style.display = "none";
	    	}
	    }
	}

	getStyles(elementType){
	  var token = localStorage.getItem('auth');

	  var createPreviewElement = 0;
	  var isColor = 0;

	  if(elementType.includes("checkbox")){
	  	elementType = "checkbox";
	  }else{
	  	if(elementType.includes("toggle-switch")){
	  	  elementType = "toggle-switch";
	    }else{
	    	if(elementType.includes("dropdown-list")){
	  	      elementType = "dropdown-list";
	        }
	    }
	  }

      $.ajax({
        url: 'http://localhost:8000/api/me/elementStyles/'+elementType,
        type: 'GET',
        beforeSend: function(request){
          request.setRequestHeader('Authorization','Bearer '+token);
          request.setRequestHeader('Accept', 'application/json');
        },
        success: function(response){
          var styles = response;
          var allPreviews = document.getElementsByTagName("styles")[0].getElementsByTagName("previews");

          var previews;

          elementStyles.switchTab(document.getElementsByTagName("styles")[0].getElementsByClassName("styles-categories")[0].getElementsByClassName("styles-category")[0]);

          for(var i=0; i<styles.length; i++){
        	var stylePreview = document.createElement("stylePreview");
        	stylePreview.id = "style-"+randomize.elementId(50);

        	if(styles[i].category == "colors"){
        		isColor = 1;
        	}

        	// Picking suitable previews tab according to style category

        	var categoryToMatch;

        	if(isColor == 1){
        		categoryToMatch = "Colors";
        	}else{
        		categoryToMatch = "Designs";
        	}

        	for(var o=0; o<allPreviews.length; o++){
        		if(allPreviews[o].getAttribute("data-category") == categoryToMatch){
        			previews = allPreviews[o];
        		}
        	}

        	// --------------------------------------------

        	if(createPreviewElement == 1){

        	}else{
        		if(isColor == 1){
        			if(elementType.includes("checkbox")){
        				stylePreview.style.backgroundColor = styles[i].attr[0].attributes.split(":")[1].replace(";","");
        			}else{
        				if(elementType.includes("toggle-switch")){
        					stylePreview.style.backgroundColor = styles[i].attr[0].attributes.split(":")[1].replace(";","");
        			    }else{
        			    	if(elementType.includes("dropdown-list")){
        			    		var color1 = styles[i].attr[0].attributes.split("data-option-bg-hv")[0].split(":")[1].replace(" ","").replace(";","");
        			    		var color2 = styles[i].attr[0].attributes.split("data-option-bg-clr")[0].split("data-option-bg-hv")[1].split(":")[1].replace(" ","").replace(";","");

        			    		stylePreview.style.backgroundColor = "unset";

        			    		var backgroundGradientString = "-webkit-gradient(linear, left bottom, right top, color-stop(0%,"+color1+"), color-stop(49%, "+color1+"), color-stop(50%, "+color2+"), color-stop(100%, "+color2+"))";
        			    	    stylePreview.style.background = backgroundGradientString;
        			    	}
        			    }
        			}
        		}
        	}

        	(function(stylePreview,styles,i){
        		stylePreview.addEventListener("click",function(e){
        		    elementStyles.switchStyle(styles[i],e);
        	    });
        	})(stylePreview,styles,i);

        	previews.appendChild(stylePreview);
         }

        }
      });
	}

	switchStyle(styleObj,e){
		var element = document.getElementsByClassName("selected")[0];
		var elementType = element.getAttribute("data-e-type");

		if(elementType.includes(styleObj.type)){

			// Change css

			for(var i=0; i<styleObj.css.length; i++){
				var css = styleObj.css[i];

				if(css.for_element == "element"){
					var elementToAffect = element;
				}else{
					var elementToAffect = element.getElementsByTagName(css.for_element)[0];
				}

				if(elementToAffect){
					elementToAffect.setAttribute("style",css.css_changes);
				}
			}

			// Add Attributes

			for(var o=0; o<styleObj.attr.length; o++){
				var attributes = styleObj.attr[o].attributes.split(" ");

				if(styleObj.attr[o].for_element == "element"){
					var elementToAffect = element;
				}else{
					var elementToAffect = element.getElementsByTagName(css.for_element)[0];
				}

				if(elementToAffect){
					for(var a=0; a<attributes.length; a++){
						var attrName = attributes[a].split(":")[0];
						var attrValue = attributes[a].split(":")[1].replace(";","");

						elementToAffect.setAttribute(attrName,attrValue);
					}
				}
			}

			// Select clicked preview:

			var allStyles = document.getElementsByTagName("styles")[0].getElementsByTagName("stylepreview");

		    for(var o=0; o<allStyles.length; o++){
				allStyles[o].classList.remove("selected");
			}

			e.target.classList.add("selected");
		}
	}

	close(){
		document.getElementsByTagName("styles")[0].remove();
	}

	drag(e){
      var elmnt = document.getElementsByTagName('styles')[0];
      e = e || window.event;
      e.preventDefault();

      // calculate the new cursor position:
      elementStyles_pos1 = elementStyles_pos3 - e.clientX;
      elementStyles_pos2 = elementStyles_pos4 - e.clientY;
      elementStyles_pos3 = e.clientX;
      elementStyles_pos4 = e.clientY;

      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - elementStyles_pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - elementStyles_pos1) + "px";
      elmnt.style.cursor = 'grabbing';
    }

    mousedown(e){
      var elmnt = document.getElementsByTagName('styles')[0];
      if(e.target == elmnt){
      e = e || window.event;
      e.preventDefault();

      elmnt.style.cursor = 'grab';

      // get the mouse cursor position at startup:
      elementStyles_pos3 = e.clientX;
      elementStyles_pos4 = e.clientY;
      document.onmouseup = elementStyles.closeDrag;

      // call a function whenever the cursor moves:
      document.onmousemove = elementStyles.drag;
      }
    }

    closeDrag(){
      var elmnt = document.getElementsByTagName('styles')[0];
      document.onmouseup = null;
      document.onmousemove = null;
      elmnt.style.cursor = 'default';
    }
}

//------------------------------------------------------------------

var elementStyles = new elementStyleChanger;

//------------------------------------------------------------------

class fontAwesomeIcons{
  constructor(){}

  show(e,elementToAffect,forElement,iconPreview){

  	var appendIcon = 0;
  	var isIconElement = 0;

    if($('.fontAwesomeSelector')[0]){
      $('.fontAwesomeSelector').remove();
    }else{
      var selectorDiv = document.createElement('div');
      selectorDiv.className = 'fontAwesomeSelector';
      //selectorDiv.style.top = /*e.target.getBoundingClientRect().top*/ e.clientY - document.getElementsByClassName('elementEditor')[0].getBoundingClientRect().top + window.scrollY + 'px';
      //selectorDiv.style.left = /*e.target.getBoundingClientRect().left*/ e.clientX - document.getElementsByClassName('elementEditor')[0].getBoundingClientRect().left + 10 + 'px';
      //selectorDiv.style.transform = 'translate(-'+e.target.getBoundingClientRect().left + 25 + 'px)';

      var heading = document.createElement('p');
      heading.innerText = 'Pick an Icon';
      heading.className = 'heading';

      var searchBox = document.createElement("input");
      searchBox.type = "text";
      searchBox.setAttribute("placeholder","Search Icons...");
      searchBox.setAttribute("maxlength",20);

      searchBox.addEventListener("keypress",function(e){
      	if(e.keyCode == 13){
    		fontAwesomeSelector.searchIcons(this.value);
    	}
      });

      var close = document.createElement('i');
      close.className = 'fas fa-times close';
      close.addEventListener('click',function(){
        $('.fontAwesomeSelector').remove();
      });

      selectorDiv.appendChild(close);
      selectorDiv.appendChild(heading);
      selectorDiv.appendChild(searchBox);
      body.appendChild(selectorDiv);

      var target;

      if(document.getElementsByClassName('selected')[0].tagName == 'I'){
        target = document.getElementsByClassName('selected')[0];
        isIconElement = 1;
      }else{
      	if(elementToAffect !== null){
      		if(elementToAffect.tagName == 'A' && forElement == "navbar"){
      			appendIcon = 1;
      		}else{
      			if(elementToAffect.tagName == 'SPAN' && forElement == "dropdown-list"){
      				appendIcon = 1;
      				publicEvents.dropdownlist_position_icons(document.getElementsByClassName("selected")[0].getElementsByClassName("options")[0].getElementsByTagName("ul")[0],"left");
      			}else{
      				if(elementToAffect.tagName == "i" && forElement == "textbox"){
      					target = elementToAffect;
                        isIconElement = 1;
                        appendIcon = 0;
      				}else{
      					if(elementToAffect[0].tagName == "i" && forElement == "ratings"){
      						target = elementToAffect;
      						isIconElement = 1;
      						appendIcon = 0;
      					}
      				}
      			}
      		}

      		target = elementToAffect;
      	}else{
      		target = e.target;
      	}
      }

      for(var i=0; i < fontawesome_solid.length; i++){
        var div = document.createElement('div');
        var icon = document.createElement('i');
        icon.className = 'fas fa-'+fontawesome_solid[i];

        (function(e,div,icon,target,appendIcon){
          div.addEventListener('click',function(){
          	if(appendIcon == 1){
          		if(target.getElementsByTagName('i')[0]){
          			target.getElementsByTagName('i')[0].className = icon.className;
          			if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}else{
          		    var iToAppend = document.createElement('i');
          		    iToAppend.className = icon.className;

          		    $(target).prepend(iToAppend);
          		    if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}
          	}else{
          		if(appendIcon == 0){
          			if(target.length == 0){
          				target.className = icon.className;
          			    if(isIconElement == 0){ iconPreview.className = icon.className; }
          			}else{
          				if(target.length > 0){
          					for(var y=0; y<target.length; y++){
          						target[y].className = icon.className;
          						if(isIconElement == 0){ iconPreview.className = icon.className; }
          					}
          				}
          			}
          		}
          	}
            $('.fontAwesomeSelector').remove();
          });
        })(e,div,icon,target,appendIcon);

        div.appendChild(icon);
        selectorDiv.appendChild(div);
      }

      for(var o=0; o < fontawesome_brands.length; o++){
        var div = document.createElement('div');
        var icon = document.createElement('i');
        icon.className = 'fab fa-'+fontawesome_brands[o];

        (function(e,div,icon,target,appendIcon){
          div.addEventListener('click',function(){
          	if(appendIcon == 1){
          		if(target.getElementsByTagName('i')[0]){
          			target.getElementsByTagName('i')[0].className = icon.className;
          			if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}else{
          		    var iToAppend = document.createElement('i');
          		    iToAppend.className = icon.className;

          		    $(target).prepend(iToAppend);
          		    if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}
          	}else{
          		if(appendIcon == 0){
          			if(target.length == 0){
          				target.className = icon.className;
          			    if(isIconElement == 0){ iconPreview.className = icon.className; }
          			}else{
          				if(target.length > 0){
          					for(var y=0; y<target.length; y++){
          						target[y].className = icon.className;
          						if(isIconElement == 0){ iconPreview.className = icon.className; }
          					}
          				}
          			}
          		}
          	}
            $('.fontAwesomeSelector').remove();
          });
        })(e,div,icon,target,appendIcon);

        div.appendChild(icon);
        selectorDiv.appendChild(div);
      }

      for(var k=0; k < fontawesome_regular.length; k++){
        var div = document.createElement('div');
        var icon = document.createElement('i');
        icon.className = 'far fa-'+fontawesome_regular[k];

        (function(e,div,icon,target,appendIcon){
          div.addEventListener('click',function(){
          	if(appendIcon == 1){
          		if(target.getElementsByTagName('i')[0]){
          			target.getElementsByTagName('i')[0].className = icon.className;
          			if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}else{
          		    var iToAppend = document.createElement('i');
          		    iToAppend.className = icon.className;

          		    $(target).prepend(iToAppend);
          		    if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}
          	}else{
          		if(appendIcon == 0){
          			if(target.length == 0){
          				target.className = icon.className;
          			    if(isIconElement == 0){ iconPreview.className = icon.className; }
          			}else{
          				if(target.length > 0){
          					for(var y=0; y<target.length; y++){
          						target[y].className = icon.className;
          						if(isIconElement == 0){ iconPreview.className = icon.className; }
          					}
          				}
          			}
          		}
          	}
            $('.fontAwesomeSelector').remove();
          });
        })(e,div,icon,target,appendIcon);

        div.appendChild(icon);
        selectorDiv.appendChild(div);
      }

    }

  }

  searchIcons(value){
  	var matched = [];
  	var allIconsDivs = document.getElementsByClassName("fontAwesomeSelector")[0].getElementsByTagName("div");

  	for(var i=0; i<allIconsDivs.length; i++){
  		var iconClass = allIconsDivs[i].getElementsByTagName("i")[0].className;
  		if(iconClass.includes(value)){
  			allIconsDivs[i].style.display = "inline-block";
  		}else{
  			allIconsDivs[i].style.display = "none";
  		}
  	}

  	/*for(var i=0; i<fontawesome_solid.length; i++){
  		if(fontawesome_solid[i].includes(value)){
  			matched.push(fontawesome_solid[i]);
  		}
  	}

  	for(var i=0; i<fontawesome_regular.length; i++){
  		if(fontawesome_regular[i].includes(value)){
  			matched.push(fontawesome_regular[i]);
  		}
  	}*/

  }

}

//------------------------------------------------------------------

var fontAwesomeSelector = new fontAwesomeIcons;

//------------------------------------------------------------------

class userMediaEditor{
	constructor(){}

	open(mediaType,image){
		var title;
		var des;
		var thumbnail;
		var mediaId;

		var properties;

		if(mediaType == "video"){
			title = image.getAttribute("data-video-title");
			des = image.getAttribute("data-video-des");
			thumbnail = image.src;
			mediaId = image.getAttribute("data-m-id");

			properties = ["Thumbnail", "Title", "Description"];
		}else{
			if(mediaType == "image"){
				title = image.getAttribute("data-image-title");
				des = image.getAttribute("data-description");
				mediaId = image.getAttribute("data-m-id");

				properties = ["Title", "Description"];
			}
		}

		if(title == "null" || title == null){
			title = "";
		}

		if(des == "null" || des == null){
			des = "";
		}

		var mediaEditorDiv = document.createElement("div");
		mediaEditorDiv.className = "mediaManager_box";
		mediaEditorDiv.id = "mediaManager-edit-box";

		var txtbox_container = document.createElement("div");
		txtbox_container.className = "mediaManager-txtboxes";

		for(var i=0; i<properties.length; i++){
			var addNote = 0;

			var txtbox = document.createElement("div");
			txtbox.className = "txtbox";
			txtbox.setAttribute("data-name",properties[i]);

			var p = document.createElement("p");
			p.innerText = properties[i];

			var suitableElement;

			if(properties[i] == "Description"){
				suitableElement = document.createElement("textarea");
			    suitableElement.innerText = des;

			    suitableElement.setAttribute("Placeholder","Enter the description for your media here.");
			}else{
				if(properties[i] == "Thumbnail"){
					suitableElement = document.createElement("img");
					suitableElement.src = thumbnail;

					txtbox.style.width = "50%";
			        txtbox.style.height = "50%";

			        addNote = 1;

			        var note = document.createElement("span");
			        note.className = "note";
			        note.innerText = "This is just a preview of the thumbnail. Thumbnail automatically resizes according to the screen size."

			        note.style.width = "50%";
				}else{
					suitableElement = document.createElement("input");
			        suitableElement.type = "text";

			        if(properties[i] == "Title"){
			    	    suitableElement.value = title;
			    	    suitableElement.setAttribute("Placeholder","Enter the title for your media here.");
			        }
				}
			}

			(function(properties,i,suitableElement,txtbox){
				if(properties[i] == "Thumbnail"){
				    var thumbnail_upload_text = document.createElement("p");
				    thumbnail_upload_text.className = "thumb-text";
				    thumbnail_upload_text.innerText = "Upload Custom Thumbnail";

				    suitableElement.addEventListener("mouseover",function(){
				    	thumbnail_upload_text.style.opacity = 1;
				    });

				    suitableElement.addEventListener("mouseout",function(){
				    	thumbnail_upload_text.style.opacity = 0;
				    });

				    var uploadInput = document.createElement("input");
				    uploadInput.type = "file";
				    uploadInput.style.width = "0px";
				    uploadInput.style.height = "0px";
				    uploadInput.style.display = "none";
				    uploadInput.style.pointerEvents = "none";
				    uploadInput.style.opacity = "0";
				    uploadInput.accept = 'image/png, image/jpeg, image/jpg';

				    uploadInput.addEventListener('change',function(){
                        mediaManager.changeThumbnailPreview(uploadInput.files[0],txtbox);
                    });

				    suitableElement.addEventListener("click",function(){
					    uploadInput.click();
				    });

				    txtbox.appendChild(thumbnail_upload_text);
				    txtbox.appendChild(uploadInput);
			    }
			})(properties,i,suitableElement,txtbox);

			txtbox_container.appendChild(txtbox);

			if(addNote == 1){
				txtbox_container.appendChild(note);
			}

			txtbox.appendChild(p);
			txtbox.appendChild(suitableElement);
		}

		var savebutton = document.createElement("button");
		savebutton.className = "save-edit-button";
		savebutton.innerText = "Save";

		var cancelbutton = document.createElement("button");
		cancelbutton.className = "cancel-edit-button";
		cancelbutton.innerText = "Cancel";

		cancelbutton.addEventListener("click",function(){
			mediaEditor.close(mediaType);
		});

		savebutton.addEventListener("click",function(){
			cancelbutton.style.opacity = 0.5;
			cancelbutton.style.pointerEvents = "none";
			this.style.opacity = 0.5;
			this.style.pointerEvents = "none";
			mediaManager.updateMedia(mediaId,txtbox_container,mediaType);
		});

		mediaEditorDiv.appendChild(txtbox_container);

		if(mediaType == "video"){
			document.getElementsByClassName("videoManager")[0].appendChild(mediaEditorDiv);
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("videoManager_panelbar")[0].getElementsByTagName("button")[0].style.display = "none";
		    document.getElementById("videoManager-videos-box").style.display = "none";
		    document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].appendChild(savebutton);
		    document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].appendChild(cancelbutton);
		    document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "none";
		}else{
			if(mediaType == "image"){
				document.getElementById("bg-image-manager").appendChild(mediaEditorDiv);
			    document.getElementById("bg-image-manager").getElementsByClassName("bg-image-manager_panelbar")[0].getElementsByTagName("button")[0].style.display = "none";
		        document.getElementById("bg-image-manager-images-box").style.display = "none";
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "none";
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("checkbox-one")[0].style.display = "none";
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].appendChild(savebutton);
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].appendChild(cancelbutton);
			}
		}

		mediaEditorDiv.style.display = "inline-block";
	}

	close(mediaType){
		document.getElementById("mediaManager-edit-box").remove();

		if(mediaType == "video"){
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("videoManager_panelbar")[0].getElementsByTagName("button")[0].style.display = "inline-block";
		    document.getElementById("videoManager-videos-box").style.display = "inline-block";
		    document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByClassName("save-edit-button")[0].remove();
		    document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByClassName("cancel-edit-button")[0].remove();
		    document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "inline-block";
		}else{
			if(mediaType == "image"){
				document.getElementById("bg-image-manager").getElementsByClassName("bg-image-manager_panelbar")[0].getElementsByTagName("button")[0].style.display = "inline-block";
		        document.getElementById("bg-image-manager-images-box").style.display = "inline-block";
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("save-edit-button")[0].remove();
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("cancel-edit-button")[0].remove();
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "inline-block";
		        document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("checkbox-one")[0].style.display = "inline-block";
			}
		}
	}
}

//------------------------------------------------------------------

var mediaEditor = new userMediaEditor;

//------------------------------------------------------------------

var user_images = [];
var user_videos = [];

//------------------------------------------------------------------

class userMediaManager{
  constructor(){}

  refreshMedia(){

    //if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'image'){

      var token = localStorage.getItem('auth');

      $.ajax({
        url: 'http://localhost:8000/api/me/media',
        type: 'GET',
        beforeSend: function(request){
          request.setRequestHeader('Authorization','Bearer '+token);
          request.setRequestHeader('Accept', 'application/json');
        },
        success: function(response){
          var media = response.Media;
          console.log(media);

          user_images = [];
          user_videos = [];

          for(var i=0; i < media.length; i++){
            if(media[i].type == 'Image'){
              user_images.push(media[i]);
            }else{
              if(media[i].type == 'Video'){
                user_videos.push(media[i]);
              }
            }
          }

          mediaManager.updateStorageSpace(response.Storage);
          mediaManager.updateSpaceDetails(user_images,user_videos,response.Storage.split('/')[0]);

        }
      });

    //}

  }

  searchUserMedia(type,query){
  	var searchBox;

  	if(type == "videos"){
  		searchBox = document.getElementById("videoManager-videos-box");
  	}else{
  		if(type == "images"){
  		    searchBox = document.getElementById("bg-image-manager-images-box");
  	    }
  	}

  	var items = searchBox.getElementsByTagName("div");

  	for(var i=0; i<items.length; i++){
  		var strToSearch;

  		if(type == "videos"){
  			var img = items[i].getElementsByTagName("img")[0];
  			strToSearch = img.getAttribute("data-title") + " " + img.getAttribute("data-video-title");
  			console.log(strToSearch);
  		}else{
  			if(type == "images"){
  				var img = items[i].getElementsByTagName("img")[0];
  			    strToSearch = img.getAttribute("data-title") + " " + img.getAttribute("data-image-title");
  			    console.log(strToSearch);
  			}
  		}

  		if(strToSearch.includes(query)){
  			items[i].style.display = "inline-block";
  		}else{
  			items[i].style.display = "none";
  			console.log("does not contains "+query);
  		}
  	}
  }

  showImageInfo(e,target){

    var filename = $(target).attr('data-title');
    var size = $(target).attr('data-size');
    var title = $(target).attr('data-image-title');
    var des = $(target).attr('data-description');

    if(title == "null" || title == null){
    	title = "";
    }

    if(des == "null" || des == null){
    	des = "";
    }

    var div = document.createElement('div');
    div.className = 'mediaInfo';
    div.id = target.id+'-meta';

    div.addEventListener('mouseover',function(){
      this.remove();
    });

    var p = document.createElement('p');
    p.innerText = "File Name: "+filename;

    var p2 = document.createElement('p');
    p2.innerText = 'Size: '+calculator.formatBytes(size);

    var p3 = document.createElement('p');
    p3.innerText = "Title: "+title;

    var p4 = document.createElement('p');

    if(des.length > 150){
        p4.innerText = 'Description: '+des.substring(0,150)+"...";
    }else{
        p4.innerText = 'Description: '+des;
    }

    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(p);
    div.appendChild(p2);

    div.style.left = e.clientX + 'px';
    div.style.top = (e.clientY + window.scrollY) + 'px';

    body.appendChild(div);
  }

  hideImageInfo(target){
    var div = document.getElementById(target.id+'-meta').remove();
  }

  deleteMedia(id,type){
    var token = localStorage.getItem('auth');

    $.ajax({
      url:'http://localhost:8000/api/media/delete',
      type:'POST',
      dataType:'JSON',
      data:{'media_id':id},
      beforeSend: function(request){
        request.setRequestHeader('Authorization','Bearer '+token);
        request.setRequestHeader('Accept','application/json');
      },
      success: function(response){
        console.log(response);
        mediaManager.refreshMedia();

        if(response.Message == 'Media deleted successfully'){
          notification('Success, '+response.Message);
        }

        if(response.Message == "You don't have permissions to delete this media." || response.Message == "Invalid Input"){
          notification('Error, '+response.Message);
        }

        if(type == 'Image'){
          setTimeout(function(){mediaManager.showUserImages(null)},1000);
        }else{
          if(type == 'Video'){
            setTimeout(function(){mediaManager.showUserVideos()},1000);
          }
        }

        storageLimit = calculator.formatBytes(response.Storage.split('/')[0]);
        storageLeft = calculator.formatBytes(response.Storage.split('/')[1]);
        storageUsed = calculator.formatBytes(response.Storage.split('/')[0]-response.Storage.split('/')[1]);

        $('.storageSpace').text('Media Storage Usage: '+storageUsed+' / '+storageLimit);

      }
    });
  }

  changeThumbnailPreview(file,txtbox){
  	var reader  = new FileReader();
  	var preview = txtbox.getElementsByTagName("img");

  	if(preview[0]){
  		reader.onload = function () {
            preview[0].src = reader.result;
        }

        reader.readAsDataURL(file);
  	}
  }

  updateMedia(id,textboxContainer,type){
  	var token = localStorage.getItem('auth');

  	var title;
  	var description;
  	var image;
  	var txtboxes = textboxContainer.getElementsByClassName("txtbox");

  	for(var i=0; i<txtboxes.length; i++){
  		var name = txtboxes[i].getAttribute("data-name");
  		if(name == "Title"){
  			title = txtboxes[i].getElementsByTagName("input")[0].value;
  		}else{
  			if(name == "Description"){
  				description = txtboxes[i].getElementsByTagName("textarea")[0].value;
  		    }else{
  		    	if(name == "Thumbnail"){
  		    		if(type == "video"){
  		    			if(txtboxes[i].getElementsByTagName("input")[0]){
  		    				if(txtboxes[i].getElementsByTagName("input")[0].files){
  		    					if(txtboxes[i].getElementsByTagName("input")[0].files[0]){
  		    						image = txtboxes[i].getElementsByTagName("input")[0].files[0];
  		    					}
  		    				}
  		    			}
                    }
  		    	}
  		    }
  		}
  	}

  	var formData = new FormData();
    formData.append('media_id', id);

    if(title !== "" && title !== null && title !== "null"){
    	formData.append('title', title);
    }

    if(description !== "" && description !== null && description !== "null"){
    	formData.append('description', description);
    }

    if(image !== "" && image !== null && image !== "null"){
    	formData.append('thumbnail', image);
    }

    $.ajax({
      url:'http://localhost:8000/api/media/update',
      type:'POST',
      dataType:'JSON',
      data:formData,
      processData: false,
      contentType: false,
      beforeSend: function(request){
        request.setRequestHeader('Authorization','Bearer '+token);
        request.setRequestHeader('Accept','application/json');
      },
      success: function(response){
      	mediaManager.refreshMedia();

      	var message = response.Message;
      	console.log(message);

        if(message == 'Media updated successfully'){
          notification('Success, '+message);
        }

        if(message == "You don't have permissions to delete this media." || message == "Invalid Input"){
          notification('Error, '+message);
        }

        if(type == 'image'){
          setTimeout(function(){mediaManager.showUserImages(null)},1000);
        }else{
          if(type == 'video'){
            setTimeout(function(){mediaManager.showUserVideos()},1000);
          }
        }

        mediaEditor.close(type);
      },
    });

  }

  /*uploadMedia(type, file){
  	var token = localStorage.getItem('auth');

    var file_size = file.size;
    var file_extension = file.type.split("/").pop();
    var file_name = file.name.split(".")[0];

    var upload = 0;

    if(type == 'Image'){
      if(file_extension !== 'png' && file_extension !== 'jpeg' && file_extension !== 'jpg'){
        notification('Error, you can only upload png/jpeg/jpg type image.');
        upload = 0;
        return false;
      }else{
        upload = 1;
      }
    }else{
      if(type == 'Video'){
        if(file_extension !== 'mp4'){
          notification('Error, you can only upload mp4 type video.');
          upload = 0;
          return false;
        }else{
          upload = 1;
        }
      }
    }

    if(upload == 1){
        if(type == 'Image'){
            document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].innerText = 'Uploading...';
            document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].style.opacity = '0.5';
            document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].style.pointerEvents = 'none';
        }else{
            if(type == 'Video'){
                document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].innerText = 'Uploading...';
                document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].style.opacity = '0.5';
                document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].style.pointerEvents = 'none';
            }
        }

        var fileChunkInfo = mediaManager.generateChunkSize(file.size);

        console.log("File Size: "+calculator.formatBytes(file.size)+", "+fileChunkInfo[1]+" chunks of "+calculator.formatBytes(fileChunkInfo[0])+" each.");

        var r = new Resumable({
  		  target:'http://localhost:8000/api/media/upload',
  		  headers:{
  		  	Authorization:"Bearer "+token,
  		  	Accept:"application/json",
  		  },
  		  query: {
  		  	file_name:file_name,
  		  	file_type:type,
  		  },
  		  chunkSize: fileChunkInfo[0],
          simultaneousUploads: 3,
          testChunks: false,
          throttleProgressCallbacks: 1,
          method:"multipart",
  	    });

  	    r.addFile(file);

  	    r.on("error", function(message, file){
  	    	console.log(message);
  	    });

  	    r.on('fileAdded', function(file, event){
  	    	r.upload();
  	    });

  	    r.on('fileSuccess', function(file, response){
  	    	mediaManager.refreshMedia();
  	    	mediaManager.updateUploadButtonText(type,null);

  	    	response = JSON.parse(response);

  	    	var message;

  	    	if(response.Message){
  	    		message = response.Message;
  	    	}else{
  	    		if(response[0].original.message){
  	    			message = response[0].original.message;
  	    		}
  	    	}

  	    	if(message){
            	if(message.includes('You already have a')){
              	    notification('Error, '+message);
            	}else{
              	    if(type == 'Image'){
                	    setTimeout(function(){mediaManager.showUserImages(null)},1000);
                	    if(message.includes('Invalid')){

                	    }else{
                  	        notification('Success, '+message);
                  	        mediaManager.updateStorageSpace(response[1].Storage);
                	    }
              	    }else{
                	if(type == 'Video'){
                  	        setTimeout(function(){mediaManager.showUserVideos()},1000);
                  	        if(message.includes('Invalid')){

                  	        }else{
                    	        notification('Success, '+message);
                    	        mediaManager.updateStorageSpace(response[1].Storage);
                  	        }
                	    }
              	    }
            	}
  	    	}

  	    });

  	    r.on('fileError', function(file, message){
  	    	console.log(message);
  	    });

  	    (function(file,type){
  	    	r.on('fileProgress', function(file) {
  	    	    mediaManager.updateUploadButtonText(type,Math.floor(file.progress() * 100));
            });
  	    })(file,type);

    }

  generateChunkSize(fileSize){
  	var chunkSize = fileSize / 25;
  	var chunkCount = fileSize / chunkSize;

  	return [chunkSize,25];
  }

  }*/

  updateSpaceDetails(userImgs,userVids,totalSpace){
  	var totalImgSpace = 0;
  	var totalVidSpace = 0;

  	for(var i=0; i<userImgs.length; i++){
  		totalImgSpace = totalImgSpace + userImgs[i].size;
  		console.log(totalImgSpace);
  	}

  	for(var i=0; i<userVids.length; i++){
  		totalVidSpace = totalVidSpace + userVids[i].size;
  		console.log(totalVidSpace);
  	}

  	spaceUsedByImages = calculator.formatBytes(totalImgSpace);
  	spaceUsedByVideos = calculator.formatBytes(totalVidSpace);
  	FreeSpace = calculator.formatBytes(totalSpace - (totalImgSpace + totalVidSpace));
  }

  updateStorageSpace(storage){
  	storageLimit = calculator.formatBytes(storage.split('/')[0]);
    storageLeft = calculator.formatBytes(storage.split('/')[1]);
    storageUsed = calculator.formatBytes(storage.split('/')[0]-storage.split('/')[1]);

    $('.storageSpace').text('Media Storage Usage: '+storageUsed+' / '+storageLimit);
  }

  updateUploadButtonText(type,state){
  	var text;
  	var button;

  	if(type == "Video"){
  		button = document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0];
  	}else{
  		if(type == "Image"){
  			button = document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0];
  		}
  	}

  	if(state == null){
  		if(type == "Image"){
  			text = "Upload Image";
  		}else{
  			if(type == "Video"){
  				text  = "Upload Video (50MB Max Size)";
  			}
  		}

  		button.style.opacity = '1';
        button.style.pointerEvents = 'unset';
  	}else{
  		if(state !== null){
  			if(state == "finishing"){
  				text = "Finishing...";
  			}else{
  				text = "Uploading... ("+state+"%)";
  			}
  		}
  	}

  	button.innerText = text;
  }

  uploadMedia(type,file){

    var token = localStorage.getItem('auth');

    var file_size = file.size;
    var file_extension = file.type.split("/").pop();
    var file_name = file.name.split(".")[0];

    var upload = 0;

    if(type == 'Image'){
      if(file_extension !== 'png' && file_extension !== 'jpeg' && file_extension !== 'jpg'){
        notification('Error, you can only upload png/jpeg/jpg type image.');
        upload = 0;
        return false;
      }else{
        upload = 1;
      }
    }else{
      if(type == 'Video'){
        if(file_extension !== 'mp4'){
          notification('Error, you can only upload mp4 type video.');
          upload = 0;
          return false;
        }else{
          upload = 1;
        }
      }
    }

    var formData = new FormData();
    formData.append('file_name', file_name);
    formData.append('file_type', type);
    formData.append('file', file);

    if(upload == 1){

      if(type == 'Image'){
        document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].innerText = 'Uploading...';
        document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].style.opacity = '0.5';
        document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].style.pointerEvents = 'none';
      }else{
        if(type == 'Video'){
          document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].innerText = 'Uploading...';
          document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].style.opacity = '0.5';
          document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].style.pointerEvents = 'none';
        }
      }

      $.ajax({
        url:'http://localhost:8000/api/media/upload',
        type:'POST',
        processData: false,
        contentType: false,
        data:formData/*{'file_name':file_name,'file_type':type,'file':file}*/,
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function(evt) {
                if(evt.lengthComputable){
                    var percentComplete = Math.round((evt.loaded / evt.total) * 100);
                    if(percentComplete == 100){
                    	mediaManager.updateUploadButtonText(type,"finishing");
                    }else{
                    	mediaManager.updateUploadButtonText(type,percentComplete);
                    }
                }
            }, false);
            return xhr;
        },
        beforeSend: function(request){
          request.setRequestHeader('Authorization','Bearer '+token);
          request.setRequestHeader('Accept','application/json');
        },
        success: function(response){
          console.log(response);
          mediaManager.refreshMedia();
  	      mediaManager.updateUploadButtonText(type,null);

  	      var message;

  	      if(response.Message){
  	    	  if(response.Message.original){
  	    			message = response.Message.original;
  	    	  }else{
  	    	  	    message = response.Message;
  	    	  }
  	      }else{
  	    	  if(response[0].original.message){
  	    			message = response[0].original.message;
  	    	  }
  	      }

          if(message.includes('Not Enough Space')){
            notification('Error, '+message);
          }else{
            if(type == 'Image'){
              setTimeout(function(){mediaManager.showUserImages(null)},1000);
              if(message.includes('Invalid')){

              }else{
                notification('Success, '+message);
              }
            }else{
              if(type == 'Video'){
                setTimeout(function(){mediaManager.showUserVideos()},1000);
                if(message.includes('Invalid')){

                }else{
                  notification('Success, '+message);
                }
              }
            }
          }

          mediaManager.updateStorageSpace(response.Storage);

        }
      });
    }

  }

  showUserImages(forElement){

    $("#bg-image-manager-images-box").empty();

    for(var i = 0; i < user_images.length; i++){

      var image = document.createElement('img');
      image.src = 'http://localhost:8000/api/assets/'+user_images[i].path;
      image.setAttribute("data-title",user_images[i].name);
      image.setAttribute("data-size",user_images[i].size);
      image.setAttribute("data-image-title",user_images[i].title);
      image.setAttribute("data-description",user_images[i].description);
      image.setAttribute("data-m-id",user_images[i].id);

      image.id = randomize.elementId(5);

      var div = document.createElement('div');

      var span = document.createElement('span');

      if(user_images[i].title == null || user_images[i].title == ""){
      	if(user_images[i].name.length > 15){
      		span.innerText = user_images[i].name.substring(0,15)+"...";
        }else{
      		span.innerText = user_images[i].name;
      	}
      }else{
      	if(user_images[i].title !== null && user_images[i].title !== ""){
      		if(user_images[i].title.length > 15){
      			span.innerText = user_images[i].title.substring(0,15)+"...";
      		}else{
      			span.innerText = user_images[i].title;
      		}
      	}
      }

      (function(span,image){
      	  span.addEventListener('mouseover',function(e){
      	    mediaManager.showImageInfo(e,image);
          });

          span.addEventListener('mouseout',function(){
      	    mediaManager.hideImageInfo(image);
          });
      })(span,image);

      var editicon = document.createElement('i');
      editicon.className = 'fas fa-pen';

      (function(image,editicon,i){
          editicon.addEventListener('click',function(){
            mediaEditor.open("image",image);
          });
      })(image,editicon,i);

      var deleteicon = document.createElement('i');
      deleteicon.className = 'fas fa-trash';

      (function(user_images,deleteicon,i){
          deleteicon.addEventListener('click',function(){
            mediaManager.deleteMedia(user_images[i].id,'Image');
          });
      })(user_images,deleteicon,i);

      div.appendChild(image);
      div.appendChild(span);
      div.appendChild(deleteicon);
      div.appendChild(editicon);

      if(document.getElementsByClassName('selElForImgPik')[0]){
      	(function(div,image){
          div.addEventListener('click',function(){
          	if(document.getElementsByClassName('selElForImgPik')[0]){
          		document.getElementsByClassName('selElForImgPik')[0].setAttribute('src',image.src);
          		if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
          			document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src',image.src);
          		}
          	}
          });
        })(div,image);
      }else{
      	if($(document.getElementsByClassName("selected")[0]).attr("data-e-type") == 'video'){
          (function(div,image){
            div.addEventListener('click',function(){
              document.getElementsByClassName('selected')[0].setAttribute('poster',image.src);
            });
          })(div,image);
        }else{
          (function(div,image){
            div.addEventListener('click',function(){
              document.getElementsByClassName('selected')[0].src = image.src;
            });
          })(div,image);
        }
      }

      document.getElementById("bg-image-manager-images-box").appendChild(div);

    }

  }

  showUserVideos(forElement){

    $("#videoManager-videos-box").empty();

    if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-player') || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-playlist')){

      for(var i = 0; i < user_videos.length; i++){

      	var title = user_videos[i].title;
      	var description = user_videos[i].description;

      	if(title == null){
      		title == "";
      	}

      	if(description == null){
      		description == "";
      	}

        var image = document.createElement('img');
        image.src = 'http://localhost:8000/api/assets/'+user_videos[i].thumbnail;
        image.setAttribute("data-title",user_videos[i].name);
        image.setAttribute("data-size",user_videos[i].size);
        image.setAttribute("data-video-url",user_videos[i].path);
        image.setAttribute("data-video-title",title);
        image.setAttribute("data-video-des",description);
        image.setAttribute("data-m-id",user_videos[i].id);
        image.setAttribute("data-video-len",user_videos[i].length);
        //image.setAttribute("data-video-thumbnail",response.items[i].snippet.thumbnails.high.url);
        //image.setAttribute("alt","");

        image.id = randomize.elementId(5);

        image.addEventListener('click',VideoManager.changeVideo);

        var div = document.createElement('div');

        var span = document.createElement('span');

        if(title == null || title == ""){
        	if(user_videos[i].name.length > 15){
      		    span.innerText = user_videos[i].name.substring(0,15)+"...";
            }else{
      		    span.innerText = user_videos[i].name;
      	    }
        }else{
      	    if(title !== null && title !== ""){
      		    if(title.length > 15){
      			    span.innerText = title.substring(0,15)+"...";
      		    }else{
      			    span.innerText = title;
      		    }
      	    }
        }

        (function(span,image){
      	  span.addEventListener('mouseover',function(e){
      	    VideoManager.showVideoInfo(e,image);
          });

          span.addEventListener('mouseout',function(){
      	    VideoManager.hideVideoInfo(image);
          });
        })(span,image);

        var editicon = document.createElement('i');
        editicon.className = 'fas fa-pen';

        (function(image,editicon,i){
          editicon.addEventListener('click',function(){
            mediaEditor.open("video",image);
          });
        })(image,editicon,i);

        var deleteicon = document.createElement('i');
        deleteicon.className = 'fas fa-trash';

        (function(user_videos,deleteicon,i){
          deleteicon.addEventListener('click',function(){
            mediaManager.deleteMedia(user_videos[i].id,'Video');
          });
        })(user_videos,deleteicon,i);

        div.appendChild(image);
        div.appendChild(span);
        div.appendChild(editicon);
        div.appendChild(deleteicon);

        if(document.getElementsByClassName('selElForVidPik')[0]){
      	    (function(div,image,forElement){
                div.addEventListener('click',function(){
          	      if(document.getElementsByClassName('selElForVidPik')[0]){
          		    document.getElementsByClassName('selElForVidPik')[0].setAttribute("data-vid-url",'http://localhost:8000/api/assets/'+$(image).attr('data-video-url'));
          		    document.getElementsByClassName('selElForVidPik')[0].getElementsByTagName("img")[0].src = image.src;
          		    document.getElementsByClassName('selElForVidPik')[0].setAttribute("data-title",image.getAttribute("data-video-title"));
          		    document.getElementsByClassName('selElForVidPik')[0].setAttribute("data-description",image.getAttribute("data-video-des"));
          		    forElement.innerText = image.getAttribute("data-video-title");
          		    if(document.getElementsByClassName('selElForVidPik_invoker')[0]){
          			    document.getElementsByClassName('selElForVidPik_invoker')[0].setAttribute('src',image.src);
          			    document.getElementsByClassName('selElForVidPik_invoker')[0].parentElement.parentElement.getElementsByTagName("td")[1].innerText = image.getAttribute("data-video-title");
          		    }
          	      }
                });
            })(div,image,forElement);
        }else{
        	if($(document.getElementsByClassName("selected")[0]).attr("data-e-type").includes('video-player')){
                (function(div,image){
                    div.addEventListener('click',function(){
                        document.getElementsByClassName('selected')[0].getElementsByTagName("video")[0].src = 'http://localhost:8000/api/assets/'+$(image).attr('data-video-url');
                        document.getElementsByClassName('selected')[0].getElementsByClassName("video-player-thumb")[0].setAttribute("src",image.src);

                        document.getElementsByClassName('selected')[0].getElementsByClassName("video-info")[0].getElementsByClassName("heading")[0].innerText = image.getAttribute("data-video-title");
                        document.getElementsByClassName('selected')[0].getElementsByClassName("video-info")[0].getElementsByClassName("description")[0].innerText = image.getAttribute("data-video-des");

                        document.getElementsByClassName('selected')[0].setAttribute("data-title",image.getAttribute("data-video-title"));
                        document.getElementsByClassName('selected')[0].setAttribute("data-description",image.getAttribute("data-video-des"));

                        document.getElementsByClassName('selected')[0].getElementsByTagName("video")[0].setAttribute("data-len",image.getAttribute("data-video-len"));

                        if(document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0]){
                       	    document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText = image.getAttribute("data-video-title");

                       	    if(image.getAttribute("data-video-title").length >= 10){
    						    document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "35px";
    					    }else{
    						    if(image.getAttribute("data-video-title").length < 10){
    							    document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "50px";
    						    }
    					    }
                        }

                    });
                })(div,image);
            }else{
            	(function(div,image){
                    div.addEventListener('click',function(){
                      document.getElementsByClassName('selected')[0].src = 'http://localhost:8000/api/assets/'+$(image).attr('data-video-url');
                      document.getElementsByClassName('selected')[0].setAttribute("poster",image.src);
                    });
                })(div,image);
            }
        }

        document.getElementById("videoManager-videos-box").appendChild(div);

      }

    }

  }

}

//------------------------------------------------------------------

var mediaManager = new userMediaManager;

//------------------------------------------------------------------

class elementsEditor{
  constructor(){}

  show(){
    var editor = document.createElement('div');
    editor.className = 'elementEditor';
    editor.addEventListener('mousedown',elementEditor.mousedown);

    var heading = document.createElement('p');
    heading.innerText = 'Element Editor';
    heading.className = 'heading';

    close = document.createElement('i');
    close.setAttribute('class','fas fa-times close');
    close.addEventListener('click',function(){
        elementEditor.close();
    });

    editor.appendChild(heading);
    editor.appendChild(close);
    body.appendChild(editor);

    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'image'){
      var isrc = element.src;

      if(isrc.includes('http://localhost:8000/api/assets/')){
        isrc = isrc.split('http://localhost:8000/api/assets/')[1];
      }

      elementEditor.addTextBox('Image URL','Enter your image url here...',isrc,'The Image URL is the address that points to a image on the internet.');
    }

    if(elementType == 'video-overlay' || elementType == 'video'){
      //elementEditor.addTextBox('Video URL','Enter your video url here...',element.src,'The Video URL is the address that points to a video on the internet.');
      //var videoPlayer = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
      //elementEditor.addTextBox('Thumbnail URL','Enter your custom thumbnail image url here...',$(videoPlayer).attr('data-thumbnail'),'A thumbnail image is the first thing that most people see when they interact with a video.They give viewers a preview of the video content.');
    }

    if(elementType == 'heading' || elementType == 'paragraph' || elementType == 'div' || elementType == 'button'){
      elementEditor.addTextBox('Text','Enter your text here...',element.innerText,'Enter the text you want to display in the element.');
    }

    if(elementType == 'textinput' || elementType == 'textarea'){
      elementEditor.addTextBox('Text','Enter your text here...',element.value,'Enter the text you want to display in the element, placeholder text is shown if the input field is empty.');
      elementEditor.addTextBox('Placeholder','Enter placeholder text here...','','Placeholder specifies a short hint that describes the expected value of an input field.The short hint is displayed in the input field before the user enters a value.');
    }

    if(elementType.includes("video-player")){
    	//elementEditor.addDataAttrTextBox('Title','Enter the title you want to display in the video..',element.getAttribute("data-title"),'Enter the title you want to display in the video.','data-title',0);
    	//elementEditor.addDataAttrTextBox('Description','Enter the description you want to display in the video..',element.getAttribute("data-description"),'Enter the description you want to display in the video.','data-description',0);
    }

    if(elementType == "checkbox-multi-one" || elementType == "checkbox-multi-two"){
    	elementEditor.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display in the box.');

        var t1_id = randomize.elementId(10);
        elementEditor.addTable('Manage Checkboxes',t1_id,'checkbox-multi');

        var checkboxes = element.getElementsByClassName('checkbox');

        for(var i=0; i < checkboxes.length; i++){
          var values = [checkboxes[i].getElementsByTagName("p")[0].innerText+'/'];
          elementEditor.addTableRow(t1_id,values,checkboxes[i].getElementsByTagName("p")[0],25,'innerText','checkbox-multi');
        }

    }else{
    	if(elementType.includes("checkbox")){
    	    elementEditor.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display beside the checkbox.');
        }
    }

    if(elementType.includes("toggle-switch")){
    	elementEditor.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display beside the toggle switch.');
    }

    if(elementType.includes("ratings")){
    	elementEditor.addIconPicker(element.getElementsByTagName("i"),"ratings");

    	if(elementType.includes("two")){
    		elementEditor.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display.');
    	}
    }

    if(elementType.includes("textbox")){

    	if(element.getAttribute("data-i-state") == 1){
    		elementEditor.addIconPicker(element.getElementsByClassName("icon-wrapper")[0].getElementsByTagName("i")[0],"textbox");
    	}

    	if(elementType.includes("textbox-two") || elementType.includes("textbox-one")){
    	    elementEditor.addTextBox('Text','Enter your text here...',element.getElementsByTagName("label")[0].innerText,'Enter the text you want to display above the textbox.');
    	}

    	elementEditor.addTextBox('Placeholder','Enter placeholder text here...',element.getElementsByTagName("input")[0].getAttribute("placeholder"),'Placeholder specifies a short hint that describes the expected value of an input field.The short hint is displayed in the input field before the user enters a value.');
    	elementEditor.addDataAttrTextBox('Maximum Characters','Enter the maximum number of characters can be entered in the textbox.',element.getAttribute("data-max-length"),'Limit the number of characters can be entered in the textbox.','data-max-length',1);
    }

    if(elementType.includes("dropdown-list")){
    	elementEditor.addTextBox("Text","Enter your text here...",element.getElementsByClassName("selected_option")[0].getElementsByTagName("span")[0].innerText.split(":")[0],"Enter the text you want to display on the drop down list.");

    	var t1_id = randomize.elementId(10);
        elementEditor.addTable('Manage Options',t1_id,'dropdown-list');

        var options = element.getElementsByClassName('options')[0].getElementsByTagName("ul")[0].getElementsByTagName("li");

        for(var i=0; i < options.length; i++){
          var values = [options[i].getElementsByTagName("a")[0].innerText+'/'];
          elementEditor.addTableRow(t1_id,values,options[i].getElementsByTagName("a")[0],15,'innerText','dropdown-list');
        }
    }

    if(elementType == 'navbar'){
      var t1_id = randomize.elementId(10);
      elementEditor.addTable('Manage Links',t1_id,'navbar');

      var lis = element.getElementsByTagName('a');

      for(var i=0; i < lis.length; i++){
        var values = [$(lis[i]).attr('data-page-name'), lis[i].innerText+'/'];
        elementEditor.addTableRow(t1_id,values,lis[i],15,'innerText','navbar');
      }

    }

    if(elementType.includes('gallery')){
      var t1_id = randomize.elementId(10);
      elementEditor.addTable('Manage Images',t1_id,'gallery');

      var imgs = element.getElementsByTagName('img');

      for(var i=0; i < imgs.length; i++){
        var values = [$(imgs[i]).attr('data-description')+'/'];
        elementEditor.addTableRow(t1_id,values,imgs[i],50,'data-description','gallery',element);
      }

      //elementEditor.addTableIncrementRow(t1_id,'gallery','-');
    }

    if(elementType.includes('slider')){
      var t1_id = randomize.elementId(10);
      elementEditor.addTable('Manage Images',t1_id,'slider');

      var imgs = element.getElementsByTagName('img');

      for(var i=0; i < imgs.length; i++){
        var values = [$(imgs[i]).attr('data-description')+'/'];
        elementEditor.addTableRow(t1_id,values,imgs[i],50,'data-description','slider',element);
      }

      //elementEditor.addTableIncrementRow(t1_id,'slider','-');
    }

    if(elementType.includes('viewer')){
      var t1_id = randomize.elementId(10);
      elementEditor.addTable('Manage Images',t1_id,'viewer');

      var imgs = element.getElementsByClassName('image-viewer-thumbnails')[0].getElementsByTagName('img');

      for(var i=0; i < imgs.length; i++){
        var values = [$(imgs[i]).attr('data-description')+'/'];
        elementEditor.addTableRow(t1_id,values,imgs[i],50,'data-description','viewer');
      }

      //elementEditor.addTableIncrementRow(t1_id,'viewer','Title');
    }

    if(elementType.includes("video-playlist")){
    	if(elementType == "video-playlist-one"){
    		elementEditor.addTextBox('Title','Enter your playlist title here...',element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("heading")[0].innerText,'Enter the title you want to display on the playlist.');
    		elementEditor.addTextBox('Description','Enter your playlist description here...',element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("description")[0].innerText,'Enter the description you want to display on the playlist.');

    		var t1_id = randomize.elementId(10);
            elementEditor.addTable('Manage Videos',t1_id,'video-playlist');

            var listitems = element.getElementsByClassName('playlist-list')[0].getElementsByClassName("playlist-list-item");

            for(var i=0; i < listitems.length; i++){
              var values = [listitems[i].getElementsByTagName("p")[0].innerText];
              elementEditor.addTableRow(t1_id,values,listitems[i].getElementsByTagName("p")[0],25,'innerText','video-playlist');
            }

    	}
    }

  }

  close(){
    document.getElementsByClassName('elementEditor')[0].remove();
  }

  drag(e){
    var elmnt = document.getElementsByClassName('elementEditor')[0];
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    elementEditor_pos1 = elementEditor_pos3 - e.clientX;
    elementEditor_pos2 = elementEditor_pos4 - e.clientY;
    elementEditor_pos3 = e.clientX;
    elementEditor_pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - elementEditor_pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - elementEditor_pos1) + "px";
    elmnt.style.cursor = 'grabbing';
  }

  mousedown(e){
    var elmnt = document.getElementsByClassName('elementEditor')[0];
    if(e.target == elmnt){
      e = e || window.event;
      e.preventDefault();

      elmnt.style.cursor = 'grab';

      // get the mouse cursor position at startup:
      elementEditor_pos3 = e.clientX;
      elementEditor_pos4 = e.clientY;
      document.onmouseup = elementEditor.closeDrag;

      // call a function whenever the cursor moves:
      document.onmousemove = elementEditor.drag;
    }
  }

  closeDrag(){
    var elmnt = document.getElementsByClassName('elementEditor')[0];
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor = 'default';
  }

  addIconPicker(icon_element,forElement){
  	var elementEditor = document.getElementsByClassName("elementEditor")[0];

  	var button = document.createElement("button");
  	var i = document.createElement("i");

  	var inputHolder = document.createElement("div");
  	inputHolder.className = "inputHolder";

  	if(forElement == "ratings"){
  		button.innerText = "Change Shape";
  		i.className = icon_element[0].className;
  	}else{
  		button.innerHTML = "Change Icon";
  		i.className = icon_element.className;
  	}

  	button.addEventListener("click",function(e){
  		fontAwesomeSelector.show(e,icon_element,forElement,i);
  	});

  	button.className = "change_icon_btn";
  	$(button).prepend(i);

  	inputHolder.appendChild(button);
  	elementEditor.appendChild(inputHolder);
  }

  addTableRow(tableId,values,elementToAffect,maxLength,propertyToAffect,forElement,forElementObject){

    var table = document.getElementById(tableId);

    /*if(addNewRowOption == 1){
       if(table){
         if(table.tagName == 'TABLE'){
          var row = document.createElement('tr');

          var icolumn = document.createElement('td');
          var i = document.createElement('i');
          i.className = 'fas fa-plus';
          i.style.color = 'darkgreen';

          i.addEventListener('click',function(){

          });

          icolumn.appendChild(i);
          row.appendChild(icolumn);

          table.getElementsByTagName('tbody')[0].appendChild(row);
         }
       }
    }else{*/

    if(table){
      if(table.tagName == 'TABLE'){

        var row = document.createElement('tr');

        var icolumn = document.createElement('td');

        var actions_column = document.createElement("td");

        if(forElement == 'navbar'){
        	var i = document.createElement('i');
            i.className = 'fab fa-font-awesome';
            i.style.color = '#228be6';

            i.addEventListener('click',function(e){
        	    fontAwesomeSelector.show(e,elementToAffect,"navbar",this);
            });

            if(elementToAffect.getElementsByTagName("i")[0]){
            	if(elementToAffect.getElementsByTagName("i")[0].className !== "fab fa-font-awesome"){
            		i.className = elementToAffect.getElementsByTagName("i")[0].className;
            	}
            }

        }else{
        	if(forElement == 'gallery' || forElement == 'slider'){
        		var i = document.createElement('img');
        		if(elementToAffect.src == null || elementToAffect.src == ''){
        			i.src = '../assets/images/icons/noimage.png';
        		}else{
        			i.src = elementToAffect.src;
        		}

                i.addEventListener('click',function(e){
                	if(document.getElementById('bg-image-manager')){
                		tools.exitTool('background-image');
                		$('.selElForImgPik').removeClass('selElForImgPik');
                		$('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                	}else{
                		$('.selElForImgPik').removeClass('selElForImgPik');
                		$('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                		elementToAffect.classList.add('selElForImgPik');
                		this.classList.add('selElForImgPik_invoker');
                		backgroundImageManager.open(e,elementToAffect);
                		tools.updateToolButton('background-image');
                	}
                });

                var actions_delete_span = document.createElement('span');
                actions_delete_span.style.position = "relative";

                var actions_delete_i = document.createElement('i');
                var actions_delete_tooltip = document.createElement('span');
                actions_delete_i.className = "fas fa-trash";
                actions_delete_i.style.color = "indianred";
                actions_delete_i.style.background = "transparent";

                actions_delete_tooltip.className = "tooltip";
                actions_delete_tooltip.innerText = "Delete Image";
                actions_delete_tooltip.style.left = "-105px";
                actions_delete_tooltip.style.top = "-2.5px";
                actions_delete_tooltip.style.width = "100px";
                actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                actions_delete_i.addEventListener("mouseover",function(){
                	actions_delete_tooltip.style.visibility = "visible";
                	actions_delete_tooltip.style.opacity = 1;
                });

                actions_delete_i.addEventListener("mouseout",function(){
                	actions_delete_tooltip.style.visibility = "hidden";
                	actions_delete_tooltip.style.opacity = 0;
                });

                actions_delete_i.addEventListener("click",function(){
                	row.remove();
                	elementToAffect.remove();
                	elementEditor.adjust_ImgSlider1_images_in_slides(forElementObject);
                });

                actions_delete_span.appendChild(actions_delete_i);
                actions_delete_span.appendChild(actions_delete_tooltip);
                actions_column.appendChild(actions_delete_span)
        	}else{
        		if(forElement == 'viewer'){

        			var i = document.createElement('img');
        			if(elementToAffect.src == null || elementToAffect.src == ''){
        				i.src = '../assets/images/icons/noimage.png';
        			}else{
        				i.src = elementToAffect.src;
        			}

        			i.addEventListener('click',function(e){
                	  if(document.getElementById('bg-image-manager')){
                		tools.exitTool('background-image');
                		$('.selElForImgPik').removeClass('selElForImgPik');
                		$('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                	  }else{
                		$('.selElForImgPik').removeClass('selElForImgPik');
                		$('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                		elementToAffect.classList.add('selElForImgPik');
                		this.classList.add('selElForImgPik_invoker');
                		backgroundImageManager.open(e,elementToAffect);
                		tools.updateToolButton('background-image');
                	  }
                    });

                    var actions_delete_span = document.createElement('span');
                    actions_delete_span.style.position = "relative";

                    var actions_delete_i = document.createElement('i');
                    var actions_delete_tooltip = document.createElement('span');
                    actions_delete_i.className = "fas fa-trash";
                    actions_delete_i.style.color = "indianred";
                    actions_delete_i.style.background = "transparent";

                    actions_delete_tooltip.className = "tooltip";
                    actions_delete_tooltip.innerText = "Delete Image";
                    actions_delete_tooltip.style.left = "-105px";
                    actions_delete_tooltip.style.top = "-2.5px";
                    actions_delete_tooltip.style.width = "100px";
                    actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                    actions_delete_i.addEventListener("mouseover",function(){
                	    actions_delete_tooltip.style.visibility = "visible";
                	    actions_delete_tooltip.style.opacity = 1;
                    });

                    actions_delete_i.addEventListener("mouseout",function(){
                	    actions_delete_tooltip.style.visibility = "hidden";
                	    actions_delete_tooltip.style.opacity = 0;
                    });

                    actions_delete_i.addEventListener("click",function(){
                	    row.remove();
                	    elementToAffect.remove();
                    });

                    actions_delete_span.appendChild(actions_delete_i);
                    actions_delete_span.appendChild(actions_delete_tooltip);
                    actions_column.appendChild(actions_delete_span)
        		}else{
        			if(forElement == 'dropdown-list'){
        				var i = document.createElement('i');
            			i.className = 'fab fa-font-awesome';
            			i.style.color = '#228be6';

            			i.addEventListener('click',function(e){
        	    			fontAwesomeSelector.show(e,elementToAffect.parentElement.getElementsByTagName("span")[0],"dropdown-list",this);
            			});

            			if(elementToAffect.parentElement.getElementsByTagName("span")[0]){
            				if(elementToAffect.parentElement.getElementsByTagName("span")[0].getElementsByTagName("i")[0]){
            					if(elementToAffect.parentElement.getElementsByTagName("span")[0].getElementsByTagName("i")[0].className !== "fab fa-font-awesome"){
            					    i.className = elementToAffect.parentElement.getElementsByTagName("span")[0].getElementsByTagName("i")[0].className;
            				    }
            				}
                        }

            			var actions_delete_span = document.createElement('span');
                    	actions_delete_span.style.position = "relative";

                    	var actions_delete_i = document.createElement('i');
                    	var actions_delete_tooltip = document.createElement('span');
                    	actions_delete_i.className = "fas fa-trash";
                    	actions_delete_i.style.color = "indianred";
                    	actions_delete_i.style.background = "transparent";

                    	actions_delete_tooltip.className = "tooltip";
                    	actions_delete_tooltip.innerText = "Delete Option";
                    	actions_delete_tooltip.style.left = "-105px";
                    	actions_delete_tooltip.style.top = "-2.5px";
                    	actions_delete_tooltip.style.width = "100px";
                    	actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                    	actions_delete_i.addEventListener("mouseover",function(){
                	    	actions_delete_tooltip.style.visibility = "visible";
                	    	actions_delete_tooltip.style.opacity = 1;
                    	});

                    	actions_delete_i.addEventListener("mouseout",function(){
                	    	actions_delete_tooltip.style.visibility = "hidden";
                	    	actions_delete_tooltip.style.opacity = 0;
                    	});

                    	actions_delete_i.addEventListener("click",function(){
                	    	row.remove();
                	    	elementToAffect.parentElement.remove();
                    	});

                    	actions_delete_span.appendChild(actions_delete_i);
                    	actions_delete_span.appendChild(actions_delete_tooltip);
                    	actions_column.appendChild(actions_delete_span);

        			}else{
        				if(forElement == "checkbox-multi"){
        					var actions_delete_span = document.createElement('span');
                    		actions_delete_span.style.position = "relative";

                    		var actions_delete_i = document.createElement('i');
                    		var actions_delete_tooltip = document.createElement('span');
                    		actions_delete_i.className = "fas fa-trash";
                    		actions_delete_i.style.color = "indianred";
                    		actions_delete_i.style.background = "transparent";

                    		actions_delete_tooltip.className = "tooltip";
                    		actions_delete_tooltip.innerText = "Delete Checkbox";
                    		actions_delete_tooltip.style.left = "-105px";
                    		actions_delete_tooltip.style.top = "-2.5px";
                    		actions_delete_tooltip.style.width = "100px";
                    		actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                    		actions_delete_i.addEventListener("mouseover",function(){
                	    		actions_delete_tooltip.style.visibility = "visible";
                	    		actions_delete_tooltip.style.opacity = 1;
                    		});

                    		actions_delete_i.addEventListener("mouseout",function(){
                	    		actions_delete_tooltip.style.visibility = "hidden";
                	    		actions_delete_tooltip.style.opacity = 0;
                    		});

                    		actions_delete_i.addEventListener("click",function(){
                	    		row.remove();
                	    		elementToAffect.parentElement.remove();
                    		});

                    		actions_delete_span.appendChild(actions_delete_i);
                    		actions_delete_span.appendChild(actions_delete_tooltip);
                    		actions_column.appendChild(actions_delete_span);
        				}else{
        					if(forElement == "video-playlist"){
        						var i = document.createElement('img');
        						if(elementToAffect.parentElement.getElementsByTagName("img")[0].src == null || elementToAffect.parentElement.getElementsByTagName("img")[0].src == ''){
        							i.src = '../assets/images/icons/noimage.png';
        						}else{
        							i.src = elementToAffect.parentElement.getElementsByTagName("img")[0].src;
        						}

        						i.addEventListener('click',function(e){
                	  			if(document.getElementById('bg-image-manager')){
                					tools.exitTool('background-image');
                					$('.selElForVidPik').removeClass('selElForVidPik');
                					$('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                	  			}else{
                					$('.selElForVidPik').removeClass('selElForVidPik');
                					$('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                					elementToAffect.parentElement.classList.add('selElForVidPik');
                					this.classList.add('selElForVidPik_invoker');
                					VideoManager.open(e,elementToAffect);
                					tools.updateToolButton('video-manager');
                	  			}
                    			});

                    			var actions_delete_span = document.createElement('span');
                    			actions_delete_span.style.position = "relative";

                    			var actions_delete_i = document.createElement('i');
                    			var actions_delete_tooltip = document.createElement('span');
                    			actions_delete_i.className = "fas fa-trash";
                    			actions_delete_i.style.color = "indianred";
                    			actions_delete_i.style.background = "transparent";

                    			actions_delete_tooltip.className = "tooltip";
                    			actions_delete_tooltip.innerText = "Delete Video";
                    			actions_delete_tooltip.style.left = "-105px";
                    			actions_delete_tooltip.style.top = "-2.5px";
                    			actions_delete_tooltip.style.width = "100px";
                    			actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                    			actions_delete_i.addEventListener("mouseover",function(){
                	    			actions_delete_tooltip.style.visibility = "visible";
                	    			actions_delete_tooltip.style.opacity = 1;
                    			});

                    			actions_delete_i.addEventListener("mouseout",function(){
                	    			actions_delete_tooltip.style.visibility = "hidden";
                	    			actions_delete_tooltip.style.opacity = 0;
                    			});

                    			actions_delete_i.addEventListener("click",function(){
                	   			    row.remove();
                	   			    elementToAffect.parentElement.remove();
                    			});

                    			actions_delete_span.appendChild(actions_delete_i);
                    			actions_delete_span.appendChild(actions_delete_tooltip);
                    			actions_column.appendChild(actions_delete_span)
        					}else{

        					}
        				}
        			}
        		}
        	}
        }

        if(forElement !== "checkbox-multi"){
        	icolumn.appendChild(i);
            row.appendChild(icolumn);
        }

        for(var i=0; i < values.length; i++){
          var column = document.createElement('td');

          if(values[i].charAt(values[i].length - 1) == '/'){
            column.innerText = values[i].split('/')[0];
            column.setAttribute("contenteditable","true");

            column.addEventListener('keydown',function(e){
              if(e.which != 8 && this.innerText.length > maxLength){
                e.preventDefault();
              }else{
                if(propertyToAffect == 'innerText'){
                  elementToAffect.innerText = this.innerText;
                }else{
                	if(propertyToAffect == 'data-description'){
                		elementToAffect.setAttribute('data-description',this.innerText);
                	}
                }
              }
            });

            column.addEventListener('keyup',function(e){
              if(e.which != 8 && this.innerText.length > maxLength){
                e.preventDefault();
              }else{
                if(propertyToAffect == 'innerText'){
                  elementToAffect.innerText = this.innerText;
                }else{
                	if(propertyToAffect == 'data-description'){
                		elementToAffect.setAttribute('data-description',this.innerText);
                	}
                }
              }
            });

          }else{
            column.innerText = values[i];
          }

          row.appendChild(column);
        }

        row.appendChild(actions_column);

        table.getElementsByTagName('tbody')[0].appendChild(row);
      }
    }

    //}

  }

  addTableIncrementRow(tableId,forElement,editableValue){

  	var table = document.getElementById(tableId);
  	var element = document.getElementsByClassName('selected')[0];

  	var newRow_row = document.createElement('tr');
    var newRow_c1 = document.createElement('td');
    var newRow_c2 = document.createElement('td');
    newRow_c2.innerText = editableValue;
    newRow_c2.setAttribute('contenteditable','');

  	if(table){
  		if(table.tagName == 'TABLE'){
        	if(forElement == 'viewer' || forElement == 'gallery' || forElement == 'slider'){

        		var i = document.createElement('img');
        		i.src = '../assets/images/icons/noimage.png';

        		i.addEventListener('click',function(e){

                 if(document.getElementById('bg-image-manager')){
                  tools.exitTool('background-image');
                  $('.selElForImgPik').removeClass('selElForImgPik');
                  $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                 }else{
                  var elementToAffect = document.createElement('img');
        		  elementToAffect.src = '../assets/images/icons/noimage.png';

        		  if(forElement == 'viewer'){
        		  	var title = element.getElementsByClassName('image-view')[0].getElementsByTagName('span')[0];
  	                var viewer_image = element.getElementsByClassName('image-view')[0].getElementsByTagName('img')[0];
        		  	elementToAffect.setAttribute('data-description','Title');
      			    elementToAffect.addEventListener('click',function(e){
      				  publicEvents.changeImageViewerImage(e,viewer_image,title);
      			    });
        		  }else{
        			if(forElement == 'gallery' || forElement == 'slider'){
        				elementToAffect.setAttribute('data-description','-');
        				elementToAffect.addEventListener('mouseover',publicEvents.galleryImgDescription_show);
      			        elementToAffect.addEventListener('mouseout',publicEvents.galleryImgDescription_hide);
        			}
        		  }

      			  newRow_c2.addEventListener('keyup',function(ev){
                    if(ev.which != 8 && this.innerText.length > 50){
                      ev.preventDefault();
                    }else{
                      elementToAffect.setAttribute('data-description',this.innerText);
                    }
                  });

                  if(forElement == 'viewer'){
        		  	if(element.getElementsByClassName('image-viewer-thumbnails')[0]){
        			  element.getElementsByClassName('image-viewer-thumbnails')[0].appendChild(elementToAffect);
        			  elementEditor.addTableIncrementRow(tableId,forElement,editableValue);
        		    }
        		  }else{
        			if($(element).attr('data-e-type').includes('slider')){
        				if($(element).attr('data-e-type') == "image-slider-one"){
        					if(ImgSlider1_ImgSlideDivisions.includes(publicEvents.count_ImgSlider1Images(element))){
        						var allImages = element.getElementsByTagName("img");

        						var newImgSlide = document.createElement("div");
        						newImgSlide.className = "imgSlide";

        						elementToAffect.id = "image-"+randomize.elementId(25);
      			                elementToAffect.setAttribute("data-no",Number(allImages[allImages.length-1].getAttribute("data-no"))+1);
      			                elementToAffect.style.left = (Number(elementToAffect.style.left.replace("px","")) + 30) + "px";

        						newImgSlide.appendChild(elementToAffect);

        						newImgSlide.setAttribute("data-restrictions","selection");

        						newImgSlide.addEventListener("click",function(){
      							    site.selectElement(element);
      						    });

        						element.appendChild(newImgSlide);

        						element.setAttribute("data-total",Number(element.getAttribute("data-total"))+1);
        						elementEditor.addTableIncrementRow(tableId,forElement,editableValue);
        					}else{
        						var allSlides = element.getElementsByClassName("imgSlide");
        						var lastSlide = allSlides[allSlides.length-1];

        						if(allSlides.length !== 0 && lastSlide){
        							var allImagesOfLastSlide = lastSlide.getElementsByTagName("img");
        						    var lastImage = allImagesOfLastSlide[allImagesOfLastSlide.length-1];

        						    elementToAffect.id = "image-"+randomize.elementId(25);
      			                    elementToAffect.setAttribute("data-no",Number(lastImage.getAttribute("data-no"))+1);
      			                    elementToAffect.style.left = (Number(lastImage.style.left.replace("px","")) + 15) + "px";

      			                    lastSlide.appendChild(elementToAffect);
      			                    elementEditor.addTableIncrementRow(tableId,forElement,editableValue);
        						}else{
        							var allImages = element.getElementsByTagName("img");

        							var newImgSlide = document.createElement("div");
        							newImgSlide.className = "imgSlide active";

        							elementToAffect.id = "image-"+randomize.elementId(25);

        							if(allImages.length == 0){
        								elementToAffect.setAttribute("data-no",1);
        							}else{
        								elementToAffect.setAttribute("data-no",Number(allImages[allImages.length-1].getAttribute("data-no"))+1);
        							}

      			                	elementToAffect.style.left = (Number(elementToAffect.style.left.replace("px","")) + 30) + "px";

        							newImgSlide.appendChild(elementToAffect);

        							newImgSlide.setAttribute("data-restrictions","selection");

        							newImgSlide.addEventListener("click",function(){
      							    	site.selectElement(element);
      						    	});

        							element.appendChild(newImgSlide);
        							element.setAttribute("data-total",Number(element.getAttribute("data-total"))+1)

        							elementEditor.addTableIncrementRow(tableId,forElement,editableValue);
        						}
        					}
        				}
        		    }else{
        		    	if($(element).attr('data-e-type').includes('gallery')){
                            if($(element).attr('data-e-type') == "image-gallery-one" || $(element).attr('data-e-type') == "image-gallery-two"){
                                var totalImages = element.getElementsByTagName("img").length;
                                var newImageNumber = totalImages+1;

                                if(ImgGallery1And2_ImgRowEndNumbers.includes(newImageNumber)){
                                    // Row End
                                    // Don't add Margin Right
                                }else{
                                    elementToAffect.style.marginRight = "15px";
                                }

                                elementToAffect.id = "image-"+randomize.elementId(25);
                                elementToAffect.setAttribute("data-no",newImageNumber);

                                element.appendChild(elementToAffect);
                                elementEditor.addTableIncrementRow(tableId,forElement,editableValue);
                            }else{
                                if($(element).attr('data-e-type') == "image-gallery-three"){
                                    var totalImages = element.getElementsByTagName("img").length;
                                    var newImageNumber = totalImages+1;

                                    if(ImgGallery3_ImgRowEndNumbers.includes(newImageNumber)){
                                        // Row End
                                        // Don't add Margin Right
                                    }else{
                                        elementToAffect.style.marginRight = "15px";
                                    }

                                    elementToAffect.id = "image-"+randomize.elementId(25);
                                    elementToAffect.setAttribute("data-no",newImageNumber);

                                    element.appendChild(elementToAffect);
                                    elementEditor.addTableIncrementRow(tableId,forElement,editableValue);
                                }else{
                                    element.appendChild(elementToAffect);
                                    elementEditor.addTableIncrementRow(tableId,forElement,editableValue);
                                }
                            }
        		    	}
        		    }
        		  }

                  $('.selElForImgPik').removeClass('selElForImgPik');
                  $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                  elementToAffect.classList.add('selElForImgPik');
                  this.classList.add('selElForImgPik_invoker');
                  backgroundImageManager.open(e,elementToAffect);
                  tools.updateToolButton('background-image');
                 }
                }); // end icon event click
        	} // End for gallery , slider and viewer here.

        	newRow_c1.appendChild(i);

            newRow_row.appendChild(newRow_c1);
            newRow_row.appendChild(newRow_c2);

      	    table.getElementsByTagName('tbody')[0].appendChild(newRow_row);
  		}
  	}
  }

  addTable(heading,tableId,forElement){

  	var addNote = 0;
  	var addRowButton = 0;
  	var note;

  	var p = document.createElement('p');
    p.innerText = heading;
    p.className = 'optionHeading';

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    var thead_row = document.createElement('tr');

  	if(forElement == 'navbar'){
      var thead_row_c_1 = document.createElement('th');
      var thead_row_c_2 = document.createElement('th');
      var thead_row_c_3 = document.createElement('th');

      thead_row_c_1.innerText = 'Page';
      thead_row_c_2.innerText = 'Text';
      thead_row_c_3.innerText = 'Icon';

      thead_row_c_3.style.width = '15%';

      thead_row.appendChild(thead_row_c_3);
      thead_row.appendChild(thead_row_c_1);
      thead_row.appendChild(thead_row_c_2);

      table.className = 'navbarManagerTable';
  	}else{
  		if(forElement == 'gallery' || forElement == 'viewer' || forElement == 'slider'){
  			var thead_row_c_1 = document.createElement('th');
            var thead_row_c_2 = document.createElement('th');
            var thead_row_c_3 = document.createElement('th');

            thead_row_c_1.innerText = 'Image';
            thead_row_c_2.innerText = 'Description';
            thead_row_c_3.innerText = 'Actions';

            thead_row_c_1.style.width = '25%';
            thead_row_c_2.style.width = '50%';
            thead_row_c_3.style.width = '25%';

            thead_row.appendChild(thead_row_c_1);
            thead_row.appendChild(thead_row_c_2);
            thead_row.appendChild(thead_row_c_3);

            table.className = 'navbarManagerTable';
  		}else{
  			if(forElement == "dropdown-list"){
  				note = document.createElement("span");
  				note.innerText = "Adding icon will make option text align to left side."
  				note.className = "note";

  				addNote = 1;
  				addRowButton = 1;

  				var thead_row_c_1 = document.createElement('th');
                var thead_row_c_2 = document.createElement('th');
                var thead_row_c_3 = document.createElement('th');

                thead_row_c_1.innerText = 'Icon';
                thead_row_c_2.innerText = 'Name';
                thead_row_c_3.innerText = 'Actions';

                thead_row_c_1.style.width = '25%';
                thead_row_c_2.style.width = '50%';
                thead_row_c_3.style.width = '25%';

                thead_row.appendChild(thead_row_c_1);
                thead_row.appendChild(thead_row_c_2);
                thead_row.appendChild(thead_row_c_3);

                table.className = 'navbarManagerTable';
  			}else{
  				if(forElement == "checkbox-multi"){

  					addRowButton = 1;

  					var thead_row_c_1 = document.createElement('th');
                    var thead_row_c_2 = document.createElement('th');

                    thead_row_c_1.innerText = 'Text';
                    thead_row_c_2.innerText = 'Actions';

                    thead_row_c_1.style.width = '50%';
                    thead_row_c_2.style.width = '50%';

                    thead_row.appendChild(thead_row_c_1);
                    thead_row.appendChild(thead_row_c_2);

                    table.className = 'navbarManagerTable';
  				}else{
  					if(forElement == "video-playlist"){
  						addRowButton = 1;

  						var thead_row_c_1 = document.createElement('th');
                		var thead_row_c_2 = document.createElement('th');
                		var thead_row_c_3 = document.createElement('th');

                		thead_row_c_1.innerText = 'Video';
                		thead_row_c_2.innerText = 'Text';
                		thead_row_c_3.innerText = 'Actions';

                		thead_row_c_1.style.width = '25%';
                		thead_row_c_2.style.width = '50%';
                		thead_row_c_3.style.width = '25%';

                		thead_row.appendChild(thead_row_c_1);
                		thead_row.appendChild(thead_row_c_2);
                		thead_row.appendChild(thead_row_c_3);

                		table.className = 'navbarManagerTable';
  					}
  				}
  			}
  		}
  	}

  	thead.appendChild(thead_row);
    table.id = tableId;

  	table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementsByClassName('elementEditor')[0].appendChild(p);

    if(addNote == 1){
    	document.getElementsByClassName('elementEditor')[0].appendChild(note);
    }

    if(addRowButton == 1){
    	var newRowButton = document.createElement("span");
  	    var newRowButton_i = document.createElement("i");
  	    newRowButton_i.className = "fas fa-plus";
  	    newRowButton.className = "addRow";

  	    newRowButton.addEventListener("click",function(){
  	    	elementEditor.addNewRow();
  	    });

  	    newRowButton.appendChild(newRowButton_i);
    	table.appendChild(newRowButton);
    }

    document.getElementsByClassName('elementEditor')[0].appendChild(table);

  }

  addNewRow(){
  	var table = document.getElementsByClassName("elementEditor")[0].getElementsByTagName("table")[0];

  	var element = document.getElementsByClassName("selected")[0];
  	var elementType = element.getAttribute("data-e-type");

  	if(elementType.includes("dropdown-list")){
  		var totalOptions = element.getElementsByClassName("options")[0].getElementsByTagName("ul")[0].getElementsByTagName("li").length;

  		var option = document.createElement("li");
      	var option_a = document.createElement("a");

      	var option_span = document.createElement("span");

      	option_a.innerText = "Option "+(totalOptions);

      	(function(option,option_a,element){

      		if(element.getAttribute("data-e-type") === "dropdown-list-one"){
      			option_a.addEventListener("click",function(e){
      			    publicEvents.dropdownlist_option_click(element,e);
      		    });
      		}else{
      			if(element.getAttribute("data-e-type") === "dropdown-list-two"){
      				option_a.addEventListener("click",function(e){
      			        publicEvents.dropdownlist_multiselect_option_click(element,e);
      		        });
      			}
      		}

      		option_a.addEventListener("mouseover",function(){
      			publicEvents.dropdownlist_option_hover(option,option_a,element.getAttribute("data-option-bg-hv"),element.getAttribute("data-option-bg-hv-clr"));
      		});

      		option_a.addEventListener("mouseout",function(){
      			publicEvents.dropdownlist_option_hoverOut(option,option_a,element.getAttribute("data-option-bg"),element.getAttribute("data-option-bg-clr"));
      		});
      	})(option,option_a,element);

      	option.setAttribute("data-restrictions","selection");
      	option_a.setAttribute("data-restrictions","selection");

      	option.appendChild(option_a);
      	option.appendChild(option_span);

      	element.getElementsByClassName("options")[0].getElementsByTagName("ul")[0].appendChild(option);

      	// New element added.

      	// Adding new row:

      	var newRow = document.createElement("tr");

      	var i_column = document.createElement("td");
      	var middle_column = document.createElement("td");
      	var last_column = document.createElement("td");

      	var i = document.createElement('i');
        i.className = 'fab fa-font-awesome';
        i.style.color = '#228be6';

        i.addEventListener('click',function(e){
        	fontAwesomeSelector.show(e,option_span,"dropdown-list",this);
        });

        var actions_delete_span = document.createElement('span');
        actions_delete_span.style.position = "relative";

        var actions_delete_i = document.createElement('i');
        var actions_delete_tooltip = document.createElement('span');
        actions_delete_i.className = "fas fa-trash";
        actions_delete_i.style.color = "indianred";
        actions_delete_i.style.background = "transparent";

        actions_delete_tooltip.className = "tooltip";
        actions_delete_tooltip.innerText = "Delete Option";
        actions_delete_tooltip.style.left = "-105px";
        actions_delete_tooltip.style.top = "-2.5px";
        actions_delete_tooltip.style.width = "100px";
        actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

        actions_delete_i.addEventListener("mouseover",function(){
         actions_delete_tooltip.style.visibility = "visible";
         actions_delete_tooltip.style.opacity = 1;
        });

        actions_delete_i.addEventListener("mouseout",function(){
         actions_delete_tooltip.style.visibility = "hidden";
         actions_delete_tooltip.style.opacity = 0;
        });

        actions_delete_i.addEventListener("click",function(){
         newRow.remove();
         option.remove();
        });

        actions_delete_span.appendChild(actions_delete_i);
        actions_delete_span.appendChild(actions_delete_tooltip);

        middle_column.innerText = "Option "+totalOptions;
        middle_column.setAttribute("contenteditable","true");

        middle_column.addEventListener('keydown',function(e){
              if(e.which != 8 && this.innerText.length > maxLength){
                e.preventDefault();
              }else{
                option_a.innerText = this.innerText;
              }
        });

        middle_column.addEventListener('keyup',function(e){
              if(e.which != 8 && this.innerText.length > maxLength){
                e.preventDefault();
              }else{
                option_a.innerText = this.innerText;
              }
        });

        i_column.appendChild(i);
        last_column.appendChild(actions_delete_span);

        newRow.appendChild(i_column);
        newRow.appendChild(middle_column);
        newRow.appendChild(last_column);

        table.getElementsByTagName("tbody")[0].appendChild(newRow);
  	}else{
  		if(elementType.includes("checkbox-multi")){

  			var checkbox = document.createElement("div");

      		var span = document.createElement("span");
      		var p = document.createElement("p");
      		var checkmark = document.createElement("span");

      		span.setAttribute("data-bg","black");
      		span.setAttribute("data-bg-hv","grey");

      		span.style.backgroundColor = "black";

      		checkbox.setAttribute("data-checked","0");

      		var checkmarkShape = element.getAttribute("data-checkmark-shape");
      		if(checkmarkShape == "tick"){
      			checkmark.className = "checkmark tick-checkmark-disabled";
      		}else{
      			if(checkmarkShape == "circle"){
      				checkmark.className = "checkmark circle-checkmark circle-checkmark-disabled";
      			}else{
      				if(checkmarkShape == "square"){
      					checkmark.className = "checkmark square-checkmark square-checkmark-disabled";
      				}
      			}
      		}

      		checkbox.className = 'checkbox';
      		checkbox.setAttribute("data-restrictions","selection");

      		if(elementType.includes("checkbox-multi-one")){
      			(function(span,checkbox,checkmark){

                    (function(checkmark,span){
      	              checkmark.addEventListener("mouseover",function(){
      		              publicEvents.checkbox_hover(span);
      	              });

      		          checkmark.addEventListener("mouseout",function(){
      			          publicEvents.checkbox_hoverOut(span);
      		          });
                    })(checkmark,span);

                    (function(checkmark,checkbox){
      	              checkmark.addEventListener("click",function(){
      					    publicEvents.multi_checkbox_click(checkbox,element);
      			      });
                    })(checkmark,checkbox);

                })(span,checkbox,checkmark);
      		}else{
      			if(elementType.includes("checkbox-multi-two")){
      			    (function(span,checkbox,checkmark){

                        (function(checkmark,span){
      	                  checkmark.addEventListener("mouseover",function(){
      		                  publicEvents.checkbox_hover(span);
      	                  });

      		              checkmark.addEventListener("mouseout",function(){
      			              publicEvents.checkbox_hoverOut(span);
      		              });
                        })(checkmark,span);

                        (function(checkmark,checkbox){
      	                  checkmark.addEventListener("click",function(){
      					        publicEvents.multi_checkbox_two_click(checkbox,element);
      			          });
                        })(checkmark,checkbox);

                    })(span,checkbox,checkmark);
                }
      		}

            span.setAttribute("data-restrictions","selection");
            p.setAttribute("data-restrictions","selection");
            checkmark.setAttribute("data-restrictions","selection");

            p.innerText = "Checkbox";

            checkbox.appendChild(span);
            checkbox.appendChild(p);
            checkbox.appendChild(checkmark);

            element.appendChild(checkbox);

  			// Adding new row:

      	    var newRow = document.createElement("tr");

      	    var first_column = document.createElement("td");
      	    var last_column = document.createElement("td");

            var actions_delete_span = document.createElement('span');
            actions_delete_span.style.position = "relative";

            var actions_delete_i = document.createElement('i');
            var actions_delete_tooltip = document.createElement('span');
            actions_delete_i.className = "fas fa-trash";
            actions_delete_i.style.color = "indianred";
            actions_delete_i.style.background = "transparent";

            actions_delete_tooltip.className = "tooltip";
            actions_delete_tooltip.innerText = "Delete Checkbox";
            actions_delete_tooltip.style.left = "-105px";
            actions_delete_tooltip.style.top = "-2.5px";
            actions_delete_tooltip.style.width = "100px";
            actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

            actions_delete_i.addEventListener("mouseover",function(){
             actions_delete_tooltip.style.visibility = "visible";
             actions_delete_tooltip.style.opacity = 1;
            });

            actions_delete_i.addEventListener("mouseout",function(){
             actions_delete_tooltip.style.visibility = "hidden";
             actions_delete_tooltip.style.opacity = 0;
            });

            actions_delete_i.addEventListener("click",function(){
             newRow.remove();
             checkbox.remove();
            });

            actions_delete_span.appendChild(actions_delete_i);
            actions_delete_span.appendChild(actions_delete_tooltip);

            first_column.innerText = "Checkbox";
            first_column.setAttribute("contenteditable","true");

            first_column.addEventListener('keydown',function(e){
                  if(e.which != 8 && this.innerText.length > 25){
                    e.preventDefault();
                  }else{
                    p.innerText = this.innerText;
                  }
            });

            first_column.addEventListener('keyup',function(e){
                  if(e.which != 8 && this.innerText.length > 25){
                    e.preventDefault();
                  }else{
                    p.innerText = this.innerText;
                  }
            });

            last_column.appendChild(actions_delete_span);

            newRow.appendChild(first_column);
            newRow.appendChild(last_column);

            table.getElementsByTagName("tbody")[0].appendChild(newRow);
  		}else{
  			if(elementType.includes("video-playlist")){
  				var totalItems = (Number(element.getElementsByClassName("playlist-list")[0].getElementsByClassName("playlist-list-item").length)-1);

  				var item = document.createElement("div");
      			var img = document.createElement("img");
      			var p = document.createElement("p");

      			item.className = "playlist-list-item";
      			p.innerText = "Video Number #"+(Number(totalItems)+1);
      			img.src = "http://pngimg.com/uploads/google/google_PNG19635.png";

      			item.setAttribute("data-restrictions","selection");
      			img.setAttribute("data-restrictions","selection");
      			p.setAttribute("data-restrictions","selection");

      			item.appendChild(img);
      			item.appendChild(p);

      			var video = element.getElementsByClassName("playlist-player")[0].getElementsByTagName("video")[0];

      			(function(item,img,p,video){
      				item.addEventListener("click",function(){
      					publicEvents.videoPlaylistItemClick(item,video);
      				});

      				img.addEventListener("click",function(){
      					publicEvents.videoPlaylistItemClick(item,video);
      				});

      				p.addEventListener("click",function(){
      					publicEvents.videoPlaylistItemClick(item,video);
      				});
      			})(item,img,p,video);

      			element.getElementsByClassName("playlist-list")[0].appendChild(item);

  				// Adding new row:

      	        var newRow = document.createElement("tr");

      	        var i_column = document.createElement("td");
      	        var middle_column = document.createElement("td");
      	        var last_column = document.createElement("td");

      	        var i = document.createElement('img');
                i.src = "http://pngimg.com/uploads/google/google_PNG19635.png";

                i.addEventListener('click',function(e){
                	if(document.getElementById('bg-image-manager')){
                	    tools.exitTool('background-image');
                	    $('.selElForVidPik').removeClass('selElForVidPik');
                	    $('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                	 }else{
                	    $('.selElForVidPik').removeClass('selElForVidPik');
                	    $('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                	    item.classList.add('selElForVidPik');
                	    this.classList.add('selElForVidPik_invoker');
                	    VideoManager.open(e,p);
                	    tools.updateToolButton('video-manager');
                	}
                });

                var actions_delete_span = document.createElement('span');
                actions_delete_span.style.position = "relative";

                var actions_delete_i = document.createElement('i');
                var actions_delete_tooltip = document.createElement('span');
                actions_delete_i.className = "fas fa-trash";
                actions_delete_i.style.color = "indianred";
                actions_delete_i.style.background = "transparent";

                actions_delete_tooltip.className = "tooltip";
                actions_delete_tooltip.innerText = "Delete Video";
                actions_delete_tooltip.style.left = "-105px";
                actions_delete_tooltip.style.top = "-2.5px";
                actions_delete_tooltip.style.width = "100px";
                actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                actions_delete_i.addEventListener("mouseover",function(){
                    actions_delete_tooltip.style.visibility = "visible";
                    actions_delete_tooltip.style.opacity = 1;
                });

                actions_delete_i.addEventListener("mouseout",function(){
                    actions_delete_tooltip.style.visibility = "hidden";
                    actions_delete_tooltip.style.opacity = 0;
                });

                actions_delete_i.addEventListener("click",function(){
                    newRow.remove();
                    item.remove();
                });

                actions_delete_span.appendChild(actions_delete_i);
                actions_delete_span.appendChild(actions_delete_tooltip);

                middle_column.innerText = "Video Number #"+(Number(totalItems)+1);
                //middle_column.setAttribute("contenteditable","true");

                /*middle_column.addEventListener('keydown',function(e){
                    if(e.which != 8 && this.innerText.length > maxLength){
                        e.preventDefault();
                    }else{
                        p.innerText = this.innerText;
                    }
                });

                middle_column.addEventListener('keyup',function(e){
                    if(e.which != 8 && this.innerText.length > maxLength){
                        e.preventDefault();
                    }else{
                        p.innerText = this.innerText;
                    }
                });*/

                i_column.appendChild(i);
                last_column.appendChild(actions_delete_span);

                newRow.appendChild(i_column);
                newRow.appendChild(middle_column);
                newRow.appendChild(last_column);

                table.getElementsByTagName("tbody")[0].appendChild(newRow);
  			}else{

  			}
  		}
  	}
  }

  addDataAttrTextBox(labelText,placeholder,text,tooltipText,attrToUpdate,onlyNumericals){
  	var div = document.createElement('div');
    div.className = 'inputHolder';

    var label = document.createElement('span');
    label.innerText = labelText;
    label.className = 'label';

    var tooltip = document.createElement('span');
    tooltip.innerText = tooltipText;
    tooltip.className = 'tooltip';

    var icon = document.createElement('i');
    icon.className = 'fas fa-info';
    /*icon.addEventListener('mouseover',function(){
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });

    icon.addEventListener('mouseout',function(){
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });*/

    var input = document.createElement('input');
    input.type = 'text';

    input.setAttribute('placeholder',placeholder);
    input.value = text;

    if(attrToUpdate == "data-max-length"){
    	input.setAttribute("maxLength","5");
    }else{
    	if(attrToUpdate == "data-title"){
    		input.setAttribute("maxLength","25");
    	}else{
    		if(attrToUpdate == "data-description"){
    		    input.setAttribute("maxLength","5000");
    	    }
    	}
    }

    if(onlyNumericals == 1){
    	input.addEventListener('keypress',function(e){
    	    if(e.keyCode == 13){
    		    elementEditor.updateAttribute(attrToUpdate,e);
    	    }else{
    	        if(validate.isNumber(e) == false){
    			    e.preventDefault();
    			    return false;
    		    }else{
    			    if(validate.isNumber(e) == true){
    			        return true;
    		        }
    		    }
    	    }
        });
    }else{
    	input.addEventListener('input',function(e){
    		elementEditor.updateAttribute(attrToUpdate,e);
        });
    }

    div.appendChild(label);
    div.appendChild(icon);
    div.appendChild(tooltip);
    div.appendChild(input);

    document.getElementsByClassName('elementEditor')[0].appendChild(div);
  }

  addTextBox(labelText,placeholder,text,tooltipText){
    var div = document.createElement('div');
    div.className = 'inputHolder';

    var label = document.createElement('span');
    label.innerText = labelText;
    label.className = 'label';

    var tooltip = document.createElement('span');
    tooltip.innerText = tooltipText;
    tooltip.className = 'tooltip';

    var icon = document.createElement('i');
    icon.className = 'fas fa-info';
    icon.addEventListener('mouseover',function(){
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });

    icon.addEventListener('mouseout',function(){
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });

    var input = document.createElement('input');
    input.type = 'text';

    input.setAttribute('placeholder',placeholder);
    input.value = text;

    if(labelText == 'Text'){
      input.addEventListener('input',elementEditor.updateText);
    }

    if(labelText == 'Title'){
      input.addEventListener('input',elementEditor.updateTitle);
    }

    if(labelText == 'Description'){
      input.addEventListener('input',elementEditor.updateDescription);
    }

    if(labelText == 'Placeholder'){
      input.addEventListener('input',elementEditor.updatePlaceholder);
    }

    if(labelText == 'Image URL'){
      input.addEventListener('input',elementEditor.updateImageURL);
    }

    if(labelText == 'Video URL'){
      input.addEventListener('input',elementEditor.updateVideoURL);
    }

    if(labelText == 'Thumbnail Image'){
      input.addEventListener('input',elementEditor.updateThumbnail);
    }

    div.appendChild(label);
    div.appendChild(icon);
    div.appendChild(tooltip);
    div.appendChild(input);

    document.getElementsByClassName('elementEditor')[0].appendChild(div);
  }

  updateAttribute(attrToUpdate,e){
  	var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');
    var valueToSet = e.target.value;

    if(attrToUpdate == "data-max-length"){
    	if(elementType.includes("textbox")){
    		var input = element.getElementsByTagName("input")[0];
    		var lengthText = element.getElementsByClassName("inputLength")[0];

    		element.setAttribute("data-max-length",valueToSet);
    		input.setAttribute("maxlength",valueToSet);

    		if(input.value.length > valueToSet){
    			input.value = input.value.substring(0,valueToSet);
    			lengthText.innerText = valueToSet + "/" + valueToSet;
    		}else{
    			lengthText.innerText = input.value.length + "/" + valueToSet;
    		}

    	}
    }else{
    	if(attrToUpdate == "data-title"){
    		if(elementType.includes("video-player-two")){
    			element.setAttribute("data-title",valueToSet);

    			if(element.getElementsByClassName("video-cover")[0]){
    				if(element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0]){
    					element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText = valueToSet;
    					element.getElementsByClassName("video-info")[0].getElementsByClassName("heading")[0].innerText = valueToSet;

    					if(element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText.length >= 10){
    						element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "35px";
    					}else{
    						if(element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText.length < 10){
    							element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "50px";
    						}
    					}
    				}
    			}
    		}else{
    			if(elementType.includes("video-player-one")){
    				element.setAttribute("data-title",valueToSet);
    				element.getElementsByClassName("video-info")[0].getElementsByClassName("heading")[0].innerText = valueToSet;
    			}
    		}
    	}else{
    		if(attrToUpdate == "data-description"){
    			if(elementType.includes("video-player-two") || elementType.includes("video-player-one")){
    				element.setAttribute("data-description",valueToSet);
    				element.getElementsByClassName("video-info")[0].getElementsByClassName("description")[0].innerText = valueToSet;
    			}
    		}
    	}
    }

  }

  updateText(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'heading' || elementType == 'paragraph' || elementType == 'div' || elementType == 'button'){
      element.innerText = e.target.value;
    }

    if(elementType == 'textinput' || elementType == 'textarea'){
      element.value = e.target.value;
    }

    if(elementType.includes("textbox")){
    	element.getElementsByTagName("label")[0].innerText = e.target.value;
    }

    if(elementType.includes("ratings")){
    	element.getElementsByTagName("p")[0].innerText = e.target.value;
    }

    if(elementType.includes("dropdown-list")){
    	var selected = element.getAttribute("data-selected");
    	var seperator = ": ";
    	if(selected == null || selected == " "){
    		selected = "";
    		seperator = "";
    	}
    	element.getElementsByClassName("selected_option")[0].getElementsByTagName("span")[0].innerText = e.target.value+seperator+selected;
    	//publicEvents.dropdownlist_position_icons(element.getElementsByClassName("options")[0].getElementsByTagName("ul")[0],"left");
    }

    if(elementType.includes("checkbox-multi")){
    	element.getElementsByTagName("p")[0].innerText = e.target.value;
    }else{
    	if(elementType.includes('checkbox') || elementType.includes('toggle-switch')){
          element.getElementsByTagName("p")[0].innerText = e.target.value;
        }
    }

  }

  updateTitle(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == "video-playlist-one"){
    	element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("heading")[0].innerText = e.target.value;
    }
  }

  updateDescription(e){
  	var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == "video-playlist-one"){
    	element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("description")[0].innerText = e.target.value;
    }
  }

  updatePlaceholder(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'textinput' || elementType == 'textarea'){
      element.setAttribute('placeholder',e.target.value);
    }

    if(elementType.includes("textbox")){
    	element.getElementsByTagName("input")[0].setAttribute("placeholder",e.target.value);
    }
  }

  updateImageURL(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'image'){
      element.setAttribute('src',e.target.value);
    }
  }

  updateVideoURL(e){
    var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'video'){
      element.setAttribute('src',e.target.value);
    }
  }

  updateThumbnail(e){
    var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'video'){
      element.setAttribute('data-thumbnail',e.target.value);
    }
  }

  adjust_ImgSlider1_images_in_slides(sliderElement){
  	var allImages = sliderElement.getElementsByTagName("img");
  	var allSlides = sliderElement.getElementsByClassName("imgSlide");

  	var totalImages = allImages.length;
  	var totalSlides = allSlides.length;

  	var slidesNeeded = Math.ceil(totalImages/4); //Total Images Divided By Total Images Per Slide.

  	if(totalSlides == slidesNeeded){
  		return false;
  	}else{
  		if(totalSlides > slidesNeeded){

  			// Delete Empty Slides. -----

  			for(var i=0; i<allSlides.length; i++){
  				var slideImages = allSlides[i].getElementsByTagName("img");
  				var totalSlideImages = 0;

  				for(var o=0; o<slideImages.length; o++){
  					totalSlideImages += 1;
  				}

  				if(totalSlideImages == 0){
  					allSlides[i].remove();
  					sliderElement.setAttribute("data-total",Number(sliderElement.getAttribute("data-total"))-1);

  					for(var u=0; u<allSlides.length; u++){
  						allSlides[u].classList.remove("active");
  					}

  					allSlides[0].classList.add("active");
  					sliderElement.setAttribute("data-active",0);
   				}
  			}

  			// Deleted All Empty Slides Till Here. -----

  			// Complete All Half-Empty Slides And Delete Empty Slides. -----

  			var slidesWithSpaceEmpty = [];
  			var re_allSlides = sliderElement.getElementsByClassName("imgSlide");

  			for(var s=0; s<re_allSlides.length; s++){
  				var ImagesInSlide = re_allSlides[s].getElementsByTagName("img");
  				var TotalImagesInSlide = 0;

  				for(var si=0; si<ImagesInSlide.length; si++){
  					TotalImagesInSlide += 1;
  				}

  				if(TotalImagesInSlide < 4){
  					slidesWithSpaceEmpty.push(re_allSlides[s]);
  				}
  			}

  			console.log(slidesWithSpaceEmpty);

  			if(slidesWithSpaceEmpty.length > 0){
  				var currentSlide = 0;

  				if(currentSlide !== slidesWithSpaceEmpty.length){
  					elementEditor.shiftImgSlider1Images(slidesWithSpaceEmpty[currentSlide],slidesWithSpaceEmpty[currentSlide+1]);

  					console.log(currentSlide+"completed shifting images.");
  					currentSlide += 1;
  				}
  			}

  		}
  	}

  	console.log("Images: "+totalImages+" In Slides: "+totalSlides+". "+slidesNeeded+" Slides Needed");
  }

  shiftImgSlider1Images(slideOne,slideTwo){
  	var slideOneImages = slideOne.getElementsByTagName("img");
  	var slideTwoImages = slideTwo.getElementsByTagName("img");

  	var numberOfSlidesToPut = slideOneImages.length - slideTwoImages.length;

  	if(numberOfSlidesToPut !== 0 && slideOneImages.length < 4 && slideTwoImages.length >= 1){
  		console.log("passed criteria");
  		for(var i=0; i<numberOfSlidesToPut; i++){
  		    slideOne.appendChild(slideTwoImages[i]);
  		    console.log("appened img");
  	    }
  	}

  }

}

//------------------------------------------------------------------

var elementEditor = new elementsEditor;

//------------------------------------------------------------------

class elementOptions{
  constructor(){}

  editElement(e){
    var input = document.createElement('textarea');
    input.className = 'editField';
    input.style.resize = 'none';

    var element = document.getElementsByClassName('selected')[0];
    input.style.position = 'absolute';
    input.style.left = '50%';
    input.style.top = '50%';
    input.style.transform = 'translate(-50%,-50%)';
    input.style.fontSize = element.style.fontSize;
    input.style.fontFamily = element.style.fontFamily;
    input.value = element.value || element.innerText;

    //input.style.left = element.style.left;
    //input.style.top = element.style.top;
    input.style.width = '100%';
    input.style.maxHeight = 'unset';
    input.style.maxWidth = 'unset';
    input.style.minHeight = element.style.minHeight;
    //input.style.minWidth = element.style.minWidth;
    //input.style.transform = element.style.transform;
    input.style.height = '100%';
    input.style.paddingTop = element.style.paddingTop;
    input.style.paddingRight = element.style.paddingRight;
    input.style.paddingLeft = element.style.paddingLeft;
    input.style.paddingBottom = element.style.paddingBottom;

    element.appendChild(input);
    //element.innerText = '';

    input.addEventListener('contextmenu',function(e){
        newelement.innerText = this.value;
        this.remove();
    });
  }

  showControls(e){
    //var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
    var element = document.getElementsByClassName('selected')[0];

    if($(element).attr('data-e-type') == 'video'){
      if($(element).attr('controls')){
        element.removeAttribute('controls');
        e.target.className = 'fas fa-toggle-off';
      }else{
        element.setAttribute('controls','');
        e.target.className = 'fas fa-toggle-on';
      }
    }

  }

  switchImageShape(e){

  	var element = document.getElementsByClassName('selected')[0];
  	var imgs = element.getElementsByTagName('img');
  	var changeTo = '';

  	if(e.target.classList.contains('fa-circle')){
        changeTo = 'circle';
  	}else{
  		if(e.target.classList.contains('fa-square')){
            changeTo = 'square';
  		}
  	}

  	for(var i=0; i<imgs.length; i++){
  		if(changeTo == 'circle'){
  			imgs[i].style.borderRadius = '50%';
  		}else{
  			if(changeTo == 'square'){
  			    imgs[i].style.borderRadius = '0%';
  		    }
  		}
  	}

  	if(changeTo == 'circle'){
  		e.target.className = 'fas fa-square';
  	}else{
  		if(changeTo == 'square'){
  			e.target.className = 'fas fa-circle';
  		}
  	}

  }

  switchThumbnailsPosition(e){

  	var element = document.getElementsByClassName('selected')[0];
  	var image_view = element.getElementsByClassName('image-view')[0];
  	var thumbnailContainer = element.getElementsByClassName('image-viewer-thumbnails')[0];
  	var thumbnails = thumbnailContainer.getElementsByTagName('img');
  	var changeTo = '';

  	if(e.target.classList.contains('fa-arrow-left')){
        changeTo = 'left';
  	}else{
  		if(e.target.classList.contains('fa-arrow-right')){
            changeTo = 'right';
  		}
  	}

  	if(changeTo == 'left'){
  	  thumbnailContainer.style.right = 'unset';
  	  thumbnailContainer.style.left = '0';
  	  image_view.style.left = 'unset';
  	  image_view.style.right = '0';
    }else{
  	    if(changeTo == 'right'){
  		  thumbnailContainer.style.right = '0';
  	      thumbnailContainer.style.left = 'unset';
  	      image_view.style.left = '0';
  	      image_view.style.right = 'unset';
  		}
  	}

  	if(changeTo == 'left'){
  		e.target.className = 'fas fa-arrow-right';
  	}else{
  		if(changeTo == 'right'){
  			e.target.className = 'fas fa-arrow-left';
  		}
  	}

  }

  toggleFullScreeOption(event){

  	var element = document.getElementsByClassName('selected')[0];
  	var image_view = element.getElementsByClassName('image-view')[0];
  	var viewer_image = image_view.getElementsByTagName('img')[0];

  	if(event.target.classList.contains('fa-toggle-on')){
  		var fullscreenbutton = image_view.getElementsByClassName('fa-expand')[0];
  		if(fullscreenbutton){
  			fullscreenbutton.remove();
  		}

  		event.target.className = 'fas fa-toggle-off';
  		event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Full Screen Option';
  	}else{
  		if(event.target.classList.contains('fa-toggle-off')){
  			var fullscreenbutton = document.createElement('i');
  			fullscreenbutton.className = 'fas fa-expand';
  			fullscreenbutton.addEventListener("click",function(e){
  				$(".selectedSpecialOptions").css({'display':'none'});
      			publicEvents.enlargeImage(e,viewer_image.src);
      		});

  			image_view.appendChild(fullscreenbutton);
  			event.target.className = 'fas fa-toggle-on';
  			event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Full Screen Option';
  		}
  	}

  }

  toggleCheckboxAndToggleSwitchText(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var text = element.getElementsByTagName('p')[0];
  	var elementType = element.getAttribute("data-e-type");

  	if(elementType.includes("checkbox")){
      	//var input = element.getElementsByTagName('input')[0];
  	    var span = element.getElementsByTagName('span')[0];
    }else{
      	if(elementType.includes("toggle-switch")){
      		var label = element.getElementsByTagName('label')[0];
      	}
    }

  	if(event.target.classList.contains('fa-toggle-on')){

  		if(text){
  			text.remove();

  			if(elementType.includes("checkbox")){
      			span.style.marginRight = "5px";
  			    //input.style.marginRight = "5px";
      		}else{
      			if(elementType.includes("toggle-switch")){
      				label.style.marginRight = "10px";
      			}
      		}
  		}

  		event.target.className = 'fas fa-toggle-off';
  		event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Text';
  	}else{
  		if(event.target.classList.contains('fa-toggle-off')){
  			var p = document.createElement("p");
      		p.setAttribute("data-restrictions","selection");

      		if(elementType.includes("checkbox")){
      			p.innerText = "Checkbox";

      			span.style.marginRight = "10px";
  			    //input.style.marginRight = "10px";
      		}else{
      			if(elementType.includes("toggle-switch")){
      				p.innerText = "Toggle Switch";

      				label.style.marginRight = "0px";
      			}
      		}

      	    element.appendChild(p);

  			event.target.className = 'fas fa-toggle-on';
  			event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Text';
  		}
  	}

  }



  toggleVideoPlayer2FullScreenOption(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	var expandOption = element.getElementsByClassName("video-controls")[0].getElementsByTagName("i")[2];

  	if(elementType.includes("video-player-two")){
  		if(event.target.classList.contains('fa-toggle-on')){
  			expandOption.style.display = "none";
  	    }else{
  		    if(event.target.classList.contains('fa-toggle-off')){
  			    expandOption.style.display = "inline-block";
  		    }
  	    }
  	}

  	if(event.target.classList.contains("fa-toggle-on")){
  		event.target.className = 'fas fa-toggle-off';
  		event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Full Screen Option';
  	}else{
  		if(event.target.classList.contains("fa-toggle-off")){
  			event.target.className = 'fas fa-toggle-on';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Full Screen Option';
  		}
  	}
  }

  toggleVideoPlayerInfo(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	var videoinfo = element.getElementsByClassName("video-info")[0];
  	var videoinfoIcon = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fas fa-info-circle")[0];

  	if(elementType.includes("video-player-one") || elementType.includes("video-player-two")){
  		if(event.target.classList.contains('fa-toggle-on')){
  			videoinfo.style.display = "none";
  			videoinfoIcon.style.display = "none";

  			if(elementType.includes("video-player-one")){
  				element.getElementsByClassName("video-controls")[0].getElementsByTagName("span")[0].style.paddingRight = "20px";
  			}
  	    }else{
  		    if(event.target.classList.contains('fa-toggle-off')){
  			   videoinfo.style.display = "inline-block";
  			   videoinfoIcon.style.display = "inline-block";

  			   if(elementType.includes("video-player-one")){
  				   element.getElementsByClassName("video-controls")[0].getElementsByTagName("span")[0].style.paddingRight = "0px";
  			   }
  		    }
  	    }
  	}

  	if(event.target.classList.contains("fa-toggle-on")){
  		event.target.className = 'fas fa-toggle-off';
  		event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Video Information';
  	}else{
  		if(event.target.classList.contains("fa-toggle-off")){
  			event.target.className = 'fas fa-toggle-on';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Video Information';
  		}
  	}
  }

  switchVideoPlaylistListLocation(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	var player = element.getElementsByClassName("playlist-player")[0];
  	var list = element.getElementsByClassName("playlist-list")[0];

  	if(elementType.includes("video-playlist-one")){
  		if(element.getAttribute("data-list-loc") == 0){ // right
  			player.style.left = "unset";
  			player.style.right = 0;
  			list.style.left = 0;
  			list.style.right = "unset";

  			element.setAttribute("data-list-loc",1);
  		}else{
  			if(element.getAttribute("data-list-loc") == 1){ // left
  				player.style.left = 0;
  			    player.style.right = "unset";
  			    list.style.left = "unset";
  			    list.style.right = 0;

  				element.setAttribute("data-list-loc",0);
  			}
  		}
  	}
  }

  switchImgViewer1InfoStyle(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	var video = element.getElementsByTagName("video")[0];
  	var infoDiv = element.getElementsByClassName("video-info")[0];
  	var infoIcon = element.getElementsByClassName("fas fa-info-circle")[0];
  	var time = element.getElementsByClassName("video-controls")[0].getElementsByTagName("span")[0];
  	var buffer = element.getElementsByClassName("buffer-icon")[0];
  	var thumb = element.getElementsByClassName("video-player-thumb")[0];

  	if(elementType.includes("video-player-one")){
  		if(element.getAttribute("data-info-style") == 0){
  			video.classList.add("half-height");
  			buffer.classList.add("half-height");
  			thumb.classList.add("half-height");

  			infoDiv.classList.add("bottom-info");
  			infoIcon.style.display = "none";
  			time.style.paddingRight = "20px";
  			element.style.height = "600px";

  			element.setAttribute("data-info-style",1);
  	    }else{
  		    if(element.getAttribute("data-info-style") == 1){
  			    video.classList.remove("half-height");
  			    buffer.classList.remove("half-height");
  			    thumb.classList.remove("half-height");

  			    infoDiv.classList.remove("bottom-info");
  			    infoIcon.style.display = "inline-block";
  			    time.style.paddingRight = "0px";
  			    element.style.height = "300px";

  			    element.setAttribute("data-info-style",0);
  		    }
  	    }
  	}
  }

  toggleVideoPlayer1FullScreenOption(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	var expand = element.getElementsByClassName("expand")[0];

  	if(elementType.includes("video-player-one")){
  		if(event.target.classList.contains('fa-toggle-on')){
  			expand.style.display = "none";
  	    }else{
  		    if(event.target.classList.contains('fa-toggle-off')){
  			    expand.style.display = "flex";
  		    }
  	    }
  	}

  	if(event.target.classList.contains("fa-toggle-on")){
  		event.target.className = 'fas fa-toggle-off';
  		event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Full Screen Option';
  	}else{
  		if(event.target.classList.contains("fa-toggle-off")){
  			event.target.className = 'fas fa-toggle-on';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Full Screen Option';
  		}
  	}
  }

  toggleVideoPlayer2NightModeOption(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	var nightmodeoption = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fa-moon")[0];

  	if(elementType.includes("video-player-two")){
  		if(event.target.classList.contains('fa-toggle-on')){
  			nightmodeoption.style.display = "none";
  	    }else{
  		    if(event.target.classList.contains('fa-toggle-off')){
  			    nightmodeoption.style.display = "inline-block";
  		    }
  	    }
  	}

  	if(event.target.classList.contains("fa-toggle-on")){
  		event.target.className = 'fas fa-toggle-off';
  		event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Night Mode Option';
  	}else{
  		if(event.target.classList.contains("fa-toggle-off")){
  			event.target.className = 'fas fa-toggle-on';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Night Mode Option';
  		}
  	}
  }

  toggleVideoPlayer2FrwdBwdOption(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	var forward = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fas fa-step-forward")[0];
  	var backward = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fas fa-step-backward")[0];

  	if(elementType.includes("video-player-two")){
  		if(event.target.classList.contains('fa-toggle-on')){
  			forward.style.display = "none";
  			backward.style.display = "none";
  	    }else{
  		    if(event.target.classList.contains('fa-toggle-off')){
  			    forward.style.display = "inline-block";
  			    backward.style.display = "inline-block";
  		    }
  	    }
  	}

  	if(event.target.classList.contains("fa-toggle-on")){
  		event.target.className = 'fas fa-toggle-off';
  		event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Forward-Backward Option';
  	}else{
  		if(event.target.classList.contains("fa-toggle-off")){
  			event.target.className = 'fas fa-toggle-on';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Forward-Backward Option';
  		}
  	}
  }

  toggleMultiCheckboxText(event){
  	var element = document.getElementsByClassName('selected')[0];
  	var elementType = element.getAttribute("data-e-type");

  	if(elementType.includes("checkbox-multi")){
  		var allCheckboxes = element.getElementsByClassName("checkbox");
  		console.log(allCheckboxes);

  		for(var i=0; i<allCheckboxes.length; i++){
  			var currentCheckbox = allCheckboxes[i];
  			console.log(currentCheckbox);

  			var span = currentCheckbox.getElementsByTagName('span')[0];
  			var text = currentCheckbox.getElementsByTagName('p')[0];

  			if(event.target.classList.contains('fa-toggle-on')){
  			    text.style.display = "none";
      			span.style.marginRight = "5px";
  	        }else{
  		        if(event.target.classList.contains('fa-toggle-off')){
  			        text.style.display = "inline-block";
      			    span.style.marginRight = "10px";
  		        }
  	        }

  		}

  		if(event.target.classList.contains("fa-toggle-on")){
  			event.target.className = 'fas fa-toggle-off';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Checkbox Text';
  		}else{
  			if(event.target.classList.contains("fa-toggle-off")){
  				event.target.className = 'fas fa-toggle-on';
  		        event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Checkbox Text';
  			}
  		}

  	}

  }

  toggleTextboxBorder(event){
  	var element = document.getElementsByClassName('selected')[0];

  	if(element.getAttribute("data-e-type").includes("textbox")){
  		if(event.target.classList.contains('fa-toggle-on')){
  			element.style.border = "none";

  			event.target.className = 'fas fa-toggle-off';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Border';
  		}else{
  			if(event.target.classList.contains('fa-toggle-off')){
  				element.style.border = "1px solid black";

  				event.target.className = 'fas fa-toggle-on';
  			    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Border';
  			}
  		}
  	}

  }

  toggleTextboxIcon(event){
  	var element = document.getElementsByClassName('selected')[0];

  	if(element.getAttribute("data-e-type").includes("textbox")){
  		if(event.target.classList.contains('fa-toggle-on')){

  			var iconwrapper = element.getElementsByClassName("icon-wrapper");
  			if(iconwrapper[0]){
  				iconwrapper[0].getElementsByTagName("i")[0].style.display = "none";
  			}

  			var input = element.getElementsByTagName("input");
  			if(input[0]){
  				var lengthTextState = element.getAttribute("data-length-text-state");

  				if(lengthTextState == 0){
  					input[0].style.paddingLeft = "10px";
  			        input[0].style.width = "92%";
  				}else{
  					if(lengthTextState == 1){
  						input[0].style.paddingLeft = "10px";
  			            input[0].style.width = "75%";
  				    }
  				}
  			}

  			element.setAttribute("data-i-state","0"); // disabled

  			event.target.className = 'fas fa-toggle-off';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Icon';
  		}else{
  			if(event.target.classList.contains('fa-toggle-off')){

  				var iconwrapper = element.getElementsByClassName("icon-wrapper");
  				if(iconwrapper[0]){
  					iconwrapper[0].getElementsByTagName("i")[0].style.display = "block";
  				}

  				var input = element.getElementsByTagName("input");
  				if(input[0]){
  					var lengthTextState = element.getAttribute("data-length-text-state");

  				    if(lengthTextState == 0){
  					    input[0].style.paddingLeft = "unset";
  			            input[0].style.width = "85%";
  				    }else{
  					    if(lengthTextState == 1){
  						    input[0].style.paddingLeft = "unset";
  			                input[0].style.width = "70%";
  				        }
  				    }

  				}

  				element.setAttribute("data-i-state","1"); // enabled

  				event.target.className = 'fas fa-toggle-on';
  			    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Icon';
  			}
  		}
  	}
  }

  toggleTextboxCharacterLimitText(event){
  	var element = document.getElementsByClassName('selected')[0];

  	if(element.getAttribute("data-e-type").includes("textbox")){
  		if(event.target.classList.contains('fa-toggle-on')){

  			element.getElementsByClassName("inputLength")[0].style.display = "none";
  			element.setAttribute("data-length-text-state",0);

  			var input = element.getElementsByTagName("input");
  		    if(input[0]){
  				var iconState = element.getAttribute("data-i-state");

  				if(iconState == 0){
  					//input[0].style.paddingLeft = "10px";
  			        input[0].style.width = "92%";
  				}else{
  					if(iconState == 1){
  						//input[0].style.paddingLeft = "unset";
  			            input[0].style.width = "85%";
  				    }
  				}

  			}

  			event.target.className = 'fas fa-toggle-off';
  		    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Character Limit Text';
  		}else{
  			if(event.target.classList.contains('fa-toggle-off')){

  				element.getElementsByClassName("inputLength")[0].style.display = "inline-block";
  				element.setAttribute("data-length-text-state",1);

  				var input = element.getElementsByTagName("input");
  		        if(input[0]){
  				    var iconState = element.getAttribute("data-i-state");

  				    if(iconState == 0){
  					    //input[0].style.paddingLeft = "10px";
  			            input[0].style.width = "80%";
  				    }else{
  					    if(iconState == 1){
  						    //input[0].style.paddingLeft = "unset";
  			                input[0].style.width = "70%";
  				        }
  				    }

  			    }

  				event.target.className = 'fas fa-toggle-on';
  			    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Character Limit Text';
  			}
  		}
  	}

  }

  optionClicked(e){
    var target = e.target;
    var tooltip = e.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0];
    var tooltipText = tooltip.innerText;
    var targetDiv = e.target.parentElement;

    var showTick = 0;
    var newClass = '';
    var newTooltipText = '';

    if(tooltipText == 'Resize'){
      showTick = 1;
      newTooltipText = 'Finish Resizing';
    }else{
      if(tooltipText == 'Finish Resizing'){
        showTick = 0;
        newTooltipText = 'Resize';
        newClass = 'fas fa-arrows-alt';
      }else{
        if(tooltipText == 'Full Width'){
          showTick = 0;
          newTooltipText = 'Full Width';
          newClass = 'fas fa-arrows-alt-h';
        }else{
          if(tooltipText == 'Full Height'){
            showTick = 0;
            newTooltipText = 'Full Height';
            newClass = 'fas fa-arrows-alt-v';
          }
        }
      }
    }

    if(tooltipText == 'Resize'){
      resizeable.enable(e);
    }else{
      if(tooltipText == 'Finish Resizing'){
        resizeable.disable();
      }else{
        if(tooltipText == 'Full Width'){
          $('.selected').css({'width':'100%','left':'0px','right':'unset'});
          relocateSpecialOptions();
          relocateElementResizer();
        }else{
          if(tooltipText == 'Full Height'){
            $('.selected').css({'height':'100%','top':'0px','bottom':'unset'});
            relocateSpecialOptions();
            relocateElementResizer();
          }
        }
      }
    }

    if(showTick == 1){
      target.className = 'fas fa-check';
      targetDiv.style.background = '#3d3d3d';
      target.style.color = 'rgb(0, 183, 0)';
      $('.wpb_e_special_option').not(targetDiv).css({'opacity':'0.4', 'pointer-events':'none'});
    }else{
      target.className = newClass;
      targetDiv.style.background = '#e67300';
      target.style.color = 'white';
      $('.wpb_e_special_option').not(targetDiv).css({'opacity':'1', 'pointer-events':'unset'});
    }

    tooltip.innerText = newTooltipText;

  }

  switchImgViewer2Location(){
		var element = document.getElementsByClassName("selected")[0];

		var thumbnails = element.getElementsByClassName("image-viewer-thumbnails")[0];
		var viewer = element.getElementsByClassName("image-view")[0];
		var toggleButton = element.getElementsByClassName("image-viewer-visibility-toggle")[0];

		if(element.getAttribute('data-e-type') == "image-viewer-two"){
			var location = Number(element.getAttribute("data-loc"));

			if(location == 1){
				element.style.left = "0";
				element.style.right = "unset";

				thumbnails.style.right = '0';
  	            thumbnails.style.left = 'unset';

  	            viewer.style.left = '0';
  	            viewer.style.right = 'unset';

  	            toggleButton.style.left = "unset";
  	            toggleButton.style.right = "-50px";

  	            toggleButton.style.borderTopLeftRadius = "0px";
  	            toggleButton.style.borderBottomLeftRadius = "0px";
  	            toggleButton.style.borderTopRightRadius = "5px";
  	            toggleButton.style.borderBottomRightRadius = "5px";

  	            element.setAttribute("data-loc",2);
			}else{
				if(location == 2){
					element.style.left = "unset";
				    element.style.right = "0";

				    thumbnails.style.right = 'unset';
  	                thumbnails.style.left = '0';

  	                viewer.style.left = 'unset';
  	                viewer.style.right = '0';

  	                toggleButton.style.left = "-50px";
  	                toggleButton.style.right = "unset";

  	                toggleButton.style.borderTopLeftRadius = "5px";
  	                toggleButton.style.borderBottomLeftRadius = "5px";
  	                toggleButton.style.borderTopRightRadius = "0px";
  	                toggleButton.style.borderBottomRightRadius = "0px";

  	                element.setAttribute("data-loc",1);
				}
			}
		}
	}

	switchImgViewer2BtnLocation(){
		var element = document.getElementsByClassName("selected")[0];
		var toggleButton = element.getElementsByClassName("image-viewer-visibility-toggle")[0];

		if(element.getAttribute('data-e-type') == "image-viewer-two"){
			var location = Number(toggleButton.getAttribute("data-loc"));

			if(location == 1){
				// shift to bottom
				toggleButton.style.top = "unset";
				toggleButton.style.bottom = "70px";

				toggleButton.setAttribute("data-loc",2);
			}else{
				if(location == 2){
					// shift to top
					toggleButton.style.top = "70px";
				    toggleButton.style.bottom = "unset";

				    toggleButton.setAttribute("data-loc",1);
				}
			}
		}
	}

	switchCheckboxShape(){
		var element = document.getElementsByClassName("selected")[0];

		if(element.getAttribute("data-e-type").includes("checkbox")){
			var span = element.getElementsByTagName("span")[0];

			var radius = span.style.borderRadius;
			var newRadius = "";

			if(radius == "0px" || radius == null || radius == ""){
				newRadius = "3px";
			}else{
				if(radius == "3px"){
				   newRadius = "50%";
			    }else{
			    	if(radius == "50%"){
				       newRadius = "0px";
			        }
			    }
			}

			span.style.borderRadius = newRadius;
		}
	}

	switchMultiCheckboxShape(){
		var element = document.getElementsByClassName("selected")[0];

		if(element.getAttribute("data-e-type").includes("checkbox-multi")){

			var allCheckboxes = element.getElementsByClassName("checkbox");

			for(var i=0; i<allCheckboxes.length; i++){
			    var span = allCheckboxes[i].getElementsByTagName("span")[0];

			    var radius = span.style.borderRadius;
			    var newRadius = "";

			    if(radius == "0px" || radius == null || radius == ""){
				    newRadius = "3px";
			    }else{
				    if(radius == "3px"){
				       newRadius = "50%";
			        }else{
			    	    if(radius == "50%"){
				           newRadius = "0px";
			            }
			        }
			    }

			    span.style.borderRadius = newRadius;
			}

		}
	}

	switchMultiCheckboxCheckMarkShape(){
		var element = document.getElementsByClassName("selected")[0];
		if(element.getAttribute("data-e-type").includes("checkbox-multi")){
			var allCheckboxes = element.getElementsByClassName("checkbox");

			for(var i=0; i<allCheckboxes.length; i++){
			    var checkmark = allCheckboxes[i].getElementsByClassName("checkmark")[0];

			    var currentShape = element.getAttribute("data-checkmark-shape");
			    var newShape = "";

			    if(currentShape == "square"){
				    newShape = "tick";
			    }else{
				    if(currentShape == "tick"){
				       newShape = "circle";
			        }else{
			    	    if(currentShape == "circle"){
				           newShape = "square";
			            }
			        }
			    }

			    if(i == 0){ // enabled top option on shape change
			    	if(newShape == "tick"){
			    	    checkmark.className = "checkmark tick-checkmark-enabled";
			        }else{
			    	    if(newShape == "circle"){
			    	    	checkmark.className = "checkmark circle-checkmark circle-checkmark-enabled";
			    	    }else{
			    	    	if(newShape == "square"){
			    	    		checkmark.className = "checkmark square-checkmark square-checkmark-enabled";
			    	    	}
			    	    }
			        }
			    }else{
			    	if(newShape == "tick"){
			    	    checkmark.className = "checkmark tick-checkmark-disabled";
			        }else{
			    	    if(newShape == "circle"){
			    	    	checkmark.className = "checkmark circle-checkmark circle-checkmark-disabled";
			    	    }else{
			    	    	if(newShape == "square"){
			    	    		checkmark.className = "checkmark square-checkmark square-checkmark-disabled";
			    	    	}
			    	    }
			        }
			    }

			}

			var Shape = element.getAttribute("data-checkmark-shape");

			if(Shape == "square"){
				element.setAttribute("data-checkmark-shape","tick");
			}else{
				if(Shape == "tick"){
				    element.setAttribute("data-checkmark-shape","circle");
			    }else{
			    	if(Shape == "circle"){
				        element.setAttribute("data-checkmark-shape","square");
			        }
			    }
			}

			element.setAttribute("data-checkmark-shape",newShape);
		}
	}

	switchTextbox2TextLocation(){
		var element = document.getElementsByClassName("selected")[0];

		if(element.getAttribute("data-e-type") == "textbox-two"){
			var label = element.getElementsByTagName("label")[0];

			if(label){
				if(element.getAttribute("data-label-pos") == "0"){
					label.style.left = "unset";
				    label.style.right = "5%";

				    element.setAttribute("data-label-pos","1");
				}else{
					if(element.getAttribute("data-label-pos") == "1"){
						label.style.left = "5%";
				        label.style.right = "unset";

				        element.setAttribute("data-label-pos","0");
				    }
				}
			}
		}
	}

}

//------------------------------------------------------------------

var elementSpecialOptionsHandler = new elementOptions;

//------------------------------------------------------------------

class progressloader{
  constructor(){}

  show(){

    var loaderbg = document.createElement('div');
    loaderbg.className = 'loader_bg';

    var loader = document.createElement('div');
    loader.setAttribute('class','loader');

    body.appendChild(loaderbg);
    body.appendChild(loader);

    $('body').css({'pointer-events':'none'});
  }

  hide(){
    var loader = document.getElementsByClassName('loader')[0];
    var loaderbg = document.getElementsByClassName('loader_bg')[0];
    loaderbg.remove();
    loader.remove();

    $('body').css({'pointer-events':'unset'});
  }
}

//------------------------------------------------------------------

class randomizer{
  constructor(){}

  elementId(length){

   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;

  }
}

//------------------------------------------------------------------

class MathCalculator{
  constructor(){}

  formatBytes(bytes,decimals){

   if(bytes == 0) return '0 Bytes';
   var k = 1024,
       dm = decimals <= 0 ? 0 : decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

  }
}

//------------------------------------------------------------------

var randomize = new randomizer;
var calculator = new MathCalculator;
var progress = new progressloader;

//------------------------------------------------------------------

class fontsManager{
  constructor(){}

  load(){
  }

  empty(){
    var comboboxes = document.getElementsByClassName('fontManager')[0].getElementsByTagName('combobox');

    for(var i = comboboxes.length -1; i >= 0 ; i--){
      comboboxes[i].remove();
    }
  }

  open(){
    var fontManager = document.createElement('div');
    fontManager.className = 'fontManager';
    fontManager.addEventListener('mousedown',function(e){
      fontmanager.mousedown(e);
    });

    var banner = document.createElement('div');
    banner.className = 'banner';

    var banner_p = document.createElement('p');
    banner_p.innerText = 'Font Manager';

    banner.appendChild(banner_p);

    fontManager.appendChild(banner);
    body.appendChild(fontManager);

    progress.show();

    this.addFontComboBox();
    getGoogleFonts(document.getElementsByClassName('selected')[0],'webpageBuilder');

  }

  close(){
    document.getElementsByClassName('fontManager')[0].remove();
  }

  drag(e){
    var elmnt = document.getElementsByClassName('fontManager')[0];
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    styler_pos1 = styler_pos3 - e.clientX;
    styler_pos2 = styler_pos4 - e.clientY;
    styler_pos3 = e.clientX;
    styler_pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - styler_pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - styler_pos1) + "px";
    elmnt.style.cursor = 'grabbing';
  }

  mousedown(e){
    var elmnt = document.getElementsByClassName('fontManager')[0];
    if(e.target == elmnt){
      e = e || window.event;
      e.preventDefault();

      elmnt.style.cursor = 'grab';

      // get the mouse cursor position at startup:
      styler_pos3 = e.clientX;
      styler_pos4 = e.clientY;
      document.onmouseup = this.closeDrag;

      // call a function whenever the cursor moves:
      document.onmousemove = this.drag;
    }
  }

  closeDrag(){
    var elmnt = document.getElementsByClassName('fontManager')[0];
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor = 'default';
  }

  addFontComboBox(){
    var comboboxOptions = [{value:'Sans'},{value:'Sans-Serif'},{value:'Helvectia'},{value:'Monospace'},{value:'Cursive'},{value:'Fantasy'}]
    var combobox = document.createElement('combobox');
    combobox.setAttribute('id','wpb_fontFamily');
    combobox.style.marginTop = '50px';

    var combobox_selected = document.createElement('selected');
    var combobox_selected_a = document.createElement('a');
    var combobox_selected_a_span = document.createElement('span');
    combobox_selected_a_span.innerText = 'Font Family';

    combobox_selected.appendChild(combobox_selected_a);
    combobox_selected_a.appendChild(combobox_selected_a_span);

    var combobox_options = document.createElement('options');
    var combobox_options_ul = document.createElement('ul');

    for(var x=0; x<comboboxOptions.length; x++){
      var combobox_option = document.createElement('li');

      var combobox_option_a = document.createElement('a');
      combobox_option_a.innerText = comboboxOptions[x].value;
      combobox_option_a.style.fontFamily = comboboxOptions[x].value;

      if(x == comboboxOptions.length-1){
        combobox_option_a.className = 'lastoption';
      }

      var combobox_option_a_span = document.createElement('span');
      combobox_option_a_span.innerText = comboboxOptions[x].value;
      combobox_option_a_span.setAttribute('class','value');

      combobox_option_a.appendChild(combobox_option_a_span);
      combobox_option.appendChild(combobox_option_a);

      combobox_option.addEventListener('click',function(){
        document.getElementsByClassName('selected')[0].style.fontFamily = this.getElementsByTagName('a')[0].innerText;
        combobox_selected_a_span.innerText = 'Font Family' + ': ' + this.getElementsByTagName('a')[0].innerText;
        combobox_options.style.display = 'none';
      });

      combobox_options_ul.appendChild(combobox_option);

    }

    combobox_selected_a_span.addEventListener('click',function(e){

        if(e.target == combobox_selected_a_span){

          if(combobox_options.style.display == 'block'){

            combobox_options.style.display = 'none';
            combobox_options_ul.style.display = 'none';
            //combobox_customedit.style.display = 'none';
            combobox_selected_a_span.style.textAlign = '';
            combobox.classList.remove('selectedCombobox');

          }else{

            combobox_options.style.display = 'block';
            combobox_options_ul.style.display = 'block';
            //combobox_customedit.style.display = 'block';
            combobox_selected_a_span.style.textAlign = 'left';
            combobox.classList.add('selectedCombobox');

          }

        }else{

        }

        });

    combobox_options.appendChild(combobox_options_ul);
    combobox.appendChild(combobox_selected);
    combobox.appendChild(combobox_options);
    document.getElementsByClassName('fontManager')[0].appendChild(combobox);

  }

}

function storageSpace_showDetails(storageSpace,e){
	var details = document.createElement("div");
	details.className = "storageSpace_details";

	var fs = Number(FreeSpace.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));
	var is = Number(spaceUsedByImages.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));
	var vs = Number(spaceUsedByVideos.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));

	var totalSpace = fs+is+vs;

	var imgPercentage = Number(((is/totalSpace) * 100));
	var vidPercentage = Number(((vs/totalSpace) * 100));

	var barZIndex = [0,1,2]; // free , images , videos

	if(imgPercentage > vidPercentage){
		barZIndex = [0,1,2];
	}else{
		if(vidPercentage > imgPercentage){
			barZIndex = [0,2,1];
	    }
	}

	var bars = ["Free Space","Images","Videos"];
	var barColors = ["grey","darkred","orange"];
	var barValues = [100,imgPercentage,vidPercentage];
	var barData = [FreeSpace,spaceUsedByImages,spaceUsedByVideos];

	for(var i=0; i<bars.length; i++){
		var bar = document.createElement("span");
		bar.className = "storageSpace_bar";
		bar.style.width = barValues[i]+"%";
		bar.style.backgroundColor = barColors[i];
		bar.style.zIndex = barZIndex[i];

		if(barZIndex[i] == 1){
			if(bars[i] == "Images"){
				bar.style.width = barValues[i] + barValues[2]+"%";
			}else{
				if(bars[i] == "Videos"){
					bar.style.width = barValues[i] + barValues[1]+"%";
			    }
			}
		}

		details.appendChild(bar);
	}

	var info = document.createElement("div");
	info.className = "storageSpace_classes";

	for(var i=0; i<bars.length; i++){
		var text = document.createElement("span");
		text.className = "storageSpace_class";
		text.innerText = bars[i] + " - " + barData[i];

		var cube = document.createElement("span");
		cube.className = "storageSpace_class_cube";
		cube.style.backgroundColor = barColors[i];

		$(text).prepend(cube);
		info.appendChild(text);
	}

	details.style.width = storageSpace.getBoundingClientRect().width + "px";

	details.appendChild(info);
	body.appendChild(details);
}

function storageSpace_hideDetails(storageSpace,e){
	$(".storageSpace_details").remove();
}

//------------------------------------------------------------------

class videosmanager{
  constructor(){}

  load(){
  }

  empty(){

  }

  open(e,forElement){

    $('.storageSpace').remove();

    var storageSpace = document.createElement('span');
    storageSpace.className = 'storageSpace';
    storageSpace.innerText = 'Media Storage Usage: '+storageUsed+' / '+storageLimit;

    storageSpace.addEventListener("mouseover",function(e){
    	storageSpace_showDetails(storageSpace,e);
    });

    storageSpace.addEventListener("mouseout",function(e){
    	storageSpace_hideDetails(storageSpace,e);
    });

    var videoManager = document.createElement('div');
    videoManager.className = 'videoManager';
    videoManager.addEventListener('mousedown',function(e){
      VideoManager.mousedown(e);
    });

    var videosbox = document.createElement('div');
    videosbox.className = 'mediaManager_box';
    videosbox.id = 'videoManager-videos-box';

    var fileinput = document.createElement('input');
    fileinput.type = 'file';
    fileinput.accept = 'video/mp4,video/x-m4v,video/*';
    fileinput.style.display = 'none';
    fileinput.style.opacity = 0;
    fileinput.style.width = '0px';
    fileinput.style.height = '0px';
    fileinput.addEventListener('change',function(){
      mediaManager.uploadMedia('Video',this.files[0]);
    });

    var uploadBtn = document.createElement('button');
    uploadBtn.innerText = 'Upload Video (50MB Max Size)';
    uploadBtn.addEventListener('click',function(){
      fileinput.click();
    });

    var panelbar = document.createElement('div');
    panelbar.className = 'videoManager_panelbar';

    var youtube_panelbutton = document.createElement('img');
    var dailymotion_panelbutton = document.createElement('img');
    var vimeo_panelbutton = document.createElement('img');
    youtube_panelbutton.src = '../assets/images/youtubelogo.png';
    //dailymotion_panelbutton.src = '../assets/images/dailymotionlogo.png';
    //vimeo_panelbutton.src = '../assets/images/vimeologo.png';

    //panelbar.appendChild(dailymotion_panelbutton);
    //panelbar.appendChild(vimeo_panelbutton);

    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter keyword and press enter to search...';

    var banner = document.createElement('div');
    banner.className = 'banner';

    var banner_p = document.createElement('p');
    banner_p.innerText = 'Video Manager';

    banner.appendChild(banner_p);

    videoManager.appendChild(banner);
    videoManager.appendChild(videosbox);
    videoManager.appendChild(panelbar);
    body.appendChild(videoManager);

    if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-player') || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-playlist')){
      mediaManager.showUserVideos(forElement);
      body.appendChild(storageSpace);

      banner.appendChild(searchInput);

      panelbar.appendChild(uploadBtn);
      panelbar.appendChild(fileinput);

      searchInput.addEventListener('keydown',function(e){
        if(e.keyCode == 13){
           mediaManager.searchUserMedia("videos",this.value);
        }
      });
    }else{
      if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
        panelbar.appendChild(youtube_panelbutton);
        banner.appendChild(searchInput);

        searchInput.addEventListener('keydown',function(e){
          if(e.keyCode == 13){
            searchYoutubeVideos(this.value);
          }
        });
      }
    }

  }

  close(){
    document.getElementsByClassName('videoManager')[0].remove();
    $('.storageSpace').remove();
  }

  drag(e){
    var elmnt = document.getElementsByClassName('videoManager')[0];
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    videoManager_pos1 = videoManager_pos3 - e.clientX;
    videoManager_pos2 = videoManager_pos4 - e.clientY;
    videoManager_pos3 = e.clientX;
    videoManager_pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - videoManager_pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - videoManager_pos1) + "px";
    elmnt.style.cursor = 'grabbing';
  }

  mousedown(e){
    var elmnt = document.getElementsByClassName('videoManager')[0];
    if(e.target == elmnt){
      e = e || window.event;
      e.preventDefault();

      elmnt.style.cursor = 'grab';

      // get the mouse cursor position at startup:
      videoManager_pos3 = e.clientX;
      videoManager_pos4 = e.clientY;
      document.onmouseup = VideoManager.closeDrag;

      // call a function whenever the cursor moves:
      document.onmousemove = VideoManager.drag;
    }
  }

  closeDrag(){
    var elmnt = document.getElementsByClassName('videoManager')[0];
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor = 'default';
  }

  showVideoInfo(e,target){
    var mousePositions = publicEvents.detectHoverSideOfElement(target,e);

    var title = $(target).attr('data-title');

    if(title == "null" || title == null){
      	title = "";
    }

    var div = document.createElement('div');
    div.className = 'mediaInfo';
    div.id = target.id+'-meta';

    div.addEventListener('mouseover',function(){
      this.remove();
    });

    var p = document.createElement('p');
    p.innerText = title;

    if(target.src.includes('localhost')){
      var size = $(target).attr('data-size');
      var description = $(target).attr('data-video-des');
      var videoTitle = $(target).attr('data-video-title');

      if(description == "null" || description == null){
      	description = "";
      }

      if(videoTitle == "null" || videoTitle == null){
      	videoTitle = "";
      }

      p.innerText = "File Name: "+title;

      var p2 = document.createElement('p');
      p2.innerText = 'Title: '+videoTitle;

      var p3 = document.createElement('p');

      if(description.length > 150){
        p3.innerText = 'Description: '+description.substring(0,150)+"...";
      }else{
        p3.innerText = 'Description: '+description;
      }

      var p4 = document.createElement('p');
      p4.innerText = 'Size: '+calculator.formatBytes(size);

      div.appendChild(p2);
      div.appendChild(p3);
      div.appendChild(p);
      div.appendChild(p4);
    }else{
      var views = $(target).attr('data-views');
      var likes = $(target).attr('data-likes');

      var likes_span = document.createElement('span');
      likes_span.innerHTML = '<i class="fas fa-thumbs-up"></i>'+likes;

      var views_span = document.createElement('span');
      views_span.innerHTML = '<i class="fas fa-eye"></i>'+views;

      div.appendChild(p);

      div.appendChild(likes_span);
      div.appendChild(views_span);
    }

    div.style.left = e.clientX + 'px';
    div.style.top = (e.clientY + window.scrollY) + 'px';

    //document.getElementsByClassName('mediaManager_box')[0].appendChild(div);
    body.appendChild(div);
  }

  hideVideoInfo(target){

    var div = document.getElementById(target.id+'-meta').remove();

  }

  changeVideo(e,videoId,el){

    if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
      var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
      var videoId = $(e.target).attr('data-video-id');
      var thumbnail = $(e.target).attr('data-video-thumbnail');
      element.src = 'https://www.youtube.com/embed/'+videoId+'?enablejsapi=1&widgetid=1&controls=0&disablekb=1&fs=0';
      element.setAttribute('data-thumbnail',thumbnail);
    }else{
      if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
        document.getElementsByClassName('selected')[0].src = '';
      }
    }

  }

}

//------------------------------------------------------------------

class backgroundIManager{
  constructor(){}

  load(){
  }

  empty(){

  }

  open(e,forElement){

    $('.storageSpace').remove();

    var storageSpace = document.createElement('span');
    storageSpace.className = 'storageSpace';
    storageSpace.innerText = 'Media Storage Usage: '+storageUsed+' / '+storageLimit;

    storageSpace.addEventListener("mouseover",function(e){
    	storageSpace_showDetails(storageSpace,e);
    });

    storageSpace.addEventListener("mouseout",function(e){
    	storageSpace_hideDetails(storageSpace,e);
    });

    var bgiManager = document.createElement('div');
    bgiManager.id = 'bg-image-manager';
    bgiManager.addEventListener('mousedown',function(e){
      backgroundImageManager.mousedown(e);
    });

    var imagesbox = document.createElement('div');
    imagesbox.className = 'mediaManager_box';
    imagesbox.id = 'bg-image-manager-images-box';

    var fileinput = document.createElement('input');
    fileinput.type = 'file';
    fileinput.accept = 'image/png, image/jpeg, image/jpg';
    fileinput.style.display = 'none';
    fileinput.style.opacity = 0;
    fileinput.style.width = '0px';
    fileinput.style.height = '0px';
    fileinput.addEventListener('change',function(){
      mediaManager.uploadMedia('Image',this.files[0]);
    });

    var uploadBtn = document.createElement('button');
    uploadBtn.innerText = 'Upload Image';
    uploadBtn.addEventListener('click',function(){
      fileinput.click();
    });

    var panelbar = document.createElement('div');
    panelbar.className = 'bg-image-manager_panelbar'

    var giphy_panelbutton = document.createElement('img');
    var pixelbay_panelbutton = document.createElement('img');
    var unsplash_panelbutton = document.createElement('img');
    giphy_panelbutton.src = '../assets/images/giphylogo2.png';
    pixelbay_panelbutton.src = '../assets/images/pixelbaylogo.png';
    unsplash_panelbutton.src = '../assets/images/unsplashlogo.jpg';

    panelbar.appendChild(giphy_panelbutton);
    panelbar.appendChild(pixelbay_panelbutton);
    panelbar.appendChild(unsplash_panelbutton);
    panelbar.appendChild(uploadBtn);
    panelbar.appendChild(fileinput);

    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter keyword and press enter to search...';

    // checkbox -----

    var checkboxOption = document.createElement('div');

    var span = document.createElement("span");
    var p = document.createElement("p");
    var checkmark = document.createElement("span");
    checkmark.className = "checkmark";

    checkboxOption.setAttribute("data-bg-hv","grey");
    checkboxOption.setAttribute("data-checked","1");

    checkmark.addEventListener("mouseover",function(){
      	publicEvents.checkbox_hover(span);
    });

    checkmark.addEventListener("mouseout",function(){
         publicEvents.checkbox_hoverOut(span);
    });

    checkmark.addEventListener("click",function(){
         publicEvents.checkbox_click(checkboxOption);
    });

    span.setAttribute("data-restrictions","selection");
    p.setAttribute("data-restrictions","selection");
    checkmark.setAttribute("data-restrictions","selection");

    checkboxOption.className = 'checkbox-one';
    checkboxOption.setAttribute('data-e-type','checkbox-one');

    checkboxOption.setAttribute("data-bg","black");
    span.style.backgroundColor = "black";

    p.innerText = "Media Storage Search";

    checkboxOption.appendChild(span);
    checkboxOption.appendChild(p);
    checkboxOption.appendChild(checkmark);

    // end checkbox -----

    searchInput.addEventListener('keydown',function(e){
      if(e.keyCode == 13){
      	if(stateOf.checkbox(checkboxOption) == 1){
      		mediaManager.searchUserMedia("images",this.value);
      	}else{
      		resetImages('webpageBuilder');
            searchGIFS(this.value,'','webpageBuilder');
            searchUnsplashPictures(this.value,'','webpageBuilder');
            searchPixelBayPictures(this.value,'','webpageBuilder');
      	}
      }
    });

    var banner = document.createElement('div');
    banner.className = 'banner';
    banner.appendChild(searchInput);
    banner.appendChild(checkboxOption);

    var banner_p = document.createElement('p');
    banner_p.innerText = 'Image Manager';

    banner.appendChild(banner_p);

    bgiManager.appendChild(banner);
    bgiManager.appendChild(imagesbox);
    bgiManager.appendChild(panelbar);
    body.appendChild(bgiManager);

    mediaManager.showUserImages(forElement);

    body.appendChild(storageSpace);
  }

  close(){
    document.getElementById('bg-image-manager').remove();
    $('.storageSpace').remove();
  }

  drag(e){
    var elmnt = document.getElementById('bg-image-manager');
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    bgimageManager_pos1 = bgimageManager_pos3 - e.clientX;
    bgimageManager_pos2 = bgimageManager_pos4 - e.clientY;
    bgimageManager_pos3 = e.clientX;
    bgimageManager_pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - bgimageManager_pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - bgimageManager_pos1) + "px";
    elmnt.style.cursor = 'grabbing';
  }

  mousedown(e){
    var elmnt = document.getElementById('bg-image-manager');
    if(e.target == elmnt){
      e = e || window.event;
      e.preventDefault();

      elmnt.style.cursor = 'grab';

      // get the mouse cursor position at startup:
      bgimageManager_pos3 = e.clientX;
      bgimageManager_pos4 = e.clientY;
      document.onmouseup = backgroundImageManager.closeDrag;

      // call a function whenever the cursor moves:
      document.onmousemove = backgroundImageManager.drag;
    }
  }

  closeDrag(){
    var elmnt = document.getElementById('bg-image-manager');
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor = 'default';
  }

}

//------------------------------------------------------------------

var backgroundImageManager = new backgroundIManager;
var VideoManager = new videosmanager;

//------------------------------------------------------------------

class miniStyler{
  constructor(){}

  load(){
  }

  empty(){
    var comboboxes = document.getElementsByClassName('miniStyler')[0].getElementsByTagName('combobox');

    for(var i = comboboxes.length -1; i >= 0 ; i--){
      comboboxes[i].remove();
    }
  }

  open(){
    var stylerDiv = document.createElement('div');
    stylerDiv.className = 'miniStyler';
    stylerDiv.addEventListener('mousedown',function(e){
      styler.mousedown(e);
    });

    var box = document.createElement('div');
    box.className = 'miniStyler_box';

    var banner = document.createElement('div');
    banner.className = 'banner';

    var banner_p = document.createElement('p');
    banner_p.innerText = 'Mini Styler';

    var stylerSettings = document.createElement('div');
    stylerSettings.className = 'settings';

    var unitLabel = document.createElement('p');
    unitLabel.innerText = 'Unit: ';

    var unitInput = document.createElement('input');
    unitInput.type = 'text';
    unitInput.placeholder = '%% or px';
    unitInput.maxLength = '2';

    unitInput.addEventListener('input',function(){
      if(unitInput.value.length == 2){
        if(unitInput.value == 'px'){
          styler.loadComboboxes('px');
        }else{
          if(unitInput.value == '%%'){
            styler.loadComboboxes('%');
          }else{
            notification('Error, '+unitInput.value+' unit not supported');
          }
        }
      }
    });

    var stylerSpinner = document.createElement('div');
    stylerSpinner.className = 'spinner';

    banner.appendChild(banner_p);

    stylerSettings.appendChild(unitLabel);
    stylerSettings.appendChild(unitInput);

    stylerDiv.appendChild(stylerSpinner);
    stylerDiv.appendChild(banner);
    stylerDiv.appendChild(box);
    stylerDiv.appendChild(stylerSettings);
    body.appendChild(stylerDiv);

    this.loadComboboxes('default');

  }

  loadComboboxes(unit){
    $('.miniStyler').find('.spinner').css({'display':'block'});
    $('.miniStyler').find('*').not('.spinner').css({'opacity':'0.7','pointer-events':'none'});

    setTimeout(function(){
    $('.miniStyler').find('.spinner').css({'display':'none'});
    $('.miniStyler').find('*').not('.spinner').css({'opacity':'1','pointer-events':'unset'});

    styler.empty();

    var width_unit = 'px', height_unit = 'px';

    var width_values_px = [{value:'50'},{value:'70'},{value:'90'},{value:'125'},{value:'150'},{value:'175'}];
    var width_values_percentage = [{value:'25'},{value:'50'},{value:'75'},{value:'100'}];

    var height_values_px = [{value:'20'},{value:'40'},{value:'70'},{value:'90'},{value:'125'},{value:'150'}];
    var height_values_percentage = [{value:'10'},{value:'25'},{value:'45'},{value:'75'}];

    if(unit == 'default'){
      if(document.getElementsByClassName('selected')[0].classList.contains('topnavbar')){
        width_unit = '%';
        height_unit = 'px';
        styler.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_percentage);
        styler.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
      }else{
        styler.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_px);
        styler.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
      }
    }else{
      if(unit == 'px'){
        width_unit = 'px';
        height_unit = 'px';
        styler.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_px);
        styler.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
      }else{
        if(unit == '%'){
          width_unit = '%';
          height_unit = '%';
          styler.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_percentage);
          styler.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_percentage);
        }
      }
    }

    styler.addComboBox('Display','wpb_styler_display',0,0,'',[{value:'Block'},{value:'Inline'},{value:'Contents'},{value:'Flex'},{value:'Grid'},{value:'Inline-Block'},{value:'Inline-Flex'},{value:'Inline-Grid'},{value:'Inline-Table'},{value:'List-Item'},{value:'Run-In'},{value:'Table-Caption'},{value:'Table-Column-Group'},{value:'Table-Header-Group'},{value:'Table-Footer-Group'},{value:'Table-Row-Group'},{value:'Table-Cell'},{value:'Table-Column'},{value:'Table-Row'},{value:'None'}]);
    styler.addComboBox('Background Color','wpb_styler_backgroundColor',0,1,'',[]);
    styler.addComboBox('Font Size','wpb_styler_fontSize',1,0,'px',[{value:'10'},{value:'12'},{value:'15'},{value:'17'},{value:'19'},{value:'22'}]);
    styler.addComboBox('Font Color','wpb_styler_fontColor',0,1,'',[]);
    styler.addComboBox('Text Align','wpb_styler_textAlign',0,0,'',[{value:'Left'},{value:'Center'},{value:'Right'}]);
    styler.addComboBox('Text Decoration','wpb_styler_textDecoration',0,0,'',[{value:'OverLine'},{value:'Line-Through'},{value:'Underline'},{value:'Underline Overline'},{value:'None'}]);
    styler.addComboBox('Text Decoration Style','wpb_styler_textDecorationStyle',0,0,'',[{value:'Solid'},{value:'Double'},{value:'Dotted'},{value:'Dashed'},{value:'Wavy'}]);
    styler.addComboBox('Text Decoration Color','wpb_styler_textDecorationColor',0,1,'',[]);
    styler.addComboBox('Font Style','wpb_styler_fontStyle',0,0,'',[{value:'Normal'},{value:'Italic'}]);
    styler.addComboBox('Font Weight','wpb_styler_fontWeight',0,0,'',[{value:'Normal'},{value:'Bold'}]);
    styler.addComboBox('Font Variant','wpb_styler_fontVariant',0,0,'',[{value:'Normal'},{value:'Small-Caps'}]);
    styler.addComboBox('Font Stretch','wpb_styler_fontStretch',0,0,'',[{value:'Normal'},{value:'Condensed'},{value:'Expanded'}]);
    styler.addComboBox('Border Size','wpb_styler_borderSize',1,0,'px',[{value:'2'},{value:'4'},{value:'8'}]);
    styler.addComboBox('Border Color','wpb_styler_borderColor',0,1,'',[]);
    styler.addComboBox('Border Radius','wpb_styler_borderRadius',1,0,'px',[{value:'3'},{value:'6'},{value:'12'}]);
    styler.addComboBox('Border Style','wpb_styler_borderSize',0,0,'',[{value:'Solid'},{value:'Dotted'},{value:'Double'},{value:'Dashed'},{value:'Groove'},{value:'Ridge'},{value:'Dotted Solid'},{value:'Dotted Solid Double Dashed'},{value:'OutSet'},{value:'Inset'}]);
    styler.addComboBox('White Space','wpb_styler_whiteSpace',0,0,'',[{value:'Normal'},{value:'NoWrap'},{value:'Pre'},{value:'Pre-Line'},{value:'Pre-Wrap'}]);
    styler.addComboBox('Margin Left','wpb_styler_marginLeft',1,0,'px',[]);
    styler.addComboBox('Margin Right','wpb_styler_marginRight',1,0,'px',[]);
    styler.addComboBox('Margin Top','wpb_styler_marginTop',1,0,'px',[]);
    styler.addComboBox('Margin Bottom','wpb_styler_marginBottom',1,0,'px',[]);
    styler.addComboBox('Padding Left','wpb_styler_paddingLeft',1,0,'px',[]);
    styler.addComboBox('Padding Right','wpb_styler_paddingRight',1,0,'px',[]);
    styler.addComboBox('Padding Top','wpb_styler_paddingTop',1,0,'px',[]);
    styler.addComboBox('Padding Bottom','wpb_styler_paddingBottom',1,0,'px',[]);
    styler.addComboBox('Letter Space','wpb_styler_letterSpace',1,0,'px',[]);
    styler.addComboBox('Word Space','wpb_styler_wordSpace',1,0,'px',[]);
    styler.addComboBox('Outline Width','wpb_styler_outlineWidth',1,0,'px',[]);
    styler.addComboBox('Outline Color','wpb_styler_outlineColor',1,1,'',[]);
    styler.addComboBox('Outline Style','wpb_styler_outlineStyle',0,0,'',[{value:'Solid'},{value:'Dotted'},{value:'Double'},{value:'Dashed'},{value:'Groove'},{value:'Ridge'},{value:'Hidden'},{value:'Outset'},{value:'Inset'},{value:'None'}]);
    styler.addComboBox('Box Shadow','wpb_styler_boxShadowColor',1,1,'',[]);
    styler.addComboBox('Text Shadow','wpb_styler_textShadowColor',1,1,'',[]);

    },3000);

  }

  close(){
    document.getElementsByClassName('miniStyler')[0].remove();
  }

  addComboBox(comboboxTitle,comboboxId,addCustomEdit,addColorPicker,unit,comboboxOptions){
    var combobox = document.createElement('combobox');
    combobox.setAttribute('id',comboboxId);
    combobox.style.left = '10px';

    var combobox_selected = document.createElement('selected');
    var combobox_selected_a = document.createElement('a');
    var combobox_selected_a_span = document.createElement('span');
    combobox_selected_a_span.innerText = comboboxTitle;

    combobox_selected.appendChild(combobox_selected_a);
    combobox_selected_a.appendChild(combobox_selected_a_span);

    var combobox_options = document.createElement('options');
    var combobox_options_ul = document.createElement('ul');

    if(addCustomEdit == 1){
      var combobox_customedit = document.createElement('input');
      combobox_customedit.classList.add('custom');
      combobox_selected.appendChild(combobox_customedit);
      if(comboboxTitle == 'Box Shadow' || comboboxTitle == 'Text Shadow'){
        combobox_customedit.className = 'customlarge';
        combobox_customedit.value = '0px 0px 0px';
      }
    }

    if(addColorPicker == 1){

     var randomId = randomize.elementId(10);

     var colordisplay = document.createElement('colordisplay');
     colordisplay.setAttribute('id',randomId+'_cd');
     colordisplay.addEventListener('click',function(){

      var colorpicker = document.getElementById(randomId+'_cp');

         if(colorpicker.style.display == 'block'){

             colorpicker.style.display = 'none';
             combobox.classList.remove('selectedCombobox');

         }else{

             colorpicker.style.display = 'block';
             combobox.classList.add('selectedCombobox');

         }

     });

     colordisplay.style.display = 'none';

     var colorpicker = document.createElement('div');
     colorpicker.setAttribute('class','colorpicker');
     colorpicker.setAttribute('id',randomId+'_cp');

     if(comboboxTitle == 'Box Shadow' || comboboxTitle == 'Text Shadow'){
       colorpicker.style.left = '0px';
       colorpicker.style.right = 'unset';
     }

     var colorpicker_box = document.createElement('canvas');
     colorpicker_box.setAttribute('class','colorpickerbox');
     colorpicker_box.setAttribute('id',randomId+'_cpb');

     var colorpicker_strip = document.createElement('canvas');
     colorpicker_strip.setAttribute('class','colorpickerstrip');
     colorpicker_strip.setAttribute('id',randomId+'_cps');

     var colorpicker_input_rgba = document.createElement('input');
     colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
     colorpicker_input_rgba.setAttribute('id',randomId+'_cprgba');
     colorpicker_input_rgba.addEventListener('input',function(){
      var value;
      if(comboboxTitle == 'Font Color'){
        value = 'color';
      }
      if(comboboxTitle == 'Outline Color'){
        value = 'outline-color';
      }
      if(comboboxTitle == 'Border Color'){
        value = 'border-color';
      }
      if(comboboxTitle == 'Background Color'){
        value = 'background-color';
      }
      if(comboboxTitle == 'Text Shadow'){
        value = 'textShadowColor';
      }
      if(comboboxTitle == 'Box Shadow'){
        value = 'box-shadow-color';
      }
      if(comboboxTitle == 'Text Decoration Color'){
        value = 'text-decoration-color';
      }
      textToColorPickerColor(this,value,'.selected');
     });

     var colorpicker_input_hex = document.createElement('input');
     colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
     colorpicker_input_hex.setAttribute('id',randomId+'_cphex');
     colorpicker_input_hex.addEventListener('input',function(){
      var value;
      if(comboboxTitle == 'Font Color'){
        value = 'color';
      }
      if(comboboxTitle == 'Outline Color'){
        value = 'outline-color';
      }
      if(comboboxTitle == 'Border Color'){
        value = 'border-color';
      }
      if(comboboxTitle == 'Background Color'){
        value = 'background-color';
      }
      if(comboboxTitle == 'Text Shadow'){
        value = 'textShadowColor';
      }
      if(comboboxTitle == 'Box Shadow'){
        value = 'box-shadow-color';
      }
      if(comboboxTitle == 'Text Decoration Color'){
        value = 'text-decoration-color';
      }
      textToColorPickerColor(this,value,'.selected');
     });

     colorpicker.appendChild(colorpicker_box);
     colorpicker.appendChild(colorpicker_strip);
     colorpicker.appendChild(colorpicker_input_rgba);
     colorpicker.appendChild(colorpicker_input_hex);

     combobox_selected.appendChild(colordisplay);
     combobox_selected.appendChild(colorpicker);

     setTimeout(function(){
      if(comboboxTitle == 'Font Color'){
        setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','font',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
      }

      if(comboboxTitle == 'Outline Color'){
        setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','outlinecolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
      }

      if(comboboxTitle == 'Background Color'){
        setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','background',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
      }

      if(comboboxTitle == 'Border Color'){
        setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','border',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
      }

      if(comboboxTitle == 'Box Shadow'){
        setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','boxshadowcolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
      }

      if(comboboxTitle == 'Text Shadow'){
        setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','textshadowcolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
      }

      if(comboboxTitle == 'Text Decoration Color'){
        setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','textdecorationcolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
      }
     },5000);

    }

    for(var x=0; x<comboboxOptions.length; x++){
      var combobox_option = document.createElement('li');

      var combobox_option_a = document.createElement('a');
      combobox_option_a.innerText = comboboxOptions[x].value+unit;

      if(x == comboboxOptions.length-1){
        combobox_option_a.className = 'lastoption';
      }

      if(comboboxTitle == 'Text Align'){
        combobox_option_a.style.textAlign = comboboxOptions[x].value;
      }

      if(comboboxTitle == 'Text Decoration'){
        combobox_option_a.style.textDecoration = comboboxOptions[x].value;
      }

      if(comboboxTitle == 'Text Decoration Style'){
        combobox_option_a.style.textDecoration = 'Underline';
        combobox_option_a.style.textDecorationStyle = comboboxOptions[x].value;
      }

      if(comboboxTitle == 'Font Size'){
        combobox_option_a.style.fontSize = comboboxOptions[x].value+'px';
      }

      if(comboboxTitle == 'Font Style'){
        combobox_option_a.style.fontStyle = comboboxOptions[x].value;
      }

      if(comboboxTitle == 'Font Stretch'){
        combobox_option_a.style.fontStretch = comboboxOptions[x].value;
      }

      if(comboboxTitle == 'Font Weight'){
        combobox_option_a.style.fontWeight = comboboxOptions[x].value;
      }

      if(comboboxTitle == 'Font Variant'){
        combobox_option_a.style.fontVariant = comboboxOptions[x].value;
      }

      if(comboboxTitle == 'Border Style' || comboboxTitle == 'White Space' || comboboxTitle == 'Outline Style'){
        combobox_options_ul.style.overflowX = 'hidden';
        combobox_options_ul.style.overflowY = 'scroll';
        combobox_options_ul.style.height = '125px';
      }

      if(comboboxTitle == 'Display'){
        combobox_options_ul.style.overflowX = 'hidden';
        combobox_options_ul.style.overflowY = 'scroll';
        combobox_options_ul.style.height = '155px';
      }

      var combobox_option_a_span = document.createElement('span');
      combobox_option_a_span.innerText = comboboxOptions[x].value;
      combobox_option_a_span.setAttribute('class','value');

      combobox_option_a.appendChild(combobox_option_a_span);
      combobox_option.appendChild(combobox_option_a);

      if(comboboxTitle == 'Font Size'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.fontSize = this.getElementsByTagName('span')[0].innerText+'px';
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+'px';
          combobox_options.style.display = 'none';
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Height'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.height = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_options.style.display = 'none';
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Width'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.width = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_options.style.display = 'none';
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Text Align'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.textAlign = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Text Decoration'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.textDecoration = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Text Decoration Style'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.textDecorationStyle = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Font Style'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.fontStyle = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Font Stretch'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.fontStretch = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Font Variant'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.fontVariant = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Font Weight'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.fontWeight = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Border Size'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.border = this.getElementsByTagName('span')[0].innerText+'px'+' solid black';
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+'px';
          combobox_options.style.display = 'none';
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Border Style'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.borderStyle = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Display'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.display = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'White Space'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.whiteSpace = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox_options.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Border Radius'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.borderRadius = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_options.style.display = 'none';
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Margin Top'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.marginTop = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Margin Left'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.marginLeft = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Margin Right'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.marginRight = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Margin Bottom'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.marginBottom = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Padding Top'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.paddingTop = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Padding Left'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.paddingLeft = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Padding Right'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.paddingRight = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Padding Bottom'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.paddingBottom = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Letter Space'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.letterSpacing = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Word Space'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.wordSpacing = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Outline Width'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.outlineWidth = this.getElementsByTagName('span')[0].innerText+unit;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
          combobox_customedit.style.display = 'none';
          combobox.classList.remove('selectedCombobox');
        });
      }

      if(comboboxTitle == 'Outline Style'){
        combobox_option.addEventListener('click',function(){
          document.getElementsByClassName('selected')[0].style.outlineStyle = this.getElementsByTagName('span')[0].innerText;
          combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
          combobox.classList.remove('selectedCombobox');
        });
      }

      combobox_options_ul.appendChild(combobox_option);

    }

    combobox_selected_a_span.addEventListener('click',function(e){

        if(e.target == combobox_selected_a_span){

          if(combobox_options.style.display == 'block'){

            combobox_options.style.display = 'none';
            combobox_options_ul.style.display = 'none';
            if(addCustomEdit == 1){
              combobox_customedit.style.display = 'none';
            }
            if(addColorPicker == 1){
              colordisplay.style.display = 'none';
              colorpicker.style.display = 'none'
            }
            combobox_selected_a_span.style.textAlign = '';
            combobox.classList.remove('selectedCombobox');

          }else{

            combobox_options.style.display = 'block';
            combobox_options_ul.style.display = 'block';
            if(addCustomEdit == 1){
              combobox_customedit.style.display = 'block';
            }
            if(addColorPicker == 1){
              colordisplay.style.display = 'block';
            }
            combobox_selected_a_span.style.textAlign = 'left';
            combobox.classList.add('selectedCombobox');

          }

        }else{

        }

        });

      if(comboboxTitle == 'Font Size'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+'px';
            document.getElementsByClassName('selected')[0].style.fontSize = combobox_customedit.value+'px';
          });
      }

      if(comboboxTitle == 'Height'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.height = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Width'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.width = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Border Size'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+'px';
            document.getElementsByClassName('selected')[0].style.border = combobox_customedit.value+'px'+' solid black';
          });
      }

      if(comboboxTitle == 'Border Radius'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.borderRadius = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Margin Top'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.marginTop = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Margin Left'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.marginLeft = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Margin Right'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.marginRight = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Margin Bottom'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.marginBottom = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Padding Top'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.paddingTop = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Padding Left'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.paddingLeft = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Padding Right'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.paddingRight = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Padding Bottom'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.paddingBottom = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Letter Space'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.letterSpacing = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Word Space'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.wordSpacing = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Outline Width'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
            document.getElementsByClassName('selected')[0].style.outlineWidth = combobox_customedit.value+unit;
          });
      }

      if(comboboxTitle == 'Box Shadow'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value;
            document.getElementsByClassName('selected')[0].style.boxShadow = combobox_customedit.value;
          });
      }

      if(comboboxTitle == 'Text Shadow'){
          combobox_customedit.addEventListener('keyup',function(){
            combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value;
            document.getElementsByClassName('selected')[0].style.textShadow = combobox_customedit.value;
          });
      }

    combobox.appendChild(combobox_selected);

    if(comboboxOptions.length>0){
      combobox_options.appendChild(combobox_options_ul);
      combobox.appendChild(combobox_options);
    }

    document.getElementsByClassName('miniStyler_box')[0].appendChild(combobox);
  }

  drag(e){
    var elmnt = document.getElementsByClassName('miniStyler')[0];
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    styler_pos1 = styler_pos3 - e.clientX;
    styler_pos2 = styler_pos4 - e.clientY;
    styler_pos3 = e.clientX;
    styler_pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - styler_pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - styler_pos1) + "px";
    elmnt.style.cursor = 'grabbing';
  }

  mousedown(e){
    var elmnt = document.getElementsByClassName('miniStyler')[0];
    if(e.target == elmnt){
      e = e || window.event;
      e.preventDefault();

      elmnt.style.cursor = 'grab';

      // get the mouse cursor position at startup:
      styler_pos3 = e.clientX;
      styler_pos4 = e.clientY;
      document.onmouseup = this.closeDrag;

      // call a function whenever the cursor moves:
      document.onmousemove = this.drag;
    }
  }

  closeDrag(){
    var elmnt = document.getElementsByClassName('miniStyler')[0];
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor = 'default';
  }

}

//------------------------------------------------------------------

var styler = new miniStyler;
var fontmanager = new fontsManager;

//------------------------------------------------------------------

var resizeSite_startY, resizeSite_startHeight;

class sitepreview{
  constructor(){}

  resize(e){
   var site = document.getElementsByClassName('previewsite')[0];
   resizeSite_startY = e.clientY;
   resizeSite_startHeight = parseInt(document.defaultView.getComputedStyle(site).height, 10);
   document.documentElement.addEventListener('mousemove', this.resizeDrag, false);
   document.documentElement.addEventListener('mouseup', this.stopResizeDrag, false);
  }

  resizeDrag(e){
    var resizable = document.getElementsByClassName('previewsite')[0];
    if((resizeSite_startHeight + e.clientY - resizeSite_startY) < 800){
     return false;
    }else{
     resizable.style.height = (resizeSite_startHeight + e.clientY - resizeSite_startY) + 'px';
    }
  }

  stopResizeDrag(){
    document.documentElement.removeEventListener('mousemove', this.resizeDrag, false);
    document.documentElement.removeEventListener('mouseup', this.stopResizeDrag, false);
  }

  elementClicked(e){
    if(document.getElementsByClassName('miniStyler')[0] || document.getElementById('element-manager') || document.getElementsByClassName('fontManager')[0] || document.getElementById('bg-image-manager') || document.getElementsByClassName('elementEditor')[0] || document.getElementsByClassName('videoManager')[0] || document.getElementsByTagName('styles')[0]){

    }else{
    	if(e.target.tagName == 'IMG' && e.target.parentElement.className !== 'previewsite' &&$(e.target.parentElement).attr('data-e-type').includes('viewer')){

    	}else{
    		if(e.target.className == 'fas fa-expand' && e.target.tagName == 'I' && e.target.parentElement.className.includes('view')){

    		}else{
    			site.selectElement(e.target);
    		}
    	}
    }
  }

  selectElement(element){

    if(HoldTimer){
      clearTimeout(HoldTimer);
    }

    if(element.getAttribute("data-restrictions") == "selection"){
    	return false;
    }

    if(element.classList.contains('selected')){
        draggable.closeDrag();

        $('.selected').removeClass('selected');
        document.getElementsByClassName('wpb_tool_se')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('wpb_tool_se')[0].style.opacity = '0.4';
        document.getElementsByClassName('wpb_tool_re')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('wpb_tool_re')[0].style.opacity = '0.4';
        document.getElementsByClassName('wpb_tool_cf')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('wpb_tool_cf')[0].style.opacity = '0.4';
        document.getElementsByClassName('wpb_tool_bgi')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('wpb_tool_bgi')[0].style.opacity = '0.4';
        document.getElementsByClassName('wpb_tool_vmi')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('wpb_tool_vmi')[0].style.opacity = '0.4';
        document.getElementsByClassName('wpb_tool_de')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('wpb_tool_de')[0].style.opacity = '0.4';

        if(typeof $(element).attr('data-restrictions') !== typeof undefined && $(element).attr('data-restrictions') !== false){
        	if(!$(element).attr('data-restrictions').includes("dragging")){
              document.removeEventListener('keydown',site.moveElement,false);
              element.removeEventListener('mousedown',draggable.mousedown);
              $('.hint_element_move, .hint_element_exit').remove();
            }
        }else{
            document.removeEventListener('keydown',site.moveElement,false);
            element.removeEventListener('mousedown',draggable.mousedown);
            $('.hint_element_move, .hint_element_exit').remove();
        }

        document.getElementsByClassName('elPos')[0].style.display = 'none';
        document.getElementsByClassName('pcPos')[0].style.display = 'none';

        $('.selectedSpecialOptions, .eResizer').remove();

        $(".posMatchLeft").removeClass("posMatchLeft");
        $(".posMatchRight").removeClass("posMatchRight");
        $(".posMatchTop").removeClass("posMatchTop");
        $(".posMatchBottom").removeClass("posMatchBottom");

    }else{
        $('.selected').removeClass('selected');
        $('.selectedSpecialOptions, .eResizer').remove();

        element.classList.add('selected');

        if(typeof $(element).attr('data-restrictions') !== typeof undefined && $(element).attr('data-restrictions') !== false){
        	if(!$(element).attr('data-restrictions').includes("dragging")){
              document.addEventListener('keydown',site.moveElement,false);
              element.addEventListener('mousedown',draggable.mousedown);
              $('.hint_element_move, .hint_element_exit').remove();

              ui.displayKeyGuide();
            }
        }else{
        	document.addEventListener('keydown',site.moveElement,false);
            element.addEventListener('mousedown',draggable.mousedown);
            $('.hint_element_move, .hint_element_exit').remove();

            ui.displayKeyGuide();
        }

        $(".posMatchLeft").removeClass("posMatchLeft");
        $(".posMatchRight").removeClass("posMatchRight");
        $(".posMatchTop").removeClass("posMatchTop");
        $(".posMatchBottom").removeClass("posMatchBottom");

        draggable.closeDrag();

        ui.displayElementSpecialOptions($(element).attr('data-e-type'));

        document.getElementsByClassName('wpb_tool_se')[0].style.pointerEvents = 'unset';
        document.getElementsByClassName('wpb_tool_se')[0].style.opacity = '1';
        document.getElementsByClassName('wpb_tool_re')[0].style.pointerEvents = 'unset';
        document.getElementsByClassName('wpb_tool_re')[0].style.opacity = '1';
        document.getElementsByClassName('wpb_tool_cf')[0].style.pointerEvents = 'unset';
        document.getElementsByClassName('wpb_tool_cf')[0].style.opacity = '1';
        document.getElementsByClassName('wpb_tool_bgi')[0].style.pointerEvents = 'unset';
        document.getElementsByClassName('wpb_tool_bgi')[0].style.opacity = '1';
        document.getElementsByClassName('wpb_tool_de')[0].style.pointerEvents = 'unset';
        document.getElementsByClassName('wpb_tool_de')[0].style.opacity = '1';

        if($(element).attr('data-e-type') == 'video-overlay' || $(element).attr('data-e-type') == 'video' || $(element).attr('data-e-type').includes('video-player') || $(element).attr('data-e-type').includes('video-playlist')){
          document.getElementsByClassName('wpb_tool_vmi')[0].style.pointerEvents = 'unset';
          document.getElementsByClassName('wpb_tool_vmi')[0].style.opacity = '1';
        }else{
          document.getElementsByClassName('wpb_tool_vmi')[0].style.pointerEvents = 'none';
          document.getElementsByClassName('wpb_tool_vmi')[0].style.opacity = '0.4';
        }

        /*var deleteicon = document.createElement('i');
        deleteicon.className = 'fas fa-trash';

        deleteicon.addEventListener('click',function(event){
          if(event.target == deleteicon){
            e.remove();
          }
        });

        e.appendChild(deleteicon);*/
    }
  }

  moveElement(event){

    if([37, 38, 39, 40, 46, 27].indexOf(event.keyCode) > -1) {
        event.preventDefault();
        document.getElementsByClassName('selected')[0].style.transform = 'unset';
    }

    var elementPosition = document.getElementsByClassName('elPos')[0];
    elementPosition.style.display = 'inline-block';
    elementPosition.style.opacity = '1';

    var element = document.getElementsByClassName('selected')[0];

    elementPosition.addEventListener('click',function(){
      this.style.display = 'none';
    });

    if(event.keyCode == 46){
    	console.log("deleting");
      site.selectElement(element);
      element.remove();
      $('.selectedSpecialOptions').remove();
      $('.eResizer').remove();
      $('.hint_element_move, .hint_element_exit').remove();

      elementPosition.style.display = 'none';
      elementPosition.style.opacity = '0';

      var pageCenterPosition = document.getElementsByClassName('pcPos')[0];
      pageCenterPosition.style.display = 'none';
      pageCenterPosition.style.opacity = '0';
      console.log("deleted");
    }

    if(event.keyCode == 27){
      site.selectElement(element);
    }

    var leftvalue = document.getElementsByClassName('selected')[0].style.left;
    var topvalue = document.getElementsByClassName('selected')[0].style.top;

    if(leftvalue == null || leftvalue == '' || leftvalue == ' '){
      leftvalue = 0;
    }else{
      if(leftvalue.includes('px')){
        leftvalue = document.getElementsByClassName('selected')[0].style.left.split('px')[0];
      }else{
        leftvalue = 0;
      }
    }

    if(topvalue == null || topvalue == '' || topvalue == ' '){
      topvalue = 0;
    }else{
      if(topvalue.includes('px')){
        topvalue = document.getElementsByClassName('selected')[0].style.top.split('px')[0];
      }else{
        topvalue = 0;
      }
    }

    if(event.keyCode == 39){
      var newvalue = ++leftvalue;
      newvalue += 4;

      //if(leftvalue !== 101){
        document.getElementsByClassName('selected')[0].style.left = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+newvalue+'%,-'+topvalue+'%)';
        elementPosition.innerText = 'X: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
          //$('.selectedSpecialOptions, .eResizer').remove();
          relocateSpecialOptions();
          relocateElementResizer();
          detectBorderTouch(element);
        }
        draggable.calculateCenterPosition();
        tools.updateToolButton('toggle-gridlines');
      //}
    }

    if(event.keyCode == 37){
      var newvalue = --leftvalue;
      newvalue -= 4;

      //if(leftvalue !== -1){
        document.getElementsByClassName('selected')[0].style.left = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+newvalue+'%,-'+topvalue+'%)';
        elementPosition.innerText = 'X: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
          //$('.selectedSpecialOptions, .eResizer').remove();
          relocateSpecialOptions();
          relocateElementResizer();
          detectBorderTouch(element);
        }
        draggable.calculateCenterPosition();
        tools.updateToolButton('toggle-gridlines');
      //}
    }

    if(event.keyCode == 38){
      var newvalue = --topvalue;
      newvalue -= 4;

      //if(topvalue !== -1){
        document.getElementsByClassName('selected')[0].style.top = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+leftvalue+'%,-'+newvalue+'%)';
        elementPosition.innerText = 'Y: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
          //$('.selectedSpecialOptions, .eResizer').remove();
          relocateSpecialOptions();
          relocateElementResizer();
          detectBorderTouch(element);
        }
        draggable.calculateCenterPosition();
        tools.updateToolButton('toggle-gridlines');
      //}
    }

    if(event.keyCode == 40){
      var newvalue = ++topvalue;
      newvalue += 4;

      //if(topvalue !== 101){
        document.getElementsByClassName('selected')[0].style.top = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+leftvalue+'%,-'+newvalue+'%)';
        elementPosition.innerText = 'Y: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
          //$('.selectedSpecialOptions, .eResizer').remove();
          relocateSpecialOptions();
          relocateElementResizer();
          detectBorderTouch(element);
        }
        draggable.calculateCenterPosition();
        tools.updateToolButton('toggle-gridlines');
      //}
    }

  }

  updateLastElementAdded(){
    var elements = document.getElementsByClassName('previewsite')[0].children;
    var filteredelements = [];

    for(var i=0; i<elements.length; i++){
      if(elements[i].classList.contains('cguide') || elements[i].classList.contains('rguide') || elements[i].classList.contains('lguide') || elements[i].classList.contains('vcenterline') || elements[i].classList.contains('hcenterline')){

      }else{
        filteredelements.push(elements[i]);
      }
    }

    lastelementadded = filteredelements[filteredelements.length-1];
  }


  addElements(){
    var newelements = document.getElementById('element-manager').getElementsByClassName('selected_element');
    var readymadeelements = document.getElementById('element-manager').getElementsByClassName('selected_element_readymade');
    var element;
    var element_readymade;

    var hcenterline = document.getElementsByClassName('hcenterline')[0];
    var vcenterline = document.getElementsByClassName('vcenterline')[0];

    for(var i=0; i<readymadeelements.length; i++){
      var elementType_readymade = readymadeelements[i].getElementsByTagName('span')[0].innerText;

      if(elementType_readymade == 'Top NavBar'){
        element_readymade = document.createElement('div');
        element_readymade.className = 'topnavbar';
        element_readymade.setAttribute('data-e-type','navbar');
        element_readymade.setAttribute("data-restrictions","dragging");

        var a_1 = document.createElement('a');
        a_1.innerText = 'Home';
        a_1.setAttribute('data-page-name','Dashboard');

        element_readymade.appendChild(a_1);
      }else{
      	if(elementType_readymade == 'Image Gallery 1'){
      		element_readymade = document.createElement('div');
      		element_readymade.className = 'image-gallery-one';
      		element_readymade.setAttribute('data-e-type','image-gallery-one');
      		element_readymade.style.border = 'none';
      		element_readymade.style.overflowY = 'scroll';

      		for(var i=0; i<6; i++){
      			var img = document.createElement('img');
      			img.setAttribute('data-description','-');
      			img.addEventListener('mouseover',publicEvents.galleryImgDescription);
      			img.addEventListener('mouseout',publicEvents.galleryImgDescription);

      			img.setAttribute("data-restrictions","selection");
      			if(i !==3-1 && i !== 6-1){
      				img.style.marginRight = '15px';
      			}
      			element_readymade.appendChild(img);
      		}
      	}else{
      		if(elementType_readymade == 'Image Gallery 2'){
      			element_readymade = document.createElement('div');
      		    element_readymade.className = 'image-gallery-two';
      		    element_readymade.setAttribute('data-e-type','image-gallery-two');
      		    element_readymade.style.border = 'none';
      		    element_readymade.style.overflowY = 'scroll';

      		    for(var i=0; i<3; i++){
      			    var img = document.createElement('img');
      			    img.setAttribute('data-description','-');
      			    img.addEventListener('mouseover',publicEvents.galleryImgDescription);
      			    img.addEventListener('mouseout',publicEvents.galleryImgDescription);

      			    img.setAttribute("data-restrictions","selection");
      			    if(i !==3-1){
      				    img.style.marginRight = '15px';
      			    }
      			    element_readymade.appendChild(img);
      		    }
      		}else{
      			if(elementType_readymade == 'Image Gallery 3'){
      				element_readymade = document.createElement('div');
      		        element_readymade.className = 'image-gallery-three';
      		        element_readymade.setAttribute('data-e-type','image-gallery-three');
      		        element_readymade.style.border = 'none';
      		        element_readymade.style.overflowY = 'scroll';

      		        for(var i=0; i<4; i++){
      			        var img = document.createElement('img');
      			        img.setAttribute('data-description','-');
      			        img.addEventListener('mouseover',publicEvents.galleryImgDescription);
      			        img.addEventListener('mouseout',publicEvents.galleryImgDescription);

      			        img.setAttribute("data-restrictions","selection");
      			        if(i !==2-1 && i !== 4-1){
      				        img.style.marginRight = '15px';
      			        }
      			        element_readymade.appendChild(img);
      		        }
      			}else{
      				if(elementType_readymade == 'Image Slider 1'){
      					element_readymade = document.createElement('div');
      		            element_readymade.className = 'image-slider-one';
      		            element_readymade.setAttribute('data-e-type','image-slider-one');
      		            element_readymade.style.border = 'none';

      		            var leftbutton = document.createElement('i');
      		            var rightbutton = document.createElement('i');
      		            leftbutton.className = 'fas fa-arrow-left';
      		            rightbutton.className = 'fas fa-arrow-right';

      		            leftbutton.setAttribute("data-restrictions","selection");
      		            rightbutton.setAttribute("data-restrictions","selection");

      		            leftbutton.addEventListener('click',function(){
      		            	publicEvents.slideImgSlider1Images("left",element_readymade);
      		            });

      		            rightbutton.addEventListener('click',function(){
      		            	publicEvents.slideImgSlider1Images("right",element_readymade);
      		            });

      		            element_readymade.appendChild(leftbutton);

      		            var lastImage;
      		            var imgsrcs =
      						[

      						'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
      						'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
      						'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
      						'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
      						'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
      						'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
      						'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
      						'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
      						'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
      						'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
      						'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
      						'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',

      						];

      					var totalImgCount = 11;
      					var totalImgAdded = 0;

      					for(var z=0; z<3; z++){
      						var slide = document.createElement("div");

      						slide.setAttribute("data-restrictions","selection");

      						slide.addEventListener("click",function(){
      							site.selectElement(element_readymade);
      						});

      						if(z == 0){
      							slide.className = "active imgSlide";
      						}else{
      							slide.className = "imgSlide";
      						}

      						for(var i=0; i<4; i++){
      							var img = document.createElement('img');
      			                img.setAttribute('data-description','-');
      			                img.addEventListener('mouseover',publicEvents.galleryImgDescription);
      			                img.addEventListener('mouseout',publicEvents.galleryImgDescription);
      			                img.src = imgsrcs[totalImgAdded];

      			                if(totalImgAdded == 0 || totalImgAdded == 4 || totalImgAdded == 8 || totalImgAdded == 12){
      			            	    lastImage = img;
      			                }

      			                img.style.position = "absolute";
      			                img.id = "image-"+randomize.elementId(25);
      			                img.setAttribute("data-no",totalImgAdded);
      			                slide.appendChild(img);

      			                if(totalImgAdded == 0 || totalImgAdded == 4 || totalImgAdded == 8 || totalImgAdded == 12){
      			                    img.style.left = (Number(lastImage.style.left.replace("px","")) + 30) + "px";
      			                    console.log(((Number(lastImage.style.left.replace("px","")) + 30)) + "px");
      			                }else{
      			            	    img.style.left = (250 + Number(lastImage.style.left.replace("px","")) + 15) + "px";
      			                    console.log((250 + (Number(lastImage.style.left.replace("px","")) + 15)) + "px");
      			                }

      			                lastImage = img;

      			                totalImgAdded = totalImgAdded + 1;
      							console.log(totalImgAdded);
      						}

      						element_readymade.appendChild(slide);
      					}

      		            /*for(var i=0; i<11; i++){
      			            var img = document.createElement('img');
      			            img.setAttribute('data-description','-');
      			            img.addEventListener('mouseover',publicEvents.galleryImgDescription);
      			            img.addEventListener('mouseout',publicEvents.galleryImgDescription);
      			            img.src = imgsrcs[i];

      			            if(i == 0 || i == 4 || i == 8 || i == 12){
      			            	lastImage = img;
      			            }

      			            img.style.position = "absolute";
      			            img.id = "image-"+randomize.elementId(25);
      			            img.setAttribute("data-no",i);
      			            element_readymade.appendChild(img);

      			            if(i == 0 || i == 4 || i == 8 || i == 12){
      			                img.style.left = (Number(lastImage.style.left.replace("px","")) + 30) + "px";
      			                console.log(((Number(lastImage.style.left.replace("px","")) + 30)) + "px");
      			            }else{
      			            	img.style.left = (250 + Number(lastImage.style.left.replace("px","")) + 15) + "px";
      			                console.log((250 + (Number(lastImage.style.left.replace("px","")) + 15)) + "px");
      			            }

      			            if(i <= 4-1){
      			                lastImage = img;
      			            }else{
      			                lastImage = img;
      			                img.style.display = "none";
      			            }
      		            }*/

      		            element_readymade.setAttribute("data-total","2"/*2"*/);
      		            element_readymade.setAttribute("data-active","0");
      		            //element_readymade.setAttribute("data-total-steps",Math.round(11/4));

      		            element_readymade.appendChild(rightbutton);

      				}else{
      					if(elementType_readymade == 'Image Viewer 1'){
      						element_readymade = document.createElement('div');
      						element_readymade.className = 'image-viewer-one';
      						element_readymade.setAttribute('data-e-type','image-viewer-one');

      						var viewer = document.createElement('div');
      						var viewer_image = document.createElement('img');
      						viewer_image.src = /*'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg'*/'../assets/images/icons/noimage.png';
      						var thumbnails = document.createElement('div');

      						var expandIcon = document.createElement('i');
      						expandIcon.className = 'fas fa-expand';
      						expandIcon.addEventListener("click",function(e){
      							$(".selectedSpecialOptions").css({'display':'none'});
      							publicEvents.enlargeImage(e,viewer_image.src);
      						});

      						var title = document.createElement('span');
      						title.innerText = 'Title';

      						viewer.appendChild(title);
      						viewer.appendChild(expandIcon);

      						viewer.className = 'image-view';
      						thumbnails.className = 'image-viewer-thumbnails';

      						thumbnails.setAttribute("data-restrictions","selection");
      						viewer.setAttribute("data-restrictions","selection");
      						viewer_image.setAttribute("data-restrictions","selection");
      						title.setAttribute("data-restrictions","selection");
      						expandIcon.setAttribute("data-restrictions","selection");

      						viewer.appendChild(viewer_image);
      						element_readymade.appendChild(viewer);
      						element_readymade.appendChild(thumbnails);
      					}else{
      						if(elementType_readymade == 'Image Viewer 2'){
      							element_readymade = document.createElement('div');
      						    element_readymade.className = 'image-viewer-two';
      						    element_readymade.setAttribute('data-e-type','image-viewer-two');

      						    element_readymade.setAttribute("data-state","1"); // 1 : Closed , 2 : Thumbnails Only , 3 : Full Opened
      						    element_readymade.setAttribute("data-loc","1"); // 1 : Right, 2 : Left

      						    element_readymade.setAttribute("data-restrictions","dragging");

      						    element_readymade.style.left = "100%";
      						    //element_readymade.style.right = "0";
      						    //element_readymade.style.height = "100%";
      						    //element_readymade.style.marginTop = "0";
      						    //element_readymade.style.marginRight = "0";
      						    //element_readymade.style.overflow = "unset";

      						    var viewer = document.createElement('div');
      						    var viewer_image = document.createElement('img');
      						    viewer_image.src = '../assets/images/icons/noimage.png';
      						    var thumbnails = document.createElement('div');

      						    var hide_unhide_span = document.createElement('span');
      						    var hide_unhide_i = document.createElement('i');

      						    hide_unhide_i.className = "fas fa-images";
      						    hide_unhide_span.className = "image-viewer-visibility-toggle";

      						    hide_unhide_span.setAttribute("data-loc",1);

      						    hide_unhide_i.setAttribute("data-restrictions","selection");
      						    hide_unhide_span.setAttribute("data-restrictions","selection");

      						    hide_unhide_i.addEventListener("click",function(){
      						    	publicEvents.toggle_ImgViewer2(element_readymade);
      						    });

      						    var expandIcon = document.createElement('i');
      						    expandIcon.className = 'fas fa-expand';
      						    expandIcon.addEventListener("click",function(e){
      							   $(".selectedSpecialOptions").css({'display':'none'});
      							   publicEvents.enlargeImage(e,viewer_image.src);
      						    });

      						    var title = document.createElement('span');
      						    title.innerText = 'Title';

      						    viewer.appendChild(title);
      						    viewer.appendChild(expandIcon);

      						    viewer.className = 'image-view';
      						    thumbnails.className = 'image-viewer-thumbnails';

      						    var imgsrcs =
      						    [

      						    'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
      						    'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
      						    'https://cdn.pixabay.com/photo/2013/10/02/23/03/dawn-190055__340.jpg',
      						    'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
      						    'https://cdn.pixabay.com/photo/2018/07/09/16/59/clouds-3526558__340.jpg',
      						    'https://cdn.pixabay.com/photo/2016/08/14/16/40/monument-valley-1593318__340.jpg',
      						    'https://cdn.pixabay.com/photo/2014/08/09/15/45/sky-414198__340.jpg',
      						    'https://cdn.pixabay.com/photo/2016/10/20/17/41/travel-1756150__340.jpg',
      						    'https://cdn.pixabay.com/photo/2014/10/29/21/46/railway-508568__340.jpg',
      						    'https://cdn.pixabay.com/photo/2016/08/24/17/09/vibrant-1617470__340.jpg'

      						    ];

      						    for(var i=0; i<10; i++){
      							    var img = document.createElement('img');
      							    img.src = imgsrcs[i];
      							    img.setAttribute('data-description','Title');

      							    img.setAttribute("data-restrictions","selection");

      							    img.addEventListener('click',function(e){
      								    publicEvents.changeImageViewerImage(e,viewer_image,title,true);
      							    });

      							    thumbnails.appendChild(img);
      						    }

      						    hide_unhide_span.appendChild(hide_unhide_i);
      						    viewer.appendChild(viewer_image);

      						    element_readymade.appendChild(hide_unhide_span);
      						    element_readymade.appendChild(viewer);
      						    element_readymade.appendChild(thumbnails);
      						}else{
      							if(elementType_readymade == 'Checkbox 1' || elementType_readymade == 'Checkbox 2' || elementType_readymade == 'Checkbox 3'){
      								element_readymade = document.createElement('div');

      						        var span = document.createElement("span");
      								var p = document.createElement("p");
      								var checkmark = document.createElement("span");
      								checkmark.className = "checkmark";

      						        element_readymade.setAttribute("data-bg-hv","grey");

      						        element_readymade.setAttribute("data-checked","1");

      						        if(elementType_readymade == 'Checkbox 1'){
      									element_readymade.className = 'checkbox-one';
      						            element_readymade.setAttribute('data-e-type','checkbox-one');

      						            element_readymade.setAttribute("data-bg","black");
      						            span.style.backgroundColor = "black";
      								}else{
      									if(elementType_readymade == 'Checkbox 2'){
      										element_readymade.className = 'checkbox-two';
      						                element_readymade.setAttribute('data-e-type','checkbox-two');

      						                element_readymade.setAttribute("data-bg","darkgrey");
      						                span.style.backgroundColor = "darkgrey";
      									}else{
      										if(elementType_readymade == 'Checkbox 3'){
      										    element_readymade.className = 'checkbox-three';
      						                    element_readymade.setAttribute('data-e-type','checkbox-three');

      						                    element_readymade.setAttribute("data-bg","lightgrey");
      						                    span.style.backgroundColor = "lightgrey";
      									    }
      									}
      								}

      						        checkmark.addEventListener("mouseover",function(){
      						        	publicEvents.checkbox_hover(span);
      						        });

      						        checkmark.addEventListener("mouseout",function(){
      						        	publicEvents.checkbox_hoverOut(span);
      						        });

      						        checkmark.addEventListener("click",function(){
      						        	publicEvents.checkbox_click(element_readymade);
      						        });

      								span.setAttribute("data-restrictions","selection");
      								p.setAttribute("data-restrictions","selection");
      								checkmark.setAttribute("data-restrictions","selection");

      								p.innerText = "Checkbox";

      								element_readymade.appendChild(span);
      								element_readymade.appendChild(p);
      								element_readymade.appendChild(checkmark);
      							}else{
      								if(elementType_readymade == 'Toggle Switch 1' || elementType_readymade == 'Toggle Switch 2'){
      									element_readymade = document.createElement('div');

      									var label = document.createElement("label");
      									var span = document.createElement("span");
      									var p = document.createElement("p");
      									var input = document.createElement("input");

      									input.type = "checkbox";

      									element_readymade.setAttribute("data-state","0"); // 1 : on , 0 : off

      									if(elementType_readymade == 'Toggle Switch 1'){
      									    element_readymade.className = 'toggle-switch-one';
      						                element_readymade.setAttribute('data-e-type','toggle-switch-one');

      						                element_readymade.setAttribute("data-bg-o","black");
      						                element_readymade.setAttribute("data-bg-c","lightgrey");
      								    }else{
      									    if(elementType_readymade == 'Toggle Switch 2'){
      										    element_readymade.className = 'toggle-switch-two';
      						                    element_readymade.setAttribute('data-e-type','toggle-switch-two');

      						                    element_readymade.setAttribute("data-bg-o","black");
      						                    element_readymade.setAttribute("data-bg-c","lightgrey");
      									    }
      									}

      									span.setAttribute("data-restrictions","selection");
      								    p.setAttribute("data-restrictions","selection");
      								    input.setAttribute("data-restrictions","selection");
      								    label.setAttribute("data-restrictions","selection");

      								    p.innerText = "Toggle Switch";

      								    input.addEventListener("click",function(){
      						        	    publicEvents.toggleSwitch_click(element_readymade);
      						            });

      								    label.appendChild(input);
      								    label.appendChild(span);

      								    element_readymade.appendChild(label);
      								    element_readymade.appendChild(p);

      								}else{
      									if(elementType_readymade == 'Dropdown List 1'){
      										element_readymade = document.createElement("div");
      										element_readymade.className = "dropdown-list-one";

      										element_readymade.setAttribute("data-state",0);

      										element_readymade.setAttribute("data-option-bg","white");
      										element_readymade.setAttribute("data-option-bg-hv","black");

      										element_readymade.setAttribute("data-option-bg-clr","black");
      										element_readymade.setAttribute("data-option-bg-hv-clr","white");

      										element_readymade.setAttribute("data-e-type","dropdown-list-one");

      										var selected = document.createElement("div");
      										var selected_span = document.createElement("span");

      										selected_span.innerText = "Dropdown List";

      										selected_span.addEventListener("click",function(){
      											publicEvents.dropdownlist_toggle(element_readymade);
      										});

      										var options = document.createElement("div");
      										var options_ul = document.createElement("ul");

      										selected.className = "selected_option";
      										options.className = "options";

      										selected.setAttribute("data-restrictions","selection");
      										selected_span.setAttribute("data-restrictions","selection");
      										options.setAttribute("data-restrictions","selection");
      										options_ul.setAttribute("data-restrictions","selection");

      										selected.appendChild(selected_span);
      										options.appendChild(options_ul);

      										for(var i=0; i<10; i++){
      											var option = document.createElement("li");
      											var option_a = document.createElement("a");

      											var option_span = document.createElement("span");
      											//var option_span_i = document.createElement("i");
      											//option_span_i.className = "fas fa-check";

      											//option_span.appendChild(option_span_i);

      											option_a.innerText = "Option "+i;

      											(function(option,option_a,element_readymade){
      												option_a.addEventListener("click",function(e){
      												    publicEvents.dropdownlist_option_click(element_readymade,e);
      											    });

      											    option_a.addEventListener("mouseover",function(){
      												    publicEvents.dropdownlist_option_hover(option,option_a,element_readymade.getAttribute("data-option-bg-hv"),element_readymade.getAttribute("data-option-bg-hv-clr"));
      											    });

      											    option_a.addEventListener("mouseout",function(){
      												    publicEvents.dropdownlist_option_hoverOut(option,option_a,element_readymade.getAttribute("data-option-bg"),element_readymade.getAttribute("data-option-bg-clr"));
      											    });
      											})(option,option_a,element_readymade);

      											option.setAttribute("data-restrictions","selection");
      											option_a.setAttribute("data-restrictions","selection");

      											option.appendChild(option_a);
      											option.appendChild(option_span);
      											options_ul.appendChild(option);
      										}

      										element_readymade.appendChild(selected);
      										element_readymade.appendChild(options);
      									}else{
      										if(elementType_readymade == 'Dropdown List 2'){
      											element_readymade = document.createElement("div");
      											element_readymade.className = "dropdown-list-two";

      											element_readymade.setAttribute("data-state",0);

      											element_readymade.setAttribute("data-option-bg","white"); // bg
      											element_readymade.setAttribute("data-option-bg-hv","black"); // bg hover

      											element_readymade.setAttribute("data-option-bg-clr","black"); // bg fontcolor
      											element_readymade.setAttribute("data-option-bg-hv-clr","white"); // bg hover fontcolor

      											element_readymade.setAttribute("data-e-type","dropdown-list-two");

      											element_readymade.setAttribute("data-selected-bg","black"); // bg
      											element_readymade.setAttribute("data-selected-bg-hv","#e3e3e3"); // bg hover

      											element_readymade.setAttribute("data-selected-bg-clr","white"); // bg fontcolor
      											element_readymade.setAttribute("data-selected-bg-hv-clr","black"); // bg hover fontcolor

      											var selected = document.createElement("div");
      											var selected_span = document.createElement("span");

      											selected_span.innerText = "Dropdown List - Multi Select";

      											selected_span.addEventListener("click",function(){
      												publicEvents.dropdownlist_toggle(element_readymade);
      											});

      											var selected_multi_selects = document.createElement("div");
      											selected_multi_selects.className = "multi-selects";
      											selected_multi_selects.setAttribute("data-restrictions","selection");

      											var options = document.createElement("div");
      											var options_ul = document.createElement("ul");

      											selected.className = "selected_option";
      											options.className = "options";

      											selected.setAttribute("data-restrictions","selection");
      											selected_span.setAttribute("data-restrictions","selection");
      											options.setAttribute("data-restrictions","selection");
      											options_ul.setAttribute("data-restrictions","selection");

      											selected.appendChild(selected_span);
      											selected.appendChild(selected_multi_selects);
      											options.appendChild(options_ul);

      											for(var i=0; i<10; i++){
      											    var option = document.createElement("li");
      											    var option_a = document.createElement("a");

      											    var option_span = document.createElement("span");
      											    //var option_span_i = document.createElement("i");
      											    //option_span_i.className = "fas fa-check";

      											    //option_span.appendChild(option_span_i);

      											    option_a.innerText = "Option "+i;

      											    (function(option,option_a,element_readymade){
      												    option_a.addEventListener("click",function(e){
      												        publicEvents.dropdownlist_multiselect_option_click(element_readymade,e);
      											        });

      											        option_a.addEventListener("mouseover",function(){
      												        publicEvents.dropdownlist_option_hover(option,option_a,element_readymade.getAttribute("data-option-bg-hv"),element_readymade.getAttribute("data-option-bg-hv-clr"));
      											        });

      											        option_a.addEventListener("mouseout",function(){
      												        publicEvents.dropdownlist_option_hoverOut(option,option_a,element_readymade.getAttribute("data-option-bg"),element_readymade.getAttribute("data-option-bg-clr"));
      											        });
      											    })(option,option_a,element_readymade);

      											    option.setAttribute("data-restrictions","selection");
      											    option_a.setAttribute("data-restrictions","selection");

      											    option.appendChild(option_a);
      											    option.appendChild(option_span);
      											    options_ul.appendChild(option);
      										    }

      											element_readymade.appendChild(selected);
      										    element_readymade.appendChild(options);
      										}else{
      											if(elementType_readymade == "Textbox 1"){
      												element_readymade = document.createElement("div");
      												element_readymade.className = "textbox-one";

      												element_readymade.setAttribute("data-e-type","textbox-one");

      												element_readymade.style.width = "300px";
      												element_readymade.style.height = "30px";

      												var label = document.createElement("label");
      												var input = document.createElement("input");
      												var length = document.createElement("span");
      												var icon_wrapper = document.createElement("div");
      												var icon = document.createElement("i");

      											    //input.style.paddingLeft = "25px";
      												icon.className = "fas fa-plus";

      												icon_wrapper.className = "icon-wrapper";
      												length.className = "inputLength";

      												input.setAttribute("maxLength",50);
      												element_readymade.setAttribute("data-max-length",50);

      												element_readymade.setAttribute("data-length-text-state",1);
      												element_readymade.setAttribute("data-i-state",1);

      												length.innerText = "0/50";

      												label.setAttribute("data-restrictions","selection");
      												input.setAttribute("data-restrictions","selection");
      												length.setAttribute("data-restrictions","selection");
      												icon.setAttribute("data-restrictions","selection");
      												icon_wrapper.setAttribute("data-restrictions","selection");

      												input.addEventListener("input",function(){
      													publicEvents.textbox_input(element_readymade);
      												});

      												label.innerText = "Textbox";
      												input.type = "text";

      												icon_wrapper.appendChild(icon);
      												icon_wrapper.appendChild(input);
      												icon_wrapper.appendChild(length);

      												element_readymade.appendChild(label);
      												element_readymade.appendChild(icon_wrapper);
      											}else{
      												if(elementType_readymade == "Textbox 2"){
      													element_readymade = document.createElement("div");
      												    element_readymade.className = "textbox-two";

      												    element_readymade.setAttribute("data-e-type","textbox-two");

      												    element_readymade.style.width = "300px";
      												    element_readymade.style.height = "30px";

      												    var label = document.createElement("label");
      												    var input = document.createElement("input");
      												    var length = document.createElement("span");
      												    var icon_wrapper = document.createElement("div");
      												    var icon = document.createElement("i");

      												    //input.style.paddingLeft = "25px";
      												    icon.className = "fas fa-plus";

      												    icon_wrapper.className = "icon-wrapper";

      												    length.className = "inputLength";

      												    input.setAttribute("maxLength",50);
      												    element_readymade.setAttribute("data-max-length",50);

      												    element_readymade.setAttribute("data-length-text-state",1);
      												    element_readymade.setAttribute("data-i-state",1);

      												    length.innerText = "0/50";

      												    label.setAttribute("data-restrictions","selection");
      												    input.setAttribute("data-restrictions","selection");
      												    length.setAttribute("data-restrictions","selection");
      												    icon.setAttribute("data-restrictions","selection");
      												    icon_wrapper.setAttribute("data-restrictions","selection");

      												    input.addEventListener("input",function(){
      												    	publicEvents.textbox_input(element_readymade);
      												    });

      												    label.innerText = "Textbox";
      												    input.type = "text";

      												    element_readymade.setAttribute("data-label-pos","0"); // 0 : left , 1 : right

      												    icon_wrapper.appendChild(icon);
      												    icon_wrapper.appendChild(input);
      												    icon_wrapper.appendChild(length);

      												    element_readymade.appendChild(label);
      												    element_readymade.appendChild(icon_wrapper);
      												}else{
      													if(elementType_readymade == "Checkbox 4" || elementType_readymade == "Checkbox 5"){
      														element_readymade = document.createElement("div");

      														element_readymade.setAttribute("data-checkmark-shape","tick");

      														var p = document.createElement("p");
      														p.innerText = "Text";
      														p.setAttribute("data-restrictions","selection");

      														p.className = "question";

      														element_readymade.appendChild(p);

      														for(var i=0; i<4; i++){
      															var checkbox = document.createElement("div");

      															var span = document.createElement("span");
      								                            var p = document.createElement("p");
      								                            var checkmark = document.createElement("span");

      								                            element_readymade.setAttribute("data-bg","black");
      						                                    element_readymade.setAttribute("data-bg-hv","grey");

      						                                    span.style.backgroundColor = "black";

      						                                    checkbox.setAttribute("data-checked","0");
      						                                    checkmark.className = "checkmark tick-checkmark-disabled";

      									                        checkbox.className = 'checkbox';
      						                                    checkbox.setAttribute("data-restrictions","selection");

      						                                    if(elementType_readymade == "Checkbox 4"){
      						                                    	element_readymade.setAttribute('data-e-type','checkbox-multi-one');
      														        element_readymade.className = 'checkbox-multi-one';

      														        (function(span,checkbox,checkmark){

      						                                            (function(checkmark,span){
      						                                        	    checkmark.addEventListener("mouseover",function(){
      						                                    		    publicEvents.checkbox_hover(span);
      						                                    	        });

      						                                                checkmark.addEventListener("mouseout",function(){
      						                                        	        publicEvents.checkbox_hoverOut(span);
      						                                                });
      						                                            })(checkmark,span);

      						                                            (function(checkmark,checkbox){
      						                                        	    checkmark.addEventListener("click",function(){
      						        	                                        publicEvents.multi_checkbox_click(checkbox,element_readymade);
      						                                                });
      						                                            })(checkmark,checkbox);

      						                                        })(span,checkbox,checkmark);

      						                                    }else{
      						                                    	if(elementType_readymade == "Checkbox 5"){
      						                                    		element_readymade.setAttribute('data-e-type','checkbox-multi-two');
      														            element_readymade.className = 'checkbox-multi-two';

      														            (function(span,checkbox,checkmark){

      						                                                (function(checkmark,span){
      						                                        	        checkmark.addEventListener("mouseover",function(){
      						                                    		        publicEvents.checkbox_hover(span);
      						                                    	            });

      						                                                    checkmark.addEventListener("mouseout",function(){
      						                                        	            publicEvents.checkbox_hoverOut(span);
      						                                                    });
      						                                                })(checkmark,span);

      						                                                (function(checkmark,checkbox){
      						                                        	        checkmark.addEventListener("click",function(){
      						        	                                            publicEvents.multi_checkbox_two_click(checkbox,element_readymade);
      						                                                    });
      						                                                })(checkmark,checkbox);

      						                                            })(span,checkbox,checkmark);

      						                                    	}
      						                                    }

      								                            span.setAttribute("data-restrictions","selection");
      								                            p.setAttribute("data-restrictions","selection");
      								                            checkmark.setAttribute("data-restrictions","selection");

      								                            p.innerText = "Checkbox";

      								                            checkbox.appendChild(span);
      								                            checkbox.appendChild(p);
      								                            checkbox.appendChild(checkmark);

      								                            element_readymade.appendChild(checkbox);
      														}

      													}else{
      														if(elementType_readymade == "Textbox 3"){
      															element_readymade = document.createElement("div");
      												    		element_readymade.className = "textbox-three";

      												    		element_readymade.setAttribute("data-e-type","textbox-three");

      												    		element_readymade.style.width = "300px";
      												            element_readymade.style.height = "30px";

      												    		var icon_wrapper = document.createElement("div");
      												    		//icon_wrapper.style.height = "100%";
      												    		var icon = document.createElement("i");
      												    		var input = document.createElement("input");
      												    		var length = document.createElement("span");
      												    		length.className = "inputLength";

      												    		//input.style.paddingLeft = "25px";
      												    		icon.className = "fas fa-plus";

      												    		icon_wrapper.className = "icon-wrapper";

      												    		input.setAttribute("maxLength",50);
      												    		input.setAttribute("placeholder","Placeholder Text");

      												    		element_readymade.setAttribute("data-max-length",50);

      												    		element_readymade.setAttribute("data-length-text-state",1);
      												            element_readymade.setAttribute("data-i-state",1);

      												    		length.innerText = "0/50";

      												    		icon_wrapper.setAttribute("data-restrictions","selection");
      												    		input.setAttribute("data-restrictions","selection");
      												    		length.setAttribute("data-restrictions","selection");
      												    		icon.setAttribute("data-restrictions","selection");

      												    		input.addEventListener("input",function(){
      												    			publicEvents.textbox_input(element_readymade);
      												    		});

      												    		input.type = "text";

      												    		//element_readymade.setAttribute("data-label-pos","0"); // 0 : left , 1 : right

      												    		icon_wrapper.appendChild(icon);

      												    		element_readymade.appendChild(icon_wrapper);
      												    		icon_wrapper.appendChild(input);
      												    		icon_wrapper.appendChild(length);
      														}else{
      															if(elementType_readymade == "Ratings 1"){
      																element_readymade = document.createElement("div");
      																element_readymade.className = "ratings-one";

      																element_readymade.setAttribute("data-selection",0);
      																element_readymade.setAttribute("data-e-type","ratings-one");

      																element_readymade.style.width = "150px";
      																element_readymade.style.height = "20px";

      																element_readymade.setAttribute("data-i-bg","white");
      																element_readymade.setAttribute("data-i-bg-selected","gold");

      																for(var i=0; i<5; i++){
      																	var rating = document.createElement("i");
      																	rating.className = "fas fa-star";

      																	rating.id = i+1;
      																	rating.setAttribute("data-restrictions","selection");

      																	rating.addEventListener("mouseover",function(e){
      																		publicEvents.ratings_mouseover(this,element_readymade);
      																	});

      																	rating.addEventListener("click",function(e){
      																		publicEvents.ratings_click(this,element_readymade);
      																	});

      																	element_readymade.appendChild(rating);
      																}

      																element_readymade.addEventListener("mouseout",function(){
      																	publicEvents.ratings_cancel(this);
      																});
      															}else{
      																if(elementType_readymade == "Ratings 2"){
      																	element_readymade = document.createElement("div");
      																    element_readymade.className = "ratings-two";

      																    element_readymade.setAttribute("data-selection",0);
      																    element_readymade.setAttribute("data-e-type","ratings-two");

      																    element_readymade.setAttribute("data-i-bg","white");
      																    element_readymade.setAttribute("data-i-bg-selected","gold");

      																    var i_holder = document.createElement("span");
      																    i_holder.className = "i_holder";

      																    var p = document.createElement("p");
      																    p.innerText = "Ratings";

      																    i_holder.setAttribute("data-restrictions","selection");
      																    p.setAttribute("data-restrictions","selection");

      																    for(var i=0; i<5; i++){
      																	    var rating = document.createElement("i");
      																	    rating.className = "fas fa-star";

      																	    rating.id = i+1;
      																	    rating.setAttribute("data-restrictions","selection");

      																	    rating.addEventListener("mouseover",function(e){
      																		    publicEvents.ratings_mouseover(this,element_readymade);
      																	    });

      																	    rating.addEventListener("click",function(e){
      																		    publicEvents.ratings_click(this,element_readymade);
      																	    });

      																	    i_holder.appendChild(rating);
      																    }

      																    element_readymade.addEventListener("mouseout",function(){
      																	    publicEvents.ratings_cancel(this);
      																    });

      																    element_readymade.appendChild(p);
      																    element_readymade.appendChild(i_holder);
      																}else{
      																	if(elementType_readymade == "Video Player 1"){
      																		element_readymade = document.createElement("div");
      																		element_readymade.className = "video-player-one";

      																		element_readymade.setAttribute("data-e-type","video-player-one");
      																		element_readymade.setAttribute("data-title","Video Title");
      																		element_readymade.setAttribute("data-info-state",0);
      																		element_readymade.setAttribute("data-info-style",0);
      																		element_readymade.setAttribute("data-description","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta risus eros, a facilisis velit viverra vel. Ut vel mauris rhoncus, mollis mi ac, elementum leo. Ut pharetra erat eu elit facilisis faucibus. Donec facilisis sem ac urna condimentum, quis hendrerit odio accumsan. Integer vel congue elit. Nullam viverra commodo ipsum et blandit. Mauris diam ligula, dapibus eu finibus porta, commodo tempus ipsum.Nunc vulputate turpis vel viverra sodales. Integer gravida, nibh eget tristique gravida, nulla magna feugiat nulla, vitae vehicula diam ligula eget ex. Aenean dignissim id nibh sit amet volutpat. Suspendisse dignissim nisi non nunc feugiat, in blandit leo consequat. Praesent rhoncus leo vel diam fermentum pretium. Mauris ut arcu at ipsum tristique malesuada. Curabitur sed tempor ante. Vivamus ultricies commodo eros, eu fringilla mi auctor ut. Ut blandit, dolor sit amet interdum bibendum, nulla diam accumsan nunc, at ullamcorper est purus non lorem.Proin commodo augue justo, sed fringilla lacus pharetra a. Proin cursus luctus placerat. Quisque aliquet magna eget libero accumsan, eu euismod nunc auctor. Vestibulum ultricies dolor sed nibh aliquam fringilla. Morbi quis nulla nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan nisl sollicitudin felis egestas, non commodo neque tempus. In malesuada vestibulum dapibus. Nullam urna eros, accumsan sed velit vitae, viverra mollis lorem. Curabitur eu posuere nibh, et sodales mi. Maecenas posuere ullamcorper volutpat. Integer bibendum porta massa sed eleifend. Quisque rutrum eget urna vitae porttitor. Vivamus non eros purus. Sed rhoncus mi ut velit faucibus semper.");

      																		var video = document.createElement("video");
      																		video.src = "../assets/videos/videotest.mp4";

      																		video.addEventListener("click",function(){
      																			site.selectElement(element_readymade);
      																		});

      																		video.addEventListener("playing",function(){
      																			publicEvents.videoIsPlaying(element_readymade);
      																		});

      																		video.addEventListener("waiting",function(){
      																			publicEvents.videoIsWaiting(element_readymade);
      																		});

      																		var videoThumbnail = document.createElement("img");
      																		videoThumbnail.className = "video-player-thumb";

      																		videoThumbnail.addEventListener("click",function(){
      																			site.selectElement(element_readymade);
      																		});

      																		var bufferDiv = document.createElement("div");
      																		bufferDiv.className = "buffer-icon";

      																		for(var o=0; o<4; o++){
      																			var div = document.createElement("div");
      																			div.setAttribute("data-restrictions","selection");
      																			bufferDiv.appendChild(div);
      																		}

      																		var info = document.createElement("div");
      																		info.className = "video-info";

      																		var p1 = document.createElement("p");
      																		p1.className = "heading";
      																		p1.innerText = element_readymade.getAttribute("data-title");

      																		var p2 = document.createElement("p");
      																		p2.className = "description";
      																		p2.innerText = element_readymade.getAttribute("data-description");

      																		info.appendChild(p1);
      																		info.appendChild(p2);

      																		var controls = document.createElement("div");
      																		controls.className = "video-controls";

      																		var infoIcon = document.createElement("i");
      																		infoIcon.className = "fas fa-info-circle";

      																		infoIcon.addEventListener("click",function(e){
      																			publicEvents.videoInfo(video,e);
      																		});

      																		var progressInput = document.createElement("input");
      																		progressInput.className = "progressbar";
      																		progressInput.type = "range";
      																		progressInput.setAttribute("min",0.00);
      																		progressInput.setAttribute("max",100.00);
      																		progressInput.value = 0.00;

      																		var canvas = document.createElement("canvas");

      																		var time = document.createElement("span");
      																		time.innerText = "00:00 / 00:00";

      																		var startpause = document.createElement("i");
      																		startpause.className = "fas fa-play";

      																		var expand = document.createElement("div");
      																		expand.className = "expand";

      																		var expandIcon = document.createElement("i");
      																		expandIcon.className = "fas fa-expand";

      																		var volume = document.createElement("div");
      																		volume.className = "volume";

      																		var volume_range = document.createElement("input");
      																		volume_range.type = "range";
      																		volume_range.setAttribute("min",0);
      																		volume_range.setAttribute("max",1);
      																		volume_range.setAttribute("step",0.1);
      																		volume_range.setAttribute("value",1);

      																		var volume_i = document.createElement("i");
      																		volume_i.className = "fas fa-volume-up";

      																		volume.appendChild(volume_i);
      																		volume.appendChild(volume_range);

      																		expand.appendChild(expandIcon);

      																		controls.appendChild(startpause);
      																		controls.appendChild(progressInput);
      																		controls.appendChild(time);
      																		controls.appendChild(infoIcon);
      																		controls.appendChild(canvas);

      																		startpause.addEventListener("click",function(e){
      																			publicEvents.videoPlayPause(video,e);
      																		});

      																		expandIcon.addEventListener("click",function(e){
      																			if(this.className == "fas fa-compress"){
      																				publicEvents.videoExitFullScreen(video,e);
      																			}else{
      																				if(this.className == "fas fa-expand"){
      																					publicEvents.videoFullScreen(video,e);
      																			    }
      																			}
      																		});

      																		progressInput.addEventListener("mouseout",function(e){
      																			publicEvents.videoHideFrame(element_readymade,e);
      																		});

      																		progressInput.addEventListener("mousemove",function(e){
      																			publicEvents.videoPositionFrame(element_readymade,e);
      																		});

      																		video.addEventListener('loadeddata', function(){
      																			time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
      																	        progressInput.setAttribute("max",this.duration);

      																	        publicEvents.moveVideoProgressBar(this);
      																	        videoThumbnail.style.opacity = 1;
      																	        bufferDiv.style.opacity = 0;
      																	    });

      																	    video.addEventListener('timeupdate', function(){
      																			time.innerText = publicEvents.videoDurationToReadable(this.currentTime)+" / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
      																	        progressInput.value = this.currentTime.toFixed(0);

      																	        publicEvents.moveVideoProgressBar(this);
      																	    });

      																	    video.addEventListener("ended",function(){
      																	    	publicEvents.videoEnded(this);

      																	    	progressInput.value = 0.00;
      																	    	time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
      																	    	publicEvents.moveVideoProgressBar(this);
      																	    	videoThumbnail.style.opacity = 1;
      																	    });

      																	    progressInput.addEventListener("change",function(e){
      																	        publicEvents.videoChangeDuration(video,e);
      																	    });

      																	    volume_range.addEventListener("change",function(e){
      																	        publicEvents.videoChangeVolume(video,e);
      																	    });

      																		startpause.setAttribute("data-restrictions","selection");
      																		progressInput.setAttribute("data-restrictions","selection");
      																		time.setAttribute("data-restrictions","selection");
      																		controls.setAttribute("data-restrictions","selection");
      																		video.setAttribute("data-restrictions","selection");
      																		infoIcon.setAttribute("data-restrictions","selection");

      																		canvas.setAttribute("data-restrictions","selection");
      																		videoThumbnail.setAttribute("data-restrictions","selection");

      																		volume_i.setAttribute("data-restrictions","selection");
      																		volume_range.setAttribute("data-restrictions","selection");
      																		volume.setAttribute("data-restrictions","selection");

      																		expand.setAttribute("data-restrictions","selection");
      																		expandIcon.setAttribute("data-restrictions","selection");

      																		info.setAttribute("data-restrictions","selection");
      																		p1.setAttribute("data-restrictions","selection");
      																		p2.setAttribute("data-restrictions","selection");

      																		bufferDiv.setAttribute("data-restrictions","selection");

      																		element_readymade.appendChild(video);
      																		element_readymade.appendChild(bufferDiv);
      																		element_readymade.appendChild(videoThumbnail);
      																		element_readymade.appendChild(volume);
      																		element_readymade.appendChild(expand);
      																		element_readymade.appendChild(controls);
      																		element_readymade.appendChild(info);

      																	}else{
      																		if(elementType_readymade == "Video Player 2"){
      																			element_readymade = document.createElement("div");
      																		    element_readymade.className = "video-player-two";

      																		    element_readymade.setAttribute("data-e-type","video-player-two");
      																		    element_readymade.setAttribute("data-title","Video Title");
      																		    element_readymade.setAttribute("data-info-state",0);
      																		    element_readymade.setAttribute("data-info-style",0);
      																		    element_readymade.setAttribute("data-description","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta risus eros, a facilisis velit viverra vel. Ut vel mauris rhoncus, mollis mi ac, elementum leo. Ut pharetra erat eu elit facilisis faucibus. Donec facilisis sem ac urna condimentum, quis hendrerit odio accumsan. Integer vel congue elit. Nullam viverra commodo ipsum et blandit. Mauris diam ligula, dapibus eu finibus porta, commodo tempus ipsum.Nunc vulputate turpis vel viverra sodales. Integer gravida, nibh eget tristique gravida, nulla magna feugiat nulla, vitae vehicula diam ligula eget ex. Aenean dignissim id nibh sit amet volutpat. Suspendisse dignissim nisi non nunc feugiat, in blandit leo consequat. Praesent rhoncus leo vel diam fermentum pretium. Mauris ut arcu at ipsum tristique malesuada. Curabitur sed tempor ante. Vivamus ultricies commodo eros, eu fringilla mi auctor ut. Ut blandit, dolor sit amet interdum bibendum, nulla diam accumsan nunc, at ullamcorper est purus non lorem.Proin commodo augue justo, sed fringilla lacus pharetra a. Proin cursus luctus placerat. Quisque aliquet magna eget libero accumsan, eu euismod nunc auctor. Vestibulum ultricies dolor sed nibh aliquam fringilla. Morbi quis nulla nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan nisl sollicitudin felis egestas, non commodo neque tempus. In malesuada vestibulum dapibus. Nullam urna eros, accumsan sed velit vitae, viverra mollis lorem. Curabitur eu posuere nibh, et sodales mi. Maecenas posuere ullamcorper volutpat. Integer bibendum porta massa sed eleifend. Quisque rutrum eget urna vitae porttitor. Vivamus non eros purus. Sed rhoncus mi ut velit faucibus semper.");

      																		    var video = document.createElement("video");
      																		    video.src = "../assets/videos/videotest.mp4";
      																		    video.currentTime = 160;

      																		    var bufferDiv = document.createElement("div");
      																		    bufferDiv.className = "buffer-icon";

      																		    for(var o=0; o<4; o++){
      																			    var div = document.createElement("div");
      																			    div.setAttribute("data-restrictions","selection");
      																			    bufferDiv.appendChild(div);
      																		    }

      																		    var videoThumbnail = document.createElement("img");
      																		    videoThumbnail.className = "video-player-thumb";

      																		    video.addEventListener("click",function(){
      																			    site.selectElement(element_readymade);
      																		    });

      																		    videoThumbnail.addEventListener("click",function(){
      																			    site.selectElement(element_readymade);
      																		    });

      																		    video.addEventListener('timeupdate', function(){
      																	            publicEvents.moveVideoProgressBar(this);
      																	        });

      																	        video.addEventListener('loadeddata', function(){
      																	        	videoThumbnail.style.opacity = 1;
      																	            bufferDiv.style.opacity = 0;
      																	        });

      																	        video.addEventListener("ended",function(){
      																	    	    publicEvents.videoEnded(this);
      																	    	    this.currentTime = 0;
      																	    	    publicEvents.moveVideoProgressBar(this);
      																	    	    videoThumbnail.style.opacity = 1;
      																	        });

      																	        var info = document.createElement("div");
      																		    info.className = "video-info";

      																		    var p1 = document.createElement("p");
      																		    p1.className = "heading";
      																		    p1.innerText = element_readymade.getAttribute("data-title");

      																		    var p2 = document.createElement("p");
      																		    p2.className = "description";
      																		    p2.innerText = element_readymade.getAttribute("data-description");

      																		    info.appendChild(p1);
      																		    info.appendChild(p2);

      																		    var controls = document.createElement("div");
      																		    controls.className = "video-controls";

      																		    var infoIcon = document.createElement("i");
      																		    infoIcon.className = "fas fa-info-circle";

      																		    infoIcon.addEventListener("click",function(e){
      																			    publicEvents.videoInfo(video,e);
      																		    });

      																		    var playpause = document.createElement("i");
      																		    playpause.className = "fas fa-play";

      																		    playpause.addEventListener("click",function(e){
      																			   publicEvents.videoPlayPause(video,e);
      																		    });

      																		    var expand = document.createElement("i");
      																		    expand.className = "fas fa-expand";

      																		    expand.addEventListener("click",function(e){
      																			    if(this.className == "fas fa-compress"){
      																				    publicEvents.videoExitFullScreen(video,e);
      																			    }else{
      																				    if(this.className == "fas fa-expand"){
      																					    publicEvents.videoFullScreen(video,e);
      																			        }
      																			    }
      																		    });

      																		    var volume = document.createElement("i");
      																		    volume.className = "fas fa-volume-up";

      																		    video.volume = 1;

      																		    volume.addEventListener("click",function(e){
      																			    publicEvents.videoChangeVolume2(video,e);
      																		    });

      																		    var forward = document.createElement("i");
      																		    forward.className = "fas fa-step-forward";

      																		    forward.addEventListener("click",function(e){
      																			    publicEvents.videoForward(video,e);
      																		    });

      																		    var backward = document.createElement("i");
      																		    backward.className = "fas fa-step-backward";

      																		    backward.addEventListener("click",function(e){
      																			    publicEvents.videoBackward(video,e);
      																		    });

      																		    var nightmode = document.createElement("i");
      																		    nightmode.className = "far fa-moon";

      																		    nightmode.addEventListener("click",function(e){
      																			    publicEvents.videoNightMode(video,e);
      																		    });

      																		    controls.appendChild(playpause);
      																		    controls.appendChild(volume);
      																		    controls.appendChild(expand);
      																		    controls.appendChild(backward);
      																		    controls.appendChild(forward);
      																		    controls.appendChild(nightmode);
      																		    controls.appendChild(infoIcon);

      																		    var cover = document.createElement("div");
      																		    var cover_p = document.createElement("p");
      																		    var cover_div = document.createElement("div");
      																		    cover_p.innerText = "Video Title";

      																		    cover.appendChild(cover_div);
      																		    cover.appendChild(cover_p);

      																		    cover.className = "video-cover";

      																		    cover.addEventListener("click",function(){
      																			    site.selectElement(element_readymade);
      																		    });

      																		    var duration = document.createElement("div");
      																		    duration.className = "duration";

      																		    var duration_div = document.createElement("div");

      																		    var time1 = document.createElement("span");
      																		    time1.innerText = "00:00";

      																		    var time2 = document.createElement("span");
      																		    time2.innerText = "05:00";
      																		    time2.className = "time";

      																		    duration.appendChild(time1);
      																		    duration.appendChild(time2);
      																		    duration.appendChild(duration_div);

      																		    video.setAttribute("data-restrictions","selection");
      																		    videoThumbnail.setAttribute("data-restrictions","selection");

      																		    cover.setAttribute("data-restrictions","selection");
      																		    cover_p.setAttribute("data-restrictions","selection");
      																		    cover_div.setAttribute("data-restrictions","selection");

      																		    controls.setAttribute("data-restrictions","selection");
      																		    playpause.setAttribute("data-restrictions","selection");
      																		    volume.setAttribute("data-restrictions","selection");
      																		    expand.setAttribute("data-restrictions","selection");
      																		    forward.setAttribute("data-restrictions","selection");
      																		    backward.setAttribute("data-restrictions","selection");
      																		    nightmode.setAttribute("data-restrictions","selection");
      																		    infoIcon.setAttribute("data-restrictions","selection");

      																		    time1.setAttribute("data-restrictions","selection");
      																		    time2.setAttribute("data-restrictions","selection");
      																		    duration.setAttribute("data-restrictions","selection");
      																		    duration_div.setAttribute("data-restrictions","selection");

      																		    info.setAttribute("data-restrictions","selection");
      																		    p1.setAttribute("data-restrictions","selection");
      																		    p2.setAttribute("data-restrictions","selection");

      																		    bufferDiv.setAttribute("data-restrictions","selection");

      																		    element_readymade.appendChild(duration);
      																		    element_readymade.appendChild(video);
      																		    element_readymade.appendChild(bufferDiv);
      																		    element_readymade.appendChild(videoThumbnail);
      																		    element_readymade.appendChild(cover);
      																		    element_readymade.appendChild(controls);
      																		    element_readymade.appendChild(info);

      																		}else{
      																			if(elementType_readymade == "Video Playlist 1"){
      																				element_readymade = document.createElement("div");

      																				element_readymade.className = "video-playlist-one";
      																		        element_readymade.setAttribute("data-e-type","video-playlist-one");
      																		        element_readymade.setAttribute("data-info-state",1);
      																		        element_readymade.setAttribute("data-list-loc",0);

      																		        element_readymade.addEventListener("mouseover",function(e){
      																		            publicEvents.videoPlaylistInfo_hide(this,e);
      																		        });

      																		        element_readymade.addEventListener("mouseout",function(e){
      																		        	publicEvents.videoPlaylistInfo_show(this,e);
      																		        });

      																		        var infoDiv = document.createElement("div");
      																		        infoDiv.className = "video-playlist-info";

      																		        var info_heading = document.createElement("p");
      																		        info_heading.className = "heading";
      																		        info_heading.innerText = "My Favourite Songs";

      																		        var info_description = document.createElement("p");
      																		        info_description.className = "description";
      																		        info_description.innerText = "I Have added all the songs i like in this playlist, you can listen to them all.";

      																		        infoDiv.appendChild(info_heading);
      																		        infoDiv.appendChild(info_description);

      																		        var infoFade = document.createElement("div");
      																		        infoFade.className = "video-playlist-info-fade";

      																		        var player = document.createElement("div");
      																		        var list = document.createElement("div");

      																		        player.addEventListener("click",function(){
      																			        site.selectElement(element_readymade);
      																		        });

      																		        list.addEventListener("click",function(){
      																			        site.selectElement(element_readymade);
      																		        });

      																		        player.className = "playlist-player";
      																		        list.className = "playlist-list";

      																		        var video = document.createElement("video");
      																		        video.src = "../assets/videos/videotest.mp4";
      																		        video.currentTime = 160;

      																		        for(var i=0; i<10; i++){
      																		        	var item = document.createElement("div");
      																		        	var img = document.createElement("img");
      																		        	var p = document.createElement("p");

      																		        	item.className = "playlist-list-item";
      																		        	p.innerText = "Video Number #"+i;
      																		        	img.src = "http://pngimg.com/uploads/google/google_PNG19635.png";

      																		        	item.setAttribute("data-restrictions","selection");
      																		        	img.setAttribute("data-restrictions","selection");
      																		        	p.setAttribute("data-restrictions","selection");

      																		        	(function(item,img,p,video){
      																		        		item.addEventListener("click",function(){
      																		        		    publicEvents.videoPlaylistItemClick(item,video);
      																		        	    });

      																		        	    img.addEventListener("click",function(){
      																		        		    publicEvents.videoPlaylistItemClick(item,video);
      																		        	    });

      																		        	    p.addEventListener("click",function(){
      																		        		    publicEvents.videoPlaylistItemClick(item,video);
      																		        	    });
      																		        	})(item,img,p,video);

      																		        	item.appendChild(img);
      																		        	item.appendChild(p);
      																		        	list.appendChild(item);

      																		        	if(i==0){
      																		        		item.className = "playlist-list-item playlist-selected-item";
      																		        	}
      																		        }

      																		        var videoplayer = document.createElement("div");
      																		        videoplayer.className = "video-player-one";

      																		        videoplayer.setAttribute("data-e-type","video-player-one");
      																		        videoplayer.setAttribute("data-info-state",0);
      																		        videoplayer.setAttribute("data-info-style",0);

      																		        var info = document.createElement("div");
      																		        info.className = "video-info";

      																		        var p1 = document.createElement("p");
      																		        p1.className = "heading";
      																		        p1.innerText = videoplayer.getAttribute("data-title");

      																		        var p2 = document.createElement("p");
      																		        p2.className = "description";
      																		        p2.innerText = videoplayer.getAttribute("data-description");

      																		        info.appendChild(p1);
      																		        info.appendChild(p2);

      																		        var controls = document.createElement("div");
      																		        controls.className = "video-controls";

      																		        var infoIcon = document.createElement("i");
      																		        infoIcon.className = "fas fa-info-circle";

      																		        infoIcon.addEventListener("click",function(e){
      																			        publicEvents.videoInfo(video,e);
      																		        });

      																		        var progressInput = document.createElement("input");
      																		        progressInput.className = "progressbar";
      																		        progressInput.type = "range";
      																		        progressInput.setAttribute("min",0.00);
      																		        progressInput.setAttribute("max",100.00);
      																		        progressInput.value = 0.00;

      																		        var canvas = document.createElement("canvas");

      																		        var time = document.createElement("span");
      																		        time.innerText = "00:00 / 00:00";

      																		        var startpause = document.createElement("i");
      																		        startpause.className = "fas fa-play";

      																		        var expand = document.createElement("div");
      																		        expand.className = "expand";

      																		        var expandIcon = document.createElement("i");
      																		        expandIcon.className = "fas fa-expand";

      																		        var volume = document.createElement("div");
      																		        volume.className = "volume";

      																		        var volume_range = document.createElement("input");
      																		        volume_range.type = "range";
      																		        volume_range.setAttribute("min",0);
      																		        volume_range.setAttribute("max",1);
      																		        volume_range.setAttribute("step",0.1);
      																		        volume_range.setAttribute("value",1);

      																		        var volume_i = document.createElement("i");
      																		        volume_i.className = "fas fa-volume-up";

      																		        volume.appendChild(volume_i);
      																		        volume.appendChild(volume_range);

      																		        expand.appendChild(expandIcon);

      																		        controls.appendChild(startpause);
      																		        controls.appendChild(progressInput);
      																		        controls.appendChild(time);
      																		        controls.appendChild(infoIcon);
      																		        controls.appendChild(canvas);

      																		        startpause.addEventListener("click",function(e){
      																			        publicEvents.videoPlayPause(video,e);
      																		        });

      																		        expandIcon.addEventListener("click",function(e){
      																			        if(this.className == "fas fa-compress"){
      																				        publicEvents.videoPlaylistExitFullScreen(element_readymade,e);
      																			        }else{
      																				        if(this.className == "fas fa-expand"){
      																					        publicEvents.videoPlaylistFullScreen(element_readymade,e);
      																			            }
      																			        }
      																		        });

      																		        progressInput.addEventListener("mouseout",function(e){
      																			        publicEvents.videoHideFrame(videoplayer,e);
      																		        });

      																		        progressInput.addEventListener("mousemove",function(e){
      																			        publicEvents.videoPositionFrame(videoplayer,e);
      																		        });

      																		        video.addEventListener('loadeddata', function(){
      																			        time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
      																	                progressInput.setAttribute("max",this.duration);

      																	                publicEvents.moveVideoProgressBar(this);
      																	            });

      																	            video.addEventListener('timeupdate', function(){
      																			        time.innerText = publicEvents.videoDurationToReadable(this.currentTime)+" / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
      																	                progressInput.value = this.currentTime.toFixed(0);

      																	                publicEvents.moveVideoProgressBar(this);
      																	            });

      																	            video.addEventListener("ended",function(){
      																	    	        publicEvents.videoEnded(this);

      																	    	        progressInput.value = 0.00;
      																	    	        time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
      																	    	        publicEvents.moveVideoProgressBar(this);
      																	            });

      																	            progressInput.addEventListener("change",function(e){
      																	                publicEvents.videoChangeDuration(video,e);
      																	            });

      																	            volume_range.addEventListener("change",function(e){
      																	                publicEvents.videoChangeVolume(video,e);
      																	            });

      																		        startpause.setAttribute("data-restrictions","selection");
      																		        progressInput.setAttribute("data-restrictions","selection");
      																		        time.setAttribute("data-restrictions","selection");
      																		        controls.setAttribute("data-restrictions","selection");
      																		        video.setAttribute("data-restrictions","selection");
      																		        infoIcon.setAttribute("data-restrictions","selection");

      																		        canvas.setAttribute("data-restrictions","selection");

      																		        volume_i.setAttribute("data-restrictions","selection");
      																		        volume_range.setAttribute("data-restrictions","selection");
      																		        volume.setAttribute("data-restrictions","selection");

      																		        expand.setAttribute("data-restrictions","selection");
      																		        expandIcon.setAttribute("data-restrictions","selection");

      																		        info.setAttribute("data-restrictions","selection");
      																		        p1.setAttribute("data-restrictions","selection");
      																		        p2.setAttribute("data-restrictions","selection");

      																		        infoDiv.setAttribute("data-restrictions","selection");
      																		        info_heading.setAttribute("data-restrictions","selection");
      																		        info_description.setAttribute("data-restrictions","selection");

      																		        infoFade.setAttribute("data-restrictions","selection");

      																		        videoplayer.appendChild(video);
      																		        videoplayer.appendChild(volume);
      																		        videoplayer.appendChild(expand);
      																		        videoplayer.appendChild(controls);
      																		        videoplayer.appendChild(info);

      																		        video.setAttribute("data-restrictions","selection");

      																		        player.setAttribute("data-restrictions","selection");
      																		        list.setAttribute("data-restrictions","selection");
      																		        videoplayer.setAttribute("data-restrictions","selection");

      																		        videoplayer.appendChild(video);
      																		        player.appendChild(videoplayer);

      																		        element_readymade.appendChild(infoDiv);
      																		        element_readymade.appendChild(infoFade);
      																		        element_readymade.appendChild(player);
      																		        element_readymade.appendChild(list);
      																			}else{

      																			}
      																		}
      																	}
      																}
      															}
      														}
      													}
      												}
      											}
      										}
      									}
      								}
      							}
      						}
      					}
      				}
      			}
      		}
      	}
      }

      element_readymade.addEventListener('click',site.elementClicked);
      element_readymade.addEventListener('contextmenu',site.elementClicked);

      if(elementType_readymade == 'Top NavBar'){
        $('.previewsite').prepend(element_readymade);
        site.updateLastElementAdded();
      }else{
        document.getElementsByClassName('previewsite')[0].appendChild(element_readymade);
       //body.prepend(element_readymade);
       site.updateLastElementAdded();

       element_readymade.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
       element_readymade.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';

      }
    }

    for(var i=0; i<newelements.length; i++){
      var elementType = newelements[i].getElementsByTagName('span')[0].innerText;

      if(elementType == 'Text Input'){
        element = document.createElement('input');
        element.type = 'text';
        element.value = 'Text Input';
        element.style.width = '80px';
        element.style.minHeight = '20px';
        element.setAttribute('data-e-type','textinput');
      }else{
        if(elementType == 'Button'){
          element = document.createElement(elementType);
          element.innerText = 'Button';
          element.style.width = '100px';
          element.style.minHeight = '40px';
          element.setAttribute('data-e-type','button');
        }else{
          if(elementType == 'Image'){
            element = document.createElement('img');
            element.src = '../assets/images/icons/noimage.png';
            element.style.width = '200px';
            element.style.height = '200px';
            element.style.borderRadius = '5px';
            element.setAttribute('data-e-type','image');
          }else{
            if(elementType == 'Div'){
              element = document.createElement('div');
              element.style.width = '100px';
              element.style.height = '100px';
              element.setAttribute('data-e-type','div');
            }else{
              if(elementType == 'Video'){
                if(newelements[i].getElementsByTagName('span')[0].getElementsByClassName("ytLogo")[0]){
                  element = document.createElement('div');
                  element.setAttribute('data-e-type','ytvideo');
                }else{
                  element = document.createElement('video');
                  element.style.width = '500px';
                  element.style.height = '350px';
                  element.setAttribute('controls','');
                  element.setAttribute('data-e-type','video');
                  element.setAttribute('poster','../assets/images/icons/novideo.png');
                }
              }else{
                if(elementType == 'Paragraph'){
                  element = document.createElement('p');
                  element.style.width = '400px';
                  element.style.minHeight = '150px';
                  element.setAttribute('data-e-type','paragraph');
                  element.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis lacinia ex at porta. Duis in metus ac lectus cursus scelerisque. Nam interdum velit ut felis condimentum malesuada. Curabitur maximus tortor vitae eros tincidunt pellentesque eget vel urna. Maecenas nec velit vulputate leo placerat accumsan quis et dolor. Donec ultrices odio mattis massa euismod, eget pretium quam tempus. Fusce lacus ante, mollis id est ut, rhoncus dictum ipsum';
                }else{
                  if(elementType == 'Heading'){
                    element = document.createElement('h3');
                    element.style.width = '200px';
                    element.style.minHeight = '50px';
                    element.innerText = 'Heading';
                    element.setAttribute('data-e-type','heading');
                  }else{
                    if(elementType == 'TextArea'){
                      element = document.createElement('textarea');
                      element.style.width = '200px';
                      element.style.minHeight = '50px';
                      element.innerText = 'Textarea';
                      element.setAttribute('data-e-type','textarea');
                    }else{
                      if(elementType == 'Icon'){
                        element = document.createElement('i');
                        element.style.padding = '10px';
                        element.className = 'fab fa-font-awesome';
                        element.style.fontSize = '15px';
                        element.setAttribute('data-e-type','icon');
                      }else{
                      	if(elementType == "Checkbox"){
                      		element = document.createElement("input");
                      		element.type = "checkbox";
                      		element.setAttribute("checked","checked");
                            element.setAttribute('data-e-type','checkbox');
                            element.style.width = '50px';
                            element.style.height = '50px';
                      	}else{

                      	}
                        //element = document.createElement(elementType);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      if(newelements[i].getElementsByTagName('span')[0].getElementsByClassName("ytLogo")[0]){

        var divOverlay = document.createElement('div');
        divOverlay.className = 'video-overlay';
        divOverlay.style.width = '500px';
        divOverlay.style.height = '350px';
        divOverlay.setAttribute('data-e-type','video-overlay');

        var random = randomize.elementId(25);

         divOverlay.id = random;
         element.id = random+'videoPlayer';

         divOverlay.addEventListener('click',site.elementClicked);
         divOverlay.addEventListener('contextmenu',site.elementClicked);
         //divOverlay.style.left = '50%';
         //divOverlay.style.transform = 'translate(-50%)';
         divOverlay.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
         divOverlay.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';

         /*if(lastelementadded){
          divOverlay.style.top = ((lastelementadded.offsetTop + lastelementadded.getBoundingClientRect().height) + 15) + 'px';
         }*/

         divOverlay.appendChild(element);
         document.getElementsByClassName('previewsite')[0].appendChild(divOverlay);

        var player = new YT.Player(element, {
          //height: '390',
          //width: '640',
          videoId: 'xUg5Y77hbrs',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
          //FUNCTION TO ADD DIV AS OVERLAY AND ENABLE EVENTS;
          //document.getElementById('gaga').addEventListener('click',function(){ site.selectElement(document.querySelector('[data-e-type="video"]')); });
        });

      }else{
        element.addEventListener('click',site.elementClicked);
        element.addEventListener('contextmenu',site.elementClicked);

        //element.style.left = '50%';
        //element.style.transform = 'translate(-50%)';

        element.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
        element.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';


        /*if(lastelementadded){
          element.style.top = ((lastelementadded.offsetTop + lastelementadded.getBoundingClientRect().height) + 15) + 'px';
        }*/

        document.getElementsByClassName('previewsite')[0].appendChild(element);
      }

      site.updateLastElementAdded();
      //body.prepend(element);
    }

    tools.exitTool('add-element');
  }

}

function onPlayerReady(event){
  //VideoManager.changeVideo('','g62J-8nV5FI',event.target);
  //console.log(event.target);
}

function onPlayerStateChange(event){
  if(event.data == YT.PlayerState.PLAYING) {
    //stopVideo;
    site.selectElement($('[data-e-type="video"]')[0]);
    console.log('1')
  }else{
    if(event.data == YT.PlayerState.PAUSED){
      site.selectElement($('[data-e-type="video"]')[0]);
      console.log('2')
      //startVideo;
    }
  }
}

function stopVideo() {
  $('[data-e-type="video"]')[0].stopVideo();
}

//------------------------------------------------------------------

var total_elements_selected_to_add = 0;

class webpagebuildertools{
  constructor(){}

  load(){
    var toolsdiv = document.createElement('div');
    toolsdiv.setAttribute('class','wpb_tools');

    var addelement_div = document.createElement('div');
    var addelement = document.createElement('i');
    var addelement_tooltip = document.createElement('span');
    addelement.setAttribute('class','fas fa-plus');
    addelement_div.setAttribute('class','wpb_tool_ae');
    addelement_tooltip.setAttribute('class','wpb_tools_tooltip');
    addelement_tooltip.innerText = 'Add Elements';
    addelement_div.addEventListener('click',function(){
      tools.toolClicked('add-element');
    });

    var styleelement_div = document.createElement('div');
    var styleelement = document.createElement('i');
    var styleelement_tooltip = document.createElement('span');
    styleelement.setAttribute('class','fas fa-paint-brush');
    styleelement_div.setAttribute('class','wpb_tool_se');
    styleelement_tooltip.setAttribute('class','wpb_tools_tooltip');
    styleelement_tooltip.innerText = 'Style Element';
    styleelement_div.style.opacity = '0.4';
    styleelement_div.style.pointerEvents = 'none';
    styleelement_div.addEventListener('click',function(){
      tools.toolClicked('style-element');
    });

    var resizesite_div = document.createElement('div');
    var resizesite = document.createElement('i');
    var resizesite_tooltip = document.createElement('span');
    resizesite.setAttribute('class','fas fa-arrows-alt-v');
    resizesite_div.setAttribute('class','wpb_tool_rp');
    resizesite_tooltip.setAttribute('class','wpb_tools_tooltip');
    resizesite_tooltip.innerText = 'Resize Page';
    resizesite_div.addEventListener('click',function(){
      tools.toolClicked('resize-page');
    });

    var settings_div = document.createElement('div');
    var settings = document.createElement('i');
    var settings_tooltip = document.createElement('span');
    settings.setAttribute('class','fas fa-cog');
    settings_div.setAttribute('class','wpb_tool_s');
    settings_tooltip.setAttribute('class','wpb_tools_tooltip');
    settings_tooltip.innerText = 'Settings';

    var removeelement_div = document.createElement('div');
    var removeelement = document.createElement('i');
    var removeelement_tooltip = document.createElement('span');
    removeelement.setAttribute('class','fas fa-trash');
    removeelement_div.setAttribute('class','wpb_tool_re');
    removeelement_div.style.opacity = '0.4';
    removeelement_div.style.pointerEvents = 'none';
    removeelement_tooltip.setAttribute('class','wpb_tools_tooltip');
    removeelement_tooltip.innerText = 'Remove Element';
    removeelement_div.addEventListener('click',function(){
      tools.toolClicked('remove-element');
    });

    var duplicateelement_div = document.createElement('div');
    var duplicateelement = document.createElement('i');
    var duplicateelement_tooltip = document.createElement('span');
    duplicateelement.setAttribute('class','fas fa-clone');
    duplicateelement_div.setAttribute('class','wpb_tool_de');
    duplicateelement_div.style.opacity = '0.4';
    duplicateelement_div.style.pointerEvents = 'none';
    duplicateelement_tooltip.setAttribute('class','wpb_tools_tooltip');
    duplicateelement_tooltip.innerText = 'Duplicate Element';
    duplicateelement_div.addEventListener('click',function(){
      tools.toolClicked('duplicate-element');
    });

    var changefont_div = document.createElement('div');
    var changefont = document.createElement('i');
    var changefont_tooltip = document.createElement('span');
    changefont.setAttribute('class','fas fa-font');
    changefont_div.setAttribute('class','wpb_tool_cf');
    changefont_div.style.opacity = '0.4';
    changefont_div.style.pointerEvents = 'none';
    changefont_tooltip.setAttribute('class','wpb_tools_tooltip');
    changefont_tooltip.innerText = 'Change Font';
    changefont_div.addEventListener('click',function(){
      tools.toolClicked('change-font');
    });

    var backgroundimage_div = document.createElement('div');
    var backgroundimage = document.createElement('i');
    var backgroundimage_tooltip = document.createElement('span');
    backgroundimage.setAttribute('class','fas fa-image');
    backgroundimage_div.setAttribute('class','wpb_tool_bgi');
    backgroundimage_div.style.opacity = '0.4';
    backgroundimage_div.style.pointerEvents = 'none';
    backgroundimage_tooltip.setAttribute('class','wpb_tools_tooltip');
    backgroundimage_tooltip.innerText = 'Image Manager';
    backgroundimage_div.addEventListener('click',function(){
      tools.toolClicked('background-image');
    });

    var gridlines_div = document.createElement('div');
    var gridlines = document.createElement('i');
    var gridlines_tooltip = document.createElement('span');
    gridlines.setAttribute('class','fas fa-th-large');
    gridlines_div.setAttribute('class','wpb_tool_tgl');
    gridlines_tooltip.setAttribute('class','wpb_tools_tooltip');
    gridlines_tooltip.innerText = 'Show GridLines';
    gridlines_div.addEventListener('click',function(){
      tools.toolClicked('toggle-gridlines');
    });

    var videomanager_div = document.createElement('div');
    var videomanager = document.createElement('i');
    var videomanager_tooltip = document.createElement('span');
    videomanager.setAttribute('class','fas fa-video');
    videomanager_div.setAttribute('class','wpb_tool_vmi');
    videomanager_div.style.opacity = '0.4';
    videomanager_div.style.pointerEvents = 'none';
    videomanager_tooltip.setAttribute('class','wpb_tools_tooltip');
    videomanager_tooltip.innerText = 'Video Manager';
    videomanager_div.addEventListener('click',function(){
      tools.toolClicked('video-manager');
    });

    styleelement_div.appendChild(styleelement);
    styleelement_div.appendChild(styleelement_tooltip);

    addelement_div.appendChild(addelement);
    addelement_div.appendChild(addelement_tooltip);

    resizesite_div.appendChild(resizesite);
    resizesite_div.appendChild(resizesite_tooltip);

    settings_div.appendChild(settings);
    settings_div.appendChild(settings_tooltip);

    removeelement_div.appendChild(removeelement);
    removeelement_div.appendChild(removeelement_tooltip);

    duplicateelement_div.appendChild(duplicateelement);
    duplicateelement_div.appendChild(duplicateelement_tooltip);

    changefont_div.appendChild(changefont);
    changefont_div.appendChild(changefont_tooltip);

    backgroundimage_div.appendChild(backgroundimage);
    backgroundimage_div.appendChild(backgroundimage_tooltip);

    gridlines_div.appendChild(gridlines);
    gridlines_div.appendChild(gridlines_tooltip);

    videomanager_div.appendChild(videomanager);
    videomanager_div.appendChild(videomanager_tooltip);

    toolsdiv.appendChild(addelement_div);
    toolsdiv.appendChild(removeelement_div);
    toolsdiv.appendChild(duplicateelement_div);
    toolsdiv.appendChild(styleelement_div);
    toolsdiv.appendChild(changefont_div);
    toolsdiv.appendChild(backgroundimage_div);
    toolsdiv.appendChild(videomanager_div);
    toolsdiv.appendChild(resizesite_div);
    toolsdiv.appendChild(gridlines_div);
    toolsdiv.appendChild(settings_div);

    body.appendChild(toolsdiv);
  }

  toolClicked(toolName){
    if(toolName == 'resize-page'){
      var previewsite = document.getElementsByClassName('previewsite')[0];

      var resizers = document.createElement('div');
      resizers.className = 'resizers';

      var bottomresizer = document.createElement('div');
      bottomresizer.className = 'bottom-resizer';

      bottomresizer.addEventListener('mousedown',function(e){
        site.resize(e);
      });

      bottomresizer.addEventListener('mouseup',function(e){
        site.stopResizeDrag(e);
      });

      resizers.appendChild(bottomresizer);
      previewsite.appendChild(resizers);

      this.updateToolButton(toolName);
    }else{
      if(toolName == 'add-element'){

        total_elements_selected_to_add = 0;

        var elementmanager = document.createElement('div');
        elementmanager.setAttribute('id','element-manager');

        var heading = document.createElement('p');
        heading.className = 'heading';
        heading.innerText = 'Add Elements';

        var em_sidebar = document.createElement('div');
        em_sidebar.setAttribute('id','em-sidebar');

        var em_sidebar_ul = document.createElement('ul');

        var em_sidebar_ul_li_createnew = document.createElement('li');
        em_sidebar_ul_li_createnew.innerText = 'Create New';
        em_sidebar_ul_li_createnew.className = 'selected_li';

        var em_sidebar_ul_li_pickfromstorage = document.createElement('li');
        em_sidebar_ul_li_pickfromstorage.innerText = 'Add From Storage';

        var em_sidebar_ul_li_readymadeelements = document.createElement('li');
        em_sidebar_ul_li_readymadeelements.innerText = 'Ready Made Elements';

        em_sidebar_ul.appendChild(em_sidebar_ul_li_createnew);
        em_sidebar_ul.appendChild(em_sidebar_ul_li_pickfromstorage);
        em_sidebar_ul.appendChild(em_sidebar_ul_li_readymadeelements);

        em_sidebar.appendChild(em_sidebar_ul);

        var sidebar_button_add_elements = document.createElement('button');
        sidebar_button_add_elements.innerText = 'Add Selected Elements';
        sidebar_button_add_elements.addEventListener('click',function(){
          site.addElements();
        });

        em_sidebar.appendChild(sidebar_button_add_elements);

        elementmanager.appendChild(heading);
        elementmanager.appendChild(em_sidebar);

        var section1 = document.createElement('div');
        section1.className = 'section';
        section1.id = 'wpb_ae_createnewelement';

        var section2 = document.createElement('div');
        section2.className = 'section';
        section2.id = 'wpb_ae_addfromstorage';
        section2.style.display = 'none';

        var section3 = document.createElement('div');
        section3.className = 'section';
        section3.id = 'wpb_ae_readymadeelements';
        section3.style.display = 'none';

        em_sidebar_ul_li_createnew.addEventListener('click',function(){
          section1.style.display = 'inline-block';
          section2.style.display = 'none';
          section3.style.display = 'none';
          this.className = 'selected_li';
          em_sidebar_ul_li_pickfromstorage.className = '';
          em_sidebar_ul_li_readymadeelements.className = '';
        });

        em_sidebar_ul_li_pickfromstorage.addEventListener('click',function(){
          section2.style.display = 'inline-block';
          section1.style.display = 'none';
          section3.style.display = 'none';
          this.className = 'selected_li';
          em_sidebar_ul_li_createnew.className = '';
          em_sidebar_ul_li_readymadeelements.className = '';
        });

        em_sidebar_ul_li_readymadeelements.addEventListener('click',function(){
          section2.style.display = 'none';
          section1.style.display = 'none';
          section3.style.display = 'inline-block';
          this.className = 'selected_li';
          em_sidebar_ul_li_createnew.className = '';
          em_sidebar_ul_li_pickfromstorage.className = '';
        });

        elementmanager.appendChild(section1);
        elementmanager.appendChild(section2);
        elementmanager.appendChild(section3);

        body.appendChild(elementmanager);

        ui.Add_CreateNewElement_Preview('button');
        ui.Add_CreateNewElement_Preview('div');
        ui.Add_CreateNewElement_Preview('textinput');
        ui.Add_CreateNewElement_Preview('textarea');
        ui.Add_CreateNewElement_Preview('heading');
        ui.Add_CreateNewElement_Preview('paragraph');
        ui.Add_CreateNewElement_Preview('youtubevideo');
        ui.Add_CreateNewElement_Preview('video');
        ui.Add_CreateNewElement_Preview('image');
        ui.Add_CreateNewElement_Preview('icon');
        ui.Add_CreateNewElement_Preview('checkbox');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Navigation Bars');
        ui.Add_ReadyMadeElement_Preview('topnavbar');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Image Galleries');
        ui.Add_ReadyMadeElement_Preview('imageGallary1');
        ui.Add_ReadyMadeElement_Preview('imageGallary2');
        ui.Add_ReadyMadeElement_Preview('imageGallary3');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Image Sliders');
        ui.Add_ReadyMadeElement_Preview('imageSlider1');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Image Viewers');
        ui.Add_ReadyMadeElement_Preview('imageViewer1');
        ui.Add_ReadyMadeElement_Preview('imageViewer2');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Checkboxes');
        ui.Add_ReadyMadeElement_Preview('checkbox1');
        ui.Add_ReadyMadeElement_Preview('checkbox2');
        ui.Add_ReadyMadeElement_Preview('checkbox3');
        ui.Add_ReadyMadeElement_Preview('checkbox4');
        ui.Add_ReadyMadeElement_Preview('checkbox5');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Toggle Switches');
        ui.Add_ReadyMadeElement_Preview('toggleSwitch1');
        ui.Add_ReadyMadeElement_Preview('toggleSwitch2');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Dropdown Lists');
        ui.Add_ReadyMadeElement_Preview('dropdownList1');
        ui.Add_ReadyMadeElement_Preview('dropdownList2');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Textboxes');
        ui.Add_ReadyMadeElement_Preview('textBox1');
        ui.Add_ReadyMadeElement_Preview('textBox2');
        ui.Add_ReadyMadeElement_Preview('textBox3');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Ratings');
        ui.Add_ReadyMadeElement_Preview('ratings1');
        ui.Add_ReadyMadeElement_Preview('ratings2');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Video Players');
        ui.Add_ReadyMadeElement_Preview('videoPlayer1');
        ui.Add_ReadyMadeElement_Preview('videoPlayer2');

        ui.Add_ReadyMadeElement_Preview_Type_Heading('Video Playlists');
        ui.Add_ReadyMadeElement_Preview('videoPlaylist1');


        this.updateToolButton(toolName);
        //$('.previewsite').find('*').not('.resizers, .bottom-resizer').css({'opacity':'0.3','pointer-events':'none'});
      }else{
        if(toolName == 'style-element'){
          styler.open();
          this.updateToolButton(toolName);
        }else{
          if(toolName == 'remove-element'){
            this.updateToolButton(toolName);
          }else{
            if(toolName == 'change-font'){
              fontmanager.open();
              this.updateToolButton(toolName);
            }else{
              if(toolName == 'background-image'){
              	$('.selElForImgPik').removeClass('selElForImgPik');
              	$('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                backgroundImageManager.open();
                this.updateToolButton(toolName);
              }else{
                if(toolName == 'toggle-gridlines'){
                  if(document.getElementsByClassName('vcenterline')[0].style.backgroundColor == 'transparent' || document.getElementsByClassName('hcenterline')[0].style.backgroundColor == 'transparent'){
                    ui.showCenterLines('vertical');
                    ui.showCenterLines('horizontal');
                  }else{
                    ui.hideCenterLines('vertical');
                    ui.hideCenterLines('horizontal');
                  }
                  this.updateToolButton(toolName);
                }else{
                  if(toolName == 'video-manager'){
                    VideoManager.open();
                    this.updateToolButton(toolName);
                  }else{
                    if(toolName == 'duplicate-element'){
                      elementDuplicator.duplicate();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

  }

  updateToolButton(toolName){
    var webpagetools = document.getElementsByClassName('wpb_tools')[0].getElementsByTagName('div');
    var classname = '';
    var showtick = 0;
    var tooltiptext = '';
    var newiconClass = '';

    if(toolName == 'resize-page'){
      classname = 'wpb_tool_rp';
      showtick = 1;
      tooltiptext = 'Done Resizing';
    }else{
      if(toolName == 'add-element'){
        classname = 'wpb_tool_ae';
        showtick = 1;
        tooltiptext = 'Done Adding Elements';
      }else{
        if(toolName == 'style-element'){
          classname = 'wpb_tool_se';
          showtick = 1;
          tooltiptext = 'Done Styling Element';
        }else{
          if(toolName == 'remove-element'){
            classname = 'wpb_tool_re';
            showtick = 1;
            tooltiptext = 'Are you sure to delete the selected element?';
          }else{
            if(toolName == 'change-font'){
              classname = 'wpb_tool_cf';
              showtick = 1;
              tooltiptext = 'Done Changing Font';
            }else{
              if(toolName == 'background-image'){
                classname = 'wpb_tool_bgi';
                showtick = 1;
                tooltiptext = 'Done Changing Image';
              }else{
                if(toolName == 'toggle-gridlines'){
                  classname = 'wpb_tool_tgl';
                  showtick = 0;
                  if(document.getElementsByClassName('vcenterline')[0].style.backgroundColor == 'transparent' || document.getElementsByClassName('hcenterline')[0].style.backgroundColor == 'transparent'){
                    tooltiptext = 'Show GridLines';
                    newiconClass = 'fas fa-th-large';
                  }else{
                    tooltiptext = 'Hide GridLines';
                    newiconClass = 'fas fa-ban';
                  }
                }else{
                  if(toolName == 'video-manager'){
                    classname = 'wpb_tool_vmi';
                    showtick = 1;
                    tooltiptext = 'Done Changing Video';
                  }
                }
              }
            }
          }
        }
      }
    }

    for(var i=0; i<webpagetools.length; i++){
      if(webpagetools[i].className == classname){

        webpagetools[i].getElementsByTagName('span')[0].innerText = tooltiptext;

        if(showtick == 1){
          webpagetools[i].getElementsByTagName('i')[0].className = 'fas fa-check';
          webpagetools[i].getElementsByTagName('i')[0].style.color = '#00b700';
        }else{
          webpagetools[i].getElementsByTagName('i')[0].className = newiconClass;
        }

        if(classname !== 'wpb_tool_tgl'){
          var new_element = webpagetools[i].cloneNode(true);
          webpagetools[i].parentNode.replaceChild(new_element, webpagetools[i]);

          new_element.addEventListener('click',function(){
            tools.exitTool(toolName);
          });
        }

      }else{
        if(classname !== 'wpb_tool_tgl'){
          webpagetools[i].style.opacity = 0.4;
          webpagetools[i].style.pointerEvents = 'none';
        }
      }
    }

  }

  exitTool(toolName){
    var webpagetools = document.getElementsByClassName('wpb_tools')[0].getElementsByTagName('div');
    var classname = '';
    var iclass = '';
    var tooltiptext = '';

    if(toolName == 'resize-page'){
      classname = 'wpb_tool_rp';
      iclass = 'fas fa-arrows-alt-v';
      tooltiptext = 'Resize Page';
    }else{
      if(toolName == 'add-element'){
        classname = 'wpb_tool_ae';
        iclass = 'fas fa-plus';
        tooltiptext = 'Add Elements';
      }else{
        if(toolName == 'style-element'){
          classname = 'wpb_tool_se';
          iclass = 'fas fa-paint-brush';
          tooltiptext = 'Style Element';
        }else{
          if(toolName == 'remove-element'){
            classname = 'wpb_tool_re';
            iclass = 'fas fa-trash';
            tooltiptext = 'Remove Element';
          }else{
            if(toolName == 'change-font'){
              classname = 'wpb_tool_cf';
              iclass = 'fas fa-font';
              tooltiptext = 'Change Font';
            }else{
              if(toolName == 'background-image'){
                classname = 'wpb_tool_bgi';
                iclass = 'fas fa-image';
                tooltiptext = 'Image Manager';
              }else{
                if(toolName == 'video-manager'){
                  classname = 'wpb_tool_vmi';
                  iclass = 'fas fa-video';
                  tooltiptext = 'Video Manager';
                }
              }
            }
          }
        }
      }
    }

    for(var i=0; i<webpagetools.length; i++){
      if(webpagetools[i].className == classname){

          webpagetools[i].getElementsByTagName('i')[0].className = iclass;
          webpagetools[i].getElementsByTagName('i')[0].style.color = 'white';
          webpagetools[i].getElementsByTagName('span')[0].innerText = tooltiptext;

          if(toolName == 'resize-page'){
             $('.resizers').remove();
          }else{
            if(toolName == 'add-element'){
              var em = document.getElementById('element-manager');
              em.remove();

            }else{
              if(toolName == 'style-element'){
                styler.close();
              }else{
                if(toolName == 'remove-element'){
                  document.getElementsByClassName('selected')[0].remove();
                  document.getElementsByClassName(classname)[0].style.opacity = '0.4';
                  document.getElementsByClassName(classname)[0].style.pointerEvents = 'none';
                  $('.selectedSpecialOptions, .eResizer').remove();

                  site.updateLastElementAdded();
                }else{
                  if(toolName == 'change-font'){
                    fontmanager.close();
                  }else{
                    if(toolName == 'background-image'){
                      backgroundImageManager.close();
                    }else{
                      if(toolName == 'video-manager'){
                        VideoManager.close();
                      }
                    }
                  }
                }
              }
            }
          }

          var new_element = webpagetools[i].cloneNode(true);
          webpagetools[i].parentNode.replaceChild(new_element, webpagetools[i]);

          new_element.addEventListener('click',function(){
            tools.toolClicked(toolName);
          });

      }else{
        if(webpagetools[i].classList.contains('wpb_tool_se') || webpagetools[i].classList.contains('wpb_tool_re') || webpagetools[i].classList.contains('wpb_tool_cf') || webpagetools[i].classList.contains('wpb_tool_bgi') || webpagetools[i].classList.contains('wpb_tool_vmi') || webpagetools[i].classList.contains('wpb_tool_de')){
          if(document.getElementsByClassName('selected')[0] == null){

          }else{
            if(webpagetools[i].classList.contains('wpb_tool_vmi')){
              if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-player') || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-playlist')){
                webpagetools[i].style.opacity = 1;
                webpagetools[i].style.pointerEvents = 'unset';
              }
            }else{
              webpagetools[i].style.opacity = 1;
              webpagetools[i].style.pointerEvents = 'unset';
            }
          }
        }else{
          webpagetools[i].style.opacity = 1;
          webpagetools[i].style.pointerEvents = 'unset';
        }
      }
    }

  }

}
//------------------------------------------------------------------

var tools = new webpagebuildertools;

//------------------------------------------------------------------

class userinterface{
  constructor(){}

  greetUser(){
    var question = document.createElement('p');
    var button1 = document.createElement('button');
    var button2 = document.createElement('button');

    button1.setAttribute('class','cneelementbtn');
    button2.setAttribute('class','cnpagebtn');
    question.setAttribute('class','wtcquestion');

    button1.innerText = 'New Element';
    button2.innerText = 'New Page';
    question.innerText = 'What do you want to create today?';

    button1.addEventListener('click',function(){
      question.remove();
      button2.remove();
      this.remove();

      progress.show();

      setTimeout(function(){
        progress.hide();

        elementpanel.start();

      },1);

    });

    button2.addEventListener('click',function(){
      question.remove();
      button1.remove();
      this.remove();

      document.getElementsByTagName('billy')[0].remove();
      document.getElementsByTagName('callbilly')[0].remove();

      var elementPosition = document.createElement('span');
      elementPosition.className = 'elPos';
      elementPosition.innerText = '0%';

      var pageCenterPosition = document.createElement('span');
      pageCenterPosition.className = 'pcPos';
      pageCenterPosition.innerText = '';

      body.appendChild(elementPosition);
      body.appendChild(pageCenterPosition);

      progress.show();

      setTimeout(function(){
        progress.hide();

        pagebuilder.start();

      },1);

    });

    body.appendChild(question);
    body.appendChild(button1);
    body.appendChild(button2);
  }

  selectNewElementToCreate(e){
    if(e.className !== 'selected_element'){
      e.className = 'selected_element';
      total_elements_selected_to_add = total_elements_selected_to_add + 1;
    }else{
      e.className = 'wpb_ae_element_preview';
      total_elements_selected_to_add = total_elements_selected_to_add - 1;
    }

    if(total_elements_selected_to_add !== 0 && total_elements_selected_to_add > 0){
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'block';
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+total_elements_selected_to_add+')';
    }else{
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'none';
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+total_elements_selected_to_add+')';
    }

  }

  selectNewReadyMadeElement(e){
    if(e.classList.contains('selected_element_readymade') == false){
      e.classList.add('selected_element_readymade');
      total_elements_selected_to_add = total_elements_selected_to_add + 1;
    }else{
      e.classList.remove('selected_element_readymade');
      total_elements_selected_to_add = total_elements_selected_to_add - 1;
    }

    if(total_elements_selected_to_add !== 0 && total_elements_selected_to_add > 0){
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'block';
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+total_elements_selected_to_add+')';
    }else{
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'none';
      document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+total_elements_selected_to_add+')';
    }
  }

  Add_ReadyMadeElement_Preview_Type_Heading(text){
  	var heading = document.createElement('span');
  	heading.className = 'elementTypeHeading';
    heading.innerText = text;
    document.getElementById('wpb_ae_readymadeelements').appendChild(heading);
  }

  Add_ReadyMadeElement_Preview(type){
    var boxtype, elementinnertext, labelinnertext, element, elementclass;
    var box;

    if(type == 'topnavbar'){
      boxtype = 'horizontal-long';
      labelinnertext = 'Top NavBar';
    }

    if(type.includes('imageGallary')){
      boxtype = 'half-width-cube';

      if(type.includes('1')){
      	labelinnertext = 'Image Gallery 1';
      }else{
      	if(type.includes('2')){
      	  labelinnertext = 'Image Gallery 2';
        }else{
          if(type.includes('3')){
      	    labelinnertext = 'Image Gallery 3';
          }
        }
      }
    }

    if(type.includes('imageViewer')){
      boxtype = 'full-width-cube';

      if(type.includes('1')){
      	labelinnertext = 'Image Viewer 1';
      }else{
      	if(type.includes('2')){
      		labelinnertext = 'Image Viewer 2';
      	}
      }
    }

    if(type.includes("imageSlider")){
    	boxtype = 'half-width-cube';

    	if(type.includes('1')){
      	     labelinnertext = 'Image Slider 1';
        }
    }

    if(type.includes("checkbox")){
    	boxtype = "half-width-cube";

    	if(type.includes("1")){
    		labelinnertext = "Checkbox 1";
    	}else{
    		if(type.includes("2")){
    		    labelinnertext = "Checkbox 2";
    	    }else{
    	    	if(type.includes("3")){
    	    		labelinnertext = "Checkbox 3";
    	    	}else{
    	    		if(type.includes("4")){
    	    		    labelinnertext = "Checkbox 4";
    	    	    }else{
    	    	    	if(type.includes("5")){
    	    		        labelinnertext = "Checkbox 5";
    	    	        }
    	    	    }
    	    	}
    	    }
    	}
    }

    if(type.includes("toggleSwitch")){
    	boxtype = "half-width-cube";

    	if(type.includes("1")){
    		labelinnertext = "Toggle Switch 1";
    	}else{
    		if(type.includes("2")){
    		    labelinnertext = "Toggle Switch 2";
    	    }
    	}
    }

    if(type.includes("dropdownList")){
    	boxtype = "half-width-cube";

    	if(type.includes("1")){
    		labelinnertext = "Dropdown List 1";
    	}else{
    		if(type.includes("2")){
    		    labelinnertext = "Dropdown List 2";
    	    }
    	}
    }

    if(type.includes("textBox")){
    	boxtype = "half-width-cube";

    	if(type.includes("1")){
    		labelinnertext = "Textbox 1";
    	}else{
    		if(type.includes("2")){
    		    labelinnertext = "Textbox 2";
    	    }else{
    	    	if(type.includes("3")){
    		        labelinnertext = "Textbox 3";
    	        }
    	    }
    	}
    }

    if(type.includes("ratings")){
    	boxtype = "half-width-cube";

    	if(type.includes("1")){
    		labelinnertext = "Ratings 1";
    	}else{
    		if(type.includes("2")){
    		    labelinnertext = "Ratings 2";
    	    }
    	}
    }

    if(type.includes("videoPlayer")){
    	boxtype = "half-width-cube";

    	if(type.includes("1")){
    		labelinnertext = "Video Player 1";
    	}else{
    		if(type.includes("2")){
    		    labelinnertext = "Video Player 2";
    	    }else{
    	    	if(type.includes("3")){
    		        labelinnertext = "Video Player 3";
    	        }
    	    }
    	}
    }

    if(type.includes("videoPlaylist")){
    	boxtype = "half-width-cube";

    	if(type.includes("1")){
    		labelinnertext = "Video Playlist 1";
    	}else{
    		if(type.includes("2")){
    		    labelinnertext = "Video Playlist 2";
    	    }else{
    	    	if(type.includes("3")){
    		        labelinnertext = "Video Playlist 3";
    	        }
    	    }
    	}
    }


    //--------------------

    box = document.createElement('div');
    if(boxtype == 'horizontal-long'){
      box.className = 'horizontal-long-box';
    }else{
    	if(boxtype == 'half-width-cube'){
    		box.className = 'half-width-cube-box';
    	}else{
    		if(boxtype == 'full-width-cube'){
    		    box.className = 'full-width-cube-box';
    	    }
    	}
    }

    box.addEventListener('click',function(){
        ui.selectNewReadyMadeElement(this);
    });

    var label = document.createElement('span');
    label.innerText = labelinnertext;
    box.appendChild(label);

    //box.appendChild(element);

    document.getElementById('wpb_ae_readymadeelements').appendChild(box);
  }

  Add_CreateNewElement_Preview(type){
    var elementinnertext, labelinnertext, element;

    if(type == 'image'){
      element = document.createElement('img');
      labelinnertext = 'Image';
    }else{
      if(type == 'youtubevideo' || type == 'video'){
        element = document.createElement('video');
        element.setAttribute('controls','');
        if(type == 'youtubevideo'){labelinnertext = 'Video';}else{if(type == 'video'){labelinnertext = 'Video';}};
      }else{
        if(type == 'paragraph'){
          labelinnertext = 'Paragraph';
          element = document.createElement('p');
          elementinnertext = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis lacinia ex at porta. Duis in metus ac lectus cursus scelerisque. Nam interdum velit ut felis condimentum malesuada.';
        }else{
          if(type == 'heading'){
            element = document.createElement('h3');
            elementinnertext = ' Heading';
            labelinnertext = 'Heading';
          }else{
            if(type == 'button'){
              element = document.createElement('button');
              elementinnertext = ' Button';
              labelinnertext = 'Button';
            }else{
              if(type == 'textinput'){
                element = document.createElement('input');
                elementinnertext = ' Text Input';
                labelinnertext = 'Text Input';
              }else{
                if(type == 'div'){
                  element = document.createElement('div');
                  elementinnertext = ' Div';
                  labelinnertext = 'Div';
                }else{
                  if(type == 'textarea'){
                    element = document.createElement('textarea');
                    elementinnertext = ' TextArea';
                    labelinnertext = 'TextArea';
                  }else{
                    if(type == 'icon'){
                      element = document.createElement('i');
                      element.className = 'fab fa-font-awesome';
                      element.style.padding = '10px';
                      element.style.color = 'black';
                      element.style.fontSize = '35px';
                      element.style.left = '50%';
                      element.style.top = '60%';
                      element.style.position = 'absolute';
                      element.style.transform = 'translate(-50%,-60%)';
                      labelinnertext = 'Icon';
                    }else{
                    	if(type == "checkbox"){
                    		element = document.createElement('input');
                    		element.type = "checkbox";
                    		element.setAttribute("checked","checked");
                    		element.style.left = '50%';
                            element.style.top = '60%';
                            element.style.position = 'absolute';
                            element.style.transform = 'translate(-50%,-60%)';
                            labelinnertext = 'Checkbox';
                    	}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if(elementinnertext !== null){
      if(type == 'textinput' || type == 'textarea'){
        element.value = elementinnertext;
      }else{
        if(type == 'video' || type == 'image' || type == 'icon'){

        }else{
          element.innerText = elementinnertext;
        }
      }
    }

    var box = document.createElement('div');
    box.className = 'wpb_ae_element_preview';

    box.addEventListener('click',function(){
          ui.selectNewElementToCreate(this);
    });

    var label = document.createElement('span');
    label.innerText = labelinnertext;

    if(type == 'youtubevideo'){
    	var ytLogo = document.createElement("img");
    	ytLogo.src = "../assets/images/yt_logo_rgb_dark.png";
    	ytLogo.className = "ytLogo";

    	$(label).prepend(ytLogo);
    }

    box.appendChild(label);

    box.appendChild(element);
    document.getElementById('wpb_ae_createnewelement').appendChild(box);
  }

  displayKeyGuide(){
    var hint_arrows = document.createElement('div');
    hint_arrows.className = 'hint_element_move';

    var hint_leftarrow_i = document.createElement('i');
    var hint_rightarrow_i = document.createElement('i');
    hint_rightarrow_i.className = 'fas fa-arrow-right';
    hint_leftarrow_i.className = 'fas fa-arrow-left';

    var hint_toparrow_i = document.createElement('i');
    var hint_bottomarrow_i = document.createElement('i');
    hint_toparrow_i.className = 'fas fa-arrow-up';
    hint_bottomarrow_i.className = 'fas fa-arrow-down';

    var hint_arrows_p = document.createElement('p');
    hint_arrows_p.innerText = 'Press Arrow Keys Or Drag Element To Move It';

    hint_arrows.appendChild(hint_leftarrow_i);
    hint_arrows.appendChild(hint_rightarrow_i);
    hint_arrows.appendChild(hint_toparrow_i);
    hint_arrows.appendChild(hint_bottomarrow_i);
    hint_arrows.appendChild(hint_arrows_p);

    var hint_escapekey = document.createElement('div');
    hint_escapekey.className = 'hint_element_exit';

    var hint_esc_spanIcon = document.createElement('span');
    hint_esc_spanIcon.innerText = 'ESC';

    var hint_esc_p = document.createElement('p');
    hint_esc_p.innerText = 'Press Escape Key To Disselect Element';

    hint_escapekey.appendChild(hint_esc_spanIcon);
    hint_escapekey.appendChild(hint_esc_p);

    body.appendChild(hint_arrows);
    body.appendChild(hint_escapekey);
  }

  hideCenterLines(axis){
    var verticalCenterLineIndicator = document.getElementsByClassName('vcenterline')[0];
    var horizontalCenterLineIndicator = document.getElementsByClassName('hcenterline')[0];

    if(axis == 'vertical'){
      verticalCenterLineIndicator.style.backgroundColor = 'transparent';
    }

    if(axis == 'horizontal'){
      horizontalCenterLineIndicator.style.backgroundColor = 'transparent';
    }
  }

  showCenterLines(axis){
    var verticalCenterLineIndicator = document.getElementsByClassName('vcenterline')[0];
    var horizontalCenterLineIndicator = document.getElementsByClassName('hcenterline')[0];

    if(axis == 'vertical'){
      verticalCenterLineIndicator.style.backgroundColor = '#e80dc7';
    }

    if(axis == 'horizontal'){
      horizontalCenterLineIndicator.style.backgroundColor = '#e80dc7';
    }
  }

  displayElementSpecialOptions(elementType){
    var element = document.getElementsByClassName('selected')[0];

    var specialOptions_div = document.createElement('div');
    specialOptions_div.className = 'selectedSpecialOptions';
    body.appendChild(specialOptions_div);

    //specialOptions_div.style.minHeight = element.style.height || element.style.minHeight;

    if(elementType == 'video-overlay' || elementType == 'video'){
      //var videoPlayerId = document.getElementsByClassName('selected')[0].id;

      specialOptions_div.style.top = (element.getBoundingClientRect().top + window.scrollY) + 'px';
      specialOptions_div.style.left = (element.getBoundingClientRect().left - 50) + 'px';
      specialOptions_div.style.transform = 'unset';

      this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
      this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-v','fullHeight','Full Height');

      if(elementType == 'video'){
      	this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','showControls','Show Controls');
      }

    }else{
      specialOptions_div.style.top = (element.getBoundingClientRect().top + window.scrollY) + 'px';
      specialOptions_div.style.left = (element.getBoundingClientRect().left - 50) + 'px';
      specialOptions_div.style.transform = 'unset';

      if(elementType !== 'image' && elementType !== 'icon' && elementType !== "checkbox" && !elementType.includes("video-player")){
        this.createDisplayElementSpecialOptionsOption('fas fa-pen-alt','editElement','Edit Element');
      }

    }

    if(elementType == 'image'){
      this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
      this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-v','fullHeight','Full Height');
    }

    if(elementType == 'heading' || elementType == 'paragraph'){
      this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
    }

    if(elementType == 'icon'){
      this.createDisplayElementSpecialOptionsOption("fab fa-font-awesome",'changeIcon','Change Icon');
    }

    //if(elementType == 'video' || elementType == 'video-overlay'){
      //this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','showControls','Show Controls');
    //}

    if(elementType.includes('gallery') || elementType.includes("slider")){
    	this.createDisplayElementSpecialOptionsOption("fas fa-circle",'switchImageShape','Switch Image Shape');
    }

    if(elementType.includes('viewer')){
    	this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleFullScreeOption','Disable Full Screen Option');

    	if(elementType.includes("one")){
    		this.createDisplayElementSpecialOptionsOption("fas fa-arrow-left",'switchThumbnailsPosition','Switch Thumbnails Position');
    		this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
            this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-v','fullHeight','Full Height');
    	}

    	if(elementType.includes("two")){
    		this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchImgViewer2Location','Switch Viewer Location');
    		this.createDisplayElementSpecialOptionsOption('fas fa-sort','switchImgViewer2BtnLocation','Switch Button Location');
    	}

    }

    if(elementType.includes("video-playlist")){
    	if(elementType == "video-playlist-one"){
    		this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchVideoPlaylistListLocation','Switch List Location');
    	}
    }

    if(elementType.includes("video-player")){
    	if(elementType == "video-player-two"){
    		this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer2FullScreenOption','Disable Full Screen Option');
    		this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer2FrwdBwdOption','Disable Forward-Backward Option');
    		this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer2NightModeOption','Disable Night Mode Option');
    	}else{
    		if(elementType == "video-player-one"){
    			this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer1FullScreenOption','Disable Full Screen Option');
    			this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchImgViewer1InfoStyle','Switch Video Information Style');
    		}
    	}

    	this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayerInfo','Disable Video Information');
    }

    if(elementType == "checkbox-multi-one" || elementType == "checkbox-multi-two"){
    	this.createDisplayElementSpecialOptionsOption('fas fa-circle','switchMultiCheckboxShape','Switch Checkbox Shape');
    	this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleMultiCheckboxText','Disable Checkbox Text');
    	this.createDisplayElementSpecialOptionsOption('fas fa-circle','switchMultiCheckboxCheckMarkShape','Switch Checkmark Shape');

    	this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
    }else{
    	if(elementType.includes("checkbox")){
    	    this.createDisplayElementSpecialOptionsOption('fas fa-circle','switchCheckboxShape','Switch Shape');
    	    this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleCheckboxAndToggleSwitchText','Disable Text');

    	    this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
        }
    }

    if(elementType.includes("toggle-switch")){
    	this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleCheckboxAndToggleSwitchText','Disable Text');
    	this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
    }

    if(elementType.includes("dropdown-list")){
    	this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
    }

    if(elementType.includes("textbox")){
    	if(elementType.includes("two")){
    		this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchTextbox2TextLocation','Switch Text Location');
    	}

    	if(elementType.includes("one") || elementType.includes("three")){
    		this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleTextboxBorder','Disable Border');
    	}

    	this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleTextboxCharacterLimitText','Disable Character Limit Text');
    	this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleTextboxIcon','Disable Icon');
    }

    if(!elementType.includes('gallery') && !elementType.includes('navbar') && !elementType.includes('slider') && elementType !== "image-viewer-two" && !elementType.includes("checkbox") && !elementType.includes("toggle-switch") && !elementType.includes('dropdown-list')){
    	this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt','resizeElement','Resize');
    }

  }

  createDisplayElementSpecialOptionsOption(icon,type,text){
    var specialOptions_div = document.getElementsByClassName('selectedSpecialOptions')[0];

    var optionDiv = document.createElement('div');
    optionDiv.setAttribute('class','wpb_e_special_option');

    var option = document.createElement('i');
    option.className = icon;

    var option_tooltip = document.createElement('span');
    option_tooltip.setAttribute('class','wpb_e_special_option_tooltip');
    option_tooltip.innerText = text;

    if(type == 'editElement'){
      option.addEventListener('click',function(){
        if(document.getElementsByClassName('elementEditor')[0]){
          elementEditor.close();
        }else{
          elementEditor.show();
        }
      });
    }

    if(type == 'showControls'){
      option.addEventListener('click',elementSpecialOptionsHandler.showControls);
    }

    if(type == 'resizeElement'){
      option.addEventListener('click',elementSpecialOptionsHandler.optionClicked);
    }

    if(type == 'fullWidth' || type == 'fullHeight'){
      option.addEventListener('click',elementSpecialOptionsHandler.optionClicked);
    }

    if(type == 'changeIcon'){
      option.addEventListener('click',fontAwesomeSelector.show);
    }

    if(type == 'switchImageShape'){
      option.addEventListener('click',elementSpecialOptionsHandler.switchImageShape);
    }

    if(type == 'switchThumbnailsPosition'){
      option.addEventListener('click',elementSpecialOptionsHandler.switchThumbnailsPosition);
    }

    if(type == 'toggleFullScreeOption'){
      option.addEventListener('click',elementSpecialOptionsHandler.toggleFullScreeOption);
    }

    if(type == "switchImgViewer2Location"){
      option.addEventListener('click',elementSpecialOptionsHandler.switchImgViewer2Location);
    }

    if(type == "switchImgViewer2BtnLocation"){
    	option.addEventListener('click',elementSpecialOptionsHandler.switchImgViewer2BtnLocation);
    }

    if(type == "switchCheckboxShape"){
    	option.addEventListener('click',elementSpecialOptionsHandler.switchCheckboxShape);
    }

    if(type == "switchMultiCheckboxShape"){
    	option.addEventListener('click',elementSpecialOptionsHandler.switchMultiCheckboxShape);
    }

    if(type == "switchMultiCheckboxCheckMarkShape"){
    	option.addEventListener("click",elementSpecialOptionsHandler.switchMultiCheckboxCheckMarkShape);
    }

    if(type == "toggleCheckboxAndToggleSwitchText"){
    	option.addEventListener('click',elementSpecialOptionsHandler.toggleCheckboxAndToggleSwitchText);
    }

    if(type == "toggleMultiCheckboxText"){
    	option.addEventListener("click",elementSpecialOptionsHandler.toggleMultiCheckboxText);
    }

    if(type == "switchTextbox2TextLocation"){
    	option.addEventListener('click',elementSpecialOptionsHandler.switchTextbox2TextLocation);
    }

    if(type == "toggleTextboxBorder"){
    	option.addEventListener("click",elementSpecialOptionsHandler.toggleTextboxBorder);
    }

    if(type == "toggleTextboxIcon"){
    	option.addEventListener("click",elementSpecialOptionsHandler.toggleTextboxIcon);
    }

    if(type == "toggleTextboxCharacterLimitText"){
    	option.addEventListener("click",elementSpecialOptionsHandler.toggleTextboxCharacterLimitText);
    }

    if(type == "toggleVideoPlayer2FrwdBwdOption"){
    	option.addEventListener('click',elementSpecialOptionsHandler.toggleVideoPlayer2FrwdBwdOption);
    }

    if(type == "toggleVideoPlayer2FullScreenOption"){
    	option.addEventListener('click',elementSpecialOptionsHandler.toggleVideoPlayer2FullScreenOption);
    }

    if(type == "toggleVideoPlayer1FullScreenOption"){
    	option.addEventListener('click',elementSpecialOptionsHandler.toggleVideoPlayer1FullScreenOption);
    }

    if(type == "toggleVideoPlayer2NightModeOption"){
    	option.addEventListener('click',elementSpecialOptionsHandler.toggleVideoPlayer2NightModeOption);
    }

    if(type == "toggleVideoPlayerInfo"){
    	option.addEventListener('click',elementSpecialOptionsHandler.toggleVideoPlayerInfo);
    }

    if(type == "switchImgViewer1InfoStyle"){
    	option.addEventListener('click',elementSpecialOptionsHandler.switchImgViewer1InfoStyle);
    }

    if(type == "switchVideoPlaylistListLocation"){
    	option.addEventListener('click',elementSpecialOptionsHandler.switchVideoPlaylistListLocation);
    }

    if(type == "showStyles"){
      option.addEventListener('click',function(){
        if(document.getElementsByTagName('styles')[0]){
          elementStyles.close();
        }else{
          elementStyles.show();
        }
      });
    }

    optionDiv.appendChild(option);
    optionDiv.appendChild(option_tooltip);
    specialOptions_div.appendChild(optionDiv);
  }

}

//------------------------------------------------------------------

var sidebarElement = new sidebar;
var site = new sitepreview;
var ui = new userinterface();

//------------------------------------------------------------------

class jadgetPanel{
  constructor(){}

  start(){

  var panel = document.createElement('div');
  panel.setAttribute('id','panel');

  panel.addEventListener('click',function(event){
     if(event.target.id == this.id || event.target.id == 'advance' || event.target.id == 'animate'){
      document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
            setTimeout(function(){document.getElementsByClassName('shapechangediv')[0].style.display = 'none';},1000);
     }else{

     }
    });

  var menuBar = document.createElement('div');
  menuBar.setAttribute('id','menuBar');

  var menuIcon_right = document.createElement('div');
  menuIcon_right.setAttribute('id','menuIcon-right');

  var menuIcon_left = document.createElement('div');
  menuIcon_left.setAttribute('id','menuIcon-left');

  menuIcon_right.addEventListener('click', function(){
    openMenubar();
    });

    menuIcon_left.addEventListener('click', function(){
    closeMenubar();
    });

    var searchbar = document.createElement('input');
    searchbar.setAttribute('placeholder','Search jadgets...');
    searchbar.setAttribute('id','searchjadgets');
    /*searchbar.addEventListener('keyup', function(){
    showjadgets();
    });*/

    var createjadget = document.createElement('div');
    createjadget.setAttribute('id','createJadget');
    createjadget.addEventListener('click', function(){
    closeMenubar();
    });

    var createJadgettext = document.createElement('div');
    createJadgettext.setAttribute('id','createJadgettext');
    $(createJadgettext).text('create custom jadget');

    createjadget.append(createJadgettext);

    var line = document.createElement('div');
    line.setAttribute('class','line');

    var buttons = document.createElement('div');
    buttons.setAttribute('id','buttons');

    var newbutton = document.createElement('button');
    newbutton.setAttribute('class','barbutton');
    newbutton.innerText = 'Create new element';
    newbutton.addEventListener('click',function(){

      var spinner = document.getElementsByClassName('spinner')[0];
      var select = document.getElementById('selecttype');
      spinner.style.display = 'block';

      setTimeout(function(){

        spinner.style.display = 'none';
        select.style.width = '150px';
        setTimeout(function(){populateselection();},1000);

        setTimeout(function(){
          select.style.width = '0px';
          populateselection('true');
        },5000);

      },2000);

    });

    var selectnew = document.createElement('div');
    selectnew.setAttribute('id','selecttype');

    var spinner = document.createElement('div');
    spinner.setAttribute('class','spinner');

    buttons.appendChild(spinner);
    buttons.appendChild(newbutton);

    menuBar.append(searchbar);
    menuBar.append(createjadget);

    var previewbox = document.createElement('div');
    previewbox.setAttribute('id','previewbox');

    panel.appendChild(line);
    panel.appendChild(selectnew);
    panel.appendChild(buttons);
  //panel.appendChild(menuBar);
  //panel.appendChild(menuIcon_left);
  //panel.appendChild(menuIcon_right);

  panel.appendChild(previewbox);

  $('body').append(panel);
  $('#background').css({'display':'block'});

  }

}

//------------------------------------------------------------------

class WebPageBuilder{
  constructor(){}

  start(){

    mediaManager.refreshMedia();

    sidebarElement.close();
    var previewsite = document.createElement('div');
    previewsite.setAttribute('class','previewsite');

    var leftguide = document.createElement('div');
    var centerguide = document.createElement('div');
    var rightguide = document.createElement('div');

    var vcenterline = document.createElement('div');
    var hcenterline = document.createElement('div');

    leftguide.className = 'lguide';
    centerguide.className = 'cguide';
    rightguide.className = 'rguide';

    vcenterline.className = 'vcenterline';
    hcenterline.className = 'hcenterline';

    previewsite.appendChild(leftguide);
    previewsite.appendChild(centerguide);
    previewsite.appendChild(rightguide);

    previewsite.appendChild(vcenterline);
    previewsite.appendChild(hcenterline);

    body.appendChild(previewsite);

    tools.load();

  }

}

//------------------------------------------------------------------

var elementpanel = new jadgetPanel;
var pagebuilder = new WebPageBuilder;

//------------------------------------------------------------------

$(document).ready(function () {

    if(localStorage.getItem("auth") === null) {
       window.location.href = '../login/';
    }else{
      token = localStorage.getItem("auth");
      $.ajax({
        url:'http://localhost:8000/api/me',
        type:'GET',
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer '+token);
            request.setRequestHeader('Accept', 'application/json');
        },
        success: function(response){
          if(response.message == 'Unauthenticated.'){
            window.location.href = '../login/';
          }else{
            if(isMember(response)){
              loggedin(response);
            }else{
              planExpired(response);
            }
          }
        },
        error: function(response){
          window.location.href = '../login/';
        }
      })
    }

});

function planExpired(response){
  document.getElementsByTagName('loader')[0].remove();
  var exatExpiry = moment(response.success.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
  notice('plan-expired',exatExpiry);

  setTimeout(function(){
    window.location.href = '../profile/';
  },7500);

  document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/notice.css">';

  //var upgradeplan = document.createElement('div');
  //upgradeplan.setAttribute('id','upgp');

  //document.getElementsByTagName('body')[0].appendChild(upgradeplan);

  //setUpPaypal(response);
  //document.getElementById('upgp').style.display = 'block';
  //document.getElementById('upgp').style.opacity = '1';
}

function loadSideBar(){
    var sidebar = document.createElement('sidebar');
    sidebar.innerHTML = '<ul><p>Account</p><li data-link='+'../profile/'+'><i class="fas fa-user-circle"></i> Profile</li><li data-link='+'../billing/'+'><i class="fas fa-credit-card"></i> Billing</li><li data-link='+'../notifications/'+'><i class="fas fa-bell"></i> Notifications</li><div class="ulLine"></div><p>Manage</p><li data-link='+'../studio/'+' style="color: white;"><i class="fas fa-tools"></i> Workspace</li><li data-link='+'../storage/'+'><i class="fas fa-archive"></i> Storage</li><li data-link='+'../support/'+'><i class="fas fa-life-ring"></i> Support</li><div class="ulLine"></div><li onclick="logout();"><i class="fas fa-sign-out-alt"></i> Logout</li><i class="fas fa-angle-left" id="openclose"></i></ul>';

    document.getElementsByTagName('body')[0].appendChild(sidebar);
}

function loggedin(response){

  loadSideBar();

  var callbilly = document.createElement('callbilly');
  var billyDiv = document.createElement('billy');

  var notesdiv = document.createElement('div');
  notesdiv.setAttribute('id','notes');

  billyDiv.innerHTML = '<tongue>Hey , how can i help you today?</tongue><orders><type data-panel-trigger="suggestion"><p>I would like to have a suggestion.</p><div class="billyspinner"></div></type><order class="suggestion"><p>Background Color</p></order><order class="suggestion"><p>Font Color</p></order></orders>';
  notesdiv.innerHTML = '<h6>We are sorry if you are facing any ux/ui problems.The software does not supports all small screen sizes.</h6><button id="ntsbtn">Okay</button>';

  document.getElementsByTagName('body')[0].appendChild(notesdiv);
  document.getElementsByTagName('body')[0].appendChild(callbilly);
  document.getElementsByTagName('body')[0].appendChild(billyDiv);

  document.getElementsByTagName('loader')[0].remove();
    //console.log(response);

    plan = response.success.plan;

    if(plan !== 'Free'){
      if(plan == 'Gold' || plan == 'Diamond' || plan == 'Silver'){
        var script1 = document.createElement('script');
        script1.setAttribute('src','../assets/js/animation.js');

        $('script')[0].after(script1);
      }
    }

    $("body").on("contextmenu",function(e){
        return false;
    });

    ui.greetUser();

    var notesbtn = document.getElementById('ntsbtn');

    notesbtn.addEventListener('click',function(){
      document.getElementById('notes').remove();
    });

    var openclose = document.getElementById('openclose');
    openclose.addEventListener("click",function(){
      if(document.getElementsByTagName('sidebar')[0].style.left == '0px'){
        sidebarElement.close();
      }else{
        sidebarElement.open();
      }
    });

    var siderbar_lis = document.getElementsByTagName('sidebar')[0].getElementsByTagName('li');
    for(var i=0; i < siderbar_lis.length; i++){
      if(siderbar_lis[i].innerText.includes('Logout')){
        //console.log('found');
      }else{
        siderbar_lis[i].addEventListener('click',function(){
            window.location.href = $(this).attr('data-link');
        });
      }
    }

    if(plan !== 'Free'){
      if(plan == 'Gold' || plan == 'Diamond'){
          getAnimations();
      }
    }
}

/*$('#panel').onclick = function(){

 var cm = document.getElementsByTagName('contextmenu')[0];
 cm.style.display = 'none';

};*/
/*function permit(event){
  event.preventDefault();
}

function drag(event){
  draggingelementofid = event.target.id;
}

function drop(event){
  var element = document.getElementById(draggingelementofid);
  event.target.append(element);

  element.style.overflow = 'auto';
  element.setAttribute('draggable','false');
  element.setAttribute('ondragstart','');

  event.target.style.opacity = '1';
  event.target.style.backgroundColor = 'white';
  event.target.style.border = '1px solid black';
  event.target.style.borderRadius = '5px';
}*/

function populateMenu(){
  var menuBar = document.getElementById('menuBar');

  var button = document.createElement('button');
  button.innerText = 'Add New Widget';
  button.onclick = function(){
    addWidget();
  }

  menuBar.appendChild(button);
}


function openMenubar(){
  $('#menuBar').css({'width':'50%'});
    $('#searchjadgets').css({'display':'block'});
  $('#menuIcon-right').css({'width':'0px','height':'0px','opacity':'0','pointer-events':'none'});
  $('#menuIcon-left').css({'width':'5px','height':'5px','opacity':'1','pointer-events':'unset'});
}

function closeMenubar(){
  $('#menuBar').css({'width':'0%'});
    $('#searchjadgets').css({'display':'none'});
  $('#menuIcon-left').css({'width':'0px','height':'0px','opacity':'0','pointer-events':'none'});
  $('#menuIcon-right').css({'width':'5px','height':'5px','opacity':'1','pointer-events':'unset'});
}


function populateselection(dispopulate){

if(dispopulate == 'true'){

setTimeout(function(){$('#selecttype').empty()},500);

}
else{

var new_button = document.createElement('button');
new_button.style.marginTop = '20px';
new_button.innerText = 'Button';
new_button.addEventListener('click',function(){
    newelement('button');
});

var new_div = document.createElement('button');
new_div.style.marginTop = '10px';
new_div.innerText = 'Div';
new_div.addEventListener('click',function(){
    newelement('div');
});

var new_paragraph = document.createElement('button');
new_paragraph.style.marginTop = '10px';
new_paragraph.innerText = 'Paragraph';
new_paragraph.addEventListener('click',function(){
    newelement('paragraph');
});

var new_heading = document.createElement('button');
new_heading.style.marginTop = '10px';
new_heading.innerText = 'Heading';
new_heading.addEventListener('click',function(){
    newelement('heading');
});

var new_input = document.createElement('button');
new_input.style.marginTop = '10px';
new_input.innerText = 'Text Input';
new_input.addEventListener('click',function(){
    newelement('input');
});

var new_textarea = document.createElement('button');
new_textarea.style.marginTop = '10px';
new_textarea.innerText = 'Textarea';
new_textarea.addEventListener('click',function(){
    newelement('textarea');
});

var new_image = document.createElement('button');
new_image.style.marginTop = '10px';
new_image.innerText = 'Image';
new_image.addEventListener('click',function(){
    newelement('image');
});

var new_video = document.createElement('button');
new_video.style.marginTop = '10px';
new_video.innerText = 'Video';
new_video.addEventListener('click',function(){
  newelement('video');
});

/*var new_audio = document.createElement('button');
new_audio.style.marginTop = '10px';
new_audio.innerText = 'Audio';
new_audio.addEventListener('click',function(){
  newelement('audio');
});*/

$('#selecttype').append(new_button);
$('#selecttype').append(new_div);
$('#selecttype').append(new_paragraph);
$('#selecttype').append(new_heading);
$('#selecttype').append(new_input);
$('#selecttype').append(new_textarea);
$('#selecttype').append(new_image);
$('#selecttype').append(new_video);
//$('#selecttype').append(new_audio);

}

}

function advance(element,createnew){

    if(createnew == 'false'){

    var backbutton = document.createElement('button');
    backbutton.setAttribute('class','barbutton backbutton');
    backbutton.innerText = 'Go Back';
    backbutton.style.marginLeft = '10px';
    backbutton.addEventListener('click',function(){

        var spinner = document.getElementsByClassName('spinner')[0];
        spinner.style.display = 'block';

        var panel = document.getElementById('panel');
        panel.style.opacity = '0.3';
        panel.style.pointerEvents = 'none';

        var advancediv = document.getElementById('advance');

        setTimeout(function(){

            spinner.style.display = 'none';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'unset';
            advancediv.style.display = 'none';
            backbutton.remove();
            $('.info').remove();

        },4000);

    });

    document.getElementsByClassName('spinner')[0].style.display = 'block';
    var panel = document.getElementById('panel');
    panel.style.opacity = '0.3';
    panel.style.pointerEvents = 'none';

    setTimeout(function(){

      $('#buttons').append(backbutton);
      document.getElementsByClassName('spinner')[0].style.display = 'none';
      document.getElementById('advance').style.display = 'block';
      panel.style.opacity = '1';
      panel.style.pointerEvents = 'unset';

    },4000);

    }

    if(createnew == 'true'){

      getGoogleFonts(element,'elementCreator');

  var advancediv = document.createElement('div');
  advancediv.setAttribute('id','advance');

  var backbutton = document.createElement('button');
    backbutton.setAttribute('class','barbutton backbutton');
    backbutton.innerText = 'Go Back';
    backbutton.style.marginLeft = '10px';
    backbutton.addEventListener('click',function(){

      var spinner = document.getElementsByClassName('spinner')[0];
      spinner.style.display = 'block';

      var panel = document.getElementById('panel');
      panel.style.opacity = '0.3';
      panel.style.pointerEvents = 'none';

      var advancediv = document.getElementById('advance');

      setTimeout(function(){

        spinner.style.display = 'none';
        panel.style.opacity = '1';
        panel.style.pointerEvents = 'unset';
        advancediv.style.display = 'none';
        backbutton.remove();
            $('.info').remove();

      },4000);

    });

    //------------------Background Image------------------//

    var backgroundimage_div = document.createElement('div');
    backgroundimage_div.setAttribute('id','bgimgbox');

    var backgroundimage_div_banner = document.createElement('banner');
    backgroundimage_div_banner_text = document.createElement('h5');
    backgroundimage_div_banner_text.innerText = 'Background Image';
    backgroundimage_div_banner.appendChild(backgroundimage_div_banner_text);
    backgroundimage_div.appendChild(backgroundimage_div_banner);

    var backgroundimage_file_input = document.createElement('input');
    backgroundimage_file_input.setAttribute('type','file');
    backgroundimage_file_input.setAttribute('hidden','');
    backgroundimage_file_input.addEventListener('change',function(){
      var file  = backgroundimage_file_input.files[0];
        var reader  = new FileReader();
        reader.onload = function () {
           $('#preview'+element).css({"background-image":"url(" + reader.result + ")","background-size":"cover"});
        }
        reader.readAsDataURL(file);
    })

    var backgroundimage_file_input_button = document.createElement('button');
    backgroundimage_file_input_button.setAttribute('class','filebtn');
    backgroundimage_file_input_button.innerText = 'Select image';
    backgroundimage_file_input_button.addEventListener('click',function(){
      backgroundimage_file_input.click();
    });

    var giphydiv = document.createElement('giphy');

    var giphyheading = document.createElement('p');
    giphyheading.innerText = "Search gifs from giphy.com";
    giphyheading.setAttribute('class','heading');

    var giphysearchinput = document.createElement('input');
    giphysearchinput.setAttribute('placeholder','Enter keyword here. Ex: Smile');
    giphysearchinput.setAttribute('class','searchbar');

    var giphysearchbtn = document.createElement('button');
    var giphysearchbtnIcon = document.createElement('i');
    giphysearchbtnIcon.setAttribute('class','fas fa-search');
    giphysearchbtn.setAttribute('class','searchbutton');
    giphysearchbtn.addEventListener('click',function(){
      resetImages('elementCreator');
      searchGIFS(giphysearchinput.value,element,'elementCreator');
    });
    giphysearchbtn.appendChild(giphysearchbtnIcon);

    giphyclose = document.createElement('i');
    giphyclose.setAttribute('class','fas fa-times close');
    giphyclose.addEventListener('click',function(){
        giphydiv.style.opacity = 0;
        setTimeout(function(){giphydiv.style.display = "none";},750);
        document.getElementById('panel').style.opacity = 1;
        document.getElementById('panel').style.pointerEvents = "unset";
        resetGiphy();
    });

    giphydiv.appendChild(giphyclose);
    giphydiv.appendChild(giphyheading);
    giphydiv.appendChild(giphysearchinput);
    giphydiv.appendChild(giphysearchbtn);

    var giphybutton = document.createElement('giphybutton');
    giphybutton.addEventListener('click',function(){

      var giphydivopacity = giphydiv.style.opacity;
      if(giphydivopacity == 0){
        giphydiv.style.opacity = 1;
        setTimeout(function(){giphydiv.style.display = "block";},750);
        document.getElementById('panel').style.opacity = 0.5;
        document.getElementById('panel').style.pointerEvents = "none";
        resetGiphy();
      }

      if(giphydivopacity == 1){
        giphydiv.style.opacity = 0;
        setTimeout(function(){giphydiv.style.display = "none";},750);
        document.getElementById('panel').style.opacity = 1;
        document.getElementById('panel').style.pointerEvents = "unset";
        resetGiphy();
      }

    });

    backgroundimage_div.appendChild(backgroundimage_file_input_button);
    backgroundimage_div.appendChild(giphybutton);
    document.getElementsByTagName('body')[0].appendChild(giphydiv);
    backgroundimage_div.appendChild(backgroundimage_file_input);

    ////----------------End Background Image----------------//

    //-------TextShadow--------

    var textshadow = document.createElement('combobox');
    textshadow.setAttribute('id','textshadow');
    textshadow.style.transform = 'translate(-50%)';
    textshadow.style.left = '50%';

    var textshadow_customedit = document.createElement('input');
    textshadow_customedit.classList.add('customlarge');
    textshadow_customedit.setAttribute('placeholder','0px 0px 0px');

    var textshadow_selected = document.createElement('selected');
    var textshadow_selected_a = document.createElement('a');
    var textshadow_selected_a_span = document.createElement('span');
    textshadow_selected_a_span.innerText = 'Text Shadow';
    textshadow_selected_a.style.width = '250px';

    var textshadow_colordisplay = document.createElement('colordisplay');
    textshadow_colordisplay.setAttribute('id','textscd');
    textshadow_colordisplay.style.top = '17.5px';
    textshadow_colordisplay.style.display = 'none';
    textshadow_colordisplay.addEventListener('click',function(){

  var colorpicker = document.getElementById('textscp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }

    });

    var textshadow_colorpicker = document.createElement('div');
    textshadow_colorpicker.setAttribute('class','colorpicker');
    textshadow_colorpicker.setAttribute('id','textscp');
    textshadow_colorpicker.style.top = '-10px';
    textshadow_colorpicker.style.left = '-170px';

    var textshadow_colorpicker_box = document.createElement('canvas');
    textshadow_colorpicker_box.setAttribute('class','colorpickerbox');
    textshadow_colorpicker_box.setAttribute('id','textscpb');

    var textshadow_colorpicker_strip = document.createElement('canvas');
    textshadow_colorpicker_strip.setAttribute('class','colorpickerstrip');
    textshadow_colorpicker_strip.setAttribute('id','textscps');

    var textshadow_colorpicker_input_rgba = document.createElement('input');
    textshadow_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
    textshadow_colorpicker_input_rgba.setAttribute('id','textscprgba');
    textshadow_colorpicker_input_rgba.addEventListener('input',function(){
	     textToColorPickerColor(this,'textShadowColor',element);
    });

    var textshadow_colorpicker_input_hex = document.createElement('input');
    textshadow_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
    textshadow_colorpicker_input_hex.setAttribute('id','textscphex');
    textshadow_colorpicker_input_hex.addEventListener('input',function(){
	     textToColorPickerColor(this,'textShadowColor',element);
    });

    textshadow_colorpicker.appendChild(textshadow_colorpicker_box);
    textshadow_colorpicker.appendChild(textshadow_colorpicker_strip);
    textshadow_colorpicker.appendChild(textshadow_colorpicker_input_rgba);
    textshadow_colorpicker.appendChild(textshadow_colorpicker_input_hex);


    //---------------TextShadow Options End---------------------

    textshadow_selected_a.appendChild(textshadow_selected_a_span);
    textshadow_selected.appendChild(textshadow_selected_a);
    textshadow_selected.appendChild(textshadow_customedit);
    textshadow_selected.appendChild(textshadow_colorpicker);
    textshadow_selected.appendChild(textshadow_colordisplay);

    textshadow.appendChild(textshadow_selected);

    var textshadowdiv = document.createElement('div');
    textshadowdiv.setAttribute('class','box');
    textshadowdiv.style.zIndex = '2';

    var textshadowdivbanner = document.createElement('banner');
    var textshadowdivbannerh5 = document.createElement('h5');
    textshadowdivbannerh5.innerText = 'Text Shadow';
    textshadowdivbanner.appendChild(textshadowdivbannerh5);

    textshadowdiv.appendChild(textshadowdivbanner);
    textshadowdiv.appendChild(textshadow);

    //-----------------Event Handlers--------------------

    textshadow_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(textshadow_customedit.style.display == 'block'){

      textshadow_customedit.style.display = 'none';
      textshadow_selected_a_span.style.opacity = '1';
      textshadow_colordisplay.style.display = 'none';

  }else{

      textshadow_customedit.style.display = 'block';
      textshadow_selected_a_span.style.opacity = '0';
      textshadow_colordisplay.style.display = 'block';

  }

  }else{

  }

    });

    textshadow_customedit.addEventListener('keyup',function(){
  textshadow_selected_a_span.innerText = 'Text Shadow: ' + this.value;
  updateelement(element,'textshadow',this.value);

    });

    //-------End TextShadow--------

    //-------MarginLeft--------

     var marginleft = document.createElement('combobox');
     marginleft.setAttribute('id','marginleft');
     marginleft.style.transform = 'translate(-50%,-50%)';
     marginleft.style.top = '50%';
     marginleft.style.left = '50%';
     marginleft.style.marginTop = '-50px';

     var marginleft_customedit = document.createElement('input');
     marginleft_customedit.classList.add('custom');

     var marginleft_selected = document.createElement('selected');
     var marginleft_selected_a = document.createElement('a');
     var marginleft_selected_a_span = document.createElement('span');
     marginleft_selected_a_span.innerText = 'Left';

     marginleft_selected_a.appendChild(marginleft_selected_a_span);
     marginleft_selected.appendChild(marginleft_selected_a);
     marginleft_selected.appendChild(marginleft_customedit);

     marginleft.appendChild(marginleft_selected);

     //-----------------Event Handlers--------------------

     marginleft_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(marginleft_customedit.style.display == 'block'){

      marginleft_customedit.style.display = 'none';
      marginleft_selected_a_span.style.textAlign = '';

  }else{

      marginleft_customedit.style.display = 'block';
      marginleft_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

    });

    marginleft_customedit.addEventListener('keyup',function(){
  marginleft_selected_a_span.innerText = 'Left: ' + this.value+'px';
  updateelement(element,'marginleft',this.value+'px');

    });

    //-------End MarginLeft--------

    //-------MarginRight--------

     var marginright = document.createElement('combobox');
     marginright.setAttribute('id','marginright');
     marginright.style.left = '10px';
     marginright.style.transform = 'translate(-50%,-50%)';
     marginright.style.top = '50%';
     marginright.style.left = '50%';
     marginright.style.marginTop = '50px';

     var marginright_customedit = document.createElement('input');
     marginright_customedit.classList.add('custom');

     var marginright_selected = document.createElement('selected');
     var marginright_selected_a = document.createElement('a');
     var marginright_selected_a_span = document.createElement('span');
     marginright_selected_a_span.innerText = 'Right';

     marginright_selected_a.appendChild(marginright_selected_a_span);
     marginright_selected.appendChild(marginright_selected_a);
     marginright_selected.appendChild(marginright_customedit);

     marginright.appendChild(marginright_selected);

     //-----------------Event Handlers--------------------

     marginright_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(marginright_customedit.style.display == 'block'){

      marginright_customedit.style.display = 'none';
      marginright_selected_a_span.style.textAlign = '';

  }else{

      marginright_customedit.style.display = 'block';
      marginright_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

    });

    marginright_customedit.addEventListener('keyup',function(){
  marginright_selected_a_span.innerText = 'Right: ' + this.value+'px';
  updateelement(element,'marginright',this.value+'px');

    });

    //-------End MarginRight--------

    //-------MarginTop--------

     var margintop = document.createElement('combobox');
     margintop.setAttribute('id','margintop');
     margintop.style.transform = 'translate(-50%,-50%)';
     margintop.style.top = '50%';
     margintop.style.left = '50%';
     margintop.style.marginTop = '100px';

     var margintop_customedit = document.createElement('input');
     margintop_customedit.classList.add('custom');

     var margintop_selected = document.createElement('selected');
     var margintop_selected_a = document.createElement('a');
     var margintop_selected_a_span = document.createElement('span');
     margintop_selected_a_span.innerText = 'Top';

     margintop_selected_a.appendChild(margintop_selected_a_span);
     margintop_selected.appendChild(margintop_selected_a);
     margintop_selected.appendChild(margintop_customedit);

     margintop.appendChild(margintop_selected);

     //-----------------Event Handlers--------------------

     margintop_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(margintop_customedit.style.display == 'block'){

      margintop_customedit.style.display = 'none';
      margintop_selected_a_span.style.textAlign = '';

  }else{

      margintop_customedit.style.display = 'block';
      margintop_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

    });

    margintop_customedit.addEventListener('keyup',function(){
  margintop_selected_a_span.innerText = 'Top: ' + this.value+'px';
  updateelement(element,'margintop',this.value+'px');

    });

    //-------End MarginTop--------

    //-------MarginBottom--------

     var marginbottom = document.createElement('combobox');
     marginbottom.setAttribute('id','marginbottom');
     marginbottom.style.transform = 'translate(-50%,-50%)';
     marginbottom.style.top = '50%';
     marginbottom.style.left = '50%';
     marginbottom.style.marginTop = '0px';

     var marginbottom_customedit = document.createElement('input');
     marginbottom_customedit.classList.add('custom');

     var marginbottom_selected = document.createElement('selected');
     var marginbottom_selected_a = document.createElement('a');
     var marginbottom_selected_a_span = document.createElement('span');
     marginbottom_selected_a_span.innerText = 'Bottom';

     marginbottom_selected_a.appendChild(marginbottom_selected_a_span);
     marginbottom_selected.appendChild(marginbottom_selected_a);
     marginbottom_selected.appendChild(marginbottom_customedit);

     marginbottom.appendChild(marginbottom_selected);

     //-----------------Event Handlers--------------------

     marginbottom_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(marginbottom_customedit.style.display == 'block'){

      marginbottom_customedit.style.display = 'none';
      marginbottom_selected_a_span.style.textAlign = '';

  }else{

      marginbottom_customedit.style.display = 'block';
      marginbottom_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

    });

    marginbottom_customedit.addEventListener('keyup',function(){
  marginbottom_selected_a_span.innerText = 'Bottom: ' + this.value+'px';
  updateelement(element,'marginbottom',this.value+'px');

    });

    //-------End MarginBottom--------

    //-------PaddingLeft--------

     var paddingleft = document.createElement('combobox');
     paddingleft.setAttribute('id','paddingleft');
     paddingleft.style.left = '5px';
     paddingleft.style.top = '5px';

     var paddingleft_customedit = document.createElement('input');
     paddingleft_customedit.classList.add('custom');

     var paddingleft_selected = document.createElement('selected');
     var paddingleft_selected_a = document.createElement('a');
     paddingleft_selected_a.style.width = '120px';
     var paddingleft_selected_a_span = document.createElement('span');
     paddingleft_selected_a_span.innerText = 'Left';

     paddingleft_selected_a.appendChild(paddingleft_selected_a_span);
     paddingleft_selected.appendChild(paddingleft_selected_a);
     paddingleft_selected.appendChild(paddingleft_customedit);

     paddingleft.appendChild(paddingleft_selected);

     //-----------------Event Handlers--------------------

     paddingleft_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(paddingleft_customedit.style.display == 'block'){

        paddingleft_customedit.style.display = 'none';
        paddingleft_selected_a_span.style.textAlign = '';

    }else{

        paddingleft_customedit.style.display = 'block';
        paddingleft_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    paddingleft_customedit.addEventListener('keyup',function(){
    paddingleft_selected_a_span.innerText = 'Left: ' + this.value+'px';
    updateelement(element,'paddingleft',this.value+'px');

    });

    //-------End PaddingLeft--------

    //-------PaddingRight--------

     var paddingright = document.createElement('combobox');
     paddingright.setAttribute('id','paddingright');
     paddingright.style.left = '305px';
     paddingright.style.top = '5px';

     var paddingright_customedit = document.createElement('input');
     paddingright_customedit.classList.add('custom');

     var paddingright_selected = document.createElement('selected');
     var paddingright_selected_a = document.createElement('a');
     paddingright_selected_a.style.width = '120px';
     var paddingright_selected_a_span = document.createElement('span');
     paddingright_selected_a_span.innerText = 'Right';

     paddingright_selected_a.appendChild(paddingright_selected_a_span);
     paddingright_selected.appendChild(paddingright_selected_a);
     paddingright_selected.appendChild(paddingright_customedit);

     paddingright.appendChild(paddingright_selected);

     //-----------------Event Handlers--------------------

     paddingright_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(paddingright_customedit.style.display == 'block'){

        paddingright_customedit.style.display = 'none';
        paddingright_selected_a_span.style.textAlign = '';

    }else{

        paddingright_customedit.style.display = 'block';
        paddingright_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    paddingright_customedit.addEventListener('keyup',function(){
    paddingright_selected_a_span.innerText = 'Right: ' + this.value+'px';
    updateelement(element,'paddingright',this.value+'px');

    });

    //-------End PaddingRight--------

    //-------PaddingTop--------

     var paddingtop = document.createElement('combobox');
     paddingtop.setAttribute('id','paddingtop');
     paddingtop.style.left = '455px';
     paddingtop.style.top = '5px';

     var paddingtop_customedit = document.createElement('input');
     paddingtop_customedit.classList.add('custom');

     var paddingtop_selected = document.createElement('selected');
     var paddingtop_selected_a = document.createElement('a');
     paddingtop_selected_a.style.width = '120px';
     var paddingtop_selected_a_span = document.createElement('span');
     paddingtop_selected_a_span.innerText = 'Top';

     paddingtop_selected_a.appendChild(paddingtop_selected_a_span);
     paddingtop_selected.appendChild(paddingtop_selected_a);
     paddingtop_selected.appendChild(paddingtop_customedit);

     paddingtop.appendChild(paddingtop_selected);

     //-----------------Event Handlers--------------------

     paddingtop_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(paddingtop_customedit.style.display == 'block'){

        paddingtop_customedit.style.display = 'none';
        paddingtop_selected_a_span.style.textAlign = '';

    }else{

        paddingtop_customedit.style.display = 'block';
        paddingtop_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    paddingtop_customedit.addEventListener('keyup',function(){
    paddingtop_selected_a_span.innerText = 'Top: ' + this.value+'px';
    updateelement(element,'paddingtop',this.value+'px');

    });

    //-------End PaddingTop--------

    //-------PaddingBottom--------

     var paddingbottom = document.createElement('combobox');
     paddingbottom.setAttribute('id','paddingbottom');
     paddingbottom.style.left = '155px';
     paddingbottom.style.top = '5px';

     var paddingbottom_customedit = document.createElement('input');
     paddingbottom_customedit.classList.add('custom');

     var paddingbottom_selected = document.createElement('selected');
     var paddingbottom_selected_a = document.createElement('a');
     paddingbottom_selected_a.style.width = '120px';
     var paddingbottom_selected_a_span = document.createElement('span');
     paddingbottom_selected_a_span.innerText = 'Bottom';

     paddingbottom_selected_a.appendChild(paddingbottom_selected_a_span);
     paddingbottom_selected.appendChild(paddingbottom_selected_a);
     paddingbottom_selected.appendChild(paddingbottom_customedit);

     paddingbottom.appendChild(paddingbottom_selected);

     //-----------------Event Handlers--------------------

     paddingbottom_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(paddingbottom_customedit.style.display == 'block'){

        paddingbottom_customedit.style.display = 'none';
        paddingbottom_selected_a_span.style.textAlign = '';

    }else{

        paddingbottom_customedit.style.display = 'block';
        paddingbottom_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    paddingbottom_customedit.addEventListener('keyup',function(){
    paddingbottom_selected_a_span.innerText = 'Bottom: ' + this.value+'px';
    updateelement(element,'paddingbottom',this.value+'px');

    });

    //-------End PaddingBottom--------

    //-------LetterSpace--------

     var letterspace = document.createElement('combobox');
     letterspace.setAttribute('id','letterspace');
     letterspace.style.left = '50%';
     letterspace.style.top = '50%';
     letterspace.style.marginTop = '25px';
     letterspace.style.marginLeft = '0px';
     letterspace.style.transform = 'translate(-50%,-50%)';

     var letterspace_customedit = document.createElement('input');
     letterspace_customedit.classList.add('custom');

     var letterspace_selected = document.createElement('selected');
     var letterspace_selected_a = document.createElement('a');
     var letterspace_selected_a_span = document.createElement('span');
     letterspace_selected_a_span.innerText = 'Letter Space';

     letterspace_selected_a.appendChild(letterspace_selected_a_span);
     letterspace_selected.appendChild(letterspace_selected_a);
     letterspace_selected.appendChild(letterspace_customedit);

     letterspace.appendChild(letterspace_selected);

     //-----------------Event Handlers--------------------

     letterspace_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(letterspace_customedit.style.display == 'block'){

        letterspace_customedit.style.display = 'none';
        letterspace_selected_a_span.style.textAlign = '';

    }else{

        letterspace_customedit.style.display = 'block';
        letterspace_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    letterspace_customedit.addEventListener('keyup',function(){
    letterspace_selected_a_span.innerText = 'Letter Space: ' + this.value+'px';
    updateelement(element,'letterspace',this.value+'px');

    });

    //-------End LetterSpace--------

    //-------OutlineWidth--------

     var outlinewidth = document.createElement('combobox');
     outlinewidth.setAttribute('id','outlinewidth');
     outlinewidth.style.left = '50%';
     outlinewidth.style.transform = 'translate(-50%)';
     outlinewidth.style.zIndex = '0';

     var outlinewidth_customedit = document.createElement('input');
     outlinewidth_customedit.classList.add('custom');

     var outlinewidth_selected = document.createElement('selected');
     var outlinewidth_selected_a = document.createElement('a');
     var outlinewidth_selected_a_span = document.createElement('span');
     outlinewidth_selected_a_span.innerText = 'Outline Width';

     outlinewidth_selected_a.appendChild(outlinewidth_selected_a_span);
     outlinewidth_selected.appendChild(outlinewidth_selected_a);
     outlinewidth_selected.appendChild(outlinewidth_customedit);

     outlinewidth.appendChild(outlinewidth_selected);

     //-----------------Event Handlers--------------------

     outlinewidth_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(outlinewidth_customedit.style.display == 'block'){

        outlinewidth_customedit.style.display = 'none';
        outlinewidth_selected_a_span.style.textAlign = '';

    }else{

        outlinewidth_customedit.style.display = 'block';
        outlinewidth_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    outlinewidth_customedit.addEventListener('keyup',function(){
    outlinewidth_selected_a_span.innerText = 'Outline Width: ' + this.value+'px';
    updateelement(element,'outlinewidth',this.value+'px');

    });

    //-------End OutlineWidth--------

    //-------OutlineStyle--------

var outlinestyle = document.createElement('combobox');
outlinestyle.setAttribute('id','outlinestyle');
outlinestyle.style.left = '50%';
outlinestyle.style.transform = 'translate(-50%)';
outlinestyle.style.zIndex = '1';

var outlinestyle_selected = document.createElement('selected');
var outlinestyle_selected_a = document.createElement('a');
var outlinestyle_selected_a_span = document.createElement('span');
outlinestyle_selected_a_span.innerText = 'Outline Style';

var outlinestyle_options = document.createElement('options');
var outlinestyle_options_ul = document.createElement('ul');

//------------------OutlineStyle Options--------------------
//-------------------------1----------------------------

var outlinestyle_options_1 = document.createElement('li');

var outlinestyle_options_1_a = document.createElement('a');
outlinestyle_options_1_a.innerText = 'Solid';

var outlinestyle_options_1_a_span = document.createElement('span');
outlinestyle_options_1_a_span.innerText = 'Solid';
outlinestyle_options_1_a_span.setAttribute('class','value');

outlinestyle_options_1_a.appendChild(outlinestyle_options_1_a_span);
outlinestyle_options_1.appendChild(outlinestyle_options_1_a);

outlinestyle_options_1.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_1_a.innerText);
});

//-------------------------2----------------------------

var outlinestyle_options_2 = document.createElement('li');

var outlinestyle_options_2_a = document.createElement('a');
outlinestyle_options_2_a.innerText = 'Dotted';

var outlinestyle_options_2_a_span = document.createElement('span');
outlinestyle_options_2_a_span.innerText = 'Dotted';
outlinestyle_options_2_a_span.setAttribute('class','value');

outlinestyle_options_2_a.appendChild(outlinestyle_options_2_a_span);
outlinestyle_options_2.appendChild(outlinestyle_options_2_a);

outlinestyle_options_2.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_2_a.innerText);
});

//-------------------------3----------------------------

var outlinestyle_options_3 = document.createElement('li');

var outlinestyle_options_3_a = document.createElement('a');
outlinestyle_options_3_a.innerText = 'Double';

var outlinestyle_options_3_a_span = document.createElement('span');
outlinestyle_options_3_a_span.innerText = 'Double';
outlinestyle_options_3_a_span.setAttribute('class','value');

outlinestyle_options_3_a.appendChild(outlinestyle_options_3_a_span);
outlinestyle_options_3.appendChild(outlinestyle_options_3_a);

outlinestyle_options_3.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_3_a.innerText);
});

//-------------------------4----------------------------

var outlinestyle_options_4 = document.createElement('li');

var outlinestyle_options_4_a = document.createElement('a');
outlinestyle_options_4_a.innerText = 'Dashed';

var outlinestyle_options_4_a_span = document.createElement('span');
outlinestyle_options_4_a_span.innerText = 'Dashed';
outlinestyle_options_4_a_span.setAttribute('class','value');

outlinestyle_options_4_a.appendChild(outlinestyle_options_4_a_span);
outlinestyle_options_4.appendChild(outlinestyle_options_4_a);

outlinestyle_options_4.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_4_a.innerText);
});

//-------------------------5----------------------------

var outlinestyle_options_5 = document.createElement('li');

var outlinestyle_options_5_a = document.createElement('a');
outlinestyle_options_5_a.innerText = 'Groove';

var outlinestyle_options_5_a_span = document.createElement('span');
outlinestyle_options_5_a_span.innerText = 'Groove';
outlinestyle_options_5_a_span.setAttribute('class','value');

outlinestyle_options_5_a.appendChild(outlinestyle_options_5_a_span);
outlinestyle_options_5.appendChild(outlinestyle_options_5_a);

outlinestyle_options_5.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_5_a.innerText);
});

//-------------------------6----------------------------

var outlinestyle_options_6 = document.createElement('li');

var outlinestyle_options_6_a = document.createElement('a');
outlinestyle_options_6_a.innerText = 'Ridge';

var outlinestyle_options_6_a_span = document.createElement('span');
outlinestyle_options_6_a_span.innerText = 'Ridge';
outlinestyle_options_6_a_span.setAttribute('class','value');

outlinestyle_options_6_a.appendChild(outlinestyle_options_6_a_span);
outlinestyle_options_6.appendChild(outlinestyle_options_6_a);

outlinestyle_options_6.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_6_a.innerText);
});

//-------------------------7----------------------------

var outlinestyle_options_7 = document.createElement('li');

var outlinestyle_options_7_a = document.createElement('a');
outlinestyle_options_7_a.innerText = 'None';

var outlinestyle_options_7_a_span = document.createElement('span');
outlinestyle_options_7_a_span.innerText = 'None';
outlinestyle_options_7_a_span.setAttribute('class','value');

outlinestyle_options_7_a.appendChild(outlinestyle_options_7_a_span);
outlinestyle_options_7.appendChild(outlinestyle_options_7_a);

outlinestyle_options_7.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_7_a.innerText);
});

//-------------------------8----------------------------

var outlinestyle_options_8 = document.createElement('li');

var outlinestyle_options_8_a = document.createElement('a');
outlinestyle_options_8_a.innerText = 'Hidden';

var outlinestyle_options_8_a_span = document.createElement('span');
outlinestyle_options_8_a_span.innerText = 'Hidden';
outlinestyle_options_8_a_span.setAttribute('class','value');

outlinestyle_options_8_a.appendChild(outlinestyle_options_8_a_span);
outlinestyle_options_8.appendChild(outlinestyle_options_8_a);

outlinestyle_options_8.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_8_a.innerText);
});

//-------------------------9----------------------------

var outlinestyle_options_9 = document.createElement('li');

var outlinestyle_options_9_a = document.createElement('a');
outlinestyle_options_9_a.innerText = 'Outset';

var outlinestyle_options_9_a_span = document.createElement('span');
outlinestyle_options_9_a_span.innerText = 'Outset';
outlinestyle_options_9_a_span.setAttribute('class','value');

outlinestyle_options_9_a.appendChild(outlinestyle_options_9_a_span);
outlinestyle_options_9.appendChild(outlinestyle_options_9_a);

outlinestyle_options_9.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_9_a.innerText);
});

//-------------------------10----------------------------

var outlinestyle_options_10 = document.createElement('li');

var outlinestyle_options_10_a = document.createElement('a');
outlinestyle_options_10_a.innerText = 'Inset';
outlinestyle_options_10_a.classList.add('lastoption');

var outlinestyle_options_10_a_span = document.createElement('span');
outlinestyle_options_10_a_span.innerText = 'Inset';
outlinestyle_options_10_a_span.setAttribute('class','value');

outlinestyle_options_10_a.appendChild(outlinestyle_options_10_a_span);
outlinestyle_options_10.appendChild(outlinestyle_options_10_a);

outlinestyle_options_10.addEventListener('click',function(){
    tb(element,'osty',outlinestyle_options_10_a.innerText);
});

//---------------OutlineStyle Options End---------------------

outlinestyle_selected_a.appendChild(outlinestyle_selected_a_span);
outlinestyle_selected.appendChild(outlinestyle_selected_a);

outlinestyle_options_ul.appendChild(outlinestyle_options_1);
outlinestyle_options_ul.appendChild(outlinestyle_options_2);
outlinestyle_options_ul.appendChild(outlinestyle_options_3);
outlinestyle_options_ul.appendChild(outlinestyle_options_4);
outlinestyle_options_ul.appendChild(outlinestyle_options_5);
outlinestyle_options_ul.appendChild(outlinestyle_options_6);
outlinestyle_options_ul.appendChild(outlinestyle_options_7);
outlinestyle_options_ul.appendChild(outlinestyle_options_8);
outlinestyle_options_ul.appendChild(outlinestyle_options_9);
outlinestyle_options_ul.appendChild(outlinestyle_options_10);

outlinestyle_options.appendChild(outlinestyle_options_ul);

outlinestyle.appendChild(outlinestyle_selected);
outlinestyle.appendChild(outlinestyle_options);

//-----------------Event Handlers--------------------
outlinestyle_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(outlinestyle_options.style.display == 'block'){

        outlinestyle_options.style.display = 'none';
        outlinestyle_options_ul.style.display = 'none';

    }else{

        outlinestyle_options.style.display = 'block';
        outlinestyle_options_ul.style.display = 'block';

    }

    }else{

    }

});

//-------End OutlineStyle--------

    //------OutlineColor-------

var outlinecolor = document.createElement('combobox');
outlinecolor.setAttribute('id','outlinecolor');
outlinecolor.style.left = '50%';
outlinecolor.style.transform = 'translate(-50%)';
outlinecolor.style.zIndex = '0';

var outlinecolor_selected = document.createElement('selected');
var outlinecolor_selected_a = document.createElement('a');
var outlinecolor_selected_a_span = document.createElement('span');
outlinecolor_selected_a_span.innerText = 'Outline Color';
outlinecolor_selected_a_span.style.fontSize = '12px';

var outlinecolor_colordisplay = document.createElement('colordisplay');
outlinecolor_colordisplay.setAttribute('id','ocd');
outlinecolor_colordisplay.style.display = 'none';
outlinecolor_colordisplay.addEventListener('click',function(){

    var colorpicker = document.getElementById('ocp');

    if(colorpicker.style.display == 'block'){

        colorpicker.style.display = 'none';

    }else{

        colorpicker.style.display = 'block';

    }

});

var outlinecolor_colorpicker = document.createElement('div');
outlinecolor_colorpicker.setAttribute('class','colorpicker');
outlinecolor_colorpicker.setAttribute('id','ocp');
outlinecolor_colorpicker.style.top = '-155px';

var outlinecolor_colorpicker_box = document.createElement('canvas');
outlinecolor_colorpicker_box.setAttribute('class','colorpickerbox');
outlinecolor_colorpicker_box.setAttribute('id','ocpb');

var outlinecolor_colorpicker_strip = document.createElement('canvas');
outlinecolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
outlinecolor_colorpicker_strip.setAttribute('id','ocps');

var outlinecolor_colorpicker_input_rgba = document.createElement('input');
outlinecolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
outlinecolor_colorpicker_input_rgba.setAttribute('id','ocprgba');
outlinecolor_colorpicker_input_rgba.addEventListener('input',function(){
	textToColorPickerColor(this,'outline-color',element);
});

var outlinecolor_colorpicker_input_hex = document.createElement('input');
outlinecolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
outlinecolor_colorpicker_input_hex.setAttribute('id','ocphex');
outlinecolor_colorpicker_input_hex.addEventListener('input',function(){
	textToColorPickerColor(this,'outline-color',element);
});

outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_box);
outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_strip);
outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_input_rgba);
outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_input_hex);

outlinecolor_selected_a.appendChild(outlinecolor_selected_a_span);
outlinecolor_selected.appendChild(outlinecolor_selected_a);
outlinecolor_selected.appendChild(outlinecolor_colordisplay);
outlinecolor_selected.appendChild(outlinecolor_colorpicker);

outlinecolor.appendChild(outlinecolor_selected);

//-----------------Event Handlers--------------------

outlinecolor_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(outlinecolor_colordisplay.style.display == 'block'){

        outlinecolor_colordisplay.style.display = 'none';
        outlinecolor.style.textAlign = '';

    }else{

        outlinecolor_colordisplay.style.display = 'block';
        outlinecolor.style.textAlign = 'left';

    }

    }else{

    }

});

//-----End OutlineColor------

/*
//-------FontCombinations--------

var fontcombinations = document.createElement('combobox');
fontcombinations.setAttribute('id','fontcombination');
fontcombinations.style.left = '50%';
fontcombinations.style.top = '50%';
fontcombinations.style.marginTop = '25px';
fontcombinations.style.marginLeft = '0px';
fontcombinations.style.transform = 'translate(-50%,-50%)';

//------------------FontCombinations Options--------------------
//-------------------------1----------------------------

var fontcombinations_options_1 = document.createElement('li');

var fontcombinations_options_1_a = document.createElement('a');
fontcombinations_options_1_a.innerText = 'Georgia, serif';
fontcombinations_options_1_a.style.fontFamily = 'Georgia, serif';

var fontcombinations_options_1_a_span = document.createElement('span');
fontcombinations_options_1_a_span.innerText = 'Georgia, serif';
fontcombinations_options_1_a_span.setAttribute('class','value');

fontcombinations_options_1_a.appendChild(fontcombinations_options_1_a_span);
fontcombinations_options_1.appendChild(fontcombinations_options_1_a);

fontcombinations_options_1.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_1_a.innerText);
});

//-------------------------2----------------------------

var fontcombinations_options_2 = document.createElement('li');
var fontcombinations_options_2_a = document.createElement('a');
fontcombinations_options_2_a.innerText = '"Times New Roman", Times, serif';
fontcombinations_options_2_a.style.fontFamily = '"Times New Roman", Times, serif';

var fontcombinations_options_2_a_span = document.createElement('span');
fontcombinations_options_2_a_span.innerText = '"Times New Roman", Times, serif';
fontcombinations_options_2_a_span.setAttribute('class','value');

fontcombinations_options_2_a.appendChild(fontcombinations_options_2_a_span);
fontcombinations_options_2.appendChild(fontcombinations_options_2_a);

fontcombinations_options_2.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_2_a.innerText);
});

//-------------------------3----------------------------

var fontcombinations_options_3 = document.createElement('li');
var fontcombinations_options_3_a = document.createElement('a');
fontcombinations_options_3_a.innerText = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
fontcombinations_options_3_a.style.fontFamily = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

var fontcombinations_options_3_a_span = document.createElement('span');
fontcombinations_options_3_a_span.innerText = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
fontcombinations_options_3_a_span.setAttribute('class','value');

fontcombinations_options_3_a.appendChild(fontcombinations_options_3_a_span);
fontcombinations_options_3.appendChild(fontcombinations_options_3_a);

fontcombinations_options_3.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_3_a.innerText);
});

//-------------------------4----------------------------

var fontcombinations_options_4 = document.createElement('li');
var fontcombinations_options_4_a = document.createElement('a');
fontcombinations_options_4_a.innerText = 'Arial, Helvetica, sans-serif';
fontcombinations_options_4_a.style.fontFamily = 'Arial, Helvetica, sans-serif';

var fontcombinations_options_4_a_span = document.createElement('span');
fontcombinations_options_4_a_span.innerText = 'Arial, Helvetica, sans-serif';
fontcombinations_options_4_a_span.setAttribute('class','value');

fontcombinations_options_4_a.appendChild(fontcombinations_options_4_a_span);
fontcombinations_options_4.appendChild(fontcombinations_options_4_a);

fontcombinations_options_4.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_4_a.innerText);
});

//-------------------------5----------------------------

var fontcombinations_options_5 = document.createElement('li');
var fontcombinations_options_5_a = document.createElement('a');
fontcombinations_options_5_a.innerText = '"Arial Black", Gadget, sans-serif';
fontcombinations_options_5_a.style.fontFamily = '"Arial Black", Gadget, sans-serif';

var fontcombinations_options_5_a_span = document.createElement('span');
fontcombinations_options_5_a_span.innerText = '"Arial Black", Gadget, sans-serif';
fontcombinations_options_5_a_span.setAttribute('class','value');

fontcombinations_options_5_a.appendChild(fontcombinations_options_5_a_span);
fontcombinations_options_5.appendChild(fontcombinations_options_5_a);

fontcombinations_options_5.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_5_a.innerText);
});

//-------------------------6----------------------------

var fontcombinations_options_6 = document.createElement('li');
var fontcombinations_options_6_a = document.createElement('a');
fontcombinations_options_6_a.innerText = 'Impact, Charcoal, sans-serif';
fontcombinations_options_6_a.style.fontFamily = 'Impact, Charcoal, sans-serif';

var fontcombinations_options_6_a_span = document.createElement('span');
fontcombinations_options_6_a_span.innerText = 'Impact, Charcoal, sans-serif';
fontcombinations_options_6_a_span.setAttribute('class','value');

fontcombinations_options_6_a.appendChild(fontcombinations_options_6_a_span);
fontcombinations_options_6.appendChild(fontcombinations_options_6_a);

fontcombinations_options_6.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_6_a.innerText);
});

//-------------------------7----------------------------

var fontcombinations_options_7 = document.createElement('li');
var fontcombinations_options_7_a = document.createElement('a');
fontcombinations_options_7_a.innerText = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';
fontcombinations_options_7_a.style.fontFamily = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';

var fontcombinations_options_7_a_span = document.createElement('span');
fontcombinations_options_7_a_span.innerText = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';
fontcombinations_options_7_a_span.setAttribute('class','value');

fontcombinations_options_7_a.appendChild(fontcombinations_options_7_a_span);
fontcombinations_options_7.appendChild(fontcombinations_options_7_a);

fontcombinations_options_7.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_7_a.innerText);
});

//-------------------------8----------------------------

var fontcombinations_options_8 = document.createElement('li');
var fontcombinations_options_8_a = document.createElement('a');
fontcombinations_options_8_a.innerText = 'Tahoma, Geneva, sans-serif';
fontcombinations_options_8_a.style.fontFamily = 'Tahoma, Geneva, sans-serif';

var fontcombinations_options_8_a_span = document.createElement('span');
fontcombinations_options_8_a_span.innerText = 'Tahoma, Geneva, sans-serif';
fontcombinations_options_8_a_span.setAttribute('class','value');

fontcombinations_options_8_a.appendChild(fontcombinations_options_8_a_span);
fontcombinations_options_8.appendChild(fontcombinations_options_8_a);

fontcombinations_options_8.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_8_a.innerText);
});

//-------------------------9----------------------------

var fontcombinations_options_9 = document.createElement('li');
var fontcombinations_options_9_a = document.createElement('a');
fontcombinations_options_9_a.innerText = '"Trebuchet MS", Helvetica, sans-serif';
fontcombinations_options_9_a.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';

var fontcombinations_options_9_a_span = document.createElement('span');
fontcombinations_options_9_a_span.innerText = '"Trebuchet MS", Helvetica, sans-serif';
fontcombinations_options_9_a_span.setAttribute('class','value');

fontcombinations_options_9_a.appendChild(fontcombinations_options_9_a_span);
fontcombinations_options_9.appendChild(fontcombinations_options_9_a);

fontcombinations_options_9.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_9_a.innerText);
});

//-------------------------10----------------------------

var fontcombinations_options_10 = document.createElement('li');
var fontcombinations_options_10_a = document.createElement('a');
fontcombinations_options_10_a.innerText = 'Verdana, Geneva, sans-serif';
fontcombinations_options_10_a.style.fontFamily = 'Verdana, Geneva, sans-serif';

var fontcombinations_options_10_a_span = document.createElement('span');
fontcombinations_options_10_a_span.innerText = 'Verdana, Geneva, sans-serif';
fontcombinations_options_10_a_span.setAttribute('class','value');

fontcombinations_options_10_a.appendChild(fontcombinations_options_10_a_span);
fontcombinations_options_10.appendChild(fontcombinations_options_10_a);

fontcombinations_options_10.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_10_a.innerText);
});

//-------------------------11----------------------------

var fontcombinations_options_11 = document.createElement('li');
var fontcombinations_options_11_a = document.createElement('a');
fontcombinations_options_11_a.innerText = '"Lucida Console", Monaco, monospace';
fontcombinations_options_11_a.style.fontFamily = '"Lucida Console", Monaco, monospace';

var fontcombinations_options_11_a_span = document.createElement('span');
fontcombinations_options_11_a_span.innerText = '"Lucida Console", Monaco, monospace';
fontcombinations_options_11_a_span.setAttribute('class','value');

fontcombinations_options_11_a.appendChild(fontcombinations_options_11_a_span);
fontcombinations_options_11.appendChild(fontcombinations_options_11_a);

fontcombinations_options_11.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_11_a.innerText);
});

//-------------------------12----------------------------

var fontcombinations_options_12 = document.createElement('li');
var fontcombinations_options_12_a = document.createElement('a');
fontcombinations_options_12_a.classList.add('lastoption');
fontcombinations_options_12_a.innerText = '"Courier New", Courier, monospace';
fontcombinations_options_12_a.style.fontFamily = '"Courier New", Courier, monospace';

var fontcombinations_options_12_a_span = document.createElement('span');
fontcombinations_options_12_a_span.innerText = '"Courier New", Courier, monospace';
fontcombinations_options_12_a_span.setAttribute('class','value');

fontcombinations_options_12_a.appendChild(fontcombinations_options_12_a_span);
fontcombinations_options_12.appendChild(fontcombinations_options_12_a);

fontcombinations_options_12.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_12_a.innerText);
});

//---------------FontCombinations Options End---------------------

fontcombinations_selected_a.appendChild(fontcombinations_selected_a_span);
fontcombinations_selected.appendChild(fontcombinations_selected_a);

fontcombinations_options_ul.appendChild(fontcombinations_options_1);
fontcombinations_options_ul.appendChild(fontcombinations_options_2);
fontcombinations_options_ul.appendChild(fontcombinations_options_3);
fontcombinations_options_ul.appendChild(fontcombinations_options_4);
fontcombinations_options_ul.appendChild(fontcombinations_options_5);
fontcombinations_options_ul.appendChild(fontcombinations_options_6);
fontcombinations_options_ul.appendChild(fontcombinations_options_7);
fontcombinations_options_ul.appendChild(fontcombinations_options_8);
fontcombinations_options_ul.appendChild(fontcombinations_options_9);
fontcombinations_options_ul.appendChild(fontcombinations_options_10);
fontcombinations_options_ul.appendChild(fontcombinations_options_11);
fontcombinations_options_ul.appendChild(fontcombinations_options_12);

fontcombinations_options_ul.style.height = '80px';
fontcombinations_options_ul.style.overflowY = 'scroll';
fontcombinations_options.appendChild(fontcombinations_options_ul);

fontcombinations.appendChild(fontcombinations_selected);
fontcombinations.appendChild(fontcombinations_options);

//-----------------Event Handlers--------------------

fontcombinations_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(fontcombinations_options.style.display == 'block'){

        fontcombinations_options.style.display = 'none';
        fontcombinations_options_ul.style.display = 'none';

    }else{

        fontcombinations_options.style.display = 'block';
        fontcombinations_options_ul.style.display = 'block';

    }

    }else{

    }

});

//-------End FontCombinations--------
*/

    //-------Background Gradient--------

//-------EndX--------

     var endx = document.createElement('combobox');
     endx.setAttribute('id','endx');
     endx.style.left = '15px';
     endx.style.top = '5px';

     var endxvalue = document.createElement('span');
     endxvalue.setAttribute('id','bggexvalue');
     endxvalue.setAttribute('hidden','');

     var endx_customedit = document.createElement('input');
     endx_customedit.classList.add('custom');

     var endx_selected = document.createElement('selected');
     var endx_selected_a = document.createElement('a');
     var endx_selected_a_span = document.createElement('span');
     endx_selected_a_span.innerText = 'End X';

     endx_selected_a.appendChild(endx_selected_a_span);
     endx_selected.appendChild(endx_selected_a);
     endx_selected.appendChild(endx_customedit);

     var endx_options = document.createElement('options');
     var endx_options_ul = document.createElement('ul');
     endx_options_ul.style.maxHeight = '60px';
     endx_options_ul.style.overflowX = 'scroll';

     //------------------EndX Options--------------------
     //-------------------------1----------------------------

     var endx_options_1 = document.createElement('li');

     var endx_options_1_a = document.createElement('a');
     endx_options_1_a.innerText = 'Left';

     var endx_options_1_a_span = document.createElement('span');
     endx_options_1_a_span.innerText = 'Left';
     endx_options_1_a_span.setAttribute('class','value');

     endx_options_1_a.appendChild(endx_options_1_a_span);
     endx_options_1.appendChild(endx_options_1_a);

     endx_options_1.addEventListener('click',function(){
         tb(element,'bggex',endx_options_1_a.innerText);
     });

     //-------------------------2----------------------------

     var endx_options_2 = document.createElement('li');

     var endx_options_2_a = document.createElement('a');
     endx_options_2_a.innerText = 'Right';

     var endx_options_2_a_span = document.createElement('span');
     endx_options_2_a_span.innerText = 'Right';
     endx_options_2_a_span.setAttribute('class','value');

     endx_options_2_a.appendChild(endx_options_2_a_span);
     endx_options_2.appendChild(endx_options_2_a);

     endx_options_2.addEventListener('click',function(){
         tb(element,'bggex',endx_options_2_a.innerText);
     });

     //----------------End EndX Options------------------

     endx_options_ul.appendChild(endx_options_1);
     endx_options_ul.appendChild(endx_options_2);

     endx_options.appendChild(endx_options_ul);

     endx.appendChild(endx_selected);
     endx.appendChild(endx_options);
     endx.appendChild(endxvalue);

     //-----------------Event Handlers--------------------

    endx_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(endx_options.style.display == 'block'){

        endx_options.style.display = 'none';
        endx_options_ul.style.display = 'none';

    }else{

        endx_options.style.display = 'block';
        endx_options_ul.style.display = 'block';

    }

    }else{

    }

    });

    //-------End EndX--------

     //-------EndY--------

     var endy = document.createElement('combobox');
     endy.setAttribute('id','endy');
     endy.style.left = '15px';
     endy.style.top = '60px';
     endy.style.zIndex = '4';

     var endyvalue = document.createElement('span');
     endyvalue.setAttribute('id','bggeyvalue');
     endyvalue.setAttribute('hidden','');

     var endy_customedit = document.createElement('input');
     endy_customedit.classList.add('custom');

     var endy_selected = document.createElement('selected');
     var endy_selected_a = document.createElement('a');
     var endy_selected_a_span = document.createElement('span');
     endy_selected_a_span.innerText = 'End Y';

     endy_selected_a.appendChild(endy_selected_a_span);
     endy_selected.appendChild(endy_selected_a);
     endy_selected.appendChild(endy_customedit);

     var endy_options = document.createElement('options');
     var endy_options_ul = document.createElement('ul');
     endy_options_ul.style.maxHeight = '60px';
     endy_options_ul.style.overflowX = 'scroll';

     //------------------EndY Options--------------------
     //-------------------------1----------------------------

     var endy_options_1 = document.createElement('li');

     var endy_options_1_a = document.createElement('a');
     endy_options_1_a.innerText = 'Top';

     var endy_options_1_a_span = document.createElement('span');
     endy_options_1_a_span.innerText = 'Top';
     endy_options_1_a_span.setAttribute('class','value');

     endy_options_1_a.appendChild(endy_options_1_a_span);
     endy_options_1.appendChild(endy_options_1_a);

     endy_options_1.addEventListener('click',function(){
         tb(element,'bggey',endy_options_1_a.innerText);
     });

     //-------------------------2----------------------------

     var endy_options_2 = document.createElement('li');

     var endy_options_2_a = document.createElement('a');
     endy_options_2_a.innerText = 'Bottom';

     var endy_options_2_a_span = document.createElement('span');
     endy_options_2_a_span.innerText = 'Bottom';
     endy_options_2_a_span.setAttribute('class','value');

     endy_options_2_a.appendChild(endy_options_2_a_span);
     endy_options_2.appendChild(endy_options_2_a);

     endy_options_2.addEventListener('click',function(){
         tb(element,'bggey',endy_options_2_a.innerText);
     });

     //----------------End EndY Options------------------

     endy_options_ul.appendChild(endy_options_1);
     endy_options_ul.appendChild(endy_options_2);

     endy_options.appendChild(endy_options_ul);

     endy.appendChild(endy_selected);
     endy.appendChild(endy_options);
     endy.appendChild(endyvalue);

     //-----------------Event Handlers--------------------

    endy_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(endy_options.style.display == 'block'){

        endy_options.style.display = 'none';
        endy_options_ul.style.display = 'none';

    }else{

        endy_options.style.display = 'block';
        endy_options_ul.style.display = 'block';

    }

    }else{

    }

    });

    //-------End EndY--------

    //------Color1-------

     var color1 = document.createElement('combobox');
     color1.setAttribute('id','c1');
     color1.style.left = '205px';
     color1.style.top = '5px';
     color1.style.textAlign = 'Left';

     var color1_selected = document.createElement('selected');
     var color1_selected_a = document.createElement('a');
     var color1_selected_a_span = document.createElement('span');
     color1_selected_a_span.innerText = 'Color 1';
     color1_selected_a_span.style.fontSize = '12px';

     var color1_colordisplay = document.createElement('colordisplay');
     color1_colordisplay.setAttribute('id','bggc1cd');
     color1_colordisplay.addEventListener('click',function(){

     var colorpicker = document.getElementById('bggc1cp');

         if(colorpicker.style.display == 'block'){

             colorpicker.style.display = 'none';

         }else{

             colorpicker.style.display = 'block';

         }

     });

     var color1_colorpicker = document.createElement('div');
     color1_colorpicker.setAttribute('class','colorpicker');
     color1_colorpicker.setAttribute('id','bggc1cp');

     var color1_colorpicker_box = document.createElement('canvas');
     color1_colorpicker_box.setAttribute('class','colorpickerbox');
     color1_colorpicker_box.setAttribute('id','bggc1cpb');

     var color1_colorpicker_strip = document.createElement('canvas');
     color1_colorpicker_strip.setAttribute('class','colorpickerstrip');
     color1_colorpicker_strip.setAttribute('id','bggc1cps');

     var color1_colorpicker_input_rgba = document.createElement('input');
     color1_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
     color1_colorpicker_input_rgba.setAttribute('id','bggc1cprgba');
     color1_colorpicker_input_rgba.addEventListener('input',function(){
	   textToColorPickerColor(this,'backgroundGradient1',element);
     });

     var color1_colorpicker_input_hex = document.createElement('input');
     color1_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
     color1_colorpicker_input_hex.setAttribute('id','bggc1cphex');
     color1_colorpicker_input_hex.addEventListener('input',function(){
	   textToColorPickerColor(this,'backgroundGradient1',element);
     });

     color1_colorpicker.appendChild(color1_colorpicker_box);
     color1_colorpicker.appendChild(color1_colorpicker_strip);
     color1_colorpicker.appendChild(color1_colorpicker_input_rgba);
     color1_colorpicker.appendChild(color1_colorpicker_input_hex);
     color1_colorpicker.style.left = '200px';
     color1_colorpicker.style.top = '-100px';

     color1_selected_a.appendChild(color1_selected_a_span);
     color1_selected.appendChild(color1_selected_a);
     color1_selected.appendChild(color1_colordisplay);
     color1_selected.appendChild(color1_colorpicker);

     color1.appendChild(color1_selected);

     //-----End Color1------

     //------Color2-------

     var color2 = document.createElement('combobox');
     color2.setAttribute('id','c2');
     color2.style.left = '205px';
     color2.style.top = '60px';
     color2.style.zIndex = '4';
     color2.style.textAlign = 'Left';

     var color2_selected = document.createElement('selected');
     var color2_selected_a = document.createElement('a');
     var color2_selected_a_span = document.createElement('span');
     color2_selected_a_span.innerText = 'Color 2';
     color2_selected_a_span.style.fontSize = '12px';

     var color2_colordisplay = document.createElement('colordisplay');
     color2_colordisplay.setAttribute('id','bggc2cd');
     color2_colordisplay.addEventListener('click',function(){

     var colorpicker = document.getElementById('bggc2cp');

         if(colorpicker.style.display == 'block'){

             colorpicker.style.display = 'none';

         }else{

             colorpicker.style.display = 'block';

         }

     });

     var color2_colorpicker = document.createElement('div');
     color2_colorpicker.setAttribute('class','colorpicker');
     color2_colorpicker.setAttribute('id','bggc2cp');

     var color2_colorpicker_box = document.createElement('canvas');
     color2_colorpicker_box.setAttribute('class','colorpickerbox');
     color2_colorpicker_box.setAttribute('id','bggc2cpb');

     var color2_colorpicker_strip = document.createElement('canvas');
     color2_colorpicker_strip.setAttribute('class','colorpickerstrip');
     color2_colorpicker_strip.setAttribute('id','bggc2cps');

     var color2_colorpicker_input_rgba = document.createElement('input');
     color2_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
     color2_colorpicker_input_rgba.setAttribute('id','bggc2cprgba');
     color2_colorpicker_input_rgba.addEventListener('input',function(){
	   textToColorPickerColor(this,'backgroundGradient2',element);
     });

     var color2_colorpicker_input_hex = document.createElement('input');
     color2_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
     color2_colorpicker_input_hex.setAttribute('id','bggc2cphex');
     color2_colorpicker_input_hex.addEventListener('input',function(){
	   textToColorPickerColor(this,'backgroundGradient2',element);
     });

     color2_colorpicker.appendChild(color2_colorpicker_box);
     color2_colorpicker.appendChild(color2_colorpicker_strip);
     color2_colorpicker.appendChild(color2_colorpicker_input_rgba);
     color2_colorpicker.appendChild(color2_colorpicker_input_hex);
     color2_colorpicker.style.left = '200px';
     color2_colorpicker.style.top = '-130px';

     color2_selected_a.appendChild(color2_selected_a_span);
     color2_selected.appendChild(color2_selected_a);
     color2_selected.appendChild(color2_colordisplay);
     color2_selected.appendChild(color2_colorpicker);

     color2.appendChild(color2_selected);

     //-----End Color2------

    //-----End Background Gradient------

    //----------------Extras----------------------

    var margindiv = document.createElement('div');
    margindiv.setAttribute('class','box');
    margindiv.appendChild(marginleft);
    margindiv.appendChild(marginbottom);
    margindiv.appendChild(marginright);
    margindiv.appendChild(margintop);
    margindiv.style.height = '300px';

    var margindivbanner = document.createElement('banner');
    var margindivbannerh5 = document.createElement('h5');
    margindivbannerh5.innerText = 'Margin';
    margindivbanner.appendChild(margindivbannerh5);
    margindiv.appendChild(margindivbanner);

    var paddingdiv = document.createElement('div');
    paddingdiv.setAttribute('class','box');
    paddingdiv.appendChild(paddingleft);
    paddingdiv.appendChild(paddingbottom);
    paddingdiv.appendChild(paddingright);
    paddingdiv.appendChild(paddingtop);
    paddingdiv.style.height = '150px';
    paddingdiv.style.width = '625px';

    var paddingdivbanner = document.createElement('banner');
    var paddingdivbannerh5 = document.createElement('h5');
    paddingdivbannerh5.innerText = 'Padding';
    paddingdivbanner.appendChild(paddingdivbannerh5);
    paddingdiv.appendChild(paddingdivbanner);

    var letterspacediv = document.createElement('div');
    letterspacediv.setAttribute('class','box');
    letterspacediv.setAttribute('id','letterspacediv');
    letterspacediv.appendChild(letterspace);
    var letterspacedivbanner = document.createElement('banner');
    var letterspacedivbannerh5 = document.createElement('h5');
    letterspacedivbannerh5.innerText = 'Letter Space';
    letterspacedivbanner.appendChild(letterspacedivbannerh5);
    letterspacediv.appendChild(letterspacedivbanner);

    /*var fontcombinationsdiv = document.createElement('div');
    fontcombinationsdiv.setAttribute('class','box');
    fontcombinationsdiv.setAttribute('id','fontcombinationsdiv');
    fontcombinationsdiv.appendChild(fontcombinations);
    var fontcombinationsdivbanner = document.createElement('banner');
    var fontcombinationsdivbannerh5 = document.createElement('h5');
    fontcombinationsdivbannerh5.innerText = 'Font Combination';
    fontcombinationsdivbanner.appendChild(fontcombinationsdivbannerh5);
    fontcombinationsdiv.appendChild(fontcombinationsdivbanner);*/

    var googlefontssdiv = document.createElement('div');
    googlefontssdiv.style.overflow = 'unset';
    googlefontssdiv.style.zIndex = '5';
    googlefontssdiv.setAttribute('class','box');
    googlefontssdiv.setAttribute('id','googlefontssdiv');
    var googlefontssdivbanner = document.createElement('banner');
    var googlefontssdivbannerh5 = document.createElement('h5');
    googlefontssdivbannerh5.innerText = 'Google Fonts';
    googlefontssdivbanner.appendChild(googlefontssdivbannerh5);
    googlefontssdiv.appendChild(googlefontssdivbanner);

    var outlinediv = document.createElement('div');
    outlinediv.style.zIndex = '5';
    outlinediv.setAttribute('class','box');
    outlinediv.setAttribute('id','outlinediv');
    outlinediv.appendChild(outlinestyle);
    outlinediv.appendChild(outlinewidth);
    outlinediv.appendChild(outlinecolor);

    //------------------End Extras-------------------------

    var advancediv1 = document.createElement('div');
    advancediv1.setAttribute('id','advance_div1');

    var advancediv2 = document.createElement('div');
    advancediv2.setAttribute('class','box');
    advancediv2.setAttribute('id','bggradientdiv');
    var advancediv2_banner = document.createElement('banner');
    var advancediv2_bannerh5 = document.createElement('h5');
    advancediv2_bannerh5.innerText = 'Background Gradient';
    advancediv2_banner.appendChild(advancediv2_bannerh5);
    advancediv2.appendChild(advancediv2_banner);

    var advancediv2_ul_pseudotick = document.createElement('ul');
    advancediv2_ul_pseudotick.setAttribute('class','pstick');
    var advancediv2_li_pseudotick = document.createElement('li');
    advancediv2_li_pseudotick.addEventListener('click',function(){
        applybgg('preview'+element);
    });
    advancediv2_ul_pseudotick.appendChild(advancediv2_li_pseudotick);

    advancediv2.appendChild(advancediv2_ul_pseudotick);
    advancediv2.appendChild(endx);
    advancediv2.appendChild(endy);
    advancediv2.appendChild(color1);
    advancediv2.appendChild(color2);

    advancediv1.appendChild(backgroundimage_div);
    advancediv1.appendChild(textshadowdiv);
    advancediv1.appendChild(margindiv);
    advancediv1.appendChild(paddingdiv);

    advancediv.appendChild(advancediv1);
    advancediv.appendChild(advancediv2);
    advancediv.appendChild(letterspacediv);
    advancediv.appendChild(googlefontssdiv);
    advancediv.appendChild(outlinediv);

    setTimeout(function(){

    setupColorPicker('textscpb','textscps','preview'+element,'textshadowcolor','textscd','textscprgba','textscphex');
      setupColorPicker('bggc1cpb','bggc1cps','preview'+element,'backgroundgradient1','bggc1cd','bggc1cprgba','bggc1cphex');
      setupColorPicker('bggc2cpb','bggc2cps','preview'+element,'backgroundgradient2','bggc2cd','bggc2cprgba','bggc2cphex');
      setupColorPicker('ocpb','ocps','preview'+element,'outlinecolor','ocd','ocprgba','ocphex');


    },5000)

    //----------------Fade in timming------------------

    document.getElementsByClassName('spinner')[0].style.display = 'block';
    var panel = document.getElementById('panel');
    panel.style.opacity = '0.3';
    panel.style.pointerEvents = 'none';

    setTimeout(function(){

      $('#buttons').append(backbutton);
    $('#panel').append(advancediv);
    document.getElementsByClassName('spinner')[0].style.display = 'none';
    panel.style.opacity = '1';
    panel.style.pointerEvents = 'unset';

  },4000);

   }
}

function newelement(type){

var select = document.getElementById('selecttype');
select.style.width = '0px';

populateselection('true');

if(type == 'button'){
  var preview = document.createElement('button');
  preview.setAttribute('id','previewbutton');
  preview.innerText = 'Preview button';
  setEnv('button');
  elementtype = 'button';
}

if(type == 'div'){
  var preview = document.createElement('div');
  preview.setAttribute('id','previewdiv');
  preview.innerText = 'Preview Div';
  setEnv('div');
  elementtype = 'div';
}

if(type == 'input'){
  var preview = document.createElement('input');
  preview.setAttribute('id','previewinput');
  preview.setAttribute('value','Preview input');
  setEnv('input');
  elementtype = 'input';
}

if(type == 'paragraph'){
  var preview = document.createElement('p');
  preview.setAttribute('id','previewparagraph');
  preview.innerText = 'Preview paragraph...';
  setEnv('paragraph');
  elementtype = 'paragraph';
}

if(type == 'heading'){
  var preview = document.createElement('h3');
  preview.setAttribute('id','previewheading');
  preview.innerText = 'Preview heading';
  setEnv('heading');
  elementtype = 'heading';
}

if(type == 'textarea'){
  var preview = document.createElement('textarea');
  preview.setAttribute('id','previewtextarea');
  preview.innerText = 'Preview textarea...';
  setEnv('textarea');
  elementtype = 'textarea';
}

if(type == 'image'){
  var preview = document.createElement('img');
  preview.setAttribute('id','previewimage');
  setEnv('image');
  elementtype = 'image';
}

if(type == 'video'){
  var preview = document.createElement('video');
  preview.setAttribute('id','previewvideo');
  preview.setAttribute('controls','');
  setEnv('video');
  elementtype = 'video';
}


$('#previewbox').empty();
$('#previewbox').append(preview);

}

function setEnv(element){

$('#previewbox').empty();
$('#basicdiv').remove();
$('#rotatebox').remove();
$('#skewbox').remove();
$('#scalebox').remove();
$('#stepsdiv').remove();
$('#advance').remove();
$('#animate').remove();
$('giphy').remove();
$('.backbutton').remove();

$('.spinner').css('display','block');
$('#panel').css({'opacity':'0.3','pointer-events':'none'});
setTimeout(function(){

  basicSetup(element);
  $('.spinner').css('display','none');
  $('#panel').css({'opacity':'1','pointer-events':'unset'});

},5000);

}

function setupSteps(element){

var stepsdiv = document.createElement('div');
stepsdiv.setAttribute('id','stepsdiv');
stepsdiv.style.display = 'block';

stepsdiv_button_advance = document.createElement('button');
stepsdiv_button_advance.innerText = 'Advance';
stepsdiv_button_advance.addEventListener('click',function(){
  if($('#advance').length > 0){
        advance(element,'false');
    }else{
        advance(element,'true');
    }
});

if(plan !== 'Free'){

if(plan == 'Gold' || plan == 'Diamond' || plan == 'Silver'){

  stepsdiv_button_animate = document.createElement('button');
  stepsdiv_button_animate.innerText = 'Animate';
  stepsdiv_button_animate.addEventListener('click',function(){
      if($('#animate').length > 0){
          exF_animate(element,'false');
      }else{
          exF_animate(element,'true');
      }
  });

}

}

stepsdiv_button_finish = document.createElement('button');
stepsdiv_button_finish.innerText = 'Finish';
stepsdiv_button_finish.addEventListener('click',function(){
    finishWork(element);
});

stepsdiv.appendChild(stepsdiv_button_advance);

if(plan !== 'Free'){
  if(plan == 'Gold' || plan == 'Diamond' || plan == 'Silver'){
    stepsdiv.appendChild(stepsdiv_button_animate);
  }
}

stepsdiv.appendChild(stepsdiv_button_finish);
$('#panel').append(stepsdiv);

}

function dumpCSSText(element){
  var style = $(element).attr('style');
  return style;
}

function finishWork(element){

var panel = document.getElementById('panel');

var finishdiv = document.createElement('div')
finishdiv.setAttribute('id','finish');

var finishdiv_textarea_element = document.createElement('textarea');
var finishdiv_textarea_animation = document.createElement('textarea');
finishdiv_textarea_element.setAttribute('id','textareaE');
finishdiv_textarea_animation.setAttribute('id','textareaA');

finishdiv_textarea_element.setAttribute('readonly','');
finishdiv_textarea_animation.setAttribute('readonly','');

var textarea_element_p = document.createElement('p');
textarea_element_p.innerText = 'Style CSS:';
textarea_element_p.setAttribute('id','eH');

var textarea_animation_p = document.createElement('p');
textarea_animation_p.innerText = 'Animation CSS:';
textarea_animation_p.setAttribute('id','aH')

var savebutton = document.createElement('button');
var downloadtextfilebutton = document.createElement('button');
var cancelbutton = document.createElement('button');
savebutton.innerText = 'Save to storage';
downloadtextfilebutton.innerText = 'Download Stylesheet (.txt)';
cancelbutton.innerText = 'Cancel';
savebutton.setAttribute('id','savebutton');
downloadtextfilebutton.setAttribute('id','dltextbutton');
cancelbutton.setAttribute('id','cancelbutton');

var eName = document.createElement('input');
var aName = document.createElement('input');
eName.setAttribute('id','elementName');
eName.setAttribute('placeholder','Element Name');
aName.setAttribute('id','animationName');
aName.setAttribute('placeholder','Animation Name');

downloadtextfilebutton.addEventListener('click',function(){
  saveTextAsFile();
});

cancelbutton.addEventListener('click',function(){
  $("#finish").remove();
  $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton').css({'opacity':'1','pointer-events':'unset'});
});

savebutton.addEventListener('click',function(){

  if(finishdiv_textarea_element.value !== '' && finishdiv_textarea_animation.value !== ''){
    if(aName.value == '' && eName.value == null){
      notification('Error, please enter animation and element names.');
      return;
    }

    if(eName.value == '' || eName.value == null){
      notification('Error, please enter element name.');
      return;
    }

    if(aName.value == '' || aName.value == null){
      notification('Error, please enter animation name.');
      return;
    }

    if(aName.value !== '' || eName.value == ''){
      saveToStorage(element);
    }
  }

  if(finishdiv_textarea_element.value !== '' && finishdiv_textarea_animation.value == ''){
    if(eName.value !== ''){
      saveToStorage(element);
    }else{
      notification('Error, please enter element name.');
    }
  }

  if(finishdiv_textarea_animation.value !== '' && finishdiv_textarea_element.value == ''){
    if(aName.value !== ''){
      saveToStorage(element);
    }else{
      notification('Error, please enter animation name.');
    }
  }

});

finishdiv.appendChild(savebutton);
finishdiv.appendChild(downloadtextfilebutton);
finishdiv.appendChild(cancelbutton);

finishdiv.appendChild(eName);
finishdiv.appendChild(aName);

finishdiv.appendChild(textarea_element_p);
finishdiv.appendChild(finishdiv_textarea_element);
finishdiv.appendChild(textarea_animation_p);
finishdiv.appendChild(finishdiv_textarea_animation);

panel.appendChild(finishdiv);
$("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton, #animationName, #elementName').css({'opacity':'0.5','pointer-events':'none'});

//--------------------------------

var liner_reg = new RegExp("\\" + ';', "g");

var styles = {
  button:{default:'padding-right: 10px; padding-left: 10px; width: 150px; height: 40px; border: 0.5px solid black; outline: none; background-color: white; display: block; position: absolute; transform: translate(-50%,-50%); left: 50%; top: 50%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 25px;'},
  div:{default:'padding: 10px;width: 200px;height: 200px;border: 0.5px solid black;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;margin-top: 25px;overflow: hidden;'},
  input:{default:'padding: 10px;width: 200px;height: 40px;border: 0.5px solid black;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding-left: 10px;padding-right: 10px;margin-top: 25px;overflow: hidden;'},
  paragraph:{default:'padding: 10px;width: 200px;height: 40px;outline: none;background-color: white;display: block; position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding-left: 10px;padding-right: 10px;padding-bottom: 10px;font-family: sans-serif;margin-top: 25px;overflow: hidden;word-break: break-all;'},
  heading:{default:'padding: 10px;width: 200px;height: 40px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding-left: 10px;padding-right: 10px;font-family: sans-serif;font-weight: bold;margin-top: 25px;overflow: hidden;word-break: break-all;'},
  textarea:{default:'padding: 10px;width: 200px;height: 40px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding: 15px;font-family: sans-serif;font-weight: bold;border: 0.5px solid black;max-width: 150px;max-height: 80px;margin-top: 25px;overflow: hidden;'},
  image:{default:'padding: 10px;width: 200px;height: 200px;min-width: 200px;min-height: 200px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%); left: 50%;top: 50%;border: 0.5px solid black;margin-top: 25px;overflow: hidden;'},
  video:{default:'padding: 10px;width: 250px;height: 200px;min-width: 250px;min-height: 200px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;border: 0.5px solid black;margin-top: 25px;overflow: hidden;'},
}

var e = document.getElementById('preview'+element);
var css = dumpCSSText(e);
var defaultcss = styles[element].default;
var animationcss = '';

if(css.includes('background-color')){
    defaultcss = defaultcss.replace('background-color: white;','');
}

if(css.includes('padding-right')){
    defaultcss = defaultcss.replace('padding-right: 10px;','');
}

if(css.includes('padding-left')){
    defaultcss = defaultcss.replace('padding-left: 10px;','');
}

if(css.includes('padding-bottom')){
    defaultcss = defaultcss.replace('padding-bottom: 10px;','');
}

if(css.includes('padding:')){
    defaultcss = defaultcss.replace('padding: 10px;','');
}

if(css.includes('border')){
    defaultcss = defaultcss.replace('border: 0.5px solid black;','');
}

if(css.includes('outline')){
    defaultcss = defaultcss.replace('outline: none;','');
}

if(css.includes('display')){
    defaultcss = defaultcss.replace('display: block;','');
}

if(css.includes('transform')){
    defaultcss = defaultcss.replace('transform: translate(-50%,-50%);','');
}

if(css.includes('transform')){
    defaultcss = defaultcss.replace('transform: translate(-50%,-50%);','');
}

if(css.includes('whitespace')){
    defaultcss = defaultcss.replace('whitespace: nowrap;','');
}

if(css.includes('margin-top')){
    defaultcss = defaultcss.replace('margin-top: 25px;','');
}

if(css.includes('font-family')){
    defaultcss = defaultcss.replace('font-family: sans-serif;','');
}

if(css.includes('font-weight')){
    defaultcss = defaultcss.replace('font-weight: bold;','');
}

if(css.includes('animation-name')){
          var token = localStorage.getItem('auth');
          $.ajax({
              type: "GET",
              url: "http://localhost:8000/api/me/animations/"+e.style.animationName,
              beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/json');
              },
              success: setAnimationTextArea,
          });
}else{
  if(css.includes('animation:')){
    var animationAttribute = e.style.animation;

    if(animationAttribute.includes('preview')){
      var animation = document.getElementsByTagName('style')[0].innerText;
      animationcss =  animation;
      animationcss = animationcss.split('{').join('{\n');
      animationcss = animationcss.split('}').join('}\n');
      animationcss = animationcss.split(';').join(';\n');
      //animationcss = animationcss.split('@-webkit-keyframes preview{').join('\n \n@-webkit-keyframes preview{\n \n');
      animationcss = animationcss.split('@keyframes preview{').join('\n \n@keyframes preview{\n \n');
    }
  }
}

var css_array = stringToArray(css,';');
var default_array = stringToArray(defaultcss,';');

var combined_array = combineArrays(css_array,default_array);

var ff = e.style.fontFamily;
var ffinfo = [''];

if(ff !== 'sans' && ff !== 'sans-serif' && ff !== 'helvectia' && ff !== 'monospace' && ff !== 'cursive' && ff !== 'fantasy'){

  //console.log('started finding font.');
  for(var i=0; i < WebFonts.length; i++){

    var newfontfamiliy = WebFonts[i].family.replace(/ /g,"_");
    if(ff.length > newfontfamiliy.length){
       if(ff.includes(newfontfamiliy)){
         //console.log('found font');
         ffinfo =  WebFonts[i].family + ' : ' + JSON.stringify(WebFonts[i].files);
         break;
       }else{
         //console.log(newfontfamiliy + ' didnt include ff = ' + ff);
       }
    }

    if(ff.length < newfontfamiliy.length){
      if(newfontfamiliy.includes(ff)){
         //console.log('found font');
         ffinfo =  WebFonts[i].family + ' : ' + JSON.stringify(WebFonts[i].files);
         break;
       }else{
         //console.log(newfontfamiliy + ' didnt include ff = ' + ff);
       }
    }
  }

}

combined_array = combined_array.filter(function(str) {
    return /\S/.test(str);
});

combined_array = combined_array.map(function (el) {
  return el.trim();
});



if(animationcss !== ''){
  document.getElementById('textareaE').value = '.' + element + ' { ' + '\n' + '\n' + combined_array.join(';\n') + '\n' + '}' + "\n \n \n \n Google fonts used: \n \n" + ffinfo;
  document.getElementById('textareaA').value = animationcss;
}else{
  document.getElementById('textareaE').value = '.' + element + ' { ' + '\n' + '\n' + combined_array.join(';\n') + '\n' + '}' + "\n \n \n \n Google fonts used: \n \n" + ffinfo;
}

//console.log(combined_array);


}

function setAnimationTextArea(response){
  document.getElementById('textareaA').value = response.css;
}

function countMatchingCharacters(string1,string2){
  var string1_characters = [];
  var string2_characters = [];
  var matchedcharacters = [];
  var unmatchedcharacters = [];

  for(var i = 0; i < string1.length; i++){
    string1_characters.push(string1.charAt(i));
  }

  for(var i2 = 0; i2 < string2.length; i2++){
    string2_characters.push(string2.charAt(i2));
  }

  var totallength = string1_characters.length + string2_characters.length;

  if(string1_characters.length > string2_characters.length){
    for(var o=0; o < string1_characters.length; o++){
      if(string1_characters.includes(string2_characters[o])){
        if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[o] == null){

        }else{
          matchedcharacters.push(string2_characters[o]);
        }
      }
      else{
        if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[o] == null){

        }else{
          unmatchedcharacters.push(string2_characters[o]);
        }
      }
    }
  }

  if(string2_characters.length > string1_characters.length){
    for(var o=0; o < string2_characters.length; o++){
      if(string2_characters.includes(string1_characters[o])){
        if(string1_characters[o] == '' || string1_characters[o] == ' ' || string1_characters[o] == null){

        }else{
          matchedcharacters.push(string1_characters[o]);
        }
      }
      else{
        if(string1_characters[o] == '' || string1_characters[o] == ' ' || string1_characters[o] == null){

        }else{
          unmatchedcharacters.push(string1_characters[o]);
        }
      }
    }
  }

  if(string1_characters.length === string2_characters.length){
    for(var o=0; o < string1_characters.length; o++){
       if(string1_characters.includes(string2_characters[o])){
        if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[0] == null){

        }else{
          matchedcharacters.push(string2_characters[o]);
        }
      }
      else{
        if(string2_characters[o] == '' || string2_characters[o] == ' ' || string2_characters[0] == null){

        }else{
          unmatchedcharacters.push(string2_characters[o]);
        }
      }
    }
  }

  matchedcharacters.join('').split('');
  var matchingPercentage = percentage(matchedcharacters.length,totallength);
  //console.log(matchedcharacters + ' & ' + totallength + ' = ' + matchingPercentage);

  if(matchingPercentage > 40){
    //console.log(matchedcharacters + ' > ' + unmatchedcharacters + ' = ' + matchingPercentage + '% Acurate Match.');
    return true;//more matches than half characters.
  }

  if(matchingPercentage < 40){
    //console.log(matchedcharacters + ' < ' + unmatchedcharacters + ' = ' + matchingPercentage + '% Acurate Match.');
    return false;//less matches than half characters.
  }

}

function replaceAllInString(str, find) {
    return str.replace(new RegExp('/'+find+"^\S+/", 'g'), '');
}

function combineArrays(array1,array2){

var array = [''];

for(var i=0; i < array1.length; i++){
  array.push(array1[i]);
}

for(var o=0; o < array2.length; o++){
  array.push(array2[o]);
}

return array;

}

function percentage(number,total){
  return (number * 100) / total;
}

function stringToArray(string,splitCharacter){

var array = [''];
var splits = string.split(splitCharacter);

for(var i=0; i < splits.length; i++){
  array.push(splits[i]);
}

return array;

}

function setupScale(element){

var scalebox = document.createElement('div');
scalebox.setAttribute('id','scalebox');
scalebox.style.display = 'block';

var scaleboxdiv_x = document.createElement('div');
var scaleboxdiv_x_p = document.createElement('p');
scaleboxdiv_x_p.innerText = 'x-axis';
scaleboxdiv_x.appendChild(scaleboxdiv_x_p);
scaleboxdiv_x.style.marginTop = '15px';

var scaleboxdiv_y = document.createElement('div');
var scaleboxdiv_y_p = document.createElement('p');
scaleboxdiv_y_p.innerText = 'y-axis';
scaleboxdiv_y.appendChild(scaleboxdiv_y_p);

var scaleboxbanner = document.createElement('banner');
scaleboxbannertext = document.createElement('h5');
scaleboxbannertext.innerText = 'Scale';
scaleboxbanner.appendChild(scaleboxbannertext);
scalebox.appendChild(scaleboxbanner);

scalebox_slider_x = document.createElement('input');
scalebox_slider_x.setAttribute('type','range');
scalebox_slider_x.setAttribute('class','slider');
scalebox_slider_x.setAttribute('min','1');
scalebox_slider_x.setAttribute('max','10');
scalebox_slider_x.setAttribute('step','0.1');
scalebox_slider_x.setAttribute('value','1');
scaleboxdiv_x.appendChild(scalebox_slider_x);

scalebox_slider_y = document.createElement('input');
scalebox_slider_y.setAttribute('type','range');
scalebox_slider_y.setAttribute('class','slider');
scalebox_slider_y.setAttribute('min','1');
scalebox_slider_y.setAttribute('max','10');
scalebox_slider_y.setAttribute('step','0.1');
scalebox_slider_y.setAttribute('value','1');
scaleboxdiv_y.appendChild(scalebox_slider_y);

scalebox_slider_x.addEventListener('input',function(){

  updateelement(element,'scaleX',this.value);

});

scalebox_slider_y.addEventListener('input',function(){

  updateelement(element,'scaleY',this.value);

});

scalebox.appendChild(scaleboxdiv_x);
scalebox.appendChild(scaleboxdiv_y);
$('#panel').append(scalebox);

}

function setupSkew(element){

var skewbox = document.createElement('div');
skewbox.setAttribute('id','skewbox');
skewbox.style.display = 'block';

var skewboxdiv_x = document.createElement('div');
var skewboxdiv_x_p = document.createElement('p');
skewboxdiv_x_p.innerText = 'x-axis';
skewboxdiv_x.appendChild(skewboxdiv_x_p);
skewboxdiv_x.style.marginTop = '15px';

var skewboxdiv_y = document.createElement('div');
var skewboxdiv_y_p = document.createElement('p');
skewboxdiv_y_p.innerText = 'y-axis';
skewboxdiv_y.appendChild(skewboxdiv_y_p);

var skewboxbanner = document.createElement('banner');
skewboxbannertext = document.createElement('h5');
skewboxbannertext.innerText = 'Skew';
skewboxbanner.appendChild(skewboxbannertext);
skewbox.appendChild(skewboxbanner);

skewbox_slider_x = document.createElement('input');
skewbox_slider_x.setAttribute('type','range');
skewbox_slider_x.setAttribute('class','slider');
skewbox_slider_x.setAttribute('min','0');
skewbox_slider_x.setAttribute('max','180');
skewbox_slider_x.setAttribute('step','1');
skewbox_slider_x.setAttribute('value','0');
skewboxdiv_x.appendChild(skewbox_slider_x);

skewbox_slider_y = document.createElement('input');
skewbox_slider_y.setAttribute('type','range');
skewbox_slider_y.setAttribute('class','slider');
skewbox_slider_y.setAttribute('min','0');
skewbox_slider_y.setAttribute('max','180');
skewbox_slider_y.setAttribute('step','1');
skewbox_slider_y.setAttribute('value','0');
skewboxdiv_y.appendChild(skewbox_slider_y);

skewbox_slider_x.addEventListener('input',function(){

  updateelement(element,'skewX',this.value);

});

skewbox_slider_y.addEventListener('input',function(){

  updateelement(element,'skewY',this.value);

});

skewbox.appendChild(skewboxdiv_x);
skewbox.appendChild(skewboxdiv_y);
$('#panel').append(skewbox);

}

function setupRotate(element){

var rotatebox = document.createElement('div');
rotatebox.setAttribute('id','rotatebox');
rotatebox.style.display = 'block';

var rotateboxdiv_x = document.createElement('div');
var rotateboxdiv_x_p = document.createElement('p');
rotateboxdiv_x_p.innerText = 'x-axis';
rotateboxdiv_x.appendChild(rotateboxdiv_x_p);
rotateboxdiv_x.style.marginTop = '15px';

var rotateboxdiv_y = document.createElement('div');
var rotateboxdiv_y_p = document.createElement('p');
rotateboxdiv_y_p.innerText = 'y-axis';
rotateboxdiv_y.appendChild(rotateboxdiv_y_p);

var rotateboxbanner = document.createElement('banner');
rotateboxbannertext = document.createElement('h5');
rotateboxbannertext.innerText = 'Rotate';
rotateboxbanner.appendChild(rotateboxbannertext);
rotatebox.appendChild(rotateboxbanner);

rotatebox_slider_x = document.createElement('input');
rotatebox_slider_x.setAttribute('type','range');
rotatebox_slider_x.setAttribute('class','slider');
rotatebox_slider_x.setAttribute('min','0');
rotatebox_slider_x.setAttribute('max','180');
rotatebox_slider_x.setAttribute('step','1');
rotatebox_slider_x.setAttribute('value','0');
rotateboxdiv_x.appendChild(rotatebox_slider_x);

rotatebox_slider_y = document.createElement('input');
rotatebox_slider_y.setAttribute('type','range');
rotatebox_slider_y.setAttribute('class','slider');
rotatebox_slider_y.setAttribute('min','0');
rotatebox_slider_y.setAttribute('max','180');
rotatebox_slider_y.setAttribute('step','1');
rotatebox_slider_y.setAttribute('value','0');
rotateboxdiv_y.appendChild(rotatebox_slider_y);

rotatebox_slider_x.addEventListener('input',function(){

  updateelement(element,'rotateX',this.value);

});

rotatebox_slider_y.addEventListener('input',function(){

  updateelement(element,'rotateY',this.value);

});

rotatebox.appendChild(rotateboxdiv_x);
rotatebox.appendChild(rotateboxdiv_y);
$('#panel').append(rotatebox);

}

function basicSetup(element){

var previewbox = document.getElementById('previewbox');
previewbox.style.display = 'block';

// ---------------------- Edit Buttons -----------------------

var editbuttons = document.createElement('div');
editbuttons.setAttribute('class','eb');

if(element == 'video' || element == 'image'){

var editbutton_src = document.createElement('label');
editbutton_src.addEventListener('click',function(){
  document.getElementsByClassName('sourcechangediv')[0].style.display = 'block';
});
editbutton_src.innerText = 'Src';

var changesourcediv = document.createElement('div');
changesourcediv.classList.add('sourcechangediv');

var changesourcediv_input = document.createElement('input');
changesourcediv_input.classList.add('input');
changesourcediv_input.setAttribute('placeholder',"Enter "+element+" source here");
changesourcediv_input.addEventListener('keyup',function(){

  var ele = document.getElementById('preview'+element);
  ele.setAttribute('src',this.value);

});

var changesource_ul = document.createElement('ul');
var changesource_li = document.createElement('li');
changesource_li.addEventListener('click',function(){
  changesourcediv.style.display = 'none';
});
changesource_ul.appendChild(changesource_li);

changesourcediv.appendChild(changesourcediv_input);
changesourcediv.appendChild(changesource_ul);

previewbox.appendChild(changesourcediv);
editbuttons.appendChild(editbutton_src);

}else{

var editbutton_text = document.createElement('label');
editbutton_text.addEventListener('click',function(){
  document.getElementsByClassName('textchangediv')[0].style.display = 'block';
});
editbutton_text.innerText = 'Text';

var changetextdiv = document.createElement('div');
changetextdiv.classList.add('textchangediv');

var changetext_input = document.createElement('input');
changetext_input.classList.add('input');
changetext_input.setAttribute('placeholder',"Enter text here");
changetext_input.addEventListener('keyup',function(){
  var ele = document.getElementById('preview'+element);

  if(this.value == ''){

    if(element == 'input'){
      ele.value = 'Preview '+element;
    }else{
      ele.innerText = 'Preview '+element;
    }

  }else{

    if(element == 'input'){
      ele.value = this.value;
    }else{
      ele.innerText = this.value;
    }

  }

});

var changetext_ul = document.createElement('ul');
var changetext_li = document.createElement('li');
changetext_li.addEventListener('click',function(){
  changetextdiv.style.display = 'none';
});
changetext_ul.appendChild(changetext_li);

changetextdiv.appendChild(changetext_input);
changetextdiv.appendChild(changetext_ul);

previewbox.appendChild(changetextdiv);
editbuttons.appendChild(editbutton_text);

}

var editbutton_shape = document.createElement('label');
editbutton_shape.addEventListener('click',function(){

  document.getElementsByClassName('shapechangediv')[0].style.display = 'block';
  document.getElementsByClassName('spinner')[0].style.display = 'block';

  setTimeout(function(){
    document.getElementsByClassName('shapechangediv')[0].style.opacity = '1';
    document.getElementsByClassName('spinner')[0].style.display = 'none';
  },500);

});
editbutton_shape.innerText = 'Shape';

var changeshapediv = document.createElement('div');
changeshapediv.classList.add('shapechangediv');

var changeshapediv_ul = document.createElement('ul');

var changeshapediv_ul_square = document.createElement('li');
changeshapediv_ul_square.innerText = 'Square';
changeshapediv_ul_square.addEventListener('click',function(){
  shape(element,'square');
});

var changeshapediv_ul_rectangle = document.createElement('li');
changeshapediv_ul_rectangle.innerText = 'Rectangle';
changeshapediv_ul_rectangle.addEventListener('click',function(){
  shape(element,'rectangle');
});

var changeshapediv_ul_circle = document.createElement('li');
changeshapediv_ul_circle.innerText = 'Circle';
changeshapediv_ul_circle.addEventListener('click',function(){
  shape(element,'circle');
});

var changeshapediv_ul_oval = document.createElement('li');
changeshapediv_ul_oval.innerText = 'Oval';
changeshapediv_ul_oval.addEventListener('click',function(){
  shape(element,'oval');
});

var changeshapediv_ul_trapezoid = document.createElement('li');
changeshapediv_ul_trapezoid.innerText = 'Trapezoid';
changeshapediv_ul_trapezoid.addEventListener('click',function(){
  shape(element,'trapezoid');
});

var changeshapediv_ul_parallelogram = document.createElement('li');
changeshapediv_ul_parallelogram.innerText = 'Parallelogram';
changeshapediv_ul_parallelogram.addEventListener('click',function(){
  shape(element,'parallelogram');
});

var changeshapediv_ul_triangle = document.createElement('li');
changeshapediv_ul_triangle.innerText = 'Triangle';
changeshapediv_ul_triangle.addEventListener('click',function(){
  shape(element,'triangle');
});

var changeshapediv_ul_warning = document.createElement('li');
changeshapediv_ul_warning.innerText = 'Some styling properties might get reversed after changing the shape.';

changeshapediv_ul.appendChild(changeshapediv_ul_square);
changeshapediv_ul.appendChild(changeshapediv_ul_rectangle);
changeshapediv_ul.appendChild(changeshapediv_ul_circle);
changeshapediv_ul.appendChild(changeshapediv_ul_oval);
changeshapediv_ul.appendChild(changeshapediv_ul_parallelogram);

if(element == 'div' || element == 'button'){
  changeshapediv_ul.appendChild(changeshapediv_ul_triangle);
}

if(element == 'div'){
  changeshapediv_ul.appendChild(changeshapediv_ul_trapezoid);
}

changeshapediv_ul.appendChild(changeshapediv_ul_warning);
changeshapediv.appendChild(changeshapediv_ul);

previewbox.appendChild(changeshapediv);
editbuttons.appendChild(editbutton_shape);

//-------------------Edit Buttons End---------------------

var previewboxbanner = document.createElement('banner');
previewboxbannertext = document.createElement('h5');
previewboxbannertext.innerText = 'Preview';
previewboxbanner.appendChild(previewboxbannertext);
previewbox.appendChild(previewboxbanner);

var basicdivbanner = document.createElement('banner');
basicdivbannertext = document.createElement('h5');
basicdivbannertext.innerText = 'Basic';
basicdivbanner.appendChild(basicdivbannertext);

var basicdiv = document.createElement('div');
basicdiv.setAttribute('id','basicdiv');
basicdiv.appendChild(basicdivbanner);

//-------FontSize--------

var fontsize = document.createElement('combobox');
fontsize.setAttribute('id','fontsize');
fontsize.style.left = '10px';

var fontsize_customedit = document.createElement('input');
fontsize_customedit.classList.add('custom');

var fontsize_selected = document.createElement('selected');
var fontsize_selected_a = document.createElement('a');
var fontsize_selected_a_span = document.createElement('span');
fontsize_selected_a_span.innerText = 'Font Size';

var fontsize_options = document.createElement('options');
var fontsize_options_ul = document.createElement('ul');

//------------------FontSize Options--------------------
//-------------------------1----------------------------

var fontsize_options_1 = document.createElement('li');

var fontsize_options_1_a = document.createElement('a');
fontsize_options_1_a.innerText = '8px';

var fontsize_options_1_a_span = document.createElement('span');
fontsize_options_1_a_span.innerText = '8';
fontsize_options_1_a_span.setAttribute('class','value');

fontsize_options_1_a.appendChild(fontsize_options_1_a_span);
fontsize_options_1.appendChild(fontsize_options_1_a);

fontsize_options_1.addEventListener('click',function(){
  tb(element,'fs',fontsize_options_1_a.innerText);
});

//-------------------------2----------------------------

var fontsize_options_2 = document.createElement('li');
var fontsize_options_2_a = document.createElement('a');
fontsize_options_2_a.innerText = '12px';

var fontsize_options_2_a_span = document.createElement('span');
fontsize_options_2_a_span.innerText = '12';
fontsize_options_2_a_span.setAttribute('class','value');

fontsize_options_2_a.appendChild(fontsize_options_2_a_span);
fontsize_options_2.appendChild(fontsize_options_2_a);

fontsize_options_2.addEventListener('click',function(){
  tb(element,'fs',fontsize_options_2_a.innerText);
});

//-------------------------3----------------------------

var fontsize_options_3 = document.createElement('li');
var fontsize_options_3_a = document.createElement('a');
fontsize_options_3_a.classList.add('lastoption');
fontsize_options_3_a.innerText = '16px';

var fontsize_options_3_a_span = document.createElement('span');
fontsize_options_3_a_span.innerText = '16';
fontsize_options_3_a_span.setAttribute('class','value');

fontsize_options_3_a.appendChild(fontsize_options_3_a_span);
fontsize_options_3.appendChild(fontsize_options_3_a);

fontsize_options_3.addEventListener('click',function(){
  tb(element,'fs',fontsize_options_3_a.innerText);
});

//---------------FontSize Options End---------------------

fontsize_selected_a.appendChild(fontsize_selected_a_span);
fontsize_selected.appendChild(fontsize_selected_a);
fontsize_selected.appendChild(fontsize_customedit);

fontsize_options_ul.appendChild(fontsize_options_1);
fontsize_options_ul.appendChild(fontsize_options_2);
fontsize_options_ul.appendChild(fontsize_options_3);

fontsize_options.appendChild(fontsize_options_ul);

fontsize.appendChild(fontsize_selected);
fontsize.appendChild(fontsize_options);

//-----------------Event Handlers--------------------

fontsize_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(fontsize_options.style.display == 'block'){

    fontsize_options.style.display = 'none';
      fontsize_options_ul.style.display = 'none';
      fontsize_customedit.style.display = 'none';
      fontsize_selected_a_span.style.textAlign = '';

  }else{

    fontsize_options.style.display = 'block';
      fontsize_options_ul.style.display = 'block';
      fontsize_customedit.style.display = 'block';
      fontsize_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

});

fontsize_customedit.addEventListener('keyup',function(){
  fontsize_selected_a_span.innerText = 'Font Size: ' + this.value+'px';
  updateelement(element,'fontsize',this.value+'px');
});

//-------End FontSize--------

//------FontFamily-------

var fontfamily = document.createElement('combobox');
fontfamily.setAttribute('id','fontfamily');
fontfamily.style.left = '200px';

var fontfamily_selected = document.createElement('selected');
var fontfamily_selected_a = document.createElement('a');
var fontfamily_selected_a_span = document.createElement('span');
fontfamily_selected_a_span.innerText = 'Font Family';

var fontfamily_options = document.createElement('options');
var fontfamily_options_ul = document.createElement('ul');

//------------------FontFamily Options--------------------
//-------------------------1----------------------------

var fontfamily_options_1 = document.createElement('li');

var fontfamily_options_1_a = document.createElement('a');
fontfamily_options_1_a.innerText = 'Sans';
fontfamily_options_1_a.style.fontFamily = 'Sans';

var fontfamily_options_1_a_span = document.createElement('span');
fontfamily_options_1_a_span.innerText = 'Sans';
fontfamily_options_1_a_span.setAttribute('class','value');

fontfamily_options_1_a.appendChild(fontfamily_options_1_a_span);
fontfamily_options_1.appendChild(fontfamily_options_1_a);

fontfamily_options_1.addEventListener('click',function(){
  tb(element,'ff',fontfamily_options_1_a.innerText);
});

//-------------------------2----------------------------

var fontfamily_options_2 = document.createElement('li');
var fontfamily_options_2_a = document.createElement('a');
fontfamily_options_2_a.innerText = 'Sans-Serif';
fontfamily_options_2_a.style.fontFamily = 'Sans-Serif';

var fontfamily_options_2_a_span = document.createElement('span');
fontfamily_options_2_a_span.innerText = 'Sans-Serif';
fontfamily_options_2_a_span.setAttribute('class','value');

fontfamily_options_2_a.appendChild(fontfamily_options_2_a_span);
fontfamily_options_2.appendChild(fontfamily_options_2_a);

fontfamily_options_2.addEventListener('click',function(){
  tb(element,'ff',fontfamily_options_2_a.innerText);
});

//-------------------------3----------------------------

var fontfamily_options_3 = document.createElement('li');
var fontfamily_options_3_a = document.createElement('a');
fontfamily_options_3_a.innerText = 'Helvectia';
fontfamily_options_3_a.style.fontFamily = 'Helvectia';

var fontfamily_options_3_a_span = document.createElement('span');
fontfamily_options_3_a_span.innerText = 'Helvectia';
fontfamily_options_3_a_span.setAttribute('class','value');

fontfamily_options_3_a.appendChild(fontfamily_options_3_a_span);
fontfamily_options_3.appendChild(fontfamily_options_3_a);

fontfamily_options_3.addEventListener('click',function(){
  tb(element,'ff',fontfamily_options_3_a.innerText);
});

//-------------------------4----------------------------

var fontfamily_options_4 = document.createElement('li');
var fontfamily_options_4_a = document.createElement('a');
fontfamily_options_4_a.innerText = 'Monospace';
fontfamily_options_4_a.style.fontFamily = 'Monospace';

var fontfamily_options_4_a_span = document.createElement('span');
fontfamily_options_4_a_span.innerText = 'Monospace';
fontfamily_options_4_a_span.setAttribute('class','value');

fontfamily_options_4_a.appendChild(fontfamily_options_4_a_span);
fontfamily_options_4.appendChild(fontfamily_options_4_a);

fontfamily_options_4.addEventListener('click',function(){
  tb(element,'ff',fontfamily_options_4_a.innerText);
});

//-------------------------5----------------------------

var fontfamily_options_5 = document.createElement('li');
var fontfamily_options_5_a = document.createElement('a');
fontfamily_options_5_a.innerText = 'Cursive';
fontfamily_options_5_a.style.fontFamily = 'Cursive';

var fontfamily_options_5_a_span = document.createElement('span');
fontfamily_options_5_a_span.innerText = 'Cursive';
fontfamily_options_5_a_span.setAttribute('class','value');

fontfamily_options_5_a.appendChild(fontfamily_options_5_a_span);
fontfamily_options_5.appendChild(fontfamily_options_5_a);

fontfamily_options_5.addEventListener('click',function(){
  tb(element,element,'ff',fontfamily_options_5_a.innerText);
});

//-------------------------6----------------------------

var fontfamily_options_6 = document.createElement('li');
var fontfamily_options_6_a = document.createElement('a');
fontfamily_options_6_a.classList.add('lastoption');
fontfamily_options_6_a.innerText = 'Fantasy';
fontfamily_options_6_a.style.fontFamily = 'Fantasy';

var fontfamily_options_6_a_span = document.createElement('span');
fontfamily_options_6_a_span.innerText = 'Fantasy';
fontfamily_options_6_a_span.setAttribute('class','value');

fontfamily_options_6_a.appendChild(fontfamily_options_6_a_span);
fontfamily_options_6.appendChild(fontfamily_options_6_a);

fontfamily_options_6.addEventListener('click',function(){
  tb(element,'ff',fontfamily_options_6_a.innerText);
});

//---------------FontFamily Options End---------------------

fontfamily_selected_a.appendChild(fontfamily_selected_a_span);
fontfamily_selected.appendChild(fontfamily_selected_a);

fontfamily_options_ul.appendChild(fontfamily_options_1);
fontfamily_options_ul.appendChild(fontfamily_options_2);
fontfamily_options_ul.appendChild(fontfamily_options_3);
fontfamily_options_ul.appendChild(fontfamily_options_4);
fontfamily_options_ul.appendChild(fontfamily_options_5);
fontfamily_options_ul.appendChild(fontfamily_options_6);

fontfamily_options.appendChild(fontfamily_options_ul);

fontfamily.appendChild(fontfamily_selected);
fontfamily.appendChild(fontfamily_options);

//-----------------Event Handlers--------------------

fontfamily_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(fontfamily_options.style.display == 'block'){

    fontfamily_options.style.display = 'none';
      fontfamily_options_ul.style.display = 'none';

  }else{

    fontfamily_options.style.display = 'block';
      fontfamily_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End FontFamily------

//------FontWeight-------

var fontweight = document.createElement('combobox');
fontweight.setAttribute('id','fontweight');
fontweight.style.left = '390px';

var fontweight_selected = document.createElement('selected');
var fontweight_selected_a = document.createElement('a');
var fontweight_selected_a_span = document.createElement('span');
fontweight_selected_a_span.innerText = 'Font Weight';

var fontweight_options = document.createElement('options');
var fontweight_options_ul = document.createElement('ul');

//------------------FontWeight Options--------------------
//-------------------------1----------------------------

var fontweight_options_1 = document.createElement('li');
var fontweight_options_1_a = document.createElement('a');
fontweight_options_1_a.innerText = 'Normal';
fontweight_options_1_a.style.fontWeight = 'Normal';

var fontweight_options_1_a_span = document.createElement('span');
fontweight_options_1_a_span.innerText = 'Normal';
fontweight_options_1_a_span.setAttribute('class','value');

fontweight_options_1_a.appendChild(fontweight_options_1_a_span);
fontweight_options_1.appendChild(fontweight_options_1_a);

fontweight_options_1.addEventListener('click',function(){
  tb(element,'fw',fontweight_options_1_a.innerText);
});

//-------------------------2----------------------------

var fontweight_options_2 = document.createElement('li');
var fontweight_options_2_a = document.createElement('a');
fontweight_options_2_a.classList.add('lastoption');
fontweight_options_2_a.innerText = 'Bold';
fontweight_options_2_a.style.fontWeight = 'Bold';

var fontweight_options_2_a_span = document.createElement('span');
fontweight_options_2_a_span.innerText = 'Bold';
fontweight_options_2_a_span.setAttribute('class','value');

fontweight_options_2_a.appendChild(fontweight_options_2_a_span);
fontweight_options_2.appendChild(fontweight_options_2_a);

fontweight_options_2.addEventListener('click',function(){
  tb(element,'fw',fontweight_options_2_a.innerText);
});


//---------------FontWeight Options End---------------------

fontweight_selected_a.appendChild(fontweight_selected_a_span);
fontweight_selected.appendChild(fontweight_selected_a);

fontweight_options_ul.appendChild(fontweight_options_1);
fontweight_options_ul.appendChild(fontweight_options_2);

fontweight_options.appendChild(fontweight_options_ul);

fontweight.appendChild(fontweight_selected);
fontweight.appendChild(fontweight_options);

//-----------------Event Handlers--------------------

fontweight_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(fontweight_options.style.display == 'block'){

    fontweight_options.style.display = 'none';
      fontweight_options_ul.style.display = 'none';

  }else{

    fontweight_options.style.display = 'block';
      fontweight_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End FontWeight------

//------FontStyle-------

var fontstyle = document.createElement('combobox');
fontstyle.setAttribute('id','fontstyle');
fontstyle.style.left = '580px';

var fontstyle_selected = document.createElement('selected');
var fontstyle_selected_a = document.createElement('a');
var fontstyle_selected_a_span = document.createElement('span');
fontstyle_selected_a_span.innerText = 'Font Style';

var fontstyle_options = document.createElement('options');
var fontstyle_options_ul = document.createElement('ul');

//------------------FontStyle Options--------------------
//-------------------------1----------------------------

var fontstyle_options_1 = document.createElement('li');
var fontstyle_options_1_a = document.createElement('a');
fontstyle_options_1_a.innerText = 'Normal';
fontstyle_options_1_a.style.fontStyle = 'Normal';

var fontstyle_options_1_a_span = document.createElement('span');
fontstyle_options_1_a_span.innerText = 'Normal';
fontstyle_options_1_a_span.setAttribute('class','value');

fontstyle_options_1_a.appendChild(fontstyle_options_1_a_span);
fontstyle_options_1.appendChild(fontstyle_options_1_a);

fontstyle_options_1.addEventListener('click',function(){
  tb(element,'fst',fontstyle_options_1_a.innerText);
});

//-------------------------2----------------------------

var fontstyle_options_2 = document.createElement('li');
var fontstyle_options_2_a = document.createElement('a');
fontstyle_options_2_a.classList.add('lastoption');
fontstyle_options_2_a.innerText = 'Italic';
fontstyle_options_2_a.style.fontStyle = 'Italic';

var fontstyle_options_2_a_span = document.createElement('span');
fontstyle_options_2_a_span.innerText = 'Italic';
fontstyle_options_2_a_span.setAttribute('class','value');

fontstyle_options_2_a.appendChild(fontstyle_options_2_a_span);
fontstyle_options_2.appendChild(fontstyle_options_2_a);

fontstyle_options_2.addEventListener('click',function(){
  tb(element,'fst',fontstyle_options_2_a.innerText);
});


//---------------FontStyle Options End---------------------

fontstyle_selected_a.appendChild(fontstyle_selected_a_span);
fontstyle_selected.appendChild(fontstyle_selected_a);

fontstyle_options_ul.appendChild(fontstyle_options_1);
fontstyle_options_ul.appendChild(fontstyle_options_2);

fontstyle_options.appendChild(fontstyle_options_ul);

fontstyle.appendChild(fontstyle_selected);
fontstyle.appendChild(fontstyle_options);

//-----------------Event Handlers--------------------

fontstyle_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(fontstyle_options.style.display == 'block'){

    fontstyle_options.style.display = 'none';
      fontstyle_options_ul.style.display = 'none';

  }else{

    fontstyle_options.style.display = 'block';
      fontstyle_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End FontStyle------

//------FontVariant-------

var fontvariant = document.createElement('combobox');
fontvariant.setAttribute('id','fontvariant');
fontvariant.style.left = '770px';

var fontvariant_selected = document.createElement('selected');
var fontvariant_selected_a = document.createElement('a');
var fontvariant_selected_a_span = document.createElement('span');
fontvariant_selected_a_span.innerText = 'Font Variant';

var fontvariant_options = document.createElement('options');
var fontvariant_options_ul = document.createElement('ul');

//------------------FontVariant Options--------------------
//-------------------------1----------------------------

var fontvariant_options_1 = document.createElement('li');
var fontvariant_options_1_a = document.createElement('a');
fontvariant_options_1_a.innerText = 'Normal';
fontvariant_options_1_a.style.fontVariant = 'Normal';

var fontvariant_options_1_a_span = document.createElement('span');
fontvariant_options_1_a_span.innerText = 'Normal';
fontvariant_options_1_a_span.setAttribute('class','value');

fontvariant_options_1_a.appendChild(fontvariant_options_1_a_span);
fontvariant_options_1.appendChild(fontvariant_options_1_a);

fontvariant_options_1.addEventListener('click',function(){
  tb(element,'fv',fontvariant_options_1_a.innerText);
});

//-------------------------2----------------------------

var fontvariant_options_2 = document.createElement('li');
var fontvariant_options_2_a = document.createElement('a');
fontvariant_options_2_a.innerText = 'Small-Caps';
fontvariant_options_2_a.style.fontVariant = 'Small-Caps';
fontvariant_options_2_a.classList.add('lastoption');

var fontvariant_options_2_a_span = document.createElement('span');
fontvariant_options_2_a_span.innerText = 'Small-Caps';
fontvariant_options_2_a_span.setAttribute('class','value');

fontvariant_options_2_a.appendChild(fontvariant_options_2_a_span);
fontvariant_options_2.appendChild(fontvariant_options_2_a);

fontvariant_options_2.addEventListener('click',function(){
  tb(element,'fv',fontvariant_options_2_a.innerText);
});


//---------------FontVariant Options End---------------------

fontvariant_selected_a.appendChild(fontvariant_selected_a_span);
fontvariant_selected.appendChild(fontvariant_selected_a);

fontvariant_options_ul.appendChild(fontvariant_options_1);
fontvariant_options_ul.appendChild(fontvariant_options_2);

fontvariant_options.appendChild(fontvariant_options_ul);

fontvariant.appendChild(fontvariant_selected);
fontvariant.appendChild(fontvariant_options);

//-----------------Event Handlers--------------------

fontvariant_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(fontvariant_options.style.display == 'block'){

    fontvariant_options.style.display = 'none';
      fontvariant_options_ul.style.display = 'none';

  }else{

    fontvariant_options.style.display = 'block';
      fontvariant_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End FontVariant------

//------FontStretch-------

var fontstretch = document.createElement('combobox');
fontstretch.setAttribute('id','fontstretch');
fontstretch.style.left = '10px';
fontstretch.style.top = '70px';
fontstretch.style.zIndex = '4';

var fontstretch_selected = document.createElement('selected');
var fontstretch_selected_a = document.createElement('a');
var fontstretch_selected_a_span = document.createElement('span');
fontstretch_selected_a_span.innerText = 'Font Stretch';

var fontstretch_options = document.createElement('options');
var fontstretch_options_ul = document.createElement('ul');

//------------------FontStretch Options--------------------
//-------------------------1----------------------------

var fontstretch_options_1 = document.createElement('li');
var fontstretch_options_1_a = document.createElement('a');
fontstretch_options_1_a.innerText = 'Normal';
fontstretch_options_1_a.style.fontStretch = 'Normal';

var fontstretch_options_1_a_span = document.createElement('span');
fontstretch_options_1_a_span.innerText = 'Normal';
fontstretch_options_1_a_span.setAttribute('class','value');

fontstretch_options_1_a.appendChild(fontstretch_options_1_a_span);
fontstretch_options_1.appendChild(fontstretch_options_1_a);

fontstretch_options_1.addEventListener('click',function(){
  tb(element,'fstr',fontstretch_options_1_a.innerText);
});

//-------------------------2----------------------------

var fontstretch_options_2 = document.createElement('li');
var fontstretch_options_2_a = document.createElement('a');
fontstretch_options_2_a.innerText = 'Condensed';
fontstretch_options_2_a.style.fontStretch = 'Condensed';

var fontstretch_options_2_a_span = document.createElement('span');
fontstretch_options_2_a_span.innerText = 'Condensed';
fontstretch_options_2_a_span.setAttribute('class','value');

fontstretch_options_2_a.appendChild(fontstretch_options_2_a_span);
fontstretch_options_2.appendChild(fontstretch_options_2_a);

fontstretch_options_2.addEventListener('click',function(){
  tb(element,'fstr',fontstretch_options_2_a.innerText);
});

//-------------------------3----------------------------

var fontstretch_options_3 = document.createElement('li');
var fontstretch_options_3_a = document.createElement('a');
fontstretch_options_3_a.innerText = 'Expanded';
fontstretch_options_3_a.style.fontStretch = 'Expanded';
fontstretch_options_3_a.classList.add('lastoption');

var fontstretch_options_3_a_span = document.createElement('span');
fontstretch_options_3_a_span.innerText = 'Expanded';
fontstretch_options_3_a_span.setAttribute('class','value');

fontstretch_options_3_a.appendChild(fontstretch_options_3_a_span);
fontstretch_options_3.appendChild(fontstretch_options_3_a);

fontstretch_options_3.addEventListener('click',function(){
  tb(element,'fstr',fontstretch_options_3_a.innerText);
});

//---------------FontStretch Options End---------------------

fontstretch_selected_a.appendChild(fontstretch_selected_a_span);
fontstretch_selected.appendChild(fontstretch_selected_a);

fontstretch_options_ul.appendChild(fontstretch_options_1);
fontstretch_options_ul.appendChild(fontstretch_options_2);
fontstretch_options_ul.appendChild(fontstretch_options_3);

fontstretch_options.appendChild(fontstretch_options_ul);

fontstretch.appendChild(fontstretch_selected);
fontstretch.appendChild(fontstretch_options);

//-----------------Event Handlers--------------------

fontstretch_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(fontstretch_options.style.display == 'block'){

    fontstretch_options.style.display = 'none';
      fontstretch_options_ul.style.display = 'none';

  }else{

    fontstretch_options.style.display = 'block';
      fontstretch_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End FontStretch------

//------FontColor-------

var fontcolor = document.createElement('combobox');
fontcolor.setAttribute('id','fontcolor');
fontcolor.style.left = '10px';
fontcolor.style.top = '140px';
fontcolor.style.zIndex = '3';

var fontcolor_selected = document.createElement('selected');
var fontcolor_selected_a = document.createElement('a');
var fontcolor_selected_a_span = document.createElement('span');
fontcolor_selected_a_span.innerText = 'Font Color';

var fontcolor_colordisplay = document.createElement('colordisplay');
fontcolor_colordisplay.setAttribute('id','fcd');
fontcolor_colordisplay.style.display = 'none';
fontcolor_colordisplay.addEventListener('click',function(){

  var colorpicker = document.getElementById('fcp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }

});

var fontcolor_colorpicker = document.createElement('div');
fontcolor_colorpicker.setAttribute('class','colorpicker');
fontcolor_colorpicker.setAttribute('id','fcp');

var fontcolor_colorpicker_box = document.createElement('canvas');
fontcolor_colorpicker_box.setAttribute('class','colorpickerbox');
fontcolor_colorpicker_box.setAttribute('id','fcpb');

var fontcolor_colorpicker_strip = document.createElement('canvas');
fontcolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
fontcolor_colorpicker_strip.setAttribute('id','fcps');

var fontcolor_colorpicker_input_rgba = document.createElement('input');
fontcolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
fontcolor_colorpicker_input_rgba.setAttribute('id','fcprgba');
fontcolor_colorpicker_input_rgba.addEventListener('input',function(){
	textToColorPickerColor(this,'color',element);
});

var fontcolor_colorpicker_input_hex = document.createElement('input');
fontcolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
fontcolor_colorpicker_input_hex.setAttribute('id','fcphex');
fontcolor_colorpicker_input_hex.addEventListener('input',function(){
	textToColorPickerColor(this,'color',element);
});

fontcolor_colorpicker.appendChild(fontcolor_colorpicker_box);
fontcolor_colorpicker.appendChild(fontcolor_colorpicker_strip);
fontcolor_colorpicker.appendChild(fontcolor_colorpicker_input_rgba);
fontcolor_colorpicker.appendChild(fontcolor_colorpicker_input_hex);

fontcolor_selected_a.appendChild(fontcolor_selected_a_span);
fontcolor_selected.appendChild(fontcolor_selected_a);
fontcolor_selected.appendChild(fontcolor_colordisplay);
fontcolor_selected.appendChild(fontcolor_colorpicker);

fontcolor.appendChild(fontcolor_selected);

//-----------------Event Handlers--------------------

fontcolor_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(fontcolor_colordisplay.style.display == 'block'){

        fontcolor_colordisplay.style.display = 'none';
        fontcolor.style.textAlign = '';

    }else{

        fontcolor_colordisplay.style.display = 'block';
        fontcolor.style.textAlign = 'left';

    }

    }else{

    }

});

//-----End FontColor------

//------BackgroundColor-------

var backgroundcolor = document.createElement('combobox');
backgroundcolor.setAttribute('id','backgroundcolor');
backgroundcolor.style.left = '200px';
backgroundcolor.style.top = '140px';
backgroundcolor.style.zIndex = '3';

var backgroundcolor_selected = document.createElement('selected');
var backgroundcolor_selected_a = document.createElement('a');
var backgroundcolor_selected_a_span = document.createElement('span');
backgroundcolor_selected_a_span.innerText = 'Background Color';
backgroundcolor_selected_a_span.style.fontSize = '12px';

var backgroundcolor_colordisplay = document.createElement('colordisplay');
backgroundcolor_colordisplay.setAttribute('id','bgcd');
backgroundcolor_colordisplay.style.display = 'none';
backgroundcolor_colordisplay.addEventListener('click',function(){

  var colorpicker = document.getElementById('bgcp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }

});

var backgroundcolor_colorpicker = document.createElement('div');
backgroundcolor_colorpicker.setAttribute('class','colorpicker');
backgroundcolor_colorpicker.setAttribute('id','bgcp');

var backgroundcolor_colorpicker_box = document.createElement('canvas');
backgroundcolor_colorpicker_box.setAttribute('class','colorpickerbox');
backgroundcolor_colorpicker_box.setAttribute('id','bgcpb');

var backgroundcolor_colorpicker_strip = document.createElement('canvas');
backgroundcolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
backgroundcolor_colorpicker_strip.setAttribute('id','bgcps');

var backgroundcolor_colorpicker_input_rgba = document.createElement('input');
backgroundcolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
backgroundcolor_colorpicker_input_rgba.setAttribute('id','bgcprgba');
backgroundcolor_colorpicker_input_rgba.addEventListener('input',function(){
	textToColorPickerColor(this,'background-color',element);
});


var backgroundcolor_colorpicker_input_hex = document.createElement('input');
backgroundcolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
backgroundcolor_colorpicker_input_hex.setAttribute('id','bgcphex');
backgroundcolor_colorpicker_input_hex.addEventListener('input',function(){
	textToColorPickerColor(this,'background-color',element);
});

backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_box);
backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_strip);
backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_input_rgba);
backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_input_hex);

backgroundcolor_selected_a.appendChild(backgroundcolor_selected_a_span);
backgroundcolor_selected.appendChild(backgroundcolor_selected_a);
backgroundcolor_selected.appendChild(backgroundcolor_colordisplay);
backgroundcolor_selected.appendChild(backgroundcolor_colorpicker);

backgroundcolor.appendChild(backgroundcolor_selected);

//-----------------Event Handlers--------------------

backgroundcolor_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(backgroundcolor_colordisplay.style.display == 'block'){

        backgroundcolor_colordisplay.style.display = 'none';
        backgroundcolor.style.textAlign = '';

    }else{

        backgroundcolor_colordisplay.style.display = 'block';
        backgroundcolor.style.textAlign = 'left';

    }

    }else{

    }

});

//-----End BackgroundColor------

//------BorderColor-------

var bordercolor = document.createElement('combobox');
bordercolor.setAttribute('id','bordercolor');
bordercolor.style.left = '390px';
bordercolor.style.top = '140px';
bordercolor.style.zIndex = '3';

var bordercolor_selected = document.createElement('selected');
var bordercolor_selected_a = document.createElement('a');
var bordercolor_selected_a_span = document.createElement('span');
bordercolor_selected_a_span.innerText = 'Border Color';
bordercolor_selected_a_span.style.fontSize = '12px';

var bordercolor_colordisplay = document.createElement('colordisplay');
bordercolor_colordisplay.setAttribute('id','bcd');
bordercolor_colordisplay.style.display = 'none';
bordercolor_colordisplay.addEventListener('click',function(){

  var colorpicker = document.getElementById('bcp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }

});

var bordercolor_colorpicker = document.createElement('div');
bordercolor_colorpicker.setAttribute('class','colorpicker');
bordercolor_colorpicker.setAttribute('id','bcp');

var bordercolor_colorpicker_box = document.createElement('canvas');
bordercolor_colorpicker_box.setAttribute('class','colorpickerbox');
bordercolor_colorpicker_box.setAttribute('id','bcpb');

var bordercolor_colorpicker_strip = document.createElement('canvas');
bordercolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
bordercolor_colorpicker_strip.setAttribute('id','bcps');

var bordercolor_colorpicker_input_rgba = document.createElement('input');
bordercolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
bordercolor_colorpicker_input_rgba.setAttribute('id','bcprgba');
bordercolor_colorpicker_input_rgba.addEventListener('input',function(){
	textToColorPickerColor(this,'border-color',element);
});

var bordercolor_colorpicker_input_hex = document.createElement('input');
bordercolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
bordercolor_colorpicker_input_hex.setAttribute('id','bcphex');
bordercolor_colorpicker_input_hex.addEventListener('input',function(){
	textToColorPickerColor(this,'border-color',element);
});

bordercolor_colorpicker.appendChild(bordercolor_colorpicker_box);
bordercolor_colorpicker.appendChild(bordercolor_colorpicker_strip);
bordercolor_colorpicker.appendChild(bordercolor_colorpicker_input_rgba);
bordercolor_colorpicker.appendChild(bordercolor_colorpicker_input_hex);

bordercolor_selected_a.appendChild(bordercolor_selected_a_span);
bordercolor_selected.appendChild(bordercolor_selected_a);
bordercolor_selected.appendChild(bordercolor_colordisplay);
bordercolor_selected.appendChild(bordercolor_colorpicker);

bordercolor.appendChild(bordercolor_selected);

//-----------------Event Handlers--------------------

bordercolor_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(bordercolor_colordisplay.style.display == 'block'){

        bordercolor_colordisplay.style.display = 'none';
        bordercolor.style.textAlign = '';

    }else{

        bordercolor_colordisplay.style.display = 'block';
        bordercolor.style.textAlign = 'left';

    }

    }else{

    }

});

//-----End BorderColor------

//------TextAlign-------

var textalign = document.createElement('combobox');
textalign.setAttribute('id','textalign');
textalign.style.left = '200px';
textalign.style.top = '70px';
textalign.style.zIndex = '4';

var textalign_selected = document.createElement('selected');
var textalign_selected_a = document.createElement('a');
var textalign_selected_a_span = document.createElement('span');
textalign_selected_a_span.innerText = 'Text Align';

var textalign_options = document.createElement('options');
var textalign_options_ul = document.createElement('ul');

//------------------TextAlign Options--------------------
//-------------------------1----------------------------

var textalign_options_1 = document.createElement('li');
var textalign_options_1_a = document.createElement('a');
textalign_options_1_a.innerText = 'Center';
textalign_options_1_a.style.textAlign = 'Center';

var textalign_options_1_a_span = document.createElement('span');
textalign_options_1_a_span.innerText = 'Center';
textalign_options_1_a_span.setAttribute('class','value');

textalign_options_1_a.appendChild(textalign_options_1_a_span);
textalign_options_1.appendChild(textalign_options_1_a);

textalign_options_1.addEventListener('click',function(){
  tb(element,'ta',textalign_options_1_a.innerText);
});

//-------------------------2----------------------------

var textalign_options_2 = document.createElement('li');
var textalign_options_2_a = document.createElement('a');
textalign_options_2_a.innerText = 'Left';
textalign_options_2_a.style.textAlign = 'Left';

var textalign_options_2_a_span = document.createElement('span');
textalign_options_2_a_span.innerText = 'Left';
textalign_options_2_a_span.setAttribute('class','value');

textalign_options_2_a.appendChild(textalign_options_2_a_span);
textalign_options_2.appendChild(textalign_options_2_a);

textalign_options_2.addEventListener('click',function(){
  tb(element,'ta',textalign_options_2_a.innerText);
});

//-------------------------3----------------------------

var textalign_options_3 = document.createElement('li');
var textalign_options_3_a = document.createElement('a');
textalign_options_3_a.innerText = 'Right';
textalign_options_3_a.style.textAlign = 'Right';
textalign_options_3_a.classList.add('lastoption');

var textalign_options_3_a_span = document.createElement('span');
textalign_options_3_a_span.innerText = 'Right';
textalign_options_3_a_span.setAttribute('class','value');

textalign_options_3_a.appendChild(textalign_options_3_a_span);
textalign_options_3.appendChild(textalign_options_3_a);

textalign_options_3.addEventListener('click',function(){
  tb(element,'ta',textalign_options_3_a.innerText);
});


//---------------TextAlign Options End---------------------

textalign_selected_a.appendChild(textalign_selected_a_span);
textalign_selected.appendChild(textalign_selected_a);

textalign_options_ul.appendChild(textalign_options_1);
textalign_options_ul.appendChild(textalign_options_2);
textalign_options_ul.appendChild(textalign_options_3);

textalign_options.appendChild(textalign_options_ul);

textalign.appendChild(textalign_selected);
textalign.appendChild(textalign_options);

//-----------------Event Handlers--------------------

textalign_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(textalign_options.style.display == 'block'){

    textalign_options.style.display = 'none';
      textalign_options_ul.style.display = 'none';

  }else{

    textalign_options.style.display = 'block';
      textalign_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End TextAlign------

//------TextDecoration-------

var textdecoration = document.createElement('combobox');
textdecoration.setAttribute('id','textdecoration');
textdecoration.style.left = '390px';
textdecoration.style.top = '70px';
textdecoration.style.zIndex = '4';

var textdecoration_selected = document.createElement('selected');
var textdecoration_selected_a = document.createElement('a');
var textdecoration_selected_a_span = document.createElement('span');
textdecoration_selected_a_span.innerText = 'Text Decoration';

var textdecoration_options = document.createElement('options');
var textdecoration_options_ul = document.createElement('ul');

var textdecoration_colordisplay = document.createElement('colordisplay');
textdecoration_colordisplay.setAttribute('id','tdcd');
textdecoration_colordisplay.style.top = '15px';
textdecoration_colordisplay.style.display = 'none';
textdecoration_colordisplay.addEventListener('click',function(){

  var colorpicker = document.getElementById('tdcp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }

});

var textdecoration_colorpicker = document.createElement('div');
textdecoration_colorpicker.setAttribute('class','colorpicker');
textdecoration_colorpicker.setAttribute('id','tdcp');

var textdecoration_colorpicker_box = document.createElement('canvas');
textdecoration_colorpicker_box.setAttribute('class','colorpickerbox');
textdecoration_colorpicker_box.setAttribute('id','tdcpb');

var textdecoration_colorpicker_strip = document.createElement('canvas');
textdecoration_colorpicker_strip.setAttribute('class','colorpickerstrip');
textdecoration_colorpicker_strip.setAttribute('id','tdcps');

var textdecoration_colorpicker_input_rgba = document.createElement('input');
textdecoration_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
textdecoration_colorpicker_input_rgba.setAttribute('id','tdcprgba');
textdecoration_colorpicker_input_rgba.addEventListener('input',function(){
	textToColorPickerColor(this,'text-decoration-color',element);
});

var textdecoration_colorpicker_input_hex = document.createElement('input');
textdecoration_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
textdecoration_colorpicker_input_hex.setAttribute('id','tdcphex');
textdecoration_colorpicker_input_hex.addEventListener('input',function(){
	textToColorPickerColor(this,'text-decoration-color',element);
});

textdecoration_colorpicker.appendChild(textdecoration_colorpicker_box);
textdecoration_colorpicker.appendChild(textdecoration_colorpicker_strip);
textdecoration_colorpicker.appendChild(textdecoration_colorpicker_input_rgba);
textdecoration_colorpicker.appendChild(textdecoration_colorpicker_input_hex);

//------------------TextDecoration Options--------------------
//-------------------------1----------------------------

var textdecoration_options_1 = document.createElement('li');
var textdecoration_options_1_a = document.createElement('a');
textdecoration_options_1_a.innerText = 'Overline';
textdecoration_options_1_a.style.textDecoration = 'Overline';

var textdecoration_options_1_a_span = document.createElement('span');
textdecoration_options_1_a_span.innerText = 'Overline';
textdecoration_options_1_a_span.setAttribute('class','value');

textdecoration_options_1_a.appendChild(textdecoration_options_1_a_span);
textdecoration_options_1.appendChild(textdecoration_options_1_a);

textdecoration_options_1.addEventListener('click',function(){
  tb(element,'td',textdecoration_options_1_a.innerText);
});

//-------------------------2----------------------------

var textdecoration_options_2 = document.createElement('li');
var textdecoration_options_2_a = document.createElement('a');
textdecoration_options_2_a.innerText = 'Line-Through';
textdecoration_options_2_a.style.textDecoration = 'Line-Through';

var textdecoration_options_2_a_span = document.createElement('span');
textdecoration_options_2_a_span.innerText = 'Line-Through';
textdecoration_options_2_a_span.setAttribute('class','value');

textdecoration_options_2_a.appendChild(textdecoration_options_2_a_span);
textdecoration_options_2.appendChild(textdecoration_options_2_a);

textdecoration_options_2.addEventListener('click',function(){
  tb(element,'td',textdecoration_options_2_a.innerText);
});

//-------------------------3----------------------------

var textdecoration_options_3 = document.createElement('li');
var textdecoration_options_3_a = document.createElement('a');
textdecoration_options_3_a.innerText = 'Underline';
textdecoration_options_3_a.style.textDecoration = 'Underline';

var textdecoration_options_3_a_span = document.createElement('span');
textdecoration_options_3_a_span.innerText = 'Underline';
textdecoration_options_3_a_span.setAttribute('class','value');

textdecoration_options_3_a.appendChild(textdecoration_options_3_a_span);
textdecoration_options_3.appendChild(textdecoration_options_3_a);

textdecoration_options_3.addEventListener('click',function(){
  tb(element,'td',textdecoration_options_3_a.innerText);
});

//-------------------------4----------------------------

var textdecoration_options_4 = document.createElement('li');
var textdecoration_options_4_a = document.createElement('a');
textdecoration_options_4_a.innerText = 'Underline Overline';
textdecoration_options_4_a.style.textDecoration = 'Underline Overline';

var textdecoration_options_4_a_span = document.createElement('span');
textdecoration_options_4_a_span.innerText = 'Underline Overline';
textdecoration_options_4_a_span.setAttribute('class','value');

textdecoration_options_4_a.appendChild(textdecoration_options_4_a_span);
textdecoration_options_4.appendChild(textdecoration_options_4_a);

textdecoration_options_4.addEventListener('click',function(){
  tb(element,'td',textdecoration_options_4_a.innerText);
});

//-------------------------5----------------------------

var textdecoration_options_5 = document.createElement('li');
var textdecoration_options_5_a = document.createElement('a');
textdecoration_options_5_a.innerText = 'None';
textdecoration_options_5_a.style.textDecoration = 'None';
textdecoration_options_5_a.classList.add('lastoption');

var textdecoration_options_5_a_span = document.createElement('span');
textdecoration_options_5_a_span.innerText = 'None';
textdecoration_options_5_a_span.setAttribute('class','value');

textdecoration_options_5_a.appendChild(textdecoration_options_5_a_span);
textdecoration_options_5.appendChild(textdecoration_options_5_a);

textdecoration_options_5.addEventListener('click',function(){
  tb(element,'td',textdecoration_options_5_a.innerText);
});

//---------------TextDecoration Options End---------------------

textdecoration_selected_a.appendChild(textdecoration_selected_a_span);
textdecoration_selected.appendChild(textdecoration_selected_a);
textdecoration_selected.appendChild(textdecoration_colorpicker);
textdecoration_selected.appendChild(textdecoration_colordisplay);

textdecoration_options_ul.appendChild(textdecoration_options_1);
textdecoration_options_ul.appendChild(textdecoration_options_2);
textdecoration_options_ul.appendChild(textdecoration_options_3);
textdecoration_options_ul.appendChild(textdecoration_options_4);
textdecoration_options_ul.appendChild(textdecoration_options_5);

textdecoration_options.appendChild(textdecoration_options_ul);

textdecoration.appendChild(textdecoration_selected);
textdecoration.appendChild(textdecoration_options);

//-----------------Event Handlers--------------------

textdecoration_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(textdecoration_options.style.display == 'block'){

    textdecoration_options.style.display = 'none';
      textdecoration_options_ul.style.display = 'none';
        textdecoration_colordisplay.style.display = 'none';

        textdecoration_selected_a_span.style.textAlign = '';
        textdecoration_selected_a_span.style.fontSize = '';
        textdecoration_selected_a_span.style.width = '';

  }else{

    textdecoration_options.style.display = 'block';
      textdecoration_options_ul.style.display = 'block';
        textdecoration_colordisplay.style.display = 'block';

        textdecoration_selected_a_span.style.textAlign = 'Left';
        textdecoration_selected_a_span.style.fontSize = '10px';
        textdecoration_selected_a_span.style.width = '100px';

  }

  }else{

  }

});

//-----End TextDecoration------

//------TextDecorationStyle-------

var textdecorationstyle = document.createElement('combobox');
textdecorationstyle.setAttribute('id','textdecorationstyle');
textdecorationstyle.style.left = '580px';
textdecorationstyle.style.top = '70px';
textdecorationstyle.style.zIndex = '4';

var textdecorationstyle_selected = document.createElement('selected');
var textdecorationstyle_selected_a = document.createElement('a');
var textdecorationstyle_selected_a_span = document.createElement('span');
textdecorationstyle_selected_a_span.innerText = 'Text Decoration Style';

var textdecorationstyle_options = document.createElement('options');
var textdecorationstyle_options_ul = document.createElement('ul');

//------------------TextDecorationStyle Options--------------------
//-------------------------1----------------------------

var textdecorationstyle_options_1 = document.createElement('li');
var textdecorationstyle_options_1_a = document.createElement('a');
textdecorationstyle_options_1_a.innerText = 'Solid';

textdecorationstyle_options_1_a.style.textDecoration = 'Underline Solid';

var textdecorationstyle_options_1_a_span = document.createElement('span');
textdecorationstyle_options_1_a_span.innerText = 'Solid';
textdecorationstyle_options_1_a_span.setAttribute('class','value');

textdecorationstyle_options_1_a.appendChild(textdecorationstyle_options_1_a_span);
textdecorationstyle_options_1.appendChild(textdecorationstyle_options_1_a);

textdecorationstyle_options_1.addEventListener('click',function(){
  tb(element,'tds',textdecorationstyle_options_1_a.innerText);
});

//-------------------------2----------------------------

var textdecorationstyle_options_2 = document.createElement('li');
var textdecorationstyle_options_2_a = document.createElement('a');
textdecorationstyle_options_2_a.innerText = 'Double';

textdecorationstyle_options_2_a.style.textDecoration = 'Underline Double';

var textdecorationstyle_options_2_a_span = document.createElement('span');
textdecorationstyle_options_2_a_span.innerText = 'Double';
textdecorationstyle_options_2_a_span.setAttribute('class','value');

textdecorationstyle_options_2_a.appendChild(textdecorationstyle_options_2_a_span);
textdecorationstyle_options_2.appendChild(textdecorationstyle_options_2_a);

textdecorationstyle_options_2.addEventListener('click',function(){
  tb(element,'tds',textdecorationstyle_options_2_a.innerText);
});

//-------------------------3----------------------------

var textdecorationstyle_options_3 = document.createElement('li');
var textdecorationstyle_options_3_a = document.createElement('a');
textdecorationstyle_options_3_a.innerText = 'Dotted';

textdecorationstyle_options_3_a.style.textDecoration = 'Underline Dotted';

var textdecorationstyle_options_3_a_span = document.createElement('span');
textdecorationstyle_options_3_a_span.innerText = 'Dotted';
textdecorationstyle_options_3_a_span.setAttribute('class','value');

textdecorationstyle_options_3_a.appendChild(textdecorationstyle_options_3_a_span);
textdecorationstyle_options_3.appendChild(textdecorationstyle_options_3_a);

textdecorationstyle_options_3.addEventListener('click',function(){
  tb(element,'tds',textdecorationstyle_options_3_a.innerText);
});

//-------------------------4----------------------------

var textdecorationstyle_options_4 = document.createElement('li');
var textdecorationstyle_options_4_a = document.createElement('a');
textdecorationstyle_options_4_a.innerText = 'Dashed';

textdecorationstyle_options_4_a.style.textDecoration = 'Underline Dashed';

var textdecorationstyle_options_4_a_span = document.createElement('span');
textdecorationstyle_options_4_a_span.innerText = 'Dashed';
textdecorationstyle_options_4_a_span.setAttribute('class','value');

textdecorationstyle_options_4_a.appendChild(textdecorationstyle_options_4_a_span);
textdecorationstyle_options_4.appendChild(textdecorationstyle_options_4_a);

textdecorationstyle_options_4.addEventListener('click',function(){
  tb(element,'tds',textdecorationstyle_options_4_a.innerText);
});

//-------------------------5----------------------------

var textdecorationstyle_options_5 = document.createElement('li');
var textdecorationstyle_options_5_a = document.createElement('a');
textdecorationstyle_options_5_a.innerText = 'Wavy';

textdecorationstyle_options_5_a.style.textDecoration = 'Underline Wavy';
textdecorationstyle_options_5_a.classList.add('lastoption');

var textdecorationstyle_options_5_a_span = document.createElement('span');
textdecorationstyle_options_5_a_span.innerText = 'Wavy';
textdecorationstyle_options_5_a_span.setAttribute('class','value');

textdecorationstyle_options_5_a.appendChild(textdecorationstyle_options_5_a_span);
textdecorationstyle_options_5.appendChild(textdecorationstyle_options_5_a);

textdecorationstyle_options_5.addEventListener('click',function(){
  tb(element,'tds',textdecorationstyle_options_5_a.innerText);
});

//---------------TextDecorationStyle Options End---------------------

textdecorationstyle_selected_a.appendChild(textdecorationstyle_selected_a_span);
textdecorationstyle_selected.appendChild(textdecorationstyle_selected_a);

textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_1);
textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_2);
textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_3);
textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_4);
textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_5);

textdecorationstyle_options.appendChild(textdecorationstyle_options_ul);

textdecorationstyle.appendChild(textdecorationstyle_selected);
textdecorationstyle.appendChild(textdecorationstyle_options);

//-----------------Event Handlers--------------------

textdecorationstyle_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(textdecorationstyle_options.style.display == 'block'){

    textdecorationstyle_options.style.display = 'none';
      textdecorationstyle_options_ul.style.display = 'none';

  }else{

    textdecorationstyle_options.style.display = 'block';
      textdecorationstyle_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End TextDecorationStyle------

//------BorderRadius-------

var borderradius = document.createElement('combobox');
borderradius.setAttribute('id','borderradius');
borderradius.style.left = '770px';
borderradius.style.top = '70px';
borderradius.style.zIndex = '4';

var borderradius_selected = document.createElement('selected');
var borderradius_selected_a = document.createElement('a');
var borderradius_selected_a_span = document.createElement('span');
borderradius_selected_a_span.innerText = 'Border Radius';

var borderradius_options = document.createElement('options');
var borderradius_options_ul = document.createElement('ul');

var borderradius_customedit = document.createElement('input');
borderradius_customedit.classList.add('custom');

//------------------BorderRadius Options--------------------
//-------------------------1----------------------------

var borderradius_options_1 = document.createElement('li');
var borderradius_options_1_a = document.createElement('a');
borderradius_options_1_a.innerText = '5px';

var borderradius_options_1_a_span = document.createElement('span');
borderradius_options_1_a_span.innerText = '5px';
borderradius_options_1_a_span.setAttribute('class','value');

borderradius_options_1_a.appendChild(borderradius_options_1_a_span);
borderradius_options_1.appendChild(borderradius_options_1_a);

borderradius_options_1.addEventListener('click',function(){
  tb(element,'br',borderradius_options_1_a.innerText);
});

//-------------------------2----------------------------

var borderradius_options_2 = document.createElement('li');
var borderradius_options_2_a = document.createElement('a');
borderradius_options_2_a.innerText = '10px';

var borderradius_options_2_a_span = document.createElement('span');
borderradius_options_2_a_span.innerText = '10px';
borderradius_options_2_a_span.setAttribute('class','value');

borderradius_options_2_a.appendChild(borderradius_options_2_a_span);
borderradius_options_2.appendChild(borderradius_options_2_a);

borderradius_options_2.addEventListener('click',function(){
  tb(element,'br',borderradius_options_2_a.innerText);
});

//-------------------------3----------------------------

var borderradius_options_3 = document.createElement('li');
var borderradius_options_3_a = document.createElement('a');
borderradius_options_3_a.innerText = '20px';
borderradius_options_3_a.classList.add('lastoption');

var borderradius_options_3_a_span = document.createElement('span');
borderradius_options_3_a_span.innerText = '20px';
borderradius_options_3_a_span.setAttribute('class','value');

borderradius_options_3_a.appendChild(borderradius_options_3_a_span);
borderradius_options_3.appendChild(borderradius_options_3_a);

borderradius_options_3.addEventListener('click',function(){
  tb(element,'br',borderradius_options_3_a.innerText);
});

//---------------BorderRadius Options End---------------------

borderradius_selected_a.appendChild(borderradius_selected_a_span);
borderradius_selected.appendChild(borderradius_selected_a);
borderradius_selected.appendChild(borderradius_customedit);

borderradius_options_ul.appendChild(borderradius_options_1);
borderradius_options_ul.appendChild(borderradius_options_2);
borderradius_options_ul.appendChild(borderradius_options_3);

borderradius_options.appendChild(borderradius_options_ul);

borderradius.appendChild(borderradius_selected);
borderradius.appendChild(borderradius_options);

//-----------------Event Handlers--------------------

borderradius_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(borderradius_options.style.display == 'block'){

    borderradius_options.style.display = 'none';
      borderradius_options_ul.style.display = 'none';
      borderradius_customedit.style.display = 'none';
      borderradius_selected_a_span.style.textAlign = '';

  }else{

    borderradius_options.style.display = 'block';
      borderradius_options_ul.style.display = 'block';
      borderradius_customedit.style.display = 'block';
      borderradius_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

});

borderradius_customedit.addEventListener('keyup',function(){
  borderradius_selected_a_span.innerText = 'Border Radius: ' + this.value+'px';
  updateelement(element,'borderradius',this.value+'px');
});

//-----End BorderRadius------

//-------BorderSize--------

var bordersize = document.createElement('combobox');
bordersize.setAttribute('id','bordersize');
bordersize.style.left = '580px';
bordersize.style.top = '140px';
bordersize.style.zIndex = '3';

var bordersize_customedit = document.createElement('input');
bordersize_customedit.classList.add('custom');

var bordersize_selected = document.createElement('selected');
var bordersize_selected_a = document.createElement('a');
var bordersize_selected_a_span = document.createElement('span');
bordersize_selected_a_span.innerText = 'Border Size';

var bordersize_options = document.createElement('options');
var bordersize_options_ul = document.createElement('ul');

//------------------BorderSize Options--------------------
//-------------------------1----------------------------

var bordersize_options_1 = document.createElement('li');

var bordersize_options_1_a = document.createElement('a');
bordersize_options_1_a.innerText = '2px';

var bordersize_options_1_a_span = document.createElement('span');
bordersize_options_1_a_span.innerText = '2px';
bordersize_options_1_a_span.setAttribute('class','value');

bordersize_options_1_a.appendChild(bordersize_options_1_a_span);
bordersize_options_1.appendChild(bordersize_options_1_a);

bordersize_options_1.addEventListener('click',function(){
  tb(element,'bs',bordersize_options_1_a.innerText);
});

//-------------------------2----------------------------

var bordersize_options_2 = document.createElement('li');

var bordersize_options_2_a = document.createElement('a');
bordersize_options_2_a.innerText = '4px';

var bordersize_options_2_a_span = document.createElement('span');
bordersize_options_2_a_span.innerText = '4px';
bordersize_options_2_a_span.setAttribute('class','value');

bordersize_options_2_a.appendChild(bordersize_options_2_a_span);
bordersize_options_2.appendChild(bordersize_options_2_a);

bordersize_options_2.addEventListener('click',function(){
  tb(element,'bs',bordersize_options_2_a.innerText);
});

//-------------------------3----------------------------

var bordersize_options_3 = document.createElement('li');

var bordersize_options_3_a = document.createElement('a');
bordersize_options_3_a.innerText = '8px';
bordersize_options_3_a.classList.add('lastoption');

var bordersize_options_3_a_span = document.createElement('span');
bordersize_options_3_a_span.innerText = '8px';
bordersize_options_3_a_span.setAttribute('class','value');

bordersize_options_3_a.appendChild(bordersize_options_3_a_span);
bordersize_options_3.appendChild(bordersize_options_3_a);

bordersize_options_3.addEventListener('click',function(){
  tb(element,'bs',bordersize_options_3_a.innerText);
});

//---------------BorderSize Options End---------------------

bordersize_selected_a.appendChild(bordersize_selected_a_span);
bordersize_selected.appendChild(bordersize_selected_a);
bordersize_selected.appendChild(bordersize_customedit);

bordersize_options_ul.appendChild(bordersize_options_1);
bordersize_options_ul.appendChild(bordersize_options_2);
bordersize_options_ul.appendChild(bordersize_options_3);

bordersize_options.appendChild(bordersize_options_ul);

bordersize.appendChild(bordersize_selected);
bordersize.appendChild(bordersize_options);

//-----------------Event Handlers--------------------

bordersize_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(bordersize_options.style.display == 'block'){

    bordersize_options.style.display = 'none';
      bordersize_options_ul.style.display = 'none';
      bordersize_customedit.style.display = 'none';
      bordersize_selected_a_span.style.textAlign = '';

  }else{

    bordersize_options.style.display = 'block';
      bordersize_options_ul.style.display = 'block';
      bordersize_customedit.style.display = 'block';
      bordersize_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

});

bordersize_customedit.addEventListener('keyup',function(){
  bordersize_selected_a_span.innerText = 'Border Size: ' + this.value+'px';
  updateelement(element,'bordersize',this.value+'px');
});

//-------End BorderSize--------

//-------BorderStyle--------

var borderstyle = document.createElement('combobox');
borderstyle.setAttribute('id','borderstyle');
borderstyle.style.left = '770px';
borderstyle.style.top = '140px';
borderstyle.style.zIndex = '3';

var borderstyle_selected = document.createElement('selected');
var borderstyle_selected_a = document.createElement('a');
var borderstyle_selected_a_span = document.createElement('span');
borderstyle_selected_a_span.innerText = 'Border Style';

var borderstyle_options = document.createElement('options');
var borderstyle_options_ul = document.createElement('ul');

//------------------BorderStyle Options--------------------
//-------------------------1----------------------------

var borderstyle_options_1 = document.createElement('li');

var borderstyle_options_1_a = document.createElement('a');
borderstyle_options_1_a.innerText = 'Solid';

var borderstyle_options_1_a_span = document.createElement('span');
borderstyle_options_1_a_span.innerText = 'Solid';
borderstyle_options_1_a_span.setAttribute('class','value');

borderstyle_options_1_a.appendChild(borderstyle_options_1_a_span);
borderstyle_options_1.appendChild(borderstyle_options_1_a);

borderstyle_options_1.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_1_a.innerText);
});

//-------------------------2----------------------------

var borderstyle_options_2 = document.createElement('li');

var borderstyle_options_2_a = document.createElement('a');
borderstyle_options_2_a.innerText = 'Dotted';

var borderstyle_options_2_a_span = document.createElement('span');
borderstyle_options_2_a_span.innerText = 'Dotted';
borderstyle_options_2_a_span.setAttribute('class','value');

borderstyle_options_2_a.appendChild(borderstyle_options_2_a_span);
borderstyle_options_2.appendChild(borderstyle_options_2_a);

borderstyle_options_2.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_2_a.innerText);
});

//-------------------------3----------------------------

var borderstyle_options_3 = document.createElement('li');

var borderstyle_options_3_a = document.createElement('a');
borderstyle_options_3_a.innerText = 'Double';

var borderstyle_options_3_a_span = document.createElement('span');
borderstyle_options_3_a_span.innerText = 'Double';
borderstyle_options_3_a_span.setAttribute('class','value');

borderstyle_options_3_a.appendChild(borderstyle_options_3_a_span);
borderstyle_options_3.appendChild(borderstyle_options_3_a);

borderstyle_options_3.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_3_a.innerText);
});

//-------------------------4----------------------------

var borderstyle_options_4 = document.createElement('li');

var borderstyle_options_4_a = document.createElement('a');
borderstyle_options_4_a.innerText = 'Dashed';

var borderstyle_options_4_a_span = document.createElement('span');
borderstyle_options_4_a_span.innerText = 'Dashed';
borderstyle_options_4_a_span.setAttribute('class','value');

borderstyle_options_4_a.appendChild(borderstyle_options_4_a_span);
borderstyle_options_4.appendChild(borderstyle_options_4_a);

borderstyle_options_4.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_4_a.innerText);
});

//-------------------------5----------------------------

var borderstyle_options_5 = document.createElement('li');

var borderstyle_options_5_a = document.createElement('a');
borderstyle_options_5_a.innerText = 'Groove';

var borderstyle_options_5_a_span = document.createElement('span');
borderstyle_options_5_a_span.innerText = 'Groove';
borderstyle_options_5_a_span.setAttribute('class','value');

borderstyle_options_5_a.appendChild(borderstyle_options_5_a_span);
borderstyle_options_5.appendChild(borderstyle_options_5_a);

borderstyle_options_5.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_5_a.innerText);
});

//-------------------------6----------------------------

var borderstyle_options_6 = document.createElement('li');

var borderstyle_options_6_a = document.createElement('a');
borderstyle_options_6_a.innerText = 'Ridge';

var borderstyle_options_6_a_span = document.createElement('span');
borderstyle_options_6_a_span.innerText = 'Ridge';
borderstyle_options_6_a_span.setAttribute('class','value');

borderstyle_options_6_a.appendChild(borderstyle_options_6_a_span);
borderstyle_options_6.appendChild(borderstyle_options_6_a);

borderstyle_options_6.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_6_a.innerText);
});

//-------------------------7----------------------------

var borderstyle_options_7 = document.createElement('li');

var borderstyle_options_7_a = document.createElement('a');
borderstyle_options_7_a.innerText = 'Dotted Solid';

var borderstyle_options_7_a_span = document.createElement('span');
borderstyle_options_7_a_span.innerText = 'Dotted Solid';
borderstyle_options_7_a_span.setAttribute('class','value');

borderstyle_options_7_a.appendChild(borderstyle_options_7_a_span);
borderstyle_options_7.appendChild(borderstyle_options_7_a);

borderstyle_options_7.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_7_a.innerText);
});

//-------------------------8----------------------------

var borderstyle_options_8 = document.createElement('li');

var borderstyle_options_8_a = document.createElement('a');
borderstyle_options_8_a.innerText = 'Dotted Solid Double Dashed';
borderstyle_options_8_a.style.fontSize = '11px';

var borderstyle_options_8_a_span = document.createElement('span');
borderstyle_options_8_a_span.innerText = 'Dotted Solid Double Dashed';
borderstyle_options_8_a_span.setAttribute('class','value');

borderstyle_options_8_a.appendChild(borderstyle_options_8_a_span);
borderstyle_options_8.appendChild(borderstyle_options_8_a);

borderstyle_options_8.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_8_a.innerText);
});

//-------------------------9----------------------------

var borderstyle_options_9 = document.createElement('li');

var borderstyle_options_9_a = document.createElement('a');
borderstyle_options_9_a.innerText = 'Outset';

var borderstyle_options_9_a_span = document.createElement('span');
borderstyle_options_9_a_span.innerText = 'Outset';
borderstyle_options_9_a_span.setAttribute('class','value');

borderstyle_options_9_a.appendChild(borderstyle_options_9_a_span);
borderstyle_options_9.appendChild(borderstyle_options_9_a);

borderstyle_options_9.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_9_a.innerText);
});

//-------------------------10----------------------------

var borderstyle_options_10 = document.createElement('li');

var borderstyle_options_10_a = document.createElement('a');
borderstyle_options_10_a.innerText = 'Inset';
borderstyle_options_10_a.classList.add('lastoption');

var borderstyle_options_10_a_span = document.createElement('span');
borderstyle_options_10_a_span.innerText = 'Inset';
borderstyle_options_10_a_span.setAttribute('class','value');

borderstyle_options_10_a.appendChild(borderstyle_options_10_a_span);
borderstyle_options_10.appendChild(borderstyle_options_10_a);

borderstyle_options_10.addEventListener('click',function(){
  tb(element,'bsty',borderstyle_options_10_a.innerText);
});

//---------------BorderStyle Options End---------------------

borderstyle_selected_a.appendChild(borderstyle_selected_a_span);
borderstyle_selected.appendChild(borderstyle_selected_a);

borderstyle_options_ul.appendChild(borderstyle_options_1);
borderstyle_options_ul.appendChild(borderstyle_options_2);
borderstyle_options_ul.appendChild(borderstyle_options_3);
borderstyle_options_ul.appendChild(borderstyle_options_4);
borderstyle_options_ul.appendChild(borderstyle_options_5);
borderstyle_options_ul.appendChild(borderstyle_options_6);
borderstyle_options_ul.appendChild(borderstyle_options_7);
borderstyle_options_ul.appendChild(borderstyle_options_8);
borderstyle_options_ul.appendChild(borderstyle_options_9);
borderstyle_options_ul.appendChild(borderstyle_options_10);

borderstyle_options.appendChild(borderstyle_options_ul);

borderstyle.appendChild(borderstyle_selected);
borderstyle.appendChild(borderstyle_options);

//-----------------Event Handlers--------------------
borderstyle_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(borderstyle_options.style.display == 'block'){

    borderstyle_options.style.display = 'none';
      borderstyle_options_ul.style.display = 'none';

  }else{

    borderstyle_options.style.display = 'block';
      borderstyle_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-------End BorderStyle--------

//-------BoxShadow--------

var boxshadow = document.createElement('combobox');
boxshadow.setAttribute('id','boxshadow');
boxshadow.style.left = '10px';
boxshadow.style.top = '210px';
boxshadow.style.zIndex = '2';

var boxshadow_customedit = document.createElement('input');
boxshadow_customedit.classList.add('customlarge');
boxshadow_customedit.setAttribute('placeholder','0px 0px 0px');

var boxshadow_selected = document.createElement('selected');
var boxshadow_selected_a = document.createElement('a');
var boxshadow_selected_a_span = document.createElement('span');
boxshadow_selected_a_span.innerText = 'Box Shadow';
boxshadow_selected_a.style.width = '250px';

var boxshadow_colordisplay = document.createElement('colordisplay');
boxshadow_colordisplay.setAttribute('id','boxscd');
boxshadow_colordisplay.style.top = '17.5px';
boxshadow_colordisplay.style.display = 'none';
boxshadow_colordisplay.addEventListener('click',function(){

  var colorpicker = document.getElementById('boxscp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }

});

var boxshadow_colorpicker = document.createElement('div');
boxshadow_colorpicker.setAttribute('class','colorpicker');
boxshadow_colorpicker.setAttribute('id','boxscp');

var boxshadow_colorpicker_box = document.createElement('canvas');
boxshadow_colorpicker_box.setAttribute('class','colorpickerbox');
boxshadow_colorpicker_box.setAttribute('id','boxscpb');

var boxshadow_colorpicker_strip = document.createElement('canvas');
boxshadow_colorpicker_strip.setAttribute('class','colorpickerstrip');
boxshadow_colorpicker_strip.setAttribute('id','boxscps');

var boxshadow_colorpicker_input_rgba = document.createElement('input');
boxshadow_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
boxshadow_colorpicker_input_rgba.setAttribute('id','boxscprgba');
boxshadow_colorpicker_input_rgba.addEventListener('input',function(){
	textToColorPickerColor(this,'box-shadow-color',element);
});

var boxshadow_colorpicker_input_hex = document.createElement('input');
boxshadow_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
boxshadow_colorpicker_input_hex.setAttribute('id','boxscphex');
boxshadow_colorpicker_input_hex.addEventListener('input',function(){
	textToColorPickerColor(this,'box-shadow-color',element);
});

boxshadow_colorpicker.appendChild(boxshadow_colorpicker_box);
boxshadow_colorpicker.appendChild(boxshadow_colorpicker_strip);
boxshadow_colorpicker.appendChild(boxshadow_colorpicker_input_rgba);
boxshadow_colorpicker.appendChild(boxshadow_colorpicker_input_hex);

//---------------BoxShadow Options End---------------------

boxshadow_selected_a.appendChild(boxshadow_selected_a_span);
boxshadow_selected.appendChild(boxshadow_selected_a);
boxshadow_selected.appendChild(boxshadow_customedit);
boxshadow_selected.appendChild(boxshadow_colorpicker);
boxshadow_selected.appendChild(boxshadow_colordisplay);

boxshadow.appendChild(boxshadow_selected);

//-----------------Event Handlers--------------------

boxshadow_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(boxshadow_customedit.style.display == 'block'){

      boxshadow_customedit.style.display = 'none';
      boxshadow_selected_a_span.style.opacity = '1';
      boxshadow_colordisplay.style.display = 'none';

  }else{

      boxshadow_customedit.style.display = 'block';
      boxshadow_selected_a_span.style.opacity = '0';
      boxshadow_colordisplay.style.display = 'block';

  }

  }else{

  }

});

boxshadow_customedit.addEventListener('keyup',function(){
  boxshadow_selected_a_span.innerText = 'Box Shadow: ' + this.value;
  updateelement(element,'boxshadow',this.value);

});

//-------End BoxShadow--------

//-------Display--------

var display = document.createElement('combobox');
display.setAttribute('id','display');
display.style.left = '300px';
display.style.top = '210px';
display.style.zIndex = '2';

var display_selected = document.createElement('selected');
var display_selected_a = document.createElement('a');
var display_selected_a_span = document.createElement('span');
display_selected_a_span.innerText = 'Display';

var display_options = document.createElement('options');
var display_options_ul = document.createElement('ul');
display_options_ul.style.overflowX = 'scroll';
display_options_ul.style.height = '300px';
display_options_ul.style.maxHeight = '300px';
display_options_ul.style.minHeight = '300px';

//------------------Display Options--------------------
//-------------------------1----------------------------

var display_options_1 = document.createElement('li');

var display_options_1_a = document.createElement('a');
display_options_1_a.innerText = 'Block';

var display_options_1_a_span = document.createElement('span');
display_options_1_a_span.innerText = 'Block';
display_options_1_a_span.setAttribute('class','value');

display_options_1_a.appendChild(display_options_1_a_span);
display_options_1.appendChild(display_options_1_a);

display_options_1.addEventListener('click',function(){
  tb(element,'d',display_options_1_a.innerText);
});

//-------------------------2----------------------------

var display_options_2 = document.createElement('li');

var display_options_2_a = document.createElement('a');
display_options_2_a.innerText = 'Inline';

var display_options_2_a_span = document.createElement('span');
display_options_2_a_span.innerText = 'Inline';
display_options_2_a_span.setAttribute('class','value');

display_options_2_a.appendChild(display_options_2_a_span);
display_options_2.appendChild(display_options_2_a);

display_options_2.addEventListener('click',function(){
  tb(element,'d',display_options_2_a.innerText);
});

//-------------------------3----------------------------

var display_options_3 = document.createElement('li');

var display_options_3_a = document.createElement('a');
display_options_3_a.innerText = 'Contents';

var display_options_3_a_span = document.createElement('span');
display_options_3_a_span.innerText = 'Contents';
display_options_3_a_span.setAttribute('class','value');

display_options_3_a.appendChild(display_options_3_a_span);
display_options_3.appendChild(display_options_3_a);

display_options_3.addEventListener('click',function(){
  tb(element,'d',display_options_3_a.innerText);
});

//-------------------------4----------------------------

var display_options_4 = document.createElement('li');

var display_options_4_a = document.createElement('a');
display_options_4_a.innerText = 'Flex';

var display_options_4_a_span = document.createElement('span');
display_options_4_a_span.innerText = 'Flex';
display_options_4_a_span.setAttribute('class','value');

display_options_4_a.appendChild(display_options_4_a_span);
display_options_4.appendChild(display_options_4_a);

display_options_4.addEventListener('click',function(){
  tb(element,'d',display_options_4_a.innerText);
});

//-------------------------5----------------------------

var display_options_5 = document.createElement('li');

var display_options_5_a = document.createElement('a');
display_options_5_a.innerText = 'Grid';

var display_options_5_a_span = document.createElement('span');
display_options_5_a_span.innerText = 'Grid';
display_options_5_a_span.setAttribute('class','value');

display_options_5_a.appendChild(display_options_5_a_span);
display_options_5.appendChild(display_options_5_a);

display_options_5.addEventListener('click',function(){
  tb(element,'d',display_options_5_a.innerText);
});

//-------------------------6----------------------------

var display_options_6 = document.createElement('li');

var display_options_6_a = document.createElement('a');
display_options_6_a.innerText = 'Inline-Block';

var display_options_6_a_span = document.createElement('span');
display_options_6_a_span.innerText = 'Inline-Block';
display_options_6_a_span.setAttribute('class','value');

display_options_6_a.appendChild(display_options_6_a_span);
display_options_6.appendChild(display_options_6_a);

display_options_6.addEventListener('click',function(){
  tb(element,'d',display_options_6_a.innerText);
});

//-------------------------7----------------------------

var display_options_7 = document.createElement('li');

var display_options_7_a = document.createElement('a');
display_options_7_a.innerText = 'Inline-Flex';

var display_options_7_a_span = document.createElement('span');
display_options_7_a_span.innerText = 'Inline-Flex';
display_options_7_a_span.setAttribute('class','value');

display_options_7_a.appendChild(display_options_7_a_span);
display_options_7.appendChild(display_options_7_a);

display_options_7.addEventListener('click',function(){
  tb(element,'d',display_options_7_a.innerText);
});

//-------------------------8----------------------------

var display_options_8 = document.createElement('li');

var display_options_8_a = document.createElement('a');
display_options_8_a.innerText = 'Inline-Grid';

var display_options_8_a_span = document.createElement('span');
display_options_8_a_span.innerText = 'Inline-Grid';
display_options_8_a_span.setAttribute('class','value');

display_options_8_a.appendChild(display_options_8_a_span);
display_options_8.appendChild(display_options_8_a);

display_options_8.addEventListener('click',function(){
  tb(element,'d',display_options_8_a.innerText);
});

//-------------------------9----------------------------

var display_options_9 = document.createElement('li');

var display_options_9_a = document.createElement('a');
display_options_9_a.innerText = 'Inline-Table';

var display_options_9_a_span = document.createElement('span');
display_options_9_a_span.innerText = 'Inline-Table';
display_options_9_a_span.setAttribute('class','value');

display_options_9_a.appendChild(display_options_9_a_span);
display_options_9.appendChild(display_options_9_a);

display_options_9.addEventListener('click',function(){
  tb(element,'d',display_options_9_a.innerText);
});

//-------------------------10----------------------------

var display_options_10 = document.createElement('li');

var display_options_10_a = document.createElement('a');
display_options_10_a.innerText = 'List-Item';

var display_options_10_a_span = document.createElement('span');
display_options_10_a_span.innerText = 'List-Item';
display_options_10_a_span.setAttribute('class','value');

display_options_10_a.appendChild(display_options_10_a_span);
display_options_10.appendChild(display_options_10_a);

display_options_10.addEventListener('click',function(){
  tb(element,'d',display_options_10_a.innerText);
});

//-------------------------11----------------------------

var display_options_11 = document.createElement('li');

var display_options_11_a = document.createElement('a');
display_options_11_a.innerText = 'Run-In';

var display_options_11_a_span = document.createElement('span');
display_options_11_a_span.innerText = 'Run-In';
display_options_11_a_span.setAttribute('class','value');

display_options_11_a.appendChild(display_options_11_a_span);
display_options_11.appendChild(display_options_11_a);

display_options_11.addEventListener('click',function(){
  tb(element,'d',display_options_11_a.innerText);
});

//-------------------------12----------------------------

var display_options_12 = document.createElement('li');

var display_options_12_a = document.createElement('a');
display_options_12_a.innerText = 'Table';

var display_options_12_a_span = document.createElement('span');
display_options_12_a_span.innerText = 'Table';
display_options_12_a_span.setAttribute('class','value');

display_options_12_a.appendChild(display_options_12_a_span);
display_options_12.appendChild(display_options_12_a);

display_options_12.addEventListener('click',function(){
  tb(element,'d',display_options_12_a.innerText);
});

//-------------------------13----------------------------

var display_options_13 = document.createElement('li');

var display_options_13_a = document.createElement('a');
display_options_13_a.innerText = 'Table-Caption';

var display_options_13_a_span = document.createElement('span');
display_options_13_a_span.innerText = 'Table-Caption';
display_options_13_a_span.setAttribute('class','value');

display_options_13_a.appendChild(display_options_13_a_span);
display_options_13.appendChild(display_options_13_a);

display_options_13.addEventListener('click',function(){
  tb(element,'d',display_options_13_a.innerText);
});

//-------------------------14----------------------------

var display_options_14 = document.createElement('li');

var display_options_14_a = document.createElement('a');
display_options_14_a.innerText = 'Table-Column-Group';

var display_options_14_a_span = document.createElement('span');
display_options_14_a_span.innerText = 'Table-Column-Group';
display_options_14_a_span.setAttribute('class','value');

display_options_14_a.appendChild(display_options_14_a_span);
display_options_14.appendChild(display_options_14_a);

display_options_14.addEventListener('click',function(){
  tb(element,'d',display_options_14_a.innerText);
});

//-------------------------15----------------------------

var display_options_15 = document.createElement('li');

var display_options_15_a = document.createElement('a');
display_options_15_a.innerText = 'Table-Header-Group';

var display_options_15_a_span = document.createElement('span');
display_options_15_a_span.innerText = 'Table-Header-Group';
display_options_15_a_span.setAttribute('class','value');

display_options_15_a.appendChild(display_options_15_a_span);
display_options_15.appendChild(display_options_15_a);

display_options_15.addEventListener('click',function(){
  tb(element,'d',display_options_15_a.innerText);
});

//-------------------------16----------------------------

var display_options_16 = document.createElement('li');

var display_options_16_a = document.createElement('a');
display_options_16_a.innerText = 'Table-Footer-Group';

var display_options_16_a_span = document.createElement('span');
display_options_16_a_span.innerText = 'Table-Footer-Group';
display_options_16_a_span.setAttribute('class','value');

display_options_16_a.appendChild(display_options_16_a_span);
display_options_16.appendChild(display_options_16_a);

display_options_16.addEventListener('click',function(){
  tb(element,'d',display_options_16_a.innerText);
});

//-------------------------17----------------------------

var display_options_17 = document.createElement('li');

var display_options_17_a = document.createElement('a');
display_options_17_a.innerText = 'Table-Row-Group';

var display_options_17_a_span = document.createElement('span');
display_options_17_a_span.innerText = 'Table-Row-Group';
display_options_17_a_span.setAttribute('class','value');

display_options_17_a.appendChild(display_options_17_a_span);
display_options_17.appendChild(display_options_17_a);

display_options_17.addEventListener('click',function(){
  tb(element,'d',display_options_17_a.innerText);
});

//-------------------------18----------------------------

var display_options_18 = document.createElement('li');

var display_options_18_a = document.createElement('a');
display_options_18_a.innerText = 'Table-Cell';

var display_options_18_a_span = document.createElement('span');
display_options_18_a_span.innerText = 'Table-Cell';
display_options_18_a_span.setAttribute('class','value');

display_options_18_a.appendChild(display_options_18_a_span);
display_options_18.appendChild(display_options_18_a);

display_options_18.addEventListener('click',function(){
  tb(element,'d',display_options_18_a.innerText);
});

//-------------------------19----------------------------

var display_options_19 = document.createElement('li');

var display_options_19_a = document.createElement('a');
display_options_19_a.innerText = 'Table-Column';

var display_options_19_a_span = document.createElement('span');
display_options_19_a_span.innerText = 'Table-Column';
display_options_19_a_span.setAttribute('class','value');

display_options_19_a.appendChild(display_options_19_a_span);
display_options_19.appendChild(display_options_19_a);

display_options_19.addEventListener('click',function(){
  tb(element,'d',display_options_19_a.innerText);
});

//-------------------------20----------------------------

var display_options_20 = document.createElement('li');

var display_options_20_a = document.createElement('a');
display_options_20_a.innerText = 'Table-Row';

var display_options_20_a_span = document.createElement('span');
display_options_20_a_span.innerText = 'Table-Row';
display_options_20_a_span.setAttribute('class','value');

display_options_20_a.appendChild(display_options_20_a_span);
display_options_20.appendChild(display_options_20_a);

display_options_20.addEventListener('click',function(){
  tb(element,'d',display_options_20_a.innerText);
});

//-------------------------21----------------------------

var display_options_21 = document.createElement('li');

var display_options_21_a = document.createElement('a');
display_options_21_a.innerText = 'None';
display_options_21_a.classList.add('lastoption');

var display_options_21_a_span = document.createElement('span');
display_options_21_a_span.innerText = 'None';
display_options_21_a_span.setAttribute('class','value');

display_options_21_a.appendChild(display_options_21_a_span);
display_options_21.appendChild(display_options_21_a);

display_options_21.addEventListener('click',function(){
  tb(element,'d',display_options_21_a.innerText);
});

//---------------Display Options End---------------------

display_selected_a.appendChild(display_selected_a_span);
display_selected.appendChild(display_selected_a);

display_options_ul.appendChild(display_options_1);
display_options_ul.appendChild(display_options_2);
display_options_ul.appendChild(display_options_3);
display_options_ul.appendChild(display_options_4);
display_options_ul.appendChild(display_options_5);
display_options_ul.appendChild(display_options_6);
display_options_ul.appendChild(display_options_7);
display_options_ul.appendChild(display_options_8);
display_options_ul.appendChild(display_options_9);
display_options_ul.appendChild(display_options_10);
display_options_ul.appendChild(display_options_11);
display_options_ul.appendChild(display_options_12);
display_options_ul.appendChild(display_options_13);
display_options_ul.appendChild(display_options_14);
display_options_ul.appendChild(display_options_15);
display_options_ul.appendChild(display_options_16);
display_options_ul.appendChild(display_options_17);
display_options_ul.appendChild(display_options_18);
display_options_ul.appendChild(display_options_19);
display_options_ul.appendChild(display_options_20);
display_options_ul.appendChild(display_options_21);

display_options.appendChild(display_options_ul);

display.appendChild(display_selected);
display.appendChild(display_options);

//-----------------Event Handlers--------------------

display_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(display_options.style.display == 'block'){

    display_options.style.display = 'none';
      display_options_ul.style.display = 'none';

  }else{

    display_options.style.display = 'block';
      display_options_ul.style.display = 'block';

  }

  }else{

  }

});


//-------End Display--------

//-------Opacity--------

var opacity = document.createElement('combobox');
opacity.setAttribute('id','opacity');
opacity.style.left = '490px';
opacity.style.top = '210px';
opacity.style.zIndex = '2';

var opacity_customedit = document.createElement('input');
opacity_customedit.classList.add('custom');
opacity_customedit.setAttribute('min','0.1');
opacity_customedit.setAttribute('max','1');

var opacity_selected = document.createElement('selected');
var opacity_selected_a = document.createElement('a');
var opacity_selected_a_span = document.createElement('span');
opacity_selected_a_span.innerText = 'Opacity';


//---------------Opacity Options End---------------------

opacity_selected_a.appendChild(opacity_selected_a_span);
opacity_selected.appendChild(opacity_selected_a);
opacity_selected.appendChild(opacity_customedit);

opacity.appendChild(opacity_selected);

//-----------------Event Handlers--------------------

opacity_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(opacity_customedit.style.display == 'block'){

      opacity_customedit.style.display = 'none';
      opacity_selected_a_span.style.textAlign = '';

  }else{

      opacity_customedit.style.display = 'block';
      opacity_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

});

opacity_customedit.addEventListener('keyup',function(){
  opacity_selected_a_span.innerText = 'Opacity: ' + this.value;
  updateelement(element,'opacity',this.value);

});

//-------End Opacity--------

//------WhiteSpace-------

var whitespace = document.createElement('combobox');
whitespace.setAttribute('id','whitespace');
whitespace.style.left = '680px';
whitespace.style.top = '210px';
whitespace.style.zIndex = '2';

var whitespace_selected = document.createElement('selected');
var whitespace_selected_a = document.createElement('a');
whitespace_selected_a.style.width = '240px';

var whitespace_selected_a_span = document.createElement('span');
whitespace_selected_a_span.innerText = 'White Space';

var whitespace_options = document.createElement('options');
var whitespace_options_ul = document.createElement('ul');

var whitespace_customedit = document.createElement('input');
whitespace_customedit.classList.add('custom');

//------------------WhiteSpace Options--------------------
//-------------------------1----------------------------

var whitespace_options_1 = document.createElement('li');
var whitespace_options_1_a = document.createElement('a');
whitespace_options_1_a.innerText = 'Normal';

var whitespace_options_1_a_span = document.createElement('span');
whitespace_options_1_a_span.innerText = 'Normal';
whitespace_options_1_a_span.setAttribute('class','value');

whitespace_options_1_a.appendChild(whitespace_options_1_a_span);
whitespace_options_1.appendChild(whitespace_options_1_a);

whitespace_options_1.addEventListener('click',function(){
  tb(element,'ws',whitespace_options_1_a.innerText);
});

//-------------------------2----------------------------

var whitespace_options_2 = document.createElement('li');
var whitespace_options_2_a = document.createElement('a');
whitespace_options_2_a.innerText = 'NoWrap';

var whitespace_options_2_a_span = document.createElement('span');
whitespace_options_2_a_span.innerText = 'NoWrap';
whitespace_options_2_a_span.setAttribute('class','value');

whitespace_options_2_a.appendChild(whitespace_options_2_a_span);
whitespace_options_2.appendChild(whitespace_options_2_a);

whitespace_options_2.addEventListener('click',function(){
  tb(element,'ws',whitespace_options_2_a.innerText);
});

//-------------------------3----------------------------

var whitespace_options_3 = document.createElement('li');
var whitespace_options_3_a = document.createElement('a');
whitespace_options_3_a.innerText = 'Pre';

var whitespace_options_3_a_span = document.createElement('span');
whitespace_options_3_a_span.innerText = 'Pre';
whitespace_options_3_a_span.setAttribute('class','value');

whitespace_options_3_a.appendChild(whitespace_options_3_a_span);
whitespace_options_3.appendChild(whitespace_options_3_a);

whitespace_options_3.addEventListener('click',function(){
  tb(element,'ws',whitespace_options_3_a.innerText);
});

//-------------------------4----------------------------

var whitespace_options_4 = document.createElement('li');
var whitespace_options_4_a = document.createElement('a');
whitespace_options_4_a.innerText = 'Pre-Line';

var whitespace_options_4_a_span = document.createElement('span');
whitespace_options_4_a_span.innerText = 'Pre-Line';
whitespace_options_4_a_span.setAttribute('class','value');

whitespace_options_4_a.appendChild(whitespace_options_4_a_span);
whitespace_options_4.appendChild(whitespace_options_4_a);

whitespace_options_4.addEventListener('click',function(){
  tb(element,'ws',whitespace_options_4_a.innerText);
});

//-------------------------5----------------------------

var whitespace_options_5 = document.createElement('li');
var whitespace_options_5_a = document.createElement('a');
whitespace_options_5_a.innerText = 'Pre-Wrap';
whitespace_options_5_a.classList.add('lastoption');

var whitespace_options_5_a_span = document.createElement('span');
whitespace_options_5_a_span.innerText = 'Pre-Wrap';
whitespace_options_5_a_span.setAttribute('class','value');

whitespace_options_5_a.appendChild(whitespace_options_5_a_span);
whitespace_options_5.appendChild(whitespace_options_5_a);

whitespace_options_5.addEventListener('click',function(){
  tb(element,'ws',whitespace_options_5_a.innerText);
});

//---------------WhiteSpace Options End---------------------

whitespace_selected_a.appendChild(whitespace_selected_a_span);
whitespace_selected.appendChild(whitespace_selected_a);
whitespace_selected.appendChild(whitespace_customedit);

whitespace_options_ul.appendChild(whitespace_options_1);
whitespace_options_ul.appendChild(whitespace_options_2);
whitespace_options_ul.appendChild(whitespace_options_3);
whitespace_options_ul.appendChild(whitespace_options_4);
whitespace_options_ul.appendChild(whitespace_options_5);

//width increased due to free space in last right corner.

whitespace_options_1.style.width = '260px';
whitespace_options_2.style.width = '260px';
whitespace_options_3.style.width = '260px';
whitespace_options_4.style.width = '260px';
whitespace_options_5.style.width = '260px';

//---------------

whitespace_options.appendChild(whitespace_options_ul);

whitespace.appendChild(whitespace_selected);
whitespace.appendChild(whitespace_options);

//-----------------Event Handlers--------------------

whitespace_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(whitespace_options.style.display == 'block'){

    whitespace_options.style.display = 'none';
      whitespace_options_ul.style.display = 'none';

  }else{

    whitespace_options.style.display = 'block';
      whitespace_options_ul.style.display = 'block';

  }

  }else{

  }

});

//-----End WhiteSpace------


basicdiv.appendChild(fontsize);
basicdiv.appendChild(fontfamily);
basicdiv.appendChild(fontweight);
basicdiv.appendChild(fontstyle);
basicdiv.appendChild(fontvariant);
basicdiv.appendChild(fontstretch);
basicdiv.appendChild(textalign);
basicdiv.appendChild(textdecoration);
basicdiv.appendChild(textdecorationstyle);
basicdiv.appendChild(borderradius);
basicdiv.appendChild(fontcolor);
basicdiv.appendChild(backgroundcolor);
basicdiv.appendChild(bordercolor);
basicdiv.appendChild(bordersize);
basicdiv.appendChild(borderstyle);
basicdiv.appendChild(boxshadow);
basicdiv.appendChild(display);
basicdiv.appendChild(opacity);
basicdiv.appendChild(whitespace);

$('#panel').append(basicdiv);
setupRotate(element);
setupSkew(element);
setupScale(element);
setupSteps(element);
previewbox.appendChild(editbuttons);

setTimeout(function(){

  setupColorPicker('fcpb','fcps','preview'+element,'font','fcd','fcprgba','fcphex');
  setupColorPicker('bgcpb','bgcps','preview'+element,'background','bgcd','bgcprgba','bgcphex');
  setupColorPicker('bcpb','bcps','preview'+element,'border','bcd','bcprgba','bcphex');
  setupColorPicker('tdcpb','tdcps','preview'+element,'textdecorationcolor','tdcd','tdcprgba','tdcphex');
  setupColorPicker('boxscpb','boxscps','preview'+element,'boxshadowcolor','boxscd','boxscprgba','boxscphex');

},1000)

}

/*----------Elements----------*/

function updateelement(elementtype,attr,value){

var element = document.getElementById('preview'+elementtype);

if(attr == 'slidePercentage'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-percentage',value);
}

if(attr == 'slideAction1'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-one',value);
}

if(attr == 'slideAction1Value'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-one-value',value);
}

if(attr == 'slideAction2'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-two',value);
}

if(attr == 'slideAction2Value'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-two-value',value);
}

if(attr == 'slideAction3'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-three',value);
}

if(attr == 'slideAction3Value'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-three-value',value);
}

if(attr == 'slideAction4'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-four',value);
}

if(attr == 'slideAction4Value'){
  document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-four-value',value);
}

if(attr == 'animatedr'){
    element.style.animationDuration = value;
    $('.apelement').css('animation-duration',value)

    if(document.getElementById('rmadiv').style.opacity == '0.3'){}
    else{
      $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
    }

    $('.spinner').css('display','block');
    setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
}

if(attr == 'animated'){
    element.style.animationDelay = value;
    $('.apelement').css('animation-delay',value)

    if(document.getElementById('rmadiv').style.opacity == '0.3'){}
    else{
      $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
    }

    $('.spinner').css('display','block');
    setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
}

if(attr == 'animatei'){
    element.style.animationIterationCount = value;
    $('.apelement').css('animation-iteration-count',value)

    if(document.getElementById('rmadiv').style.opacity == '0.3'){}
    else{
      $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
    }

    $('.spinner').css('display','block');
    setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
}

if(attr == 'atiming'){
    var atimingcombobox_options = document.getElementById('timing').getElementsByTagName( 'options' )[0];

    element.style.animationTimingFunction = value;
    $('.apelement').css('animation-timing-function',value)

    if(document.getElementById('rmadiv').style.opacity == '0.3'){}
    else{
      $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
    }

    $('.spinner').css('display','block');
    setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);
    atimingcombobox_options.style.display = 'none';
    atimingcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontsize'){
  var fontsizecombobox_options = document.getElementById('fontsize').getElementsByTagName( 'options' )[0];

  element.style.fontSize = value;
  fontsizecombobox_options.style.display = 'none';
  fontsizecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

/*if(attr == 'fontcombination'){
    var fontcombination_options = document.getElementById('fontcombination').getElementsByTagName( 'options' )[0];

    element.style.fontFamily = value;
    fontcombination_options.style.display = 'none';
    fontcombination_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}*/

if(attr == 'googlefonts'){
  var googlefontscombobox_options = document.getElementById('googlefonts').getElementsByTagName( 'options' )[0];

  var newvalue = value.replace(/ /g,"_");
  element.style.fontFamily = newvalue;
  googlefontscombobox_options.style.display = 'none';
  googlefontscombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontfamily'){
  var fontfamilycombobox_options = document.getElementById('fontfamily').getElementsByTagName( 'options' )[0];

  element.style.fontFamily = value;
  fontfamilycombobox_options.style.display = 'none';
  fontfamilycombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontweight'){
  var fontweightcombobox_options = document.getElementById('fontweight').getElementsByTagName( 'options' )[0];

  element.style.fontWeight = value;
  fontweightcombobox_options.style.display = 'none';
  fontweightcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontstyle'){
  var fontstylecombobox_options = document.getElementById('fontstyle').getElementsByTagName( 'options' )[0];

  element.style.fontStyle = value;
  fontstylecombobox_options.style.display = 'none';
  fontstylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontvariant'){
  var fontvariantcombobox_options = document.getElementById('fontvariant').getElementsByTagName( 'options' )[0];

  element.style.fontVariant = value;
  fontvariantcombobox_options.style.display = 'none';
  fontvariantcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'fontstretch'){
  var fontstretchcombobox_options = document.getElementById('fontstretch').getElementsByTagName( 'options' )[0];

  element.style.fontStretch = value;
  fontstretchcombobox_options.style.display = 'none';
  fontstretchcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'textalign'){
  var textaligncombobox_options = document.getElementById('textalign').getElementsByTagName( 'options' )[0];

  element.style.textAlign = value;
  textaligncombobox_options.style.display = 'none';
  textaligncombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'textdecoration'){
  var textdecorationcombobox_options = document.getElementById('textdecoration').getElementsByTagName( 'options' )[0];
  var textdecorationcombobox_selected = document.getElementById('textdecoration').getElementsByTagName( 'selected' )[0];

  element.style.textDecoration = value;
  textdecorationcombobox_options.style.display = 'none';
  textdecorationcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

    textdecorationcombobox_selected.getElementsByTagName( 'colordisplay' )[0].style.display = 'none';

    textdecorationcombobox_selected.getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
    textdecorationcombobox_selected.getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.fontSize = '';
    textdecorationcombobox_selected.getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.width = '';
}

if(attr == 'textdecorationstyle'){
  var textdecorationstylecombobox_options = document.getElementById('textdecorationstyle').getElementsByTagName( 'options' )[0];

  element.style.textDecorationStyle = value;
  textdecorationstylecombobox_options.style.display = 'none';
  textdecorationstylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'borderradius'){
  var borderradiuscombobox_options = document.getElementById('borderradius').getElementsByTagName( 'options' )[0];

  element.style.borderRadius = value;
  borderradiuscombobox_options.style.display = 'none';
  borderradiuscombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'bordersize'){
  var bordersizecombobox_options = document.getElementById('bordersize').getElementsByTagName( 'options' )[0];

  element.style.border = value + ' solid';
  bordersizecombobox_options.style.display = 'none';
  bordersizecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'borderstyle'){
  var borderstylecombobox_options = document.getElementById('borderstyle').getElementsByTagName( 'options' )[0];

  element.style.borderStyle = value;
  borderstylecombobox_options.style.display = 'none';
  borderstylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'boxshadow'){
  var boxshadowcombobox_options = document.getElementById('boxshadow').getElementsByTagName( 'options' )[0];
  element.style.boxShadow = value;

}

if(attr == 'display'){
  var displaycombobox_options = document.getElementById('display').getElementsByTagName( 'options' )[0];

  element.style.display = value;
  displaycombobox_options.style.display = 'none';
  displaycombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

}

if(attr == 'opacity'){
  var opacitycombobox_options = document.getElementById('opacity').getElementsByTagName( 'options' )[0];
  element.style.opacity = value;

}

if(attr == 'whitespace'){
  var whitespacecombobox_options = document.getElementById('whitespace').getElementsByTagName( 'options' )[0];

  element.style.whiteSpace = value;
  whitespacecombobox_options.style.display = 'none';
  whitespacecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

}

if(attr == 'textshadow'){
  var textshadowcombobox_options = document.getElementById('boxshadow').getElementsByTagName( 'options' )[0];
  element.style.textShadow = value;
}

if(attr == 'outlinewidth'){
    element.style.outlineWidth = value;
}

if(attr == 'outlinestyle'){
    var outlinestylecombobox_options = document.getElementById('outlinestyle').getElementsByTagName( 'options' )[0];

    element.style.outlineStyle = value;
    outlinestylecombobox_options.style.display = 'none';
    outlinestylecombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';
}

if(attr == 'margintop'){
  element.style.marginTop = value;
}

if(attr == 'marginleft'){
  element.style.marginLeft = value;
}

if(attr == 'marginbottom'){
  element.style.marginBottom = value;
}

if(attr == 'marginright'){
  element.style.marginRight = value;
}

if(attr == 'paddingtop'){
    element.style.paddingTop = value;
}

if(attr == 'paddingleft'){
    element.style.paddingLeft = value;
}

if(attr == 'paddingbottom'){
    element.style.paddingBottom = value;
}

if(attr == 'paddingright'){
    element.style.paddingRight = value;
}

if(attr == 'letterspace'){
    element.style.letterSpacing = value;
}

if(attr == 'rotateX'){
  var rotateY = '';
  var rotateX = '';
  var skewY = '';
  var skewX = '';
  var scaleX = '';
  var scaleY = '';
  var parts = element.style.transform.split(' ');

  if(element.style.transform.includes('rotateX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateX')){
      rotateX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateY')){
      rotateY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewX')){
      skewX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewY')){
      skewY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleX')){
      scaleX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleY')){
      scaleY = parts[i];
    }
    };

  }

  element.style.transform = 'translate(-50%,-50%) ' + 'rotateX('+value+'deg)' + rotateY + skewX + skewY  + scaleX + scaleY;

}

if(attr == 'rotateY'){
  var rotateY = '';
  var rotateX = '';
  var skewY = '';
  var skewX = '';
  var scaleX = '';
  var scaleY = '';
  var parts = element.style.transform.split(' ');

  if(element.style.transform.includes('rotateX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateX')){
      rotateX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateY')){
      rotateY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewX')){
      skewX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewY')){
      skewY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleX')){
      scaleX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleY')){
      scaleY = parts[i];
    }
    };

  }

  element.style.transform = 'translate(-50%,-50%) ' + rotateX + 'rotateY('+value+'deg)' + skewX + skewY  + scaleX + scaleY;

}

if(attr == 'skewX'){
  var skewY = '';
  var skewX = '';
  var rotateY = '';
  var rotateX = '';
  var scaleX = '';
  var scaleY = '';
  var parts = element.style.transform.split(' ');

  if(element.style.transform.includes('skewX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewX')){
      skewX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewY')){
      skewY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateX')){
      rotateX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateY')){
      rotateY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleX')){
      scaleX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleY')){
      scaleY = parts[i];
    }
    };

  }

  element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + 'skewX('+value+'deg)' + skewY  + scaleX + scaleY;

}

if(attr == 'skewY'){
  var skewY = '';
  var skewX = '';
  var rotateY = '';
  var rotateX = '';
  var scaleX = '';
  var scaleY = '';
  var parts = element.style.transform.split(' ');

  if(element.style.transform.includes('skewX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewX')){
      skewX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewY')){
      skewY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateX')){
      rotateX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateY')){
      rotateY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleX')){
      scaleX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleY')){
      scaleY = parts[i];
    }
    };

  }

  element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + 'skewY('+value+'deg)' + scaleX + scaleY;

}

if(attr == 'scaleX'){
  var skewY = '';
  var skewX = '';
  var rotateY = '';
  var rotateX = '';
  var scaleY = '';
  var scaleX = '';
  var parts = element.style.transform.split(' ');

  if(element.style.transform.includes('scaleX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleX')){
      scaleX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleY')){
      scaleY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateX')){
      rotateX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateY')){
      rotateY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewX')){
      skewX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewY')){
      skewY = parts[i];
    }
    };

  }

  element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + skewY + 'scaleX('+value+')' + scaleY;

}

if(attr == 'scaleY'){
  var skewY = '';
  var skewX = '';
  var rotateY = '';
  var rotateX = '';
  var scaleY = '';
  var scaleX = '';
  var parts = element.style.transform.split(' ');

  if(element.style.transform.includes('scaleX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleX')){
      scaleX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('scaleY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('scaleY')){
      scaleY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateX')){
      rotateX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('rotateY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('rotateY')){
      rotateY = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewX')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewX')){
      skewX = parts[i];
    }
    };

  }

  if(element.style.transform.includes('skewY')){

    for(var i = 0; i < parts.length; ++i) {
    if(parts[i].includes('skewY')){
      skewY = parts[i];
    }
    };

  }

  element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + skewY + scaleX+ 'scaleY('+value+')';

}

}

/*----------Triggers----------*/

function tb(element,property,value){

  if(property == 'gff'){

  var googlefonts = document.getElementById('googlefonts');

  googlefonts.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Google Fonts: ' + value;
  googlefonts.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
  updateelement(element,'googlefonts',value);

  }

  if(property == 'fs'){

  var fontsize = document.getElementById('fontsize');

  fontsize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Size: ' + value;
  fontsize.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
  fontsize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';

  updateelement(element,'fontsize',value);

  }

    /*if(property == 'fc'){

    var fontcombination = document.getElementById('fontcombination');

    fontcombination.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Combination: ' + value;
    fontcombination.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';

    updateelement(element,'fontcombination',value);

    }*/

  if(property == 'ff'){

  var fontfamily = document.getElementById('fontfamily');

    fontfamily.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Family: ' + value;
  updateelement(element,'fontfamily',value);

  }

  if(property == 'fw'){

  var fontweight = document.getElementById('fontweight');

    fontweight.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Weight: ' + value;
  updateelement(element,'fontweight',value);

  }

  if(property == 'fst'){

  var fontstyle = document.getElementById('fontstyle');

    fontstyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Style: ' + value;
  updateelement(element,'fontstyle',value);

  }

  if(property == 'fv'){

  var fontvariant = document.getElementById('fontvariant');

    fontvariant.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Variant: ' + value;
  updateelement(element,'fontvariant',value);

  }

  if(property == 'fstr'){

  var fontstretch = document.getElementById('fontstretch');

    fontstretch.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Font Stretch: ' + value;
  updateelement(element,'fontstretch',value);

  }

  if(property == 'ta'){

  var textalign = document.getElementById('textalign');

    textalign.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Text Align: ' + value;
  updateelement(element,'textalign',value);

  }

  if(property == 'td'){

  var textdecoration = document.getElementById('textdecoration');

    textdecoration.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Text Decoration: ' + value;
  updateelement(element,'textdecoration',value);

  }

  if(property == 'tds'){

  var textdecorationstyle = document.getElementById('textdecorationstyle');

    textdecorationstyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Text Decoration Style: ' + value;
  updateelement(element,'textdecorationstyle',value);

  }

  if(property == 'br'){

  var borderradius = document.getElementById('borderradius');

    borderradius.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Border Radius: ' + value;
  borderradius.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
  borderradius.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
  updateelement(element,'borderradius',value);

  }

  if(property == 'bs'){

  var bordersize = document.getElementById('bordersize');

    bordersize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Border Size: ' + value;
  bordersize.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
  bordersize.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
  updateelement(element,'bordersize',value);

  }

  if(property == 'bsty'){

  var borderstyle = document.getElementById('borderstyle');

    borderstyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Border Style: ' + value;
  updateelement(element,'borderstyle',value);

  }

    if(property == 'osty'){
        var outlinestyle = document.getElementById('outlinestyle');

        outlinestyle.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Outline Style: ' + value;
        updateelement(element,'outlinestyle',value);
    }

  if(property == 'd'){

  var display = document.getElementById('display');

    display.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Display: ' + value;
  updateelement(element,'display',value);

  }

  if(property == 'ws'){

  var whitespace = document.getElementById('whitespace');

    whitespace.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'White Space: ' + value;
  whitespace.getElementsByTagName('selected')[0].getElementsByTagName('input')[0].style.display = 'none';
  whitespace.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
  updateelement(element,'whitespace',value);

  }

    if(property == 'bggex'){

    var endx = document.getElementById('endx');
    endx.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'End X: ' + value;

    var endxcombobox_options = document.getElementById('endx').getElementsByTagName( 'options' )[0];
    endxcombobox_options.style.display = 'none';
    endxcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

    document.getElementById('bggexvalue').innerText = value;

    }

    if(property == 'bggey'){

    var endy = document.getElementById('endy');
    endy.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'End Y: ' + value;

    var endycombobox_options = document.getElementById('endy').getElementsByTagName( 'options' )[0];
    endycombobox_options.style.display = 'none';
    endycombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

    document.getElementById('bggeyvalue').innerText = value;

    }

    if(property == 'animatet'){

    var timing = document.getElementById('timing');

    timing.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Timing: ' + value;
    timing.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
    updateelement(element,'atiming',value);

    }

}

function shape(el,sh){

var element = document.getElementById('preview'+el);

if(sh == 'square'){
  element.style.width = '125px';
  element.style.height = '125px';
  element.style.transform = 'translate(-50%,-50%)';
  element.style.borderRadius = '0px';
  element.style.border = '1px solid black';
  hints('hide','triangle');
}

if(sh == 'rectangle'){
  element.style.width = '175px';
  element.style.height = '100px';
  element.style.transform = 'translate(-50%,-50%)';
  element.style.borderRadius = '0px';
  element.style.border = '1px solid black';
  hints('hide','triangle');
}

if(sh == 'circle'){
  element.style.width = '150px';
  element.style.height = '150px';
  element.style.borderRadius = '50%';
  element.style.transform = 'translate(-50%,-50%)';
  element.style.border = '1px solid black';
  hints('hide','triangle');
}

if(sh == 'oval'){
  element.style.width = '225px';
  element.style.height = '125px';
  element.style.borderRadius = '50%';
  element.style.transform = 'translate(-50%,-50%)';
  element.style.border = '1px solid black';
  hints('hide','triangle');
}

if(sh == 'trapezoid'){
  element.style.width = '100px';
  element.style.height = '0px';
  element.style.borderBottom = '100px solid black';
  element.style.borderLeft = '50px solid transparent';
  element.style.borderRight = '50px solid transparent';
  element.style.transform = 'translate(-50%,-50%)';
  element.style.borderRadius = '0px';
  element.style.borderTop = '0px';
    element.style.padding = '0px';
  element.style.borderRadius = '0px';
  hints('hide','triangle');
  hints('show','trapezoid');
}

if(sh == 'parallelogram'){
  element.style.width = '175px';
  element.style.height = '125px';
  element.style.transform = 'translate(-50%,-50%) skewX(20deg)';
  element.style.borderRadius = '0px';
  element.style.border = '1px solid black';
  document.getElementById('skewbox').getElementsByTagName('div')[0].getElementsByTagName('input')[0].value = '20';
  hints('hide','triangle');
}

if(sh == 'triangle'){
  element.style.content = ' ';
  element.style.width = '0px';
    element.style.height = '0px';
    element.style.borderBottom = '140px solid '+element.style.borderColor;
    element.style.borderLeft = '70px solid transparent';
    element.style.borderRight = '70px solid transparent';
    element.style.transform = 'translate(-50%,-50%)';
    element.style.borderTop = '0px';
    element.style.padding = '0px';
  element.style.borderRadius = '0px';

  $('#bordercolor').find('hintlabel').remove();
  hints('show','triangle');

}

document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
setTimeout(function(){document.getElementsByClassName('shapechangediv')[0].style.display = 'none';},500);

}

function hints(action,shape){

if(shape == 'triangle' || shape == 'trapezoid'){
  if(action == 'show'){
       $('#bordercolor').find('hintlabel').remove();
       var hint = document.createElement('hintlabel');
       hint.innerText = 'Background Color';
       $('#bordercolor').append(hint);
       $('#bordercolor').css({'border':'1px solid darkred'});
       $('#backgroundcolor').css({'opacity':'0.5','pointer-events':'none'});
  }
  if(action == 'hide'){
       $('#bordercolor').find('hintlabel').remove();
       $('#bordercolor').css({'border':'0px'});
       $('#backgroundcolor').css({'opacity':'1','pointer-events':'unset'});
       $('#bcd').css({'backgroundColor':'white'});
  }
}

}

/*function eanimations(response){
    animations = response.success;
    for(var i = 0; i < animations.length; i++){
        ////console.log(animations[i] + ' => ' + encrypt(animations[i]));
        ea.push(/*encrypt(animations[i]/*));
    }
    //console.log(ea);
}*/

function theme(color){
    document.getElementById('panel').style.borderColor = color;
    $('banner').css({'background-color':color,'color':'white'});
}

function saveToStorage(elementtype){
  var token = localStorage.getItem('auth');
  var animationCSS = document.getElementById('textareaA').value;
  var elementCSS = document.getElementById('textareaE').value;
  var elementName = document.getElementById('elementName').value;
  var animationName = document.getElementById('animationName').value;

  if(animationCSS != ''){

  if(animationCSS.includes('preview')){
    animationCSS = animationCSS.replace('preview', animationName);
  }else{
    animationCSS = animationCSS.split("\n").slice(1).join("\n");
    animationCSS = '@keyframes '+ animationName + ' { \n' + animationCSS;
  }
  document.getElementById('textareaA').value = animationCSS;

  if(elementCSS.includes('animation-name')){
    elementCSS = elementCSS.replace(/^.*animation-name:.*$/mg, "animation-name: "+animationName+";");
  }else{
    elementCSS = elementCSS.replace('preview', animationName);
  }
  document.getElementById('textareaE').value = elementCSS;

  $.ajax({
    url:'http://localhost:8000/api/me/animation/add',
    type:'POST',
    dataType:'JSON',
    data:{'name':animationName,'css':animationCSS},
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
      request.setRequestHeader('Accept','application/json');
    },
    success: function(response){
      if(response.message == 'animation saved to your account.'){
        notification(response.message);
      }

      if(response.message == 'an error occured.'){
        notification('an error occured, please try again.');
      }

      if(response.message == 'Error, You have reached your daily quota for saving animations.'){
        notification('Error, you have reached your daily animation creation quota, wait until it resets in 24 hours.');
      }

      if(response.message == 'User md doesn\'t exist, please contact support.'){
        notification('There is a problem with your account, please contact support.');
      }

      if(response.message == 'Storage is full.'){
        notification('Error, there is no space left in your storage, please make some space and retry.');
      }

      $("#finish").remove();
      $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton').css({'opacity':'1','pointer-events':'unset'});
    },
  });

  }

  if(elementCSS != ''){

  elementCSS = elementCSS.split("\n").slice(1).join("\n");
  elementCSS = '.'+ elementName + ' { \n' + elementCSS;
  document.getElementById('textareaE').value = elementCSS;

  $.ajax({
    url:'http://localhost:8000/api/me/element/add',
    type:'POST',
    dataType:'JSON',
    data:{'name':elementName,'css':elementCSS,'type':elementtype},
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
      request.setRequestHeader('Accept','application/json');
    },
    success: function(response){
      if(response.message == 'element saved to your account.'){
        notification(response.message);
      }

      if(response.message == 'an error occured.'){
        notification('an error occured, please try again.');
      }

      if(response.message == 'User md doesn\'t exist, please contact support.'){
        notification('There is a problem with your account, please contact support.');
      }

      if(response.message == 'Storage is full.'){
        notification('Error, there is no space left in your storage, please make some space and retry.');
      }

      $("#finish").remove();
      $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton, #animationName, #elementName').css({'opacity':'1','pointer-events':'unset'});
    },
  });

  }
}

function getGoogleFonts(element,mode){
  var token = localStorage.getItem('auth');
  $.ajax({
    url:'http://localhost:8000/api/google/fonts',
    type:'get',
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
    success: function(response){
      loadGoogleFonts(response,element,mode);
    },
  });
}

function loadGoogleFonts(response,element,mode){

WebFonts = JSON.parse(response).items;
/*var googlefontsWorker = new Worker('https://amirqureshi.in/d/gfWorker.js');

googlefontsWorker.addEventListener('message', function(e) {
  //console.log(e.data);
});

googlefontsWorker.postMessage(response,element);*/

var fonts = document.createElement('combobox');
fonts.setAttribute('id','googlefonts');

if(mode == 'elementCreator'){
  fonts.style.left = '50%';
  fonts.style.top = '50%';
  fonts.style.marginTop = '25px';
  fonts.style.marginLeft = '0px';
  fonts.style.transform = 'translate(-50%,-50%)';
}

var fonts_customedit = document.createElement('input');
fonts_customedit.classList.add('custom');

var fonts_selected = document.createElement('selected');
var fonts_selected_a = document.createElement('a');
var fonts_selected_a_span = document.createElement('span');
fonts_selected_a_span.innerText = 'Google Fonts';

fonts_selected_a.style.borderTop = '#f4c20d 3px solid';
fonts_selected_a.style.borderRight = '#3cba54 3px solid';
fonts_selected_a.style.borderLeft = '#4885ed 3px solid';
fonts_selected_a.style.borderBottom = '#db3236 3px solid';

var fonts_options = document.createElement('options');
var fonts_options_ul = document.createElement('ul');
fonts_options_ul.style.overflowY = 'scroll';
fonts_options_ul.style.overflowX = 'hidden';
fonts_options_ul.style.height = '300px';
fonts_options_ul.style.top = '-315px';
fonts_options_ul.style.borderTopRightRadius = '10px';
fonts_options_ul.style.borderTopLeftRadius = '10px';
fonts_options_ul.style.borderBottomRightRadius = '0px';
fonts_options_ul.style.borderBottomLeftRadius = '0px';
fonts_options_ul.style.minWidth = '0';

if(mode == 'webpageBuilder'){
  fonts.style.marginTop = '0px';
  fonts_options_ul.style.height = '400px';
  fonts_options_ul.style.top = '60px';
  fonts_options_ul.style.borderTopRightRadius = '0px';
  fonts_options_ul.style.borderTopLeftRadius = '0px';
  fonts_options_ul.style.borderBottomRightRadius = '10px';
  fonts_options_ul.style.borderBottomLeftRadius = '10px';
}

      var items = JSON.parse(response).items;
      for(var i=0; i < items.length; i++){
        for(var o=0; o < items[i].variants.length; o++){

          var fontfamily = items[i].family + ' ' + items[i].variants[o];
          fontfamily = fontfamily.replace(/ /g,"_");

          /*var css = style.innerText + '\n' + '@font-face { \n' + 'font-family:' + fontfamily + ';\n'  + 'src: url("' + items[i].files[items[i].variants[o]] +'") ' + 'format("truetype"); \n' + '}';

          if(items[i].variants[o] == '100' || items[i].variants[o] == '200' || items[i].variants[o] == '300' || items[i].variants[o] == '400' || items[i].variants[o] == '500' || items[i].variants[o] == '600' || items[i].variants[o] == '700' || items[i].variants[o] == '800' || items[i].variants[o] == '900' || items[i].variants[o] == '1000' || items[i].variants[o] == 'bold' || items[i].variants[o] == 'bolder'){
            css = style.innerText + '\n' + '@font-face { \n' + 'font-family:' + fontfamily + ';\n'  + 'src: url("' + items[i].files[items[i].variants[o]] +'") ' + 'format("truetype"); \n' + 'font-weight: ' + items[i].variants[o] + ';\n' + '}';
          }

          if(items[i].variants[o] == '100italic' || items[i].variants[o] == '200italic' || items[i].variants[o] == '300italic' || items[i].variants[o] == '400italic' || items[i].variants[o] == '500italic' || items[i].variants[o] == '600italic' || items[i].variants[o] == '700italic' || items[i].variants[o] == '800italic' || items[i].variants[o] == '900italic' || items[i].variants[o] == '1000italic'){
            css = style.innerText + '\n' + '@font-face { \n' + 'font-family:' + fontfamily + ';\n'  + 'src: url("' + items[i].files[items[i].variants[o]] +'") ' + 'format("truetype"); \n' + 'font-weight: ' + items[i].variants[o].split('italic')[0] + ';\n' + 'font-style: italic; \n' + '}';
          }

          stylecss = stylecss + css;*/

          var fonts_options_1 = document.createElement('li');

          var fonts_options_1_a = document.createElement('a');
          fonts_options_1_a.innerText = items[i].family + ' ' + items[i].variants[o];

          var fonts_options_1_a_span = document.createElement('span');
          fonts_options_1_a_span.innerText = items[i].family + ' ' + items[i].variants[o];
          fonts_options_1_a_span.setAttribute('class','value');

          fonts_options_1_a.appendChild(fonts_options_1_a_span);
          fonts_options_1.appendChild(fonts_options_1_a);

          if(mode == 'elementCreator'){
            fonts_options_1.addEventListener('click',function(){
              tb(element,'gff',this.getElementsByTagName('a')[0].innerText);
            });
          }else{
            if(mode == 'webpageBuilder'){
              (function(fontfamily,fonts_options_1,element,fonts_selected_a_span,fonts_options){
                fonts_options_1.addEventListener('click',function(){
                  element.style.fontFamily = fontfamily;
                  fonts_selected_a_span.innerText = 'Google Fonts: '+fontfamily;
                  fonts_options.style.display = 'none';
                });
              })(fontfamily,fonts_options_1,element,fonts_selected_a_span,fonts_options);
            }
          }

          (function(fontfamily,fonts_options_1_a,element,fonts_options_ul){

            if(mode == 'elementCreator'){
              fonts_options_1.addEventListener('mouseover',function(){
               fonts_options_1_a.style.fontFamily = fontfamily;
               document.getElementById('preview'+element).style.fontFamily = fontfamily;
              });
            }else{
              fonts_options_1.addEventListener('mouseover',function(){
               fonts_options_1_a.style.fontFamily = fontfamily;
               element.style.fontFamily = fontfamily;
              });
            }

            fonts_options_1.addEventListener('mouseout',function(){
             fonts_options_1_a.style.fontFamily = 'sans-serif';
            });

          })(fontfamily,fonts_options_1_a,element,fonts_options_ul);

          fonts_options_ul.appendChild(fonts_options_1);
        }
      }

fonts_selected_a.appendChild(fonts_selected_a_span);
fonts_selected.appendChild(fonts_selected_a);
//fonts_selected.appendChild(fonts_customedit);

fonts_options.appendChild(fonts_options_ul);

fonts.appendChild(fonts_selected);
fonts.appendChild(fonts_options);

//-----------------Event Handlers--------------------

fonts_selected_a_span.addEventListener('click',function(e){

  if(e.target == this){

  if(fonts_options.style.display == 'block'){

    fonts_options.style.display = 'none';
      fonts_options_ul.style.display = 'none';
      //fonts_customedit.style.display = 'none';
      fonts_selected_a_span.style.textAlign = '';

  }else{

    fonts_options.style.display = 'block';
      fonts_options_ul.style.display = 'block';
      //fonts_customedit.style.display = 'block';
      fonts_selected_a_span.style.textAlign = 'left';

  }

  }else{

  }

});

var style = document.createElement('link');
style.href = '../assets/css/fonts.css';
style.rel = 'stylesheet';
style.type = 'text/css';

$('head').append(style);

if(mode == 'elementCreator'){
  setTimeout(function(){document.getElementById('googlefontssdiv').appendChild(fonts);},5500);
}else{
  if(mode == 'webpageBuilder'){
    setTimeout(function(){document.getElementsByClassName('fontManager')[0].appendChild(fonts); document.getElementsByClassName('fontManager')[0].style.display = 'inline-block'; progress.hide();},5500);
  }
}

}

//-------------ColorPicker--------------

function setupColorPicker(boxid,stripid,forid,property,displayinvoker,rgbainput,hexinput){

var applyto;

if(forid == '.selected'){
  applyto = document.getElementsByClassName('selected')[0];
}else{
  applyto = document.getElementById(forid);
}
var display = document.getElementById(displayinvoker);

var box = document.getElementById(boxid);
var box2d = box.getContext('2d');
var boxwidth = box.width;
var boxheight = box.height;

var strip = document.getElementById(stripid);
var strip2d = strip.getContext('2d');
var stripwidth = strip.width;
var stripheight = strip.height;

var xaxis = 0;
var yaxis = 0;
var isdragging = false;
var rgba = 'rgba(255,0,0,1)';

box.addEventListener("mousedown", down, false);
box.addEventListener("mouseup", up, false);
strip.addEventListener("click", click, false);
box.addEventListener("mousemove", move, false);

box2d.rect(0, 0, boxwidth, boxheight);
fillGradient();

strip2d.rect(0, 0, stripwidth, stripheight);
var gradientone = strip2d.createLinearGradient(0, 0, stripwidth, 0);
gradientone.addColorStop(0, 'rgba(255, 0, 0, 1)');
gradientone.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
gradientone.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
gradientone.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
gradientone.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
gradientone.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
gradientone.addColorStop(1, 'rgba(255, 0, 0, 1)');
strip2d.fillStyle = gradientone;
strip2d.fill();

function click(e) {
  xaxis = e.offsetX;
  yaxis = e.offsetY;
  var imagedata = strip2d.getImageData(xaxis, yaxis, 1, 1).data;
  rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  box2d.fillStyle = rgba;
  box2d.fillRect(0, 0, boxwidth, boxheight);

  var gradientwhite = strip2d.createLinearGradient(0, 0, boxheight, 0);
  gradientwhite.addColorStop(0, 'rgba(255,255,255,1)');
  gradientwhite.addColorStop(1, 'rgba(255,255,255,0)');
  box2d.fillStyle = gradientwhite;
  box2d.fillRect(0, 0, boxwidth, boxheight);

  var gradientblack = strip2d.createLinearGradient(0, 0, 0, boxheight);
  gradientblack.addColorStop(0, 'rgba(0,0,0,0)');
  gradientblack.addColorStop(1, 'rgba(0,0,0,1)');
  box2d.fillStyle = gradientblack;
  box2d.fillRect(0, 0, boxwidth, boxheight);
}

function down(e) {
  isdragging = true;
  color(e);
}

function move(e) {
  if (isdragging) {
    color(e);
  }
}

function up(e) {
  isdragging = false;
}

function color(e) {
  xaxis = e.offsetX;
  yaxis = e.offsetY;
  var imagedata = box2d.getImageData(xaxis, yaxis, 1, 1).data;
  rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';
  var hexfromrgba = rgb2hex(rgba);
  //console.log(rgba+' => '+hexfromrgba);

  if(boxid.includes('animate') || stripid.includes('animate')){
    dataAttributeBalancer('slide'+displayinvoker,rgba);
  }else{

  if(property == 'background'){
    applyto.style.backgroundColor = rgba;
  }

  if(property == 'font'){
    applyto.style.color = rgba;
  }

  if(property == 'border'){
    if(applyto.style.borderColor != ''){
      applyto.style.bordercolor = '';
      applyto.style.borderColor = rgba;
    }else{
      if(applyto.style.borderBottomColor != ''){
         applyto.style.borderBottomColor = rgba;
        }else{
         applyto.style.bordercolor = '';
         applyto.style.borderColor = rgba;
        }
    }
  }

  if(property == 'textdecorationcolor'){
    applyto.style.textDecorationColor = rgba;
  }

  if(property == 'boxshadowcolor'){
    var currentboxshadow = applyto.style.boxShadow;

    if(currentboxshadow.includes('rgb')){
      var newboxshadow = applyto.style.boxShadow.split(')')[1];
        applyto.style.boxShadow = rgba + newboxshadow;
    }else{
      var newboxshadow = applyto.style.boxShadow;
        applyto.style.boxShadow = rgba + newboxshadow;
    }

  }

  if(property == 'textshadowcolor'){
    var currenttextshadow = applyto.style.textShadow;

    if(currenttextshadow.includes('rgb')){
      var newtextshadow = applyto.style.textShadow.split(')')[1];
        applyto.style.textShadow = rgba + newtextshadow;
    }else{
      var newtextshadow = applyto.style.textShadow;
        applyto.style.textShadow = rgba + newtextshadow;
    }
   }

  if(property == 'outlinecolor'){
     applyto.style.outlineColor = rgba;
   }

  }

   display.style.backgroundColor = rgba;
   document.getElementById(rgbainput).value = 'Color Rgba: ' + rgba;
   document.getElementById(hexinput).value = 'Color Hex: ' + rgb2hex(rgba);

}

}

function textToColorPickerColor(e,property,elem){

var colorpicker_box = e.parentElement.getElementsByClassName('colorpickerbox')[0];
var colordisplay = e.parentElement.parentElement.getElementsByTagName('colordisplay')[0];

if(elem == '.selected'){
  var element = document.getElementsByClassName('selected')[0];
}else{
  var element = document.getElementById('preview'+elem);
}

var color;

var text = e.value;

if(text.includes('Color Rgba:') || text.includes('Color Hex:')){
	color = text.split(':')[1];
}else{
	if(text.includes('(') || text.includes(')') || text.includes('rgba')){
		color = 'rgba('+text.split('(')[1];
	}

	if(text.includes('#')){
		color = text;
	}
}

colordisplay.style.backgroundColor = color;

if(text.includes('Color Rgba:') || text.includes('(') || text.includes(')') || text.includes('rgba')){
	e.value = 'Color Rgba: rgba('+text.split('(')[1];
}else{
	if(text.includes('#')){
		e.value = 'Color Hex: #'+text.split('#')[1];
	}
}

if(property.includes('animation') || property.includes('backgroundGradient')){

}else{
	$(element).css(property,color);
}

}

//-----------End ColorPicker------------

function applybgg(e){
    var p = 'to ' + document.getElementById('bggeyvalue').innerText + ' ' +document.getElementById('bggexvalue').innerText;
    var c1 = document.getElementById('bggc1cd').style.backgroundColor;
    var c2 = document.getElementById('bggc2cd').style.backgroundColor;
    document.getElementById(e).style.background = 'linear-gradient('+p+','+c1+','+c2+')';
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function shuffleArray(array){
    var counter = array.length, temp, index;
    // While there are elements in the array
    while ( counter > 0 ) {
        // Pick a random index
        index = Math.floor( Math.random() * counter );

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[ counter ];
        array[ counter ] = array[ index ];
        array[ index ] = temp;
    }
    return array;
}

function encrypt(toencrypt) {
  var result = "";
  for (var i = 0; i < toencrypt.length; i++) {
    var code = toencrypt.toUpperCase().charCodeAt(i)
    if (code > 64 && code < 91) result += (code - 64);
  }

  return result.slice(0, result.length - 1);
}

function decrypt(todecrypt){
    var r = (todecrypt + 9).toString(36).toUpperCase();
    return r;
}

function saveTextAsFile()
{
  var text = document.getElementById("textareaE").value + '\n' + '\n' + document.getElementById("textareaA").value;
  var textFileAsBlob = new Blob([text], {type:'text/plain'});
  var fileName = 'Css Stylesheet';

  var downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null)
  {
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else
  {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function destroyClickedElement(event)
{
  document.body.removeChild(event.target);
}

function notification(text){

var notification = document.createElement('notification');
var notification_heading = document.createElement('p');
notification_heading.setAttribute('class','heading');
var notification_message = document.createElement('p');
notification_message.setAttribute('class','message');
notification_message.innerText = text;

if(text.includes('saved') || text.includes('Saved')){
  notification_heading.innerText = 'Saved';
  notification_heading.style.color = 'Green';
  notification.style.border = '2px solid Green';
  notification.style.borderBottom = '15px solid Green';
}

if(text.includes('successfully') || ('Successfully')){
  notification_heading.innerText = 'Success';
  notification_heading.style.color = 'Green';
  notification.style.border = '2px solid Green';
  notification.style.borderBottom = '15px solid Green';
}

if(text.includes('error') || text.includes('Error')){
  notification_heading.innerText = 'Error';
  notification_heading.style.color = 'DarkRed';
  notification.style.border = '2px solid DarkRed';
  notification.style.borderBottom = '15px solid DarkRed';
}

notification.appendChild(notification_heading);
notification.appendChild(notification_message);

notification.addEventListener('click',function(){
  this.remove();
});

$('body').append(notification);

}

function getAnimations(){

token = localStorage.getItem("auth");
$.ajax({
        url:'http://localhost:8000/api/me/fetch/readymateanimations',
        type:'GET',
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer '+token);
            request.setRequestHeader('Accept', 'application/json');
        },
        success: function(response){
          animations = response.success;
        },
        error: function(response){
          notification('Error, could not load animations. Please retry after some time.');
        }
});

}

function logout(){
  localStorage.removeItem('auth');
  window.location.href = '../home/';
}


function exF_animate(element,createnew){
  animate(element,createnew);
}

function isMember(response){

if(moment(response.success.expires_at).isBefore(moment.utc().format('YYYY-MM-DD HH:mm:ss'))){
  return false;
}else{
  return true;
}

}

function notice(type,date){

var notice = document.createElement('notice');
var heading = document.createElement('p');
var message = document.createElement('p');
var close = document.createElement('i');

close.addEventListener('click',function(){
  $('#profileTabs').css({'opacity':'1','pointer-events':'unset'});
  //$('#upgp').css({'opacity':'1','pointer-events':'unset'});
  $('#ptHistory').css({'opacity':'1','pointer-events':'unset'});
  $('#ptGeneral').css({'opacity':'1','pointer-events':'unset'});
  notice.remove();
});

heading.setAttribute('class','heading');
message.setAttribute('class','message');
close.setAttribute('class','fas fa-times close');

if(type == 'plan-expired'){
  heading.innerText = 'Plan Expiry Notice';
  message.innerText = 'Dear user, your membership has expired on '+date+'. You have lost access to premium features. You can upgrade your account to continue using premium features.'+'\n\n'+'Redirecting you to profile page...';
}

//notice.appendChild(close);
notice.appendChild(heading);
notice.appendChild(message);
document.getElementsByTagName('body')[0].appendChild(notice);

setTimeout(function(){
  $('#profileTabs').css({'opacity':'0.5','pointer-events':'none'});
  //$('#upgp').css({'opacity':'0.5','pointer-events':'none'});
  $('#ptHistory').css({'opacity':'0.5','pointer-events':'none'});
  $('#ptGeneral').css({'opacity':'0.5','pointer-events':'none'});
},1000);

}
