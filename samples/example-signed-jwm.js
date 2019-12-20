/*
    The following script generates the example signed JWM featured
    in the draft RFC
*/
const jose = require('jose');
const base64url = require('base64url');
const fs = require('fs-extra');

async function main(){
    //Payload definition
    const payload = {
        id : "urn:uuid:ef5a7369-f0b9-4143-a49d-2b9c7ee51117",
        type : "hello-world-message-type",
        from : "urn:uuid:8abdf5fb-621e-4cf5-a595-071bc2c91d82", 
        expiry : 1516239022,
        time_stamp : 1516269022,
        body : { message: "Hello world!" }
    };

    //Get sender key
    const senderJWK = JSON.parse(await fs.readFile("example-keys/example-sender.json"));
    const key = jose.JWK.asKey(senderJWK);

    //Sign JWM
    const jws = new jose.JWS.Sign(payload);

    //Hmm, why is this called recipients? 
    //Should it not be issuers?
    jws.recipient(key, { typ : 'JWM', kid : key.kid, alg : 'ES256' });

    const compactOutput = jws.sign("compact");
    const jsonOutput = jws.sign("general");
    
    console.log("Compact Output: ");
    console.log(compactOutput);

    console.log("JSON Output: ");
    console.log(JSON.stringify(jsonOutput, null,2));

    console.log("Header Output: ");
    console.log(JSON.stringify(JSON.parse(base64url.decode(jsonOutput.signatures[0].protected)),null,2));
}

main();
