export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  detailImage: string;
  contentHtml: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Achieving GLOBAL G.A.P. Certification: A Commitment to Safe, Sustainable, and High-Quality Agriculture",
    description: "We are proud to announce that our company has successfully achieved the GLOBAL G.A.P. certification.",
    category: "Research & Trials",
    date: "Mar 12, 2026",
    image: "/images/news/news-card-3.png",
    detailImage: "/images/news/article-detail-3.png",
    author: {
      name: "Md. Rafiqul Islam",
      role: "Supply Chain Manager",
      avatar: "/images/news/rafiqul-islam.png"
    },
    contentHtml: `
      <h3>Achievement Announcement: GLOBAL G.A.P. Certification</h3>
      <p>We are proud to announce that our company has successfully achieved the GLOBAL G.A.P. (Good Agricultural Practices) certification. This internationally recognized standard reflects our strong commitment to producing safe, high-quality agricultural products while upholding environmentally responsible and socially sustainable farming practices.</p>

      <h3>Comprehensive Certification Process</h3>
      <p>The certification process involved a thorough and detailed audit of our farming operations, including:</p>
      <ul>
        <li>Crop production practices</li>
        <li>Worker health and safety</li>
        <li>Environmental management systems</li>
        <li>Traceability procedures</li>
        <li>Quality control measures</li>
      </ul>
      <p>Meeting these rigorous requirements confirms that our products comply with global food safety standards and recognized best agricultural practices.</p>

      <h3>Strengthening Market Credibility</h3>
      <p>Achieving GLOBAL G.A.P. certification significantly enhances our credibility in both local and international markets. It provides strong assurance to our customers, partners, and stakeholders that our products are cultivated, handled, and delivered under strict safety and sustainability guidelines.</p>

      <h3>Commitment to Quality and Responsibility</h3>
      <p>This certification reinforces our dedication to:</p>
      <ul>
        <li>Ensuring food safety and product quality</li>
        <li>Protecting the environment</li>
        <li>Promoting responsible farming practices</li>
        <li>Safeguarding worker welfare</li>
      </ul>

      <h3>Looking Ahead: Continuous Improvement</h3>
      <p>This achievement marks an important milestone in our ongoing journey toward excellence, innovation, and responsible agriculture. We remain committed to maintaining these high standards and continuously improving our processes to better serve our customers with integrity and quality.</p>

      <h3>GLOBAL G.A.P. Certified Crops Portfolio</h3>
      <p>As part of our GLOBALG.A.P. certified operations, we proudly cultivate a diverse range of vegetables and fruits under Malik’s Project Farmers and Malik’s Farm.</p>

      <h3>GAP Certified Vegetables</h3>
      <p>Our certified vegetable production includes:</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <ul>
          <li>Potato</li>
          <li>Tomato</li>
          <li>Cabbage</li>
          <li>Cauliflower</li>
          <li>Cucumber</li>
          <li>Pumpkin</li>
          <li>Broccoli</li>
          <li>Eggplant (Brinjal)</li>
          <li>Capsicum (Pepper/Chilli)</li>
          <li>Ivy Gourd (Pointed Gourd)</li>
          <li>Asparagus (Yard Long Bean)</li>
        </ul>
        <ul>
          <li>Taro (Taro Root)</li>
          <li>Bottle Gourd</li>
          <li>Ash Gourd</li>
          <li>Ridge Gourd</li>
          <li>Snake Gourd</li>
          <li>Sponge Gourd</li>
          <li>Bitter Melon</li>
          <li>Okra</li>
          <li>Arum Lobe</li>
          <li>Papaya</li>
        </ul>
      </div>

      <h3>GAP Certified Fruits</h3>
      <p>Our certified fruit production includes:</p>
      <ul>
        <li>Mango</li>
        <li>Watermelon</li>
      </ul>

      <h3>Commitment to Quality and Diversity</h3>
      <p>This wide range of certified crops reflects our dedication to sustainable farming, food safety, and delivering fresh, high-quality produce to our customers. Each product is cultivated following strict GLOBAL G.A.P. standards, ensuring traceability, environmental care, and responsible agricultural practices.</p>
    `
  },
  {
    id: 2,
    title: "New Hybrid Cabbage Variety Shows Strong Performance in Field Trials",
    description: "A new hybrid cabbage variety being tested by Malik Seeds has demonstrated strong resistance to black rot and high yield potential in recent trials.",
    category: "Research & Trials",
    date: "Mar 08, 2026",
    image: "/images/news/news-card-2.png",
    detailImage: "/images/news/article-detail-2.png",
    contentHtml: `
      <p>Recent harvest results from our northern trial sites have confirmed the exceptional performance of our upcoming hybrid cabbage variety. Developed to withstand changing weather patterns, this variety is poised to become a staple for commercial growers.</p>

      <h3>Exceptional Disease Resistance</h3>
      <p>One of the primary challenges cabbage growers face is black rot, which can devastate entire crops during warm, humid spells. In side-by-side trials with standard varieties, our new hybrid demonstrated a 90% reduction in disease incidence, ensuring reliable yields for farmers.</p>

      <h3>Uniform Head Development and Long Shelf Life</h3>
      <p>Market buyers value uniformity and shelf stability. The new hybrid produces extremely uniform, compact heads weighing between 1.8 to 2.2 kg, which is the preferred size for local markets. Furthermore, its thick wrapper leaves provide natural protection during transport, reducing post-harvest losses.</p>

      <p>Commercial seed availability is planned for the upcoming sowing season. Our distribution partners will be stocked with trial packets and detailed cultivation guidelines to help growers get the best results from day one.</p>
    `
  },
  {
    id: 3,
    title: "Strengthening Seed Research Through Global Collaboration",
    description: "Malik Seeds continues its long-standing collaboration with international seed research organizations to introduce climate-resilient crop varieties.",
    category: "Partnerships",
    date: "Feb 28, 2026",
    image: "/images/news/news-card-3.png",
    detailImage: "/images/news/article-detail-3.png",
    contentHtml: `
      <p>In our ongoing effort to combat the challenges of climate change in agriculture, Malik Seeds has expanded its research partnerships with leading international seed science organizations. This collaboration aims to accelerate the breeding and distribution of climate-resilient vegetables.</p>

      <h3>Accessing Global Genetic Resource Pools</h3>
      <p>Through these partnerships, our local research team gets access to diverse germplasm collections. This enables us to cross-breed for traits like heat tolerance, drought resilience, and salinity tolerance, which are becoming increasingly critical for coastal and northern agricultural zones.</p>

      <h3>Joint Field Trials and Knowledge Exchange</h3>
      <p>The collaboration includes regular visits from international experts and joint field evaluations. By matching global breeding technologies with our extensive local trialing network, we reduce the time it takes to develop a new commercial hybrid from ten years down to six.</p>

      <p>We believe that global scientific exchange is key to securing food production in the face of environmental shifts. We will continue to bring the world's best agricultural innovations directly to the hands of Bangladeshi farmers.</p>
    `
  },
  {
    id: 4,
    title: "From Trial Plot to Market Success: A Farmer’s Journey with Malik Seeds",
    description: "A farmer from Bogura recently reported significantly improved yields and higher profits after transitioning to Malik Seeds' hybrid varieties.",
    category: "Farmer Stories",
    date: "Feb 15, 2026",
    image: "/images/news/news-card-4.png",
    detailImage: "/images/news/news-card-4.png",
    contentHtml: `
      <p>Transitioning from traditional seed varieties to modern hybrids can be a daunting step for smallholder farmers. However, the story of Md. Abdur Rahman from Bogura illustrates the transformative power of quality genetics combined with technical support.</p>

      <h3>Making the Switch</h3>
      <p>Faced with declining yields and rising pest problems, Abdur decided to dedicate half of his two-acre farm to Malik Seeds' hybrid cucumber varieties. Under the guidance of our local field representative, he adopted modern mulching and drip irrigation practices.</p>

      <h3>Record Harvesting and Profitability</h3>
      <p>The results exceeded expectations. Abdur harvested 30% more marketable cucumbers compared to his previous seasons, fetching premium prices at the local wholesale market due to their uniform size and bright green color.</p>

      <blockquote>
        "The support from the Malik Seeds team was invaluable. They didn't just sell me seeds; they taught me how to grow them for maximum success."
        <cite>- Md. Abdur Rahman, Bogura</cite>
      </blockquote>

      <p>Abdur's success has inspired neighboring farmers to adopt hybrid seeds and modern management practices, starting a positive wave of agricultural modernization in his village.</p>
    `
  },
  {
    id: 5,
    title: "Using Data and Field Insights to Improve Seed Selection",
    description: "Agronomists at Malik Seeds are integrating structured field data collection into their selection processes to better support regional farming needs.",
    category: "Innovation",
    date: "Jan 22, 2026",
    image: "/images/news/news-card-5.png",
    detailImage: "/images/news/news-card-5.png",
    contentHtml: `
      <p>Data is transforming how we select and recommend seed varieties. At Malik Seeds, we are leveraging digital tools to collect, analyze, and apply field performance data across different climatic zones.</p>

      <h3>Digital Field Scouting</h3>
      <p>Our field agronomists are now equipped with mobile data collection tools. During field visits, they log crop stages, pest levels, and weather data directly into a centralized database. This provides our breeding team with real-time insights into how varieties perform in diverse microclimates.</p>

      <h3>Predictive Recommendations for Farmers</h3>
      <p>By analyzing multiple years of trial data, we can match specific seed varieties to regional soil types and weather forecasts. This takes the guesswork out of seed selection, allowing us to recommend the highest-performing varieties for each district.</p>

      <p>This data-driven approach ensures that our research budget is spent on solving the most pressing problems faced by real farmers in the field.</p>
    `
  },
  {
    id: 6,
    title: "Supporting Local Farming Communities",
    description: "Malik Seeds regularly organizes community discussions and training events to help smallholders adapt to changing climatic conditions and market demands.",
    category: "Community Programs",
    date: "Jan 10, 2026",
    image: "/images/news/news-card-6.png",
    detailImage: "/images/news/news-card-6.png",
    contentHtml: `
      <p>Strong communities are the foundation of sustainable agriculture. At Malik Seeds, we run dedicated community outreach programs designed to foster knowledge sharing and collaborative problem-solving among smallholders.</p>

      <h3>Farmers' Forums and Discussion Circles</h3>
      <p>We organize regular local forums where farmers can meet, share their successes and challenges, and seek advice from guest experts. These forums help disseminate local solutions to common problems like water scarcity and pest outbreaks.</p>

      <h3>Empowering Women in Agriculture</h3>
      <p>Our programs place a strong emphasis on training women farmers, who play an essential but often underrepresented role in crop management. Special workshops focus on seedling nursing, seed storage, and home gardening for nutrition and supplementary income.</p>

      <p>By investing in the social fabric of rural farming communities, we ensure that agricultural development is inclusive, equitable, and sustainable for generations to come.</p>
    `
  },
  {
    id: 7,
    title: "Strengthening Seed Research Through Global Collaboration",
    description: "Malik Seeds continues its long-standing collaboration with international seed research organizations to introduce climate-resilient crop varieties.",
    category: "Partnerships",
    date: "Feb 28, 2026",
    image: "/images/news/news-card-3.png",
    detailImage: "/images/news/article-detail-3.png",
    contentHtml: `
      <p>In our ongoing effort to combat the challenges of climate change in agriculture, Malik Seeds has expanded its research partnerships with leading international seed science organizations. This collaboration aims to accelerate the breeding and distribution of climate-resilient vegetables.</p>

      <h3>Accessing Global Genetic Resource Pools</h3>
      <p>Through these partnerships, our local research team gets access to diverse germplasm collections. This enables us to cross-breed for traits like heat tolerance, drought resilience, and salinity tolerance, which are becoming increasingly critical for coastal and northern agricultural zones.</p>

      <h3>Joint Field Trials and Knowledge Exchange</h3>
      <p>The collaboration includes regular visits from international experts and joint field evaluations. By matching global breeding technologies with our extensive local trialing network, we reduce the time it takes to develop a new commercial hybrid from ten years down to six.</p>

      <p>We believe that global scientific exchange is key to securing food production in the face of environmental shifts. We will continue to bring the world's best agricultural innovations directly to the hands of Bangladeshi farmers.</p>
    `
  },
  {
    id: 8,
    title: "From Trial Plot to Market Success: A Farmer’s Journey with Malik Seeds",
    description: "A farmer from Bogura recently reported significantly improved yields and higher profits after transitioning to Malik Seeds' hybrid varieties.",
    category: "Farmer Stories",
    date: "Feb 15, 2026",
    image: "/images/news/news-card-4.png",
    detailImage: "/images/news/news-card-4.png",
    contentHtml: `
      <p>Transitioning from traditional seed varieties to modern hybrids can be a daunting step for smallholder farmers. However, the story of Md. Abdur Rahman from Bogura illustrates the transformative power of quality genetics combined with technical support.</p>

      <h3>Making the Switch</h3>
      <p>Faced with declining yields and rising pest problems, Abdur decided to dedicate half of his two-acre farm to Malik Seeds' hybrid cucumber varieties. Under the guidance of our local field representative, he adopted modern mulching and drip irrigation practices.</p>

      <h3>Record Harvesting and Profitability</h3>
      <p>The results exceeded expectations. Abdur harvested 30% more marketable cucumbers compared to his previous seasons, fetching premium prices at the local wholesale market due to their uniform size and bright green color.</p>

      <blockquote>
        "The support from the Malik Seeds team was invaluable. They didn't just sell me seeds; they taught me how to grow them for maximum success."
        <cite>- Md. Abdur Rahman, Bogura</cite>
      </blockquote>

      <p>Abdur's success has inspired neighboring farmers to adopt hybrid seeds and modern management practices, starting a positive wave of agricultural modernization in his village.</p>
    `
  },
  {
    id: 9,
    title: "Using Data and Field Insights to Improve Seed Selection",
    description: "Agronomists at Malik Seeds are integrating structured field data collection into their selection processes to better support regional farming needs.",
    category: "Innovation",
    date: "Jan 22, 2026",
    image: "/images/news/news-card-5.png",
    detailImage: "/images/news/news-card-5.png",
    contentHtml: `
      <p>Data is transforming how we select and recommend seed varieties. At Malik Seeds, we are leveraging digital tools to collect, analyze, and apply field performance data across different climatic zones.</p>

      <h3>Digital Field Scouting</h3>
      <p>Our field agronomists are now equipped with mobile data collection tools. During field visits, they log crop stages, pest levels, and weather data directly into a centralized database. This provides our breeding team with real-time insights into how varieties perform in diverse microclimates.</p>

      <h3>Predictive Recommendations for Farmers</h3>
      <p>By analyzing multiple years of trial data, we can match specific seed varieties to regional soil types and weather forecasts. This takes the guesswork out of seed selection, allowing us to recommend the highest-performing varieties for each district.</p>

      <p>This data-driven approach ensures that our research budget is spent on solving the most pressing problems faced by real farmers in the field.</p>
    `
  },
  {
    id: 10,
    title: "Supporting Local Farming Communities",
    description: "Malik Seeds regularly organizes community discussions and training events to help smallholders adapt to changing climatic conditions and market demands.",
    category: "Community Programs",
    date: "Jan 10, 2026",
    image: "/images/news/news-card-6.png",
    detailImage: "/images/news/news-card-6.png",
    contentHtml: `
      <p>Strong communities are the foundation of sustainable agriculture. At Malik Seeds, we run dedicated community outreach programs designed to foster knowledge sharing and collaborative problem-solving among smallholders.</p>

      <h3>Farmers' Forums and Discussion Circles</h3>
      <p>We organize regular local forums where farmers can meet, share their successes and challenges, and seek advice from guest experts. These forums help disseminate local solutions to common problems like water scarcity and pest outbreaks.</p>

      <h3>Empowering Women in Agriculture</h3>
      <p>Our programs place a strong emphasis on training women farmers, who play an essential but often underrepresented role in crop management. Special workshops focus on seedling nursing, seed storage, and home gardening for nutrition and supplementary income.</p>

      <p>By investing in the social fabric of rural farming communities, we ensure that agricultural development is inclusive, equitable, and sustainable for generations to come.</p>
    `
  },
  {
    id: 11,
    title: "Empowering Farmers Through Practical Field Training",
    description: "Participants learned modern crop management techniques, pest monitoring, and safe pesticide usage to improve crop yields.",
    category: "Farmer Stories",
    date: "Mar 12, 2026",
    image: "/images/news/news-card-1.png",
    detailImage: "/images/news/article-detail-1.png",
    contentHtml: `
      <p>We are proud to share the success of our recent field training programs. Over the past month, we have conducted hands-on sessions for local growers, focusing on practical techniques that directly translate to higher profitability and healthier crops.</p>
      
      <h3>Hands-On Learning in the Field</h3>
      <p>The core philosophy of our training sessions is "learning by doing." Farmers gathered in active trial plots to observe crop behaviors, identify early signs of nutrient deficiencies, and practice diagnostic methods under the guidance of our senior agronomists.</p>
      
      <blockquote>
        "Seeing the differences in root structure and plant vigor firsthand helped me understand why proper soil prep and seed spacing make such a big impact on final yield."
        <cite>- Local Grower, Bogura District</cite>
      </blockquote>

      <h3>Key Training Modules Covered</h3>
      <ul>
        <li><strong>Soil Preparation & pH Management:</strong> Understanding optimal soil conditions for vegetable cultivation.</li>
        <li><strong>Integrated Pest Management (IPM):</strong> Employing biological and mechanical controls to minimize chemical interventions.</li>
        <li><strong>Irrigation Efficiency:</strong> Scheduling water delivery to match specific growth phases and prevent root diseases.</li>
      </ul>

      <p>Malik Seeds remains committed to empowering farming communities across the nation. By providing both elite genetics and the knowledge required to cultivate them successfully, we ensure a prosperous future for agricultural families.</p>
    `
  }
];
