const PUBLIC_KEY_TEXT =
"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...";

function pemToKeyText(pem) {
    return pem
        .replace(/-----[^-]+-----/g, "")
        .replace(/\s+/g, "");
}

function keyTextToArrayBuffer(keyText) {
    const binary = atob(keyText);
    const buffer = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }

    return buffer.buffer;
}

async function importRSAPublicKey(keyText) {
    return crypto.subtle.importKey(
        "spki",                            // Public key format
        keyTextToArrayBuffer(keyText),
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        false,
        ["encrypt"]
    );
}

async function importRSAPrivateKey(keyText) {
    return crypto.subtle.importKey(
        "pkcs8",                           // Private key format
        keyTextToArrayBuffer(keyText),
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        false,
        ["decrypt"]
    );
}

async function encryptWithAES(dataBuffer, aesKey) {
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        aesKey,
        dataBuffer
    );

    return {
        iv: Array.from(iv),
        encryptedData: Array.from(new Uint8Array(encrypted))
    };
}

async function encryptAESKey(aesKey, publicKey) {
    const rawKey = await crypto.subtle.exportKey("raw", aesKey);

    const encryptedKey = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        rawKey
    );

    return Array.from(new Uint8Array(encryptedKey));
}

async function encryptTextPayload(text, publicKeyText) {
    const publicKey = await importRSAPublicKey(publicKeyText);
    const aesKey = await generateAESKey();

    const encoded = new TextEncoder().encode(text);

    const encryptedData = await encryptWithAES(encoded, aesKey);
    const encryptedKey = await encryptAESKey(aesKey, publicKey);

    return {
        type: "text",
        encryptedKey,
        ...encryptedData
    };
}

async function encryptFilePayload(file, publicKeyText) {
    const publicKey = await importRSAPublicKey(publicKeyText);
    const aesKey = await generateAESKey();

    const buffer = await file.arrayBuffer();

    const encryptedData = await encryptWithAES(buffer, aesKey);
    const encryptedKey = await encryptAESKey(aesKey, publicKey);

    return {
        type: "file",
        fileName: file.name,
        fileType: file.type,
        encryptedKey,
        ...encryptedData
    };
}


// Example Uses

// const payload = JSON.stringify({
//     name: "John",
//     email: "john@test.com"
// });

// const encryptedPayload = await encryptTextPayload(payload);
