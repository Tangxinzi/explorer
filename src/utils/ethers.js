import { ethers } from 'ethers'
import { CryptoJS } from '../assets/js/CryptoJS'


/**
 * 生成一个随机的钱包
 */
export const wallet = () => {
    var privateKey = ethers.utils.randomBytes(32);
    var wallet = new ethers.Wallet(privateKey);
    return wallet
}

/**
 * 生成keystory
 * @param {object} wallet 生成的钱包对象
 * @param {string} pwd 用户输入的密码
 */
export const keystory = (wallet, pwd) => {
    return wallet.encrypt(pwd)
}

/**
 * 根据keystory和密码返回钱包
 * @param {string} keystory 生成的钱包对象
 * @param {string} pwd 用户输入的密码
 */
export const fromEncryptedJson = (keystory, pwd) => {
    return ethers.Wallet.fromEncryptedJson(keystory, pwd)
}



// ---------------------华丽的分割线------------------------

/**
 * key 加密密码
 * iv 加密向量值
 */
const key = "sanji@123!abcd9876poi..!"; //秘钥
const iv = ""; //向量


/**
 * 加密文件
 * @param {string} message
 */
export const encryptByDES = (message) => {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

/**
 * 解密文件
 * @param {string} ciphertext 
 */
export const decryptByDES = (ciphertext) => {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
