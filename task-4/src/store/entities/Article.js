class Article {
    constructor(ownerId, title, content) {
        if (ownerId !== undefined && title !== undefined && content !== undefined) {
            this.ownerId = ownerId;
            this.title = title;
            this.content = content;
            this.countLikes = 0;
            this.createDate = new Date();
            this.id = new Date() / 1;
            this.commentsId = [];
        } else {
            throw new Error('{ownerId, title, content} is not valid');
        }
    }
}

export default Article;