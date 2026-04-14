# Gestion des tailles d'icônes via CSS

## Vue d'ensemble

Le système d'icônes supporte maintenant deux méthodes pour contrôler la taille :

1. **Via la prop `size`** (méthode originale) - définit `width` et `height` inline
2. **Via la prop `sizeClass`** (nouvelle méthode) - utilise des classes CSS prédéfinies

## Classes de taille disponibles

```css
.icon-xs  /* 16px */
.icon-sm  /* 20px */
.icon-md  /* 24px (défaut) */
.icon-lg  /* 32px */
.icon-xl  /* 40px */
.icon-2xl /* 48px */
```

## Classes de couleur disponibles

```css
.icon-primary   /* Couleur accent du thème */
.icon-secondary /* Couleur secondaire du texte */
.icon-success   /* Vert (#10b981) */
.icon-warning   /* Orange (#f59e0b) */
.icon-error     /* Rouge (#ef4444) */
```

## Exemples d'utilisation

### Avec classes CSS (recommandé)

```tsx
// Taille via classe CSS
<Icon name="github" sizeClass="icon-lg" />

// Combinaison taille + couleur
<Icon name="github" sizeClass="icon-lg" className="icon-primary" />

// Avec classes Tailwind supplémentaires
<Icon name="github" sizeClass="icon-md" className="text-blue-500 hover:text-blue-700" />
```

### Avec prop size (méthode originale)

```tsx
// Taille personnalisée
<Icon name="github" size={32} />

// Toujours supporté
<Icon name="github" size={24} className="text-gray-700" />
```

## Avantages de l'approche CSS

1. **Performance** : Pas de styles inline, meilleure optimisation CSS
2. **Maintenabilité** : Tailles centralisées dans le CSS
3. **Cohérence** : Tailles standardisées dans toute l'application
4. **Théming** : Les tailles peuvent être ajustées via variables CSS
5. **Bundle size** : Moins de JavaScript pour les styles

## Migration recommandée

Pour migrer vers les classes CSS :

1. Remplacer `size={24}` par `sizeClass="icon-md"`
2. Remplacer `size={32}` par `sizeClass="icon-lg"`
3. Garder `size` pour les tailles vraiment personnalisées

## Variables CSS

Les classes utilisent les variables CSS du thème pour une adaptation automatique :

```css
.icon-primary {
    color: var(--accent);
}
```</content>
<parameter name="filePath">c:\Users\ddva\Desktop\portfolio-app-nextjs\app\components\ui\icon\CSS_SIZING.md