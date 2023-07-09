import {Link} from "react-router-dom";

export default ({article, children}) => {
    return (
        <>
            <div className="card mb-4">
                <div className="card-header">
                    <div className='card-title text-truncate overflow-hidden fs-5'>{article.title}</div>
                </div>
                <div className="card-body">
                    <p className="card-text text-truncate overflow-hidden">{article.content}</p>
                    <Link className='btn btn-primary' to={`/article/${article.id}`}>Read</Link>
                    {children}
                </div>
            </div>
        </>
    )
}