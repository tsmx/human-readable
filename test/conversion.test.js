describe('human-readable conversion test suite', () => {

    it('tests a successful automatic conversion from bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(999)).toBe('999 B');
        done();
    });

});