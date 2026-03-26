"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumberCode = generateNumberCode;
function generateNumberCode(length = 6) {
    const digits = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += digits[Math.floor(Math.random() * digits.length)];
    }
    return code;
}
//# sourceMappingURL=genCode.utils.js.map