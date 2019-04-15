# Alloy

Alloy is the web SDK for the Adobe Experience Platform. It allows for streaming data into the platform, syncing identities, personalizing content, and more. This repository is currently under active development and is not yet intended for general consumption.

For documentation on how to use Alloy, please see the [documentation](https://app.gitbook.com/@launch/s/adobe-experience-platform-web-sdk).

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information about how our community works.

To get started on development:

1. Install [node.js](https://nodejs.org/).
1. Clone the repository.
1. After navigating into the project directory, install project dependencies by running `npm install`.

Several npm scripts have been provided for assisting in development. Each script can be run by navigating to the cloned repository directory in a terminal and executing `npm run scriptname` where `scriptname` is the name of the script you would like to run. The most useful scripts are as follows:

* `dev` Spins up a sandbox website where you can manually test the library as though you were a consumer using the library. The sandbox files can be found in the `sandbox` directory and can be modified to suit your needs.
* `test` Runs unit tests against source files. Tests can be found in the `test` directory.
* `test:watch` Same as `test`, but will re-run the tests as you change source files or test files.
* `lint` Analyzes code for potential errors.
* `format` Formats code to match agreed-upon style guidelines.

For functional testing, please see the [functional testing documentation](test/docs/functional.md).

When you attempt to commit code changes, several of the above tasks will be run automatically to help ensure that your changes pass tests and are consistent with agreed-upon standards.

Thank you for your interest in contributing! 
