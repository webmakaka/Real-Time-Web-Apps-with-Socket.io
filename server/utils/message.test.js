var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () =>{
    it('should generate correct message object', () =>{
        
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        
        
        console.log('message');
        console.log(message);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
        
    });
});
