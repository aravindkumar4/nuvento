import * as CryptoJS from 'crypto-js';
const cfg = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };

class Encrption {

    /*
  * Encrypt a derived hd private key with a given pin and return it in Base64 form
  */
   static encryptAES = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
  };


  /**
   * Decrypt an encrypted message
   * @param encryptedBase64 encrypted data in base64 format
   * @param key The secret key
   * @return The decrypted content
   */
 static decryptAES = (encryptedBase64, key) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    if (decrypted) {
      try {
        console.log(decrypted);
        const str = decrypted.toString(CryptoJS.enc.Utf8);
        if (str.length > 0) {
          return str;
        } else {
          return 'error 1';
        } 
      } catch (e) {
        return 'error 2';
      }
    }
    return 'error 3';
  };

}

export default Encrption;