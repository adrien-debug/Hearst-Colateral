# Calculs Ingénieur — Projet Mining Hydro Bitmain ANTSPACE HD5 (S21XP Hydro)

## 1) Données d’entrée (celles que tu as fournies)

- **Nombre de containers** \(N_c\) = **58**
- **Slots / mineurs par container** \(N_m\) = **308**
- **Modèle mineur** = **S21XP Hydro**
- **Hashrate par mineur** \(H_m\) = **473 TH/s**
- **Puissance par mineur** \(P_m\) = **5676 W** = **5.676 kW**
- **Conso container (nameplate)** \(P_c\) = **1765 kW** *(confirmé: **cooling inclus** dans cette valeur, et c’est la valeur **MAX**)*
- **Prix container + cooling** = **$119,888**
- **Prix mineur** = **$7,662.6**

## 2) Calculs mining (hashrate & quantités)

- **Total mineurs**:
  \[
  N_{tot} = N_c \times N_m = 58 \times 308 = \mathbf{17{,}864}
  \]

- **Hashrate par container**:
  \[
  H_{c} = 308 \times 473 = \mathbf{145{,}684\ TH/s} = \mathbf{145.684\ PH/s}
  \]

- **Hashrate total site**:
  \[
  H_{tot} = 17{,}864 \times 473 = \mathbf{8{,}449{,}672\ TH/s}
  = \mathbf{8{,}449.672\ PH/s} = \mathbf{8.45\ EH/s}
  \]

## 3) Calculs puissance (mineurs vs container)

- **Puissance mineurs par container**:
  \[
  P_{miners,c} = 308 \times 5.676 = \mathbf{1{,}748.208\ kW} = \mathbf{1.748\ MW}
  \]

- **Écart “auxiliaires container”** (cooling inclus dans \(P_c\)):
  \[
  P_{aux,c} = 1{,}765 - 1{,}748.208 = \mathbf{16.792\ kW}
  \]
  Interprétation: ce delta couvre **pompes internes + ventilateurs + contrôle + pertes internes**.
  
  **Alerte cohérence**: si on retient “ventilos ~24 kW/container”, alors ce seul poste dépasserait déjà 16.8 kW.
  Donc, avec tes inputs S21XP, l’une de ces hypothèses doit être ajustée:
  - soit la puissance mineur n’est pas 5676 W au point considéré,
  - soit le nombre de mineurs actifs < 308,
  - soit “24 kW” n’est pas la consommation réelle des ventilateurs (ou c’est une valeur max hors nominal).

- **Puissance IT (mineurs) totale**:
  \[
  P_{IT} = 17{,}864 \times 5.676 = \mathbf{101{,}396.064\ kW} = \mathbf{101.40\ MW}
  \]

- **Puissance totale “containers”** (si \(P_c\) est la puissance au point d’alimentation de chaque container):
  \[
  P_{containers} = 58 \times 1.765 = \mathbf{102.37\ MW}
  \]

## 4) Efficacité énergétique (mineur)

- **Efficacité**:
  \[
  \frac{5676}{473} = \mathbf{12.0\ J/TH}
  \]
  (c’est exact: \(473 \times 12 = 5676\))

- **kWh/TH/jour**:
  \[
  12\ W/TH \Rightarrow 0.012\ kW/TH \Rightarrow 0.012 \times 24 = \mathbf{0.288\ kWh/TH/j}
  \]

## 5) Apparent power (MVA) & sizing transfos (ordre de grandeur)

Hypothèse PF (facteur de puissance) **cosφ = 0.98** (à confirmer via constructeur / PDU).

- **Par container**:
  \[
  S_c = \frac{P_c}{PF} = \frac{1.765}{0.98} = \mathbf{1.801\ MVA}
  \]

- **Deux containers sur un MV/LV** (ratio 2:1):
  \[
  S_{2c} = 2 \times 1.801 = \mathbf{3.602\ MVA}
  \]
  Avec un transfo **3.75 MVA**, la charge est \(\frac{3.602}{3.75}=\mathbf{96.1\%}\) → **très chargé** (marge faible en été / dérating).

- **Total site**:
  \[
  S_{tot} = \frac{P_{containers}}{PF} = \frac{102.37}{0.98} = \mathbf{104.46\ MVA}
  \]

### Conséquence critique pour HV/MV N+1
- Avec **2×100 MVA (N+1 réel)**: en mode N+1, **1 seul transfo** doit pouvoir porter \(S_{tot}\).  
  Ici \(S_{tot} \approx \mathbf{104.5\ MVA}\) → **100 MVA n’est pas suffisant si 1.765 MW est NOMINAL**.
  Mais comme tu as confirmé que **1.765 MW = MAX**, le design peut rester **2×100 MVA** si la puissance nominale est < ~98 MW (selon PF/marges).

👉 Recommandation “ingénieur”:
- soit tu considères **1.765 MW = MAX** (et tu restes sur ~87.7–94 MW nominal comme avant),
- soit si **1.765 MW est le nominal**, alors HV/MV doit passer à **2×125 MVA** (ou 2×120 MVA selon marge & normes Kahramaa).

## 6) PUE (deux définitions possibles)

La définition dépend de ce que tu appelles “IT”:

- **Option A (IT = mineurs uniquement)**:
  - IT = \(P_{IT} \approx 101.40\ MW\)
  - Facility = puissance au grid (containers + pertes amont).

- **Option B (IT = container input)**:
  - IT = \(P_{containers} = 102.37\ MW\)
  - Facility = puissance au grid (incluant pertes amont).

Exemple de calcul “ordre de grandeur” si rendement global amont \(\eta\) ≈ \(0.99 \times 0.985 \times 0.995 = 0.970\) (HV/MV 99%, MV/LV 98.5%, MV distrib 99.5%):

\[
P_{grid} \approx \frac{102.37}{0.970} = \mathbf{105.5\ MW}
\]

- PUE (Option A) ≈ \(105.5 / 101.4 = \mathbf{1.041}\)
- PUE (Option B) ≈ \(105.5 / 102.37 = \mathbf{1.030}\)

👉 À figer une fois qu’on confirme: **1765 kW/container est NOMINAL ou MAX** (et PF réel).

## 7) Pricing (IT + containers)

- **CAPEX containers**:
  \[
  58 \times 119{,}888 = \mathbf{6{,}953{,}504\ \$}
  \]

- **CAPEX mineurs**:
  \[
  17{,}864 \times 7{,}662.6 = \mathbf{136{,}884{,}686.4\ \$}
  \]

- **Total (mineurs + containers)**:
  \[
  \mathbf{143{,}838{,}190.4\ \$}
  \]

Hors: sous-station HV/MV, MV/LV, RMU, câbles, génie civil, installation, transport, taxes, O&M.

## 8) Points à confirmer (pour verrouiller la version “master”)

1) **Le 1765 kW/container**: c’est **MAX** ✅
2) **Les 24 kW de ventilateurs**: inclus dans 1765 kW ou en plus ?
3) **PF réel** au container (0.98 ou autre) ?
4) Si nominal = 1.765 MW: confirmer upgrade **HV/MV** à **2×125 MVA** (N+1 réel).


