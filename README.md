# JSON Web Message (JWM) IETF Internet Draft RFC

JSON Web Message (JWM) is a flexible way of describing an application-level message encoded in JSON that is suitable for transfer over a variety of transport protocols. JWMs through the application of JSON Web Signature (JWS) and JSON Web Encryption (JWE) can be digitally signed, integrity protected and or achieve confidentiality via encryption.

This is currently an IETF internet draft RFC available [here](https://datatracker.ietf.org/doc/draft-looker-jwm/).

## Contributing

The main specification is written in the XML format outlined by [RFC7991](https://tools.ietf.org/html/rfc7991), however to preview the changes you have made in
the final format, the following steps can be followed.

### Setup

The tool `xml2rfc` is used to convert the raw xml representation of the specification into the final text view.

To install `xml2rfc`, run the following commands

#### Mac

If you do not have the python package manager `pip` installed on your machine, run the following.

`easy_install pip`

Now install the `xml2rfc` package using pip.

`pip install xml2rfc`

### Updating Docs

Update `draft-looker-jwm.xml` file with your desired changes.

Run the following to compile the new RFC txt file from the XML.

`xml2rfc *.xml`
