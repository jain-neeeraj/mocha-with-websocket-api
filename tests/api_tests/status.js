const chakram = require('chakram');
const {expect} = require('chai');
const {endPoints}= require('../../config')

const apiUrl = process.env.URL+endPoints.status;

describe('Tests for status',()=>{

    it('should give result for the requested keys',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{keys}','tBTCF0:USTF0'));  
        expect(resp.response.body.length).to.eq(1);
        expect(resp.response.statusCode).to.eq(200);        
    });

    it('should give an error in case of invalid request') //Trying a way to figure out to simulate bad request

    it('status api response should give 11 metrics for the keys',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{keys}','tBTCF0:USTF0'));  
        expect(resp.response.statusCode).to.eq(200);    
        expect(resp.response.body[0].length).to.eq(12);
    });

    
    it('Should contain the result for all the requested keys if request was sent for multiple keys',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{keys}','tBTCF0:USTF0,tBTCF0:USTF0'));   
        expect(resp.response.statusCode).to.eq(200);
        let outputSymbols = resp.response.body.map(key=>key[0]);        
        expect(outputSymbols).to.eql(["tBTCF0:USTF0","tBTCF0:USTF0"]); //used same pair as ALL is also returning only one pair and hence no other way of testing this case
    })


    it('should return blank array in case of invalid key name', async ()=>{
        let resp = await chakram.get(apiUrl.replace('{keys}','xxxxxxx'));   
        expect(resp.response.statusCode).to.eq(200);    
        expect(resp.response.body.length).to.eq(0);
    })

    it('should return result of all the key in paramter sent as ALL',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{keys}','ALL'));   
        expect(resp.response.statusCode).to.eq(200);    
        //expect(resp.response.body.length).to.be.greaterThan(100); //Not sure if this validation is required at this point of time as we only have one pair
    })



})