import * as axios from 'axios';
import { HTTP_CODES, SessionToken, UserCredentials } from '../app/Models/ServerModels';
import { UserCredentialsDbAccess } from '../app/Authorization/UserCredentialsDbAccess';

axios.default.defaults.validateStatus =  () => {
    return true
}

const serverUrl = 'http://localhost:8080';
const itestUserCredentials: UserCredentials = {
    accessRights: [1,2,3],
    password: 'iTestPassword',
    username: 'iTestUser',
}

describe('Server itest suite', () => {
    // this might not work in jest
    // const testIfServerReachable = await serverReachable() ? test : test.skip
    let userCredentialsDbAccess: UserCredentialsDbAccess;
    let sessionToken: SessionToken;
    beforeAll(()=>{
        userCredentialsDbAccess = new UserCredentialsDbAccess()
    })

    test('sever reachable', async () => {
        await serverReachable();
        expect(true).toBeTruthy()
    });

    test('server reachable',async () => {
        const response = await axios.default.options(serverUrl)
        expect(response.status).toBe(HTTP_CODES.OK)
    })

    it('put credentials inside databasde',async () => {
        await userCredentialsDbAccess.putUserCredential(itestUserCredentials)
    });

    it('rejet invalid credentials',async () => {
        const response = await axios.default.post(`${serverUrl}/login`, {
            username: "someWrongCred",
            password: "someWrongCred"
        })
        expect(response.status).toBe(HTTP_CODES.NOT_fOUND)
    });

    it('login successfull with correct credentials',async () => {
        const response = await axios.default.post(`${serverUrl}/login`, {
            username: itestUserCredentials.username,
            password: itestUserCredentials.password,
        })
        expect(response.status).toBe(HTTP_CODES.CREATED)
        sessionToken = response.data;
    });

    it('query data',async () => {
        const response = await axios.default.get(`${serverUrl}/users?name=some$`, {
            headers: {
                Authorization: sessionToken.tokenId,

            }
        })
        expect(response.status).toBe(HTTP_CODES.OK)
    });

    it('query data with invalid token',async () => {
        const response = await axios.default.get(`${serverUrl}/users?name=some$`, {
            headers: {
                Authorization: sessionToken.tokenId  + 'someInvalidString',

            }
        })
        expect(response.status).toBe(HTTP_CODES.UNAUTHORIZED)
    });
})


/**
 * not usable in Jest 
 * @see https://github.com/facebook/jest/issues/8604
 */
async function serverReachable(): Promise<boolean> {
    try {
        await axios.default.get(serverUrl)
    } catch (error) {
        console.log('Server not reachable');
        return true;
    }
    return true
}