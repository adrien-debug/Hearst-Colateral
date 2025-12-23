/**
 * HEARST CONTROL - BACKEND CENTRAL
 * API Gateway et Dashboard Central
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 4000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(helmet());
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || ['http://localhost:4100', 'http://localhost:3000'], 
  credentials: true 
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200 // limit each IP to 200 requests per windowMs
});
app.use('/api/', limiter);

// ============================================
// ROUTES CENTRALES
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ============================================
// API GATEWAY - PROXY vers les projets
// ============================================

// Projet Qatar (port 3001)
app.use('/api/qatar', createProxyMiddleware({
  target: process.env.QATAR_API_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/qatar': '/api'
  },
  onError: (err, req, res) => {
    console.error('❌ Qatar proxy error:', err.message);
    res.status(502).json({ 
      error: 'Qatar API unavailable',
      message: 'The Qatar project API is currently unavailable'
    });
  }
}));

// Projet Aquahash (port 3002 - futur)
app.use('/api/aquahash', createProxyMiddleware({
  target: process.env.AQUAHASH_API_URL || 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/aquahash': '/api'
  },
  onError: (err, req, res) => {
    console.error('❌ Aquahash proxy error:', err.message);
    res.status(502).json({ 
      error: 'Aquahash API unavailable',
      message: 'The Aquahash project API is currently unavailable'
    });
  }
}));

// Projet Strategic Reserve Qatar (port 3002)
app.use('/api/srq', createProxyMiddleware({
  target: process.env.SRQ_API_URL || 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/srq': '/api'
  },
  onError: (err, req, res) => {
    console.error('❌ Strategic Reserve Qatar proxy error:', err.message);
    res.status(502).json({ 
      error: 'Strategic Reserve Qatar API unavailable',
      message: 'The Strategic Reserve Qatar project API is currently unavailable'
    });
  }
}));

// Projet Texas (port 3003 - futur)
app.use('/api/texas', createProxyMiddleware({
  target: process.env.TEXAS_API_URL || 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/texas': '/api'
  },
  onError: (err, req, res) => {
    console.error('❌ Texas proxy error:', err.message);
    res.status(502).json({ 
      error: 'Texas API unavailable',
      message: 'The Texas project API is currently unavailable'
    });
  }
}));

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'hearst-control-central',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'hearst-control-api',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║                                                      ║');
  console.log('║         🏢 HEARST CONTROL - CENTRAL API             ║');
  console.log('║           Multi-Projects Control Platform            ║');
  console.log('║                                                      ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API Gateway: http://localhost:${PORT}/api`);
  console.log('');
  console.log('📡 Project Proxies:');
  console.log(`   • Qatar:              /api/qatar    → ${process.env.QATAR_API_URL || 'http://localhost:3001'}`);
  console.log(`   • Strategic Reserve:  /api/srq      → ${process.env.SRQ_API_URL || 'http://localhost:3002'}`);
  console.log(`   • Aquahash:           /api/aquahash → ${process.env.AQUAHASH_API_URL || 'http://localhost:3003'}`);
  console.log(`   • Texas:              /api/texas    → ${process.env.TEXAS_API_URL || 'http://localhost:3004'}`);
  console.log('');
});

module.exports = app;

