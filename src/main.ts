import https from 'https'
import {URL} from 'url'

import * as core from '@actions/core'
import {downloadTool, cacheFile} from '@actions/tool-cache'

async function run(): Promise<void> {
  try {
    const data = await get({
      host: new URL(process.env.GITHUB_API_URL as string).hostname,
      port: 443,
      path: '/repos/bazelbuild/bazelisk/releases/latest',
      method: 'GET',
      headers: {
        'user-agent': 'suyash/actions-bazelisk'
      }
    })

    const bazelisk = await downloadTool(
      `${process.env.GITHUB_SERVER_URL}/bazelbuild/bazelisk/releases/download/${
        data.tag_name
      }/${releaseName()}`
    )

    const cachedPath = await cacheFile(
      bazelisk,
      process.platform === 'win32' ? 'bazel.exe' : 'bazel',
      'bazel',
      data.tag_name
    )

    core.debug(`bazelisk downloaded and cached at ${cachedPath}`)

    core.addPath(cachedPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get(url: https.RequestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    })

    req.on('error', reject)
  })
}

function releaseName(): string {
  switch (process.platform) {
    case 'win32':
      return 'bazelisk-windows-amd64.exe'
    case 'darwin':
      return 'bazelisk-darwin-amd64'
    default:
      return 'bazelisk-linux-amd64'
  }
}

run()
