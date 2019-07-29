const ws = require('ws')
const expect = require('chai').expect;


describe('Status WebSocket Tests', () => {

    var w, messages = [];
    beforeEach(function (done) {
        w = new ws(process.env.WS_URL)

        w.on('message', (msg) => {
            messages.push(msg);
        })

        let msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'status', 
            key: 'deriv:tBTCF0:USTF0' 
          });

        w.on('open', () => {
            w.send(msg);
            done();
        });

    })

    it('Channel should get subscribed if the event is of type subscribe', function (done) {
        if (messages.length == 0) {
            setTimeout(() => {
                console.log("inside tests \n" + messages);
                expect(JSON.parse(messages[1]).event).to.equal('subscribed');
                expect(JSON.parse(messages[0]).platform.status).to.equal(1);
                done();
            }, 3000);
        }
    })
    it('Should validate the ping message', function (done) {
        let msg = JSON.stringify({
            event: 'ping',
            channel: 'status',
            symbol: 'tBTCUSD'
        });

        w.send(msg);
        if (messages.length == 0) {
            setTimeout(() => {
                console.log("inside tests \n" + messages);
                expect(messages.filter(key=>JSON.parse(key).event=="pong").length).to.equal(1);
                done();
            }, 3000);
        }
    })
    it('Subscribed event should have channel name as status',(done)=>{
        if (messages.length == 0) {
            setTimeout(() => {
                console.log("inside tests \n" + messages);
                expect(JSON.parse(messages[1]).channel).to.equal('status');
                done();
            }, 3000);
        }
    })
    it('Should receive messages with the channel id',(done)=>{
        if (messages.length == 0) {
            setTimeout(() => {
                console.log("inside tests \n" + messages);
                let channelId = JSON.parse(messages[1]).chanId;
                expect(JSON.parse(messages[messages.length-1])[0]).to.equal(channelId);
                done();
            }, 3000);
        }
    })
    it('Should have symbol name set to the subscribed symbol in subscribed event',(done)=>{
        if (messages.length == 0) {
            setTimeout(() => {
                console.log("inside tests \n" + messages);
                expect(JSON.parse(messages[1]).key).to.equal('deriv:tBTCF0:USTF0');
                done();
            }, 3000);
        }
    })

    afterEach(() => {
        w.close();
        messages = [];
    })

})