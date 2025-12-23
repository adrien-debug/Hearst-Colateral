# 🚀 Guide d'Installation Supabase
## Qatar Project Dashboard - Hearst Mining

---

## 📋 Étape 1 : Créer les Tables dans Supabase

### Option A : Via le SQL Editor (RECOMMANDÉ) ✅

1. **Ouvrir votre projet Supabase** :
   - Aller sur : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn
   
2. **Ouvrir le SQL Editor** :
   - Dans le menu latéral, cliquer sur `SQL Editor`
   - Ou aller directement sur : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql

3. **Exécuter le script SQL** :
   - Ouvrir le fichier `supabase-init.sql` dans ce projet
   - Copier tout le contenu
   - Coller dans le SQL Editor
   - Cliquer sur `Run` (ou Ctrl/Cmd + Enter)

4. **Vérifier** :
   - Vous devriez voir : "Success. No rows returned"
   - En bas, vérifier le résumé avec 58 containers et 24 metrics

---

### Option B : Via psql (Ligne de commande)

Si vous préférez la ligne de commande :

```bash
# Connexion avec psql (vous devrez peut-être obtenir le vrai mot de passe du dashboard Supabase)
psql "postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.tnnsfheflydiuhiduntn.supabase.co:5432/postgres"

# Puis exécuter le fichier
\i supabase-init.sql
```

**Note** : Le mot de passe PostgreSQL peut être différent de votre mot de passe Supabase. 
Pour le trouver :
- Dashboard Supabase → Settings → Database → Connection string → Password

---

## 📋 Étape 2 : Configurer les Variables d'Environnement

### Backend (.env)

Créer le fichier `backend/.env` :

```bash
cd backend
cp .env.example .env
```

Puis éditer `backend/.env` avec vos valeurs :

```env
# Supabase
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u
SUPABASE_SERVICE_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u

# Backend
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)

Créer le fichier `frontend/.env.local` :

```bash
cd frontend
cp .env.local.example .env.local
```

Puis éditer `frontend/.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📋 Étape 3 : Configurer les Permissions (RLS)

Par défaut, Supabase active Row Level Security (RLS). Pour le développement, on va le désactiver temporairement :

1. **Ouvrir le SQL Editor**
2. **Exécuter ce script** :

```sql
-- Désactiver RLS pour le développement (à sécuriser en production)
ALTER TABLE containers DISABLE ROW LEVEL SECURITY;
ALTER TABLE miners DISABLE ROW LEVEL SECURITY;
ALTER TABLE metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE auth_logs DISABLE ROW LEVEL SECURITY;

-- OU créer des policies permissives pour le développement
ALTER TABLE containers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for development" ON containers FOR ALL USING (true);

ALTER TABLE miners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for development" ON miners FOR ALL USING (true);

ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for development" ON metrics FOR ALL USING (true);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for development" ON activity_logs FOR ALL USING (true);

ALTER TABLE auth_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for development" ON auth_logs FOR ALL USING (true);
```

---

## 📋 Étape 4 : Tester la Connexion

### Test avec le script Node.js

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar Project-Dashboard
node test-supabase.js
```

Vous devriez voir :
```
✅ Connexion Supabase réussie
📦 Containers trouvés: 58
📊 Métriques trouvées: 24
```

---

## 📋 Étape 5 : Lancer l'Application

### Terminal 1 : Backend

```bash
cd Qatar Project-Dashboard/backend
npm install
npm start
```

Vous devriez voir :
```
🚀 Serveur démarré sur le port 3001
✅ Connexion Supabase : OK
```

### Terminal 2 : Frontend

```bash
cd Qatar Project-Dashboard/frontend
npm install
npm run dev
```

Puis ouvrir : http://localhost:3000

---

## 🔍 Vérification des Tables

### Via le Dashboard Supabase

1. Aller sur : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/editor
2. Vous devriez voir ces tables :
   - ✅ `containers` (58 lignes)
   - ✅ `miners` (0 lignes initialement)
   - ✅ `metrics` (24 lignes - historique 24h)
   - ✅ `activity_logs` (0 lignes)
   - ✅ `auth_logs` (0 lignes)

### Via SQL

```sql
-- Compter les données
SELECT 
  'containers' as table_name, 
  COUNT(*) as count 
FROM containers
UNION ALL
SELECT 'miners', COUNT(*) FROM miners
UNION ALL
SELECT 'metrics', COUNT(*) FROM metrics;
```

Résultat attendu :
```
containers | 58
miners     | 0
metrics    | 24
```

---

## 🎯 Structure des Tables

### Table `containers`
58 containers ANTSPACE HD5 (C01 → C58)
- 308 mineurs par container
- ~145.68 PH/s par container (308 × 473 TH/s)
- ~1765 kW par container
- 2 containers par transformateur (T01 → T29)

### Table `miners`
Jusqu'à 17,864 mineurs S21XP Hydro
- 473 TH/s par mineur
- 5676 W par mineur
- Assignés à leurs containers respectifs

### Table `metrics`
Historique des métriques globales
- Total hashrate (EH/s)
- Total power (MW)
- Température moyenne
- Uptime

---

## 🔧 Dépannage

### Erreur : "relation does not exist"
➡️ Les tables n'ont pas été créées. Retourner à l'Étape 1.

### Erreur : "Failed to fetch"
➡️ Vérifier que le backend tourne sur le port 3001
➡️ Vérifier les variables d'environnement

### Erreur : "Invalid API key"
➡️ Vérifier que les clés dans .env correspondent au dashboard Supabase
➡️ Dashboard → Settings → API

### Erreur : "row-level security policy"
➡️ Exécuter le script RLS de l'Étape 3

---

## 📊 Données de Test

Pour ajouter des mineurs de test :

```sql
-- Ajouter 308 mineurs au container C01
INSERT INTO miners (miner_id, container_id, status, hashrate_th, power_w, temperature_c, uptime_percent)
SELECT 
  'C01-M' || LPAD(generate_series::TEXT, 3, '0'),
  'C01',
  'active',
  473.0,
  5676.0,
  65 + (random() * 10),
  99 + (random() * 1)
FROM generate_series(1, 308);
```

---

## ✅ Checklist Finale

- [ ] Tables créées dans Supabase (via SQL Editor)
- [ ] RLS configuré (policies ou désactivé)
- [ ] Fichier `backend/.env` créé avec les bonnes valeurs
- [ ] Fichier `frontend/.env.local` créé
- [ ] Test de connexion réussi (`node test-supabase.js`)
- [ ] Backend démarré (port 3001)
- [ ] Frontend démarré (port 3000)
- [ ] Dashboard accessible sur http://localhost:3000

---

## 🎉 Félicitations !

Votre dashboard Qatar Project est maintenant connecté à Supabase !

**URLs importantes** :
- 🌐 Dashboard Supabase : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn
- 🗄️ Table Editor : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/editor
- 📝 SQL Editor : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql
- 📊 API Docs : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/api

---

## 🔐 Sécurité Production

**IMPORTANT** : Avant de déployer en production :

1. **Activer RLS** sur toutes les tables
2. **Créer des policies strictes** basées sur les rôles utilisateurs
3. **Utiliser la SERVICE_ROLE_KEY** uniquement côté backend
4. **Ne JAMAIS exposer** la SERVICE_ROLE_KEY côté frontend
5. **Changer tous les secrets** (JWT_SECRET, etc.)
6. **Configurer CORS** correctement
7. **Activer HTTPS** uniquement

---

Pour toute question : vérifier DEPLOYMENT_GUIDE.md

