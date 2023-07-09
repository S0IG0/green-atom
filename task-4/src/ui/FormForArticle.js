export default ({article, setArticle, onClick}) => {
    return (
        <>
            <form className='action w-50 mt-5 m-auto'>
                <div className='title mb-3'>
                    <div className='form-label'>Title</div>
                    <input type="text"
                           className='form-control'
                           value={article.title}
                           onChange={event => setArticle({...article, title: event.target.value})}/>
                </div>
                <div className='content mb-3'>
                    <div className='form-label'>Content</div>
                    <textarea value={article.content}
                              className='form-control'
                              onChange={event => setArticle({...article, content: event.target.value})}>
                </textarea>
                </div>
                <div className='btn btn-primary'
                     onClick={onClick}>Save</div>
            </form>
        </>
    )
}