# 🚀 STRATEGIC RESERVE QATAR - QUICK START

**Démarrage rapide du projet Strategic Reserve Qatar**

---

## ⚡ DÉMARRAGE ULTRA-RAPIDE (3 étapes)

### 1️⃣ Configuration Backend

```bash
cd "/Users/adrienbeyondcrypto/Desktop/Hearst Controle /projects/hearst-strategic-reserve-qatar/backend"

# Copier le fichier d'exemple
cp env.example .env

# Éditer .env
nano .env
```

**Variables à configurer dans .env :**

```bash
# Server
NODE_ENV=development
PORT=3002

# JWT
JWT_SECRET=votre-secret-jwt-ici

# Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_KEY=votre-service-key-ici

# CORS
CORS_ORIGIN=http://localhost:3100
```

### 2️⃣ Configuration Frontend

```bash
cd "/Users/adrienbeyondcrypto/Desktop/Hearst Controle /projects/hearst-strategic-reserve-qatar/frontend"

# Copier le fichier d'exemple
cp env.example .env.local

# Éditer .env.local
nano .env.local
```

**Variables à configurer dans .env.local :**

```bash
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### 3️⃣ Installation & Démarrage

```bash
# Backend
cd backend
npm install
npm start
# → Backend disponible sur http://localhost:3002

# Frontend (nouveau terminal)
cd frontend
npm install
npm run dev
# → Frontend disponible sur http://localhost:3100
```

---

## 🗄️ BASE DE DONNÉES

### Étape 1 : Exécuter le schéma du projet

```sql
-- Dans Supabase SQL Editor
-- Coller le contenu de : projects/hearst-strategic-reserve-qatar/database/schema.sql
-- Cliquer sur "Run"
```

### Étape 2 : Ajouter le projet à la base centrale

```sql
-- Dans Supabase SQL Editor
-- Coller le contenu de : database/add-strategic-reserve-qatar.sql
-- Cliquer sur "Run"
```

**Cela va créer :**
- ✅ Projet SRQ-001 dans la base centrale
- ✅ Accès pour admin@hearstmining.com
- ✅ Configuration de 30 containers, 9,240 miners
- ✅ 4.37 EH/s hashrate total

---

## 🔐 LOGIN

```bash
Email    : admin@hearstmining.com
Password : Admin123!Hearst
```

---

## 🌐 ACCÈS

| Service | URL | Port |
|---------|-----|------|
| **Backend API** | http://localhost:3002 | 3002 |
| **Frontend Dashboard** | http://localhost:3100 | 3100 |
| **API Gateway (Central)** | http://localhost:4000/api/srq/* | 4000 |

---

## 📊 SPÉCIFICATIONS DU PROJET

### Infrastructure
- **Containers** : 30 × ANTSPACE HD5
- **Miners** : 9,240 × S21XP Hydro (473 TH/s)
- **Hashrate Total** : 4.37 EH/s
- **Puissance** : 52.95 MW

### Mission
Bitcoin mining infrastructure pour la réserve stratégique nationale du Qatar

---

## 🧪 TESTER L'API

```bash
# Health check
curl http://localhost:3002/health

# Login
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hearstmining.com",
    "password": "Admin123!Hearst"
  }'

# Récupérer les containers
curl http://localhost:3002/api/containers \
  -H "Authorization: Bearer YOUR_TOKEN"

# Via API Gateway Central
curl http://localhost:4000/api/srq/containers \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔄 INTÉGRATION HEARST CONTROL

Le projet est automatiquement intégré à Hearst Control Platform :

```bash
# Démarrer TOUS les projets (Qatar + Strategic Reserve)
cd "/Users/adrienbeyondcrypto/Desktop/Hearst Controle "
./scripts/start-all.sh
```

**Services démarrés :**
- ✅ Backend Central (4000) - API Gateway
- ✅ Qatar Backend (3001)
- ✅ Qatar Frontend (3000)
- ✅ Strategic Reserve Backend (3002)
- ✅ Strategic Reserve Frontend (3100)

---

## 📚 DOCUMENTATION COMPLÈTE

| Document | Description |
|----------|-------------|
| **README.md** | Vue d'ensemble du projet |
| **PROJECT_INFO.md** | Spécifications techniques détaillées |
| **QUICK_START.md** | Ce fichier (démarrage rapide) |

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Configurer les fichiers .env
2. ✅ Installer les dépendances
3. ✅ Exécuter les scripts SQL
4. ✅ Démarrer les services
5. 🔜 Tester le login
6. 🔜 Explorer le dashboard
7. 🔜 Configurer les containers
8. 🔜 Ajouter les miners

---

## 🆘 DÉPANNAGE

### Port 3002 déjà utilisé
```bash
lsof -ti:3002 | xargs kill -9
```

### Erreur Supabase
Vérifier que `SUPABASE_URL` et `SUPABASE_SERVICE_KEY` sont corrects dans `.env`

### Problème CORS
Vérifier que `CORS_ORIGIN` dans backend/.env correspond à l'URL du frontend

---

## 🎉 C'EST PRÊT !

**Strategic Reserve Qatar est maintenant configuré !**

Accédez au dashboard : **http://localhost:3100**

---

**Strategic Reserve Qatar**  
**Building Qatar's Digital Future**  
**🇶🇦 National Bitcoin Mining Infrastructure**

