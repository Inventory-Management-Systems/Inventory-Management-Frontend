export const isLoggedIn = () => {
    let user = localStorage.getItem("user");
    if (user != null) {
        return true;
    }
    else {
        return false;
    }
}
