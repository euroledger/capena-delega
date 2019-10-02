require('dotenv').config();
const AgencyServiceClient = require("@streetcred.id/service-clients").AgencyServiceClient;
const Credentials = require("@streetcred.id/service-clients").Credentials;
const client = new AgencyServiceClient(new Credentials(process.env.ACCESSTOK, process.env.SUBKEY));

async function removeWebhooks(tenant_id) {
    var webhooks = await client.listWebhooks(tenant_id);
    console.log(webhooks);
    for(i=0; i < webhooks.length; i ++) {
        await client.removeWebhook(webhooks[i].id, process.env.TENANT_ID)
        .catch(err => console.log(err));
    }
    var webhooks_final = await client.listWebhooks(tenant_id);
    console.log(webhooks_final);
}

removeWebhooks(process.env.TENANT_ID);
