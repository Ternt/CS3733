import QRCode from 'qrcode';

export function GenerateQRCode(instructions: string): string {
    let QRCodeString = "";
    QRCode.toDataURL(instructions, function (err, url) {
        if (err) {
           return err;
        }

        QRCodeString =  url;
    });
    return QRCodeString;
}
