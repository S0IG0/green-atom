import Store from "../store/store";
import {observer} from "mobx-react-lite";

export default observer(({article, children}) => {
    return (
        <>
            <div className='text-center mt-5'>
                <div className='card w-50 m-auto mt-2 p-2'>
                    <div className='title fs-1 text-center mt-2'>{article.title}</div>
                    <div className='content text-start'>{article.content}</div>
                </div>
            </div>
            <div className='w-50 m-auto text-end'>
                {article.createDate.toUTCString()}
            </div>
            <div className='w-50 m-auto'>
                <button type="button"
                        onClick={() => Store.addLikeToArticle(article.id)}
                        className="btn btn-outline-dark mt-3">
                    Like <span className="badge text-bg-danger">{article.countLikes}</span>
                </button>
                {children}
            </div>
        </>
    )
});