# 🚀 Qatar Project - Dashboard

Dashboard de monitoring et gestion pour le projet Qatar Project.

**Créé depuis le template Hearst Control - Qatar Dashboard**

---

## 🎯 Vue d'ensemble

Ce projet a été généré automatiquement à partir du template Qatar Dashboard.

### Technologies

**Backend:**
- Node.js 18+ / Express.js
- Supabase (PostgreSQL)
- JWT Authentication

**Frontend:**
- Next.js 14 (App Router)
- React 18 / TypeScript
- Tailwind CSS

---

## ⚡ Démarrage Rapide

### Prérequis

1. Node.js 18+
2. npm ou yarn
3. Compte Supabase

### Installation

```bash
# 1. Installer les dépendances
npm install
cd frontend && npm install && cd ..

# 2. Configurer Supabase
# Éditer backend/.env avec vos credentials Supabase
nano backend/.env

# Éditer frontend/.env.local
nano frontend/.env.local

# 3. Initialiser la base de données
# Copier le contenu de database/init.sql dans Supabase SQL Editor
# Adapter le schéma selon vos besoins

# 4. Lancer le projet
./start-all.sh
```

### Accès

```
🌐 Frontend : http://localhost:3000
🔧 Backend  : http://localhost:3001

🔑 Login    : admin@hearstmining.com
🔒 Password : Admin123!Hearst
```

---

## 📝 Configuration

### Backend (.env)

```bash
NODE_ENV=development
PORT=3001
SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
JWT_SECRET=[generate-new-secret]
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PROJECT_NAME=hearst-qatar-new
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## 🔧 Personnalisation

### Étapes suivantes

1. **Adapter le schéma de base de données** : `database/init.sql`
2. **Personnaliser les controllers** : `backend/controllers/`
3. **Adapter l'UI** : `frontend/src/components/`
4. **Mettre à jour la documentation** : Tous les fichiers `.md`
5. **Configurer le déploiement** : `ecosystem.config.js`, `docker-compose.yml`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **README.md** | Ce fichier (vue d'ensemble) |
| **DEPLOYMENT_GUIDE.md** | Guide de déploiement complet |
| **API_DOCUMENTATION.md** | Documentation API |
| **ARCHITECTURE.md** | Architecture technique |

---

## 🚀 Déploiement

Voir **DEPLOYMENT_GUIDE.md** pour les instructions complètes.

---

**Qatar Project Dashboard**  
**Généré automatiquement par Hearst Control**  
**2025-12-24**
