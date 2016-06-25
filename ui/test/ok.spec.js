import {datestr} from '../src/js/utils';


describe('テストがちゃんと動く', () => {
    it('1+1 equals 2', () => expect(1 + 1).toBe(2));
    it('export/import function', () => expect(datestr().length).toBe(8));
});
