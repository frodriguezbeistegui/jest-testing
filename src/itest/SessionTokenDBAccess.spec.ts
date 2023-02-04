import { SessionTokenDBAccess } from "../app/Authorization/SessionTokenDBAccess";
import { SessionToken } from "../app/Models/ServerModels";


describe('First itest suite', () => { 
    let sessionTokenDBAccess: SessionTokenDBAccess;
    let someSessionToken: SessionToken;
    const randomString = Math.random().toString(36).substring(7)

    beforeAll(() => { 
        sessionTokenDBAccess = new SessionTokenDBAccess()
        someSessionToken = {
            userName: 'someUser',
            accessRights: [1,2,3],
            expirationTime: new Date(),
            tokenId: 'SomeTokenId' + randomString,
            valid: true,
        }
     })
    test('store and retrive SessionToken', async () => { 
        await sessionTokenDBAccess.storeSessionToken(someSessionToken);
        const resultToken = await sessionTokenDBAccess.getToken(someSessionToken.tokenId);

        expect(resultToken).toEqual(someSessionToken);

     })
 })