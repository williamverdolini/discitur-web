angular.module('disc.common')
.value('dictionary',
    {
        brand: "Discitur",
        appTitle: "Discitur | Insieme si migliora",
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
        commentShare: "Condividi",
        commentShareClose: "Esci",
        commentShareTitle: "Condividi il link alla risposta",

        ratings: "Le Valutazioni",
        ratingPlaceholder: "Se vuoi, commenta il tuo giudizio",
        ratingtHelp: "Sei un docente ed hai provato la lezione? Accedi ed esprimi il tuo giudizio ed aiuta a migliorare la lezione",
        ratingSave: "Salva",
        ratingRequired: "Scegli il valore della tua valutazione",
        ratingNotDelete: "Il commento non può essere rimosso dall'Autore della lezione.",
        ratingInput: "Il tuo giudizio: ",

        noLessonIdFound: "Oooops...la Lezione non esiste! <br>Segnalalo al <a href='mailto:<%1%>'>supporto tecnico</a>",
        viewMore: "Approfondisci >>",
        keywordPlaceholder: "Ricerca la lezione per titolo",
        advKeyword: "Titolo",
        disciplinePlaceholder: "Disciplina",
        schoolPlaceholder: "Scuola",
        classroomPlaceholder: "Classe",
        tag: "Caratteristica",
        searchButton: "Cerca",
        advancedSearchButton: "Ricerca Avanzata",
        buttonAdd: "+",
        addItem: "Aggiungi",
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
        forgottenPwdHelp: "Inserisci lo UserName associato al tuo account e ti sarà inviata una email con nuove credenziali di accesso.",
        sendMail: "Invia email",
        //usernameNotValid: "User Name NON valido: inserisci un indirizzo email corretto",
        usernameNotValid: "User Name NON valido",
        register: "Registrati",
        userProfileTitle: "Profilo Utente",
        userProfileImageChange: "cambia l'immagine",
        userProfile: "Il tuo Profilo",
        userLessons: "Le tue Lezioni",
        userSignOff: "Esci",
        userImageTitle: "Cambia l'immagine del profilo",
        userImageChooseFile: "Scegli il file",
        userImageUpload: 'Carica',
        userImageCancel: 'Annulla',
        userImageName: "Nome:",
        userImageSize: "Dimensione:",

        editLessonButton: "Modifica",
        requiredField: "Dato obbligario",
        showHideHelp: "Mostra/Nascondi Help",

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
                    "perciò è importante riuscire a sintetizzare il contenuto e gli aspetti caratterizzanti.</h6>",
        editTooltip: "Modifica",
        deleteTooltip: "Elimina",
        lastLessonsTitle: "Le ultime lezioni pubblicate",
        socialTitleFBLike: "I Like it",
        socialTitleGPone: "Google +1",
        socialTitleTWShare: "Share on Twitter",
        socialTitleFBShare: "Share on Facebook",
        socialTitleGPShare: "Share on Google Plus",
        socialTitleLIShare: "Share on LinkedIn",
        // Registration Form
        name: "Nome",
        surname: "Cognome",
        email: "Email",
        confirmPassword: "Conferma Password",
        signupButton: "Registrati",
        requiredUserName: "UserName obbligatorio",
        minLengthUserName: "Inserisci uno User Name di almeno 4 caratteri",
        requiredPassword: "Password obbligatoria",
        minLengthPassword: "inserisci una Password di almeno 7 caratteri",
        requiredName: "Nome obbligatorio",
        requiredSurname: "Cognome obbligatorio",
        requiredEmail: "Email obbligatoria",
        validEmail: "Email non valida",
        requiredConfirmPassword: "Conferma Password obbligatoria",
        minLengthConfirmPassword: "inserisci una Conferma Password di almeno 7 caratteri",
        matchConfirmPassword: "Conferma Password non corretta",
        sentNewPwdEmail: "A breve riceverai via mail una nuova Password.",
        forgottenPassword: "Password dimenticata?",
        changePassword: "Modifica Password",
        currentPassword: "Password attuale",
        newPassword: "Nuova password",
        confirmPassword: "Conferma password",
        requiredNewPassword: "Nuova Password obbligatoria",
        minLengthNewPassword: "inserisci una nuova Password di almeno 7 caratteri",
        changedPassword: "Password aggiornata con successo.",
        confirm: "Conferma",
        modify: "Modifica",
        testEnv: "Ambiente di Test",
        signupSuccess: 'Registrazione avvenuta con successo. Controlla la tua email ed attiva il tuo account.',
        activationSuccess: 'Il tuo account è stato attivato. Accedi e inizia a dare il tuo contributo!',
        activationFailed: 'Il tuo account NON è stato attivato. Controlla la tua mail o contatta il supporto tecnico.',
        manifestTitle: 'Il Manifesto',
        backstageTitle: 'Il Backstage del progetto',
        contributeTitle: 'Contribuisci al progetto',
        aboutTitle: 'Chi siamo',
        cookiesTitle: 'Utilizzo dei Cookies',
        cookiesNotificationContent: "<h2>utilizzo dei cookies</h2>"+	
                                   "<div><p>In questo sito utilizziamo dei cookies per rendere la navigazione più piacevole.</p><p></p>"+
                                   "<p>Cliccando sul link \"Policy – Cookies e tutela della Privacy\", puoi trovare le informazioni per disattivare l’installazione dei cookies, "+
                                   "ma in tal caso il sito potrebbe non funzionare correttamente. Continuando a navigare in questo sito acconsenti alla nostra Policy.</p><p></p></div>",
        cookiesAccept: "OK",
        cookiesLaw: "Policy – Cookies e tutela della Privacy"
        }
)
.value('overrides',
{
    'LessonCtrl': {
        //lessonGoods: "Cosa è andato bene",
        //lessonBads: "Cosa è andato male"
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
})
.value('errors',
{
    discerr01 : 'Username già usato da un altro account',
    discerr02: 'Email già associata ad un altro account',
    discerr03: 'Username o password non corretti'
})