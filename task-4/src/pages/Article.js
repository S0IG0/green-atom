import {Link, useParams} from "react-router-dom";
import Store from "../store/store";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import NotFoundPage from "./NotFoundPage";
import CardArticle from "../ui/CardArticle";
import FormForAddComment from "../ui/FormForAddComment";
import ListComments from "../ui/ListComments";

export default observer(() => {
    const {id} = useParams();
    const article = Store.getArticleById(Number(id));

    if (!article) {
        return (
            <NotFoundPage></NotFoundPage>
        )
    }

    console.log(Store.getUserById(-1));

    const user = Store.currentUser ? Store.currentUser : Store.getUserById(-1);
    const [content, setContent] = useState('');

    return <>

        <CardArticle article={article}>
            {Store.currentUser && Store.currentUser.id === article.ownerId &&
                <>
                    <Link className='btn btn-outline-success ms-2 mt-3' to={`/article-edit/${article.id}`}>Edit</Link>
                    <div className='ms-2 mt-3 btn btn-outline-danger'
                         onClick={() => Store.removeArticleById(article.id)}>Remove
                    </div>
                </>}
            <FormForAddComment
                user={user}
                content={content}
                setContent={setContent}
                idArticle={article.id}
            ></FormForAddComment>
            <ListComments commentsId={article.commentsId}></ListComments>
        </CardArticle>
    </>
});