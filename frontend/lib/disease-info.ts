export type DiseaseInfo = {
  crop: string;
  disease_name: string;
  is_healthy: boolean;
  description: string;
  cause: string;
  symptoms: string[];
  prevention: string[];
  treatment: string[];
};

export const DISEASE_DATA: Record<string, DiseaseInfo> = {
  "Apple___Apple_scab": {
    crop: "Apple",
    disease_name: "Apple Scab",
    is_healthy: false,
    description: "A serious fungal disease that affects apple leaves and fruit, causing dark, scabby lesions and premature defoliation.",
    cause: "Caused by the fungus Venturia inaequalis. It overwinters in dead leaves on the ground and releases spores during cool, wet spring weather.",
    symptoms: [
      "Olive-green to brown velvety spots on leaves",
      "Dark, scabby lesions on fruit surface",
      "Distorted leaf growth and premature leaf drop"
    ],
    prevention: [
      "Rake and destroy fallen leaves in autumn to eliminate overwintering spores",
      "Prune orchard canopy to improve airflow and sunlight penetration",
      "Plant scab-resistant apple cultivars (e.g., Liberty, Enterprise)"
    ],
    treatment: [
      "Apply protective fungicides (Captan, Mancozeb) starting at green tip stage",
      "Apply bio-fungicides like Bacillus subtilis or copper sprays for organic management"
    ]
  },
  "Apple___Black_rot": {
    crop: "Apple",
    disease_name: "Black Rot (Frogeye Leaf Spot)",
    is_healthy: false,
    description: "A fungal pathogen attacking apple leaves, fruit, and bark, leading to cankers and rotten mummified fruit.",
    cause: "Caused by the fungus Botryosphaeria obtusa. The fungus enters through wounds, frost injuries, or fire blight cankers and thrives in warm, humid weather.",
    symptoms: [
      "Purple spots on leaves that enlarge into 'frogeye' circular lesions with tan centers",
      "Firm, rotting fruit with concentric black rings",
      "Bark cankers on branches and trunk"
    ],
    prevention: [
      "Prune out dead wood, twigs, and cankers during winter dormancy",
      "Remove and burn mummified fruits hanging on trees or lying on the ground",
      "Avoid wounding tree bark during maintenance"
    ],
    treatment: [
      "Apply systemic fungicides (e.g., Thiophanate-methyl, Captan) during petal fall",
      "Use copper-based sprays during delayed dormancy"
    ]
  },
  "Apple___Cedar_apple_rust": {
    crop: "Apple",
    disease_name: "Cedar Apple Rust",
    is_healthy: false,
    description: "A fungal disease requiring two hosts (apples and Eastern red cedars/junipers) to complete its complex lifecycle.",
    cause: "Caused by the fungus Gymnosporangium juniperi-virginianae. Spores travel on the wind from gelatinous cedar galls during warm, wet spring conditions.",
    symptoms: [
      "Bright yellow-orange or reddish circular spots on leaf upper surfaces",
      "Small tube-like fruiting bodies (aecia) on the underside of leaves",
      "Raised, distorted lesions on fruits"
    ],
    prevention: [
      "Eradicate nearby red cedars and junipers within a 1-mile radius if possible",
      "Plant resistant varieties such as Honeycrisp, Liberty, or William's Pride",
      "Remove visible galls from nearby juniper bushes in late winter"
    ],
    treatment: [
      "Apply protective fungicides (Myclobutanil, Mancozeb) at pink bud through petal fall stage",
      "Spray sulfur-based protectants as an organic measure before rain events"
    ]
  },
  "Apple___healthy": {
    crop: "Apple",
    disease_name: "Healthy Apple",
    is_healthy: true,
    description: "The apple foliage displays no visible signs of pathogen infection, pest stress, or nutrient deficiency.",
    cause: "Optimal orchard care, balanced nutrition, and absence of active fungal or bacterial spores.",
    symptoms: [
      "Vibrant green, uniform leaf coloration",
      "Intact leaf margins with smooth texture",
      "No necrotic spotting or mildew"
    ],
    prevention: [
      "Maintain routine monitoring and balanced N-P-K fertilization",
      "Ensure proper canopy airflow and soil drainage",
      "Implement dormant oil sprays in winter for pest prophylaxis"
    ],
    treatment: [
      "No treatment required. Continue standard cultural practices."
    ]
  },
  "Blueberry___healthy": {
    crop: "Blueberry",
    disease_name: "Healthy Blueberry",
    is_healthy: true,
    description: "The blueberry plant is robust with healthy vegetative growth and no detectable foliar diseases.",
    cause: "Well-maintained acidic soil (pH 4.5–5.5), adequate organic mulch, and proper irrigation.",
    symptoms: [
      "Rich green, glossy leaves",
      "Sturdy cane growth",
      "Absence of chlorosis, spotting, or dieback"
    ],
    prevention: [
      "Maintain soil pH between 4.5 and 5.2 using elemental sulfur",
      "Apply pine bark mulch to preserve root moisture and suppress weeds",
      "Use drip irrigation to prevent foliar wetness"
    ],
    treatment: [
      "No treatment required. Maintain regular watering schedule."
    ]
  },
  "Cherry_(including_sour)___Powdery_mildew": {
    crop: "Cherry",
    disease_name: "Powdery Mildew",
    is_healthy: false,
    description: "A fungal condition that impairs young cherry foliage, shoots, and fruit, reducing photosynthesis and fruit marketability.",
    cause: "Caused by Podosphaera clandestina. It overwinters in tree buds and bark crevices, spreading during warm, dry days with high relative humidity.",
    symptoms: [
      "White, talcum powder-like patches on young leaves and terminal shoots",
      "Upward leaf curling, distortion, and stunted shoot growth",
      "Fruit blemishes or misshapen cherries"
    ],
    prevention: [
      "Prune crowded canopies to allow ample sunlight and wind flow",
      "Avoid excessive nitrogen fertilizers that promote succulent young shoots",
      "Monitor orchard margins early in the spring season"
    ],
    treatment: [
      "Apply sulfur-based fungicides or potassium bicarbonate at petal fall",
      "Use systemic triazoles (e.g., Myclobutanil, Fenbuconazole) when mildew pressure is elevated"
    ]
  },
  "Cherry_(including_sour)___healthy": {
    crop: "Cherry",
    disease_name: "Healthy Cherry",
    is_healthy: true,
    description: "The cherry tree shows vigorous foliage, strong terminal shoots, and no pathogen symptoms.",
    cause: "Effective sanitation, optimal moisture balance, and preventive orchard management.",
    symptoms: [
      "Uniform green leaves free of curling or lesions",
      "Smooth bark and healthy leaf stems",
      "Even canopy development"
    ],
    prevention: [
      "Maintain weed-free zones around trunks",
      "Apply protective copper sprays at leaf fall during autumn",
      "Ensure balanced soil nutrition"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    crop: "Corn (Maize)",
    disease_name: "Gray Leaf Spot (Cercospora)",
    is_healthy: false,
    description: "A devastating fungal foliar disease of maize that rapidly reduces photosynthetic area and causes premature crop death.",
    cause: "Caused by Cercospora zeae-maydis. It survives in crop residue and thrives in warm (25–30°C), prolonged overcast, and humid conditions.",
    symptoms: [
      "Rectangular, narrow lesions delimited by leaf veins",
      "Lesions start tan and turn gray as sporulation occurs",
      "Blighting of entire leaves leading to stalk lodging"
    ],
    prevention: [
      "Rotate crops with non-grass species like soybeans or legumes for 1-2 years",
      "Practice deep tillage to bury infected maize stubble",
      "Plant certified gray leaf spot-tolerant corn hybrids"
    ],
    treatment: [
      "Apply foliar fungicides (Azoxystrobin + Difenoconazole or Pyraclostrobin) at tassel emergence (VT to R1 stage) if threshold lesions appear"
    ]
  },
  "Corn_(maize)___Common_rust_": {
    crop: "Corn (Maize)",
    disease_name: "Common Rust",
    is_healthy: false,
    description: "A common airborne fungal infection forming spore pustules across both upper and lower leaf surfaces.",
    cause: "Caused by Puccinia sorghi. Spores are blown long distances by southern winds into temperate zones during cool, moist weather (16–25°C).",
    symptoms: [
      "Oval to elongate cinnamon-brown pustules scattered across both leaf surfaces",
      "Pustules rupture epidermal tissue, releasing powdery reddish-brown spores",
      "Leaves turn chlorotic and desiccate under heavy infestation"
    ],
    prevention: [
      "Sow resistant corn hybrids with specific Rp gene resistance",
      "Plant early in the season to evade peak windborne spore migration",
      "Avoid overhead sprinkler irrigation during late afternoons"
    ],
    treatment: [
      "Fungicidal application (e.g., Tebuconazole, Propiconazole) is warranted if rust pustules appear before silking on susceptible inbred lines"
    ]
  },
  "Corn_(maize)___Northern_Leaf_Blight": {
    crop: "Corn (Maize)",
    disease_name: "Northern Corn Leaf Blight (NCLB)",
    is_healthy: false,
    description: "A foliar fungal disease that causes large cigar-shaped necrotic lesions, resulting in significant grain yield reduction.",
    cause: "Caused by Exserohilum turcicum. It overwinters in corn debris, spreading in moderate temperatures (18–27°C) accompanied by heavy dew and rains.",
    symptoms: [
      "Long, elliptical, cigar-shaped grayish-green to tan lesions (2–15 cm in length)",
      "Dark fungal sporulation visible within older lesions in damp mornings",
      "Coalescing lesions causing complete foliar desiccation"
    ],
    prevention: [
      "Incorporate resistant hybrid seed varieties (carrying Ht genes)",
      "Rotate fields out of corn for at least one full growing season",
      "Chop and incorporate previous crop residues into the soil post-harvest"
    ],
    treatment: [
      "Apply strobilurin or triazole fungicides (e.g., Pyraclostrobin, Mancozeb) when lesions appear on the ear leaf before pollination"
    ]
  },
  "Corn_(maize)___healthy": {
    crop: "Corn (Maize)",
    disease_name: "Healthy Corn",
    is_healthy: true,
    description: "The maize plant exhibits optimal vegetative vigor with strong leaf development and clean foliage.",
    cause: "Adequate nitrogen management, healthy root systems, and favorable climatic conditions.",
    symptoms: [
      "Dark green, arching leaves with clear midribs",
      "Sturdy stalks with intact internodes",
      "No visible leaf spots, rusts, or pest feeding signs"
    ],
    prevention: [
      "Maintain balanced nitrogen, phosphorus, and potassium fertilization",
      "Practice regular scouting during early vegetative stages",
      "Ensure good field drainage"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Grape___Black_rot": {
    crop: "Grape",
    disease_name: "Grape Black Rot",
    is_healthy: false,
    description: "A destructive fungal disease attacking shoots, leaves, and berries, turning succulent grape clusters into shriveled, hard black mummies.",
    cause: "Caused by Guignardia bidwellii. Spores disperse via splashing rain from overwintered canes and mummified berries during warm, humid spring weather.",
    symptoms: [
      "Circular reddish-brown leaf spots with black fruiting margins",
      "Soft, rotting grapes that rapidly turn black, wrinkle, and mummify",
      "Black elongated cankers on new shoots and tendrils"
    ],
    prevention: [
      "Prune and destroy all mummified grape clusters and infected canes during dormancy",
      "Trellis and canopy train vines to maximize aeration and reduce canopy drying time",
      "Maintain a clean, weed-free vineyard floor"
    ],
    treatment: [
      "Apply protective fungicides (Mancozeb, Ziram, or Captan) from bud break until 4 weeks after bloom",
      "Apply systemic sterol inhibitors (e.g., Myclobutanil) if infection occurs"
    ]
  },
  "Grape___Esca_(Black_Measles)": {
    crop: "Grape",
    disease_name: "Esca (Black Measles)",
    is_healthy: false,
    description: "A chronic grapevine wood complex disease caused by vascular fungi, leading to 'tiger-stripe' leaves and spotted, unmarketable berries.",
    cause: "Caused by a complex of fungal pathogens including Phaeomoniella chlamydospora and Fomitiporia mediterranea infecting through pruning wounds.",
    symptoms: [
      "Interveinal chlorosis and necrosis creating distinct 'tiger-stripe' foliar patterns",
      "Small, dark, sunken spots ('measles') on berry skins",
      "Internal vascular wood showing dark brown to black streaking"
    ],
    prevention: [
      "Protect pruning wounds immediately with sealants, paints, or Trichoderma paste",
      "Prune vines late in the dormant season when wound healing is fastest",
      "Sterilize pruning shears with 70% alcohol between vine cuts"
    ],
    treatment: [
      "No curative chemical exists once deeply established; prune back infected cordons to healthy wood or remove collapsing vines"
    ]
  },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    crop: "Grape",
    disease_name: "Leaf Blight (Isariopsis Leaf Spot)",
    is_healthy: false,
    description: "A foliar fungal disease causing late-season premature defoliation, weakening the vine's winter hardiness.",
    cause: "Caused by Pseudocercospora cladosporioides (formerly Isariopsis clavispora). Promoted by warm, humid post-monsoon or late summer periods.",
    symptoms: [
      "Irregular, dark brown to black spots on the upper leaf surface",
      "A faint gray-olive velvety fungal growth on the underside of leaf lesions",
      "Yellow halo around mature spots followed by leaf drop"
    ],
    prevention: [
      "Rake and compost or burn fallen leaves after harvest",
      "Improve canopy sunlight exposure through judicious shoot thinning",
      "Avoid prolonged overhead sprinkler watering"
    ],
    treatment: [
      "Spray copper oxychloride or Dithiocarbamate-based fungicides (e.g., Mancozeb)",
      "Apply Azoxystrobin or Carbendazim during severe late-season outbreaks"
    ]
  },
  "Grape___healthy": {
    crop: "Grape",
    disease_name: "Healthy Grape",
    is_healthy: true,
    description: "Grapevine foliage is structurally sound, clean, and carrying out active photosynthesis.",
    cause: "Clean canopy management, targeted seasonal spray program, and optimal vine nutrition.",
    symptoms: [
      "Uniform green, fan-shaped leaves",
      "Flexible tendrils and green canes",
      "Clean clusters without blemishes"
    ],
    prevention: [
      "Continue proactive canopy shoot positioning and weed management",
      "Maintain regular drip irrigation and balanced micronutrient sprays",
      "Monitor periodically for early signs of mildew"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Orange___Haunglongbing_(Citrus_greening)": {
    crop: "Orange",
    disease_name: "Huanglongbing (Citrus Greening)",
    is_healthy: false,
    description: "One of the most lethal citrus diseases worldwide, causing asymmetrical foliar yellowing, twig dieback, and bitter, misshapen fruit.",
    cause: "Caused by the phloem-limited bacterium Candidatus Liberibacter asiaticus, vectored primarily by the Asian Citrus Psyllid.",
    symptoms: [
      "Asymmetrical, blotchy yellow mottle on leaves crossing vein boundaries",
      "Thickened, leathery leaves with corky veins",
      "Small, lopsided fruit that remains green at the blossom end and tastes sour"
    ],
    prevention: [
      "Plant only certified disease-free rootstocks and scions from quarantine nurseries",
      "Strictly control Asian Citrus Psyllid populations using targeted systemic insecticides",
      "Scout and immediately rogue (uproot and burn) infected trees to protect the grove"
    ],
    treatment: [
      "No permanent cure for infected trees; manage psyllids with Imidacloprid or Thiamethoxam and maintain foliar nutritional sprays to extend tree life"
    ]
  },
  "Peach___Bacterial_spot": {
    crop: "Peach",
    disease_name: "Bacterial Spot",
    is_healthy: false,
    description: "A bacterial disorder attacking stone fruits, causing shot-hole leaves, twig cankers, and deeply cracked fruit.",
    cause: "Caused by the bacterium Xanthomonas arboricola pv. pruni. It overwinters in twig cankers and spreads through wind-driven rains and warm temperatures.",
    symptoms: [
      "Small, angular, water-soaked spots that turn purple-brown and drop out ('shot-hole')",
      "Deep pitted cracks and gumming on mature fruit skins",
      "Severe premature defoliation leading to sunburned fruit"
    ],
    prevention: [
      "Plant resistant peach cultivars (e.g., Belle of Georgia, Clayton)",
      "Avoid planting in excessively light, sandy soils with low water-holding capacity",
      "Erect windbreaks to minimize windblown sand abrasions that open entry wounds"
    ],
    treatment: [
      "Apply preventative copper bactericides during late dormant and bud-swell stages",
      "Apply Oxytetracycline sprays during bloom and petal fall where approved"
    ]
  },
  "Peach___healthy": {
    crop: "Peach",
    disease_name: "Healthy Peach",
    is_healthy: true,
    description: "The peach tree displays lush, elongated foliage without leaf holes, curling, or gummy exudates.",
    cause: "Proper winter dormant spraying, good air circulation, and balanced soil fertility.",
    symptoms: [
      "Smooth, lanceolate green leaves without shot-holes",
      "Healthy shoots without cankers or gumming",
      "Normal fruit set development"
    ],
    prevention: [
      "Maintain dormant copper sprays prior to bud break",
      "Mulch around base to conserve moisture",
      "Perform annual spring pruning"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Pepper,_bell___Bacterial_spot": {
    crop: "Bell Pepper",
    disease_name: "Bacterial Spot",
    is_healthy: false,
    description: "A severe bacterial disease causing widespread defoliation, blossom drop, and blistered fruit in pepper crops.",
    cause: "Caused by Xanthomonas euvesicatoria. Transmitted through contaminated seeds or splashing water during warm (24–30°C), wet conditions.",
    symptoms: [
      "Small, water-soaked, circular to angular dark green-brown spots on leaves",
      "Lesions develop a raised, scab-like appearance on fruit",
      "Leaves yellow around lesions and drop prematurely"
    ],
    prevention: [
      "Use certified disease-free, hot-water-treated seeds",
      "Rotate solanaceous crops out of the field for 2–3 years",
      "Employ drip irrigation instead of overhead sprinklers to keep foliage dry"
    ],
    treatment: [
      "Apply a preventative tank mix of copper hydroxide and Mancozeb every 7–10 days during rainy weather",
      "Utilize biological controls such as Bacillus amyloliquefaciens"
    ]
  },
  "Pepper,_bell___healthy": {
    crop: "Bell Pepper",
    disease_name: "Healthy Bell Pepper",
    is_healthy: true,
    description: "The pepper foliage is vibrant, displaying strong vegetative growth and prolific flower/fruit set.",
    cause: "Optimal soil nutrients, consistent moisture management, and absence of bacterial pathogens.",
    symptoms: [
      "Deep green, shiny, unblemished leaves",
      "Strong stem structure and healthy nodes",
      "Uniform fruit setting"
    ],
    prevention: [
      "Ensure balanced potassium and calcium fertilization to prevent blossom end rot",
      "Maintain weed-free beds using organic mulches",
      "Monitor periodically for aphids and thrips"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Potato___Early_blight": {
    crop: "Potato",
    disease_name: "Early Blight",
    is_healthy: false,
    description: "A widespread fungal problem primarily targeting older foliage, causing characteristic target-board lesions.",
    cause: "Caused by Alternaria solani. It overwinters in plant debris and soil, spreading in fluctuating dry and wet weather on stressed potato plants.",
    symptoms: [
      "Dark brown to black spots with concentric rings resembling a target board",
      "Lesions surrounded by a chlorotic yellow halo on lower leaves",
      "Premature drying and death of lower foliage"
    ],
    prevention: [
      "Practice a 3–4 year crop rotation away from solanaceous plants (tomatoes, eggplants, potatoes)",
      "Maintain adequate plant nitrogen and avoid plant stress through steady irrigation",
      "Destroy or till under infected vine debris after harvest"
    ],
    treatment: [
      "Apply protective fungicides (Chlorothalonil, Mancozeb) at first sign of lower leaf spotting",
      "Rotate with systemic fungicides (e.g., Azoxystrobin, Difenoconazole) to prevent resistance"
    ]
  },
  "Potato___Late_blight": {
    crop: "Potato",
    disease_name: "Late Blight",
    is_healthy: false,
    description: "The catastrophic disease responsible for the Irish potato famine; it rapidly destroys foliage and rots tubers.",
    cause: "Caused by the oomycete pathogen Phytophthora infestans. Spreads rapidly under cool (10–20°C), continuously wet, foggy conditions.",
    symptoms: [
      "Large, irregular, water-soaked dark lesions on leaves and stems",
      "White fuzzy mildew visible on the undersides of leaves during humid mornings",
      "Foul odor and rapid turning of the entire canopy to brown, collapsed mush"
    ],
    prevention: [
      "Plant only certified disease-free seed tubers",
      "Eliminate cull piles and volunteer potato plants which harbor inoculum",
      "Avoid overhead irrigation during cool, humid weather"
    ],
    treatment: [
      "Apply systemic oomycete-targeted fungicides (Metalaxyl, Cymoxanil, Dimethomorph) immediately on alert",
      "Use copper fungicides preventatively in organic potato fields"
    ]
  },
  "Potato___healthy": {
    crop: "Potato",
    disease_name: "Healthy Potato",
    is_healthy: true,
    description: "Potato foliage is vigorously green, supporting tuber enlargement beneath the soil.",
    cause: "Optimal hilling, adequate fertility, and successful fungal/pest prophylaxis.",
    symptoms: [
      "Dense, deep green leaves with crisp margins",
      "Strong upright stems without blackening or lesioning",
      "Absence of wilt or necrosis"
    ],
    prevention: [
      "Keep potato hills properly mounded to shield tubers from sun and spores",
      "Maintain consistent soil moisture levels",
      "Perform weekly field checks"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Raspberry___healthy": {
    crop: "Raspberry",
    disease_name: "Healthy Raspberry",
    is_healthy: true,
    description: "The caneberry bush displays healthy primocane and floricane growth without rust, mold, or viral mottling.",
    cause: "Good cane thinning, well-drained loamy soil, and clean nursery planting stocks.",
    symptoms: [
      "Vibrant serrated green leaflets",
      "Smooth canes free of spur blights or galls",
      "Strong floral/fruiting clusters"
    ],
    prevention: [
      "Prune spent floricanes immediately after the summer harvest",
      "Maintain a 10–12 inch spacing between canes for optimal airflow",
      "Use drip line irrigation to protect canes from moisture"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Soybean___healthy": {
    crop: "Soybean",
    disease_name: "Healthy Soybean",
    is_healthy: true,
    description: "The legume canopy is fully established, displaying dark green trifoliate foliage and active nodulation.",
    cause: "Healthy soil biology (Bradyrhizobium), proper crop rotation, and optimal seeding density.",
    symptoms: [
      "Uniform trifoliate leaves with clean surfaces",
      "No rust pustules, frogeye spots, or viral crinkling",
      "Healthy pod development along stems"
    ],
    prevention: [
      "Inoculate seeds with Rhizobium before planting",
      "Rotate fields with corn or small grains",
      "Keep field margins free of broadleaf weeds"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Squash___Powdery_mildew": {
    crop: "Squash",
    disease_name: "Powdery Mildew",
    is_healthy: false,
    description: "A prevalent fungal coating that attacks cucurbit foliage, leading to premature leaf death and sun-scalded squash.",
    cause: "Caused by Podosphaera xanthii and Erysiphe cichoracearum. It spreads rapidly in dry climates with high humidity and crowded plantings.",
    symptoms: [
      "Talcum powder-like white powdery spots on both leaf surfaces and stems",
      "Leaves yellow, become brittle, turn brown, and die",
      "Exposed squash fruits suffer from sunscald due to loss of leaf cover"
    ],
    prevention: [
      "Plant resistant squash cultivars (e.g., PMR varieties)",
      "Ensure wide plant spacing (3–4 feet apart) to facilitate air movement",
      "Plant in full sun locations"
    ],
    treatment: [
      "Spray horticultural oils, neem oil, or potassium bicarbonate at first sign of white spots",
      "Apply fungicides such as Myclobutanil or Strobilurins for commercial plots"
    ]
  },
  "Strawberry___Leaf_scorch": {
    crop: "Strawberry",
    disease_name: "Leaf Scorch",
    is_healthy: false,
    description: "A fungal foliar disease that discolors leaves, weakens crown vigor, and lowers berry yield in strawberry beds.",
    cause: "Caused by the fungus Diplocarpon earlianum. Spores are splashed by rain onto young leaves during warm, wet spring and autumn periods.",
    symptoms: [
      "Numerous small, irregular, purple to dark brown blotches on upper leaf surfaces",
      "Lesions coalesce, causing entire leaf margins to look burnt or scorched",
      "Leaf tissue curls upward and withers to brown"
    ],
    prevention: [
      "Plant certified disease-free runners in well-drained, raised beds",
      "Renovate and mow strawberry beds immediately after harvest, removing old foliage",
      "Avoid overhead sprinkler irrigation"
    ],
    treatment: [
      "Apply protective fungicides (Captan, Thiram, or Copper hydroxide) during early spring leaf emergence",
      "Apply systemic fungicides (e.g., Azoxystrobin) in high-infection nurseries"
    ]
  },
  "Strawberry___healthy": {
    crop: "Strawberry",
    disease_name: "Healthy Strawberry",
    is_healthy: true,
    description: "The strawberry plants are robust, displaying clean trifoliate leaves and active runner/crown development.",
    cause: "Clean straw mulching, good drainage, and pathogen-free planting stock.",
    symptoms: [
      "Glossy, emerald-green leaves with sharply serrated margins",
      "Strong crown development without rot or discoloration",
      "Healthy root system and abundant white blossoms"
    ],
    prevention: [
      "Mulch with clean straw or plastic to keep berries and foliage off bare soil",
      "Maintain adequate spacing between rows for ventilation",
      "Renew beds every 3–4 years"
    ],
    treatment: [
      "No treatment required."
    ]
  },
  "Tomato___Bacterial_spot": {
    crop: "Tomato",
    disease_name: "Bacterial Spot",
    is_healthy: false,
    description: "A destructive bacterial pathogen attacking all aboveground tomato tissues, leading to severe defoliation and unmarketable fruit.",
    cause: "Caused by Xanthomonas spp. It thrives in high temperatures (24–30°C) and heavy rainfall or overhead watering.",
    symptoms: [
      "Small (less than 3 mm), dark, greasy, water-soaked spots on leaves",
      "Lesions develop a halo, center dries, and tears out",
      "Raised, scabby, rough dark spots on tomato fruits"
    ],
    prevention: [
      "Use hot water-treated seed or certified disease-free transplants",
      "Avoid handling wet tomato plants to prevent mechanical transmission",
      "Stake and prune plants to improve airflow and rapid drying"
    ],
    treatment: [
      "Spray a tank-mix combination of copper bactericides and Mancozeb regularly",
      "Use biological bactericides containing Bacillus subtilis or Actigard (acibenzolar-S-methyl)"
    ]
  },
  "Tomato___Early_blight": {
    crop: "Tomato",
    disease_name: "Early Blight",
    is_healthy: false,
    description: "A very common fungal disease that attacks leaves, stems, and fruit, starting from the oldest bottom leaves.",
    cause: "Caused by Alternaria solani. It overwinters in crop residues and spreads in warm, wet, humid weather.",
    symptoms: [
      "Brown-black spots on lower leaves with distinct concentric rings (target pattern)",
      "Surrounding tissue yellows, followed by complete leaf drop",
      "Dark, leathery, sunken lesions on stems and fruit stem-ends"
    ],
    prevention: [
      "Mulch heavily around the base of plants to prevent soil-borne spores from splashing onto leaves",
      "Prune lower leaf branches (bottom 12 inches) to keep foliage off the soil",
      "Practice a 3-year crop rotation away from tomatoes and potatoes"
    ],
    treatment: [
      "Apply protective fungicides (Chlorothalonil, Copper, or Mancozeb) at transplanting or at the first sign of symptoms",
      "Use bio-fungicides such as Trichoderma harzianum"
    ]
  },
  "Tomato___Late_blight": {
    crop: "Tomato",
    disease_name: "Late Blight",
    is_healthy: false,
    description: "A rapid and aggressive water mold disease capable of destroying entire tomato fields in just a few days.",
    cause: "Caused by the oomycete Phytophthora infestans. It thrives in cool (15–22°C), wet, rainy, or excessively foggy conditions.",
    symptoms: [
      "Large, dark, water-soaked greasy patches on leaves and stems",
      "White fuzzy mold visible on the underside of infected leaves in damp conditions",
      "Tomatoes develop large, firm, greasy brown-bronze blotches"
    ],
    prevention: [
      "Plant late blight-resistant varieties (e.g., Mountain Magic, Defiant, Iron Lady)",
      "Avoid planting tomatoes downwind or in proximity to potato fields",
      "Ensure proper plant spacing and drip irrigation"
    ],
    treatment: [
      "Apply specialized oomycete fungicides (e.g., Mandipropamid, Dimethomorph, Chlorothalonil) immediately upon local weather blight alerts",
      "Uproot and destroy heavily infected plants in bags to prevent spore travel"
    ]
  },
  "Tomato___Leaf_Mold": {
    crop: "Tomato",
    disease_name: "Leaf Mold",
    is_healthy: false,
    description: "A fungal disease predominantly affecting greenhouse and polytunnel tomatoes where humidity remains above 85%.",
    cause: "Caused by Passalora fulva (formerly Cladosporium fulvum). The fungus enters through stomata under high relative humidity and warm conditions.",
    symptoms: [
      "Pale green to bright yellow patches on the upper surface of older leaves",
      "Velvety, olive-green to brown fungal growth directly beneath the spots on leaf undersides",
      "Leaves curl, wither, and drop prematurely"
    ],
    prevention: [
      "Ensure high ventilation and use exhaust fans in greenhouses to keep relative humidity below 80%",
      "Space plants generously and avoid wetting foliage during irrigation",
      "Disinfect greenhouse structures thoroughly between planting cycles"
    ],
    treatment: [
      "Apply copper-based fungicides, Chlorothalonil, or Mancozeb at early infection",
      "Spray bio-fungicides like Bacillus amyloliquefaciens"
    ]
  },
  "Tomato___Septoria_leaf_spot": {
    crop: "Tomato",
    disease_name: "Septoria Leaf Spot",
    is_healthy: false,
    description: "One of the most damaging foliar diseases of tomatoes, causing progressive defoliation from the base upward.",
    cause: "Caused by the fungus Septoria lycopersici. Spores survive on solanaceous weeds (like nightshade) and crop debris, spreading via water splash.",
    symptoms: [
      "Numerous small (2–3 mm), circular spots with dark brown margins and sunken, tan-white centers",
      "Tiny black speckles (pycnidia) visible inside the center of lesions",
      "Progressive leaf yellowing and bottom-up defoliation"
    ],
    prevention: [
      "Remove all bottom leaves up to 1-2 feet above the ground to eliminate splash transmission",
      "Apply organic or plastic mulch around the plant base",
      "Control all solanaceous weeds around the garden perimeter"
    ],
    treatment: [
      "Apply fungicides such as Chlorothalonil, Mancozeb, or Copper octanoate every 7–10 days",
      "Apply bio-fungicidal sprays of Bacillus subtilis as a preventative measure"
    ]
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    crop: "Tomato",
    disease_name: "Two-Spotted Spider Mite",
    is_healthy: false,
    description: "Microscopic arachnid pests that pierce leaf cells to suck sap, causing severe speckling, bronzing, and defoliation.",
    cause: "Caused by Tetranychus urticae. Populations explode in hot, dry, dusty weather (>30°C) with low humidity.",
    symptoms: [
      "Fine yellow or white stippling (tiny dots) on the upper leaf surface",
      "Delicate, silky webbing visible on the undersides of leaves and stems",
      "Leaves turn bronze, dry out, become crispy, and fall off"
    ],
    prevention: [
      "Keep field pathways watered or mulched to minimize dust",
      "Avoid using broad-spectrum insecticides that kill natural predatory insects (e.g., ladybugs, lacewings)",
      "Overhead misting during hot dry spells to disrupt dry mite habitats"
    ],
    treatment: [
      "Release predatory mites (Phytoseiulus persimilis or Neoseiulus californicus)",
      "Apply insecticidal soap, Neem oil, or horticultural oils to leaf undersides",
      "Use specific miticides (e.g., Abamectin, Bifenazate) for heavy infestations"
    ]
  },
  "Tomato___Target_Spot": {
    crop: "Tomato",
    disease_name: "Target Spot",
    is_healthy: false,
    description: "A fungal foliar and fruit pathogen causing circular concentric lesions, often confused with Early Blight.",
    cause: "Caused by the fungus Corynespora cassiicola. It thrives in warm temperatures (20–28°C) accompanied by long periods of free leaf moisture.",
    symptoms: [
      "Brown, circular lesions with light brown centers and distinct concentric target-like rings",
      "Small, pinpoint lesions on fruit that expand into sunken, crater-like brown spots",
      "Premature defoliation starting from the inner canopy"
    ],
    prevention: [
      "Prune internal suckers to improve air movement inside the canopy",
      "Stake plants and maintain adequate row spacing",
      "Avoid excessive nitrogen fertilization"
    ],
    treatment: [
      "Apply fungicides labeled for target spot such as Azoxystrobin, Chlorothalonil, or Famoxadone + Cymoxanil",
      "Spray preventative copper hydroxide formulations"
    ]
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    crop: "Tomato",
    disease_name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    is_healthy: false,
    description: "A devastating viral disease transmitted by whiteflies that severely stunts plant growth and halts fruit production.",
    cause: "Caused by Tomato yellow leaf curl virus (a Begomovirus) transmitted persistently by the Silverleaf Whitefly (Bemisia tabaci).",
    symptoms: [
      "Severe upward curling and cupping of leaf margins",
      "Pronounced interveinal chlorosis (yellowing) on young terminal leaves",
      "Stunted, bushy plant habit and premature flower drop with zero fruit set"
    ],
    prevention: [
      "Install 50-mesh insect-proof netting in nurseries and greenhouse vents",
      "Use yellow sticky traps to monitor and trap whitefly populations early",
      "Grow TYLCV-resistant or tolerant tomato hybrids (e.g., Tycoon, Grand Marshall)"
    ],
    treatment: [
      "No chemical cure for the virus itself; immediately rogue and destroy infected plants",
      "Control whitefly vectors using systemic insecticides (e.g., Acetamiprid, Imidacloprid, or Spiromesifen) or insecticidal soaps"
    ]
  },
  "Tomato___Tomato_mosaic_virus": {
    crop: "Tomato",
    disease_name: "Tomato Mosaic Virus (ToMV)",
    is_healthy: false,
    description: "A highly stable, mechanically transmitted virus that causes distorted foliage and uneven ripening in tomatoes.",
    cause: "Caused by Tomato mosaic virus (Tobamovirus). Transmitted mechanically via hands, tools, contaminated seed, and tobacco products.",
    symptoms: [
      "Mottled light and dark green mosaic patterns on leaves",
      "Shoestringing or 'fern-like' narrowing and distortion of young leaves",
      "Internal brown necrosis of fruit walls and uneven ripening"
    ],
    prevention: [
      "Use certified virus-free seeds treated with trisodium phosphate (TSP)",
      "Wash hands with soap and water after handling tobacco before touching tomato plants",
      "Disinfect pruning shears and tools in a 1:10 bleach solution between plants"
    ],
    treatment: [
      "No chemical treatment exists; infected plants must be carefully uprooted and incinerated",
      "Avoid composting infected crop remnants"
    ]
  },
  "Tomato___healthy": {
    crop: "Tomato",
    disease_name: "Healthy Tomato",
    is_healthy: true,
    description: "The tomato plant exhibits normal physiological vigor, strong flowering, and unblemished foliar canopy.",
    cause: "Balanced fertigation, appropriate staking, consistent watering, and absence of insect vectors.",
    symptoms: [
      "Deep green, compound leaves free of mottling or spotting",
      "Strong, thick central stems with healthy glandular trichomes",
      "Firm, glossy green or ripening red fruits without blemishes"
    ],
    prevention: [
      "Maintain consistent drip irrigation to prevent moisture fluctuations",
      "Support stems using stakes, trellises, or cages",
      "Perform periodic scouting for pests and early foliar spots"
    ],
    treatment: [
      "No treatment required."
    ]
  }
};
