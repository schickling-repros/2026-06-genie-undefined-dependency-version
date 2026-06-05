import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { $ } from 'bun'

const upstreamCommit = 'b0d1daea4e21468f9813f39a234732456d8e2764'
const upstreamDir = join(process.cwd(), '.upstream', 'effect-utils')

if (existsSync(upstreamDir) === false) {
  await mkdir(join(process.cwd(), '.upstream'), { recursive: true })
  await $`git clone --quiet https://github.com/overengineeringstudio/effect-utils.git ${upstreamDir}`
  await $`git -C ${upstreamDir} -c advice.detachedHead=false checkout --quiet ${upstreamCommit}`
}

const { packageJson } = await import(
  `${upstreamDir}/packages/@overeng/genie/src/runtime/package-json/mod.ts`
)

const generated = packageJson({
  name: 'synthetic-package',
  version: '1.0.0',
  dependencies: {
    valid: '1.0.0',
    malformed: undefined,
  } as unknown as Record<string, string>,
})

console.log(generated.stringify({ location: '.', cwd: process.cwd() }))
