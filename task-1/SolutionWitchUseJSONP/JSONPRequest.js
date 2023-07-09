import React, { useEffect } from 'react';

const JSONPRequest = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=jsonp&jsonp=parseQuote";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            delete window.parseQuote();
        };
    }, []);

    return <></>;
};

export default JSONPRequest;
