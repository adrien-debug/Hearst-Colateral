# 🤝 GUIDE DE CONTRIBUTION — QATAR DASHBOARD

Merci de votre intérêt pour contribuer au Qatar Project Dashboard !

---

## 📋 TABLE DES MATIÈRES

1. [Code de conduite](#code-de-conduite)
2. [Comment contribuer](#comment-contribuer)
3. [Standards de code](#standards-de-code)
4. [Process de Pull Request](#process-de-pull-request)
5. [Reporting de bugs](#reporting-de-bugs)
6. [Suggestions de fonctionnalités](#suggestions-de-fonctionnalités)

---

## 📜 CODE DE CONDUITE

### Nos valeurs

- **Respect** : Traiter tous les contributeurs avec respect
- **Collaboration** : Travailler ensemble de manière constructive
- **Qualité** : Maintenir des standards de code élevés
- **Transparence** : Communication claire et ouverte

### Comportements inacceptables

- Harcèlement ou discrimination
- Langage offensant ou inapproprié
- Attaques personnelles
- Publication d'informations privées

---

## 🔧 COMMENT CONTRIBUER

### Prérequis

- Node.js 18+
- Git
- Compte GitHub
- Connaissance de JavaScript/TypeScript, React, Node.js

### Setup environnement de développement

```bash
# 1. Fork le repository
# Cliquer sur "Fork" sur GitHub

# 2. Cloner votre fork
git clone https://github.com/VOTRE-USERNAME/Hearst-Control.git
cd Hearst-Control

# 3. Ajouter le remote upstream
git remote add upstream https://github.com/adrien-debug/Hearst-Control.git

# 4. Installer les dépendances
npm install
cd frontend && npm install && cd ..

# 5. Configurer .env
cp .env.example .env
# Éditer .env avec vos credentials

# 6. Démarrer en dev
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
```

### Workflow de contribution

1. **Créer une issue** (optionnel mais recommandé)
2. **Créer une branche** depuis `dev`
3. **Développer** votre fonctionnalité/fix
4. **Tester** localement
5. **Commit** avec message descriptif
6. **Push** vers votre fork
7. **Créer une Pull Request** vers `dev`

---

## 📝 STANDARDS DE CODE

### Conventions générales

- **Langue** : Commentaires et documentation en **français**
- **Format** : Suivre les règles définies dans `.cursorrules`
- **Indentation** : 2 espaces (JavaScript/TypeScript)
- **Quotes** : Single quotes `'` sauf JSX (double quotes `"`)

### Backend (Node.js)

```javascript
/**
 * Description de la fonction en français
 * @param {string} param - Description du paramètre
 * @returns {Promise<Object>} Description du retour
 */
async function maFonction(param) {
  // Utiliser const/let (pas var)
  const result = await someAsyncOperation(param);
  
  // Gestion d'erreurs explicite
  if (!result) {
    throw new Error('Message d\'erreur explicite');
  }
  
  return result;
}
```

**Règles** :
- ✅ Utiliser `async/await` au lieu de callbacks
- ✅ Gestion d'erreurs avec try/catch
- ✅ Commentaires JSDoc pour fonctions publiques
- ✅ Validation des inputs
- ✅ Logs structurés

### Frontend (React/Next.js)

```typescript
/**
 * Composant MetricCard
 * Affiche une métrique KPI
 */
interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
}

export default function MetricCard({ label, value, unit }: MetricCardProps) {
  return (
    <div className="metric-container">
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value} {unit}</span>
    </div>
  );
}
```

**Règles** :
- ✅ Composants fonctionnels avec hooks
- ✅ TypeScript pour le typage
- ✅ Props destructurées
- ✅ Tailwind CSS pour le styling
- ✅ Noms de composants en PascalCase

### Base de données

```sql
-- Toujours commenter les tables et colonnes importantes
CREATE TABLE ma_table (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter des index sur les colonnes fréquemment recherchées
CREATE INDEX idx_ma_table_nom ON ma_table(nom);

-- Commenter les tables
COMMENT ON TABLE ma_table IS 'Description de la table en français';
```

### Commits

**Format** : `[TYPE] Description courte`

**Types** :
- `[FEAT]` : Nouvelle fonctionnalité
- `[FIX]` : Correction de bug
- `[REFACTOR]` : Refactoring
- `[DOCS]` : Documentation
- `[STYLE]` : Formatage, style
- `[TEST]` : Ajout de tests
- `[PERF]` : Amélioration de performance
- `[CHORE]` : Maintenance

**Exemples** :

```bash
[FEAT] Ajout du composant ContainerCard pour affichage des containers
[FIX] Correction du bug de refresh des métriques toutes les 10s
[REFACTOR] Refactorisation du hook useMetrics pour meilleure lisibilité
[DOCS] Mise à jour du README avec instructions de déploiement
```

---

## 🔀 PROCESS DE PULL REQUEST

### Avant de créer une PR

- [ ] Code respecte les standards (voir ci-dessus)
- [ ] Tests passent : `npm test`
- [ ] Pas d'erreurs ESLint
- [ ] Build frontend réussit : `npm run build:frontend`
- [ ] Fonctionnalité testée localement
- [ ] Documentation mise à jour si nécessaire

### Créer une Pull Request

1. **Push** vers votre fork :
   ```bash
   git push origin feature/ma-fonctionnalite
   ```

2. **Aller sur GitHub** et cliquer "New Pull Request"

3. **Remplir le template** :
   ```markdown
   ## Description
   Brève description de ce que fait cette PR.
   
   ## Type de changement
   - [ ] Bug fix
   - [ ] Nouvelle fonctionnalité
   - [ ] Breaking change
   - [ ] Documentation
   
   ## Checklist
   - [ ] J'ai testé localement
   - [ ] Les tests passent
   - [ ] La documentation est à jour
   - [ ] Le code suit les conventions
   
   ## Screenshots (si applicable)
   [Ajouter des captures d'écran]
   ```

4. **Attendre la review**

### Review process

- Un mainteneur reviewera votre PR dans les 48h
- Des changements peuvent être demandés
- Une fois approuvée, votre PR sera mergée dans `dev`
- Après tests en dev, merge vers `main` (production)

---

## 🐛 REPORTING DE BUGS

### Avant de signaler un bug

1. **Vérifier** que le bug n'a pas déjà été signalé
2. **Tester** sur la dernière version
3. **Vérifier** la documentation (README, SETUP, etc.)

### Créer une issue de bug

**Template** :

```markdown
## 🐛 Description du bug
Description claire et concise du bug.

## 📋 Steps to Reproduce
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## 💡 Comportement attendu
Ce qui devrait se passer normalement.

## 📸 Screenshots
Si applicable, ajouter des captures d'écran.

## 🖥️ Environnement
- OS: [ex: Ubuntu 22.04]
- Node.js: [ex: 18.17.0]
- Navigateur: [ex: Chrome 120]
- Version du projet: [ex: 1.0.0]

## 📝 Logs
```
[Coller les logs d'erreur ici]
```

## ℹ️ Informations supplémentaires
Tout autre contexte utile.
```

---

## 💡 SUGGESTIONS DE FONCTIONNALITÉS

### Créer une issue de feature request

**Template** :

```markdown
## 💡 Description de la fonctionnalité
Description claire de la fonctionnalité proposée.

## 🎯 Problème résolu
Quel problème cette fonctionnalité résout-elle ?

## 🔧 Solution proposée
Comment imaginez-vous que cela fonctionne ?

## 🌟 Alternatives considérées
Avez-vous pensé à d'autres solutions ?

## 📝 Informations supplémentaires
Tout autre contexte, screenshots, mockups, etc.
```

---

## 🧪 TESTS

### Exécuter les tests

```bash
# Tests backend
npm test

# Tests en mode watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Écrire des tests

**Backend** (Jest + Supertest) :

```javascript
describe('GET /api/metrics/latest', () => {
  it('devrait retourner les dernières métriques', async () => {
    const response = await request(app).get('/api/metrics/latest');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('total_hashrate_eh');
  });
});
```

**Frontend** (React Testing Library - à implémenter) :

```typescript
import { render, screen } from '@testing-library/react';
import MetricCard from '../components/MetricCard';

describe('MetricCard', () => {
  it('affiche la valeur et l\'unité correctement', () => {
    render(<MetricCard label="Hashrate" value={8.45} unit="EH/s" />);
    
    expect(screen.getByText('8.45 EH/s')).toBeInTheDocument();
  });
});
```

---

## 📚 RESSOURCES

### Documentation

- [README.md](README.md) - Documentation principale
- [SETUP.md](SETUP.md) - Guide d'installation
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Documentation API
- [.cursorrules](.cursorrules) - Règles de développement

### Technologies utilisées

- **Backend** : [Express.js](https://expressjs.com/), [Supabase](https://supabase.com/)
- **Frontend** : [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Recharts](https://recharts.org/)
- **Tests** : [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)
- **DevOps** : [Docker](https://www.docker.com/), [PM2](https://pm2.keymetrics.io/)

---

## 🙏 REMERCIEMENTS

Merci à tous les contributeurs qui aident à améliorer le Qatar Project Dashboard !

### Top Contributors

<!-- La liste sera générée automatiquement par GitHub -->

---

## 📧 CONTACT

Pour toute question sur les contributions :
- **Issues GitHub** : https://github.com/adrien-debug/Hearst-Control/issues
- **Email** : tech@hearst-mining.com

---

## ⚖️ LICENSE

Ce projet est propriétaire. Voir [LICENSE](LICENSE) pour plus de détails.

Toute contribution au projet implique que vous acceptez que votre code soit soumis à la même licence.

---

**Merci de contribuer au Qatar Project Dashboard ! 🚀**

**Hearst Mining © 2025**


