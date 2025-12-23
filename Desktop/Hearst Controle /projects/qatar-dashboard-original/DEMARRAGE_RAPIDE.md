# 🚀 DÉMARRAGE RAPIDE - Qatar Dashboard

## ⚡ 3 Étapes pour Démarrer

---

## 📋 ÉTAPE 1 : Créer les Tables Supabase (5 min)

### Option A : Via Interface Web (RECOMMANDÉ) ✅

1. **Ouvrir le SQL Editor Supabase :**
   
   👉 https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql

2. **Copier-Coller le script :**
   - Ouvrir le fichier `supabase-init.sql` dans ce projet
   - Sélectionner TOUT (Cmd+A / Ctrl+A)
   - Copier (Cmd+C / Ctrl+C)
   - Coller dans le SQL Editor
   - Cliquer sur **RUN** (bouton vert en bas à droite)

3. **Vérifier :**
   ```
   ✅ Success. No rows returned
   
   En bas vous verrez :
   - containers | 58
   - miners     | 0
   - metrics    | 24
   ```

4. **Désactiver RLS (pour le développement) :**
   
   Copier-coller ceci dans le SQL Editor et exécuter :
   
   ```sql
   ALTER TABLE containers DISABLE ROW LEVEL SECURITY;
   ALTER TABLE miners DISABLE ROW LEVEL SECURITY;
   ALTER TABLE metrics DISABLE ROW LEVEL SECURITY;
   ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;
   ALTER TABLE auth_logs DISABLE ROW LEVEL SECURITY;
   ```

---

## 📋 ÉTAPE 2 : Tester la Connexion

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar-Dashboard
node test-supabase-connection.js
```

**Résultat attendu :**
```
✅ CONNEXION SUPABASE RÉUSSIE !
📊 Résumé des données:
   Containers: 58 / 58 attendus
   Miners: 0 / 17,864 max
   Metrics: OK
🎉 Base de données correctement initialisée !
```

---

## 📋 ÉTAPE 3 : Lancer l'Application

### Terminal 1 : Backend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar-Dashboard/backend
npm install
npm start
```

**Attendez de voir :**
```
🚀 Serveur démarré sur le port 3001
✅ Connexion Supabase : OK
```

### Terminal 2 : Frontend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar-Dashboard/frontend
npm install
npm run dev
```

**Puis ouvrir dans le navigateur :**

👉 http://localhost:3000

---

## ✅ C'est Fait !

Vous devriez voir :
- Dashboard avec 58 containers
- Métriques en temps réel
- Graphiques de performance

---

## 🔧 Dépannage

### "Table does not exist"
➡️ Retour à l'Étape 1 - les tables n'ont pas été créées

### "Row level security policy"
➡️ Exécuter le script RLS de l'Étape 1

### Backend ne démarre pas
```bash
# Vérifier que le .env existe
ls -la backend/.env

# Si absent, le créer :
cd backend
cat > .env << 'EOF'
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u
PORT=3001
NODE_ENV=development
EOF
```

### Frontend ne démarre pas
```bash
# Vérifier que le .env.local existe
ls -la frontend/.env.local

# Si absent, le créer :
cd frontend
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF
```

---

## 📚 Documentation Complète

- **Guide détaillé :** `SUPABASE_SETUP_GUIDE.md`
- **Résumé :** `README_SUPABASE.md`
- **Déploiement :** `DEPLOYMENT_GUIDE.md`

---

## 🎯 Credentials Supabase

**URL Projet :**
```
https://tnnsfheflydiuhiduntn.supabase.co
```

**Clé Publique (Anon Key) :**
```
sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u
```

**SQL Editor :**
```
https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql
```

**Table Editor :**
```
https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/editor
```

---

## 📊 Architecture du Projet Qatar

- **58 Containers** ANTSPACE HD5 (C01 → C58)
- **17,864 Mineurs** S21XP Hydro (308 par container)
- **8.45 EH/s** Hashrate total
- **102.37 MW** Puissance totale
- **29 Transformateurs** (T01 → T29, 2 containers/transfo)

---

**Besoin d'aide ? Consultez `SUPABASE_SETUP_GUIDE.md` pour plus de détails.**

