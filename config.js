const production = {
    httpPort: '5000',
    httpsPort: '5001',
    envName: 'production'
}

const staging = {
    httpPort: '3000',
    httpsPort: '3001',
    envName: 'staging'
}

const environments = {
    production,
    staging
}

const currentEnvironment = environments[process.env.NODE_ENV] || staging

module.exports = currentEnvironment
