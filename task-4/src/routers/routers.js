import {Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/Login";
import Article from "../pages/Article";
import ListArticles from "../pages/ListArticles";
import CreateOrEditArticle from "../pages/CreateOrEditArticle";

export const routers = [
    {path: '/login', element: <Login/>},
    {path: '/article/:id', element: <Article/>},
    {path: '/article-create', element: <CreateOrEditArticle/>},
    {path: '/article-edit/:id', element: <CreateOrEditArticle/>},
    {path: '/', element: <ListArticles/>},
]

export const MainRouters = () => {
    return <>
        <Routes>
            {routers.map(route => <Route {...route} key={route.path}></Route>)}
            <Route path='*' element={<NotFoundPage/>}></Route>
        </Routes>
    </>
}