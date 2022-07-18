
export const colorTransform = (data) => {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(data)) {
        const aColor = data.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        let num = "0x";
        for (let i=0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;    
            }
            num += hex;
        }
        if (num.length !== 7) {
            num = "";    
        }
        return num;
    } else if (reg.test(data)) {
        const aNum = data.replace(/#/,"").split("");
        if (aNum.length === 6) {
            return Number(`0x${data.substring(1)}`);    
        } else if(aNum.length === 3) {
            let num = "0x";
            for (let i=0; i<aNum.length; i+=1) {
                num += (aNum[i] + aNum[i]);
            }
            return Number(num);
        }
    }
    return "";
}