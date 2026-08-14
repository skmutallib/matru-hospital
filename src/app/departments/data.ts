import type { Icon } from "@phosphor-icons/react";
import {
  BoneIcon,
  AmbulanceIcon,
  BarbellIcon,
  KnifeIcon,
  HandHeartIcon,
  SparkleIcon,
  PulseIcon,
  HeartbeatIcon,
  SunIcon,
  EarIcon,
  WindIcon,
  ForkKnifeIcon,
  DropIcon,
  BrainIcon,
  FlowerLotusIcon,
  StethoscopeIcon,
  BabyCarriageIcon,
  BabyIcon,
  TestTubeIcon,
  ScanIcon,
} from "@phosphor-icons/react/dist/ssr";

export type Doctor = { name: string; role: string };
export type TreatmentGroup = { heading?: string; items: string[] };
export type DeptSection = { heading?: string; body: string[] };

export type Department = {
  id: string;
  /** Creative wing name, e.g. "Bone & Beyond". */
  name: string;
  /** Clinical specialty, e.g. "Orthopaedics & Spine Surgery". */
  specialty: string;
  /** Short one-liner shown in the list. */
  tagline: string;
  Icon: Icon;
  sections: DeptSection[];
  treatmentGroups?: TreatmentGroup[];
  doctors?: Doctor[];
};

export const DEPARTMENTS: Department[] = [
  {
    id: "orthopaedics-spine",
    name: "Bone & Beyond",
    specialty: "Orthopaedics & Spine Surgery",
    tagline: "Restoring movement, relieving pain, rebuilding confidence.",
    Icon: BoneIcon,
    sections: [
      {
        heading: "Orthopaedics",
        body: [
          "Movement is more than mobility—it is the freedom to live independently, pursue passions, and enjoy everyday life. At Matru, our Orthopaedics department is dedicated to restoring movement, relieving pain, and helping patients regain confidence after injury, illness, or degenerative joint conditions.",
          "We provide comprehensive care for a wide range of bone, joint, muscle, ligament, and tendon disorders, including fractures, arthritis, sports injuries, deformities, and complex trauma. Every treatment begins with a detailed clinical evaluation, enabling us to develop tailored treatment plans that range from conservative management and minimally invasive procedures to advanced trauma care and joint replacement surgeries.",
          "Supported by cutting-edge technologies such as the OrthoPilot Navigation System and robotic-assisted orthopaedic surgery, our approach combines precision, innovation, and evidence-based medicine to achieve the best possible outcomes while promoting faster recovery and improved function.",
          "Recognising that recovery extends beyond surgery, we work closely with our rehabilitation specialists to help patients rebuild strength, restore mobility, and return to an active, independent lifestyle.",
        ],
      },
      {
        heading: "Spine Surgery",
        body: [
          "A healthy spine forms the foundation of every movement, supporting posture, balance, and overall wellbeing. When spinal conditions interfere with daily activities, timely diagnosis and specialised care can make a significant difference. Our Spine Surgery services focus on relieving pain, restoring spinal function, and helping patients regain confidence in movement.",
          "We diagnose and manage a broad spectrum of spinal disorders, including neck and back pain, slipped discs, spinal stenosis, fractures, deformities, infections, tumours, and nerve compression disorders. Every patient undergoes a comprehensive evaluation to determine the most appropriate treatment, which may include medication, physiotherapy, minimally invasive interventions, or advanced spinal surgery.",
          "Our commitment continues well beyond treatment. Through coordinated rehabilitation and customised recovery programmes, we help patients improve strength, restore flexibility, and return to everyday activities with greater comfort and confidence.",
        ],
      },
    ],
    treatmentGroups: [
      {
        heading: "Orthopaedic Trauma Surgeries",
        items: [
          "Pelvic & Acetabular Fracture Surgery",
          "Hip Fracture Fixation",
          "Periarticular Fracture Fixation",
          "Long Bone Fracture Fixation",
          "Spinal Fracture Fixation",
          "Foot & Ankle, Hand & Wrist Surgery",
          "Large Tendon Ruptures, Tears & Muscle Injuries",
          "Malunion & Nonunion Correction",
          "Bone Infection & Implant-related Complication Management",
        ],
      },
      {
        heading: "Joint Replacement Surgery",
        items: [
          "Total, Partial & Revision Knee Replacement",
          "Hip Replacement & Hip Resurfacing",
          "Computer-Assisted Joint Replacement with Navigation Technology",
          "Hemiarthroplasty",
        ],
      },
      {
        heading: "Sports Injury & Advanced Procedures",
        items: [
          "Comprehensive Rehabilitation & Physiotherapy",
          "Sports Injury Management",
          "Arthroscopic ACL, PCL & PLC Reconstruction",
          "Arthroscopic Meniscal Repair & Meniscectomy",
          "Reverse Shoulder Arthroplasty",
          "Wrist (TFCC) Repair",
          "Cartilage Restoration Procedures",
          "Impingement Syndrome Treatment",
          "Expandable Megaprosthesis for Children",
          "Rotationplasty",
          "Spinal Decompression & Instrumentation",
          "Sequestrectomy",
        ],
      },
      {
        heading: "Non-Surgical Management",
        items: [
          "Non-Surgical Osteoarthritis Management",
          "Viscosupplementation & Intra-Articular Injections",
          "Mesenchymal Stem Cell Therapy",
          "Growth Factor Injections",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Mahendra S.K.M.", role: "Chairman & Chief Orthopaedic Surgeon" },
    ],
  },
  {
    id: "emergency-trauma",
    name: "Rapid Rescue Team",
    specialty: "Emergency & Trauma Care",
    tagline: "Immediate, skilled response when every second counts.",
    Icon: AmbulanceIcon,
    sections: [
      {
        body: [
          "Emergencies demand immediate action, skilled decision-making, and seamless coordination. Our Emergency & Trauma Care department is equipped to respond rapidly to life-threatening injuries and acute medical conditions, providing timely intervention when every second counts.",
          "From road traffic accidents and fractures to cardiac emergencies, stroke, head injuries, burns, poisoning, and multiple trauma, patients receive prompt evaluation, stabilisation, and treatment in a well-equipped emergency setting. Supported by experienced specialists across multiple disciplines, we ensure swift diagnosis, coordinated care, and immediate access to surgical and critical care services whenever required.",
          "Beyond emergency intervention, we ensure continuity of care by seamlessly transitioning patients to the appropriate specialty for surgery, intensive care, rehabilitation, or long-term recovery. Throughout every stage, our priority remains delivering compassionate care while keeping patients and their families informed and reassured.",
        ],
      },
    ],
  },
  {
    id: "physiotherapy-rehab",
    name: "Bounce Back Zone",
    specialty: "Physiotherapy & Rehabilitation Centre",
    tagline: "Rebuilding strength, confidence, and independence.",
    Icon: BarbellIcon,
    sections: [
      {
        body: [
          "Healing is not complete until strength, confidence, and independence are restored. Our Physiotherapy & Rehabilitation Centre is dedicated to helping patients recover from injury, surgery, neurological disorders, sports injuries, and chronic musculoskeletal conditions through condition-specific rehabilitation programmes.",
          "Every rehabilitation plan is carefully designed to address individual recovery goals, combining therapeutic exercise, manual therapy, pain management, balance training, mobility improvement, strength conditioning, and functional rehabilitation. Working collaboratively with orthopaedic surgeons, neurologists, and other specialists, we ensure a smooth transition from treatment to recovery.",
          "Our goal extends beyond relieving pain—we help patients regain confidence in movement, restore independence, and return to work, sports, and everyday activities with improved physical function and long-term wellbeing.",
        ],
      },
    ],
  },
  {
    id: "general-laparoscopic-surgery",
    name: "Cutting Edge Crew",
    specialty: "Laparoscopic & General Surgery",
    tagline: "Modern, minimally invasive surgery built on patient safety.",
    Icon: KnifeIcon,
    sections: [
      {
        body: [
          "Every successful surgery begins with careful planning, clinical expertise, and a commitment to patient safety. Our General Surgery department provides comprehensive surgical care for a wide range of conditions, delivering effective treatment through modern techniques and evidence-based surgical practices.",
          "We manage disorders affecting the gastrointestinal tract, gallbladder, appendix, thyroid, breast, abdominal wall, soft tissues, and other general surgical conditions. Whenever appropriate, minimally invasive laparoscopic procedures are performed to minimise pain, reduce hospital stay, lower the risk of complications, and promote faster recovery.",
          "Care extends far beyond the operating theatre. From thorough pre-operative assessment and patient education to post-operative recovery, follow-up, and multidisciplinary collaboration, every aspect of treatment is designed to ensure safe surgical outcomes and a smooth recovery journey.",
        ],
      },
    ],
  },
  {
    id: "oncology",
    name: "Cancer Crusaders",
    specialty: "Oncology & Oncosurgery",
    tagline: "Comprehensive cancer care with dignity and compassion.",
    Icon: HandHeartIcon,
    sections: [
      {
        body: [
          "A cancer diagnosis affects every aspect of life, making compassionate, coordinated care essential at every stage. Our Oncology department provides comprehensive cancer care through advanced diagnostics, chemotherapy, surgical oncology, preventive screening, and treatment plans tailored to each patient's condition and overall well-being.",
          "Working closely with specialists across multiple disciplines, we focus on delivering evidence-based care that prioritises clinical excellence, patient comfort, and the best possible outcomes from diagnosis through recovery and long-term follow-up.",
        ],
      },
      {
        heading: "Oncare — Comprehensive Cancer Care Wing",
        body: [
          "Oncare is Matru's dedicated Comprehensive Cancer Care Wing, bringing every aspect of cancer care together under one roof. Designed to provide seamless, patient-centred care, Oncare integrates advanced diagnostics, specialised treatments, rehabilitation, and supportive services to ensure continuity throughout the cancer journey.",
          "Beyond treatment, Oncare offers nutritional guidance, pain and symptom management, psychological counselling, patient education, and ongoing support for patients and their families. By combining multidisciplinary expertise with compassionate care, Oncare reflects Matru's commitment to delivering comprehensive cancer care with dignity, excellence, and compassion.",
        ],
      },
    ],
    treatmentGroups: [
      {
        items: [
          "Modified Radical Mastectomy",
          "Comprehensive Onco Surgery",
          "Chemotherapy",
          "Radical Prostatectomy",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Anup", role: "Onco Surgeon" },
      { name: "Dr. Srinivasa", role: "Medical Oncologist" },
      { name: "Dr. Sireesh Kumar C.H.", role: "Medical Oncologist" },
    ],
  },
  {
    id: "plastic-surgery",
    name: "Polish Point",
    specialty: "Aesthetic, Plastic Surgery & Hair Transplantation",
    tagline: "Restoring form, function, and confidence.",
    Icon: SparkleIcon,
    sections: [
      {
        heading: "Aesthetic & Plastic Surgery",
        body: [
          "Enhancing appearance is about more than aesthetics—it is about restoring confidence and improving quality of life. Led by an experienced Plastic Surgeon, we offer curated aesthetic and plastic surgery procedures using advanced techniques that prioritise safety, precision, and natural-looking results. Every treatment is carefully planned to suit each patient's goals while ensuring comfort and long-term satisfaction.",
        ],
      },
      {
        heading: "Reconstructive Surgery",
        body: [
          "Reconstructive surgery helps restore form and function following trauma, burns, congenital conditions, cancer-related procedures, or complex wounds. Using advanced surgical techniques and patient-specific treatment plans, we focus on improving function, promoting healing, and helping patients regain confidence in their everyday lives.",
        ],
      },
      {
        heading: "Hair Transplantation",
        body: [
          "Hair loss can affect confidence at any stage of life. Our Hair Transplantation services provide advanced, minimally invasive solutions tailored to each individual's pattern of hair loss and aesthetic goals. Through meticulous planning and precise techniques, we aim to achieve natural-looking, long-lasting results while ensuring a comfortable treatment experience.",
        ],
      },
    ],
    treatmentGroups: [
      {
        heading: "Aesthetic & Plastic Surgery",
        items: [
          "Rhinoplasty",
          "Breast Augmentation & Breast Reduction",
          "Gynecomastia Surgery",
          "Liposuction & Abdominoplasty (Tummy Tuck)",
          "Facelift",
          "Dermal Fillers",
          "Advanced Laser Procedures",
        ],
      },
      {
        heading: "Reconstructive Surgery",
        items: [
          "Cleft Lip & Cleft Palate Repair",
          "Hand Surgery",
          "Foot Surgery",
          "Reconstruction Following Trauma, Burns & Cancer Surgery",
          "Scar Revision & Soft Tissue Reconstruction",
        ],
      },
      {
        heading: "Hair Restoration",
        items: ["Hair Transplantation"],
      },
      {
        heading: "Pelvic Floor Wellness",
        items: [
          "High-End Kegel Chair Therapy (Non-invasive Pelvic Floor Strengthening)",
        ],
      },
    ],
    doctors: [{ name: "Dr. Shwetha", role: "Plastic Surgeon" }],
  },
  {
    id: "critical-care",
    name: "Critical Care Commandos",
    specialty: "ICU & NICU (Level III)",
    tagline: "Round-the-clock advanced life support for the most critical.",
    Icon: PulseIcon,
    sections: [
      {
        heading: "Critical Care",
        body: [
          "When every second matters, timely intervention and specialised care can make all the difference. Our Intensive Care Unit (ICU) provides round-the-clock monitoring and advanced life support for patients with severe illnesses, major injuries, post-operative complications, and other life-threatening medical conditions.",
          "Equipped with advanced critical care technology and supported by experienced intensivists, skilled nurses, respiratory therapists, and multidisciplinary specialists, our ICU delivers coordinated, evidence-based care tailored to each patient's changing clinical needs. Alongside medical expertise, we believe in keeping families informed through compassionate communication and continuous support throughout the recovery journey.",
        ],
      },
      {
        heading: "Neonatal Intensive Care Unit (Level III NICU)",
        body: [
          "The first days of life are especially critical for newborns requiring specialised medical attention. Our Level III Neonatal Intensive Care Unit (NICU) is equipped to care for premature babies, low birth weight infants, and newborns with complex medical or surgical conditions requiring advanced monitoring and intensive treatment.",
          "Working closely with our Obstetrics and Paediatric teams, the NICU provides comprehensive neonatal care, ensuring seamless support from birth through recovery. Every newborn receives care as unique as they are, in a nurturing environment, while parents are encouraged to remain informed and actively involved throughout their baby's journey.",
        ],
      },
    ],
    treatmentGroups: [
      {
        heading: "Critical Care Services",
        items: [
          "Adult Intensive Care Unit (ICU)",
          "Level III Neonatal Intensive Care Unit (NICU)",
          "Advanced Life Support & Ventilator Care",
          "Post-operative Critical Care",
          "Respiratory Support & Mechanical Ventilation",
          "Sepsis & Multi-Organ Failure Management",
          "Trauma & Emergency Critical Care",
          "Continuous Haemodynamic Monitoring",
        ],
      },
      {
        heading: "Level III NICU Services",
        items: [
          "Care for Premature & Low Birth Weight Babies",
          "Neonatal Surgery Support",
          "Advanced Neonatal Monitoring",
          "Neonatal Respiratory Support",
          "Management of High-Risk Newborns",
          "Family-Centred Neonatal Care",
        ],
      },
    ],
  },
  {
    id: "cardiology",
    name: "Heart Hub",
    specialty: "Cardiology (2D Echo, TMT)",
    tagline: "Preventing, diagnosing, and treating cardiovascular disease.",
    Icon: HeartbeatIcon,
    sections: [
      {
        body: [
          "A healthy heart is the foundation of a healthy life. Our Cardiology department is committed to preventing, diagnosing, and treating cardiovascular conditions through timely intervention, advanced diagnostics, and attentive care, helping patients lead healthier and more active lives.",
          "We provide comprehensive care for a wide range of heart conditions, including hypertension, coronary artery disease, heart rhythm disorders, heart failure, and other cardiovascular diseases. Using modern diagnostic technology and evidence-based treatment, every patient receives an individualised care plan tailored to their medical needs and lifestyle.",
          "Beyond treatment, we emphasise prevention through regular heart health screenings, cardiovascular risk assessments, lifestyle counselling, and ongoing follow-up. By combining clinical expertise with proactive care, we help patients reduce future cardiovascular risks, strengthen heart health, and lead healthier, more active lives.",
        ],
      },
    ],
    treatmentGroups: [
      {
        items: [
          "Cardiac Consultation & Risk Assessment",
          "Electrocardiogram (ECG)",
          "2D Echocardiography",
          "Treadmill Test (TMT)",
          "Hypertension & Heart Failure Management",
          "Coronary Artery Disease Management",
          "Heart Rhythm Disorder Evaluation",
          "Preventive Cardiology & Lifestyle Counselling",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Rohan", role: "Cardiologist" },
      { name: "Dr. Karan Karkera", role: "Cardiologist" },
    ],
  },
  {
    id: "dermatology",
    name: "Department of Dermatology",
    specialty: "Skin, Hair & Nail Care",
    tagline: "Healthy skin, hair, and nails through evidence-based care.",
    Icon: SunIcon,
    sections: [
      {
        body: [
          "Healthy skin reflects overall well-being and contributes to confidence at every stage of life. Led by an experienced Dermatologist, our Dermatology services provide comprehensive care for a wide range of skin, hair, and nail conditions through accurate diagnosis, specialised treatment, and evidence-based care.",
          "From acne, eczema, psoriasis, allergies, pigmentation disorders, hair loss, scalp conditions, and nail disorders to chronic skin diseases, every treatment plan is tailored to the individual's needs, skin type, and lifestyle. Modern diagnostic methods and advanced treatment options help achieve healthy, long-lasting results while prioritising patient comfort and safety.",
          "Beyond treatment, we encourage preventive skincare, early detection, and patient education to help individuals maintain healthy skin and confidently manage their dermatological health.",
        ],
      },
    ],
    doctors: [{ name: "Dr. Pavan Rai", role: "Dermatologist" }],
  },
  {
    id: "ent",
    name: "Department of ENT",
    specialty: "Ear, Nose & Throat",
    tagline: "Restoring hearing, breathing, speech, and balance.",
    Icon: EarIcon,
    sections: [
      {
        body: [
          "Healthy hearing, breathing, speech, and balance are essential to everyday life. Our ENT services provide comprehensive care for conditions affecting the ear, nose, throat, head, and neck, helping patients of all ages regain comfort, confidence, and normal function.",
          "Our services encompass the management of ear infections, hearing impairment, sinus and nasal disorders, allergies, tonsil and adenoid conditions, voice and swallowing disorders, vertigo, and head and neck conditions. Whether the need is medical management or advanced surgical intervention, care is delivered using modern techniques with the goal of relieving symptoms, restoring function, and improving everyday wellbeing.",
          "Prevention is an important part of long-term ENT health. Through early diagnosis, regular evaluations, and patient education, we help individuals minimise complications, preserve healthy hearing, breathing, and communication, and maintain long-term ear, nose, and throat health.",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Kiran", role: "ENT Specialist" },
      { name: "Dr. Pradeep Hosmani", role: "ENT Specialist" },
    ],
  },
  {
    id: "pulmonology",
    name: "Department of Pulmonology",
    specialty: "Lung & Respiratory Care",
    tagline: "Helping patients breathe easier and live more actively.",
    Icon: WindIcon,
    sections: [
      {
        body: [
          "Breathing is something we often take for granted until it becomes difficult. Our Pulmonology services provide comprehensive care for conditions affecting the lungs and respiratory system, helping patients breathe comfortably, improve lung function, and lead healthier, more active lives.",
          "Respiratory conditions can range from short-term infections to complex chronic lung diseases that require specialised, long-term care. Through comprehensive respiratory evaluation, pulmonary function testing, advanced diagnostics, and evidence-based treatment, we focus on improving breathing capacity, relieving symptoms, and optimising lung health while tailoring care to each individual's needs.",
          "Our commitment extends beyond managing respiratory illness. With a focus on pulmonary rehabilitation, smoking cessation, long-term respiratory care, and lifestyle modification, we help individuals breathe easier, build physical endurance, and maintain healthier respiratory function.",
        ],
      },
    ],
    doctors: [{ name: "Dr. Darshan", role: "Pulmonologist" }],
  },
  {
    id: "gastroenterology",
    name: "Department of Gastroenterology",
    specialty: "Digestive & Liver Care",
    tagline: "Restoring healthy digestion and lasting gut wellness.",
    Icon: ForkKnifeIcon,
    sections: [
      {
        body: [
          "A healthy digestive system is essential for overall well-being, influencing nutrition, energy, immunity, and everyday comfort. Our Gastroenterology services provide comprehensive evaluation and treatment for conditions affecting the oesophagus, stomach, intestines, liver, pancreas, gallbladder, and digestive tract.",
          "Digestive symptoms can often be complex, with seemingly unrelated concerns sharing a common underlying cause. Through detailed clinical evaluation, advanced endoscopic procedures, and evidence-based medical care, we focus on identifying the source of digestive problems, relieving symptoms, and restoring healthy digestive function. Whether managing short-term discomfort or long-standing gastrointestinal conditions, care is guided by accuracy, timely intervention, and clinical excellence.",
          "Our goal extends beyond symptom relief. By helping patients regain digestive comfort, improve nutritional health, and return to their daily routines with confidence, we support lasting digestive wellness through compassionate, comprehensive gastrointestinal care.",
        ],
      },
    ],
  },
  {
    id: "urology-nephrology",
    name: "Urine Good Hands",
    specialty: "Urology & Nephrology",
    tagline: "Specialised care for the kidneys and urinary system.",
    Icon: DropIcon,
    sections: [
      {
        heading: "Urology",
        body: [
          "Healthy urinary function contributes significantly to physical comfort, confidence, and long-term wellness. Led by an experienced Urologist, our Urology services provide specialised care for conditions affecting the kidneys, bladder, prostate, urinary tract, and male reproductive system.",
          "From kidney stones and urinary tract disorders to prostate conditions, urinary incontinence, and male reproductive health concerns, every patient receives a thorough evaluation and an individualised treatment plan. Wherever appropriate, minimally invasive and endoscopic procedures are offered to promote faster recovery, minimise discomfort, and achieve the best possible outcomes. Through preventive guidance and regular follow-up, we help patients maintain long-term urinary health and confidence.",
        ],
      },
      {
        heading: "Nephrology",
        body: [
          "Healthy kidneys are vital for maintaining the body's overall balance and wellbeing. Our Nephrology services focus on the early diagnosis, treatment, and long-term management of kidney-related conditions, helping patients preserve kidney function and maintain overall health.",
          "Care is provided for chronic kidney disease, acute kidney injury, diabetic and hypertension-related kidney disorders, electrolyte imbalances, and other renal conditions. Along with evidence-based medical management, we offer dialysis support, dietary counselling, regular kidney health assessments, and patient education to help individuals better understand and manage their condition.",
        ],
      },
    ],
    treatmentGroups: [
      {
        items: [
          "Renal, Ureteric & Bladder Surgery",
          "Scrotal, Testicular & Prostate Surgery",
          "Reconstructive & Functional Urology",
          "Endourology & Stone Management",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Navneeth", role: "Urologist" },
      { name: "Dr. Bhavya R.", role: "Nephrologist" },
      { name: "Dr. Girish", role: "Nephrologist" },
      { name: "Dr. Kallappa", role: "Nephrologist" },
    ],
  },
  {
    id: "neurology-neurosurgery",
    name: "Nerve Nest",
    specialty: "Neurology & Neurosurgery",
    tagline: "Advanced care for the brain, spine, and nervous system.",
    Icon: BrainIcon,
    sections: [
      {
        body: [
          "The brain and nervous system shape every movement, thought, memory, and experience. Our Neurology & Neurosurgery services provide comprehensive care for disorders affecting the brain, spinal cord, and peripheral nerves, combining advanced technology with clinical expertise to help patients restore neurological function and regain independence.",
          "Every neurological condition presents unique challenges that require careful evaluation and a highly individualised approach. From complex neurological disorders to conditions requiring specialised brain and spine surgery, care is guided by advanced imaging, neurophysiological testing, modern medical therapies, and minimally invasive surgical techniques wherever appropriate. Each treatment plan is designed to achieve the best possible neurological outcome while prioritising patient safety and recovery.",
          "Recovery often continues long after treatment. Working closely with rehabilitation specialists and other clinical disciplines, we focus on helping patients restore movement, communication, independence, and confidence, ensuring continued support for both patients and their families throughout the recovery process.",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Srinivas", role: "Neurologist" },
      { name: "Dr. Naveeneth", role: "Neurologist" },
      { name: "Dr. Naresh", role: "Neurologist" },
      { name: "Dr. Adesh", role: "Neurologist" },
    ],
  },
  {
    id: "psychology-psychiatry",
    name: "Mind Garden",
    specialty: "Psychology & Psychiatry",
    tagline: "A safe, confidential space for mental well-being.",
    Icon: FlowerLotusIcon,
    sections: [
      {
        body: [
          "Mental well-being is an essential part of overall health, influencing the way we think, feel, build relationships, and navigate everyday life. Our Psychology & Psychiatry services provide a safe, confidential, and supportive environment where individuals of all ages can seek professional care with dignity, empathy, and respect.",
          "Every individual experiences emotional and mental health challenges differently. Through thoughtful assessment, counselling, psychotherapy, behavioural interventions, and medical management whenever required, care is tailored to each person's unique experiences, goals, and circumstances. Whether facing a temporary life challenge or living with a long-term mental health condition, we are committed to providing compassionate support that promotes healing and personal growth.",
          "Our approach extends beyond managing symptoms. We strive to help individuals strengthen emotional well-being, build healthier coping strategies, improve relationships, and develop the confidence to lead more balanced and fulfilling lives.",
        ],
      },
    ],
    doctors: [
      { name: "Ms. Meghana", role: "Psychologist" },
      { name: "Dr. Sudeepti", role: "Psychiatrist" },
    ],
  },
  {
    id: "general-medicine",
    name: "Department of General Medicine",
    specialty: "Comprehensive Adult Care",
    tagline: "The first point of contact and foundation of lifelong health.",
    Icon: StethoscopeIcon,
    sections: [
      {
        body: [
          "Good health begins with understanding the body's signals and addressing concerns before they become more serious. Our General Medicine department provides comprehensive medical care for individuals of all ages, offering expert evaluation, diagnosis, and treatment for a wide range of acute illnesses, chronic conditions, and everyday health concerns.",
          "As the first point of contact for many medical conditions, our physicians take a holistic approach to care—looking beyond individual symptoms to understand a patient's overall health. By combining clinical expertise with careful assessment, we help identify underlying health concerns, manage multiple medical conditions, and guide patients towards the most appropriate treatment or specialist care whenever required.",
          "Beyond treating illness, General Medicine serves as the foundation of lifelong healthcare. Through regular health evaluations, chronic disease monitoring, preventive healthcare, and continuity of care, we help patients make informed decisions, maintain better health, and build lasting relationships centred on wellness.",
        ],
      },
    ],
    treatmentGroups: [
      {
        items: [
          "General Health Consultation",
          "Diabetes & Hypertension Management",
          "Thyroid Disorder Management",
          "Fever & Infectious Disease Care",
          "Respiratory & Seasonal Illness Management",
          "Preventive Health Check-ups",
          "Adult Vaccination & Preventive Care",
          "Chronic Disease Monitoring & Lifestyle Guidance",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Pallavi", role: "General Physician" },
      { name: "Dr. Bhanushree", role: "General Physician" },
      { name: "Dr. Krishna Rajendra", role: "General Physician" },
      { name: "Dr. Sindhu", role: "General Physician" },
    ],
  },
  {
    id: "obstetrics-gynaecology",
    name: "Bump to Baby Bay",
    specialty: "Obstetrics & Gynaecology",
    tagline: "Personalised care through every stage of a woman's life.",
    Icon: BabyCarriageIcon,
    sections: [
      {
        body: [
          "Women's health is a lifelong journey, with every stage bringing unique needs and milestones. Our Obstetrics & Gynaecology department provides comprehensive, personalised care that supports women through adolescence, reproductive health, pregnancy, menopause, and beyond, empowering them to make informed decisions with confidence.",
        ],
      },
      {
        heading: "Gynaecology",
        body: [
          "Every woman deserves care that is compassionate, respectful, and tailored to her individual needs. Our Gynaecology services focus on the prevention, diagnosis, and treatment of a wide range of conditions, including menstrual disorders, PCOS, fibroids, ovarian cysts, endometriosis, hormonal imbalances, infections, and menopausal concerns.",
          "Using advanced diagnostics, minimally invasive techniques, and customised treatment plans, we strive to improve women's health while promoting long-term wellbeing through preventive care, routine screening, and patient education.",
        ],
      },
      {
        heading: "Obstetrics",
        body: [
          "Pregnancy is a journey filled with anticipation, care, and unforgettable moments. Our Obstetrics services provide comprehensive maternity care from preconception counselling and antenatal care to labour, delivery, postnatal recovery, and newborn support.",
          "Whether caring for routine or high-risk pregnancies, every mother receives personalised attention, continuous monitoring, and compassionate support to ensure a safe pregnancy and a positive birthing experience for both mother and baby.",
        ],
      },
    ],
    treatmentGroups: [
      {
        heading: "Maternity Services",
        items: [
          "Natural Childbirth, Normal Delivery & Caesarean Section",
          "Antenatal Care, Nutritional Guidance & Counselling",
          "High-Risk Pregnancy Management",
          "Water Birth",
          "Garbha Sanskar, Lamaze Classes & Antenatal Yoga",
          "Lactation & Postpartum Support",
          "Pelvic Rehabilitation",
        ],
      },
      {
        heading: "Gynaecological Procedures",
        items: [
          "Hysteroscopic & Laparoscopic Procedures",
          "Myomectomy",
          "Adhesiolysis",
          "Polypectomy",
          "Cu-T / Foreign Body Removal",
          "Septal Resection",
          "Endometriosis Surgery",
          "Laparoscopic Cerclage",
          "Fistula Management",
          "Burch Colposuspension",
          "Laparoscopic Vaginoplasty",
          "Diagnostic Laparoscopy",
          "Hysterectomy",
          "Ovarian Cystectomy",
          "Laparoscopic Tubal Occlusion",
          "Endometrial Ablation",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Poonam Manjunath", role: "Gynaecologist" },
      { name: "Dr. Shankaregowda", role: "Gynaecologist" },
      { name: "Dr. Vasanthi", role: "Gynaecologist" },
      { name: "Dr. Anagha Nawal", role: "IVF Specialist" },
    ],
  },
  {
    id: "paediatrics",
    name: "Little Champs Zone",
    specialty: "Paediatric Super Speciality & Surgery",
    tagline: "Specialised, gentle care for every stage of childhood.",
    Icon: BabyIcon,
    sections: [
      {
        body: [
          "Every child deserves the opportunity to grow, play, and thrive in good health. Our Paediatric Super Speciality & Surgery services provide comprehensive care for newborns, infants, children, and adolescents, supporting every stage of growth with specialised expertise, advanced treatments, and compassionate care.",
        ],
      },
      {
        heading: "Paediatrics",
        body: [
          "Children have unique healthcare needs that require specialised attention and a gentle approach. Our Paediatrics services focus on preventive healthcare, early diagnosis, and the treatment of childhood illnesses, infections, allergies, developmental concerns, and nutritional needs.",
          "From routine health check-ups and immunisations to specialised medical care, every child receives personalised treatment in a safe, welcoming, and child-friendly environment. By working closely with parents and caregivers, we ensure families remain informed, involved, and confident throughout their child's healthcare journey.",
        ],
      },
      {
        heading: "Neonatology",
        body: [
          "The first few days of life are among the most important, especially for newborns who require specialised medical attention. Our Neonatology services provide expert care for premature babies, low birth weight infants, and critically ill newborns through advanced neonatal monitoring and treatment.",
          "Working closely with our Obstetrics team, we ensure seamless care from delivery through recovery, giving every newborn the healthiest possible start while supporting families with compassion, guidance, and reassurance.",
        ],
      },
    ],
    treatmentGroups: [
      {
        items: [
          "Neonatal Intensive Care Unit (NICU)",
          "Paediatric Intensive Care Unit (PICU)",
          "Neonatal Surgery & Neonatology",
          "Paediatric Laparoscopic (Keyhole) Surgery",
          "Paediatric General Surgery",
          "Paediatric Thoracic Surgery",
          "Paediatric Allergy & Pulmonology",
          "Paediatric Urology & Nephrology",
          "Hypospadias Surgery",
          "Paediatric Neurosurgery & Neurorehabilitation",
          "Paediatric ENT & Airway Surgery",
          "Paediatric Oncology & Oncosurgery",
          "Paediatric Plastic Surgery",
          "Paediatric Orthopaedics & Physiotherapy",
          "Paediatric Endocrinology & Disorders of Sexual Development",
          "Paediatric Endoscopy & Colonoscopy",
          "Paediatric Gynaecology",
          "Paediatric Dermatology",
          "Paediatric Genetics",
          "Paediatric Nutrition, Speech & Language Therapy, Occupational Therapy & Behavioural Therapy",
        ],
      },
    ],
    doctors: [
      { name: "Dr. Mahesh", role: "Paediatrician" },
      { name: "Dr. Karthik", role: "Paediatrician" },
    ],
  },
  {
    id: "laboratory",
    name: "The Decode Lab",
    specialty: "24/7 On-site Laboratory",
    tagline: "Fast, dependable diagnostics around the clock.",
    Icon: TestTubeIcon,
    sections: [
      {
        body: [
          "Accurate diagnosis begins with reliable laboratory testing. Our 24/7 On-site Haematology Laboratory provides comprehensive diagnostic services that support clinicians in identifying, monitoring, and managing a wide range of medical conditions with speed and precision.",
          "From routine blood investigations to specialised haematological testing, our laboratory plays a vital role in the detection of infections, anaemia, bleeding and clotting disorders, blood cancers, metabolic conditions, and other systemic diseases. Equipped with advanced laboratory technology and supported by stringent quality control measures, we deliver timely, dependable results that enable informed clinical decisions and seamless patient care across every specialty.",
        ],
      },
    ],
    doctors: [{ name: "Dr. Sunil Prabhakar", role: "Haematologist" }],
  },
  {
    id: "radiology",
    name: "Vision Matrix",
    specialty: "Radiology (3D Ultrasound & Colour Doppler)",
    tagline: "High-quality imaging from early detection to follow-up.",
    Icon: ScanIcon,
    sections: [
      {
        body: [
          "Medical imaging plays a crucial role in understanding the body's internal health, enabling clinicians to diagnose conditions accurately and plan the most appropriate course of treatment. Our Radiology department provides comprehensive imaging services that support every stage of patient care—from early detection and diagnosis to treatment planning and follow-up.",
          "Equipped with advanced imaging technology, including Digital X-ray, Ultrasound, 3D/4D Ultrasound, Colour Doppler, CT, MRI, and specialised diagnostic imaging, we deliver high-quality, detailed imaging with a strong emphasis on precision and patient safety. Every examination is performed with clinical accuracy, helping physicians make timely, informed decisions while ensuring a comfortable experience for patients of all ages.",
        ],
      },
    ],
    treatmentGroups: [
      {
        heading: "Imaging Services",
        items: [
          "Digital X-ray",
          "Ultrasound",
          "3D/4D Ultrasound",
          "Colour Doppler",
          "CT Scan",
          "MRI",
          "Specialised Diagnostic Imaging",
        ],
      },
    ],
    doctors: [{ name: "Dr. Sachin", role: "Radiologist" }],
  },
];
