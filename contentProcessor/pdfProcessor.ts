import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

const fileName = 'cv920943592.pdf';

export async function processPdfFiles(filePath: string) {
    try {
        // __dirname yerine ES modüllerinde import.meta.url kullanılır
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const fullPath = path.join(__dirname, 'uploads', fileName);
        
        console.log('Tam dosya yolu:', fullPath);
        console.log('İşleme başlıyor... ', fullPath);

        // Dosyanın mevcut olup olmadığını kontrol edin
        if (fs.existsSync(fullPath)) {
            console.log('Dosya mevcut:', fullPath);
        } else {
            console.error('Dosya bulunamadı:', fullPath);
            return null; // Dosya bulunamadığında uygun bir geri dönüş yapılabilir
        }

        // Dosya içeriğini Buffer olarak oku
        const dataContent = fs.readFileSync(fullPath);
        console.log('İçerik okundu');

        // PDF içeriğini işle
        const pdfData = await pdfParse(dataContent);
        console.log('PDF dosyası işlendi');

        return pdfData.text;
    } catch (error) {
        console.error("PDF dosyası işleme sırasında hata oluştu:", error);
        throw error;
    }
}
