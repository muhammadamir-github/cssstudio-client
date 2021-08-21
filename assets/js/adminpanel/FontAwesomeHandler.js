class FontAwesomeHandler{
    constructor(){}

    icon(keyword){
        var Class = '';

        if(keyword == 'username'){
            Class = 'fas fa-signature';
        }

        if(keyword == 'email'){
            Class = 'fas fa-at';
        }

        if(keyword == 'ip address'){
            Class = 'fas fa-eye';
        }

        if(keyword == 'last visit'){
            Class = 'fas fa-person-booth';
        }

        if(keyword == 'storage'){
            Class = 'fas fa-archive';
        }

        if(keyword == 'total animations'){
            Class = 'fas fa-walking';
        }

        if(keyword == 'total elements'){
            Class = 'fas fa-vector-square';
        }

        if(keyword == 'membership plan'){
            Class = 'fas fa-trophy';
        }

        if(keyword == 'membership expires/expired'){
            Class = 'fas fa-calendar-day';
        }

        if(keyword == 'total completed payments'){
            Class = 'fas fa-cash-register';
        }

        if(keyword == 'total money spent'){
            Class = 'fas fa-money-check-alt';
        }

        if(keyword == 'total payments'){
            Class = 'fas fa-shopping-cart';
        }

        if(keyword == 'total tickets'){
            Class = 'fas fa-plus';
        }

        if(keyword == 'total tickets open'){
            Class = 'fas fa-spinner';
        }

        if(keyword == 'total tickets closed'){
            Class = 'fas fa-check';
        }

        if(keyword == 'continent'){
            Class = 'fas fa-globe-europe';
        }

        if(keyword == 'country'){
            Class = 'fas fa-flag';
        }

        if(keyword == 'region'){
            Class = 'fas fa-map-marked-alt';
        }

        if(keyword == 'zip'){
            Class = 'fas fa-map-marker-alt';
        }

        if(keyword == 'location latitude' || keyword == 'location longitude'){
            Class = 'fas fa-search-location';
        }

        return Class;
    }
}
