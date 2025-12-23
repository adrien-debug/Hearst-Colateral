# 🏗️ ARCHITECTURE GLOBALE - HEARST CONTROL

## 🎯 CLARIFICATION IMPORTANTE

### HEARST CONTROL ≠ HEARST QATAR

```
┌─────────────────────────────────────────────────────────────┐
│  HEARST CONTROL                                            │
│  └─> Plateforme de contrôle CENTRALISÉE                    │
│      Gère PLUSIEURS projets miniers indépendants           │
└─────────────────────────────────────────────────────────────┘
           │
           ├─> HEARST QATAR        (Projet #1 - Actif)
           ├─> HEARST AQUAHASH     (Projet #2 - Planifié)
           └─> HEARST TEXAS        (Projet #3 - Futur)
```

---

## 📊 STRUCTURE ACTUELLE VS STRUCTURE IDÉALE

### ❌ STRUCTURE ACTUELLE (Problématique)

```
Hearst Control/
├── AUTONOMIE_COMPLETE.md              ← Parle de "multi-projets"
├── Qatar Project-Dashboard/                   ← Application complète Qatar Project
│   ├── backend/
│   ├── frontend/
│   ├── .ensemble                      ← Système multi-projets
│   └── README.md (dit "Qatar Project Dashboard")
└── Qatar Project Project/
    └── HEARST_CLIENT_PACKAGE.md
```

**Problème** : 
- Le code Qatar Project est au niveau racine de Hearst Control
- Confusion entre plateforme (Hearst Control) et projet (Qatar Project)
- Difficile d'ajouter de nouveaux projets

---

### ✅ STRUCTURE IDÉALE (Recommandée)

```
Hearst Control/                           ← PLATEFORME CENTRALE
│
├── README.md                              ← "Plateforme de contrôle Hearst Mining"
├── ARCHITECTURE_GLOBALE.md                ← Ce fichier
│
├── core/                                  ← CODE COMMUN
│   ├── auth/                              ← Auth centralisée
│   ├── monitoring/                        ← Monitoring partagé
│   ├── api-gateway/                       ← API Gateway
│   └── shared-components/                 ← Composants UI
│
├── projects/                              ← PROJETS PILOTÉS
│   │
│   ├── hearst-qatar/                      ← PROJET #1
│   │   ├── backend/
│   │   ├── frontend/
│   │   ├── config.json                    ← Config Qatar Project
│   │   └── README.md                      ← "58 containers..."
│   │
│   ├── hearst-aquahash/                   ← PROJET #2
│   │   ├── backend/
│   │   ├── frontend/
│   │   ├── config.json                    ← Config Aquahash
│   │   └── README.md                      ← "15 containers..."
│   │
│   └── hearst-texas/                      ← PROJET #3 (futur)
│       └── ...
│
├── scripts/                               ← SCRIPTS ORCHESTRATION
│   ├── deploy-project.sh                  ← Déployer un projet
│   ├── start-all.sh                       ← Démarrer tous
│   ├── monitor-all.sh                     ← Monitoring global
│   └── add-project.sh                     ← Ajouter nouveau projet
│
└── docs/
    ├── ARCHITECTURE.md                    ← Architecture globale
    ├── ADDING_NEW_PROJECT.md              ← Guide ajout projet
    └── ENSEMBLE_GUIDE.md                  ← Guide système Ensemble
```

---

## 🎯 RÔLES CLARIFIÉS

### 1. **HEARST CONTROL** (Plateforme)

**Rôle** : Plateforme de contrôle centralisée

**Responsabilités** :
- ✅ Authentification centralisée (1 login pour tous les projets)
- ✅ Monitoring global de tous les sites
- ✅ Gestion des utilisateurs et permissions
- ✅ Dashboard centralisé
- ✅ API Gateway qui route vers les projets
- ✅ Système Ensemble (autonomie multi-projets)

**Technologies** :
- Backend : Node.js + Express
- Frontend : Next.js (dashboard global)
- Database : Supabase multi-tenant
- Auth : JWT centralisé

---

### 2. **HEARST QATAR** (Projet #1)

**Rôle** : Projet minier spécifique

**Specs** :
- 58 containers ANTSPACE HD5
- 17,864 mineurs S21XP Hydro (473 TH/s chacun)
- 8.45 EH/s hashrate total
- 102.37 MW puissance max
- Location : Qatar Project

**Statut** : ✅ **ACTIF et OPÉRATIONNEL**

**Isolation** :
- ✅ Backend dédié (port 3001)
- ✅ Frontend dédié (port 3000)
- ✅ Database isolée (schéma Supabase)
- ✅ Variables d'environnement séparées

---

### 3. **HEARST AQUAHASH** (Projet #2)

**Rôle** : Projet minier spécifique (planifié)

**Specs** (estimées) :
- 15 containers
- 4,620 mineurs
- 2.18 EH/s hashrate
- 26.37 MW puissance
- Location : TBD

**Statut** : 🚧 **PLANIFIÉ**

---

### 4. **HEARST TEXAS** (Projet #3 - Futur)

**Rôle** : Projet minier spécifique (futur)

**Specs** (à définir) :
- Containers : TBD
- Mineurs : TBD
- Hashrate : TBD
- Location : Texas, USA

**Statut** : 📋 **À VENIR**

---

## 🔄 SYSTÈME ENSEMBLE

Le **système Ensemble** gère l'autonomie et l'isolation des projets :

### Configuration `.ensemble`

```json
{
  "ensemble": {
    "version": "2.0.0",
    "workspace": "Hearst Control - Multi-Projects Monitoring Platform"
  },
  "projects": {
    "qatar": {
      "project_id": "QATAR-001",
      "name": "Hearst Qatar Project Mining",
      "status": "active",
      "isolated": true,
      "independent": true
    },
    "aquahash": {
      "project_id": "AQUA-001",
      "name": "Hearst Aquahash",
      "status": "planned",
      "isolated": true,
      "independent": true
    }
  },
  "autonomy": {
    "autoSave": { "enabled": true },
    "autoBackup": { "enabled": true },
    "refreshWatcher": { "enabled": true }
  }
}
```

### Scripts Ensemble

```bash
# Gestion du système
node backend/scripts/ensembleManager.js --validate
node backend/scripts/ensembleManager.js --projects
node backend/scripts/testEnsemble.js
```

**Voir** : `Qatar Project-Dashboard/ENSEMBLE_GUIDE.md` pour le guide complet

---

## 🔐 AUTHENTIFICATION CENTRALISÉE

### Principe

```
User Login
  ↓
Hearst Control (Auth centrale)
  ↓
JWT Token with project permissions
  ↓
Access to: Qatar Project ✓ | Aquahash ✓ | Texas ✓
```

### Table `user_project_access`

```sql
CREATE TABLE user_project_access (
  user_id UUID,
  project_id VARCHAR(20),  -- "QATAR-001", "AQUA-001", etc.
  role VARCHAR(20),         -- admin, manager, operator, viewer
  granted_at TIMESTAMP
);
```

### Login unique

```
Email    : admin@hearstmining.com
Password : Admin123!Hearst
Projects : Qatar Project ✓, Aquahash ✓
```

---

## 📊 DASHBOARD CENTRALISÉ

### Vue globale Hearst Control

```
╔═════════════════════════════════════════════════════════╗
║         HEARST CONTROL - Global Dashboard             ║
╠═════════════════════════════════════════════════════════╣
║                                                         ║
║  Total Hashrate: 10.63 EH/s                            ║
║  Total Power:    128.74 MW                             ║
║  Active Projects: 2/3                                  ║
║                                                         ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ ║
║  │ Qatar Project        │  │ Aquahash     │  │ Texas        │ ║
║  │ ✅ Active    │  │ 🚧 Planned   │  │ 📋 Future    │ ║
║  │ 8.45 EH/s    │  │ 2.18 EH/s    │  │ TBD          │ ║
║  │ 58 cont.     │  │ 15 cont.     │  │ TBD          │ ║
║  └──────────────┘  └──────────────┘  └──────────────┘ ║
║                                                         ║
╚═════════════════════════════════════════════════════════╝
```

### Dashboard par projet

Cliquer sur un projet → Dashboard spécifique (Qatar Project, Aquahash, etc.)

---

## 🚀 MIGRATION RECOMMANDÉE

### Étape 1 : Restructurer

```bash
# Créer la structure
mkdir -p "Hearst Control/projects/hearst-qatar"
mkdir -p "Hearst Control/core"
mkdir -p "Hearst Control/scripts"

# Déplacer Qatar Project-Dashboard
mv "Hearst Control/Qatar Project-Dashboard" "Hearst Control/projects/hearst-qatar"
```

### Étape 2 : Extraire le code commun

```bash
# Créer core/auth
# Créer core/monitoring
# Créer core/api-gateway
```

### Étape 3 : Mettre à jour les configs

```bash
# Adapter les chemins dans .env
# Mettre à jour package.json
# Adapter les imports
```

### Étape 4 : Créer le dashboard central

```bash
# Frontend central : Hearst Control/frontend
# Backend central : Hearst Control/backend
```

---

## 🎯 AVANTAGES DE L'ARCHITECTURE

### ✅ Isolation complète

Chaque projet est **totalement indépendant** :
- Code séparé
- Base de données séparée
- Environnement séparé
- Déploiement indépendant

### ✅ Réutilisabilité

Code commun dans `core/` :
- Authentification
- Monitoring
- Composants UI
- Utilitaires

### ✅ Scalabilité

Ajouter un nouveau projet = :
1. Copier le template
2. Adapter la config
3. Lancer le projet
4. ✅ Opérationnel !

### ✅ Clarté

- **Hearst Control** = Plateforme
- **projects/hearst-qatar** = Projet Qatar Project
- **projects/hearst-aquahash** = Projet Aquahash
- **Séparation claire des responsabilités**

---

## 📝 PLAN D'ACTION

### Phase 1 : Clarification (✅ FAIT)

- ✅ Documenter l'architecture actuelle
- ✅ Identifier les problèmes
- ✅ Proposer l'architecture idéale
- ✅ Corriger le système Ensemble

### Phase 2 : Restructuration (À faire)

- [ ] Créer la structure de dossiers idéale
- [ ] Déplacer Qatar Project-Dashboard vers projects/hearst-qatar
- [ ] Extraire le code commun dans core/
- [ ] Mettre à jour les chemins et configs

### Phase 3 : Dashboard Central (À faire)

- [ ] Créer le frontend central Hearst Control
- [ ] Créer le backend central (API Gateway)
- [ ] Implémenter l'auth centralisée
- [ ] Dashboard global avec tous les projets

### Phase 4 : Nouveaux Projets (À faire)

- [ ] Préparer le projet Aquahash
- [ ] Créer des templates pour nouveaux projets
- [ ] Guide "Ajouter un nouveau projet"
- [ ] Scripts d'automatisation

---

## 🏆 OBJECTIF FINAL

```
╔════════════════════════════════════════════════════════╗
║                  HEARST CONTROL                      ║
║        Plateforme Centralisée Multi-Projets           ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  🔐 Auth Centralisée : 1 login pour tous              ║
║  📊 Dashboard Global : Vue d'ensemble                 ║
║  🔧 Gestion Projets : Isolés et indépendants         ║
║  🤖 Système Ensemble : Autonomie complète            ║
║  🚀 Scalabilité : Ajout facile de projets            ║
║                                                        ║
║  Projets :                                            ║
║  ✅ Hearst Qatar Project     (58 containers, 8.45 EH/s)      ║
║  🚧 Hearst Aquahash  (15 containers, 2.18 EH/s)      ║
║  📋 Hearst Texas     (TBD)                            ║
║  📋 Hearst ...       (Futurs projets)                ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 📞 COMMANDES UTILES

```bash
# Vérifier le système Ensemble
cd "Hearst Control/Qatar Project-Dashboard"
node backend/scripts/testEnsemble.js

# Lister les projets configurés
node backend/scripts/ensembleManager.js --projects

# Valider la configuration
node backend/scripts/ensembleManager.js --validate
```

---

## 📚 DOCUMENTATION

- **ENSEMBLE_GUIDE.md** : Guide complet du système Ensemble
- **ARCHITECTURE_GLOBALE.md** : Ce fichier (architecture globale)
- **Qatar Project-Dashboard/README.md** : Documentation projet Qatar Project
- **Qatar Project-Dashboard/DEPLOYMENT_GUIDE.md** : Guide déploiement

---

## 🎯 RÉSUMÉ

### Situation actuelle :
- ❌ Confusion entre Hearst Control (plateforme) et Qatar Project (projet)
- ❌ Code Qatar Project au niveau racine
- ✅ Système Ensemble opérationnel (100%)

### Situation idéale :
- ✅ Hearst Control = Plateforme centrale
- ✅ projects/hearst-qatar = Projet Qatar Project isolé
- ✅ projects/hearst-aquahash = Projet Aquahash isolé
- ✅ core/ = Code commun réutilisable
- ✅ Dashboard centralisé avec vue globale

### Prochaine étape :
**Décider si vous voulez restructurer l'architecture** pour séparer clairement la plateforme des projets. Si oui, je peux créer la nouvelle structure et migrer le code ! 🔥

---

**Hearst Control - Multi-Projects Monitoring Platform**  
**Architecture Globale v1.0**  
**Décembre 2025**

