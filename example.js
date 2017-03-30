// 1. register a new web worker and assign it a callback
if(window.Worker){
  WebWorkersManager.register('MyBackgroundWorker1',yourFunkyCallback);
}

// 2. run your callback in the background
var callbackArguments = ['argument1', 'argument2', 3, 4];
WebWorkersManager.ask('MyBackgroundWorker1', callbackArguments);


