/*
    Sample multi-recipient script
*/
const jose = require('jose');
const base64url = require('base64url');
const fs = require('fs-extra');

async function main(){
    //Plaintext definition
    const plaintext = {
        id : "urn:uuid:ef5a7369-f0b9-4143-a49d-2b9c7ee51117",
        type : "hello-world-message-type",
        from : "urn:uuid:8abdf5fb-621e-4cf5-a595-071bc2c91d82", 
        expiry : 1516239022,
        time_stamp : 1516269022,
        body : { message: "Hello world!" }
    };

    //Get recipient key
    const recipientJWK = JSON.parse(await fs.readFile("example-keys/example-recipient.json"));
    const key = jose.JWK.asKey(recipientJWK);
    
    //Prepare JWM
    const jwe = new jose.JWE.Encrypt(
        JSON.stringify(plaintext),
        { 
            typ : 'JWM',
            enc : "A256GCM"
        });

    //Encrypt to single recipient
    jwe.recipient(key, { kid : key.kid, alg : 'ECDH-ES+A256KW' });
    //Drop the second recipient, we are only trying to show the output format
    jwe.recipient(key, { kid : key.kid, alg : 'ECDH-ES+A256KW' });

    //Produce the general serialization of the JWM
    const jwmGeneral = jwe.encrypt('general');

    console.log("JSON Serialization:");
    jwmGeneral.recipients.shift();
    console.log(JSON.stringify(jwmGeneral, null, 2));
    
    const protectedHeader = JSON.parse(base64url.decode(jwmGeneral.protected));
    const recipientHeader = jwmGeneral.recipients[0];

    console.log("Recipient Header:");
    console.log(JSON.stringify(recipientHeader, null, 2));

    console.log("Shared Protected Header:");
    console.log(JSON.stringify(protectedHeader, null, 2));
}

main();
