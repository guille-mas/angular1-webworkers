'use strict';
angular.module('app')
  /**
   * A service responsible of managing web workers (Work in progress)
   * @todo wrap this manager into an angular1 reusable injectable dependency structure
   * @todo change code to work with promises instead of callbacks
   * @todo test
   */
  .factory('WebWorkersManager', [ function() {
    // all registered workers indexed by name
    var workers = {};
    return {
      /**
       * Ask a worker with given workerName to execute callback with given arguments
       * @param workerName
       * @param callback
       * @param args
       */
      ask: function(workerName,args){
        console.log('ask() method is sending message to Worker');
        workers[workerName].postMessage(args);
      },
      register: function(workerName, callback) {
        if(typeof workers[workerName] != 'undefined'){
          throw new Error('Already exists. Choose another name for your worker.');
        }

        // creating a dynamic js file and injecting WebWorkerTask on it
        var wwCallback = 'self.onmessage = function(e) { console.log("Message received from main script"); var callback = '+callback.toString()+'; var workerResult = callback.apply(this,e.data); console.log("Posting message back to main script"); postMessage(workerResult); }';
        var blob = new Blob([wwCallback], { type: "text/javascript" });

        if(window.URL){
          workers[workerName] = new Worker( window.URL.createObjectURL(blob) );
        }else{
          // Note: window.webkitURL.createObjectURL() in Chrome 10+.
          workers[workerName] = new Worker( window.webkitURL.createObjectURL() );
        }

        workers[workerName].onmessage = function(event){
          console.log('Message received from worker', event.data);
          // todo implement promises to get the result
        }
      }
    }
  }])
;
