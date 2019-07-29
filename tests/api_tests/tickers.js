const chakram = require('chakram');
const {expect} = require('chai');
const {endPoints}= require('../../config')

const apiUrl = process.env.URL+endPoints.tickers;

describe('Tests for tickers api',()=>{

    it('Should contain the result for only one symbol if request was sent for one symbol',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{symbol}','tBTCUSD'));   
        expect(resp.response.statusCode).to.eq(200);    
        expect(resp.response.body.length).to.eq(1);
        expect(resp.response.body[0][0]).to.eq('tBTCUSD');
    });

    it('Tickers api response should give 11 metrics for the symbol',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{symbol}','tBTCUSD'));   
        expect(resp.response.statusCode).to.eq(200);    
        expect(resp.response.body[0].length).to.eq(11);
    });


    it('should give an error in case of invalid request') //Trying a way to figure out to simulate bad request

    it('Should contain the result for all the requested symbols if request was sent for multiple symbols',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{symbol}','tBTCUSD,tLTCUSD,fUSD'));   
        expect(resp.response.statusCode).to.eq(200);
        let outputSymbols = resp.response.body.map(key=>key[0]);        
        expect(outputSymbols).to.eql(["tBTCUSD", "tLTCUSD", "fUSD"]);
    })

    it('should return blank array in case of invalid symbol name', async ()=>{
        let resp = await chakram.get(apiUrl.replace('{symbol}','xxxxxxx'));   
        expect(resp.response.statusCode).to.eq(200);    
        expect(resp.response.body.length).to.eq(0);
    })

    it('should return result of all the symbols in paramter sent as ALL',async ()=>{
        let resp = await chakram.get(apiUrl.replace('{symbol}','ALL'));   
        expect(resp.response.statusCode).to.eq(200);    
        expect(resp.response.body.length).to.be.greaterThan(100); //assuming total number of symbols will always be more then 100. this number can be fetched from DB
    })
    
})