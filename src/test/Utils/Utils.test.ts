import { IncomingMessage } from 'http';
import { Utils } from '../../app/Utils/Utils'

describe('Utils test suite', ()=>{
    test('getRequestPath valid reques', ()=>{
        const request = {
            url: 'http://localhost:8080/login'
        } as IncomingMessage
        const resutlPath = Utils.getRequestBasePath(request);
        expect(resutlPath).toBe('login')

    });

    test('getRequestPath with no path name', ()=>{
        const request = {
            url: 'http://localhost:8080/'
        } as IncomingMessage
        const resutlPath = Utils.getRequestBasePath(request);
        expect(resutlPath).toBeFalsy()

    });

    test('getRequestPath with no path name', ()=>{
        const request = {
            url: 'http://localhost:8080/'
        } as IncomingMessage
        const resutlPath = Utils.getRequestBasePath(request);
        expect(resutlPath).toBeFalsy()

    });
})