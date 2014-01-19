angular.module('Lesson')
    /*-------------------------------------------------------------------------------
    Vantaggi del DTO:
    - disaccoppiamento tra i dati restituite dal BE e quelli gestiti dal FE
    - presenza di un (Client) Object Model distinto dal (Server( Object e/o Entity Model
    - possibilità di verificare il reale contenuto delle classi a codice (non a runtime)

    riferimenti: http://www.bennadel.com/blog/2527-Defining-Instantiatable-Classes-In-The-AngularJS-Dependency-Injection-Framework.htm
    ---------------------------------------------------------------------------------*/
    .factory('LessonDTO', function () {
        function LessonDTO() {
            this.lessonId = null;
            this.title = null;
            this.discipline = null;
            this.school = null;
            this.classroom = null;
            this.rate = null;
            this.author = null;
            this.publishedOn = null;
            this.goods = [];
            this.bads = [];
            this.tags = [];
            this.content = null;
            this.conclusion = null;
        }
        return (LessonDTO);
    })
    .factory('LessonService', [
        '$resource',
        '$http',
        '$q',
        'LessonDTO',
        'DisciturSettings',
        'DiscUtil',
        function ($resource, $http, $q, LessonDTO, DisciturSettings, DiscUtil) {
          // Private methods for DTO purposes
          var _dataTransfer = function (lessonData) {
            var lesson = new LessonDTO();
            lesson.lessondId = lessonData.LessonId;
            lesson.title = lessonData.Title;
            lesson.discipline = lessonData.Discipline;
            lesson.school = lessonData.School;
            lesson.classroom = lessonData.Classroom;
            lesson.author = {
              name: lessonData.Author.Name,
              surname: lessonData.Author.Surname
            }
            lesson.publishedOn = lessonData.PublishDate;
            lesson.rate = lessonData.Rate;
            angular.forEach(lessonData.FeedBacks, function (feedBack, key) {
              if (feedBack.Nature == 1) this.goods.push(feedBack.Feedback)
              if (feedBack.Nature == 2) this.bads.push(feedBack.Feedback)
            }, lesson);
            angular.forEach(lessonData.Tags, function (tag, key) {
              this.tags.push(tag.LessonTagName)
            }, lesson);
            lesson.content = lessonData.Content;
            lesson.conclusion = lessonData.Conclusion;
            return lesson;
          }
          var _arrayDataTransfer = function (resultArray) {
            var lessons = [];
            for (var i = 0; i < resultArray.length; i++) {
              lessons.push(_dataTransfer(resultArray[i]));
            }
            return lessons;
          }

          return {
              // Retrieve Async data for lesson id in input 
              // and return a LessonDTO instance
              get: function (inputParams) {
                  DiscUtil.validateInput(
                      'LessonService.get',   // function name for logging purposes
                      { id: 1},              // hashmap to check inputParameters
                      inputParams            // actual input params
                    );

                  // create deferring result
                  var deferred = $q.defer();

                  // Retrieve Async data for lesson id in input        
                  //$http.get('../api/lesson/' + inputParams.id)
                  $http.get(DisciturSettings.apiUrl + 'lesson/' + inputParams.id)
                      .success(
                          // Success Callback: Data Transfer Object Creation
                          function (result) {
                              deferred.resolve(_dataTransfer(result));
                          })
                      .error(
                          // Error Callback
                          function () {
                              deferred.reject("no Lesson for id:" + inputParams.id);
                          });

                  return deferred.promise;
              },
              search: function (inputParams) {                  
                  DiscUtil.validateInput(
                      'LessonService.search',       // function name for logging purposes
                      {                             // hashmap to check inputParameters e set default values
                          keyword: null,
                          discipline: null,
                          school: null,
                          startRow: null,
                          pagesize: null,
                          orderBy: "PublishDate",
                          orderDir: "DESC"
                      }, 
                      inputParams                   // actual input params
                      );

                  // create deferring result
                  var deferred = $q.defer();
                    
                  // Retrieve Async data for lesson id in input        
                  $http({ method: 'GET', url: DisciturSettings.apiUrl + 'lesson', params: inputParams })
                      .success(
                          // Success Callback: Data Transfer Object Creation
                          function (result) {
                            deferred.resolve(_arrayDataTransfer(result))
                          })
                      .error(
                          // Error Callback
                          function (data) {
                              deferred.reject("Error for search:" + data);
                          });
                    
                  //deferred.resolve(mockedLessonData);
                  return deferred.promise;
              }
          };
      }]);