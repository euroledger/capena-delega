const http = require('http');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { createTerminus } = require('@godaddy/terminus');
const express = require('express');
const ngrok = require('ngrok');
const cache = require('./model');
const utils = require('./utils');


var fs = require('fs');
var https = require('https');

require('dotenv').config();

const { AgencyServiceClient, Credentials } = require("@streetcred.id/service-clients");

const client = new AgencyServiceClient(
    new Credentials(process.env.ACCESSTOK, process.env.SUBKEY),
    { noRetryPolicy: true });


var certOptions = {
    key: fs.readFileSync(path.resolve('./cert/server.key')),
    cert: fs.readFileSync(path.resolve('./cert/server.crt'))
}

var app = express();
app.use(cors());
app.use(parser.json());
app.use(express.static(path.join(__dirname, 'build')))

// add in routes from the two platforms eBay and Etsy
require('./routes/ebay')(app)
require('./routes/etsy')(app);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

let ebayCredentialId;
let etsyCredentialId;
let uberCredentialId;
let connectionId;
let registered = false;
let loginConfirmed = false;
let credentialAccepted = false;
let verificationAccepted = false;
let platform;
let name = '';
let connectionAndCredentials;

// WEBHOOK ENDPOINT
app.post('/webhook', async function (req, res) {
    try {
        console.log("got webhook" + req + "   type: " + req.body.message_type);
        if (req.body.message_type === 'new_connection') {

            connectionId = req.body.object_id;

            console.log("new connection notif, connection = ", req.body);
            try {
                // use the connection contract to get the name for the front end to use
                console.log("Calling getConnection with connection id", connectionId);
                connectionContract = await getConnectionWithTimeout(connectionId);
                console.log("--------------->NEW CONNECTION: ", connectionContract);
                name = connectionContract.name;
            } catch (e) {
                console.log(e.message || e.toString());
                return
            }
            registered = true;

            const attribs = cache.get(req.body.object_id);
            console.log("attribs from cache = ", attribs);
            var param_obj = JSON.parse(attribs);
            var params =
            {
                credentialOfferParameters: {
                    definitionId: process.env.CRED_DEF_ID_USER_DETAILS,
                    connectionId: req.body.object_id,
                    credentialValues: {
                        'First Name': param_obj["firstname"],
                        'Last Name': param_obj["lastname"],
                        'Email Address': param_obj["email"],
                        'Country': param_obj["country"],
                        'Acme Access Token': param_obj["passcode"]
                    }
                }
            }
            console.log(">>>>>>>>>>>>> Creating credential with params ", params);
            await client.createCredential(params);
            console.log("CREDENTIAL CREATED user details!");
        }
        else if (req.body.message_type === 'credential_request') {
            console.log("cred request notif");
            // if (connected) {
            if (platform === "ebay") {
                ebayCredentialId = req.body.object_id;
                console.log("Issuing ebay credential to wallet, id = ", ebayCredentialId);
                await client.issueCredential(ebayCredentialId);
            } else if (platform === "etsy") {
                etsyCredentialId = req.body.object_id;
                console.log("Issuing etsy credential to wallet, id = ", etsyCredentialId);
                await client.issueCredential(etsyCredentialId);
            } else if (platform === "uber") {
                uberCredentialId = req.body.object_id;
                console.log("Issuing uber credential to wallet, id = ", uberCredentialId);
                await client.issueCredential(uberCredentialId);
            } else {
                // user details
                userRegistrationCredentialId = req.body.object_id;
                console.log("Issuing user details credential to wallet, id = ", userRegistrationCredentialId);
                await client.issueCredential(userRegistrationCredentialId);
            }
            console.log("Credential Issue -> DONE");
            credentialAccepted = true;
            // }
        }
        else if (req.body.message_type === 'verification') {
            console.log("cred verificatation notif");
            verificationAccepted = true;
            console.log(req.body);

            console.log("Getting verification attributes with verification id of ", req.body.object_id);

            let proof = await client.getVerification(req.body.object_id);

            // const data = proof["proof"]["eBay Seller Proof"]["attributes"];

            // TODO package this stuff up into platform-specific modules
            console.log("Proof received; proof data = ", proof["proof"]);

            connectionId = proof["proof"]["Login Verification"]["attributes"]["Capena Access Token"];

            // verify that the connection record exists for this id
            let connectionContract;
            try {
                connectionContract = await getConnectionWithTimeout(connectionId);
            } catch (e) {
                console.log(e.message || e.toString());
                res.status(500).send("connection record not found for id " + connectionId);
            }

            if (connectionContract) {
                console.log("connectionContract = ", connectionContract);

                console.log("---------------- GET ALL CREDENTIALS -------------------");

                // retreive all credentials for this id
                let credentials = await client.listCredentials();
                var issuedCredentialsForThisConnection = credentials.filter(function (credential) {
                    return credential.connectionId === connectionId;
                });
                console.log(issuedCredentialsForThisConnection)

                var issuedCredentialsForThisUser = credentials.filter(function (credential) {
                    return credential.state === "Issued" && credential.connectionId === connectionId;
                });

                // console.log(issuedCredentialsForThisUser);

                connectionAndCredentials = {
                    connectionContract: connectionContract,
                    credentials: issuedCredentialsForThisUser
                }
                // save the credential IDs of previously issued credentials -> these can be used for revocation
                issuedCredentialsForThisUser.forEach(credential => {
                    if (credential.values.Platform === "etsy") {
                        etsyCredentialId = credential.credentialId;
                    } else if (credential.values.Platform === "ebay") {
                        console.log("-> Setting ebayCredentialId to ", credential.credentialId);
                        ebayCredentialId = credential.credentialId;
                    } else if (credential.values.Platform === "uber") {
                        console.log("-> Setting uberCredentialId to ", credential.credentialId);
                        uberCredentialId = credential.credentialId;
                    }
                });
                loginConfirmed = true;
                // res.status(200).send(connectionAndCredentials);
            } else {
                console.log("connection record not found for id ", connectionId);
                res.status(500);
            }
        } else {
            console.log("WEBHOOK message_type = ", req.body.message_type);
            console.log("body = ", req.body);
        }
    }
    catch (e) {
        console.log("/webhook error: ", e.message || e.toString());
    }
});


//FRONTEND ENDPOINTS

app.post('/api/ebay/issue', cors(), async function (req, res) {
    platform = "ebay";
    console.log("IN /api/ebay/issue");
    if (connectionId) {
     
        const d = new Date();
        var params =
        {
            credentialOfferParameters: {
                definitionId: process.env.CRED_DEF_ID_EBAY,
                connectionId: connectionId,
                credentialValues: {
                    "Platform": "ebay",
                    "User Name": req.body["name"],
                    "Feedback Score": req.body["feedbackscore"],
                    "Registration Date": req.body["registrationdate"],
                    "Negative Feedback Count": req.body["negfeedbackcount"],
                    "Positive Feedback Count": req.body["posfeedbackcount"],
                    "Positive Feedback Percent": req.body["posfeedbackpercent"],
                    "Created At": d.toISOString()
                }
            }
        }
        console.log("issue credential with connection id " + connectionId + " params = ", params);
        await client.createCredential(params);
        console.log("----------------------> CREDENTIAL CREATED!");
        res.status(200).send();
    } else {
        res.status(500).send("Not connected");
    }
});



app.post('/api/uber/issue', cors(), async function (req, res) {
    console.log("IN /api/uber/issue");
    platform = "uber";
    if (connectionId) {
        const d = new Date();
        var params =
        {
            credentialOfferParameters: {
                definitionId: process.env.CRED_DEF_ID_UBER,
                connectionId: connectionId,
                credentialValues: {
                    "Platform": "uber",
                    "Driver Name": req.body["driver"],
                    "Driver Rating": req.body["rating"],
                    "Activation Status": req.body["status"],
                    "Trip Count": req.body["tripcount"],
                    "Created At": d.toISOString()
                }
            }
        }
        console.log("issue UBER credential with connection id " + connectionId + " params = ", params);
        await client.createCredential(params);
        console.log("----------------------> CREDENTIAL CREATED!");
        res.status(200).send();
    } else {
        res.status(500).send("Not connected");
    }
});

app.post('/api/etsy/issue', cors(), async function (req, res) {
    console.log("IN /api/etsy/issue");
    platform = "etsy";
    if (connectionId) {
        const d = new Date();
        var params =
        {
            credentialOfferParameters: {
                definitionId: process.env.CRED_DEF_ID_ETSY,
                connectionId: connectionId,
                credentialValues: {
                    "Platform": "etsy",
                    "User Name": req.body["name"],
                    "Feedback Score": req.body["feedbackcount"],
                    "Registration Date": req.body["registrationdate"],
                    "Positive Feedback Percent": req.body["posfeedbackpercent"],
                    "Created At": d.toISOString()
                }
            }
        }
        console.log("issue ETSY credential with connection id " + connectionId + " params = ", params);
        await client.createCredential(params);
        console.log("----------------------> CREDENTIAL CREATED!");
        res.status(200).send();
    } else {
        res.status(500).send("Not connected");
    }
});

async function findClientConnection(connectionId) {
    return await client.getConnection(connectionId);
}

async function getConnectionWithTimeout(connectionId) {
    let timeoutId;

    const delay = new Promise(function (resolve, reject) {
        timeoutId = setTimeout(function () {
            reject(new Error('timeout'));
        }, 3000);
    });

    // overall timeout
    return Promise.race([delay, findClientConnection(connectionId)])
        .then((res) => {
            clearTimeout(timeoutId);
            return res;
        });
}


app.post('/api/login', cors(), async function (req, res) {
    // send connectionless proof request for user registration details

    const policyId = process.env.LOGIN_VERIF_ID;
    const resp = await client.createVerificationFromPolicy(policyId);

    console.log("resp = ", resp);

    res.status(200).send({ login_request_url: resp.verificationRequestUrl });
});

app.get('/api/signout', cors(), async function (req, res) {
    console.log("Signing out...");
    loginConfirmed = false;
    res.status(200).send();
});

app.get('/api/loginconfirmed', cors(), async function (req, res) {
    console.log("Waiting for login confirmation...loginConfirmed = ", loginConfirmed);
    await utils.until(_ => loginConfirmed === true);
    console.log("--> DONE off we go")
    res.status(200).send(connectionAndCredentials);
});


app.post('/api/register', cors(), async function (req, res) {
    console.log("Getting invite...")
    console.log("Invite params = ", req.body);
    const invite = await getInvite(req.body.passcode);
    const attribs = JSON.stringify(req.body);
    console.log("invite= ", invite);
    cache.add(invite.connectionId, attribs);
    res.status(200).send({ invite_url: invite.invitation });
});

app.post('/api/ebay/revoke', cors(), async function (req, res) {
    console.log("revoking ebay credential, id = ", ebayCredentialId);
    await client.revokeCredential(ebayCredentialId);
    console.log("EBAY Credential revoked!");

    console.log("++++ SEND MESSAGE WITH CONNECTION ID ", connectionId);
    const params =
    {
        basicMessageParameters: {
            "connectionId": connectionId,
            "text": "Ebay credential has been revoked. You may want to delete this from your wallet."
        }
    };
    const resp = await client.sendMessage(params);

    console.log("------- Message sent to user's agent !");

    res.status(200).send();
});

app.post('/api/etsy/revoke', cors(), async function (req, res) {
    console.log("revoking credential, id = ", etsyCredentialId);
    await client.revokeCredential(etsyCredentialId);
    console.log("ETSY Credential revoked!");

    const params =
    {
        basicMessageParameters: {
            "connectionId": connectionId,
            "text": "Etsy credential has been revoked. You may want to delete this from your wallet."
        }
    };
    const resp = await client.sendMessage(params);

    console.log("------- Message sent to user's agent !");
    res.status(200).send();
});

app.post('/api/uber/revoke', cors(), async function (req, res) {
    console.log("revoking credential, id = ", uberCredentialId);
    await client.revokeCredential(uberCredentialId);
    console.log("UBER Credential revoked!");

    const params =
    {
        basicMessageParameters: {
            "connectionId": connectionId,
            "text": "Uber credential has been revoked. You may want to delete this from your wallet."
        }
    };
    const resp = await client.sendMessage(params);

    console.log("------- Message sent to user's agent !");
    res.status(200).send();
});

app.get('/api/connected', cors(), async function (req, res) {
    console.log("Waiting for connection...");
    await utils.until(_ => registered === true);
    res.status(200).send(name);
});


app.post('/api/credential_accepted', cors(), async function (req, res) {
    console.log("Waiting for credential to be accepted...");
    await utils.until(_ => credentialAccepted === true);
    credentialAccepted = false;
    res.status(200).send();
});



const getInvite = async (id) => {
    try {
        var result = await client.createConnection({
            connectionInvitationParameters: {
                connectionId: id,
                multiParty: false
            }
        });
        // const getInvite = async () => {
        // try {
        //   let result = await client.createConnection({ connectionInvitationParameters: {} });
        // } catch (e) {
        //   console.log(e.message || e.toString());
        // }
        //   }
        console.log(">>>>>>>>>>>> INVITE = ", result);
        return result;
    } catch (e) {
        console.log(e.message || e.toString());
    }
}

// for graceful closing
// var server = https.createServer(certOptions, app);
var server = https.createServer(certOptions, app);
async function onSignal() {
    var webhookId = cache.get("webhookId");
    const p1 = await client.removeWebhook(webhookId);
    return Promise.all([p1]);
}
createTerminus(server, {
    signals: ['SIGINT', 'SIGTERM'],
    healthChecks: {},
    onSignal
});

const PORT = process.env.PORT || 3002;
var server = server.listen(PORT, async function () {
    // const url_val = await ngrok.connect(PORT);
    // console.log("============= \n\n" + url_val + "\n\n =========");

    try {
        const url_val = process.env.NGROK_URL + "/webhook";
        
        console.log("Using ngrok (webhook) url of ", url_val);
        var response = await client.createWebhook({
            webhookParameters: {
                url: url_val,  // process.env.NGROK_URL
                type: "Notification"
            }
        });
    }
    catch (e) {
        console.log(e);
    }

    cache.add("webhookId", response.id);
    console.log('Listening on port %d', server.address().port);
});
