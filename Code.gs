function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function createAndUploadVCardAndGenerateQR(firstName, lastName, phoneNumber, email) {
  var vCard = `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;
TEL;TYPE=CELL:${phoneNumber}
EMAIL:${email}
END:VCARD`;

  var blob = Utilities.newBlob(vCard, 'text/vcard', 'contact.vcf');
  var file = DriveApp.createFile(blob);
  var fileId = file.getId();
  return generateQRCode(fileId);
}

function generateQRCode(fileId) {
  var link = `https://drive.google.com/uc?id=${fileId}`;
  var qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=200x200`;
  return qrCodeUrl;
}
