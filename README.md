# actions-bazelisk

![build-test](https://github.com/suyash/actions-bazelisk/workflows/build-test/badge.svg)

- Download latest bazelisk depending on platform
- Add it to tools cache
- Add it to PATH

## Hacking

Build the typescript and package it for distribution and run tests

```bash
$ npm run all
```

### Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
