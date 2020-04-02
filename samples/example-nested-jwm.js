/*
    The following script generates the example signed JWM featured
    in the draft RFC
*/
const jose = require('jose');
const base64url = require('base64url');
const fs = require('fs-extra');

async function main() {
    //Payload definition
    const payload = {
        id: "urn:uuid:ef5a7369-f0b9-4143-a49d-2b9c7ee51117",
        type: "hello-world-message-type",
        from: "urn:uuid:8abdf5fb-621e-4cf5-a595-071bc2c91d82",
        expiry: 1516239022,
        time_stamp: 1516269022,
        body: { message: "Hello world!" }
    };

    //Get sender key
    const senderJWK = JSON.parse(await fs.readFile("example-keys/example-sender.json"));
    const jwsKey = jose.JWK.asKey(senderJWK);

    //Sign JWM
    const jws = new jose.JWS.Sign(payload);

    //Hmm, why is this called recipients? 
    //Should it not be issuers?
    jws.recipient(jwsKey, { typ: 'JWM', kid: jwsKey.kid, alg: 'ES256' });

    const jwsCompactOutput = jws.sign("compact");
    const jwsJsonOutput = jws.sign("general");

    console.log("Compact Output: ");
    console.log(jwsCompactOutput);

    console.log("JSON Output: ");
    console.log(JSON.stringify(jwsJsonOutput, null, 2));

    console.log("Header Output: ");
    console.log(JSON.stringify(JSON.parse(base64url.decode(jwsJsonOutput.signatures[0].protected)), null, 2));


    // NEST JWS INSIDE JWE

    //Get recipient key
    const recipientJWK = JSON.parse(await fs.readFile("example-keys/example-recipient.json"));
    const jweKey = jose.JWK.asKey(recipientJWK);

    //Prepare JweJson
    const jweJson = new jose.JWE.Encrypt(
        JSON.stringify(jwsJsonOutput),
        {
            typ: 'JWM',
            enc: "A256GCM",
            kid: jweKey.kid,
            alg: 'ECDH-ES+A256KW'
        });
    
    // Prepare JweCompact
    const jweCompact = new jose.JWE.Encrypt(
        jwsCompactOutput,
        {
            typ: 'JWM',
            enc: "A256GCM",
            kid: jweKey.kid,
            alg: 'ECDH-ES+A256KW'
        });

    //Encrypt JSON to single recipient
    jweJson.recipient(jweKey);

    // Encrypt compact to single recipient
    jweCompact.recipient(jweKey);

    //Produce the general serialization of the JWM
    const nestedJwmGeneral = jweJson.encrypt('general');
    const nestedJwmCompact = jweCompact.encrypt('compact');

    console.log("JSON Serialization:");
    console.log(JSON.stringify(nestedJwmGeneral, null, 2));

    console.log("Compact Serialization:");
    console.log(nestedJwmCompact);

    const protectedHeader = JSON.parse(base64url.decode(nestedJwmGeneral.protected));

    console.log("Header:");
    console.log(JSON.stringify(protectedHeader, null, 2));

}

main();
