const fs = require('fs');
const path = require('path');

// Simple valid PDF generator for Sakthinarayanan R
function generateSimplePdf(outputPath) {
  const content = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Length 1250
>>
stream
BT
/F1 18 Tf
50 740 Td
(SAKTHINARAYANAN R) Tj
/F1 11 Tf
0 -20 Td
(PHP \\(Laravel\\) Developer | 3.7 Years Experience) Tj
/F2 10 Tf
0 -16 Td
(Coimbatore, Tamil Nadu  |  +91 9345679757  |  sakthinarayanan.ra@gmail.com) Tj
0 -25 Td
/F1 12 Tf
(PROFESSIONAL SUMMARY) Tj
/F2 9 Tf
0 -15 Td
(Results-driven PHP Laravel Developer with 3.7 years experience architecting, engineering,) Tj
0 -12 Td
(and maintaining scalable web applications and high-throughput backend services. Deep technical) Tj
0 -12 Td
(expertise in PHP & Laravel ecosystem: MVC, Eloquent ORM, Artisan CLI, Redis Queues, and MySQL schema.) Tj
0 -22 Td
/F1 12 Tf
(PROFESSIONAL EXPERIENCE) Tj
/F1 10 Tf
0 -15 Td
(Software Developer | usis Technologies \\(Nov 2023 - Present | Coimbatore\\)) Tj
/F2 9 Tf
0 -12 Td
(Primary Stack: PHP, Laravel, Eloquent ORM, MySQL, Redis Queues, PHPUnit, Postman, Jira, Git) Tj
0 -12 Td
(- Architected and maintained enterprise applications strictly adhering to PSR standards and SOLID.) Tj
0 -12 Td
(- Engineered versioned RESTful APIs with Swagger and Postman for external integration.) Tj
0 -12 Td
(- Optimized relational databases, tuning complex MySQL queries and compound indexing.) Tj
0 -12 Td
(- Managed asynchronous operations and scheduled tasks using Laravel Queues & Redis.) Tj
0 -16 Td
/F1 10 Tf
(Junior Software Developer | Eminent Technology \\(Dec 2022 - Nov 2023 | Coimbatore\\)) Tj
/F2 9 Tf
0 -12 Td
(Primary Stack: Core PHP, Laravel, CodeIgniter, MySQL, JavaScript, jQuery, HTML/CSS, Git) Tj
0 -12 Td
(- Developed dynamic web applications & backend modules in Core PHP, Laravel & CodeIgniter.) Tj
0 -12 Td
(- Designed normalized MySQL schemas, executed migrations, and optimized CRUD queries.) Tj
0 -22 Td
/F1 12 Tf
(EDUCATION & ACADEMIC BACKGROUND) Tj
/F2 9 Tf
0 -15 Td
(B.Sc in Computer Science \\(Score: 75%\\)  |  2019 - 2022  |  AAGAC, Periyar University) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000343 00000 n 
0000000415 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1716
%%EOF
`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content.trim(), 'utf8');
  console.log(`Generated resume PDF at: ${outputPath}`);
}

generateSimplePdf(path.join(__dirname, '..', 'client', 'public', 'Sakthinarayanan_R_Resume.pdf'));
generateSimplePdf(path.join(__dirname, '..', 'server', 'public', 'Sakthinarayanan_R_Resume.pdf'));
