/**
 * 🚀 ECOSYSTEM CONFIG — Configuration PM2 pour production
 * Gestion des processus backend et frontend avec PM2
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *   pm2 startup
 * 
 * @see https://pm2.keymetrics.io/docs/usage/application-declaration/
 */

module.exports = {
  apps: [
    {
      // ========================================
      // 📦 BACKEND API (Express)
      // ========================================
      name: 'qatar-backend',
      script: './backend/server.js',
      instances: 2, // Mode cluster (2 instances)
      exec_mode: 'cluster',
      watch: false, // Désactiver en production
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    },

    {
      // ========================================
      // 🎨 FRONTEND (Next.js)
      // ========================================
      name: 'qatar-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
      instances: 1, // Next.js gère déjà l'optimisation
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true
    },

    {
      // ========================================
      // 💾 BACKUP AUTOMATIQUE
      // ========================================
      name: 'qatar-backup',
      script: './backend/scripts/backup.js',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '0 */1 * * *', // Toutes les heures
      watch: false,
      autorestart: false,
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/backup-error.log',
      out_file: './logs/backup-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },

    {
      // ========================================
      // 🔄 REFRESH WATCHER (Temps réel)
      // ========================================
      name: 'qatar-watcher',
      script: './backend/scripts/refreshWatcher.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '200M',
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        REFRESH_INTERVAL_SECONDS: 30
      },
      error_file: './logs/watcher-error.log',
      out_file: './logs/watcher-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },

    {
      // ========================================
      // 📦 ZOTTO EXPORT (AutoSave)
      // ========================================
      name: 'qatar-zotto',
      script: './backend/scripts/zottoSave.js',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '*/5 * * * *', // Toutes les 5 minutes
      watch: false,
      autorestart: false,
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/zotto-error.log',
      out_file: './logs/zotto-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ],

  // ========================================
  // 🔧 DEPLOYMENT CONFIGURATION
  // ========================================
  deploy: {
    production: {
      user: 'deployer',
      host: ['your-server-ip'],
      ref: 'origin/main',
      repo: 'git@github.com:adrien-debug/Hearst-Control.git',
      path: '/var/www/qatar-dashboard',
      'post-deploy': 'npm install && cd frontend && npm install && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save',
      env: {
        NODE_ENV: 'production'
      }
    },
    staging: {
      user: 'deployer',
      host: ['staging-server-ip'],
      ref: 'origin/develop',
      repo: 'git@github.com:adrien-debug/Hearst-Control.git',
      path: '/var/www/qatar-dashboard-staging',
      'post-deploy': 'npm install && cd frontend && npm install && npm run build && pm2 reload ecosystem.config.js --env staging && pm2 save',
      env: {
        NODE_ENV: 'staging'
      }
    }
  }
};

/**
 * 📋 COMMANDES UTILES PM2:
 * 
 * # Démarrer tous les services
 * pm2 start ecosystem.config.js
 * pm2 start ecosystem.config.js --env production
 * 
 * # Monitoring
 * pm2 monit
 * pm2 status
 * pm2 logs
 * pm2 logs qatar-backend
 * pm2 logs qatar-backend --lines 100
 * 
 * # Gestion des processus
 * pm2 restart all
 * pm2 reload all (zero-downtime)
 * pm2 stop all
 * pm2 delete all
 * 
 * # Scaler le backend
 * pm2 scale qatar-backend 4
 * 
 * # Sauvegarder la config
 * pm2 save
 * pm2 startup
 * 
 * # Déploiement
 * pm2 deploy production setup
 * pm2 deploy production
 * pm2 deploy production revert 1
 * 
 * # Dashboard web
 * pm2 plus (nécessite compte pm2.io)
 */

