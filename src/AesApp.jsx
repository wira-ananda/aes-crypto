import React, { useState } from "react";
import CryptoJS from "crypto-js";

const AesApp = () => {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [iv, setIv] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [plainText, setPlainText] = useState("");

  const encryptText = () => {
    if (!key || !text) {
      alert("Masukkan kunci dan teks yang akan dienkripsi!");
      return;
    }

    const ivRandom = CryptoJS.lib.WordArray.random(16);

    const keyUtf8 = CryptoJS.enc.Utf8.parse(key.padEnd(32));

    const encrypted = CryptoJS.AES.encrypt(text, keyUtf8, {
      iv: ivRandom,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    setIv(ivRandom.toString(CryptoJS.enc.Base64));
    setCipherText(encrypted.toString());
  };

  const decryptText = () => {
    if (!key || !cipherText || !iv) {
      alert("Masukkan kunci, IV, dan cipherteks yang akan didekripsi!");
      return;
    }

    const keyUtf8 = CryptoJS.enc.Utf8.parse(key.padEnd(32));
    const ivUtf8 = CryptoJS.enc.Base64.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(cipherText, keyUtf8, {
      iv: ivUtf8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    setPlainText(decrypted.toString(CryptoJS.enc.Utf8));
  };

  const resetFields = () => {
    setKey("");
    setText("");
    setIv("");
    setCipherText("");
    setPlainText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AES Enkripsi dan Dekripsi</h2>
      <label>Kunci:</label>
      <input
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Masukkan kunci"
      />
      <br />

      <label>Teks untuk Enkripsi:</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Masukkan teks"
      />
      <br />

      <button onClick={encryptText}>Enkripsi</button>
      <button onClick={decryptText}>Dekripsi</button>
      <button onClick={resetFields}>Reset</button>

      <h3>Hasil</h3>
      <label>IV (Initialization Vector):</label>
      <input type="text" value={iv} readOnly />
      <br />

      <label>Ciphertext (Hasil Enkripsi):</label>
      <input type="text" value={cipherText} readOnly />
      <br />

      <label>Plaintext (Hasil Dekripsi):</label>
      <input type="text" value={plainText} readOnly />
    </div>
  );
};

export default AesApp;
