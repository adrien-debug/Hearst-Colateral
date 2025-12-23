# 🔐 FLUX D'AUTHENTIFICATION - HEARST CONTROL

## 🎯 Principe

**Authentification Centralisée** : L'utilisateur se connecte **UNE FOIS** au début, puis accède à **TOUS** les projets autorisés.

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  1️⃣  PAGE LOGIN                                    │
│      ┌───────────────────┐                         │
│      │ Email    : _____  │                         │
│      │ Password : _____  │                         │
│      │ [Se connecter]    │                         │
│      └───────────────────┘                         │
│               ↓                                    │
│  2️⃣  AUTHENTIFICATION SUPABASE                     │
│      ✅ Vérification credentials                    │
│      ✅ Token JWT généré                            │
│      ✅ Permissions chargées                        │
│               ↓                                    │
│  3️⃣  DASHBOARD MULTI-PROJETS                       │
│      ┌──────────────────────────────┐              │
│      │ 🏢 HEARST CONTROL          │              │
│      │                              │              │
│      │ ✅ Hearst Qatar (QATAR-001) │              │
│      │ ✅ Hearst Aquahash (AQUA-001)│              │
│      │ ✅ Projet USA (USA-001)      │              │
│      │                              │              │
│      │ [Vue Globale] [Par Projet]  │              │
│      └──────────────────────────────┘              │
│               ↓                                    │
│  4️⃣  ACCÈS AUX PROJETS                             │
│      Tous les projets autorisés                   │
│      sont accessibles avec le même token          │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 📋 Flux Détaillé

### Étape 1 : Page de Login

**Route Frontend** : `/login`

```jsx
// Page de login Next.js
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (data.success) {
      // Stocker le token
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('refresh_token', data.session.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Rediriger vers le dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <h1>🏢 HEARST CONTROL</h1>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
```

---

### Étape 2 : Authentification Backend

**Route API** : `POST /api/auth/login`

**Request** :
```json
{
  "email": "admin@hearstmining.com",
  "password": "SecurePassword123!"
}
```

**Response Success (200)** :
```json
{
  "success": true,
  "user": {
    "id": "uuid-123-456",
    "email": "admin@hearstmining.com",
    "role": "admin"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": 1735689600
  }
}
```

**Response Error (401)** :
```json
{
  "success": false,
  "error": "Identifiants invalides"
}
```

---

### Étape 3 : Dashboard Multi-Projets

**Route Frontend** : `/dashboard`

Le dashboard charge automatiquement **TOUS** les projets :

```jsx
// Page dashboard
export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [globalMetrics, setGlobalMetrics] = useState(null);

  useEffect(() => {
    loadProjects();
    loadGlobalMetrics();
  }, []);

  const loadProjects = async () => {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch('http://localhost:3001/api/projects', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    setProjects(data.projects);
  };

  const loadGlobalMetrics = async () => {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch('http://localhost:3001/api/metrics/global', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    setGlobalMetrics(data.metrics);
  };

  return (
    <div className="dashboard">
      {/* Vue Globale */}
      <GlobalOverview metrics={globalMetrics} />
      
      {/* Liste des Projets */}
      <ProjectsList projects={projects} />
      
      {/* Alertes */}
      <ActiveAlerts />
    </div>
  );
}
```

---

### Étape 4 : Navigation Entre Projets

**Aucune nouvelle authentification requise** !

```jsx
// Cliquer sur un projet → Vue détaillée
<Link href={`/projects/${project.project_id}`}>
  View Dashboard →
</Link>

// /projects/QATAR-001
// /projects/AQUA-001
// /projects/USA-001
```

Tous les appels API utilisent le **même token** :

```javascript
// Métriques d'un projet spécifique
GET /api/projects/QATAR-001/metrics
Headers: Authorization: Bearer eyJhbGc...

// Containers d'un projet
GET /api/projects/QATAR-001/containers
Headers: Authorization: Bearer eyJhbGc...

// Alertes d'un projet
GET /api/alerts?project_id=QATAR-001
Headers: Authorization: Bearer eyJhbGc...
```

---

## 🔒 Système de Permissions

### Table `user_project_access` (À créer dans Supabase)

```sql
CREATE TABLE user_project_access (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id VARCHAR(20) REFERENCES projects(project_id) ON DELETE CASCADE,
  access_level VARCHAR(20) DEFAULT 'viewer' CHECK (access_level IN ('viewer', 'operator', 'manager', 'admin')),
  granted_at TIMESTAMP DEFAULT NOW(),
  granted_by VARCHAR(100),
  
  UNIQUE(user_id, project_id)
);

CREATE INDEX idx_user_project_access_user ON user_project_access(user_id);
CREATE INDEX idx_user_project_access_project ON user_project_access(project_id);

COMMENT ON TABLE user_project_access IS 'Permissions utilisateurs par projet';
```

### Exemple de Données

```sql
-- Super Admin : Accès à TOUS les projets
INSERT INTO user_project_access (user_id, project_id, access_level)
VALUES 
  ('uuid-admin', 'QATAR-001', 'admin'),
  ('uuid-admin', 'AQUA-001', 'admin'),
  ('uuid-admin', 'USA-001', 'admin');

-- Manager Qatar : Accès à Qatar uniquement
INSERT INTO user_project_access (user_id, project_id, access_level)
VALUES ('uuid-manager-qatar', 'QATAR-001', 'manager');

-- Operator Global : Lecture seule sur tous les projets
INSERT INTO user_project_access (user_id, project_id, access_level)
VALUES 
  ('uuid-operator', 'QATAR-001', 'operator'),
  ('uuid-operator', 'AQUA-001', 'operator');
```

---

## 🎭 Rôles Utilisateurs

### Niveau Global

| Rôle | Permissions | Description |
|------|------------|-------------|
| **Super Admin** | Tous les projets, toutes les actions | Accès complet à la plateforme |
| **Admin** | Plusieurs projets, gestion complète | Gère ses projets assignés |
| **Manager** | Un ou plusieurs projets, lecture/écriture | Supervise les opérations |
| **Operator** | Un ou plusieurs projets, lecture seule | Monitore les performances |
| **Viewer** | Lecture seule limitée | Visualisation uniquement |

### Niveau Projet

Chaque utilisateur a un `access_level` par projet :

```javascript
// Vérifier l'accès utilisateur
async function checkProjectAccess(userId, projectId, requiredLevel) {
  const { data, error } = await supabase
    .from('user_project_access')
    .select('access_level')
    .eq('user_id', userId)
    .eq('project_id', projectId)
    .single();

  if (error || !data) return false;

  const levels = ['viewer', 'operator', 'manager', 'admin'];
  const userLevelIndex = levels.indexOf(data.access_level);
  const requiredLevelIndex = levels.indexOf(requiredLevel);

  return userLevelIndex >= requiredLevelIndex;
}
```

---

## 🔑 Middleware d'Authentification

### Backend - Protéger les Routes

```javascript
// middleware/auth.js
const { supabase } = require('../utils/supabase');

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Non authentifié'
      });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Token invalide'
      });
    }

    // Attacher l'utilisateur à la requête
    req.user = user;
    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
}

// Protéger une route
router.get('/api/projects', requireAuth, projectsController.getAll);
```

### Frontend - Protéger les Pages

```jsx
// middleware.ts (Next.js)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  // Pages publiques
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // Pages protégées
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/settings/:path*']
};
```

---

## 🔄 Rafraîchissement du Token

Le token expire après un certain temps. Le refresh se fait automatiquement :

```javascript
// utils/auth.js
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');

  const response = await fetch('http://localhost:3001/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem('access_token', data.session.access_token);
    localStorage.setItem('refresh_token', data.session.refresh_token);
    return data.session.access_token;
  }

  // Token invalide → Déconnexion
  logout();
  return null;
}

// Intercepteur Axios
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Réessayer la requête avec le nouveau token
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return axios.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);
```

---

## 📊 Logs d'Authentification

Tous les événements d'authentification sont enregistrés dans `auth_logs` :

```sql
-- Voir les connexions récentes
SELECT 
  timestamp,
  user_email,
  event_type,
  ip_address,
  success
FROM auth_logs
WHERE event_type IN ('login', 'logout', 'failed_login')
ORDER BY timestamp DESC
LIMIT 50;

-- Tentatives de connexion échouées
SELECT 
  user_email,
  COUNT(*) as failed_attempts,
  MAX(timestamp) as last_attempt
FROM auth_logs
WHERE event_type = 'failed_login'
  AND timestamp > NOW() - INTERVAL '1 hour'
GROUP BY user_email
HAVING COUNT(*) >= 3;
```

---

## 🚀 Flux Complet - Résumé

### 1. Connexion

```
User entre email/password
  ↓
POST /api/auth/login
  ↓
Supabase Auth vérifie
  ↓
Token JWT retourné
  ↓
Token stocké frontend (localStorage/cookies)
  ↓
Redirect /dashboard
```

### 2. Navigation

```
Dashboard charge:
  - GET /api/projects (tous les projets)
  - GET /api/metrics/global
  - GET /api/alerts?status=active

User clique sur "Hearst Qatar"
  ↓
Route /projects/QATAR-001
  ↓
GET /api/projects/QATAR-001
GET /api/projects/QATAR-001/containers
GET /api/projects/QATAR-001/metrics

Même token utilisé partout ✅
```

### 3. Déconnexion

```
User clique "Logout"
  ↓
POST /api/auth/logout
  ↓
Clear tokens frontend
  ↓
Redirect /login
```

---

## ✅ Avantages Architecture Centralisée

1. **Une seule connexion** 🔑
   - Login une seule fois
   - Accès à tous les projets autorisés
   - Pas de reconnexion entre projets

2. **Sécurité renforcée** 🔒
   - Token JWT sécurisé
   - Refresh automatique
   - Permissions granulaires par projet

3. **Expérience utilisateur optimale** 🎯
   - Navigation fluide entre projets
   - Pas d'interruption
   - Dashboard unifié

4. **Administration simplifiée** ⚙️
   - Gestion centralisée des utilisateurs
   - Permissions par projet
   - Logs d'audit complets

---

## 🔧 Configuration Supabase Auth

### Créer des Utilisateurs

```sql
-- Via Supabase Dashboard → Authentication → Users → Add User
-- Ou via API:

-- SQL direct (pour tests)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'admin@hearstmining.com',
  crypt('SecurePassword123!', gen_salt('bf')),
  NOW(),
  '{"role": "admin", "name": "Admin User"}'::jsonb
);
```

### Assigner des Projets

```sql
-- Donner accès au projet Qatar
INSERT INTO user_project_access (user_id, project_id, access_level)
SELECT 
  id, 
  'QATAR-001', 
  'admin'
FROM auth.users
WHERE email = 'admin@hearstmining.com';
```

---

## 📝 Checklist Implémentation

### Backend
- [x] Controller d'authentification créé
- [x] Routes `/api/auth/*` configurées
- [x] Middleware `requireAuth` implémenté
- [ ] Table `user_project_access` créée
- [ ] Logs d'authentification activés

### Frontend
- [ ] Page `/login` créée
- [ ] Stockage des tokens (localStorage)
- [ ] Middleware de protection des routes
- [ ] Refresh automatique des tokens
- [ ] Gestion déconnexion

### Base de Données
- [ ] Table `user_project_access` créée
- [ ] Utilisateurs de test créés
- [ ] Permissions assignées par projet
- [ ] RLS configuré (production)

---

## 🎉 Conclusion

Le système d'authentification **HEARST CONTROL** offre :

✅ **Connexion unique** pour tous les projets  
✅ **Permissions granulaires** par projet  
✅ **Sécurité renforcée** (JWT + Supabase)  
✅ **Expérience fluide** entre projets  
✅ **Administration centralisée**

**Une fois connecté → Accès à tout ce qui est autorisé !**

---

**Hearst Control v2.0** - Authentification Centralisée Multi-Projets

