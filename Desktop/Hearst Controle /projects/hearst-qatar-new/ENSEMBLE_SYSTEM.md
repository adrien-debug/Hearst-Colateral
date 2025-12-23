/**
 * 🔧 CRÉATION [2025-12-23T00:00:00Z]
 * 
 * Fichier : ENSEMBLE_SYSTEM.md
 * Auteur : Sonnet 4.5
 * 
 * Purpose : Documentation complète du système .ensemble
 * Guide d'utilisation pour l'autonomie et la séparation des projets
 */

# 🤖 SYSTÈME ENSEMBLE — GESTION AUTONOME DES PROJETS

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Installation et Configuration](#installation-et-configuration)
3. [Architecture](#architecture)
4. [Utilisation](#utilisation)
5. [API et Commandes](#api-et-commandes)
6. [Autonomie](#autonomie)
7. [Séparation et Isolation](#séparation-et-isolation)
8. [Recording et Backup](#recording-et-backup)
9. [Troubleshooting](#troubleshooting)
10. [Exemples d'Utilisation](#exemples-dutilisation)

---

## 🎯 VUE D'ENSEMBLE

Le **système Ensemble** est un framework de gestion autonome qui permet de :

- ✅ **Enregistrer automatiquement** l'état du système et des projets
- ✅ **Séparer complètement** les projets dans un même workspace
- ✅ **Isoler** environnements, dépendances, bases de données et APIs
- ✅ **Monitorer en temps réel** avec auto-refresh et watcher
- ✅ **Backup automatique** configurable avec rétention intelligente
- ✅ **Travailler indépendamment** sur plusieurs projets en parallèle

### Pourquoi Ensemble ?

Dans un workspace complexe avec plusieurs projets (Qatar Project Dashboard, autres mining projects, etc.), il est crucial de maintenir :

1. **L'autonomie** : Chaque projet fonctionne de manière indépendante
2. **L'isolation** : Aucune contamination entre projets
3. **La traçabilité** : Enregistrement automatique de tous les états
4. **La résilience** : Backups automatiques et recovery rapide

---

## 🚀 INSTALLATION ET CONFIGURATION

### Installation

Le système Ensemble est déjà installé dans le projet Qatar Project-Dashboard. Aucune installation supplémentaire n'est requise.

### Structure des fichiers

```
Qatar Project-Dashboard/
├── .ensemble                           # Configuration principale
├── backend/scripts/ensembleManager.js  # Gestionnaire du système
└── exports/zotto/                      # Enregistrements automatiques
```

### Configuration initiale

Le fichier `.ensemble` contient toute la configuration :

```json
{
  "ensemble": {
    "version": "1.0.0",
    "workspace": "Hearst Control - Qatar Project Dashboard"
  },
  "autonomy": {
    "enabled": true,
    "autoSave": { "enabled": true, "interval": 300 },
    "autoBackup": { "enabled": true, "interval": 3600 }
  },
  "projects": {
    "qatar-dashboard": {
      "name": "Qatar Project Mining Dashboard",
      "isolated": true,
      "independent": true
    }
  }
}
```

### Personnalisation

Pour modifier la configuration :

1. Ouvrir `.ensemble` à la racine du projet
2. Modifier les paramètres souhaités
3. Valider avec : `npm run ensemble:validate`

---

## 🏗️ ARCHITECTURE

### Composants principaux

```
┌─────────────────────────────────────────────────────────┐
│                    SYSTÈME ENSEMBLE                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  .ensemble  │──│ ensembleManager│──│   Scripts    │  │
│  │   (config)  │  │     (core)     │  │  autonomes   │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
│         │                 │                  │          │
│         └─────────────────┴──────────────────┘          │
│                           │                             │
│         ┌─────────────────┴─────────────────┐          │
│         ▼                 ▼                 ▼          │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐     │
│   │ AutoSave │     │ AutoBackup│     │ Watcher  │     │
│   └──────────┘     └──────────┘     └──────────┘     │
│         │                 │                 │          │
│         └─────────────────┴─────────────────┘          │
│                           │                             │
│                           ▼                             │
│                  ┌──────────────────┐                  │
│                  │  exports/zotto/  │                  │
│                  │    backups/      │                  │
│                  │     logs/        │                  │
│                  └──────────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

### Flux de données

1. **Configuration** : `.ensemble` définit les règles
2. **Gestion** : `ensembleManager.js` orchestre le système
3. **Autonomie** : Scripts automatiques (save, backup, watch)
4. **Storage** : Exports structurés dans `exports/zotto/`

---

## 💻 UTILISATION

### Commandes disponibles

#### Via npm scripts (recommandé)

```bash
# Valider la configuration
npm run ensemble:validate

# Vérifier l'autonomie
npm run ensemble:autonomy

# Lister les projets
npm run ensemble:projects

# Enregistrer l'état actuel
npm run ensemble:record

# Afficher le statut complet
npm run ensemble:status
```

#### Via Node.js direct

```bash
# Toutes les commandes ci-dessus sont disponibles via :
node backend/scripts/ensembleManager.js [--flag]

# Flags disponibles :
#   --validate   : Valide la configuration .ensemble
#   --autonomy   : Vérifie l'état de l'autonomie
#   --projects   : Liste tous les projets configurés
#   --record     : Enregistre l'état actuel du système
#   --status     : Affiche le statut complet (défaut)
```

### Workflow typique

```bash
# 1. Vérifier le statut au démarrage
npm run ensemble:status

# 2. Valider la configuration si modifiée
npm run ensemble:validate

# 3. Enregistrer l'état avant travaux importants
npm run ensemble:record

# 4. Vérifier l'autonomie périodiquement
npm run ensemble:autonomy
```

---

## 🤖 AUTONOMIE

### AutoSave (zottoSave)

**Objectif** : Sauvegarder automatiquement l'état du système

**Configuration** :
```json
"autoSave": {
  "enabled": true,
  "interval": 300,  // secondes (5 minutes)
  "script": "backend/scripts/zottoSave.js",
  "destinations": ["exports/zotto/", "backups/"]
}
```

**Déclenchement** :
- Automatique toutes les 5 minutes (configurable)
- Manuel via `npm run zotto:export`

**Contenu enregistré** :
- État des projets
- Métriques actuelles
- Configuration système
- Timestamp précis

### AutoBackup

**Objectif** : Backup complet de la base de données

**Configuration** :
```json
"autoBackup": {
  "enabled": true,
  "interval": 3600,  // secondes (1 heure)
  "script": "backend/scripts/backup.js",
  "retention": {
    "hourly": 24,   // Garder 24 backups horaires
    "daily": 7,     // Garder 7 backups quotidiens
    "weekly": 4,    // Garder 4 backups hebdomadaires
    "monthly": 12   // Garder 12 backups mensuels
  }
}
```

**Déclenchement** :
- Automatique toutes les heures
- Manuel via `npm run backup`

**Stratégie de rétention** :
- Rotation automatique basée sur l'âge
- Compression des anciens backups
- Stockage dans `backups/`

### RefreshWatcher

**Objectif** : Monitoring en temps réel des changements

**Configuration** :
```json
"refreshWatcher": {
  "enabled": true,
  "script": "backend/scripts/refreshWatcher.js",
  "watchPaths": [
    "backend/**/*.js",
    "frontend/src/**/*.{ts,tsx}",
    "database/**/*.sql"
  ]
}
```

**Déclenchement** :
- Automatique au démarrage
- Manuel via `npm run watch:refresh`

**Fonctionnalités** :
- Watch des fichiers critiques
- Reload automatique en dev
- Notifications de changements

---

## 🔒 SÉPARATION ET ISOLATION

### Règles d'isolation

Le système Ensemble garantit :

1. **Isolation des environnements** : Variables `.env` séparées par projet
2. **Isolation des dépendances** : `node_modules/` indépendants
3. **Isolation des bases de données** : Schémas/connexions séparés
4. **Isolation des APIs** : Endpoints et routes distincts

### Configuration de séparation

```json
"separation": {
  "rules": [
    "Chaque projet doit avoir son propre workspace",
    "Aucun import cross-project autorisé",
    "Variables d'environnement isolées par projet",
    "Logs séparés par projet",
    "Backups séparés par projet"
  ],
  "isolation": {
    "environment": true,
    "dependencies": true,
    "database": true,
    "api": true
  }
}
```

### Vérification de l'isolation

```bash
# Vérifier l'isolation d'un projet
npm run ensemble:projects

# La sortie affiche :
# Qatar Project Mining Dashboard (qatar-dashboard)
#   Isolé: ✅
#   Indépendant: ✅
```

---

## 💾 RECORDING ET BACKUP

### Format d'enregistrement (zotto)

Les enregistrements suivent le format **zotto** :

```json
{
  "timestamp": "2025-12-23T12:34:56.789Z",
  "workspace": "/Users/.../Qatar Project-Dashboard",
  "projects": [
    {
      "id": "qatar-dashboard",
      "name": "Qatar Project Mining Dashboard",
      "isolated": true,
      "independent": true
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
    "version": "1.0.0"
  }
}
```

### Localisation des enregistrements

```
exports/zotto/
├── ensemble-state-1703336096789.json
├── ensemble-state-1703336396789.json
└── ensemble-state-1703336696789.json
```

### Restauration depuis un enregistrement

```bash
# 1. Lister les enregistrements disponibles
ls -lh exports/zotto/

# 2. Consulter un enregistrement
cat exports/zotto/ensemble-state-[timestamp].json

# 3. Restaurer (manuel pour l'instant)
# Copier la configuration souhaitée dans .ensemble
```

---

## 🔧 TROUBLESHOOTING

### Problème : Configuration invalide

**Symptôme** :
```bash
npm run ensemble:validate
# ❌ Configuration invalide
# Erreurs:
#   - Section "ensemble" manquante
```

**Solution** :
1. Vérifier que `.ensemble` existe à la racine
2. Vérifier la syntaxe JSON (attention aux virgules)
3. Restaurer depuis un backup si nécessaire

### Problème : Scripts autonomes non trouvés

**Symptôme** :
```bash
npm run ensemble:autonomy
# Scripts:
#   autoSave: ❌ /path/to/zottoSave.js
```

**Solution** :
1. Vérifier que le script existe : `ls backend/scripts/zottoSave.js`
2. Vérifier les permissions : `chmod +x backend/scripts/zottoSave.js`
3. Corriger le chemin dans `.ensemble` si nécessaire

### Problème : Enregistrement échoue

**Symptôme** :
```bash
npm run ensemble:record
# ❌ Erreur: ENOENT: no such file or directory
```

**Solution** :
1. Créer le dossier d'export : `mkdir -p exports/zotto`
2. Vérifier les permissions : `chmod 755 exports/zotto`
3. Vérifier l'espace disque : `df -h`

---

## 🎓 EXEMPLES D'UTILISATION

### Exemple 1 : Vérification quotidienne

```bash
#!/bin/bash
# Script de vérification quotidienne

echo "🔍 Vérification quotidienne du système Ensemble"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Statut global
echo "\n📊 Statut global :"
npm run ensemble:status

# 2. Validation
echo "\n✅ Validation :"
npm run ensemble:validate

# 3. Autonomie
echo "\n🤖 Autonomie :"
npm run ensemble:autonomy

# 4. Enregistrement
echo "\n💾 Enregistrement :"
npm run ensemble:record

echo "\n✨ Vérification terminée !"
```

### Exemple 2 : Ajout d'un nouveau projet

```json
// Modifier .ensemble pour ajouter un projet

"projects": {
  "qatar-dashboard": { ... },
  "nouveau-projet": {
    "name": "Mon Nouveau Projet",
    "root": "/Users/.../Nouveau-Projet",
    "isolated": true,
    "independent": true,
    "structure": {
      "backend": "backend/",
      "frontend": "frontend/"
    }
  }
}
```

Puis valider :
```bash
npm run ensemble:validate
npm run ensemble:projects
```

### Exemple 3 : Utilisation programmatique

```javascript
// Dans votre code Node.js
const EnsembleManager = require('./backend/scripts/ensembleManager');

async function checkSystem() {
  const manager = new EnsembleManager();
  
  // Charger la config
  const config = await manager.loadConfig();
  console.log('Config:', config);
  
  // Vérifier l'autonomie
  const autonomy = await manager.checkAutonomy();
  console.log('Autonomie:', autonomy.enabled ? 'Activée' : 'Désactivée');
  
  // Lister les projets
  const projects = await manager.listProjects();
  console.log('Projets:', projects.length);
  
  // Enregistrer l'état
  const record = await manager.recordState();
  console.log('Enregistrement:', record.success ? 'OK' : 'Échec');
}

checkSystem();
```

---

## 📚 RÉFÉRENCES

### Fichiers clés

- **`.ensemble`** : Configuration principale
- **`backend/scripts/ensembleManager.js`** : Gestionnaire du système
- **`backend/scripts/zottoSave.js`** : AutoSave
- **`backend/scripts/backup.js`** : AutoBackup
- **`backend/scripts/refreshWatcher.js`** : Watcher temps réel

### Commandes npm

| Commande | Description |
|----------|-------------|
| `ensemble:validate` | Valide la configuration |
| `ensemble:autonomy` | Vérifie l'autonomie |
| `ensemble:projects` | Liste les projets |
| `ensemble:record` | Enregistre l'état |
| `ensemble:status` | Statut complet |

### Dossiers importants

| Dossier | Contenu |
|---------|---------|
| `exports/zotto/` | Enregistrements automatiques |
| `backups/` | Backups de la base de données |
| `logs/` | Logs du système |

---

## 🎯 CONCLUSION

Le système Ensemble vous permet de :

✅ **Travailler sereinement** avec plusieurs projets isolés  
✅ **Sauvegarder automatiquement** sans intervention  
✅ **Monitorer en temps réel** l'état du système  
✅ **Récupérer rapidement** en cas de problème  
✅ **Maintenir l'autonomie** de chaque projet  

Pour toute question ou amélioration, consultez le code source dans `backend/scripts/ensembleManager.js`.

---

**Auteur** : Sonnet 4.5  
**Date de création** : 2025-12-23  
**Version** : 1.0.0  
**License** : Proprietary — Hearst Mining © 2025


