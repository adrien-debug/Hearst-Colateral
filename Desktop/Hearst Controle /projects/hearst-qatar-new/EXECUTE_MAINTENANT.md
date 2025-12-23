# ⚡ À EXÉCUTER MAINTENANT

## Étape 1 : SQL Editor (2 minutes)

### 1.1 Ouvrir ce lien :
👉 **https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql**

### 1.2 Copier le script
- Ouvrir le fichier : **`supabase-init-multi-projects.sql`**
- Sélectionner TOUT (Cmd+A ou Ctrl+A)
- Copier (Cmd+C ou Ctrl+C)

### 1.3 Exécuter
- Coller dans le SQL Editor
- Cliquer sur **RUN** (bouton vert en bas à droite) ▶️

### 1.4 Attendre le résultat
Vous devriez voir :
```
✅ Base de données multi-projets initialisée avec succès!
📦 2 projets créés (Qatar Project + Aquahash)
🏢 58 containers Qatar Project
📊 48 métriques insérées
🔐 Système de permissions utilisateurs créé
```

---

## Étape 2 : Désactiver RLS (1 minute)

Dans le même SQL Editor, copier-coller et exécuter :

```sql
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_project_access DISABLE ROW LEVEL SECURITY;
ALTER TABLE containers DISABLE ROW LEVEL SECURITY;
ALTER TABLE miners DISABLE ROW LEVEL SECURITY;
ALTER TABLE metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE auth_logs DISABLE ROW LEVEL SECURITY;
```

---

## Étape 3 : Créer Utilisateur (1 minute)

### 3.1 Aller sur :
👉 **https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/auth/users**

### 3.2 Cliquer sur "Add User"
- Email: `admin@hearstmining.com`
- Password: `Admin123!Hearst`
- ✅ Cocher "Confirm Email"
- Cliquer "Add User"

### 3.3 Copier l'UUID
Après création, cliquer sur l'utilisateur et copier son UUID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

---

## Étape 4 : Assigner Permissions (1 minute)

Retourner au SQL Editor et exécuter (REMPLACER `YOUR-UUID-HERE`) :

```sql
-- Récupérer l'UUID si nécessaire
SELECT id, email FROM auth.users WHERE email = 'admin@hearstmining.com';

-- Assigner les permissions (REMPLACER YOUR-UUID-HERE)
INSERT INTO user_project_access (user_id, project_id, access_level, can_view, can_edit, can_delete, can_manage_users)
VALUES 
  ('YOUR-UUID-HERE', 'QATAR-001', 'admin', TRUE, TRUE, TRUE, TRUE),
  ('YOUR-UUID-HERE', 'AQUA-001', 'admin', TRUE, TRUE, TRUE, TRUE);
```

**EXEMPLE** (si UUID = `a1b2c3d4-5678-90ab-cdef-1234567890ab`) :
```sql
INSERT INTO user_project_access (user_id, project_id, access_level, can_view, can_edit, can_delete, can_manage_users)
VALUES 
  ('a1b2c3d4-5678-90ab-cdef-1234567890ab', 'QATAR-001', 'admin', TRUE, TRUE, TRUE, TRUE),
  ('a1b2c3d4-5678-90ab-cdef-1234567890ab', 'AQUA-001', 'admin', TRUE, TRUE, TRUE, TRUE);
```

---

## Étape 5 : Tester (30 secondes)

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar Project-Dashboard
node test-supabase-connection.js
```

**Résultat attendu :**
```
✅ CONNEXION SUPABASE RÉUSSIE !
📊 Containers: 58 / 58 attendus
📦 Projects: 2
🎉 Base de données correctement initialisée !
```

---

## Étape 6 : Lancer l'Application

### Terminal 1 - Backend
```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar Project-Dashboard/backend
npm start
```

### Terminal 2 - Frontend
```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar Project-Dashboard/frontend
npm run dev
```

### Ouvrir le navigateur
👉 **http://localhost:3000**

Se connecter avec :
- Email: `admin@hearstmining.com`
- Password: `Admin123!Hearst`

---

## ✅ C'EST FAIT !

Vous devriez voir le **DASHBOARD MULTI-PROJETS** avec :
- Vue globale
- Hearst Qatar Project (QATAR-001)
- Hearst Aquahash (AQUA-001)

🎉 **HEARST CONTROL est opérationnel !**

