# 📊 ÉTATS SUPABASE - CHECK AUTOMATIQUE

## 🔄 Vérifier l'État

```bash
node check-supabase-ready.js
```

---

## ✅ ÉTAT 1 : Pas Configuré (Initial)

```
🔍 Vérification de Supabase...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ÉTAT DES TABLES SUPABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ projects
❌ containers
❌ user_project_access
❌ metrics
❌ alerts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ SUPABASE N'EST PAS CONFIGURÉ

📋 Actions requises :
   1. Ouvrir SQL Editor
   2. Coller + RUN
   3. Script RLS
   4. Créer admin
```

**➡️ ACTION** : Exécuter `supabase-init-multi-projects.sql`

---

## ⚠️ ÉTAT 2 : Partiellement Configuré

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ÉTAT DES TABLES SUPABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ projects (2 lignes)
⚠️ containers (15 lignes)    ← Devrait être 58
❌ user_project_access
✅ metrics (48 lignes)
✅ alerts (0 lignes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**➡️ ACTION** : Script incomplet, réexécuter

---

## ✅ ÉTAT 3 : Tables OK, Permissions Manquantes

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ÉTAT DES TABLES SUPABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ projects (2 lignes)
✅ containers (58 lignes)
✅ user_project_access (0 lignes)  ← Vide
✅ metrics (48 lignes)
✅ alerts (0 lignes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**➡️ ACTION** : Créer utilisateur + assigner permissions

---

## 🎉 ÉTAT 4 : Tout Configuré !

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ÉTAT DES TABLES SUPABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ projects (2 lignes)
✅ containers (58 lignes)
✅ user_project_access (2 lignes)  ← OK
✅ metrics (48 lignes)
✅ alerts (0 lignes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ SUPABASE EST PRÊT !

🚀 Vous pouvez lancer l'application :
   ./start-all.sh
```

**➡️ ACTION** : Lancer `./start-all.sh` !

---

## 🔄 Workflow de Vérification

```bash
# Vérifier l'état
node check-supabase-ready.js

# Si pas prêt → Suivre QUICK_START.txt
# Si prêt → Lancer
./start-all.sh
```

---

## 🎯 Commandes Utiles

```bash
# Check complet
./verify-setup.sh

# Check Supabase seulement
node check-supabase-ready.js

# Test connexion détaillé
node test-supabase-connection.js
```

---

**Hearst Control** - Vérification Automatique

