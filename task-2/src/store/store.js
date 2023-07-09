import { makeAutoObservable } from "mobx";

class SearchStore {
    value = "";
    continue = undefined;
    articles = [];
    isNone = true;

    constructor() {
        makeAutoObservable(this);
    }

    setValue(value) {
        this.value = value;
    }

    setContinue(continueValue) {
        this.continue = continueValue;
    }

    setArticles(articles) {
        this.articles = articles;
    }

    setIsNone(isNone) {
        this.isNone = isNone;
    }
}

export default new SearchStore();
