angular.module('Common')
.value('dictionary',
    {
        appTitle : "Discitur - Insieme si migliora",
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
        noLessonFound: "Oooops...la Lezione non esiste! <br>Segnalalo al <a href='mailto:support@discitur.org'>supporto tecnico</a>",
        viewMore: "Approfondisci >>",
        keywordPlaceholder: "Ricerca la lezione per titolo, scuola, classe ed altro...",
        disciplinePlaceholder: "Disciplina",
        schoolPlaceholder: "Scuola",
        classroomPlaceholder: "Classe",
        searchButton: "Cerca",
        advancedSearchButton : "Ricerca Avanzata"
    }
)
.value('overrides',
    {
        'LessonCtrl': {
            lessonGoods: "Cosa è andato bene :)",
            lessonBads: "Cosa è andato male :("
        },
        'LessonNewsCtrl': {
            publishedOn: "Pubblicato il"
        },
    }
)
