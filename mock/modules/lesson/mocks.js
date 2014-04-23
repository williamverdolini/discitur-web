angular.module('disc.lesson')
    .config(function ($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    })
    .constant('MockedData', {
        lessons: {
            StartRow: 0,
            Count: 6,
            PageSize: 3,
            Records: [
              { "Author": { "UserId": 1, "Name": "Federica-MOCK", "Surname": "Giampaoletti", "Email": "chiarestelle@virgilio.it", "UserName": "Fede" }, "FeedBacks": [{ "LessonFeedbackId": 1, "LessonId": 1, "Nature": 1, "Feedback": "Ampia partecipazione degli alunni" }, { "LessonFeedbackId": 2, "LessonId": 1, "Nature": 1, "Feedback": "Semplice da spiegare" }, { "LessonFeedbackId": 3, "LessonId": 1, "Nature": 1, "Feedback": "consente collegamenti interdisciplinari" }, { "LessonFeedbackId": 4, "LessonId": 1, "Nature": 1, "Feedback": "utilizza media che catturano l'attenzione" }, { "LessonFeedbackId": 5, "LessonId": 1, "Nature": 2, "Feedback": "un po' lunga, rischia di non chiudersi in lezioni interrotte frequentemente" }, { "LessonFeedbackId": 6, "LessonId": 1, "Nature": 2, "Feedback": "poco fruttuosa se negli orari finali" }], "Tags": [{ "LessonTagName": "classe multi-etnica", "LessonId": 1 }, { "LessonTagName": "Classe numerosa", "LessonId": 1 }, { "LessonTagName": "DSA", "LessonId": 1 }, { "LessonTagName": "Rivoluzione Francese", "LessonId": 1 }], "LessonId": 1, "Title": "La rivoluzione Francese secondo Robespierre", "Discipline": "Storia", "School": "Scuola Secondaria", "Classroom": "II Media", "Rate": 4, "UserId": 1, "PublishDate": "2013-12-08T00:00:00", "Content": "<div class='row-fluid'>Tutto il contenuto, in formato <b>HTML</b> con tutti i <a href='#'>link</a> che vuoi! <br> <blockquote class='pull-right'><p>La virtù produce la felicità come il sole produce la luce.</p> <small><cite title='Maximilien de Robespierre'>Maximilien de Robespierre</cite></small> </blockquote></div><div class='row-fluid'><p>alla prossima!</p></div>", "Conclusion": "La lezione è stata positiva, con una larga partecipazione attiva degli alunni. Consiglio a tutti di sperimetare la tecnica e di condividere la propria esperienza!" },
              { "Author": { "UserId": 2, "Name": "William-MOCK", "Surname": "Verdolini", "Email": "william.verdolini@gmail.com", "UserName": "Willy" }, "FeedBacks": [{ "LessonFeedbackId": 7, "LessonId": 2, "Nature": 1, "Feedback": "Collegamenti a video e film di interesse" }, { "LessonFeedbackId": 8, "LessonId": 2, "Nature": 1, "Feedback": "Concreti riferimenti ad esempi carismatici" }, { "LessonFeedbackId": 9, "LessonId": 2, "Nature": 2, "Feedback": "Scarsa partecipazione degli alunni" }, { "LessonFeedbackId": 10, "LessonId": 2, "Nature": 2, "Feedback": "Personaggio non conosciuto in Italia" }, { "LessonFeedbackId": 11, "LessonId": 2, "Nature": 2, "Feedback": "Riferimenti a fatti non di stretta attualità" }, { "LessonFeedbackId": 12, "LessonId": 2, "Nature": 2, "Feedback": "Film scarsamente conosciuti. Per usare dei riferimenti occorre verificare che questi siano veri riferimenti per gli alunni" }], "Tags": [{ "LessonTagName": "Attualità", "LessonId": 2 }, { "LessonTagName": "Classe multi-etnica", "LessonId": 2 }, { "LessonTagName": "Razzismo", "LessonId": 2 }], "LessonId": 2, "Title": "Impegno Civile", "Discipline": "Educazione Civica", "School": "Scuola Secondaria", "Classroom": "III Media", "Rate": 2, "UserId": 2, "PublishDate": "2014-01-02T00:00:00", "Content": "<div class='row-fluid'>Tutto il contenuto, in formato <b>HTML</b> con tutti i <a href='#'>link</a> che vuoi! <br> <blockquote class='pull-right'><p>Nessun vietnamita mi ha chiamato 'Negro'</p> <small><cite title='Mohammed Ali'>Mohammed Ali</cite></small> </blockquote></div><div class='row-fluid'><p>alla prossima!</p></div>", "Conclusion": "La lezione è stata un spunto interessante, ma dovrebbe avere una sessione più ampia di introduzione del contesto e del personaggio Mohammed Ali. Forse fa andare un po' troppo fuori tempo massimo se l'obiettivo è sensibilizzare sull'impegno civico a prescindere dalla propria posizione e professione" },
              { "Author": { "UserId": 1, "Name": "Federica-MOCK", "Surname": "Giampaoletti", "Email": "chiarestelle@virgilio.it", "UserName": "Fede" }, "FeedBacks": [{ "LessonFeedbackId": 13, "LessonId": 3, "Nature": 1, "Feedback": "Si apprende velocemente grazie alla creazione di un manufatto fisico" }, { "LessonFeedbackId": 14, "LessonId": 3, "Nature": 1, "Feedback": "Gli obiettivi sono raggiunti indipendentemente dal livello di partenza e dalla presenza di DSA" }], "Tags": [], "LessonId": 3, "Title": "La Carta Geografica", "Discipline": "Geografia", "School": "Scuola Secondaria", "Classroom": "I Media", "Rate": 5, "UserId": 1, "PublishDate": "2014-01-04T00:00:00", "Content": "<div class='row-fluid'>Tutto il contenuto, in formato <b>HTML</b> con tutti i <a href='#'>link</a> che vuoi! <br></div><div class='row-fluid'><p>alla prossima!</p></div>", "Conclusion": "La tecnica utilizzata ha consentito di ottenere velocemente e senza distinzione di competenze l'obiettivo richiesto. La manualità e la fisicità dell'operazione richiesta consente di fissare più consapevolmente i concetti e semplifica a chi ha problemi di attenzione o altri DSA di focalizzare e semplificare l'apprendimento" }
            ]
        },
        secondPage: {
            StartRow: 3,
            Count: 6,
            PageSize: 3,
            Records: [
              { "Author": { "UserId": 1, "Name": "Federica-MOCK", "Surname": "Giampaoletti", "Email": "chiarestelle@virgilio.it", "UserName": "Fede" }, "FeedBacks": [{ "LessonFeedbackId": 13, "LessonId": 4, "Nature": 1, "Feedback": "Si apprende velocemente grazie alla creazione di un manufatto fisico" }, { "LessonFeedbackId": 14, "LessonId": 4, "Nature": 1, "Feedback": "Gli obiettivi sono raggiunti indipendentemente dal livello di partenza e dalla presenza di DSA" }], "Tags": [], "LessonId": 4, "Title": "La Carta Geografica", "Discipline": "Geografia", "School": "Scuola Secondaria", "Classroom": "I Media", "Rate": 5, "UserId": 1, "PublishDate": "2014-01-04T00:00:00", "Content": "<div class='row-fluid'>Tutto il contenuto, in formato <b>HTML</b> con tutti i <a href='#'>link</a> che vuoi! <br></div><div class='row-fluid'><p>alla prossima!</p></div>", "Conclusion": "La tecnica utilizzata ha consentito di ottenere velocemente e senza distinzione di competenze l'obiettivo richiesto. La manualità e la fisicità dell'operazione richiesta consente di fissare più consapevolmente i concetti e semplifica a chi ha problemi di attenzione o altri DSA di focalizzare e semplificare l'apprendimento" },
              { "Author": { "UserId": 1, "Name": "Anna-MOCK", "Surname": "Giampaoletti", "Email": "chiarestelle@virgilio.it", "UserName": "Fede" }, "FeedBacks": [{ "LessonFeedbackId": 13, "LessonId": 4, "Nature": 1, "Feedback": "Si apprende velocemente grazie alla creazione di un manufatto fisico" }, { "LessonFeedbackId": 14, "LessonId": 4, "Nature": 1, "Feedback": "Gli obiettivi sono raggiunti indipendentemente dal livello di partenza e dalla presenza di DSA" }], "Tags": [], "LessonId": 4, "Title": "La Carta Geografica", "Discipline": "Geografia", "School": "Scuola Secondaria", "Classroom": "I Media", "Rate": 5, "UserId": 1, "PublishDate": "2014-01-04T00:00:00", "Content": "<div class='row-fluid'>Tutto il contenuto, in formato <b>HTML</b> con tutti i <a href='#'>link</a> che vuoi! <br></div><div class='row-fluid'><p>alla prossima!</p></div>", "Conclusion": "La tecnica utilizzata ha consentito di ottenere velocemente e senza distinzione di competenze l'obiettivo richiesto. La manualità e la fisicità dell'operazione richiesta consente di fissare più consapevolmente i concetti e semplifica a chi ha problemi di attenzione o altri DSA di focalizzare e semplificare l'apprendimento" },
              { "Author": { "UserId": 2, "Name": "William-MOCK", "Surname": "Verdolini", "Email": "william.verdolini@gmail.com", "UserName": "Willy" }, "FeedBacks": [{ "LessonFeedbackId": 7, "LessonId": 5, "Nature": 1, "Feedback": "Collegamenti a video e film di interesse" }, { "LessonFeedbackId": 8, "LessonId": 5, "Nature": 1, "Feedback": "Concreti riferimenti ad esempi carismatici" }, { "LessonFeedbackId": 9, "LessonId": 5, "Nature": 2, "Feedback": "Scarsa partecipazione degli alunni" }, { "LessonFeedbackId": 10, "LessonId": 2, "Nature": 2, "Feedback": "Personaggio non conosciuto in Italia" }, { "LessonFeedbackId": 11, "LessonId": 5, "Nature": 2, "Feedback": "Riferimenti a fatti non di stretta attualità" }, { "LessonFeedbackId": 12, "LessonId": 5, "Nature": 2, "Feedback": "Film scarsamente conosciuti. Per usare dei riferimenti occorre verificare che questi siano veri riferimenti per gli alunni" }], "Tags": [{ "LessonTagName": "Attualità", "LessonId": 2 }, { "LessonTagName": "Classe multi-etnica", "LessonId": 5 }, { "LessonTagName": "Razzismo", "LessonId": 2 }], "LessonId": 5, "Title": "Impegno Civile", "Discipline": "Educazione Civica", "School": "Scuola Secondaria", "Classroom": "III Media", "Rate": 2, "UserId": 2, "PublishDate": "2014-01-02T00:00:00", "Content": "<div class='row-fluid'>Tutto il contenuto, in formato <b>HTML</b> con tutti i <a href='#'>link</a> che vuoi! <br> <blockquote class='pull-right'><p>Nessun vietnamita mi ha chiamato 'Negro'</p> <small><cite title='Mohammed Ali'>Mohammed Ali</cite></small> </blockquote></div><div class='row-fluid'><p>alla prossima!</p></div>", "Conclusion": "La lezione è stata un spunto interessante, ma dovrebbe avere una sessione più ampia di introduzione del contesto e del personaggio Mohammed Ali. Forse fa andare un po' troppo fuori tempo massimo se l'obiettivo è sensibilizzare sull'impegno civico a prescindere dalla propria posizione e professione" }
            ]
        },

        disciplines: ['Storia', 'Geografia', 'Italiano', 'Matematica', 'Scienze', 'Inglese'],
        schools: ['Scuola Secondaria', 'Liceo Classico', 'Scuola Primaria', 'Liceo Scientifico', 'Magistrali'],
        classrooms: ['I Media', 'II Media', 'III Media', 'IV Ginnasio'],
        tags: ['DSA', 'Classe numerosa', 'Razzismo', 'Diritti Civili', 'ultime ore', 'Attualità', 'Personaggi Famosi', 'Classe multi-etnica'],
        user: { UserName: 'will@iam.it', Token: 'XXXXXXXXXXXXXXX', Name: 'William', Surname: 'Verdolini', Email: 'william.ver@wi.it' },
        comments: [
            { "Id": 1, "LessonId": 1, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": null, "Level": 0 },
            { "Id": 2, "LessonId": 1, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": 1, "Level": 1 },
            { "Id": 3, "LessonId": 1, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": 1, "Level": 1 },
            { "Id": 4, "LessonId": 1, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": null, "Level": 0 },
            { "Id": 5, "LessonId": 1, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": 4, "Level": 1 },
            { "Id": 6, "LessonId": 1, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": 5, "Level": 2 },
        ],
        savedCommentl0: { "Id": 999, "LessonId": 555, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": null, "Level": 0 },
        savedCommentl1: { "Id": 999, "LessonId": 555, "Author": { "UserId": 1, "UserName": "Fede", "Image": "https://gp3.googleusercontent.com/---NTVhcKLaQ/AAAAAAAAAAI/AAAAAAAAAtk/NQK3bAqL0yI/s48-c-k-no/photo.jpg" }, "Date": "2013-12-08T00:00:00", "Content": "diverso contenuto del commento da capire se con <a href='#'>link</a> o simili", "ParentId": 1, "Level": 1 },
        ratings6: [
            //{ "Author": { "UserName": 'Willy', "UserId": 2, "Picture": "img/def-user-icon.png" }, "Rating": 3, "CreationDate": "2014-02-08T00:00:00", "Content": 'propvaprova prova, e riprova', "LessonId": 6 },
            { "Author": { "UserName": 'Fede', "UserId": 1, "Picture": "img/def-user-icon.png" }, "Rating": 3, "CreationDate": "2014-02-08T00:00:00", "Content": 'propvaprova prova, e riprova', "LessonId": 6 }
        ],
        savedRating: { "Author": { "UserName": 'Fede', "UserId": 1, "Picture": "img/def-user-icon.png" }, "Rating": 3, "CreationDate": "2014-02-08T00:00:00", "Content": "Contenuto salvato", "LessonId": 555, "Id": 10 },
        savedRating999: { "Author": { "UserName": 'Fede', "UserId": 1, "Picture": "img/def-user-icon.png" }, "Rating": 3, "CreationDate": "2014-02-08T00:00:00", "Content": "Contenuto salvato", "LessonId": 555, "Id": 999 }
})

    .run(function ($httpBackend, DisciturSettings, MockedData) {

        //$httpBackend.whenGET(DisciturSettings.apiUrl + 'lesson/').respond(MockedData.lessons);
        //$httpBackend.whenGET(DisciturSettings.apiUrl + 'lesson/1').respond(MockedData.lessons.Records[0]);
        //$httpBackend.whenGET(new RegExp(DisciturSettings.apiUrl + 'lesson\\?disciplineQ=\.*')).respond(MockedData.disciplines);
        //$httpBackend.whenGET(new RegExp(DisciturSettings.apiUrl + 'lesson\\?schoolQ=\.*')).respond(MockedData.schools);
        //$httpBackend.whenGET(new RegExp(DisciturSettings.apiUrl + 'lesson\\?classroomQ=\.*')).respond(MockedData.classrooms);
        //$httpBackend.whenGET(new RegExp(DisciturSettings.apiUrl + 'lesson\\?tagQ=\.*')).respond(MockedData.tags);
        //$httpBackend.whenGET(DisciturSettings.apiUrl + 'lesson/1/comments').respond(MockedData.comments);
        //$httpBackend.whenGET(DisciturSettings.apiUrl + 'lesson/6/ratings').respond(MockedData.ratings6);


        //$httpBackend.whenGET(DisciturSettings.apiUrl + 'lesson/').passThrough();

        /*
        $httpBackend.whenGET('modules/main/HomePage.html').passThrough();
        $httpBackend.whenGET('modules/main/site/Project.html').passThrough();
        $httpBackend.whenGET('modules/navigation/navbar.html').passThrough();
        $httpBackend.whenGET('modules/lesson/404lesson.html').passThrough();
        $httpBackend.whenGET('modules/lesson/detail.html').passThrough();

        

        */
        $httpBackend.whenPOST(DisciturSettings.apiUrl + 'user/login').respond(MockedData.user);

        // Don't mock the html views
        $httpBackend.whenGET(/modules\/\w+.*/).passThrough();
        $httpBackend.whenGET(/template\/\w+.*/).passThrough();
        $httpBackend.whenGET(/bower_components\/\w+.*/).passThrough();

        // For everything else, don't mock
        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
        $httpBackend.whenPUT(/^\w+.*/).passThrough();
        $httpBackend.whenDELETE(/^\w+.*/).passThrough();

    });
