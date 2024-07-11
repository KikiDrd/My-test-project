const inquirer = require('inquirer')
const { join } = require('path')
const { exec } = require('child_process')

const environmentOptions = [
  'project_cz_dev',
  'project_cz_stage',
  'project_cz_prod',
]

const args = process.argv.slice(2)
let environmentArg

if (args.length > 0) {
  environmentArg = args[0]
}

const run = (environment, mode) => {
  console.group('Starting cypress')
  console.log('Mode:', mode)
  console.log('environment:', environment)

  const cypressPath = join(__dirname, 'node_modules/.bin/cypress')
  const crossEnvPath = join(__dirname, 'node_modules/.bin/cross-env')
  let command

  if (mode === 'open') {
    command = `"${cypressPath}" open --env configEnv=${environment}`
  } else if (mode === 'run - local') {
    command = `"${cypressPath}" run --env configEnv=${environment} --browser chrome`
  } else if (mode === 'run - dashboard') {
    command = `"${cypressPath}" run --env configEnv=${environment} --browser chrome --record --key 0a6c4f19-3a97-4389-8f6f-3c7cb7025113`
  } else {
    console.log('Invalid mode')
    return
  }


  console.log('Command:', command)
  const childProcess = exec(
    `"${crossEnvPath}" ${command}`,
    { maxBuffer: 1024 * 1024 * 10 },
    (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
      if (error !== null) {
        console.log(`exec error: ${error}`)
      }
    }
  )

  childProcess.stdout.on('data', (data) => {
    console.log(data)
  })

  childProcess.stderr.on('data', (data) => {
    console.error(data)
  })

  childProcess.on('close', (code) => {
    console.log(`Cypress process exited with code ${code}`)
  })

  console.groupEnd()

  console.log(`---------------`)
}

const questions = [
  {
    type: 'list',
    choices: ['open', 'run - local', 'run - dashboard'],
    name: 'mode',
    message: 'Would you like to open or run your tests?',
    default: 'open',
  },
]

if (!environmentArg) {
  questions.push({
    type: 'list',
    choices: environmentOptions,
    name: 'environment',
    message: 'Select the environment:',
  })
}

inquirer.prompt(questions).then((answers) => {
  const environment = environmentArg || answers.environment
  run(environment, answers.mode)
  console.log('Selected Environment:', environment);
})


