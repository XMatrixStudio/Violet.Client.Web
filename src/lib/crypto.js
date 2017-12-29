import crypto from 'crypto'

export default {
  /**
   * SHA512 hash
   *
   * @param {string} value 需要进行hash的字符串
   * @returns {string} SHA512hash后的字符串
   */
  hash: value => crypto.createHash('sha512').update(value).digest('hex')
}
