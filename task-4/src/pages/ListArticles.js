import Store from "../store/store";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import SmallCardArticle from "../ui/SmallCardArticle";


export default observer(() => {
    return <>
        <div className="container mt-4 m-auto">
            <div className='row align-items-center'>
                {Store.articles.length > 0 ? Store.articles.map(article =>
                    <div className='col-md-6 col-lg-4' key={article.id}>
                        <SmallCardArticle article={article}>
                            {Store.currentUser && article.ownerId === Store.currentUser.id &&
                                <>
                                    <Link className='ms-2 btn btn-outline-success' to={`/article-edit/${article.id}`}>
                                        Edit
                                    </Link>
                                    <div className='ms-2 btn btn-outline-danger' onClick={() => Store.removeArticleById(article.id)}>
                                        Remove
                                    </div>
                                </>}
                        </SmallCardArticle>
                    </div>
                ) : <div className='text-center fs-1 mt-5'>The list of articles is empty. Login and create an article</div>}
            </div>
        </div>
    </>
});