/*
    The following script generates the example encrypted JWM featured
    in the draft RFC
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
    const recipient = await fs.readFile("example-keys/example-recipient.json");
    const recipientJWK = JSON.parse(recipient.toString());
    key = jose.JWK.asKey(recipientJWK);

    //Prepare JWM
    const jwe = new jose.JWE.Encrypt(
        JSON.stringify(plaintext),
        { enc : "A128GCM", kid : key.kid, typ : 'JWM' });

    //Encrypt to single recipient
    jwe.recipient(key);

    const jwmGeneral = jwe.encrypt('general');

    console.log("JSON Serialization:");
    console.log(JSON.stringify(jwmGeneral, null, 2));

    console.log("Protected Header:");
    var protectedHeader = JSON.parse(base64url.decode(jwmGeneral.protected));
    console.log(JSON.stringify(protectedHeader,null,2));
}

main();
