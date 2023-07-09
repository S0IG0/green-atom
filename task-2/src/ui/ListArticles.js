import {observer} from "mobx-react-lite";

export default observer(({articles}) => {
    return <>
        <ul className='text-start list-group list-group-flush m-4 m-auto' style={{maxWidth: '80em'}}>
            {articles.map((article) => (
                <a
                    className='list-group-item'
                    href={article.url}
                    key={article.url}
                >
                    {article.title}
                </a>
            ))}
        </ul>
    </>
});