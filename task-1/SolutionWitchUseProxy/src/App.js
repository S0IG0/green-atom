import {useEffect, useState} from "react";
import axios from "axios";

const API = '/api/?method=getQuote&key=random&format=json&lang=ru&jsonp=';

function App() {
    const [quote, setQuote] = useState({text: '', author: ''});
    const [isLoading, setIsLoading] = useState(false);
    const getQuote = async () => {
        try {
            setIsLoading(true);
            await axios
                .get(API)
                .then(response => {
                    response = response['data'];
                    setQuote({text: response['quoteText'], author: response['quoteAuthor']});
                })
                .catch(error => console.log(error));
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getQuote()
    }, []);
    return (
        <>
            <div className='title fs-1 text-center'>
                Random Quotes
            </div>
            <div className='content text-center'>
                {isLoading ?
                    <div className="spinner-border m-4"
                         style={{width: '3em', height: '3em'}}
                         role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                    :
                    <>
                        <div className='quote text-center m-4'>
                            {quote.text}
                        </div>
                        <div className='author fs-4 text-center mb-4'>
                            {quote.author === '' ? 'Неизвестно' : quote.author}
                        </div>
                    </>}
            </div>
            <div className='text-center'>
                <div
                    className='btn btn-success fs-5'
                    onClick={getQuote}
                >
                    new quote
                </div>
            </div>
        </>
    );
}

export default App;
