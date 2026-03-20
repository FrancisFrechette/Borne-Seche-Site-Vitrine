import { MongoMemoryServer } from 'mongodb-memory-server'
import { spawn } from 'child_process'

const mongod = await MongoMemoryServer.create({
  binary: {
    version: '7.0.0',
    arch: 'x64',
  },
})
const uri = mongod.getUri()

console.log(`\n🗄️  MongoDB Memory Server started at: ${uri}\n`)

const child = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    DATABASE_URL: uri,
  },
  shell: true,
})

const cleanup = async () => {
  child.kill()
  await mongod.stop()
  console.log('\n🗄️  MongoDB Memory Server stopped.')
  process.exit(0)
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

child.on('exit', async (code) => {
  await mongod.stop()
  process.exit(code ?? 0)
})
