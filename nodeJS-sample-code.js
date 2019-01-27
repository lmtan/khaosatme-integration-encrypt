const crypto = require('crypto');
function encryptIntegrationData(_secret, _userData) {
  // input
  let secret = _secret;
  let userData = {
      'user_id': _userData.user_id,
      'username': _userData.username
  }

  // prepare
  let keyMd5 = crypto.createHash('md5').update(secret).digest();
  let keyHash = crypto.createHash('md5').update(keyMd5).digest('hex');
  let json = JSON.stringify(userData);
  let cipher = 'aes-128-cbc';
  let ivLength = 16;

  // encryption
  let iv = crypto.randomBytes(ivLength);
  let jsonBuffer = Buffer.from(json, 'binary');
  let cipherObj = crypto.createCipheriv(cipher, keyMd5, iv)
  let encrypted = Buffer.concat([cipherObj.update(jsonBuffer), cipherObj.final()]);
  let encoded = Buffer.concat([iv, encrypted]).toString('base64');
  encoded = encodeURIComponent(encoded);
  
  return {keyHash: keyHash,data: encoded};
}