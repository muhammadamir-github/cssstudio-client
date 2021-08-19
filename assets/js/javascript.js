const global_host = "http://localhost:8000";

var draggingelementofid;
var WebFonts = '';
var plan = '';
var animations = [''];
var shuffledanimations = shuffleArray(animations);
var ea = [];
var token = '';
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

var validate = new Validator;

//------------------------------------------------------------------

var elementDuplicator = new Duplicator;

//------------------------------------------------------------------

var checkElement = new ElementPresenceChecker;

//------------------------------------------------------------------

var elementStyles = new ElementStyleChanger;

//------------------------------------------------------------------

var fontAwesomeSelector = new FontAwesomeIcons;

//------------------------------------------------------------------

var mediaEditor = new UserMediaEditor;

//------------------------------------------------------------------

var mediaManager = new UserMediaManager;

//------------------------------------------------------------------

var elementEditor = new ElementsEditor;

//------------------------------------------------------------------

var elementSpecialOptionsHandler = new ElementOptions;

//------------------------------------------------------------------

var randomize = new Randomizer;
var calculator = new MathCalculator;

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

var backgroundImageManager = new BackgroundIManager;
var VideoManager = new VideosManager;

//------------------------------------------------------------------

var styler = new MiniStyler;
var fontmanager = new FontsManager;

//------------------------------------------------------------------

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

var tools = new WebPageBuilderTools;

//------------------------------------------------------------------

var site = new SitePreview;

//------------------------------------------------------------------

var pagebuilder = new WebPageBuilder;

//------------------------------------------------------------------

function planExpired(response){
  document.getElementsByTagName('loader')[0].remove();
  var exatExpiry = moment(response.success.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
  Globals.membershipHandler.notice('plan-expired',exatExpiry);

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
	     Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'textShadowColor',element);
    });

    var textshadow_colorpicker_input_hex = document.createElement('input');
    textshadow_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
    textshadow_colorpicker_input_hex.setAttribute('id','textscphex');
    textshadow_colorpicker_input_hex.addEventListener('input',function(){
	     Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'textShadowColor',element);
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
	Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'outline-color',element);
});

var outlinecolor_colorpicker_input_hex = document.createElement('input');
outlinecolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
outlinecolor_colorpicker_input_hex.setAttribute('id','ocphex');
outlinecolor_colorpicker_input_hex.addEventListener('input',function(){
	Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'outline-color',element);
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
	   Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'backgroundGradient1',element);
     });

     var color1_colorpicker_input_hex = document.createElement('input');
     color1_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
     color1_colorpicker_input_hex.setAttribute('id','bggc1cphex');
     color1_colorpicker_input_hex.addEventListener('input',function(){
	   Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'backgroundGradient1',element);
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
	   Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'backgroundGradient2',element);
     });

     var color2_colorpicker_input_hex = document.createElement('input');
     color2_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
     color2_colorpicker_input_hex.setAttribute('id','bggc2cphex');
     color2_colorpicker_input_hex.addEventListener('input',function(){
	   Globals.pageHandler.jadgetPanel.textToColorPickerColor(this,'backgroundGradient2',element);
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

	    Globals.pageHandler.jadgetPanel.setupColorPicker('textscpb','textscps','preview'+element,'textshadowcolor','textscd','textscprgba','textscphex');
	    Globals.pageHandler.jadgetPanel.setupColorPicker('bggc1cpb','bggc1cps','preview'+element,'backgroundgradient1','bggc1cd','bggc1cprgba','bggc1cphex');
	    Globals.pageHandler.jadgetPanel.setupColorPicker('bggc2cpb','bggc2cps','preview'+element,'backgroundgradient2','bggc2cd','bggc2cprgba','bggc2cphex');
	    Globals.pageHandler.jadgetPanel.setupColorPicker('ocpb','ocps','preview'+element,'outlinecolor','ocd','ocprgba','ocphex');


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
      Globals.notificationHandler.new('Error, please enter animation and element names.');
      return;
    }

    if(eName.value == '' || eName.value == null){
      Globals.notificationHandler.new('Error, please enter element name.');
      return;
    }

    if(aName.value == '' || aName.value == null){
      Globals.notificationHandler.new('Error, please enter animation name.');
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
      Globals.notificationHandler.new('Error, please enter element name.');
    }
  }

  if(finishdiv_textarea_animation.value !== '' && finishdiv_textarea_element.value == ''){
    if(aName.value !== ''){
      saveToStorage(element);
    }else{
      Globals.notificationHandler.new('Error, please enter animation name.');
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
        Globals.notificationHandler.new(response.message);
      }

      if(response.message == 'an error occured.'){
        Globals.notificationHandler.new('an error occured, please try again.');
      }

      if(response.message == 'Error, You have reached your daily quota for saving animations.'){
        Globals.notificationHandler.new('Error, you have reached your daily animation creation quota, wait until it resets in 24 hours.');
      }

      if(response.message == 'User md doesn\'t exist, please contact support.'){
        Globals.notificationHandler.new('There is a problem with your account, please contact support.');
      }

      if(response.message == 'Storage is full.'){
        Globals.notificationHandler.new('Error, there is no space left in your storage, please make some space and retry.');
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
        Globals.notificationHandler.new(response.message);
      }

      if(response.message == 'an error occured.'){
        Globals.notificationHandler.new('an error occured, please try again.');
      }

      if(response.message == 'User md doesn\'t exist, please contact support.'){
        Globals.notificationHandler.new('There is a problem with your account, please contact support.');
      }

      if(response.message == 'Storage is full.'){
        Globals.notificationHandler.new('Error, there is no space left in your storage, please make some space and retry.');
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

function exF_animate(element,createnew){
  animate(element,createnew);
}
