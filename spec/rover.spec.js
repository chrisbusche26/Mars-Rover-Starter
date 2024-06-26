const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.





describe("Rover class", function() {
  // 7 tests here!

  it('constructor sets position and default values for mode and generatorWatts', function () {
    const rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it('response returned by receiveMessage contains the name of the message', function () {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.message).toContain('Test message with two commands');
  });

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function () {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    if (message[commands.length] === 2) {
      expect(roverObj[results.length]).toEqual(2);
    }
  });

  it('responds correctly to the status check command', function () {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.position).toEqual(98382);
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
  });

  it('responds correctly to the mode change command', function () {
    const rover = new Rover(98382);
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
  });

  it('responds with a false completed value when attempting to move in LOW_POWER mode', function () {
    const rover = new Rover(98382, 'LOW_POWER');
    const commands = [new Command('MOVE', 4859), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(false);
  });

  it('responds with the position for the move command', function () {
    const rover = new Rover(98382);
    const commands = [new Command('MOVE', 4859), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
  });

});
