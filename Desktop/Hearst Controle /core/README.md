# 🏗️ HEARST CONTROL - CORE

**Code commun réutilisable pour tous les projets Hearst Control**

---

## 📦 Contenu

### 🔐 `/auth`
- **authService.js** : Service d'authentification centralisé avec support multi-projets

### 🛡️ `/middleware`
- **authMiddleware.js** : Middlewares d'authentification, vérification de projets et rôles

### 💾 `/database`
- **supabaseClient.js** : Client Supabase réutilisable

### 🔧 `/shared-utils`
- **logger.js** : Logger centralisé avec couleurs
- **validators.js** : Validateurs (email, password, UUID, projectId, etc.)

### 📡 `/monitoring`
- **À venir** : Services de monitoring partagés

### 🌐 `/api-gateway`
- **À venir** : API Gateway pour router les requêtes

---

## 🚀 Utilisation

### Installation

```bash
cd core/
npm install
```

### Importer dans un projet

```javascript
// Auth Service
const AuthService = require('@hearst-control/core/auth/authService');
const authService = new AuthService(supabase, process.env.JWT_SECRET);

// Middleware
const { createAuthMiddleware, requireProjectAccess } = require('@hearst-control/core/middleware/authMiddleware');

// Database
const { createSupabaseClientFromEnv } = require('@hearst-control/core/database/supabaseClient');
const supabase = createSupabaseClientFromEnv();

// Utils
const { logger } = require('@hearst-control/core/shared-utils/logger');
const { isValidEmail } = require('@hearst-control/core/shared-utils/validators');
```

---

## 📚 Exemples

### Authentification

```javascript
const AuthService = require('@hearst-control/core/auth/authService');
const authService = new AuthService(supabase, JWT_SECRET);

// Login
const { token, user } = await authService.login(
  'admin@hearstmining.com',
  'password',
  'QATAR-001'
);

// Vérifier un token
const decoded = authService.verifyToken(token);

// Vérifier l'accès à un projet
const hasAccess = await authService.hasProjectAccess(userId, 'QATAR-001');
```

### Middleware

```javascript
const { createAuthMiddleware, requireProjectAccess } = require('@hearst-control/core/middleware/authMiddleware');

// Protéger une route
app.use('/api', createAuthMiddleware(JWT_SECRET));

// Requiert l'accès au projet Qatar
app.use('/api/qatar', requireProjectAccess('QATAR-001'));

// Requiert le rôle admin
app.use('/api/admin', requireRole('admin'));
```

### Logger

```javascript
const { logger } = require('@hearst-control/core/shared-utils/logger');

logger.info('Server starting...');
logger.success('Connected to database');
logger.warning('High temperature detected');
logger.error('Connection failed', error);
```

---

## 🎯 Avantages

✅ **Réutilisabilité** : Code partagé entre tous les projets  
✅ **Maintenabilité** : Un seul endroit pour les mises à jour  
✅ **Cohérence** : Comportement identique partout  
✅ **Rapidité** : Créer de nouveaux projets plus vite  

---

**Hearst Control Core v1.0**  
**Décembre 2025**

