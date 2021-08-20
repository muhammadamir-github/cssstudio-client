function encrypt(toencrypt) {
    var result = "";
    for (var i = 0; i < toencrypt.length; i++) {
        var code = toencrypt.toUpperCase().charCodeAt(i)
        if (code > 64 && code < 91) result += (code - 64);
    }

    return result.slice(0, result.length - 1);
}
