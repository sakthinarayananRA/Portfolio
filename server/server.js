import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataDir = path.join(__dirname, 'data');
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const contactsFilePath = path.join(dataDir, 'contacts.json');
const analyticsFilePath = path.join(dataDir, 'analytics.json');

if (!fs.existsSync(contactsFilePath)) fs.writeFileSync(contactsFilePath, JSON.stringify([], null, 2), 'utf8');
if (!fs.existsSync(analyticsFilePath)) fs.writeFileSync(analyticsFilePath, JSON.stringify({ resumeDownloads: 0, apiHits: 0, inquiries: 0 }, null, 2), 'utf8');

const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 6;

const checkRateLimit = (ip) => {
  const now = Date.now();
  const timestamps = (rateLimits.get(ip) || []).filter(time => now - time < RATE_LIMIT_WINDOW);
  if (timestamps.length >= MAX_REQUESTS) return false;
  timestamps.push(now);
  rateLimits.set(ip, timestamps);
  return true;
};

app.use((req, res, next) => {
  try {
    const raw = fs.readFileSync(analyticsFilePath, 'utf8');
    const analytics = JSON.parse(raw);
    analytics.apiHits = (analytics.apiHits || 0) + 1;
    fs.writeFileSync(analyticsFilePath, JSON.stringify(analytics, null, 2));
  } catch (err) {}
  next();
});

app.get('/api/health', (req, res) => {
  const data = getPortfolioData();
  const info = data?.personalInfo || {};
  res.json({
    status: 'ok',
    service: "Sakthinarayanan R Portfolio API",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    developer: {
      name: info.name || "Sakthinarayanan R",
      role: `${info.role || "Software Developer"} | High-Throughput & Full-Stack Specialist`,
      experience: info.experienceYears || "3.7 Years Experience",
      location: info.location || "Coimbatore, Tamil Nadu",
      email: info.email || "sakthinarayanan.ra@gmail.com"
    }
  });
});

app.get('/api/stats', (req, res) => {
  const data = getPortfolioData();
  const info = data?.personalInfo || {};
  const projects = data?.keyProjects || [];
  
  let techCount = 0;
  if (data?.technicalSkills) {
    for (const cat of Object.values(data.technicalSkills)) {
      if (cat?.skills) techCount += cat.skills.length;
    }
  }

  let analytics = { resumeDownloads: 142, apiHits: 890, inquiries: 18 };
  try {
    const raw = fs.readFileSync(analyticsFilePath, 'utf8');
    analytics = { ...analytics, ...JSON.parse(raw) };
  } catch (err) {}

  res.json({
    success: true,
    data: {
      yearsExperience: parseFloat(info.experienceYears) || 3.7,
      experienceYearsText: info.experienceYears || "3.7 Years Experience",
      enterpriseProjects: projects.length,
      technologiesMastered: techCount,
      academicScore: data?.education?.score || "75%",
      codeQualityScore: 'PSR-12 / Clean Architecture',
      metrics: {
        totalDownloads: analytics.resumeDownloads,
        inquiriesReceived: analytics.inquiries,
        apiHits: analytics.apiHits
      }
    }
  });
});


// Canonical Portfolio Data Endpoints
const portfolioDataPath = path.join(dataDir, 'portfolioData.json');
const getPortfolioData = () => {
  try {
    if (fs.existsSync(portfolioDataPath)) {
      return JSON.parse(fs.readFileSync(portfolioDataPath, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading portfolio data:', err.message);
  }
  return null;
};

// GET /api/portfolio - Complete portfolio payload
app.get('/api/portfolio', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ success: false, message: 'Portfolio data unavailable' });
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data
  });
});

// GET /api/portfolio/profile - Developer profile & metrics
app.get('/api/portfolio/profile', (req, res) => {
  const data = getPortfolioData();
  if (!data?.personalInfo) return res.status(404).json({ success: false, message: 'Profile not found' });
  res.json({ success: true, data: data.personalInfo });
});

// GET /api/portfolio/skills - Categorized technical skills & proficiency
app.get('/api/portfolio/skills', (req, res) => {
  const data = getPortfolioData();
  if (!data?.technicalSkills) return res.status(404).json({ success: false, message: 'Skills not found' });
  res.json({ success: true, data: data.technicalSkills });
});

// GET /api/portfolio/experience - Career history and timeline
app.get('/api/portfolio/experience', (req, res) => {
  const data = getPortfolioData();
  if (!data?.professionalExperience) return res.status(404).json({ success: false, message: 'Experience not found' });
  res.json({ success: true, data: data.professionalExperience });
});

// GET /api/portfolio/projects - Enterprise projects & architecture
app.get('/api/portfolio/projects', (req, res) => {
  const data = getPortfolioData();
  if (!data?.keyProjects) return res.status(404).json({ success: false, message: 'Projects not found' });
  res.json({ success: true, count: data.keyProjects.length, data: data.keyProjects });
});

// GET /api/portfolio/education - Academic background & technical initiatives
app.get('/api/portfolio/education', (req, res) => {
  const data = getPortfolioData();
  if (!data?.education) return res.status(404).json({ success: false, message: 'Education not found' });
  res.json({ success: true, data: { education: data.education, technicalEngagements: data.technicalEngagements } });
});

// GET /api/portfolio/architecture - System design pipeline & stages
// GET /api/portfolio/terminal-stats - 3D terminal console runtime stats
app.get('/api/portfolio/terminal-stats', (req, res) => {
  const data = getPortfolioData();
  if (!data?.heroTerminalStats) return res.status(404).json({ success: false, message: 'Terminal stats not found' });
  res.json({ success: true, data: data.heroTerminalStats });
});

app.get('/api/portfolio/architecture', (req, res) => {
  const data = getPortfolioData();
  if (!data?.architectureShowcase) return res.status(404).json({ success: false, message: 'Architecture data not found' });
  res.json({ success: true, count: data.architectureShowcase.length, data: data.architectureShowcase });
});

app.post('/api/contact', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few minutes before sending another inquiry.'
    });
  }

  const { name, email, subject, message, projectType } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  const cleanName = String(name).trim().slice(0, 100);
  const cleanEmail = String(email).trim().slice(0, 100);
  const cleanSubject = String(subject || 'General Inquiry').trim().slice(0, 150);
  const cleanMessage = String(message).trim().slice(0, 3000);
  const cleanProjectType = String(projectType || 'Full-time / Contract').trim().slice(0, 60);

  const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  const newEntry = {
    id: inquiryId,
    timestamp: new Date().toISOString(),
    ip: clientIp,
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    projectType: cleanProjectType,
    message: cleanMessage,
    status: 'received'
  };

  try {
    const raw = fs.readFileSync(contactsFilePath, 'utf8');
    const contacts = JSON.parse(raw);
    contacts.push(newEntry);
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');

    const rawAnalytics = fs.readFileSync(analyticsFilePath, 'utf8');
    const analytics = JSON.parse(rawAnalytics);
    analytics.inquiries = (analytics.inquiries || 0) + 1;
    fs.writeFileSync(analyticsFilePath, JSON.stringify(analytics, null, 2), 'utf8');

    return res.status(201).json({
      success: true,
      message: `Thank you, ${cleanName}! Your inquiry has been safely received. Sakthinarayanan will respond promptly.`,
      referenceId: inquiryId,
      receivedAt: newEntry.timestamp
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to record your message. Please contact directly via sakthinarayanan.ra@gmail.com'
    });
  }
});

app.get('/api/resume/download', (req, res) => {
  const pdfPath = path.join(publicDir, 'Sakthinarayanan_R_Resume.pdf');
  const clientPdfPath = path.join(__dirname, '..', 'client', 'public', 'Sakthinarayanan_R_Resume.pdf');

  if (fs.existsSync(pdfPath)) {
    return res.download(pdfPath, 'Sakthinarayanan_R_Software_Developer_Resume.pdf');
  } else if (fs.existsSync(clientPdfPath)) {
    return res.download(clientPdfPath, 'Sakthinarayanan_R_Software_Developer_Resume.pdf');
  } else {
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', 'attachment; filename="Sakthinarayanan_R_Resume.md"');
    return res.send('# SAKTHINARAYANAN R\\nSoftware Developer | 3.7 Years Experience\\nCoimbatore, Tamil Nadu');
  }
});

app.post('/api/artisan/execute', (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).json({ error: 'Command is required' });
  const cleanCmd = command.trim();

  const commandResponses = {
    'php artisan route:list': `+--------+----------+------------------------+-------------------+----------------------------------------------+
| Domain | Method   | URI                    | Name              | Action                                       |
+--------+----------+------------------------+-------------------+----------------------------------------------+
|        | GET|HEAD | api/v1/orders          | api.orders.index  | App\\Http\\Controllers\\Api\\OrderController@index |
|        | POST     | api/v1/orders          | api.orders.store  | App\\Http\\Controllers\\Api\\OrderController@store |
|        | GET|HEAD | api/v1/analytics/stats | api.stats         | App\\Http\\Controllers\\Api\\MetricController@view |
+--------+----------+------------------------+-------------------+----------------------------------------------+`,
    'php artisan queue:work': `[${new Date().toISOString()}] Processing: App\\Jobs\\SyncOfflineBatchOrders (Priority: High)
[${new Date().toISOString()}] Processed:  App\\Jobs\\SyncOfflineBatchOrders (Took: 142.18ms)
[INFO] Worker daemon idle on queue: redis:default. 0 failed jobs.`,
    'php artisan test': `   PASS  Tests\\Unit\\OrderOptimizationTest
  ✓ it calculates b2b order batch totals with composite indexes (28ms)
  ✓ it verifies redis queue job dispatch upon barcode scan (14ms)

   PASS  Tests\\Feature\\ApiEndpointsTest
  ✓ it responds in sub-second latency under high throughput payload (82ms)

  Tests:    3 passed (9 assertions)
  Duration: 0.14s, Memory: 16.00MB`,
    'php artisan about': `  Environment: Production
  PHP Version: 8.3.12
  Laravel: 11.x
  Queue Driver: redis
  Database: mysql (v8.0)
  Developer: Sakthinarayanan R (Software Developer • 3.7 YOE)`
  };

  if (commandResponses[cleanCmd]) {
    return res.json({ success: true, output: commandResponses[cleanCmd], timestamp: new Date().toLocaleTimeString() });
  }

  return res.json({
    success: false,
    output: `Available: php artisan route:list | php artisan queue:work | php artisan test | php artisan about`,
    timestamp: new Date().toLocaleTimeString()
  });
});

const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Backend Server] Running on http://localhost:${PORT}`);
});
