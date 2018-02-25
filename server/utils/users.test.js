const expect = require('expect');
const {Users} = require('./users');

describe('Users', () =>{
    
    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };
        
        let resUser = users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });
    
});
