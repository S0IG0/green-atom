import Comment from "../store/entities/Comment";
import Store from "../store/store";

export default ({user, content, setContent, idArticle}) => {
    return (
        <>
            <form className='add-comment mt-5'>
                <div className='form-label'>Username</div>
                <input type="text" value={user.username}
                       disabled={true}
                       className='form-control'/>
                <div className='form-label'>You comment</div>
                <textarea value={content}
                          className='form-control'
                          onChange={event => setContent(event.target.value)}></textarea>
                <button type='button' className='btn btn-primary mt-3' onClick={() => {
                    const comment = new Comment(user.id, idArticle, content);
                    Store.addComment(comment);
                    Store.addCommentToArticle(comment.id, idArticle)
                    setContent('')
                }}
                        disabled={content === ''}>Add comment
                </button>
            </form>
        </>
    )
}