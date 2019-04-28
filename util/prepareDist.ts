import shell from 'shelljs'

shell.mkdir('dist')

const fileList = shell.cat('./util/dist_files.txt').stdout.split('\n')

fileList.pop()

fileList.forEach(fileUrl => {
  console.log(`Copying file: ${fileUrl}...`)
  shell.cp('-rf', fileUrl, './dist')
})
