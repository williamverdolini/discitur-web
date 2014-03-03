angular.module('Common')
.value('dictionary',
    {
        appTitle: "Discitur - Insieme si migliora",
        loading: "Caricamento in corso...",
        lessonTitleHeading: "Titolo della Lezione",
        lessonTitle: "Titolo",
        notPublished: "Lezione non pubblicata",
        specifics : "Caratteristiche",
        discipline: "Disciplina",
        school: "Scuola",
        classroom: "Classe",
        tags: "Tags",
        rating: "Valutazione",
        author: "Pubblicato da",
        publishedOn: "in data",
        content: "Contenuto",
        lessonGoods: "Aspetti positivi",
        lessonBads: "Aspetti negativi",
        noLessonGoods : "Nessun aspetto positivo rilevato...",
        noLessonBads: "Nessun aspetto negativo rilevato!",
        conclusion: "Conclusioni",
        comments: "I Commenti",
        commentPlaceholder: "Inserisci il tuo commento",
        commentHelp: "Accedi ed esprimi la tua opinione!",
        commentAnswer: "Rispondi",
        commentEdit: "Edita",
        commentPreview: "Anteprima",
        commentSave: "Salva",
        commentRequired: "Inserisci almeno un carattere",
        commentNotDelete: "Il commento non può essere rimosso: altri utenti hanno linkato la tua risposta",

        ratings: "Le Valutazioni",
        ratingPlaceholder: "Se vuoi, commenta il tuo giudizio",
        ratingtHelp: "Sei un docente ed hai provato la lezione? Accedi ed esprimi il tuo giudizio ed aiuta a migliorare la lezione",
        ratingSave: "Salva",
        ratingRequired: "Scegli il valore della tua valutazione",
        ratingNotDelete: "Il commento non può essere rimosso dall'Autore della lezione.",
        ratingInput: "Il tuo giudizio: ",

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
        //usernameNotValid: "User Name NON valido: inserisci un indirizzo email corretto",
        usernameNotValid: "User Name NON valido",
        register: "Registrati",
        userProfile: "Il tuo Profilo",
        userLessons: "Le tue Lezioni",
        userSignOff: "Esci",

        editLessonButton: "Modifica"
    }
)
.value('overrides',
    {
        'LessonCtrl': {
            lessonGoods: "Cosa è andato bene",
            lessonBads: "Cosa è andato male"
        },
        'LessonListCtrl': {
            publishedOn: "Pubblicato il",
            noLessonFound: "Nessuna Lezione trovata."
        },
        'LessonListSideBarCtrl': {
            newLessonButton: "Nuova Lezione"
        },
        'LessonEditCtrl': {
            saveLessonButton: "Salva la Lezione",
            deleteLessonButton: "Elimina la Lezione",
            cancelButton: "Annulla",
            publicLesson: "Pubblica"
        }
    }
)
