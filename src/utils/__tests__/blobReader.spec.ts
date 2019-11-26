import { blobReader } from '../blobReader';

const myBlobCorrect: Blob = new Blob(['This is my blob content'], { type: 'text/plain' });

describe('blobReader', () => {
    it('works with async/await and resolves', async () => {
        expect.assertions(1);
        await expect(blobReader(myBlobCorrect)).resolves.toEqual('This is my blob content');
    });

    // TODO: Add reject case.
});
