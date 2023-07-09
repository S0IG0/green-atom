import {makeAutoObservable} from "mobx";
import User from "./entities/User";

const _findIndexArticleById = Symbol('findIndexArticleById');
const _findIndexCommentById = Symbol('findIndexCommentById');
const _findIndexUserById = Symbol('findIndexUserById');
const _findIndexUserByUsernameAndPassword = Symbol('findIndexUserByUsernameAndPassword');
const _loadFromLocalStorage = Symbol('loadFromLocalStorage');
export const keys = [
    'users',
    'articles',
    'comments',
];

class Store {
    isAuth = false;
    currentUser = undefined;
    users = [
        new User('anonymous', '', -1),
    ];
    articles = [];
    comments = [];

    constructor() {
        makeAutoObservable(this);
        this[_loadFromLocalStorage]();
        this.articles.map(article => article.createDate = new Date(article.createDate));
    }

    [_findIndexArticleById](idArticle) {
        return this.articles.findIndex((article) => article.id === idArticle);
    }

    [_findIndexCommentById](idComment) {
        return this.comments.findIndex((comment) => comment.id === idComment);
    }

    [_findIndexUserById](idUser) {
        return this.users.findIndex((user) => user.id === idUser);
    }

    [_findIndexUserByUsernameAndPassword](username, password) {
        return this.users.findIndex((user) => user.username === username && user.password === password)
    }

    getArticleById(idArticle) {
        const index = this[_findIndexArticleById](idArticle);
        if (index !== -1) {
            return this.articles[index];
        } else {
            return undefined;
        }
    }

    getCommentById(idComment) {
        const index = this[_findIndexCommentById](idComment);
        if (index !== -1) {
            return this.comments[index];
        } else {
            return undefined;
        }
    }

    getUserById(idUser) {
        const index = this[_findIndexUserById](idUser);
        if (index !== -1) {
            return this.users[index];
        } else {
            return undefined;
        }
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    addUser(user) {
        const index = this.users.findIndex((item) => item.username === user.username);
        if (index !== -1) {
            throw new Error('A user with this username already exists');
        }

        this.users.push(user);
    }

    addArticle(article) {
        const index = this[_findIndexArticleById](article.id);
        if (index !== -1) {
            this.updateArticle(article.id, article);
        } else {
            this.articles.push(article);
        }
    }

    removeArticleById(idArticle) {
        const index = this[_findIndexArticleById](idArticle);
        if (index !== -1) {
            const article = this.articles[index];
            this.articles.splice(index, 1);
            article.commentsId.map(idComment => this.removeCommentById(idComment));
        }
    }

    removeCommentById(idComment) {
        const index = this[_findIndexCommentById](idComment);
        if (index !== -1) {
            this.comments.splice(index, 1);
        }
    }

    updateArticle(idArticle, article) {
        const index = this[_findIndexArticleById](idArticle);
        if (index !== -1) {
            this.articles[index] = article;
        }
    }

    addLikeToArticle(idArticle) {
        const index = this[_findIndexArticleById](idArticle);
        if (index !== -1) {
            this.articles[index].countLikes++;
        }
    }

    addCommentToArticle(idComment, idArticle) {
        const index = this[_findIndexArticleById](idArticle);
        if (index !== -1) {
            this.articles[index].commentsId.push(idComment);
        }
    }

    login(user) {
        const index = this[_findIndexUserByUsernameAndPassword](user.username, user.password);

        if (index !== -1) {
            this.currentUser = this.users[index];
        } else {
            this.addUser(user);
            this.currentUser = user;
        }
        this.isAuth = true;
    }

    logout() {
        this.isAuth = false;
        this.currentUser = undefined;
        localStorage.removeItem('currentUser');
    }

    [_loadFromLocalStorage]() {
        for (let key of keys) {
            const data = localStorage.getItem(key);
            if (data) {
                this[key] = JSON.parse(data);
            }
        }
        let data = localStorage.getItem('isAuth');
        if (data) {
            this.isAuth = JSON.parse(data);
        }
        data = localStorage.getItem('currentUser');
        if (data && data !== 'undefined') {
            this.currentUser = JSON.parse(data);
        }
    }

}

export default new Store();