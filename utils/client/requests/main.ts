import axios from "axios";

/** 不得使用deleteCookie删除HTTPOnly的cookie */
async function logout(redirectURL = "") {
    await axios.get("/api/auth/logout");
    redirectURL ? (window.location.href = redirectURL) : window.location.reload();
}

export { logout };
