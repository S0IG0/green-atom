import {useState} from "react";
import Article from "../store/entities/Article";
import Store from "../store/store";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import FormForArticle from "../ui/FormForArticle";

export default () => {
    if (!Store.isAuth || Store.currentUser === undefined) {
        return <Navigate to='/login'></Navigate>
    }
    const {id} = useParams();
    const navigate = useNavigate();
    const article = Store.getArticleById(Number(id));

    if (id !== undefined && article === undefined) {
        return <NotFoundPage></NotFoundPage>
    }

    const [newArticle, setNewArticle] = useState(article && article.title && article.content ? article : new Article(Store.currentUser.id, '', ''));
    return <>
        <div className='text-center mt-5 fs-1'>
            {article !== undefined ? 'Edit' : 'Create'} article
        </div>
        <FormForArticle article={newArticle} setArticle={setNewArticle} onClick={() => {
            Store.addArticle(newArticle);
            navigate(`/article/${newArticle.id}`);
        }}></FormForArticle>
    </>
}