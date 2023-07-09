import Store from "../store/store";

export default ({commentsId}) => {
    return (
        <>
            <ul className='comments list-group list-group-flush mt-5'>
                {commentsId.map(idComment => {
                    const comment = Store.getCommentById(idComment);
                    const owner = Store.getUserById(comment.ownerId);
                    return (
                        <li className='comment list-group-item' key={idComment}>
                            <div className='owner'>
                                Commentator - {owner.username}
                            </div>
                            <div className='content'>
                                {comment.content}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}