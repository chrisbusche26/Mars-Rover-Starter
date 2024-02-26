

class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }

  receiveMessage(message) {
    let roverObj = {
      message: message.name,
      results: [],
    }

    
    
    for (let i = 0; i < message.commands.length; i++) {
       if (message.commands[i].commandType === 'MODE_CHANGE') {
         this.mode = message.commands[i].value;
         roverObj.results.push({
           completed: true,
           roverStatus: {
             position: this.position,
             mode: this.mode,
             generatorWatts: this.generatorWatts
            } 
          });
       }

       if (message.commands[i].commandType === 'MOVE') {
         if (this.mode === 'LOW_POWER') {
           roverObj.results.push({
           completed: false,
           roverStatus: {
             position: this.position,
             mode: this.mode,
             generatorWatts: this.generatorWatts
            } 
            });
          } else { 
         this.position = message.commands[i].value;
         roverObj.results.push({
           completed: true,
           roverStatus: {
             position: this.position,
             mode: this.mode,
             generatorWatts: this.generatorWatts
            } 
          });
          } 
         }
        

       if (message.commands[i].commandType === 'STATUS_CHECK') {
         roverObj.results.push({
           completed: true,
           roverStatus: {
             position: this.position,
             mode: this.mode,
             generatorWatts: this.generatorWatts
            } 
          });
       }
      }
      return roverObj;
  }
}

module.exports = Rover;