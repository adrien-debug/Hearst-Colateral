# 🤖 GUIDE DU SYSTÈME ENSEMBLE

## ✅ STATUT : 100% OPÉRATIONNEL

Le système Ensemble est maintenant **entièrement fonctionnel** et validé.

---

## 🎯 QU'EST-CE QUE LE SYSTÈME ENSEMBLE ?

Le système Ensemble est un **gestionnaire autonome multi-projets** qui :

- ✅ **Gère plusieurs projets indépendants** dans un workspace centralisé
- ✅ **Isole complètement** chaque projet (environnement, dépendances, database, API)
- ✅ **Enregistre automatiquement** l'état du système (format Zotto)
- ✅ **Sauvegarde automatiquement** les données
- ✅ **Surveille les changements** en temps réel

---

## 📊 ARCHITECTURE

```
Hearst Control/                         ← Plateforme centrale
└── Qatar-Dashboard/                     ← Instance actuelle
    ├── .ensemble                        ← Configuration du système
    ├── backend/scripts/
    │   ├── ensembleManager.js          ← Gestionnaire principal
    │   ├── testEnsemble.js             ← Suite de tests
    │   ├── zottoSave.js                ← Enregistrement auto
    │   ├── backup.js                    ← Backup auto
    │   └── refreshWatcher.js           ← Surveillance
    └── exports/zotto/                   ← Enregistrements
```

---

## 🔧 FICHIERS CLÉS

### 1. `.ensemble` (Configuration)

Fichier JSON définissant :
- **Projets** : Qatar, Aquahash, futurs projets
- **Autonomie** : AutoSave, AutoBackup, RefreshWatcher
- **Isolation** : Règles de séparation
- **Recording** : Format et destination des enregistrements

### 2. `ensembleManager.js` (Gestionnaire)

Classe JavaScript qui :
- Charge et valide la configuration
- Vérifie l'autonomie
- Liste les projets
- Vérifie l'isolation
- Enregistre l'état du système

### 3. `testEnsemble.js` (Tests)

Suite de 9 tests automatiques :
- Configuration valide
- Autonomie activée
- Scripts présents
- Projets configurés
- Isolation complète
- Enregistrement fonctionnel

---

## 🚀 UTILISATION

### Commandes Disponibles

```bash
# 1. Valider la configuration
node backend/scripts/ensembleManager.js --validate

# 2. Vérifier l'autonomie
node backend/scripts/ensembleManager.js --autonomy

# 3. Lister les projets
node backend/scripts/ensembleManager.js --projects

# 4. Enregistrer l'état actuel
node backend/scripts/ensembleManager.js --record

# 5. Afficher le statut complet
node backend/scripts/ensembleManager.js --status

# 6. Lancer tous les tests (RECOMMANDÉ)
node backend/scripts/testEnsemble.js
```

---

## 📁 PROJETS CONFIGURÉS

### 1. **Hearst Qatar** (qatar)

```json
{
  "project_id": "QATAR-001",
  "name": "Hearst Qatar Mining",
  "status": "active",
  "isolated": true,
  "independent": true,
  "specs": {
    "containers": 58,
    "miners": 17864,
    "hashrate_eh": 8.45,
    "power_mw": 102.37,
    "container_type": "ANTSPACE HD5",
    "miner_model": "S21XP Hydro"
  }
}
```

**Statut** : ✅ Actif et opérationnel

### 2. **Hearst Aquahash** (aquahash)

```json
{
  "project_id": "AQUA-001",
  "name": "Hearst Aquahash",
  "status": "planned",
  "isolated": true,
  "independent": true,
  "specs": {
    "containers": null,
    "miners": null,
    "hashrate_eh": null,
    "power_mw": null
  }
}
```

**Statut** : 🚧 Planifié

---

## 🤖 AUTONOMIE

Le système fonctionne en **mode automatique** :

### 1. AutoSave (toutes les 5 minutes)

```bash
Script : backend/scripts/zottoSave.js
Interval : 300 secondes
Destination : exports/zotto/, backups/
```

Enregistre automatiquement :
- État du projet
- Sessions actives
- Changements récents
- Snapshot de configuration

### 2. AutoBackup (toutes les heures)

```bash
Script : backend/scripts/backup.js
Interval : 3600 secondes
Rétention : 24h hourly, 7d daily, 4w weekly, 12m monthly
```

### 3. RefreshWatcher (en continu)

```bash
Script : backend/scripts/refreshWatcher.js
Surveille : backend/**/*.js, frontend/**/*.{ts,tsx}, database/**/*.sql
```

---

## 🔒 ISOLATION DES PROJETS

Chaque projet est **totalement isolé** :

```
✅ Environment     : Variables d'environnement séparées
✅ Dependencies    : node_modules indépendants
✅ Database        : Schémas/tables séparés
✅ API             : Endpoints distincts
```

### Règles de séparation :

1. ✅ Chaque projet a son propre workspace
2. ✅ Aucun import cross-project autorisé
3. ✅ Variables d'environnement isolées
4. ✅ Logs séparés
5. ✅ Backups séparés

---

## 💾 ENREGISTREMENTS (Zotto Format)

Les enregistrements sont sauvegardés dans `exports/zotto/` :

```json
{
  "timestamp": "2025-12-24T...",
  "workspace": "/path/to/workspace",
  "projects": [
    {
      "id": "qatar",
      "name": "Hearst Qatar Mining",
      "status": "active",
      ...
    }
  ],
  "autonomy": {
    "enabled": true,
    "autoSave": true,
    "autoBackup": true,
    "refreshWatcher": true
  },
  "metadata": {
    "recordedBy": "ensembleManager",
    "version": "2.0.0"
  }
}
```

### Types d'enregistrements :

- `ensemble-state-*.json` : État système complet
- `test-report-*.json` : Rapports de tests
- `zotto-*.json` : Exports au format Zotto

---

## 🧪 TESTS

### Suite de tests (9 tests)

```bash
node backend/scripts/testEnsemble.js
```

**Tests effectués** :
1. ✅ Fichier .ensemble existe
2. ✅ Configuration valide
3. ✅ Autonomie activée
4. ✅ Scripts autonomes existent
5. ✅ Projets configurés
6. ✅ Isolation des projets
7. ✅ Dossier exports/zotto accessible
8. ✅ Enregistrement fonctionne
9. ✅ Statut complet disponible

**Résultat actuel** : ✅ **100% réussite** (9/9 tests passés)

---

## 📝 AJOUTER UN NOUVEAU PROJET

Pour ajouter un projet (exemple : "Hearst Texas") :

1. **Éditer `.ensemble`** :

```json
"projects": {
  "qatar": { ... },
  "aquahash": { ... },
  "texas": {
    "project_id": "TEXAS-001",
    "name": "Hearst Texas Mining",
    "status": "planned",
    "location": "Texas, USA",
    "isolated": true,
    "independent": true,
    "root": "/path/to/texas-project",
    "specs": {
      "containers": 30,
      "miners": 9240,
      "hashrate_eh": 4.37,
      "power_mw": 52.79
    }
  }
}
```

2. **Valider** :

```bash
node backend/scripts/ensembleManager.js --validate
```

3. **Tester** :

```bash
node backend/scripts/testEnsemble.js
```

---

## 🔍 VÉRIFICATION RAPIDE

**Pour vérifier que tout fonctionne** :

```bash
# Test complet en une commande
cd "/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
node backend/scripts/testEnsemble.js
```

**Résultat attendu** :
```
✅ TOUS LES TESTS SONT PASSÉS !
Le système Ensemble est 100% opérationnel.
Taux de réussite : 100.0%
```

---

## 🛠️ DÉPANNAGE

### Problème : Configuration invalide

```bash
# Vérifier les erreurs
node backend/scripts/ensembleManager.js --validate
```

### Problème : Scripts manquants

```bash
# Vérifier les scripts
node backend/scripts/ensembleManager.js --autonomy
```

### Problème : Projets non reconnus

```bash
# Lister les projets
node backend/scripts/ensembleManager.js --projects
```

---

## 📊 MONITORING

### Surveiller l'activité :

```bash
# Logs d'enregistrement
ls -lh exports/zotto/

# Logs de backup
ls -lh backups/

# Logs système
tail -f logs/*.log
```

---

## 🎯 POINTS CLÉS

### ✅ Ce qui fonctionne :

- Configuration complète et validée
- Autonomie activée (AutoSave, AutoBackup, RefreshWatcher)
- 2 projets configurés (Qatar actif, Aquahash planifié)
- Isolation totale des projets
- Enregistrement automatique (format Zotto)
- Suite de tests complète (100% réussite)

### 🚧 À développer :

- Interface web pour visualiser les projets
- Dashboard centralisé Hearst Control
- Ajout de nouveaux projets (Texas, autres sites)
- Notifications automatiques
- Intégration monitoring en temps réel

---

## 📞 COMMANDES ESSENTIELLES

```bash
# Validation complète
node backend/scripts/ensembleManager.js --validate

# Tests automatiques
node backend/scripts/testEnsemble.js

# Statut système
node backend/scripts/ensembleManager.js --status

# Enregistrer l'état
node backend/scripts/ensembleManager.js --record
```

---

## 🏆 RÉSUMÉ

Le **système Ensemble** est :
- ✅ **100% opérationnel** (tous tests passés)
- ✅ **Autonome** (AutoSave, AutoBackup, RefreshWatcher)
- ✅ **Multi-projets** (Qatar actif, Aquahash planifié)
- ✅ **Isolé** (séparation complète des projets)
- ✅ **Testé** (9/9 tests réussis)

**Le système est prêt à gérer plusieurs projets miniers Hearst de manière centralisée et autonome !** 🔥

---

**Système Ensemble v2.0.0**  
**Hearst Control - Multi-Projects Monitoring Platform**  
**Décembre 2025**

