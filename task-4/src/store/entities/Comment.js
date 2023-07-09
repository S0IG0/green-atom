class Comment {
    constructor(ownerId, articleId, content) {
        if (ownerId !== undefined && articleId !== undefined && content !== undefined) {
            this.ownerId = ownerId;
            this.articleId = articleId;
            this.content = content;
            this.id = new Date() / 1;
        } else {
            throw new Error('{ownerId, articleId, content} is not valid');
        }
    }
}

export default Comment;