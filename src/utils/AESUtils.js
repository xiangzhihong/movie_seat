import React, {Component} from 'react';

const CryptoJS = require('./aesConstant.js');

const key = CryptoJS.enc.Utf8.parse('y2W89L6BkRAFljhN');
const iv = CryptoJS.enc.Utf8.parse('dMitHORyqbeYVE0o');
const password = [
  'YLyNM6KSkEUDmjYQeVuq8g==',
  'vmtsERJJrpf8RxGpBPBlDg==',
  'xnBU0+1PlURKNi9RNor9cA==',
  '8bQpp1LKU4irFpYHFWTiBQ==',
  'QNtjvryHoy21huZjJwLfMg==',
  'LoLvP0oeOAHpSUpsBWk0VQ==',
  'YbcwHBFhZ7YIWGszUoBSNA==',
];

export default class AESUtils {
  static encrypt(source) {
    const password = CryptoJS.enc.Utf8.parse(source);
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }); // CryptoJS.pad.Pkcs7
    return encrypted;
  }

  static decrypt(encrypted) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }); // CryptoJS.pad.Pkcs7
    const decryptValue = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptValue;
  }

  static AES(inputValue) {
    const encryptValue = AESUtils.encrypt(inputValue);
    const dateStr = '日一二三四五六'.charAt(new Date().getDay());
    // console.log(dateStr);
    let encryptValue2 = '';
    if (dateStr == '一') {
      encryptValue2 = encryptValue + password[0];
    } else if (dateStr == '二') {
      encryptValue2 = encryptValue + password[1];
    } else if (dateStr == '三') {
      encryptValue2 = encryptValue + password[2];
    } else if (dateStr == '四') {
      encryptValue2 = encryptValue + password[3];
    } else if (dateStr == '五') {
      encryptValue2 = encryptValue + password[4];
    } else if (dateStr == '六') {
      encryptValue2 = encryptValue + password[5];
    } else if (dateStr == '日') {
      encryptValue2 = encryptValue + password[6];
    }
    const AesValue2 = AESUtils.encrypt(encryptValue2);
    const couponCardNo = AesValue2.toString();
    // encodeURIComponent(AesValue2);
    // console.log(couponCardNo)
    return couponCardNo;
  }
}
