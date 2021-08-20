function replaceAllInString(str, find) {
    return str.replace(new RegExp('/'+find+"^\S+/", 'g'), '');
}
