export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
}

export interface ShortAnswerQuestion {
  id: string;
  question: string;
  description?: string;
  subBullets?: string[];
  placeholder?: string;
}

export interface LongAnswerQuestion {
  id: string;
  question: string;
  description?: string;
  subBullets?: string[];
  placeholder?: string;
}

export type AssessmentType = "mcq" | "short_answers" | "long_answers";

export interface PositionAssessmentConfig {
  positionId: number;
  /** Single exam type (legacy). Use assessmentTypes[] for multi-stage exams. */
  assessmentType: AssessmentType;
  /** Multiple exam types (in order). When set, overrides assessmentType. */
  assessmentTypes?: AssessmentType[];
  timeLimitMinutes: number;
  stageTimeLimits?: Record<string, number>;
  totalQuestions: number;
  passingScorePercent: number;
  title: string;
}

export const assessmentConfigs: Record<number, PositionAssessmentConfig> = {
  // Senior Agronomist — ALL assessment types: MCQ → Short Answers → Long Answers
  1: {
    positionId: 1,
    assessmentType: "mcq",
    assessmentTypes: ["mcq", "short_answers", "long_answers"],
    timeLimitMinutes: 45,
    stageTimeLimits: {
      mcq: 15,
      short_answers: 15,
      long_answers: 15,
    },
    totalQuestions: 15,
    passingScorePercent: 60,
    title: "Senior Agronomist Screening",
  },
  2: {
    positionId: 2,
    assessmentType: "mcq",
    timeLimitMinutes: 20,
    stageTimeLimits: {
      mcq: 20,
    },
    totalQuestions: 25,
    passingScorePercent: 60,
    title: "Field Development Screening",
  },
  3: {
    positionId: 3,
    assessmentType: "short_answers",
    timeLimitMinutes: 15,
    stageTimeLimits: {
      short_answers: 15,
    },
    totalQuestions: 5,
    passingScorePercent: 60,
    title: "Seed Production Manager Screening",
  },
  4: {
    positionId: 4,
    assessmentType: "mcq",
    timeLimitMinutes: 20,
    stageTimeLimits: {
      mcq: 20,
    },
    totalQuestions: 25,
    passingScorePercent: 60,
    title: "Quality Control Officer Screening",
  },
  5: {
    positionId: 5,
    assessmentType: "short_answers",
    timeLimitMinutes: 15,
    stageTimeLimits: {
      short_answers: 15,
    },
    totalQuestions: 5,
    passingScorePercent: 60,
    title: "Marketing Executive Screening",
  },
  6: {
    positionId: 6,
    assessmentType: "mcq",
    timeLimitMinutes: 20,
    stageTimeLimits: {
      mcq: 20,
    },
    totalQuestions: 25,
    passingScorePercent: 60,
    title: "Supply Chain & Distribution Screening",
  },
};

export const mcqQuestionsData: Record<number, MCQQuestion[]> = {
  // Field Development Officer
  2: [
    {
      id: "fdo_q1",
      question:
        "Which of the following is the most critical factor to standardize when planning a crop demonstration on farmer plots?",
      options: [
        "Farmer preference for seed color",
        "Plot size and spacing between rows",
        "The type of transport used to deliver seeds",
        "The time of day the seeds are sown",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q2",
      question:
        "What is the primary indicator of Late Blight disease in potato crops?",
      options: [
        "Yellow spots with dark green margins on stems",
        "Water-soaked dark lesions on leaves that turn brown/black under humid conditions",
        "Powdery white coating on the upper surface of leaves",
        "Stunted root growth with small nodules",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q3",
      question:
        "When explaining seed spacing to a smallholder farmer, what is the best practice for establishing credibility?",
      options: [
        "Cite international research papers in English",
        "Perform a physical spacing demonstration on a small patch of their own field",
        "Provide a thick booklet with scientific formulas",
        "Tell them to figure it out based on their experience",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q4",
      question:
        "Which fertilizer ratio is generally recommended for encouraging robust vegetative growth in the early stages of cabbage?",
      options: [
        "High Nitrogen (N)",
        "High Potassium (K)",
        "Zero Phosphorus (P)",
        "High Calcium (Ca) only",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q5",
      question:
        "If a farmer reports a sudden wilting of tomato plants during mid-day which recover at night, what is the most likely initial diagnosis?",
      options: [
        "Bacterial Wilt or water stress",
        "Nitrogen deficiency",
        "Over-exposure to sunlight",
        "Flea beetle attack",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q6",
      question:
        "What is the primary purpose of conducting a field day (Field Demonstration Day) for local farmers?",
      options: [
        "To distribute free fertilizers to all attendees",
        "To showcase the yield and quality performance of a hybrid seed variety in local soil conditions",
        "To negotiate wholesale prices directly with consumers",
        "To perform laboratory tests on soil samples",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q7",
      question:
        "Which of the following describes the correct isolation distance for seed multiplication vs. commercial vegetable cultivation?",
      options: [
        "Seed multiplication requires larger isolation distance to prevent cross-pollination",
        "Commercial vegetable cultivation requires larger isolation distance",
        "Both require the exact same isolation distance",
        "No isolation distance is required for either",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q8",
      question:
        "What is the ideal soil pH range for most commercial hybrid vegetable seed cultivation?",
      options: [
        "4.5 to 5.0 (highly acidic)",
        "6.0 to 7.0 (slightly acidic to neutral)",
        "8.0 to 9.0 (alkaline)",
        "9.5 to 10.5 (highly alkaline)",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q9",
      question:
        "Which pest is primarily responsible for transmitting viral diseases in chili plants?",
      options: [
        "Cutworms",
        "Sucking pests like Thrips and Aphids",
        "Fruit borers",
        "Root-knot nematodes",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q10",
      question:
        "Why is seed treatment with fungicides recommended before sowing?",
      options: [
        "To accelerate germination by 5 days",
        "To protect the seedling from seed-borne and soil-borne fungal pathogens",
        "To change the color of the flowers",
        "To reduce the water requirement of the crop",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q11",
      question: "What is 'Damping-off' in seedlings, and where does it occur?",
      options: [
        "A fungal disease causing seedling collapse in nursery beds",
        "A root disease occurring during harvest",
        "A post-harvest physiological disorder of fruits",
        "A drying up of leaves due to wind",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q12",
      question:
        "Which nutrient deficiency causes purple coloration on the underside of tomato leaves?",
      options: [
        "Nitrogen deficiency",
        "Phosphorus deficiency",
        "Potassium deficiency",
        "Zinc deficiency",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q13",
      question: "What does 'Rouging' refer to in field management?",
      options: [
        "Applying pesticide using a mist blower",
        "Identifying and removing off-type plants and weeds from the field",
        "Deep plowing the soil before winter",
        "Adding organic compost to the seedbed",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q14",
      question:
        "Which of the following is a crucial step for establishing a good relationship with local seed dealers?",
      options: [
        "Promising them 100% germination regardless of field conditions",
        "Providing regular training, field support, and leaflets to share with farmers",
        "Allowing unlimited product returns past expiry dates",
        "Focusing sales only on the largest dealers and ignoring smaller retailers",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q15",
      question:
        "What is the primary benefit of raised nursery beds for growing hybrid seedlings during monsoon?",
      options: [
        "Protects seedlings from high winds",
        "Ensures proper drainage and prevents waterlogging around root zones",
        "Allows direct contact with groundwater",
        "Keeps the temperature of the soil warm",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q16",
      question:
        "Which of the following is a symptom of Potassium (K) deficiency in vegetable crops?",
      options: [
        "Marginal scorching or burning of older leaves",
        "Entire plant turning pale yellow from the top down",
        "Sudden rotting of roots without wilting leaves",
        "Abnormal leaf enlargement and curling",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q17",
      question:
        "Which irrigation method is most water-efficient for commercial tomato cultivation in drought-prone areas?",
      options: [
        "Flood irrigation",
        "Drip irrigation",
        "Sprinkler irrigation",
        "Furrow irrigation",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q18",
      question:
        "What is the key advantage of F1 hybrid seeds compared to open-pollinated (OP) seeds?",
      options: [
        "F1 seeds can be saved and replanted season after season with identical results",
        "F1 seeds exhibit hybrid vigor, resulting in higher yields, uniformity, and disease resistance",
        "F1 seeds require no fertilizer or irrigation",
        "F1 seeds are much cheaper to produce",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q19",
      question:
        "Under what weather conditions does Downy Mildew spread most rapidly in cucurbits?",
      options: [
        "Dry and hot wind",
        "Cool, highly humid weather with frequent dew",
        "Extreme freezing temperatures",
        "Heavy dry sandy winds",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q20",
      question:
        "What is the critical first step a Field Development Officer must take when a farmer complains about poor seed germination?",
      options: [
        "Immediately promise a cash refund or replacement",
        "Visit the field to investigate sowing depth, soil moisture, and soil preparation",
        "Blame the farmer for incorrect agricultural practices over the phone",
        "File a report and ignore the case until the next season",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q21",
      question:
        "Which cropping pattern is ideal for reducing nematode populations in soil?",
      options: [
        "Continuous mono-cropping of tomato",
        "Crop rotation with marigolds",
        "Growing chili followed by eggplant",
        "Flooding the field and leaving it dry",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q22",
      question: "What does 'hardening' of seedlings mean before transplanting?",
      options: [
        "Applying a chemical coating to the stems",
        "Gradually reducing water and exposing seedlings to direct sunlight to prepare them for field stress",
        "Keeping the seedlings in a dark cold room for 3 days",
        "Squeezing the soil block around the roots to compact it",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q23",
      question: "Which of the following is a physical crop protection method?",
      options: [
        "Spraying chemical insecticides",
        "Using yellow sticky traps and pheromone traps",
        "Applying organic fertilizer",
        "Inoculating plants with beneficial bacteria",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q24",
      question:
        "What is the main objective of training and pruning tomato plants in staking systems?",
      options: [
        "To increase the count of small seeds per fruit",
        "To improve airflow, reduce disease pressure, and increase fruit size/quality",
        "To make the fruits ripen faster",
        "To reduce the number of leaves to zero",
      ],
      correctAnswer: 0,
    },
    {
      id: "fdo_q25",
      question:
        "What is the primary role of a Field Development Officer in the commercial launch of a new hybrid?",
      options: [
        "Pricing the product for retail markets",
        "Conducting demonstrative trials, gathering feedback, and educating farmers about its benefits",
        "Managing the company's financial accounting systems",
        "Overseeing factory operations at the processing plant",
      ],
      correctAnswer: 0,
    },
  ],

  // Quality Control Officer
  4: [
    {
      id: "qc_q1",
      question:
        "According to ISTA rules, what is the standard temperature for a seed germination test of hybrid tomatoes?",
      options: [
        "10°C constant",
        "20-30°C alternating, or 25°C constant",
        "35-40°C alternating",
        "0°C for cold treatment",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q2",
      question:
        "Which parameter is NOT evaluated during a standard physical purity analysis of a seed lot?",
      options: [
        "Percentage of pure seeds",
        "Percentage of inert matter",
        "Percentage of weed seeds and other crop seeds",
        "Percentage of genetically modified traits (GMO)",
      ],
      correctAnswer: 3,
    },
    {
      id: "qc_q3",
      question: "What is the primary purpose of a TZ (Tetrazolium) test?",
      options: [
        "To detect viral infection in seed coats",
        "To rapidly estimate seed viability by staining living tissue red",
        "To determine moisture content in under 5 minutes",
        "To measure physical purity by weight",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q4",
      question:
        "Which seed moisture content range is generally considered safe for long-term hermetic storage of vegetable seeds?",
      options: ["4% to 7%", "10% to 12%", "14% to 16%", "18% to 20%"],
      correctAnswer: 0,
    },
    {
      id: "qc_q5",
      question:
        "What happens if seeds are stored with a moisture content above 15% in non-hermetic packaging?",
      options: [
        "Seeds will enter a deeper state of dormancy",
        "Rapid loss of viability due to increased respiration, mold growth, and heating",
        "Seeds will absorb nitrogen from the air and improve quality",
        "Nothing, this is the ideal moisture content for storage",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q6",
      question: "What is a 'Grow-Out Test' (GOT) primarily used to verify?",
      options: [
        " Germination rate under extreme cold conditions",
        "Genetic purity and trueness-to-type of a seed lot",
        "Fungal pathogen infection rate on seed surface",
        "Seed moisture content during packaging",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q7",
      question:
        "Which tool is standard for obtaining a representative sample from a sealed seed bag?",
      options: [
        "A measuring cup",
        "A seed trier (sleeve or stick)",
        "A vacuum suction pipe",
        "A mechanical divider",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q8",
      question:
        "How do you distinguish between abnormal and normal seedlings in a germination test?",
      options: [
        "Normal seedlings must show healthy roots, hypocotyl, and cotyledons capable of continued growth",
        "Abnormal seedlings grow twice as fast as normal ones",
        "Normal seedlings are always twice as tall as abnormal ones",
        "There is no difference; all sprouted seeds are counted as germinated",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q9",
      question:
        "What is the standard method for determining seed moisture content in a QA laboratory?",
      options: [
        "Squeezing seeds by hand",
        "Constant temperature oven method (drying at 103°C or 130°C)",
        "Visual inspection of seed color",
        "Using a digital thermometer",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q10",
      question:
        "Which of the following constitutes 'inert matter' in a purity test?",
      options: [
        "Broken seeds that are less than half their original size",
        "Seeds of weed species",
        "Seeds of other vegetable crops",
        "Perfect pure seeds with minor scratches",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q11",
      question:
        "What is the primary function of a Boerner divider or Soil/Seed divider in a QC lab?",
      options: [
        "To sort seeds by size and weight",
        "To reduce a large submitted sample into a representative working sample",
        "To crush seeds for chemical testing",
        "To count the exact number of seeds in a tray",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q12",
      question:
        "If a seed lot has high germination but low vigor, how might it perform in the field under stress conditions?",
      options: [
        "It will still establish perfectly with 100% yield",
        "It will show poor seedling emergence, uneven growth, and high susceptibility to damping-off",
        "It will require 50% less water",
        "It will mature 10 days earlier",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q13",
      question:
        "What is the purpose of the 'accelerated aging test' in seed quality control?",
      options: [
        "To force seeds to germinate in 24 hours",
        "To evaluate seed vigor and estimate storage potential by exposing seeds to high temp and humidity before germinating",
        "To produce crop yields in half the normal timeframe",
        "To test seed coat hardness using mechanical rollers",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q14",
      question:
        "Which seed-borne pathogen is commonly tested in hybrid brassica (cabbage/cauliflower) seed quality checks?",
      options: [
        "Xanthomonas campestris (Black rot pathogen)",
        "Root rot nematodes",
        "Late blight fungus",
        "Whitefly larvae",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q15",
      question:
        "Why is physical cleanliness critical in seed packaging facilities?",
      options: [
        "To prevent mechanical mixture of different varieties and cross-contamination of seed lots",
        "To keep the packaging color bright",
        "To prevent seeds from absorbing nitrogen from the air",
        "To make sure workers can pack seeds faster",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q16",
      question:
        "In a laboratory germination test, what does 'hard seed' refer to?",
      options: [
        "Seeds that have rotted completely",
        "Seeds that remain firm and do not absorb water or germinate due to an impermeable seed coat",
        "Seeds that germinate and form abnormally hard roots",
        "Seeds that are chemically coated with polymers",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q17",
      question:
        "What is the effect of priming seeds (controlled hydration followed by drying)?",
      options: [
        "It extends seed shelf life by 5 years",
        "It triggers pre-germination metabolic processes, leading to faster and more uniform seedling emergence",
        "It makes the seeds completely immune to insect attacks",
        "It eliminates the need for soil planting",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q18",
      question:
        "Under ISTA guidelines, what is the minimum weight of a submitted sample for physical purity of hybrid hot pepper?",
      options: ["10 grams", "150 grams", "1.5 kg", "10 kg"],
      correctAnswer: 0,
    },
    {
      id: "qc_q19",
      question: "What does 'Trueness-to-Variety' (TTV) mean?",
      options: [
        "Whether the seeds belong to the claimed crop species",
        "Whether the plant growth matches the genetic characteristics of the specified hybrid variety",
        "Whether the seeds can grow in any soil type",
        "Whether the seed packet contains the correct weight",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q20",
      question:
        "Which test is used to detect presence of active transgenic traits (GMO) in a seed lot?",
      options: [
        "Germination test",
        "Lateral Flow Strip test (ELISA) or PCR analysis",
        "Oven drying test",
        "Tetrazolium stain test",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q21",
      question:
        "What is the primary reason for rejecting a seed lot with 95% germination if its physical purity is 92%?",
      options: [
        "Low physical purity means it contains too much inert matter or weed seeds, violating quality standards",
        "It will rot in the warehouse",
        "It is too heavy to transport",
        "It requires special fertilizers to grow",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q22",
      question:
        "How long should a standard laboratory record / retaining sample of a commercialized seed lot be preserved?",
      options: [
        "Exactly 30 days after packaging",
        "At least one year beyond the expiry date of the seed lot",
        "Until the crop is harvested by the first buyer",
        "Forever",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q23",
      question: "Which of the following is a chemical seed disinfectant?",
      options: [
        "Urea",
        "Sodium Hypochlorite or Thiram",
        "Potassium Chloride",
        "Boric Acid",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q24",
      question:
        "What does a high electrical conductivity (EC) of seed leachate indicate?",
      options: [
        "Excellent membrane integrity and high seed vigor",
        "Poor membrane integrity, cellular leakage, and low seed vigor",
        "High concentration of mineral fertilizers on the seeds",
        "High seed moisture content",
      ],
      correctAnswer: 0,
    },
    {
      id: "qc_q25",
      question:
        "If a batch of seeds fails the germination threshold (e.g. 70% instead of 80%), what is the first protocol a Quality Control Officer must initiate?",
      options: [
        "Repackage and sell with a false label",
        "Immediately discard the lot without re-testing",
        "Re-sample and perform a duplicate test alongside a validation sample to confirm results",
        "Mix with a high-germinating lot to average it out",
      ],
      correctAnswer: 2,
    },
  ],

  // Supply Chain Coordinator
  6: [
    {
      id: "sc_q1",
      question:
        "Which condition is most critical to monitor in a commercial seed warehouse to prevent premature seed degradation?",
      options: [
        "Atmospheric pressure",
        "Relative Humidity (RH) and Temperature",
        "Carbon Dioxide levels",
        "Lighting intensity",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q2",
      question:
        "What is the 'rule of thumb' (Harrington's rule) for seed storage lifetime regarding temp and humidity?",
      options: [
        "For every 5°C increase in temperature, seed storage life is doubled",
        "For every 1% increase in seed moisture or 5°C increase in temp, seed life is halved",
        "Relative humidity must always be equal to the storage temp in Fahrenheit",
        "Seeds should be stored at absolute zero temperature",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q3",
      question:
        "Which inventory valuation method is most appropriate for perishable/semi-perishable goods like seasonal hybrid seeds?",
      options: [
        "LIFO (Last In, First Out)",
        "FEFO (First Expired, First Out) / FIFO",
        "Weighted Average Cost only",
        "Random selection",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q4",
      question:
        "What is the primary benefit of hermetic packaging (e.g. triple-layer foil pouches) in seed distribution?",
      options: [
        "It prevents physical bruising of seeds during truck transit",
        "It blocks moisture and oxygen exchange, maintaining low seed moisture regardless of surrounding humidity",
        "It allows seeds to ripen inside the pouch",
        "It makes the packaging cheaper",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q5",
      question: "What is a 'reorder point' (ROP) in seed inventory management?",
      options: [
        "The day of the week when orders are placed",
        "The inventory level at which a new order must be placed, based on lead time and safety stock",
        "The maximum capacity of the seed warehouse",
        "The price point where dealers refuse to buy more seeds",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q6",
      question:
        "How should seed bags be stacked on wooden pallets in a warehouse?",
      options: [
        "Tightly against the warehouse walls to maximize space",
        "Away from walls with adequate spacing to allow ventilation and pest inspection",
        "Directly on the concrete floor without pallets",
        "Stacked up to the ceiling without gaps",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q7",
      question:
        "Which document must accompany every shipment of certified seed dispatch to dealer network?",
      options: [
        "A copy of the employee contract",
        "Delivery Challan, Invoice, and Seed Quality Certificate",
        "Warehouse floor plan",
        "Farming guide for consumers",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q8",
      question:
        "During peak planting season, what is the main logistics bottleneck for seed distribution in rural Bangladesh?",
      options: [
        "Over-supply of transport options",
        "Road infrastructure delays, traffic congestion, and timely cargo space booking",
        "Lack of demand from dealers",
        "High packaging costs",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q9",
      question: "What is 'safety stock' in supply chain planning?",
      options: [
        "Stock kept in a locked high-security vault",
        "Extra inventory held to mitigate risk of stockouts caused by supply/demand fluctuations",
        "Damaged stock that is unsellable",
        "Stock that is reserved for promotional giveaways",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q10",
      question:
        "Why is cross-docking sometimes used during peak seasonal dispatch?",
      options: [
        "To inspect seeds in a laboratory before selling",
        "To transfer incoming goods directly from receiving to outbound shipping with minimal storage time",
        "To package seeds into small foil packets",
        "To repair broken trucks in the yard",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q11",
      question:
        "What is the primary function of a warehouse management system (WMS) in seed logistics?",
      options: [
        "To count seeds under a microscope",
        "To track storage locations, manage stock rotation, and optimize picking/packing flows",
        "To control the temperature of trucks during transit",
        "To design promotional materials for social media",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q12",
      question:
        "What is the risk of shipping seeds in ordinary covered trucks during heavy monsoon rains?",
      options: [
        "The seeds will germinate on the truck due to high humidity and water leakage",
        "The truck will run out of fuel faster",
        "Dealers will refuse to unload the truck",
        "The seed packaging will change color",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q13",
      question:
        "Which of the following is a key performance indicator (KPI) for a seed logistics coordinator?",
      options: [
        "Seed germination percentage in lab",
        "On-Time In-Full (OTIF) delivery rate to dealers",
        "Number of social media likes on crop photos",
        "Genetic purity index",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q14",
      question: "What is a 'stockout' and how does it affect a seed business?",
      options: [
        "An over-supply of stock causing price drops",
        "Running out of inventory, leading to lost sales, lost market share, and dissatisfied dealers",
        "A warehouse cleaning event",
        "A discount sales campaign",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q15",
      question:
        "Which type of packaging is best suited for packing bulky field crops seeds like hybrid maize or rice?",
      options: [
        "Small aluminum foil bags",
        "Woven polypropylene (PP) bags with inner liners",
        "Glass jars",
        "Paper envelopes",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q16",
      question: "What does 'lead time' mean in supply chain procurement?",
      options: [
        "The time it takes to sell out a seed lot",
        "The duration between placing an order and receiving the physical inventory",
        "The shelf life of seeds under ambient conditions",
        "The travel time of a delivery truck",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q17",
      question:
        "What is the primary goal of supply chain demand forecasting for seeds?",
      options: [
        "To determine next year's corporate taxes",
        "To estimate future sales volume so production, inventory, and logistics can align to prevent stockouts or overstocks",
        "To predict the exact date of monsoon onset",
        "To set the retail price of seeds",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q18",
      question:
        "How do you handle return logistics (reverse logistics) of unsold seed packets from dealers at the end of a season?",
      options: [
        "Tell the dealers to burn the remaining seeds in their shops",
        "Collect, catalog, and return them to the central warehouse for quality re-testing before deciding on repackaging or disposal",
        "Leave them with dealers and charge them for next season",
        "Immediately mix them into new fresh packaging without testing",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q19",
      question:
        "What is the role of cold storage facilities in seed conservation?",
      options: [
        "To freeze seeds for instant planting",
        "To maintain low temp (10-15°C) and low humidity to preserve foundation seed viability over multiple seasons",
        "To wash seeds with cold water",
        "To accelerate seed drying",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q20",
      question:
        "Which of the following represents a 'transit damage risk' for packed seeds?",
      options: [
        "Using air-conditioned trucks",
        "Rough handling, hook usage on bags, and leaks in truck covers during rain",
        "Fast driving on highways",
        "Delivering seeds 2 days early",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q21",
      question:
        "What is the purpose of lot tracing (traceability) in seed supply chains?",
      options: [
        "To count the number of bags on a truck",
        "To trace a seed packet back to its production farm, processing batch, and quality test records in case of field complaints",
        "To design nicer bag graphics",
        "To track dealer credit limits",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q22",
      question: "What is a 'Consignment Note' in logistics?",
      options: [
        "A note describing warehouse cleaning guidelines",
        "A document issued by a carrier detailing goods shipped, destination, and terms of transit",
        "A letter of recommendation for a dealer",
        "A promotional voucher for farmers",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q23",
      question:
        "Which strategy helps optimize transportation costs in regional distribution hubs?",
      options: [
        "Shipping half-empty trucks daily",
        "Route consolidation, full truckload (FTL) optimization, and hub-and-spoke warehousing models",
        "Using air transport for all deliveries",
        "Hiring separate trucks for every 5 bags of seeds",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q24",
      question: "What does 'shrinkage' refer to in seed warehouse operations?",
      options: [
        "Seeds getting physically smaller due to drying",
        "Loss of inventory due to theft, damage, or counting errors",
        "Decreasing the warehouse floor area",
        "Reducing the weight of seed packets",
      ],
      correctAnswer: 0,
    },
    {
      id: "sc_q25",
      question:
        "If a regional distributor reports receiving 10 wet/damaged bags in a batch of 200, what is the coordinator's immediate logistics protocol?",
      options: [
        "Ignore the report and bill them for 200 bags",
        "Validate damage photos, issue a credit note or replacement for the 10 bags, and file a claim with the transport provider",
        "Cancel the dealership contract immediately",
        "Tell them to dry the seeds in the sun and sell them anyway",
      ],
      correctAnswer: 0,
    },
  ],
  // Senior Agronomist (MCQ stage of combined assessment)
  1: [
    {
      id: "sagr_q1",
      question:
        "Which of the following best describes the concept of 'test cross' in plant breeding?",
      options: [
        "Crossing two plants from the same inbred line",
        "Crossing an unknown genotype with a homozygous recessive parent to determine its genotype",
        "A cross between two different species to create a hybrid",
        "Pollinating a plant with its own pollen",
      ],
      correctAnswer: 0,
    },
    {
      id: "sagr_q2",
      question:
        "In a replicated field trial, what is the primary purpose of randomization?",
      options: [
        "To ensure all varieties receive the same amount of rain",
        "To eliminate researcher bias and account for unknown variation across the trial area",
        "To save time during data collection",
        "To allow more varieties to be tested in a smaller area",
      ],
      correctAnswer: 0,
    },
    {
      id: "sagr_q3",
      question: "What does BBCH scale measure in crop science?",
      options: [
        "Soil pH levels across trial plots",
        "Standardized phenological growth stages of plants",
        "Pest and disease incidence rating system",
        "Biomass and carbon content of above-ground plant matter",
      ],
      correctAnswer: 0,
    },
    {
      id: "sagr_q4",
      question:
        "Which of the following irrigation scheduling methods is most efficient for vegetable crops in water-scarce environments?",
      options: [
        "Flood irrigation based on calendar schedule",
        "Drip irrigation guided by soil moisture sensors and evapotranspiration data",
        "Furrow irrigation applied at fixed 3-day intervals",
        "Overhead sprinkler irrigation at dawn every day",
      ],
      correctAnswer: 0,
    },
    {
      id: "sagr_q5",
      question:
        "Which nutrient deficiency in vegetable crops is most commonly indicated by interveinal chlorosis on younger leaves?",
      options: ["Nitrogen", "Iron", "Phosphorus", "Calcium"],
      correctAnswer: 0,
    },
  ],
};

export const shortAnswerQuestionsData: Record<number, ShortAnswerQuestion[]> = {
  // Senior Agronomist (Short Answers)
  1: [
    {
      id: "sa_q1",
      question: "Question 1: Crop Rotation Benefits",
      description:
        "Explain how implementing a legume-inclusive crop rotation system improves soil health and nitrogen availability for subsequent cereal crops in rice-wheat cropping systems.",
      placeholder:
        "Discuss biological nitrogen fixation, soil structure improvement, and disease cycle disruption...",
    },
    {
      id: "sa_q2",
      question: "Question 2: Seed Treatment Methods",
      description:
        "Identify the most effective chemical or biological seed treatment methods to prevent damping-off disease in vegetable nurseries during the early monsoon season.",
      placeholder:
        "Discuss fungicides, biological control agents, application rates, and safety protocols...",
    },
    {
      id: "sa_q3",
      question: "Question 3: Pollen Viability Factors",
      description:
        "What environmental factors most critically affect hybrid tomato pollen viability and seed set during high-temperature periods in the summer?",
      placeholder:
        "Discuss temperature thresholds, relative humidity, stress periods, and mitigation strategies...",
    },
    {
      id: "sa_q4",
      question: "Question 4: Isolation Distance Criteria",
      description:
        "What are the non-negotiable isolation distance criteria for producing genetically pure foundation seeds of cross-pollinated vegetable crops like onion or pumpkin?",
      placeholder:
        "Discuss wind/insect pollination ranges, neighboring crops, and barriers...",
    },
    {
      id: "sa_q5",
      question: "Question 5: Post-Harvest Drying Targets",
      description:
        "Explain why seeds must be dried to specific moisture percentages (e.g., 7-9%) before packaging, and describe the risks of storing seeds with high moisture content.",
      placeholder:
        "Discuss mold growth, respiration rate, viability loss, and storage temperature...",
    },
  ],

  // Seed Production Manager (Short Answers)
  3: [
    {
      id: "spm_q1",
      question: "Question 1: Grower Selection",
      description:
        "Describe your criteria for selecting contract farmers for a high-value hybrid seed multiplication program. What factors are non-negotiable?",
      placeholder:
        "Describe land history, soil health, isolation feasibility, and grower profile...",
    },
    {
      id: "spm_q2",
      question: "Question 2: Isolation Distance Management",
      description:
        "Explain how you would handle a situation where a neighboring farmer plants a compatible crop close to your contracted seed multiplication field, violating isolation requirements.",
      placeholder:
        "What mitigation strategies, negotiations, or physical barriers would you deploy?",
    },
    {
      id: "spm_q3",
      question: "Question 3: Post-Harvest Processing",
      description:
        "What are the critical temperature and humidity limits for seed drying and extraction to prevent heat damage and preserve germination viability?",
      placeholder:
        "Discuss seed moisture targets, drying rates, and ambient parameters...",
    },
    {
      id: "spm_q4",
      question: "Question 4: Rouging Protocols",
      description:
        "Explain the three main growth stages when rouging (removing off-types) is most critical in hybrid vegetable seed production.",
      placeholder:
        "Explain vegetative, flowering, and pre-harvest/fruit maturity checkpoints...",
    },
    {
      id: "spm_q5",
      question: "Question 5: Risk Mitigation",
      description:
        "How would you design a backup plan for seed production if a major growing region suffers from early flash floods or drought?",
      placeholder:
        "Discuss regional diversification, staggered planting, and nursery protection...",
    },
  ],

  // Marketing Executive (Short Answers)
  5: [
    {
      id: "me_q1",
      question: "Question 1: Agri Campaign Idea",
      description:
        "Outline a 30-day regional launch campaign for a new drought-resistant hybrid cabbage seed in Northern Bangladesh. What channels will you use to reach smallholder farmers?",
      placeholder:
        "Outline activities, dealer engagements, field demos, and local media usage...",
    },
    {
      id: "me_q2",
      question: "Question 2: Storytelling for Farmers",
      description:
        "Draft a short, engaging success story (2-3 paragraphs) about a farmer named 'Abul Kalam' who achieved double crop yield using Malik Seeds' hybrid potato. Focus on emotional connection and credibility.",
      placeholder:
        "Write the story, highlighting his challenges, the solution, and the final impact...",
    },
    {
      id: "me_q3",
      question: "Question 3: Dealer Relations",
      description:
        "Dealers complain that a competitor is offering higher margins and free gifts. How would you convince them to prioritize Malik Seeds without lowering our product price?",
      placeholder:
        "Discuss co-marketing, technical support, farmer pull strategies, and brand trust...",
    },
    {
      id: "me_q4",
      question: "Question 4: Social Media for Agriculture",
      description:
        "Agricultural content on Facebook often lacks engagement. What types of visual and video content would you produce to make farmers and dealers interact (like, comment, share)?",
      placeholder:
        "Describe formats (video length, topics, host) and interaction hooks...",
    },
    {
      id: "me_q5",
      question: "Question 5: Fair/Event Management",
      description:
        "How would you design our booth at a national agricultural fair in Dhaka to attract maximum visitors and capture leads (contact details of farmers/distributors)?",
      placeholder:
        "Describe the layout, interactive features (e.g., seed samples, games, QR codes) and lead capture process...",
    },
  ],
};

export const longAnswerQuestionsData: Record<number, LongAnswerQuestion[]> = {
  // Senior Agronomist (Long Answers)
  1: [
    {
      id: "la_q1",
      question: "Question 1:",
      description:
        "You have been assigned to lead a multi-location performance trial for a new hybrid tomato and cabbage variety across Bogura, Rangpur, and Jessore.",
      subBullets: [
        "Select trial sites",
        "Design plot layout and replication",
        "Standardize agronomic practices",
        "Monitor crop performance",
        "Analyze and report results",
      ],
      placeholder:
        "Explain in detail how you would manage this trial, ensure data reliability, and make a final recommendation for commercial release...",
    },
    {
      id: "la_q2",
      question: "Question 2:",
      description:
        "During peak season, farmers report that a newly introduced chili hybrid is showing uneven fruit size and lower-than-expected yield in several fields.",
      subBullets: [
        "How you would investigate the issue",
        "What field-level data you would collect",
        "Possible agronomic or environmental causes",
        "Immediate corrective actions",
        "Long-term preventive strategy",
      ],
      placeholder:
        "Focus on your structured approach and communication with farmers...",
    },
    {
      id: "la_q3",
      question: "Question 3:",
      description:
        "As a Senior Agronomist, you are responsible for maintaining seed quality standards in seed production fields.",
      subBullets: [
        "Key quality checkpoints during seed production",
        "How you ensure genetic purity",
        "Isolation and rouging protocols",
        "Pre-harvest and post-harvest quality control",
        "Steps taken if germination falls below acceptable standards",
      ],
      placeholder: "Include practical examples if possible...",
    },
    {
      id: "la_q4",
      question: "Question 4:",
      description:
        "Field trials across multiple seasons show that one hybrid performs exceptionally well in high-input conditions but moderately under low-input farmer practices.",
      subBullets: [
        "Explain how you would investigate and confirm the cause",
        "How you would balance high-input yield vs low-input stability in your recommendations",
        "What crop management instructions (inputs package) you would design for farmers",
      ],
      placeholder:
        "Describe how you would formulate product recommendations...",
    },
    {
      id: "la_q5",
      question: "Question 5:",
      description:
        "A Senior Agronomist at Malik Seeds must work with field development officers, production teams, and farmers.",
      subBullets: [
        "How you would train field development officers on new protocols",
        "How you would coordinate with the production team to transfer research findings to commercial scale",
        "How you would translate scientific data into practical, advice for farmers",
      ],
      placeholder: "Explain your communication and collaboration strategies...",
    },
  ],
};

export type Step =
  | "info"
  | "otp"
  | "start"
  | "mcq"
  | "short-answers"
  | "long-answers"
  | "review"
  | "result"
  | "submitted"
  | "additional-info";

export interface JobAssessmentConfig {
  hasMcq: boolean;
  hasShortAnswers: boolean;
  hasLongAnswers: boolean;
  autoGrade: boolean;
}

export function buildSteps(job: JobAssessmentConfig): Step[] {
  const steps: Step[] = ["info", "otp", "start"];
  if (job.hasMcq) steps.push("mcq");
  if (job.hasShortAnswers) steps.push("short-answers");
  if (job.hasLongAnswers) steps.push("long-answers");
  steps.push("review");
  steps.push(job.autoGrade ? "result" : "submitted");
  if (job.autoGrade) steps.push("additional-info");
  return steps;
}

export function getAssessmentTypes(positionId: number): AssessmentType[] {
  const config = assessmentConfigs[positionId];
  if (!config) return [];

  return config.assessmentTypes ?? [config.assessmentType];
}

export function hasMcqAssessment(positionId: number): boolean {
  return getAssessmentTypes(positionId).includes("mcq");
}

export function hasShortAnswersAssessment(positionId: number): boolean {
  return getAssessmentTypes(positionId).includes("short_answers");
}

export function hasLongAnswersAssessment(positionId: number): boolean {
  return getAssessmentTypes(positionId).includes("long_answers");
}

export function hasWrittenAssessment(positionId: number): boolean {
  return hasShortAnswersAssessment(positionId) || hasLongAnswersAssessment(positionId);
}

export function shouldAutoGradeAssessment(positionId: number): boolean {
  const types = getAssessmentTypes(positionId);
  return types.length === 1 && types[0] === "mcq";
}

export function getInitialExamRoute(
  positionId: number
): "/exam/mcq" | "/exam/short-answers" | "/exam/long-answers" {
  const firstType = getAssessmentTypes(positionId)[0];

  switch (firstType) {
    case "short_answers":
      return "/exam/short-answers";
    case "long_answers":
      return "/exam/long-answers";
    case "mcq":
    default:
      return "/exam/mcq";
  }
}

export function getPostReviewRoute(
  positionId: number
): "/result" | "/submitted" {
  return shouldAutoGradeAssessment(positionId) ? "/result" : "/submitted";
}

export function getStepsForJob(positionId: number): Step[] {
  const config = assessmentConfigs[positionId];
  if (!config) return ["info", "otp", "start"];

  const types = getAssessmentTypes(positionId);
  const hasMcq = types.includes("mcq");
  const hasShortAnswers = types.includes("short_answers");
  const hasLongAnswers = types.includes("long_answers");
  const autoGrade = shouldAutoGradeAssessment(positionId);

  return buildSteps({ hasMcq, hasShortAnswers, hasLongAnswers, autoGrade });
}

/** Returns true if a position has more than one exam stage */
export function hasMultipleExamTypes(positionId: number): boolean {
  const types = getAssessmentTypes(positionId);
  return types.length > 1;
}
