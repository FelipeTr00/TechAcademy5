"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCPF = isValidCPF;
exports.getPasswordStrength = getPasswordStrength;
function isValidCPF(cpfRaw) {
    const cpf = cpfRaw.replace(/[^\d]/g, "");
    if (!/^\d{11}$/.test(cpf) || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11)
        remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11)
        remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
}
function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8)
        score++; // Mínimo de caracteres
    if (/[a-z]/.test(password))
        score++; // letras minúsculas
    if (/[A-Z]/.test(password))
        score++; // letras maiúsculas
    if (/\d/.test(password))
        score++; // números
    if (/[\W_]/.test(password))
        score++; // símbolos (ex: @, #, !)
    if (score <= 2)
        return "fraca";
    if (score === 3 || score === 4)
        return "média";
    return "forte";
}
;
