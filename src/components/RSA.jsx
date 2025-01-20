// RSA.jsx
import React, { useState } from "react";
import { modExp, charToAscii, asciiToChar } from "../supportfunc";

const RSA = () => {
  const [name, setName] = useState("WIRAANANDA"); // Default Nama
  const [encryptedName, setEncryptedName] = useState([]);
  const [decryptedName, setDecryptedName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // RSA Logic
  const p_rsa = 7;
  const q_rsa = 17;
  const n_rsa = p_rsa * q_rsa;
  const phi = (p_rsa - 1) * (q_rsa - 1);

  let e = 2;
  while (e < phi && gcd(e, phi) !== 1) {
    e++;
  }

  const d = modInverse(e, phi);

  const encrypt = () => {
    const encrypted = name
      .split("")
      .map((char) => modExp(charToAscii(char), e, n_rsa));
    setEncryptedName(encrypted);

    const decrypted = encrypted
      .map((num) => asciiToChar(modExp(num, d, n_rsa)))
      .join("");
    setDecryptedName(decrypted);
  };

  function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
      if ((a * i) % m === 1) return i;
    }
    return -1;
  }

  function gcd(a, b) {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  return (
    <div>
      <h2>RSA Encryption and Decryption</h2>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={handleNameChange}
      />
      <button onClick={encrypt}>Encrypt</button>
      <p>
        Public Key (e, n): ({e}, {n_rsa})
      </p>
      <p>
        Private Key (d, n): ({d}, {n_rsa})
      </p>
      <p>Encrypted Name: {encryptedName.join(", ")}</p>
      <p>Decrypted Name: {decryptedName}</p>
    </div>
  );
};

export default RSA;
