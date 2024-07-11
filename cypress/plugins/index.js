const fs = require('fs')
const path = require('path')
const gmail = require('gmail-tester')

function initPlugin(on, config) {
  const envName = config.env.configEnv
  const brandName = envName?.split('_')[0]
  const configFile = JSON.parse(
    fs.readFileSync(`environments-${brandName}.json`, 'utf8')
  )

  if (configFile[envName]) {
    config.baseUrl = configFile[envName].e2e.baseUrl || config.baseUrl

    config.env = mergeDeep(config.env, configFile[envName].env)
  }

  on('task', {
    'gmail:check': async (options) => {
      return await gmail.check_inbox(
        path.resolve('./cypress/fixtures/testerztesterova.json'),
        path.resolve('./cypress/fixtures/token.json'),
        {
          ...options,
          wait_time_sec: 8,
          max_wait_time_sec: 30,
          include_body: true,
          label: 'INBOX',
        }
      )
    },
  })

  return config
}

function mergeDeep(target, source) {
  if (typeof target == 'object' && typeof source == 'object') {
    for (const key in source) {
      if (source[key] instanceof Object) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return target
}

module.exports = { initPlugin }
