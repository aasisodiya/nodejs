# Mocha

- [Mocha](#mocha)
  - [Troubleshooting](#troubleshooting)
    - [Error: unable to get local issuer certificate](#error-unable-to-get-local-issuer-certificate)

[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)](https://mochajs.org/)

## Troubleshooting

### Error: unable to get local issuer certificate

```bash
Error: unable to get local issuer certificate
    at TLSSocket.onConnectSecure (_tls_wrap.js:1497:34)
    at TLSSocket.emit (events.js:315:20)
    at TLSSocket.EventEmitter.emit (domain.js:467:12)
    at TLSSocket._finishInit (_tls_wrap.js:932:8)
    at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:706:12) {
  code: 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
  response: undefined
```

Solution that worked for me, was to run below 3 commands before running `npm test` again

```bash
npm config set strict-ssl=false
npm config set registry http://registry.npmjs.org/
set NODE_TLS_REJECT_UNAUTHORIZED=0
```
