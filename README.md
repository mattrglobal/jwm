# JSON Web Message (JWM) RFC Draft

This is a draft RFC outline the definition of JSON Web Messages.

## Contributing

The main specification is written in the XML format outlined by [](RFC), however to preview the changes you have made in
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

Update `draft-ietf-looker-jwm.xml` file with your desired changes.

Run the following to compile the new RFC txt file from the XML.

`xml2rfc *.xml`

//TODO add a pre-commit hook so the latest draft is always in the repo?