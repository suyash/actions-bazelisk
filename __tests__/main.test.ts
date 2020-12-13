import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['GITHUB_API_URL'] = 'https://api.github.com'
  process.env['GITHUB_SERVER_URL'] = 'https://github.com'
  process.env['RUNNER_TEMP'] = './tmp'
  process.env['RUNNER_TOOL_CACHE'] = './tmp/cache'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
