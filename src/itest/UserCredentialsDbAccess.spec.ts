import { UserCredentials } from "../app/Models/ServerModels";
import { UserCredentialsDbAccess } from '../app/Authorization/UserCredentialsDbAccess';

describe('UserCredentialsDbAccess', () => {
    let userCredentialsDbAccess: UserCredentialsDbAccess;
    let someUserCredentials: UserCredentials;
    const randomString = Math.random().toString(36).substring(7)

    beforeAll(() => { 
      userCredentialsDbAccess = new UserCredentialsDbAccess()  
      someUserCredentials = {
        username: 'someUser',
        password: randomString,
        accessRights: [1,2,3],
      }
     })

     it('should store and retrieve UserCredentials', async () => {
        await userCredentialsDbAccess.putUserCredential(someUserCredentials)
        const resultCredentials = await userCredentialsDbAccess.getUserCredential(someUserCredentials.username, someUserCredentials.password)

        expect(resultCredentials).toMatchObject(someUserCredentials)
     })

      it('should delete UserCredentilas', async () => {
        await userCredentialsDbAccess.removeUserCredential(someUserCredentials)
        const resultCredentials = await userCredentialsDbAccess.getUserCredential(someUserCredentials.username, someUserCredentials.password)
        expect(resultCredentials).toBeUndefined()
      })

      it('delete missing UserCredentials throws error',async () => {
        try {
            await userCredentialsDbAccess.getUserCredential(someUserCredentials.username, someUserCredentials.password)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error).toHaveProperty('message', 'UserCredentials not deleted!')    
        }
      })
})