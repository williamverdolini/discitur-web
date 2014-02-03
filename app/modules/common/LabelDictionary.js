angular.module('Common')
.value('dictionary',
    {
        appTitle: "Discitur - Insieme si migliora",
        loading: "Caricamento in corso...",
        specifics : "Caratteristiche",
        discipline: "Disciplina",
        school: "Scuola",
        classroom: "Classe",
        rating: "Valutazione",
        author: "Pubblicato da",
        publishedOn: "in data",
        content: "Contenuto",
        lessonGoods: "What's good",
        lessonBads: "What's bad",
        noLessonGoods : "Nessun aspetto positivo rilevato...",
        noLessonBads: "Nessun aspetto negativo rilevato!",
        conclusion: "Conclusioni",
        noLessonIdFound: "Oooops...la Lezione non esiste! <br>Segnalalo al <a href='mailto:support@discitur.org'>supporto tecnico</a>",
        viewMore: "Approfondisci >>",
        keywordPlaceholder: "Ricerca la lezione per titolo, scuola, classe ed altro...",
        advKeyword: "Titolo",
        disciplinePlaceholder: "Disciplina",
        schoolPlaceholder: "Scuola",
        classroomPlaceholder: "Classe",
        tag: "Caratteristica",
        searchButton: "Cerca",
        advancedSearchButton: "Ricerca Avanzata",
        buttonAdd : "+",
        buttonDel: "x",
        cancel: "Annulla",
        validationError: "Non Valido!",
        // User NavBar:
        userSignIn: "Accedi",
        username: "User Name",
        password: "Password",
        signInTitle: "Accedi a Discitur",
        loginButtom: "Login",
        login: "Login",
        usernameNotValid: "User Name NON valido: inserisci un indirizzo email corretto",
        register: "Registrati",
        userProfile: "Il tuo Profilo",
        userSignOff: "Esci"
    }
)
.value('overrides',
    {
        'LessonCtrl': {
            lessonGoods: "Cosa è andato bene",
            lessonBads: "Cosa è andato male"
        },
        'LessonNewsCtrl': {
            publishedOn: "Pubblicato il",
            noLessonFound: "Nessuna Lezione trovata."
        },
    }
)
