/**
 * Récupére la liste des applis
 */
exports.getApplis = (req, res) => {
    const listApplis = [
        {
            nomAppli: 'Nom Appli',
            alias: 'poirtpoeit',
            items: [
                {
                    nom: 'mock 1',
                    url: 'url/url1',
                },
                {
                    nom: 'mock 2',
                    url: 'url/url2',
                },
                {
                    nom: 'mock 3',
                    url: 'url/url3',
                },
                {
                    nom: 'mock 4',
                    url: 'url/url4',
                },
            ],
        },
        {
            nomAppli: 'NomAppli2',
            alias: '',
            items: [
                {
                    nom: 'mocka 1',
                    url: 'url/url1',
                },
                {
                    nom: 'mocka 2',
                    url: 'url/url2',
                },
                {
                    nom: 'mocka 3',
                    url: 'url/url3',
                },
                {
                    nom: 'mocka 4',
                    url: 'url/url4',
                },
            ],
        },
        {
            nomAppli: 'NomAppli3',
            alias: 'alias1',
            items: [
                {
                    nom: 'mocka 1',
                    url: 'url/url1',
                },
                {
                    nom: 'mocka 2',
                    url: 'url/url2',
                },
                {
                    nom: 'mocka 3',
                    url: 'url/url3',
                },
                {
                    nom: 'mocka 4',
                    url: 'url/url4',
                },
            ],
        },
    ];
    res.status(200).jsonp(listApplis);
};
