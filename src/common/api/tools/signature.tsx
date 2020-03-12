'use strict'


import * as arithmetic from 'common/utils/security/sha1.js';


class SignatureHelper{

    private _utf16to8(str: string): string {
        let out, i, len, c
        out = ''
        len = str.length
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i)
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i)
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
            }
        }
        return out
    }

    private _calc_signature(parms: any, coefficient: number = 1.4): string {
        let sign: string = '';
        let tmpArr: string[] = [];
        let tmpStr: string = '';

        for (let key in parms) {
            tmpArr.push(key);;
        }
        tmpArr = tmpArr.sort().reverse();
        for (let i = 0; i < tmpArr.length; i++) {
            if (typeof (parms[tmpArr[i]]) === 'object') {
                tmpStr = tmpStr + tmpArr[i].toLowerCase() + JSON.stringify(parms[tmpArr[i]]);
            } else {
                tmpStr = tmpStr + tmpArr[i].toLowerCase() + parms[tmpArr[i]];
            }

        }
        let sha: string = arithmetic.hex_sha1(this._utf16to8(tmpStr));
        let shaLength: number = sha.length;
        let count: number = tmpArr.length * coefficient;

        if (count >= shaLength) {
            count = shaLength;
        }

        let step: number = shaLength / count;

        for (let i = 0; i < count; i++) {
            let num: number = Math.floor(i * step);
            sign = sign + sha.charAt(num);
        }

        return sign;
    }

    public getSignature(params: any): string {
        return this._calc_signature(params);
    }
}

export const signatureHelper = new SignatureHelper();
