console.clear();

function validate() {
    if (document.getElementsByName("firstName")[0].value == "") {
        document.getElementsByName("firstName")[0].focus();
        return false;
    }
    else if (document.getElementsByName("lastName")[0].value == "") {
        document.getElementsByName("lastName")[0].focus();
        return false;
    }
    else if (document.getElementsByName("mobile")[0].value == "") {
        document.getElementsByName("mobile")[0].focus();
        return false;
    }
    else if (document.getElementsByName("relationship")[0].value == "") {
        document.getElementsByName("relationship")[0].focus();
        return false;
    }
}

validate();