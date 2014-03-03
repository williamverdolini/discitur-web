﻿angular.module('Common')
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

        editLessonButton: "Modifica",
        requiredField: "Dato obbligario",

        helpTitle: "<h6>Marcando il check <b>Pubblica</b> "+
                    "la lezione sarà visibile a tutti.<br />"+
                    "Tieni la lezione privata mentre la stai preparando. "+
                    "Sarà visibile solo a te ed accessibile tramite la funzionalità di profilo <b>Le tue Lezioni</b>.</h6>",
        helpSpecifics: "<h6>Digitando sui campi il sistema ti proporrà dei valori già presenti a sistema."+
                    "<br /><br /><p>"+
                    "Se non soddisfano alle tue esigenze inserisci i dati come meglio preferisci.</p></h6>",
        helpTags: "<h6>I  <b>Tag</b> consentono di marcare e poter ricercare la lezione per caratteristiche interdisciplinari.<br />"+
                  "<br /><p>Digitando, il sistema ti proporrà dei valori già presenti,"+
                  "ma se non soddisfano alle tue esigenze, inserisci i dati come meglio preferisci.</p></h6>",
        helpContent: "<h6>Inserisci il <b>Contenuto</b> della lezione.<br /><br />"+
                     "Dettaglia i passaggi e gli strumenti utilizzati e descrivi il metodo o l'approccio utilizzato,"+
                     "in modo che altri docenti possano comprendere la lezione ed imparare.<br />"+
                     "<br /><p>Per poter inserire immagini o video utilizza le funzionalità dell'editor a fianco,"+
                     "ma ricorda, tutte le immagini devono essere caricate in un tuo spazio web ed accessibili"+
                     "attraverso un indirizzo web, da inserire nel campo <b>Source</b>.</p>"+
                     "<p>Ti suggeriamo i seguenti se non hai già un tuo spazio web:<ul>"+
                     "<li><a href=\"http://www.drive.google.com/\">Google Drive</a></li>"+
                     "<li><a href=\"https://www.dropbox.com/\">Dropbox</a></li></ul></p></h6>",
        helpFeedbacks: "<h6>I  <b>Feedback</b> sono il frutto della retrospettiva della lezione, della tua analisi, del tuo punto di vista.<br />"+
                    "<br />Cosa è andato bene? Quali gli aspetti positivi della lezione?<br /><br />"+
                    "Cosa invece non ha funzionato? Cosa poteva essere evitato? Cosa migliorato?<br /><br />"+
                    "<p>Metti la qualità dell'insegnamento sopra al resto e non temere di indicare gli aspetti negativi riscontrati."+
                    "<br />Sono principalmente questi che consentono di migliorare la tecnica, il metodo e la qualità dell'insegnamento.<br />Sbagliando si impara!</p></h6>",
        helpConclusion: "<h6>Nelle <b>Conclusioni</b> inserisci i punti salienti della lezione.<br /><br />"+
                    "Il paragrafo è utilizzato nella lista dei risultati della ricerca come <i>abstract</i> della lezione,"+
                    "perciò è importante riuscire a sintetizzare il contenuto e gli aspetti caratterizzanti.</h6>"
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
