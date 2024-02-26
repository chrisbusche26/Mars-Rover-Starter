const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {
    
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];

    it('throws error if a name is NOT passed into the constructor as the first parameter', function () {
        expect(function() { new Message();}).toThrow(new Error('Name required.'));
    });

    it('constructor sets name', function () {
        const message = new Message('move it', [new Command('MOVE', 4321)]);
        expect(message.name).toEqual('move it');
    });

    it('contains a commands array passed into the constructor as the 2nd argument', function () {
        const message = new Message('move it', [new Command('MOVE', 4321)]);
        expect(message.commands).toEqual([new Command('MOVE', 4321)]);
    });
});
