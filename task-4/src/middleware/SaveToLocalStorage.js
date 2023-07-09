import {reaction} from "mobx";
import Store, {keys} from "../store/store";

export const saveToLocalStorage = reaction(
    () => ({
        users: Store.users.map(user => ({...user})),
        articles: Store.articles.map(article => ({...article})),
        comments: Store.comments.map(comment => ({...comment}))
    }),
    data => {
        console.log("Middleware triggered:", data);

        for (let key of keys) {
            const stringify = JSON.stringify(data[key]);
            localStorage.setItem(key, stringify);
        }
    }
);

export const saveToLocalStorageIsAuthAndCurrentUser = reaction(
    () => ({
        isAuth: Store.isAuth,
        currentUser: Store.currentUser,
    }),
    ({isAuth, currentUser}) => {
        console.log("Middleware triggered: isAuth =", isAuth, "currentUser =", currentUser);
        let stringify = JSON.stringify(isAuth);
        localStorage.setItem('isAuth', stringify);
        stringify = JSON.stringify(currentUser);
        localStorage.setItem('currentUser', stringify);
    }
);