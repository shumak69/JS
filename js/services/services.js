const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: data
    });

    return await res.json();
};

async function getCards(url) {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${fetch.status}`);
    }

    return  await res.json();
}

export {postData};
export {getCards};