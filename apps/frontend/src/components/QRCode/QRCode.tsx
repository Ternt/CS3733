import QRCode from 'qrcode';

export function GenerateQRCode(instructions: string) {
    QRCode.toDataURL(instructions, function (err, url) {
        if (err) {
            console.error(err);
        } else {
            console.log(url);
        }
    });
}
