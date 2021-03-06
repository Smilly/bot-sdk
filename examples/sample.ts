// install and use @vivocha/bot-sdk to run this bot!
 // NB: Change the following line to:
 // import { BotAgentManager, BotFilter, BotRequest, BotResponse } from "@vivocha/bot-sdk";
import { BotAgentManager, BotFilter, BotRequest, BotResponse } from "../dist/index";

// A very simple BotManager and BotAgent implementation
const manager = new BotAgentManager();
manager.registerAgent('simple', async (msg: BotRequest): Promise<BotResponse> => {
  const response: BotResponse = {
    settings: {
      engine: msg.settings.engine
    },
    messages: [{
      code: 'message',
      type: 'text',
      body: 'This is a test. Bye.'
    } as any],
    event: 'end'
  };
  return response;
});

// Run the BotManager
manager.listen(8080);
console.log('BotManager listening at port 8080');

// A really simple BotFilter implementation
// which augments the BotRequest in input with a number of availableAgents 
// and sets if user is premium
// (like in the domain of customer support services)
const filter = new BotFilter(async (msg: BotRequest): Promise<BotRequest> => {
  msg.data = msg.data || {};
  // maybe calling an API...
  msg.data.availableAgents = 5;
  // maybe calling an API or reading from a DB...
  msg.data.isPremiumUser = true;
  return msg;
}, undefined);

filter.listen(8081);
console.log('BotFilter listening at port 8081');
