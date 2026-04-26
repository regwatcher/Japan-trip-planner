export type Activity = {
  name: string;
  description?: string;
  isIncluded?: boolean;
};

export type Day = {
  dayNumber: number;
  date: string;
  title: string;
  ville: string;
  repas: string;
  transport: string;
  hébergement: string;
  activities: Activity[];
};

export const itinerary: Day[] = [
  {
    dayNumber: 1,
    date: "Lun. 27 juil. 2026",
    title: "Arrivée à Tokyo",
    ville: "Tokyo",
    repas: "—",
    transport: "Aéroport Tokyo-Haneda → Hôtel (minivan privatif avec chauffeur)",
    hébergement: "Ryogoku View Hotel (Twin + Triple)",
    activities: [
      { name: "Conciergerie francophone sur place", description: "Service d'accompagnement opéré par les collègues francophones sur place, 7j/7 et 24h/24, par téléphone, e-mail et WhatsApp : questions sur l'itinéraire, réservations de restaurants ou d'activités, traduction, etc.", isIncluded: true },
      { name: "Pocket Wi-Fi", description: "Routeur portable converti le réseau 4G en Wi-Fi local, avec forfait internet illimité pour toute la durée du séjour.", isIncluded: true },
      { name: "Carte de transport prépayée (IC Card)", description: "4 cartes prévues (votre fille à Waseda ayant déjà la sienne). Valides sur la quasi-totalité des transports locaux et acceptées comme porte-monnaie électronique dans de nombreux commerces.", isIncluded: true },
      { name: "Tokyo en liberté", description: "Temps pour découvrir la capitale : Asakusa, Akihabara, parc Yoyogi, Shibuya… chaque quartier a son identité." }
    ]
  },
  {
    dayNumber: 2,
    date: "Mar. 28 juil. 2026",
    title: "Incontournables de Tokyo",
    ville: "Tokyo",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "Ryogoku View Hotel",
    activities: [
      { name: "Marché de Tsukiji", description: "Plus grand marché de produits frais de Tokyo. Ruelles d'étals de poissons, fruits, légumes et ustensiles. Sushis frais au petit déjeuner. À voir également : le Temple Tsukiji Hongan-ji à l'architecture inspirée de l'Inde bouddhique. Note : la halle aux poissons historique a déménagé à Toyosu." },
      { name: "Ginza et Shiodome", description: "Quartier luxueux des grandes enseignes internationales, architecture futuriste, galeries d'art, cafés thématiques (Pokémon Café – réservation obligatoire), jardins sur toits (Tokyu Plaza, Ginza Six). Théâtre Kabuki-za, Ginza Lion Beer Hall (classé, Art Déco, 1934), plus ancienne gare du Japon à Shimbashi. Astuce Ghibli : l'horloge dessinée par Miyazaki sur le Nippon Television Building s'anime avant 12h, 15h, 18h et 20h." },
      { name: "Jardin Hama-Rikyu", description: "Jardin traditionnel sur terres artificielles dans la baie, ancien domaine des shoguns Tokugawa. Possibilité de prendre un thé traditionnel au pavillon Nakajima-no-ochaya qui surplombe le lac Shiori." },
      { name: "Marunouchi et Nihonbashi", description: "Gare centrale classée (briques rouges, dômes restaurés en 2012), esplanade du Palais Impérial, pont Niju-Bashi, jardins de l'Est dessinés par l'impératrice Michiko. Quartier Nihonbashi : grands magasins historiques (Mitsukoshi), Coredo Muromachi, musée Artizon." },
      { name: "Akihabara", description: "Quartier de l'électronique et des mangas. Yodobashi Camera, Animate, Mandarake, salles d'arcade, UFO Catchers, maid-cafés, karaokés. Havres de sérénité : sanctuaire Kanda-Myojin, galerie « 2k540 Aki-Oka Artisan » sous les voies JR." },
      { name: "Parc et Musées d'Ueno", description: "Musée National de Tokyo (6 bâtiments, collections les plus riches de l'archipel), Musée National d'Art Occidental (Le Corbusier, UNESCO), Tokyo Metropolitan Art Museum, Musée des Sciences et d'Histoire Naturelle. Étang Shinobazu-no-ike avec pavillon Bentendo, temple Kanei-ji, temple Kiyomizu-Kannon, sanctuaire Toshogu. Ruelles marchandes d'Ameyoko." }
    ]
  },
  {
    dayNumber: 3,
    date: "Mer. 29 juil. 2026",
    title: "Autour de Tokyo : Kamakura et la Baie",
    ville: "Tokyo / Kamakura",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "Ryogoku View Hotel",
    activities: [
      { name: "Escapade historique et balnéaire (Kamakura)", description: "Ancienne capitale (1192-1333). Temple Engaku-ji (bouddhisme Zen), sanctuaire Hachiman-gu (dédié au dieu de la guerre, fondé en 1191). Sentiers de randonnée entre les temples. Grande plage de Yuigahama, Onari Street très tendance. À proximité : île d'Enoshima, accessible par la ligne Enoden." },
      { name: "Le Daibutsu et le Temple Hase-dera", description: "Daibutsu : statue de Bouddha en bronze de 13 m (1252), 2ᵉ plus grand du Japon après Nara, en plein air depuis 1495. Temple Hase-dera dédié à Kannon : statue de bois dorée du 6ᵉ siècle, nombreuses statues de Jizo, grotte mystique. Jardins d'hortensias splendides en mai-juin." },
      { name: "Île de Tennozu", description: "Île artificielle au sud de Shinagawa, ancien site industriel reconverti en quartier tendance. Street-art concentré, galeries (Terrada Art Complex, WHAT Museum). Boutique Pigment (peintures et pinceaux), bar T.Y. Harbor Brewery avec terrasse face au canal." },
      { name: "Îles d'Odaiba et Toyosu", description: "Îles artificielles accessibles via Rainbow Bridge. Observatoire de Fuji TV, Tokyo Joypolis, musée Miraikan (sciences), DiverCity avec robot Gundam grandeur nature animé. Toyosu : nouveau marché aux poissons, restaurants de sushis, Senkyaku Banrai (ambiance Edo), TeamLab Planets. Vue nocturne sur la baie inoubliable." },
      { name: "Tokyo Joypolis", description: "Plus grande salle d'arcade du Japon (SEGA, 1994) sur Odaiba. Simulateurs 3D, montagnes russes intérieures, maison hantée, attractions Sonic et Transformers." }
    ]
  },
  {
    dayNumber: 4,
    date: "Jeu. 30 juil. 2026",
    title: "Tokyo → Kanazawa, la ville des samouraïs",
    ville: "Kanazawa",
    repas: "Petit déjeuner",
    transport: "Shinkansen direct Tokyo → Kanazawa",
    hébergement: "Amanek Hotel (Twin + Triple) — quartier de Katamachi",
    activities: [
      { name: "Transfert de bagages", description: "Une pièce par personne transférée par Yamato Transport depuis l'hôtel de Tokyo directement à l'hôtel de Kyoto. Prévoir les affaires des 4 nuits d'intervalle dans les Alpes Japonaises dans un sac à part.", isIncluded: true },
      { name: "Trajet en Shinkansen", description: "Train à grande vitesse direct Tokyo → Kanazawa, porte d'entrée des Alpes Japonaises.", isIncluded: true },
      { name: "Promenade dans Kanazawa", description: "Quartier Nagamachi (maisons de samouraïs dont la maison Nomura-ke avec jardin et salon de thé). Quartiers de Higashi-chaya et Nishi-chaya : Maison Shima (objets du quotidien des geishas, musée unique). Hakuza-Hirakigura : atelier-boutique de la feuille d'or, entrepôt Kura entièrement doré. Marché Omicho pour fruits de mer et produits frais. Astuce : louer un vélo en libre-service (~1500 ¥/jour)." },
      { name: "Vie nocturne à Kanazawa", description: "Quartier de Katamachi entre Korinbo et la rivière Sai : nombreux bars et restaurants. Rue piétonne Tatemachi, la plus branchée. Le soir, les quartiers historiques de Higashi-Chaya et Nishi-Chaya s'illuminent de lanternes, ambiance d'antan." }
    ]
  },
  {
    dayNumber: 5,
    date: "Ven. 31 juil. 2026",
    title: "Arts et Artisanats de Kanazawa",
    ville: "Kanazawa",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "Amanek Hotel",
    activities: [
      { name: "Cérémonie du thé au jardin Gyokusen-en", description: "Initiation offerte par Marco Vasco, en anglais, entrées incluses. En compagnie d'un maître de thé anglophone : histoire, symbolique et codes de la cérémonie, puis participation dans les règles de l'art. Lieu : pavillon de thé historique au cœur du charmant jardin familial Gyokusen-en.", isIncluded: true },
      { name: "Le Jardin Kenroku-en", description: "L'un des trois plus beaux jardins du Japon. Construit par le clan Maeda sur près de deux siècles, ouvert au public en 1871. Symbole : lanterne Kotojitoro à deux pieds. Abrite la villa Seisonkaku, chef-d'œuvre d'architecture traditionnelle. Astuce : entrée par la porte Renchi-mon (historiquement réservée aux seigneurs) — moins fréquentée et mise en scène fidèle aux intentions des créateurs." },
      { name: "Le Parc du château", description: "Ancien siège du clan Maeda (1583-1881). Restauration selon techniques traditionnelles : tours de guet, murailles en éventail, portes monumentales, jardin Gyokusenin-maru (2015). À proximité : sanctuaire Oyama dédié au premier seigneur Maeda, porte originale mêlant éléments asiatiques et européens (vitraux)." },
      { name: "Kanazawa et l'Art Contemporain", description: "Musée du 21ᵉ Siècle : OVNI de verre dans un jardin ouvert, œuvres colorées en extérieur, « Piscine » de Leandro Erlich (réservation obligatoire). Musée DT Suzuki (architecte Taniguchi Yoshio, réaménagement du MoMA) : espace de contemplation avec grand bassin carré. Galerie KAMU : installations permanentes sur différents petits sites du centre-ville." }
    ]
  },
  {
    dayNumber: 6,
    date: "Sam. 1er août 2026",
    title: "Kanazawa → Shirakawa-go → Takayama",
    ville: "Takayama",
    repas: "Petit déjeuner + dîner gastronomique inclus",
    transport: "Bus Nohi Kanazawa → Shirakawa-go, puis bus Nohi Shirakawa-go → Takayama",
    hébergement: "Ryokan Hiranoya Honjin Bekkan — chambre japonaise quintuple vue rivière",
    activities: [
      { name: "Nohi Bus pour Shirakawa-go", description: "Transfert en bus Nohi jusqu'au village de fermes de Shirakawa-go, au cœur des Alpes Japonaises.", isIncluded: true },
      { name: "Les fermes de Shirakawa-Go", description: "Patrimoine Mondial UNESCO, plus grande concentration de maisons Gassho-Zukuri à toits de chaume (pente abrupte pour la neige, ventilation en été). Ferme Wada particulièrement bien préservée. Musée de la Maison de la Soie de Tajima (sériculture). Point d'observation de Shiroyama pour un panorama sur le village." },
      { name: "Nohi Bus pour Takayama", description: "Bus Nohi vers Takayama, ancienne ville marchande des Alpes Japonaises.", isIncluded: true },
      { name: "Takayama, le trésor des Alpes Japonaises", description: "« Petite Kyoto » — rues d'Ichinomachi, Ninomachi et Sannomachi bordées de maisons de marchands en bois sombre du 17ᵉ s. Maison Kusakabe, brasseries de saké (eau pure des montagnes). Takayama Jinya (ancien siège shogunal, ouvert au public). Temple Hida-Kokubunji (pagode à 3 étages, le plus ancien bâtiment de la ville, 16ᵉ s.), sanctuaire Hachiman-jingu. Spécialité : bœuf de Hida." },
      { name: "Nuit dans un ryokan traditionnel", description: "Auberge japonaise : portes coulissantes, fenêtres en papier de riz, futons sur tatami. Port du yukata pour se rendre aux bains de sources chaudes. Cuisine traditionnelle avec produits locaux frais et de saison.", isIncluded: true },
      { name: "Bain dans un Onsen", description: "Bains communs aux sources chaudes volcaniques, intérieurs ou extérieurs, en pierre ou en bois. Partie intégrante de la culture japonaise depuis des siècles.", isIncluded: true }
    ]
  },
  {
    dayNumber: 7,
    date: "Dim. 2 août 2026",
    title: "Les Charmes de Takayama",
    ville: "Takayama",
    repas: "Petit déjeuner + dîner hôtel",
    transport: "—",
    hébergement: "Ryokan Hiranoya Honjin Bekkan",
    activities: [
      { name: "Marchés locaux de Takayama", description: "Marchés matinaux typiques à Miyagawa ou Jinya-Mae : produits locaux frais et artisanat traditionnel." },
      { name: "Brasseries de Saké Traditionnelles", description: "Brasseries de deux à trois siècles dans le quartier historique de Kami-Sannomachi (eau pure des Alpes, riz de qualité). Visites et dégustations : Funasaka, Kawashiri, Hirata, Hirase. Magasin Marukin Shouten : large choix de sakés des 47 préfectures, dégustation accompagnée de tofu grillé sur le grill central." },
      { name: "Autour de Takayama", description: "Chemin « Higashiyama Yuhodo » (3,5 km) jusqu'au Parc de Shiroyama, ruines du château, panorama sur la ville et les montagnes. Promenades le long de la rivière Enako-gawa. Parc Hida no Sato (30 min à pied) : musée folklorique en plein air, ateliers d'artisans. À 15 min en train : village de Furukawa, ancienne ville de charpentiers, ruelle Shirakabe Dozogai avec canaux et carpes koï." }
    ]
  },
  {
    dayNumber: 8,
    date: "Lun. 3 août 2026",
    title: "Takayama → Kyoto, la capitale impériale",
    ville: "Kyoto",
    repas: "Petit déjeuner",
    transport: "Train Express grande ligne puis Shinkansen Kanazawa → Kyoto",
    hébergement: "Mitsui Garden Hotel Kyoto Shijo (Twin + Triple) — artère Shijo-dori",
    activities: [
      { name: "Du Marché Nishiki aux Galeries de Teramachi", description: "Marché Nishiki (« ventre de Kyoto ») : ruelles pittoresques, produits frais, ustensiles, spécialités culinaires. Galeries piétonnes couvertes Teramachi et Shinkyogoku : vêtements, décoration, souvenirs. Magasin de thé Houraido (institution). Temples surgissant au milieu des boutiques : Seigan-ji, sanctuaire Nishiki-Tenmangu." },
      { name: "Samurai and Ninja Museum", description: "Complexe culturel et ludique : collections d'armures et d'armes historiques. Avec un guide anglophone : essayer l'armure de samouraï, lancer de shuriken. Expérience interactive pour toute la famille." },
      { name: "Vie nocturne à Kyoto", description: "Croisement Shijo × Kawaramachi : centre commerçant animé. Ruelles de Pontocho : bars et restaurants intimistes à l'ambiance désuète. Gion à la tombée de la nuit : maisons de thé en bois éclairées de lanternes de papier, rencontres possibles avec des geishas. En été, terrasses de bois en surplomb de la rivière Kamo." }
    ]
  },
  {
    dayNumber: 9,
    date: "Mar. 4 août 2026",
    title: "Incontournables de Kyoto",
    ville: "Kyoto",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "Mitsui Garden Hotel Kyoto Shijo",
    activities: [
      { name: "Kyoto côté Est", description: "Pavillon d'Argent (Ginkaku-ji), Chemin de la Philosophie (canal et cerisiers), Nanzen-ji (aqueduc dans le jardin), sanctuaire Heian (influences chinoises), sanctuaire Yasaka (à Gion), ruelles pavées Sannenzaka et Ninenzaka, Kiyomizu-dera (terrasse de bois sur pilotis, vue sur la ville). Trésor méconnu : temple Eikan-do et ses couloirs de bois." },
      { name: "Chemin de la Philosophie et Pavillon d'Argent", description: "Ginkaku-ji : pavillon d'agrément du Shogun Ashikaga Yoshimasa (1482), converti en temple en 1490. Jardins de mousses, sable et roches. Chemin « Tetsugaku no Michi » : 2 km le long d'un canal creusé à l'ère Meiji reliant la ville au Lac Biwa via un tunnel de 20 km." },
      { name: "Sanctuaire Heian", description: "Immense Torii rouge à l'entrée. Construit pour le millénaire de la ville, style du premier Palais Impérial. Dédié aux empereurs Kammu et Komei (premier et dernier empereurs à Kyoto). Jardin caché célèbre pour ses cerisiers pleureurs." },
      { name: "Kyoto Handicraft Center", description: "Grand choix d'artisanat local : estampes, éventails, laques, kimonos, yukatas de belle qualité. Démonstrations d'artisans." },
      { name: "Gion", description: "Quartier historique bordé par la Kamo-gawa et les collines de Higashiyama. Sanctuaire Yasaka-jinja, temple Kennin-ji (plafond peint d'un dragon), ruelles de Shirakawa et Hanamikoji. Gion Kagai Art Museum (ouvert printemps 2024) sur le quotidien des geiko et maiko. Attention : certaines ruelles privées sont interdites aux photos ; meilleures chances de croiser une geisha entre 20h et 21h." },
      { name: "Temple Kiyomizu-dera", description: "Temple le plus imposant de Kyoto, source d'eau pure sacrée. Terrasse de bois sur pilotis de 13 m sans aucun clou, vue imprenable. Bâtiments : Okunoin (scène de Nô), pagode Koyasu, fontaine Otowa à 3 sources (longévité, réussite scolaire, amour — mais boire aux 3 est considéré comme cupide)." },
      { name: "Temple Sanjusangendo", description: "Bâtiment sobre en bois brut abritant 1001 statues bouddhistes de la divinité Kannon. 500 statues à taille humaine de part et d'autre d'une statue centrale colossale aux 1000 bras et 11 têtes. Bâtiment principal fondé en 1164, 120 m de long — le plus long du Japon." },
      { name: "Illuminations du Kodai-ji (soir)", description: "Billets coupe-file réservés. Temple fondé en 1606 en mémoire du shogun Toyotomi Hideyoshi par son épouse Nene. Illuminations nocturnes spectaculaires pendant les festivités de l'O-bon : projections sur les arbres, les couleurs de saison et l'architecture historique.", isIncluded: true }
    ]
  },
  {
    dayNumber: 10,
    date: "Mer. 5 août 2026",
    title: "Autour de Kyoto : Nara et Uji",
    ville: "Kyoto / Nara / Uji",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "Mitsui Garden Hotel Kyoto Shijo",
    activities: [
      { name: "Temples et Sanctuaires de Nara", description: "À 40 km de Kyoto, accessible en train direct. Ancienne capitale (710), plusieurs monuments UNESCO. Temple Kofuku-ji (pagode à 5 étages de 1426). Temple Todaiji (752) : plus grande structure en bois au monde (47×57×52 m), abrite le plus grand Bouddha en bronze du Japon (16 m). Nigatsu-do : balcon de bois offrant un panorama. Sanctuaire Kasuga-Taisha (768) : centaines de lanternes de pierre et de bronze, bâtiments rouge vermillon. Daims sacrés en liberté dans le parc." },
      { name: "Temple Byodo-in et Sanctuaire Ujigami-jinja", description: "Byodo-in : bâtiment Hoo-do (« Hall du Phénix ») de 1053, un des rares exemples d'architecture Heian. Musée attenant caché sous une colline avec les trésors d'art bouddhique. Pont Uji-bashi (647, reconstruit au IXᵉ s.). Sanctuaire Ujigami-jinja : plus ancien établissement shintoïste du Japon (313), bâtiments du Xᵉ s. Note : le Byodo-in figure sur les pièces de 10 yens." },
      { name: "Brasserie de Saké Gekkeikan", description: "Quartier traditionnel de Fushimi. Gekkeikan fournit officiellement la table de l'Empereur. Gekkeikan Okura Sake Museum : histoire, coulisses, fabrication artisanale. Dégustation de différents sakés dans la brasserie voisine. Berges de la rivière Horikawa pour une vue originale sur la brasserie historique." },
      { name: "Sanctuaire Fushimi Inari", description: "Dédié à la déesse Inari (récoltes et prospérité). Milliers de Torii rouges sur plusieurs kilomètres dans une forêt dense. Boucle complète jusqu'au sommet en ~3h, avec croisements permettant de redescendre. Ouvert 24h/24. Conseil : visite tôt le matin (avant 9h) ou en fin de journée (après 18h) pour éviter la foule." }
    ]
  },
  {
    dayNumber: 11,
    date: "Jeu. 6 août 2026",
    title: "Kyoto authentique et locale",
    ville: "Kyoto",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "Mitsui Garden Hotel Kyoto Shijo",
    activities: [
      { name: "Palais Impérial de Kyoto", description: "Au cœur de la ville dans un immense parc arboré. Résidence impériale jusqu'en 1868. Bâtiments officiels (cour d'honneur et de couronnement) et privés entourés de jardins japonais. Seul palais impérial ouvert librement au public (depuis juillet 2016)." },
      { name: "Musée du Manga", description: "Installé dans une ancienne école. Premier musée au monde intégralement dédié au manga, collection sur plusieurs étages classée par année. Le manga a des racines au 18ᵉ s. (Hokusai en précurseur). Possibilité de se faire tirer le portrait par un mangaka à la sortie." },
      { name: "Château Nijo", description: "Ancien palais du Shogun Tokugawa Ieyasu (1603). Espaces d'habitation et de réception préservés, mannequins de cire. Résidence impériale temporaire après 1867, donné à la ville de Kyoto. Parquet « chant du rossignol » : stratagème défensif contre les intrus." },
      { name: "Kyoto côté Nord-Ouest", description: "Ninna-ji : immense complexe de temples, ancienne propriété impériale. Ryoan-ji : jardin sec célèbre, 15 pierres savamment disposées pour n'être jamais toutes visibles. Pavillon d'Or (Kinkaku-ji) : recouvert à la feuille d'or, reflet sur le lac. À proximité : Myoshin-ji (plusieurs petits temples dans une même enceinte)." },
      { name: "Toei Studio Park", description: "Studios de tournage de films d'époque, parc entièrement rénové en 2026. Décors reconstitués du Japon féodal : geishas, shoguns, samouraïs. Cérémonie du thé, arrangement floral, lancer de shuriken, duels, maison hantée, essayage de kimono. Evangelion Base avec réplique grandeur nature de l'Eva-01." },
      { name: "Arashiyama", description: "Nord-Ouest de Kyoto entre les montagnes et la Katsura-gawa. Pont Togetsu-kyo (« pont qui traverse la lune »). Temple zen Tenryu-ji : jardin de Muso Soseki inchangé depuis 1339. Forêt de bambous de Sagano, temples Jojakko-ji, Gio-Ji, Nison-in. Parc d'Arashiyama-koen, bateliers traditionnels." },
      { name: "Cours de cuisine chez l'habitant", description: "Rencontre exclusive organisée ce jour. Au domicile d'un habitant anglophone : bases de la cuisine japonaise familiale (soupe miso, tempura, gyoza, viandes et poissons mijotés ou grillés) selon l'inspiration du jour et les produits de saison. Dégustation partagée avec votre hôte.", isIncluded: true }
    ]
  },
  {
    dayNumber: 12,
    date: "Ven. 7 août 2026",
    title: "Autour de Kyoto : Himeji et Osaka",
    ville: "Kyoto / Himeji / Osaka",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "Mitsui Garden Hotel Kyoto Shijo",
    activities: [
      { name: "Château d'Himeji", description: "Plus célèbre château du Japon, l'un des trois en bois encore existants (avec Matsumoto et Kumamoto). Édifié au XIVᵉ s., UNESCO 1993. Surnommé Hakuro-jo (« château du héron blanc »). Restauré en 2015. Vues depuis les étages sur les toits et la ville. Point de vue méconnu : Parc d'Otokoyama (escalier très raide)." },
      { name: "Jardin Koko-en", description: "Au pied du château. 9 espaces distincts représentant différents styles de jardins de l'époque Edo (1603-1868) : fleurs, arbres taillés, roches, pavillons de bois, étangs à carpes koï." },
      { name: "Parc de Minoh", description: "À moins de 30 min d'Osaka. Balade balisée de ~3 km de la gare de Minoh jusqu'à la cascade de Minoh (33 m). Passage par le temple Ryuanji. Marchands locaux le long du parcours. Particulièrement beau à l'automne." },
      { name: "Umeda et le Château d'Osaka", description: "Château d'Osaka : reconstruit en béton après la Seconde Guerre Mondiale, toits verts et bas-reliefs dorés. Musée d'Histoire d'Osaka : maquettes, objets d'époque, reconstitutions grandeur nature. Quartier Umeda : UmeKita, Kitte Osaka, Hep-5 et sa grande roue rouge. Umeda Sky Building : observatoire du Jardin Flottant à 173 m, panorama 360°." },
      { name: "Aquarium d'Osaka Kaiyukan", description: "Grand aquarium Kaiyukan : fonds marins de la Ceinture de Feu du Pacifique. Construit en spirale autour du bassin central. Pingouins, thons, requins, méduses, raies, dauphins ; star de l'aquarium : le requin baleine." },
      { name: "Quartiers de Namba et Dotombori", description: "Cœur de la mégapole. Nombreux bars et restaurants (cuisine d'Osaka, paradis des gourmands). Spécialité : Takoyakis (boulettes au poulpe). Arcades piétonnes de Shinsaibashi et Ebisubashi, centre commercial Namba Parks. Néons spectaculaires la nuit se reflétant dans le canal. Ruelle Hozen-ji Yokocho : petit temple aux statues couvertes de mousse." }
    ]
  },
  {
    dayNumber: 13,
    date: "Sam. 8 août 2026",
    title: "Kyoto → Péninsule d'Izu, la côte sauvage",
    ville: "Péninsule d'Izu (Ito)",
    repas: "Petit déjeuner + dîner hôtel",
    transport: "Shinkansen puis train Express régional Kyoto → Ito",
    hébergement: "Laforet Ito Onsen Yunoniwa (Quintuple lits + futons)",
    activities: [
      { name: "Transfert de bagages", description: "Une pièce par personne transférée par Yamato Transport vers l'hôtel de Tokyo. Prévoir le nécessaire pour les 2 nuits d'intervalle à Izu dans un sac à part.", isIncluded: true },
      { name: "Trajet Shinkansen + Express", description: "Shinkansen puis train Express régional pour Ito, porte d'entrée de la Péninsule d'Izu.", isIncluded: true },
      { name: "Ito et la côte de Jogasaki", description: "Ito : station thermale endormie, charme désuet. Bâtiments anciens le long de la rivière, Ryokan Taikokan (1928, ère Showa). Côte de Jogasaki-Kaigan (quelques stations au sud) : randonnée de ~10 km, falaises rocheuses, Phare de Kadowaki, Cap Nichirenzaki, impressionnant pont suspendu de Kadowakizaki. Intérieur des terres : Mont Omuro (580 m), ancien volcan en cône parfait, cratère accessible (à pied ou télésiège), vue sur la péninsule et le Mont Fuji par temps clair." },
      { name: "Bain dans un Onsen", description: "Bains communs aux sources chaudes volcaniques, détente après une journée de visite.", isIncluded: true }
    ]
  },
  {
    dayNumber: 14,
    date: "Dim. 9 août 2026",
    title: "Péninsule d'Izu : entre mer et nature",
    ville: "Péninsule d'Izu",
    repas: "Petit déjeuner + dîner hôtel",
    transport: "—",
    hébergement: "Laforet Ito Onsen Yunoniwa",
    activities: [
      { name: "Les cascades et la danseuse", description: "Montagnes de la région de Kawazu : 7 cascades successives de la rivière éponyme (2 à 30 m). Chemin de ~1 km longeant les cascades, statues de bronze figurant les scènes du roman « La Danseuse d'Izu » de Yasunari Kawabata (1926)." },
      { name: "Shimoda", description: "L'un des trois ports ouverts aux étrangers par la Convention de Kanagawa (1854, commodore Perry). 9 plages de sable fin : Shirahama la plus connue, Kujuppama et Nabetahama plus intimistes. Perry Road le long d'un canal. Temple Ryosen-Ji : signature du traité nippo-américain, document original, estampes. Museum of the Black Ships (MoBS)." }
    ]
  },
  {
    dayNumber: 15,
    date: "Lun. 10 août 2026",
    title: "Péninsule d'Izu → Retour à Tokyo !",
    ville: "Tokyo",
    repas: "Petit déjeuner",
    transport: "Train Express direct Ito → Tokyo",
    hébergement: "The Gate Hotel Asakusa Kaminarimon by Hulic (Twin + Triple)",
    activities: [
      { name: "Asakusa", description: "Temple Senso-ji, porte Kaminari-mon et sa lanterne rouge iconique. Centre Culturel d'Asakusa (Kengo Kuma) avec terrasse panoramique. Allée Nakamise-dori : souvenirs, artisanat, douceurs. Bâtiment principal avec plafond peint d'un dragon, pagode à 5 étages, sanctuaire Asakusa-jinja. Passerelle Sumida RiverWalk, parc Sumida-Koen, promenade Mizumachi jusqu'à la Tokyo SkyTree." },
      { name: "Rue Kappabashi", description: "Entre Ueno et Asakusa, rue de 800 m spécialisée en fourniture pour restaurants : vaisselle, poteries, couteaux, décorations, célèbres plats en plastique (mihon). Nom qui fait référence au Kappa (créature mythologique garçon-tortue), nombreuses représentations disséminées dans la rue." },
      { name: "Quartiers de Ya-Ne-Sen — Yanesen", description: "Yanaka, Nezu, Sendagi — « Yanesen ». Districts historiques du Nord épargnés par les bombardements. Yanaka Ginza : échoppes traditionnelles, rue principale. Cimetière de Yanaka (tombe de Tokugawa Yoshinobu, le dernier Shogun). En direction de Nezu : ancienne fabrique de saké Yoshida, Scai The Bathouse (bains publics reconvertis en galerie). Sanctuaire Nezu-jinja célèbre pour ses azalées." }
    ]
  },
  {
    dayNumber: 16,
    date: "Mar. 11 août 2026",
    title: "Quartiers méconnus de Tokyo",
    ville: "Tokyo",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "The Gate Hotel Asakusa Kaminarimon",
    activities: [
      { name: "Ryogoku et la SkyTree", description: "Kokugikan : arène officielle des tournois de Sumo, petit musée gratuit. Musée « Edo-Tokyo » entièrement rénové et rouvert au printemps 2026 : maquettes, reconstitutions grandeur nature. Sumida Hokusai Museum : vie et œuvre de Katsushika Hokusai (1760-1849). Musée du Sabre Japonais. Tokyo SkyTree (634 m, Tadao Ando) : observatoires à 350 et 450 m. Réservation recommandée pour la SkyTree." },
      { name: "Shibamata, le Tokyo oublié", description: "Au-delà d'Asakusa et de la SkyTree, en bordure de la rivière Edo-gawa. Rue commerçante typique, ambiance d'antan, maisons et boutiques familiales. Temple Taishakuten (1629) avec jardin charmant, bas-reliefs autour du temple principal — rareté architecturale. Maison Yamamoto-tei (début 20ᵉ s., ère Showa) : mélange japonais-occidental (parquets, cheminée, vitraux colorés)." },
      { name: "Omiya, village des Bonsaïs", description: "À 1h au nord-ouest de Tokyo. Sanctuaire Musashi Ichinomiya Hikawa-jinja, le plus important de la région, dédié à Susanoo. Allée Hikawa Ryokuchi bordée d'arbres centenaires. Demi-douzaine de pépinières de bonsaïs ouvertes (célèbres artisans installés depuis 1925). Musée du Bonsaï. Fermé le jeudi." },
      { name: "Mont Takao", description: "Moins d'une heure du centre. Temple Yokuo-in : lieu de pèlerinage depuis plus de 1200 ans. Tengu, figure mythique au nez allongé, symbole du site. Ascètes sous les chutes de Biwadaki et Hebi-daki (avril-octobre). Vue depuis le sommet sur Tokyo et le Pacifique d'un côté, Mont Fuji de l'autre." },
      { name: "Meguro et Daikanyama", description: "Quartiers branchés : boutiques de créateurs, galeries d'art, restaurants, cafés. Atmosphère de village dans la ville. Musée Sato Sakura (cerisiers japonais). Canal de Meguro bordé de centaines de cerisiers qui fleurissent au printemps." }
    ]
  },
  {
    dayNumber: 17,
    date: "Mer. 12 août 2026",
    title: "Tokyo, capitale contemporaine",
    ville: "Tokyo",
    repas: "Petit déjeuner",
    transport: "—",
    hébergement: "The Gate Hotel Asakusa Kaminarimon",
    activities: [
      { name: "Cours d'initiation au Manga", description: "Initiation réservée dans une école de Tokyo, 2h avec un professeur anglophone. Outils, papiers, pinceaux et stylos fournis. Familiarisation avec les techniques spécifiques, reproduction d'un modèle ou création d'une œuvre unique.", isIncluded: true },
      { name: "Ikebukuro", description: "Moins fréquenté par les touristes qu'Akihabara. Boutiques d'électronique, mangas, jeux vidéo, produits dérivés. Plus grande boutique Animate du pays, Tokyo Anime Station (expositions gratuites). Sunshine City : centre commercial, musée d'art oriental, planétarium, Bandai-Namco Cross Store, Mugiwara Store (One Piece), plus grand Pokemon Center du Japon, aquarium avec terrasse. Sunshine 60 : « Sky Circus » au 60ᵉ étage (251 m), expériences interactives et VR, vues 360°." },
      { name: "Warner Bros. Studio Tour Harry Potter", description: "Immersion dans la réalisation des 8 films Harry Potter : décors, accessoires, costumes, effets spéciaux originaux. Grande salle de Poudlard, voie 9-3/4 et le train, Chemin de Traverse, Forêt Interdite. Visite interactive." },
      { name: "Shinjuku", description: "Ouest de la gare : immeuble de la Mairie (Kenzo Tange, inspiré de Notre-Dame), observatoire gratuit au 45ᵉ étage (vue Mont Fuji à la baie), spectacle son et lumière en soirée. Est de la gare : Kabuki-cho, bars et restaurants, ruelles piétonnes. Parc Shinjuku-gyoen : grand parc avec arboretum, roseraie, jardin japonais, serre contemporaine. Astuce : Shin-Okubo à 10 min au nord — plus grand Korea Town du Japon." },
      { name: "Harajuku et le Parc Yoyogi", description: "Trois facettes : Parc Yoyogi et sanctuaire Meiji-jingu (emperor Meiji et impératrice Shoken, 1867-1912), havre de paix. Ruelle Takeshita-dori : jeunesse tokyoïte, crêpes japonaises garnies. Avenue Omotesando (« Champs-Élysées japonais ») : flagships des grandes marques de luxe, Tokyu Plaza Harajuku et ses jardins suspendus. Cat Street et Miyashita Park relient Harajuku à Shibuya (~20 min)." },
      { name: "Shibuya", description: "Plus grand carrefour au monde, à la sortie de la gare. Centaines de boutiques de mode, « Shibuya 109 » (bâtiment cylindrique iconique), Magnet (Hello Kitty, One Piece, Rooftop). Shibuya Parco 6ᵉ étage « Cyberspace » : Nintendo, Pokemon, Capcom, Sega, Jump. Shibuya Scramble Square (2019) : Shibuya Sky, observatoire à 229 m avec toit-terrasse (réservation conseillée)." }
    ]
  },
  {
    dayNumber: 18,
    date: "Jeu. 13 août 2026",
    title: "Départ de Tokyo",
    ville: "Tokyo",
    repas: "—",
    transport: "Transfert matinal en minivan privatif, Hôtel → Aéroport Tokyo-Haneda",
    hébergement: "—",
    activities: [
      { name: "Transfert retour", description: "Transfert privatif ce matin de votre hôtel à l'aéroport de Tokyo-Haneda pour votre vol retour.", isIncluded: true }
    ]
  }
];
