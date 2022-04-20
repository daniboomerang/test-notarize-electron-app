require('dotenv').config()
const { notarize } = require('electron-notarize')

exports.default = async function notarizing (context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }
  const appName = context.packager.appInfo.productFilename
  const password = '@keychain:certificate in my keychain'

  const notarizationData = {
    appBundleId: 'test.notarize.app',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: 'this is my apple developer account email',
    appleIdPassword: password,
    teamId: 'this is my team apple ID'
  }

  console.log('Waiting for Apple notarization:', notarizationData)
  return await notarize(notarizationData)
}
