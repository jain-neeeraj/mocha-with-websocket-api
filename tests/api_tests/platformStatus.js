const chakram = require('chakram');
const {expect} = require('chai');
const {endPoints}= require('../../config')

const apiUrl = process.env.URL+endPoints.platformStatus;

describe('Tests for platform status',()=>{

    it('should pass if the platform is active',async ()=>{
        let resp = await chakram.get(apiUrl);        
        expect(resp.response.body).to.eql([1]);
        expect(resp.response.statusCode).to.eq(200);        
    });

    it('should give an error in case of invalid request') //Trying a way to figure out to simulate bad request


})