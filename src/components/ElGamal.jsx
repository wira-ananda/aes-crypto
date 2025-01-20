import React, { useState } from "react";
import { modExp, charToAscii, asciiToChar, nextPrime } from "../supportfunc";

const ElGamal = () => {
  const [message, setMessage] = useState("HELLO"); // Pesan default
  const [encryptedMessage, setEncryptedMessage] = useState([]);
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [decryptInput, setDecryptInput] = useState(""); // Input untuk dekripsi

  // Nilai dasar untuk El Gamal
  const p = nextPrime(20); // Pilih bilangan prima p
  const g = 2; // Generator g (biasanya dipilih g = 2 atau nilai lain)
  const x = 6; // Private key x
  const h = modExp(g, x, p); // Public key h

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleDecryptInputChange = (e) => {
    setDecryptInput(e.target.value);
  };

  const encrypt = () => {
    // Pilih k secara acak
    const k = 5;

    const encryptedChars = message.split("").map((char) => {
      const m = charToAscii(char);
      const c1 = modExp(g, k, p); // Ciphertext pertama
      const c2 = (m * modExp(h, k, p)) % p; // Ciphertext kedua
      return [c1, c2];
    });

    setEncryptedMessage(encryptedChars);
    console.log("Encrypted Message: ", encryptedChars);

    // Optional: Untuk menunjukkan setiap karakter yang dienkripsi
    encryptedChars.forEach(([c1, c2]) => {
      console.log(`Encrypted Pair: [${c1}, ${c2}]`);
    });
  };

  const decrypt = () => {
    // Parsing input dari user (harus berbentuk string pasangan [c1, c2])
    const inputArray = decryptInput
      .split(",")
      .map((pair) => pair.trim().split(" ").map(Number)); // Parsing input dari user

    // Proses dekripsi
    const decryptedChars = inputArray.map(([c1, c2]) => {
      const s = modExp(c1, x, p); // Shared secret s = c1^x mod p
      const sInverse = modInverse(s, p); // Invers dari s
      const m = (c2 * sInverse) % p; // Pesan asli m = (c2 * s^-1) mod p
      return asciiToChar(m); // Mengonversi kembali ke karakter
    });

    // Menggabungkan hasil dekripsi menjadi string
    setDecryptedMessage(decryptedChars.join(""));
    console.log("Decrypted Message: ", decryptedChars.join(""));
  };

  // Fungsi untuk mencari invers modulo
  const modInverse = (a, m) => {
    for (let i = 1; i < m; i++) {
      if ((a * i) % m === 1) return i;
    }
    return -1;
  };

  return (
    <div>
      <h2>El Gamal Encryption and Decryption</h2>

      {/* Input untuk pesan */}
      <input
        type="text"
        placeholder="Enter Message"
        value={message}
        onChange={handleMessageChange}
      />
      <button onClick={encrypt}>Encrypt</button>

      <p>
        Public Key (h, p): ({h}, {p})
      </p>

      <p>
        Encrypted Message:{" "}
        {encryptedMessage.map(([c1, c2], idx) => (
          <span key={idx}>{`[${c1}, ${c2}] `}</span>
        ))}
      </p>

      {/* Input untuk dekripsi */}
      <input
        type="text"
        placeholder="Enter Encrypted Message for Decryption"
        value={decryptInput}
        onChange={handleDecryptInputChange}
      />
      <button onClick={decrypt}>Decrypt</button>

      <p>Decrypted Message: {decryptedMessage}</p>
    </div>
  );
};

export default ElGamal;
