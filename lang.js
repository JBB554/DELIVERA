// DELIVERA — Language System v2
// Elite EN/FR translations for Cameroon launch

const LANGS = {
  en: {
    // Onboarding
    ob: [
      { em: '🛒', title: 'Every store,\none <b>place</b>', body: 'Santa Lucia, Dovv, Niki, Carrefour, parfumeries, pharmacies — all in your pocket.' },
      { em: '🎥', title: 'Packed <b>live</b>,\njust for you', body: 'Watch your picker assemble your order on video. Sealed. Labeled. No surprises.' },
      { em: '⚡', title: 'Delivered\nin <b>minutes</b>', body: 'Yaoundé. Douala. Your door. Track everything in real time.' }
    ],
    ob_skip: 'Skip',
    ob_next: 'Next',
    ob_start: 'Start Shopping',
    // Navigation
    nav_home: 'Home',
    nav_orders: 'Orders',
    nav_track: 'Track',
    nav_profile: 'Profile',
    // Home
    city_yde: 'Yaoundé',
    city_dla: 'Douala',
    live_pickers: 'pickers active',
    compare_banner: 'Compare prices across stores',
    compare_sub: 'We find you the best deal automatically',
    cats_label: 'Categories',
    stores_label: 'Stores',
    products_label: 'Products',
    featured: 'Featured',
    quick_picks: 'Quick Picks',
    see_all: 'See all',
    no_results: 'No results for "{q}"',
    // Store
    open_now: 'Open',
    closed: 'Closed',
    min_order: 'Min. order',
    delivery_est: 'Delivery',
    pickup: 'Pickup',
    delivery: 'Delivery',
    add_to_cart: 'Add to cart',
    in_cart: 'In cart',
    // Cart
    your_cart: 'Your cart',
    cart_empty: 'Your cart is empty',
    cart_empty_sub: 'Browse stores and add items',
    order_summary: 'Order Summary',
    subtotal: 'Subtotal',
    delivery_fee: 'Delivery fee',
    service_fee: 'Service fee',
    total: 'Total',
    pay_momo: 'MTN MoMo',
    pay_om: 'Orange Money',
    pay_card: 'Card',
    place_order: 'Place Order',
    enter_number: 'Enter your number',
    // Receipt
    order_placed: 'Order placed!',
    order_id: 'Order ID',
    your_pin: 'Your PIN',
    pin_desc: 'Show this PIN when your order arrives to confirm delivery',
    track_order: 'Track on WhatsApp',
    // Order status
    status_placed: 'Placed',
    status_picking: 'Picker assigned',
    status_packing: 'Being packed',
    status_packed: 'Packed & sealed',
    status_transit: 'On the way',
    status_delivered: 'Delivered',
    // Picker dashboard
    dash_earnings: 'Today\'s earnings',
    dash_orders: 'Orders today',
    dash_rating: 'Rating',
    available: 'Available',
    go_offline: 'Go offline',
    new_order: 'New order',
    accept: 'Accept',
    decline: 'Decline',
    navigate: 'Navigate',
    mark_packed: 'Sealed & packed',
    confirm_delivery: 'Confirm delivery',
    // Store dashboard
    inventory: 'Inventory',
    add_product: '+ Add product',
    in_stock: 'In stock',
    out_of_stock: 'Out of stock',
    units: 'units',
    // Profile
    profile_menu: [
      { t: 'Become a Picker', s: 'Earn per order, set your hours', a: 'picker' },
      { t: 'Partner your store', s: 'List on DELIVERA, grow your sales', a: 'partner' },
      { t: 'Payment methods', s: 'MoMo, Orange Money, Card', a: 'payment' },
      { t: 'Saved addresses', s: 'Home, work and more', a: 'addresses' },
      { t: 'My orders', s: 'History and tracking', a: 'orders' },
      { t: 'Picker dashboard', s: 'View your stats and orders', a: 'dash' },
      { t: 'Analytics', s: 'Your spending insights', a: 'analytics' }
    ],
    // Toasts / misc
    added_cart: 'Added to cart',
    comingSoon: 'Coming soon!',
    thank_you: 'Thank you!',
    partner_sent: 'Request sent! We\'ll contact you within 24 hours.',
    language: 'Français'
  },
  fr: {
    // Onboarding
    ob: [
      { em: '🛒', title: 'Tous tes magasins,\nun seul <b>endroit</b>', body: 'Santa Lucia, Dovv, Niki, Carrefour, parfumeries, pharmacies — tout dans ta poche.' },
      { em: '🎥', title: 'Emballé <b>en direct</b>,\njuste pour toi', body: 'Regarde ton picker préparer ta commande en vidéo. Scellé. Étiqueté. Zéro surprise.' },
      { em: '⚡', title: 'Livré\nen <b>minutes</b>', body: 'Yaoundé. Douala. Ta porte. Tout suivre en temps réel.' }
    ],
    ob_skip: 'Passer',
    ob_next: 'Suivant',
    ob_start: 'Commencer',
    // Navigation
    nav_home: 'Accueil',
    nav_orders: 'Commandes',
    nav_track: 'Suivre',
    nav_profile: 'Profil',
    // Home
    city_yde: 'Yaoundé',
    city_dla: 'Douala',
    live_pickers: 'pickers actifs',
    compare_banner: 'Comparer les prix entre magasins',
    compare_sub: 'On trouve automatiquement la meilleure offre',
    cats_label: 'Catégories',
    stores_label: 'Magasins',
    products_label: 'Produits',
    featured: 'À la une',
    quick_picks: 'Choix rapides',
    see_all: 'Tout voir',
    no_results: 'Aucun résultat pour « {q} »',
    // Store
    open_now: 'Ouvert',
    closed: 'Fermé',
    min_order: 'Commande min.',
    delivery_est: 'Livraison',
    pickup: 'Retrait',
    delivery: 'Livraison',
    add_to_cart: 'Ajouter au panier',
    in_cart: 'Dans le panier',
    // Cart
    your_cart: 'Mon panier',
    cart_empty: 'Ton panier est vide',
    cart_empty_sub: 'Explore les magasins et ajoute des articles',
    order_summary: 'Récapitulatif',
    subtotal: 'Sous-total',
    delivery_fee: 'Frais de livraison',
    service_fee: 'Frais de service',
    total: 'Total',
    pay_momo: 'MTN MoMo',
    pay_om: 'Orange Money',
    pay_card: 'Carte',
    place_order: 'Passer la commande',
    enter_number: 'Entrer ton numéro',
    // Receipt
    order_placed: 'Commande passée !',
    order_id: 'Référence commande',
    your_pin: 'Ton code PIN',
    pin_desc: 'Montre ce code à la livraison pour confirmer la réception',
    track_order: 'Suivre sur WhatsApp',
    // Order status
    status_placed: 'Reçue',
    status_picking: 'Picker assigné',
    status_packing: 'En cours d\'emballage',
    status_packed: 'Emballé et scellé',
    status_transit: 'En route',
    status_delivered: 'Livré',
    // Picker dashboard
    dash_earnings: 'Gains du jour',
    dash_orders: 'Commandes aujourd\'hui',
    dash_rating: 'Note',
    available: 'Disponible',
    go_offline: 'Passer hors ligne',
    new_order: 'Nouvelle commande',
    accept: 'Accepter',
    decline: 'Refuser',
    navigate: 'Naviguer',
    mark_packed: 'Scellé et emballé',
    confirm_delivery: 'Confirmer la livraison',
    // Store dashboard
    inventory: 'Inventaire',
    add_product: '+ Ajouter un produit',
    in_stock: 'En stock',
    out_of_stock: 'Rupture de stock',
    units: 'unités',
    // Profile
    profile_menu: [
      { t: 'Devenir Picker', s: 'Gagne par commande, fixe tes horaires', a: 'picker' },
      { t: 'Référencer ton magasin', s: 'Rejoins DELIVERA, booste tes ventes', a: 'partner' },
      { t: 'Moyens de paiement', s: 'MoMo, Orange Money, Carte', a: 'payment' },
      { t: 'Adresses enregistrées', s: 'Domicile, bureau et plus', a: 'addresses' },
      { t: 'Mes commandes', s: 'Historique et suivi', a: 'orders' },
      { t: 'Tableau de bord Picker', s: 'Tes stats et commandes', a: 'dash' },
      { t: 'Analytique', s: 'Aperçu de tes dépenses', a: 'analytics' }
    ],
    // Toasts / misc
    added_cart: 'Ajouté au panier',
    comingSoon: 'Bientôt disponible !',
    thank_you: 'Merci !',
    partner_sent: 'Demande envoyée ! On te contacte dans les 24h.',
    language: 'English'
  }
};

// Auto-detect language from browser
let lang = (navigator.language || navigator.userLanguage || 'fr').startsWith('fr') ? 'fr' : 'en';

function L(key) {
  return (LANGS[lang] || LANGS.fr)[key] || key;
}

function toggleLang() {
  lang = lang === 'fr' ? 'en' : 'fr';
  document.dispatchEvent(new Event('swift:lang'));
  // Update lang toggle button text
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = L('language');
}
