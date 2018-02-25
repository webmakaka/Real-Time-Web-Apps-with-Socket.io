const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject not-string values', () => {
        const res = isRealString(98);
        expect(res).toBe(false);
    });
    
    it('should reject string with only spaces', () => {
        const res = isRealString('    ');
        expect(res).toBe(false);
    });
    
    it('should allow string with non-space characters', () => {
        const res = isRealString('    Andrew    ');
        expect(res).toBe(true);
    });
    
});
