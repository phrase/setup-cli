# setup-cli

This action installs [Phrase](https://phrase.com/) [CLI tool](https://github.com/phrase/phrase-cli) for translation management.

# Usage

See [action.yml](action.yml)

```yaml
steps:
- uses: actions/checkout@v3
- uses: phrase/setup-cli@v1
  with:
    version: 2.6.6
- run: phrase pull
- run: phrase push --wait
```

Before running the tool, you need to configure it, typically using a configuration file named `.phrase.yml`. More information can be found [here](https://support.phrase.com/hc/en-us/articles/5808300599068-Using-the-CLI-Strings-).

For authentication, you will probably want to use the authentication token passed through an environment variable `PHRASE_ACCESS_TOKEN`. More info at the support link above.


# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

Most of the code has been copied over from https://github.com/winify-ag/setup-phraseapp (see https://github.com/phrase/phrase-cli/issues/119). Big thanks to original authors!

# Contributions

Contributions are welcome!

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
