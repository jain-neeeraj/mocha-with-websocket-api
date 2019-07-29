const ws = require('ws')
const expect = require('chai').expect;


describe('Ticker WebSocket Tests', () => {

    var w, messages = [];
    beforeEach(function (done) {
        w = new ws(process.env.WS_URL)

        w.on('message', (msg) => {
            messages.push(msg);
        })

        let msg = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: 'tBTCUSD'
        })

        w.on('open', () => {
            w.send(msg);
            done();
        });

    })

    it('Channel should get subscribed if the event is of type subscribe', function (done) {
        //this.timeout(50000);
        if (messages.length == 0) {
            setTimeout(() => {
                console.log(messages);
                expect(JSON.parse(messages[1]).event).to.equal('subscribed');
                expect(JSON.parse(messages[0]).platform.status).to.equal(1);
                done();
            }, 3000);
        }
    })
    it('Should validate the ping message', function (done) {
        let msg = JSON.stringify({
            event: 'ping',
            channel: 'ticker',
            symbol: 'tBTCUSD'
        });

        w.send(msg);
        if (messages.length == 0) {
            setTimeout(() => {
                console.log(messages);
                expect(messages.filter(key=>JSON.parse(key).event=="pong").length).to.equal(1);
                done();
            }, 3000);
        }
    })
    it('Subscribed event should have channel name as ticker',(done)=>{
        if (messages.length == 0) {
            setTimeout(() => {
                console.log(messages);
                expect(JSON.parse(messages[1]).channel).to.equal('ticker');
                done();
            }, 3000);
        }
    })
    it('Should receive messages with the channel id',(done)=>{
        if (messages.length == 0) {
            setTimeout(() => {
                console.log(messages);
                let channelId = JSON.parse(messages[1]).chanId;
                expect(JSON.parse(messages[messages.length-1])[0]).to.equal(channelId);
                done();
            }, 3000);
        }
    })
    it('Should have symbol name set to the subscribed symbol in subscribed event',(done)=>{
        if (messages.length == 0) {
            setTimeout(() => {
                console.log(messages);
                expect(JSON.parse(messages[1]).symbol).to.equal('tBTCUSD');
                done();
            }, 3000);
        }
    })
    



    afterEach(() => {
        w.close();
        messages = [];
    })

})