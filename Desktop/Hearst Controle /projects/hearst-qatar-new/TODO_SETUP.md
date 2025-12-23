# ✅ TODO - Setup Qatar Project

**Projet créé le** : 2025-12-24

---

## 🔧 Configuration Initiale

### 1. Supabase

- [ ] Créer un nouveau projet Supabase : https://supabase.com/dashboard
- [ ] Copier l'URL et les clés API
- [ ] Éditer `backend/.env` avec les credentials
- [ ] Éditer `frontend/.env.local` avec les credentials

### 2. Base de Données

- [ ] Ouvrir Supabase SQL Editor
- [ ] Copier le contenu de `database/init.sql`
- [ ] **ADAPTER** le schéma selon les besoins du client
- [ ] Exécuter le script SQL

### 3. Variables d'Environnement

- [ ] Générer un nouveau JWT_SECRET : `openssl rand -base64 32`
- [ ] Éditer `backend/.env` avec le nouveau secret
- [ ] Vérifier toutes les variables dans les deux .env

---

## 🎨 Personnalisation

### 4. Backend

- [ ] Adapter `backend/controllers/containersController.js` (ou renommer)
- [ ] Adapter `backend/controllers/minersController.js` (ou renommer)
- [ ] Adapter `backend/controllers/metricsController.js`
- [ ] Mettre à jour les routes dans `backend/routes/`

### 5. Frontend

- [ ] Adapter le dashboard : `frontend/src/app/dashboard/page.tsx`
- [ ] Personnaliser les composants : `frontend/src/components/`
- [ ] Adapter le branding (logo, couleurs, nom)
- [ ] Mettre à jour la navbar

### 6. Documentation

- [ ] Mettre à jour `README.md` avec specs du client
- [ ] Adapter `ARCHITECTURE.md`
- [ ] Adapter `API_DOCUMENTATION.md`
- [ ] Vérifier tous les fichiers .md

---

## 🧪 Tests

### 7. Tests Locaux

- [ ] Installer les dépendances : `npm install`
- [ ] Lancer le backend : `cd backend && npm run dev`
- [ ] Lancer le frontend : `cd frontend && npm run dev`
- [ ] Tester le login
- [ ] Tester le dashboard
- [ ] Tester toutes les fonctionnalités

### 8. Tests API

- [ ] Tester tous les endpoints avec Postman/Insomnia
- [ ] Vérifier l'authentification
- [ ] Vérifier les permissions

---

## 🚀 Déploiement

### 9. Préparation Production

- [ ] Créer un projet Supabase production séparé
- [ ] Configurer les variables d'environnement de production
- [ ] Tester le build : `npm run build`

### 10. Déploiement

- [ ] Choisir la plateforme (VPS, Docker, Vercel, etc.)
- [ ] Déployer le backend
- [ ] Déployer le frontend
- [ ] Configurer le domaine et SSL/HTTPS

---

## 📝 Documentation

### 11. Finalisation

- [ ] Mettre à jour CHANGELOG.md
- [ ] Compléter PROJECT_CONFIG.json avec les specs finales
- [ ] Créer un guide utilisateur si nécessaire

---

## ✅ Validation Finale

- [ ] Tous les tests passent
- [ ] Documentation complète
- [ ] Backend déployé et fonctionnel
- [ ] Frontend déployé et fonctionnel
- [ ] Client formé sur l'utilisation

---

**Bon courage ! 🚀**
