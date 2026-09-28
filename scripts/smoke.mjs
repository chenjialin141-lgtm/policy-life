// src/data/president.ts
function initialPState(diff) {
  const base = {
    year: 1,
    term: 1,
    population: 2300,
    gdp: 5e3,
    growth: 2.5,
    inflation: 2.3,
    unemployment: 4.5,
    revenue: 1e3,
    fixedSpending: 610,
    // 不含債務利息；利息每年動態加計
    discretionary: 300,
    allocated: 0,
    spending: 950,
    debt: 3e3,
    interest: 90,
    interestRate: 3,
    defense: 60,
    education: 62,
    healthcare: 60,
    welfare: 58,
    housing: 50,
    energy: 65,
    trade: 0,
    inequality: 38,
    housingPrice: 100,
    approval: 55,
    socialTrust: 65,
    politicalStability: 70,
    adminCapacity: 75,
    politicalCapital: 60,
    govSupport: 58,
    opposition: 42,
    gameOver: false,
    reelected: false
  };
  if (diff === "easy") {
    base.discretionary = 380;
    base.debt = 2200;
    base.interestRate = 2.6;
    base.interest = 57;
    base.approval = 60;
    base.socialTrust = 70;
    base.politicalStability = 76;
  } else if (diff === "hard") {
    base.discretionary = 240;
    base.debt = 3800;
    base.interestRate = 3.6;
    base.interest = 137;
    base.inflation = 3.4;
    base.unemployment = 5.6;
    base.approval = 48;
    base.opposition = 52;
  } else if (diff === "extreme") {
    base.discretionary = 170;
    base.debt = 4600;
    base.interestRate = 4.4;
    base.interest = 202;
    base.inflation = 4.6;
    base.unemployment = 6.8;
    base.socialTrust = 55;
    base.politicalStability = 58;
    base.approval = 42;
    base.opposition = 58;
    base.adminCapacity = 66;
  }
  return base;
}
var budgetBuckets = [
  { id: "b_education", name: "\u6559\u80B2\u9810\u7B97", desc: "\u64F4\u7DE8\u6559\u5E2B\u3001\u6559\u5B78\u8207\u9AD8\u6559\u8CC7\u6E90\uFF0C\u9577\u671F\u63D0\u5347\u4EBA\u529B\u7D20\u8CEA\u8207\u751F\u7522\u529B", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 60, duration: "permanent", tags: ["\u9577\u671F"], effects: { education: 5, growth: 0.15, adminCapacity: 1, approval: 1 }, stakeholders: { students: 2, youth: 1, middle: 1 } },
  { id: "b_healthcare", name: "\u91AB\u7642\u9810\u7B97", desc: "\u64F4\u5145\u91AB\u7642\u9662\u6240\u3001\u9577\u7167\u8207\u516C\u5171\u885B\u751F\u91CF\u80FD", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 55, duration: "permanent", tags: ["\u9577\u671F"], effects: { healthcare: 5, socialTrust: 1.5, approval: 1 }, stakeholders: { elderly: 2, lowIncome: 2, middle: 1 } },
  { id: "b_welfare", name: "\u793E\u6703\u798F\u5229", desc: "\u73FE\u91D1\u88DC\u52A9\u3001\u5F31\u52E2\u6276\u52A9\u8207\u751F\u6D3B\u6D25\u8CBC\uFF0C\u7E2E\u5C0F\u8CA7\u5BCC\u5DEE\u8DDD", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 50, duration: "permanent", effects: { welfare: 5, inequality: -2.5, growth: 0.1, approval: 2 }, stakeholders: { lowIncome: 3, elderly: 2, labor: 1 } },
  { id: "b_defense", name: "\u570B\u9632\u9810\u7B97", desc: "\u63D0\u5347\u570B\u9632\u88DD\u5099\u3001\u4EBA\u54E1\u8207\u81EA\u4E3B\u9632\u885B\u80FD\u529B", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 70, duration: "permanent", effects: { defense: 6, politicalStability: 1, trade: -0.1 }, stakeholders: { centralGov: 2, highIncome: 1 } },
  { id: "b_housing", name: "\u793E\u6703\u4F4F\u5B85", desc: "\u8208\u5EFA\u793E\u6703\u4F4F\u5B85\u8207\u79DF\u5C4B\u5354\u52A9\uFF0C\u58D3\u6291\u623F\u50F9\u3001\u7167\u9867\u79DF\u5C4B\u65CF", category: "\u9810\u7B97\u5206\u914D", cost: 120, recurring: 30, duration: "permanent", tags: ["\u571F\u5730", "\u591A\u5E74"], required: { budget: 150, admin: 8, land: 3 }, effects: { housing: 6, housingPrice: -7, approval: 2.5, politicalCapital: -2 }, stakeholders: { renters: 3, youth: 2, landlords: -2, lowIncome: 2 } },
  { id: "b_energy", name: "\u80FD\u6E90\u5EFA\u8A2D", desc: "\u80FD\u6E90\u57FA\u790E\u8A2D\u65BD\u8207\u88DC\u8CBC\uFF0C\u7A69\u5B9A\u4F9B\u96FB\u3001\u6291\u5236\u80FD\u6E90\u7269\u50F9", category: "\u9810\u7B97\u5206\u914D", cost: 60, recurring: 45, duration: "permanent", tags: ["\u80FD\u6E90"], required: { budget: 105, energy: 2 }, effects: { energy: 6, inflation: -0.35, growth: 0.1 }, stakeholders: { business: 1, middle: 1 } },
  { id: "b_infra", name: "\u516C\u5171\u5EFA\u8A2D", desc: "\u4EA4\u901A\u3001\u6C34\u5229\u8207\u516C\u5171\u5DE5\u7A0B\uFF0C\u5275\u9020\u5C31\u696D\u4E26\u5E36\u52D5\u6295\u8CC7", category: "\u9810\u7B97\u5206\u914D", cost: 100, recurring: 10, duration: "permanent", tags: ["\u591A\u5E74"], required: { budget: 110, admin: 6 }, effects: { growth: 0.5, unemployment: -0.5, adminCapacity: 1 }, stakeholders: { labor: 2, business: 1, localGov: 2 } }
];
var presidentPolicies = [
  { id: "p_minwage_up", name: "\u63D0\u9AD8\u57FA\u672C\u5DE5\u8CC7", desc: "\u8ABF\u9AD8\u57FA\u672C\u5DE5\u8CC7\uFF0C\u589E\u52A0\u52DE\u5DE5\u6240\u5F97\u4F46\u63D0\u9AD8\u4F01\u696D\u6210\u672C", category: "\u52DE\u52D5", cost: 0, recurring: 0, duration: "permanent", effects: { unemployment: 0.7, inflation: 0.45, inequality: -2, growth: 0.1, approval: 1.5 }, stakeholders: { labor: 2, youth: 1, business: -2, lowIncome: 2 } },
  { id: "p_labor_dereg", name: "\u9B06\u7D81\u52DE\u52D5\u6CD5\u898F", desc: "\u653E\u5BEC\u5DE5\u6642\u8207\u8058\u50F1\u9650\u5236\uFF0C\u63D0\u5347\u4F01\u696D\u5F48\u6027\u8207\u6295\u8CC7\u610F\u9858", category: "\u52DE\u52D5", cost: 0, recurring: 0, duration: "permanent", effects: { unemployment: -0.6, growth: 0.2, inequality: 1.5, socialTrust: -1 }, stakeholders: { business: 2, labor: -2, youth: -1 } },
  { id: "p_corptax_cut", name: "\u964D\u4F4E\u4F01\u696D\u7A05", desc: "\u8ABF\u964D\u71DF\u5229\u4E8B\u696D\u6240\u5F97\u7A05\uFF0C\u5438\u5F15\u6295\u8CC7\u3001\u5275\u9020\u5C31\u696D", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: -70, growth: 0.35, unemployment: -0.4, inequality: 1 }, stakeholders: { business: 3, investors: 2, highIncome: 1 } },
  { id: "p_corptax_zero", name: "\u53D6\u6D88\u4F01\u696D\u6240\u5F97\u7A05", desc: "\u5B8C\u5168\u53D6\u6D88\u71DF\u6240\u7A05\uFF08\u6975\u7AEF\uFF09\uFF1A\u5927\u5E45\u523A\u6FC0\u6295\u8CC7\u4F46\u56B4\u91CD\u524A\u6E1B\u6536\u5165", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", tags: ["\u6975\u7AEF"], effects: { revenue: -180, growth: 0.6, unemployment: -0.8, inequality: 4, approval: -2, politicalCapital: -3 }, stakeholders: { business: 3, investors: 3, lowIncome: -2, labor: -1 } },
  { id: "p_corptax_up", name: "\u63D0\u9AD8\u4F01\u696D\u7A05", desc: "\u8ABF\u9AD8\u71DF\u6240\u7A05\u589E\u52A0\u5EAB\u6536\uFF0C\u4F46\u53EF\u80FD\u58D3\u6291\u6295\u8CC7", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: 70, growth: -0.25, unemployment: 0.3, approval: -1 }, stakeholders: { business: -3, investors: -2, lowIncome: 1 } },
  { id: "p_incometax_up", name: "\u63D0\u9AD8\u9AD8\u6240\u5F97\u7A05", desc: "\u5C0D\u9AD8\u6240\u5F97\u65CF\u7FA4\u52A0\u7A05\uFF0C\u6539\u5584\u5206\u914D\u3001\u589E\u52A0\u6536\u5165", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: 50, inequality: -2, growth: -0.05 }, stakeholders: { highIncome: -3, lowIncome: 2, middle: 1 } },
  { id: "p_bonds", name: "\u767C\u884C\u653F\u5E9C\u516C\u50B5", desc: "\u8209\u50B5 200 \u5104\u652F\u61C9\u5EFA\u8A2D\u8207\u652F\u51FA\uFF0C\u660E\u5E74\u8D77\u5229\u606F\u4E0A\u5347", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "instant", tags: ["\u501F\u6B3E"], effects: { debtNow: 200, interestRate: 0.2, politicalCapital: -1 }, stakeholders: { investors: 1, centralGov: 1 } },
  { id: "p_bonds_huge", name: "\u5927\u91CF\u767C\u884C\u570B\u50B5", desc: "\u4E00\u53E3\u6C23\u8209\u50B5 600 \u5104\uFF08\u6975\u7AEF\uFF09\uFF0C\u77ED\u671F\u5BEC\u9B06\u4F46\u50B5\u52D9\u8207\u5229\u606F\u66B4\u589E", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "instant", tags: ["\u6975\u7AEF", "\u501F\u6B3E"], effects: { debtNow: 600, interestRate: 0.7, politicalStability: -2, politicalCapital: -4 }, stakeholders: { investors: -1, business: -1, centralGov: 1 } },
  { id: "p_austerity", name: "\u51CD\u7D50\u4E26\u522A\u6E1B\u9810\u7B97", desc: "\u6499\u7BC0 60 \u5104\u5E38\u614B\u652F\u51FA\uFF0C\u6539\u5584\u8CA1\u653F\u4F46\u58D3\u7E2E\u670D\u52D9\u8207\u6C11\u5FC3", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: -60, duration: "permanent", tags: ["\u6499\u7BC0"], effects: { welfare: -4, healthcare: -2, education: -2, approval: -3, socialTrust: -2, unemployment: 0.4 }, stakeholders: { lowIncome: -2, elderly: -2, labor: -1, business: 1, centralGov: -1 } },
  { id: "p_rent_control", name: "\u5BE6\u65BD\u623F\u79DF\u7BA1\u5236", desc: "\u9650\u5236\u79DF\u91D1\u6F32\u5E45\uFF0C\u7ACB\u5373\u6E1B\u8F15\u79DF\u5C4B\u8CA0\u64D4\uFF0C\u4F46\u53EF\u80FD\u6E1B\u5C11\u79DF\u5C4B\u4F9B\u7D66", category: "\u4F4F\u5B85", cost: 0, recurring: 0, duration: "permanent", effects: { housingPrice: -5, housing: -2, approval: 1.5 }, stakeholders: { renters: 3, youth: 2, landlords: -3, business: -1 } },
  { id: "p_green", name: "\u5927\u898F\u6A21\u7DA0\u80FD\u8F49\u578B", desc: "\u91CD\u91D1\u6295\u5165\u518D\u751F\u80FD\u6E90\uFF0C\u77ED\u671F\u6602\u8CB4\u3001\u9577\u671F\u58D3\u4F4E\u78B3\u6392\u8207\u80FD\u6E90\u9032\u53E3", category: "\u80FD\u6E90\u74B0\u5883", cost: 150, recurring: 40, duration: "permanent", tags: ["\u9577\u671F", "\u80FD\u6E90"], required: { budget: 190, admin: 6, energy: 3 }, effects: { energy: 8, inflation: -0.2, growth: 0.15, politicalCapital: -2 }, stakeholders: { youth: 2, students: 1, business: -1, landlords: 0 } },
  { id: "p_subsidy_industry", name: "\u7522\u696D\u62DB\u5546\u88DC\u8CBC", desc: "\u88DC\u8CBC\u91CD\u9EDE\u7522\u696D\u9032\u99D0\uFF0C\u5E36\u52D5\u6295\u8CC7\u8207\u5C31\u696D", category: "\u7522\u696D", cost: 80, recurring: 0, duration: "instant", required: { budget: 80 }, effects: { growth: 0.4, unemployment: -0.5, trade: 0.2 }, stakeholders: { business: 2, labor: 1, localGov: 1 } },
  { id: "p_public_jobs", name: "\u64F4\u5927\u516C\u5171\u50F1\u50AD", desc: "\u653F\u5E9C\u589E\u8058\u4EBA\u529B\uFF0C\u964D\u4F4E\u5931\u696D\u4F46\u589E\u52A0\u9577\u671F\u4EBA\u4E8B\u8CA0\u64D4", category: "\u52DE\u52D5", cost: 0, recurring: 45, duration: "permanent", effects: { unemployment: -0.8, adminCapacity: 2, approval: 1 }, required: { budget: 45 }, stakeholders: { labor: 2, students: 1, lowIncome: 1 } },
  { id: "p_cash_handout", name: "\u5168\u6C11\u666E\u767C\u73FE\u91D1", desc: "\u4E00\u6B21\u6027\u767C\u653E\u6D88\u8CBB\u5238\u523A\u6FC0\u666F\u6C23\uFF0C\u7ACB\u5373\u898B\u6548\u4F46\u8209\u50B5\u58D3\u529B", category: "\u8CA1\u653F\u7A05\u6536", cost: 130, recurring: 0, duration: "instant", tags: ["\u4E00\u6B21\u6027"], required: { budget: 130 }, effects: { growth: 0.45, inflation: 0.4, approval: 4, inequality: -1 }, stakeholders: { lowIncome: 2, middle: 2, youth: 2, business: 1 } },
  { id: "p_diplomacy", name: "\u5F37\u5316\u7D93\u8CBF\u5916\u4EA4", desc: "\u7C3D\u7F72\u8CBF\u6613\u5354\u5B9A\u3001\u62D3\u5C55\u51FA\u53E3\u5E02\u5834", category: "\u5916\u4EA4", cost: 30, recurring: 0, duration: "instant", required: { budget: 30, political: 5 }, effects: { trade: 0.6, growth: 0.3, politicalStability: 1 }, stakeholders: { business: 2, investors: 1, centralGov: 1 } }
];
var allPresidentActions = [...budgetBuckets, ...presidentPolicies];

// src/data/company.ts
var industries = [
  { id: "ai_saas", name: "AI \u8EDF\u9AD4 / SaaS", examples: ["AI \u5BB6\u6559 App", "\u4F01\u696D\u81EA\u52D5\u5316\u5E73\u53F0", "AI \u6CD5\u5F8B\u52A9\u624B"], cash: 3200, employees: 9, salary: 85, revenue: 250, customers: 40, rnd: 45, brand: 22, production: 25, competitor: 58, blurb: "\u9AD8\u6BDB\u5229\u3001\u8F15\u8CC7\u7522\u3001\u7814\u767C\u8207\u4EBA\u624D\u5BC6\u96C6\uFF0C\u73FE\u91D1\u6D88\u8017\u5FEB\u3001\u7AF6\u722D\u6FC0\u70C8" },
  { id: "fnb", name: "\u9910\u98F2\u9023\u9396", examples: ["\u624B\u6416\u98F2\u6599\u5E97", "\u4FBF\u7576\u9023\u9396", "\u5496\u5561\u54C1\u724C"], cash: 1800, employees: 14, salary: 55, revenue: 900, customers: 12e3, rnd: 12, brand: 30, production: 45, competitor: 62, blurb: "\u73FE\u91D1\u6D41\u5FEB\u3001\u6BDB\u5229\u4F4E\u3001\u9760\u5C55\u5E97\u8207\u54C1\u724C\uFF0C\u5730\u9EDE\u8207\u98DF\u5B89\u662F\u95DC\u9375" },
  { id: "ev", name: "\u96FB\u52D5\u8ECA / \u786C\u9AD4", examples: ["\u96FB\u52D5\u6A5F\u8ECA", "\u5145\u96FB\u8A2D\u5099", "\u667A\u6167\u786C\u9AD4"], cash: 6e3, employees: 40, salary: 78, revenue: 1500, customers: 800, rnd: 40, brand: 18, production: 40, competitor: 55, blurb: "\u91CD\u8CC7\u672C\u3001\u9577\u9031\u671F\u3001\u7522\u80FD\u8207\u4F9B\u61C9\u93C8\u6C7A\u5B9A\u751F\u6B7B\uFF0C\u52DF\u8CC7\u9700\u6C42\u5927" },
  { id: "green", name: "\u7DA0\u80FD\u8A2D\u5099", examples: ["\u592A\u967D\u80FD\u7CFB\u7D71", "\u5132\u80FD\u6AC3", "\u98A8\u96FB\u96F6\u7D44\u4EF6"], cash: 5200, employees: 32, salary: 75, revenue: 1200, customers: 60, rnd: 38, brand: 20, production: 42, competitor: 48, blurb: "\u653F\u7B56\u8207\u88DC\u8CBC\u9A45\u52D5\u3001\u91CD\u8CC7\u672C\uFF0C\u570B\u969B\u80FD\u6E90\u50F9\u683C\u5F71\u97FF\u5927" },
  { id: "beauty", name: "\u7F8E\u599D\u4FDD\u990A", examples: ["\u8B77\u819A\u54C1\u724C", "\u6A5F\u80FD\u4FDD\u990A\u54C1", "\u5F69\u599D"], cash: 2400, employees: 12, salary: 62, revenue: 700, customers: 6e3, rnd: 25, brand: 28, production: 35, competitor: 64, blurb: "\u54C1\u724C\u8207\u884C\u92B7\u4E3B\u5C0E\u3001\u7522\u54C1\u751F\u547D\u9031\u671F\u77ED\uFF0CKOL \u8207\u901A\u8DEF\u5F71\u97FF\u529B\u5F37" },
  { id: "pettech", name: "\u5BF5\u7269\u79D1\u6280", examples: ["\u667A\u6167\u9935\u98DF\u5668", "\u5BF5\u7269\u5065\u5EB7 App", "\u5BF5\u7269\u4FDD\u96AA\u5E73\u53F0"], cash: 2200, employees: 10, salary: 72, revenue: 350, customers: 900, rnd: 35, brand: 24, production: 30, competitor: 44, blurb: "\u5E02\u5834\u6210\u9577\u5FEB\u3001\u98FC\u4E3B\u5FE0\u8AA0\u5EA6\u9AD8\uFF0C\u7522\u54C1\u9AD4\u9A57\u8207\u53E3\u7891\u6C7A\u5B9A\u6210\u9577" },
  { id: "ecom", name: "\u96FB\u5546\u96F6\u552E", examples: ["\u751F\u9BAE\u96FB\u5546", "\u9078\u7269\u5E73\u53F0", "D2C \u54C1\u724C"], cash: 2600, employees: 16, salary: 64, revenue: 1100, customers: 18e3, rnd: 18, brand: 26, production: 38, competitor: 66, blurb: "\u898F\u6A21\u7D93\u6FDF\u3001\u7269\u6D41\u8207\u50F9\u683C\u6230\uFF0C\u88DC\u8CBC\u63DB\u53D6\u9577\u3001\u7372\u5229\u7D00\u5F8B\u662F\u6311\u6230" },
  { id: "biotech", name: "\u751F\u6280\u91AB\u7642", examples: ["\u65B0\u85E5\u7814\u767C", "\u91AB\u6750", "\u6578\u4F4D\u5065\u5EB7"], cash: 7e3, employees: 26, salary: 92, revenue: 200, customers: 25, rnd: 60, brand: 16, production: 20, competitor: 40, blurb: "\u9577\u9031\u671F\u3001\u9AD8\u7814\u767C\u3001\u6CD5\u898F\u9580\u6ABB\u9AD8\uFF0C\u55AE\u4E00\u7522\u54C1\u6210\u529F\u5831\u916C\u6975\u5927" }
];
var regions = [
  { id: "local", name: "\u55AE\u4E00\u57CE\u5E02\uFF0F\u672C\u5730", shareCap: 8, revMul: 1 },
  { id: "national", name: "\u5168\u570B\u5E02\u5834", shareCap: 25, revMul: 2.6 },
  { id: "regional", name: "\u8DE8\u570B\u5340\u57DF\u5E02\u5834", shareCap: 40, revMul: 5 },
  { id: "global", name: "\u5168\u7403\u5E02\u5834", shareCap: 60, revMul: 9 }
];
function initialCState(t, diff) {
  const diffCash = diff === "easy" ? 1.3 : diff === "hard" ? 0.8 : diff === "extreme" ? 0.6 : 1;
  const diffComp = diff === "easy" ? -8 : diff === "hard" ? 8 : diff === "extreme" ? 14 : 0;
  return {
    year: 1,
    productName: "",
    industry: t.name,
    headquarters: "",
    region: "local",
    revenue: t.revenue,
    profit: 0,
    cash: Math.round(t.cash * diffCash),
    debt: 0,
    employees: t.employees,
    salary: t.salary,
    marketShare: 2,
    brand: t.brand,
    rnd: t.rnd,
    production: t.production,
    customers: t.customers,
    investorConfidence: 55,
    stockPrice: null,
    competitor: Math.min(95, t.competitor + diffComp),
    ipo: false,
    gameOver: false
  };
}
var companyActions = [
  { id: "c_marketing", name: "\u5927\u8209\u6295\u653E\u884C\u92B7", desc: "\u7838\u9810\u7B97\u8CB7\u5EE3\u544A\u8207 KOL\uFF0C\u5FEB\u901F\u62C9\u62AC\u54C1\u724C\u8207\u5BA2\u6E90", category: "\u884C\u92B7", cost: 300, recurring: 200, duration: "permanent", effects: { brand: 8, marketShare: 1.2, revenue: 350 }, stakeholders: { customers: 2, competitors: -1 } },
  { id: "c_rnd", name: "\u64F4\u589E\u7814\u767C\u5718\u968A", desc: "\u6295\u5165\u65B0\u7522\u54C1\u8207\u6280\u8853\uFF0C\u5EFA\u7ACB\u9577\u671F\u8B77\u57CE\u6CB3", category: "\u7814\u767C", cost: 100, recurring: 250, duration: "permanent", required: { admin: 6 }, effects: { rnd: 10, production: 2, revenue: 120 }, stakeholders: { customers: 1, competitors: -1 } },
  { id: "c_raise_salary", name: "\u8ABF\u9AD8\u85AA\u8CC7\u652C\u624D", desc: "\u63D0\u9AD8\u85AA\u8CC7\u8207\u798F\u5229\uFF0C\u964D\u4F4E\u512A\u79C0\u4EBA\u624D\u6D41\u5931", category: "\u4EBA\u529B", cost: 0, recurring: 150, duration: "permanent", effects: { rnd: 3, brand: 2, production: 2, investorConfidence: -1 }, stakeholders: { employees: 3 } },
  { id: "c_hire", name: "\u5927\u8209\u5FB5\u624D\u64F4\u7DE8", desc: "\u5404\u90E8\u968A\u5927\u91CF\u62DB\u4EBA\uFF0C\u885D\u9AD8\u7522\u80FD\u8207\u7814\u767C\u91CF\u80FD", category: "\u4EBA\u529B", cost: 80, recurring: 320, duration: "permanent", required: { budget: 400, admin: 8 }, effects: { employees: 22, production: 6, rnd: 4, revenue: 150 }, stakeholders: { employees: 2 } },
  { id: "c_factory", name: "\u64F4\u5EE0\uFF0F\u64F4\u9EDE", desc: "\u65B0\u589E\u5EE0\u623F\u6216\u9580\u5E02\uFF0C\u63D0\u9AD8\u7522\u80FD\u8207\u670D\u52D9\u8986\u84CB", category: "\u71DF\u904B", cost: 800, recurring: 120, duration: "permanent", tags: ["\u91CD\u8CC7\u672C"], required: { budget: 920 }, effects: { employees: 14, production: 12, marketShare: 1, revenue: 250 }, stakeholders: { customers: 1, suppliers: 1 } },
  { id: "c_layoff", name: "\u7CBE\u7C21\u7D44\u7E54\u88C1\u54E1", desc: "\u522A\u6E1B\u4EBA\u4E8B\u964D\u4F4E\u71D2\u9322\u901F\u5EA6\uFF0C\u4F46\u6253\u64CA\u58EB\u6C23\u8207\u54C1\u724C", category: "\u4EBA\u529B", cost: 120, recurring: -220, duration: "instant", effects: { employees: -16, production: -5, brand: -6, investorConfidence: 2 }, stakeholders: { employees: -3, investors: 1 } },
  { id: "c_price_cut", name: "\u964D\u50F9\u6436\u5E02", desc: "\u4EE5\u50F9\u683C\u63DB\u53D6\u5E02\u5360\u7387\uFF0C\u77ED\u671F\u58D3\u7E2E\u6BDB\u5229", category: "\u884C\u92B7", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: -120, marketShare: 2, brand: 1 }, stakeholders: { customers: 2, competitors: -2 } },
  { id: "c_price_up", name: "\u8ABF\u9AD8\u552E\u50F9", desc: "\u63D0\u9AD8\u55AE\u50F9\u6539\u5584\u6BDB\u5229\uFF0C\u4F46\u53EF\u80FD\u6D41\u5931\u5BA2\u6236", category: "\u884C\u92B7", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: 300, marketShare: -1.5, brand: -2 }, stakeholders: { customers: -2, investors: 1 } },
  { id: "c_fundraise", name: "\u5411\u6295\u8CC7\u4EBA\u52DF\u8CC7", desc: "\u91CB\u653E\u80A1\u6B0A\u63DB\u53D6\u8CC7\u91D1\uFF08\u589E\u8CC7\uFF09\uFF0C\u4E0D\u751F\u5229\u606F\u4F46\u7A00\u91CB", category: "\u8CA1\u52D9", cost: 0, recurring: 0, duration: "instant", tags: ["\u80A1\u6B0A"], effects: { cashNow: 2200, investorConfidence: -2 }, stakeholders: { investors: 1 } },
  { id: "c_loan", name: "\u5411\u9280\u884C\u501F\u6B3E", desc: "\u53D6\u5F97\u50B5\u52D9\u8CC7\u91D1\uFF0C\u660E\u5E74\u8D77\u511F\u9084\u5229\u606F", category: "\u8CA1\u52D9", cost: 0, recurring: 0, duration: "instant", tags: ["\u501F\u6B3E"], effects: { debtNow: 1600, cashNow: 1600, investorConfidence: -1 }, stakeholders: { banks: 1 } },
  { id: "c_overseas", name: "\u4F48\u5C40\u6D77\u5916\u5E02\u5834", desc: "\u6295\u5165\u8CC7\u6E90\u958B\u62D3\u570B\u5916\u5BA2\u6236\u8207\u901A\u8DEF", category: "\u7B56\u7565", cost: 1200, recurring: 160, duration: "permanent", tags: ["\u6D77\u5916"], required: { budget: 1360, admin: 6 }, effects: { employees: 8, marketShare: 2.5, revenue: 500, brand: 4 }, stakeholders: { customers: 2, competitors: -1 } },
  { id: "c_acquire", name: "\u6536\u8CFC\u7AF6\u722D\u5C0D\u624B", desc: "\u4F75\u8CFC\u4EE5\u5FEB\u901F\u53D6\u5F97\u5E02\u5360\u8207\u6280\u8853\uFF08\u9AD8\u50F9\uFF09", category: "\u7B56\u7565", cost: 2200, recurring: 0, duration: "instant", tags: ["\u4F75\u8CFC"], required: { budget: 2200 }, effects: { marketShare: 5, competitor: -10, revenue: 450, brand: 3 }, stakeholders: { competitors: -3, investors: -1 } },
  { id: "c_supplychain", name: "\u512A\u5316\u4F9B\u61C9\u93C8", desc: "\u6539\u9020\u63A1\u8CFC\u8207\u7269\u6D41\uFF0C\u964D\u672C\u4E26\u63D0\u9AD8\u4EA4\u4ED8\u7A69\u5B9A\u5EA6", category: "\u71DF\u904B", cost: 220, recurring: -60, duration: "permanent", effects: { production: 5, revenue: 80 }, stakeholders: { suppliers: 1, customers: 1 } },
  { id: "c_ai_transform", name: "\u6578\u4F4D\uFF0FAI \u8F49\u578B", desc: "\u5C0E\u5165\u81EA\u52D5\u5316\u8207 AI\uFF0C\u63D0\u5347\u6548\u7387\u3001\u9577\u671F\u964D\u4F4E\u4EBA\u529B\u6210\u672C", category: "\u7814\u767C", cost: 500, recurring: -80, duration: "permanent", tags: ["AI"], required: { budget: 500 }, effects: { employees: -5, rnd: 8, production: 6, brand: 2 }, stakeholders: { employees: -1, investors: 2 } },
  { id: "c_cert_brand", name: "\u54C1\u724C\u8207\u8A8D\u8B49\u6295\u8CC7", desc: "\u53D6\u5F97\u570B\u969B\u8A8D\u8B49\u3001\u6253\u9020\u54C1\u724C\u4FE1\u4EFB\u5EA6", category: "\u884C\u92B7", cost: 260, recurring: 0, duration: "instant", effects: { brand: 10, investorConfidence: 3, marketShare: 0.6 }, stakeholders: { customers: 2, investors: 2, banks: 1 } },
  { id: "c_new_product", name: "\u63A8\u51FA\u65B0\u7522\u54C1", desc: "\u958B\u767C\u4E26\u4E0A\u5E02\u65B0\u7522\u54C1\u7DDA\uFF0C\u5275\u9020\u65B0\u71DF\u6536", category: "\u7814\u767C", cost: 420, recurring: 0, duration: "instant", required: { budget: 420, admin: 4 }, effects: { rnd: 4, revenue: 380, marketShare: 1, brand: 2 }, stakeholders: { customers: 2, competitors: -1 } }
];

// src/engine/helpers.ts
function clamp(v, min, max) {
  if (Number.isNaN(v)) return min;
  return Math.max(min, Math.min(max, v));
}
function uid(prefix = "a") {
  return prefix + "_" + Math.random().toString(36).slice(2, 9);
}

// src/engine/policy.ts
function addContribution(c, key, source, amount) {
  if (Math.abs(amount) < 1e-9) return;
  if (!c[key]) c[key] = [];
  c[key].push({ source, amount });
}
var conflictMap = {
  p_corptax_up: ["p_corptax_cut", "p_corptax_zero"],
  p_corptax_cut: ["p_corptax_up"],
  p_corptax_zero: ["p_corptax_up"],
  p_minwage_up: ["p_labor_dereg"],
  p_labor_dereg: ["p_minwage_up"],
  p_austerity: ["b_education", "b_healthcare", "b_welfare", "b_defense", "b_housing", "b_energy", "b_infra", "p_cash_handout", "p_green", "p_public_jobs"]
};
function findConflicts(def, active) {
  const bad = conflictMap[def.id] || [];
  return active.filter((a) => bad.includes(a.id) && a.scale > 0).map((a) => a.name);
}
function firstYearCost(def, scale) {
  return def.cost * scale + Math.max(0, def.recurring) * scale;
}
function presidentFeasibility(def, scale, s, active, allocated) {
  const issues = [];
  const conflicts = findConflicts(def, active);
  const cost = firstYearCost(def, scale);
  const available = s.discretionary - allocated;
  const gap = Math.max(0, cost - available);
  if (cost > available) {
    if (gap > available * 1.2) issues.push(`\u9810\u7B97\u56B4\u91CD\u4E0D\u8DB3\uFF1A\u9996\u5E74\u7D04\u9700 ${Math.round(cost)} \u5104\uFF0C\u5C1A\u53EF\u914D\u7F6E\u50C5 ${Math.round(available)} \u5104\uFF0C\u7F3A\u53E3 ${Math.round(gap)} \u5104\uFF0C\u5F37\u884C\u57F7\u884C\u5C07\u5927\u5E45\u8209\u50B5\u3002`);
    else issues.push(`\u9810\u7B97\u5403\u7DCA\uFF1A\u9996\u5E74\u7D04\u9700 ${Math.round(cost)} \u5104\uFF0C\u5C1A\u53EF\u914D\u7F6E ${Math.round(available)} \u5104\uFF0C\u7F3A\u53E3 ${Math.round(gap)} \u5104\uFF0C\u53EF\u80FD\u51FA\u73FE\u8D64\u5B57\u3002`);
  }
  if (def.required?.admin && s.adminCapacity < def.required.admin * 9) {
    issues.push(`\u884C\u653F\u80FD\u529B\u4E0D\u8DB3\uFF1A\u653F\u7B56\u9700\u8981\u8F03\u9AD8\u57F7\u884C\u91CF\u80FD\uFF0C\u76EE\u524D\u884C\u653F\u80FD\u529B ${s.adminCapacity}\uFF0C\u53EF\u80FD\u5EF6\u5B95\u6216\u6253\u6298\u3002`);
  }
  if (def.required?.political && s.politicalCapital < def.required.political) {
    issues.push(`\u653F\u6CBB\u8CC7\u672C\u4E0D\u8DB3\uFF1A\u63A8\u52D5\u9700\u8981\u570B\u6703\u8207\u6C11\u610F\u652F\u6301\uFF0C\u76EE\u524D\u653F\u6CBB\u8CC7\u672C ${s.politicalCapital}\u3002`);
  }
  if (def.required?.land) issues.push("\u9700\u8981\u5927\u9762\u7A4D\u571F\u5730\u8207\u7528\u5730\u5BE9\u67E5\uFF0C\u5730\u65B9\u653F\u5E9C\u8207\u5FB5\u6536\u9032\u5EA6\u53EF\u80FD\u6210\u70BA\u74F6\u9838\u3002");
  if (def.required?.energy) issues.push("\u6D89\u53CA\u80FD\u6E90\u914D\u7F6E\uFF0C\u9808\u914D\u5408\u96FB\u7DB2\u8207\u4F9B\u96FB\u7A69\u5B9A\u5EA6\u8A55\u4F30\u3002");
  let level = "green";
  if (conflicts.length > 0) level = "conflict";
  else if (gap > available * 1.2) level = "red";
  else if (gap > 0 || issues.length > 0) level = "yellow";
  return { level, firstYearCost: cost, gap, issues, conflicts };
}
function companyFeasibility(def, scale, s, active) {
  const issues = [];
  const conflicts = findConflicts(def, active);
  const cost = firstYearCost(def, scale);
  const gap = Math.max(0, cost - s.cash);
  const capacity = s.employees / 4;
  if (cost > s.cash) {
    if (gap > s.cash) issues.push(`\u73FE\u91D1\u56B4\u91CD\u4E0D\u8DB3\uFF1A\u9996\u5E74\u7D04\u9700 ${Math.round(cost)} \u842C\uFF0C\u73FE\u91D1\u50C5 ${Math.round(s.cash)} \u842C\uFF0C\u9808\u52DF\u8CC7\u6216\u501F\u6B3E\uFF0C\u5426\u5247\u6703\u6709\u7834\u7522\u98A8\u96AA\u3002`);
    else issues.push(`\u73FE\u91D1\u504F\u7DCA\uFF1A\u9996\u5E74\u7D04\u9700 ${Math.round(cost)} \u842C\uFF0C\u73FE\u91D1 ${Math.round(s.cash)} \u842C\uFF0C\u7F3A\u53E3 ${Math.round(gap)} \u842C\u3002`);
  }
  if (def.required?.admin && capacity < def.required.admin) {
    issues.push(`\u4EBA\u624D\u91CF\u80FD\u4E0D\u8DB3\uFF1A\u64F4\u5F35\u9700\u8981\u66F4\u591A\u5718\u968A\uFF0C\u76EE\u524D ${s.employees} \u4EBA\uFF0C\u5EFA\u8B70\u5148\u5FB5\u624D\u3002`);
  }
  if ((def.id === "c_overseas" || def.id === "c_acquire") && s.region === "local" && s.brand < 45) {
    issues.push("\u54C1\u724C\u8207\u672C\u5730\u6839\u57FA\u5C1A\u6DFA\uFF0C\u8CBF\u7136\u5927\u6B65\u64F4\u5F35\u98A8\u96AA\u8F03\u9AD8\uFF0C\u5EFA\u8B70\u5148\u7AD9\u7A69\u5168\u570B\u5E02\u5834\u3002");
  }
  let level = "green";
  if (conflicts.length > 0) level = "conflict";
  else if (gap > s.cash) level = "red";
  else if (gap > 0 || issues.length > 0) level = "yellow";
  return { level, firstYearCost: cost, gap, issues, conflicts };
}
var specialKeys = /* @__PURE__ */ new Set(["debtNow", "cashNow"]);
function applyEffects(state, effects, scale, contrib, source) {
  for (const [key, raw] of Object.entries(effects)) {
    if (specialKeys.has(key)) continue;
    const amount = raw * scale;
    if (typeof state[key] === "number") {
      state[key] += amount;
      addContribution(contrib, key, source, amount);
    }
  }
}
function clampPresident(s) {
  s.unemployment = clamp(s.unemployment, 0.5, 35);
  s.inflation = clamp(s.inflation, -3, 25);
  s.growth = clamp(s.growth, -12, 14);
  s.approval = clamp(s.approval, 1, 99);
  s.socialTrust = clamp(s.socialTrust, 1, 99);
  s.politicalStability = clamp(s.politicalStability, 1, 99);
  s.adminCapacity = clamp(s.adminCapacity, 20, 99);
  s.politicalCapital = clamp(s.politicalCapital, 0, 100);
  s.govSupport = clamp(s.govSupport, 1, 99);
  s.opposition = clamp(s.opposition, 1, 99);
  s.inequality = clamp(s.inequality, 5, 90);
  s.housingPrice = clamp(s.housingPrice, 40, 400);
  s.interestRate = clamp(s.interestRate, 0.5, 18);
  for (const k of ["defense", "education", "healthcare", "welfare", "housing", "energy"]) {
    s[k] = clamp(s[k], 5, 99);
  }
  return s;
}
function clampCompany(s) {
  s.marketShare = clamp(s.marketShare, 0, 95);
  s.brand = clamp(s.brand, 0, 100);
  s.rnd = clamp(s.rnd, 0, 100);
  s.production = clamp(s.production, 0, 100);
  s.investorConfidence = clamp(s.investorConfidence, 0, 100);
  s.competitor = clamp(s.competitor, 5, 100);
  s.employees = Math.max(0, s.employees);
  s.customers = Math.max(0, s.customers);
  return s;
}

// src/engine/causal.ts
var indicatorLabels = {
  // 總統
  growth: "\u7D93\u6FDF\u6210\u9577\u7387",
  inflation: "\u901A\u81A8\u7387",
  unemployment: "\u5931\u696D\u7387",
  debt: "\u653F\u5E9C\u50B5\u52D9",
  interestRate: "\u50B5\u5238\u5229\u7387",
  housingPrice: "\u623F\u50F9\u6307\u6578",
  inequality: "\u8CA7\u5BCC\u5DEE\u8DDD",
  approval: "\u6C11\u610F\u652F\u6301",
  socialTrust: "\u793E\u6703\u4FE1\u4EFB",
  politicalStability: "\u653F\u6CBB\u7A69\u5B9A",
  adminCapacity: "\u884C\u653F\u80FD\u529B",
  politicalCapital: "\u653F\u6CBB\u8CC7\u672C",
  govSupport: "\u57F7\u653F\u9EE8\u652F\u6301",
  opposition: "\u53CD\u5C0D\u9EE8\u529B\u91CF",
  defense: "\u570B\u9632\u91CF\u80FD",
  education: "\u6559\u80B2\u91CF\u80FD",
  healthcare: "\u91AB\u7642\u91CF\u80FD",
  welfare: "\u798F\u5229\u91CF\u80FD",
  housing: "\u4F4F\u5B85\u91CF\u80FD",
  energy: "\u80FD\u6E90\u91CF\u80FD",
  trade: "\u51FA\u53E3\u52D5\u80FD",
  revenue: "\u653F\u5E9C\u6536\u5165",
  gdp: "GDP",
  // 企業
  profit: "\u5229\u6F64",
  cash: "\u73FE\u91D1",
  employees: "\u54E1\u5DE5\u4EBA\u6578",
  marketShare: "\u5E02\u5360\u7387",
  brand: "\u54C1\u724C\u529B",
  rnd: "\u7814\u767C\u91CF\u80FD",
  production: "\u7522\u80FD",
  customers: "\u5BA2\u6236\u6578",
  investorConfidence: "\u6295\u8CC7\u4EBA\u4FE1\u5FC3",
  stockPrice: "\u80A1\u50F9",
  competitor: "\u7AF6\u722D\u5F37\u5EA6"
};
function labelOf(key) {
  return indicatorLabels[key] || key;
}
function buildChangeReasons(contrib) {
  const out = [];
  for (const [key, sources] of Object.entries(contrib)) {
    if (!sources.length) continue;
    const delta = sources.reduce((a, b) => a + b.amount, 0);
    if (Math.abs(delta) < 0.05) continue;
    const merged = {};
    for (const s of sources) merged[s.source] = (merged[s.source] || 0) + s.amount;
    const srcArr = Object.entries(merged).map(([source, amount]) => ({ source, amount: Math.round(amount * 100) / 100 })).sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    out.push({ key, label: labelOf(key), delta: Math.round(delta * 100) / 100, sources: srcArr });
  }
  return out.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

// src/data/shared.ts
var blackSwans = [
  {
    id: "bs_financial_crisis",
    title: "\u5168\u7403\u91D1\u878D\u6D77\u562F",
    detailP: "\u570B\u969B\u91D1\u878D\u5E02\u5834\u5D29\u76E4\u3001\u4FE1\u7528\u7DCA\u7E2E\uFF0C\u51FA\u53E3\u8207\u6295\u8CC7\u6025\u51CD\uFF0C\u5931\u696D\u6F6E\u6D6E\u73FE\uFF0C\u7A05\u6536\u5927\u5E45\u4E0B\u6ED1\u3002",
    detailC: "\u5E02\u5834\u9700\u6C42\u9A5F\u964D\u3001\u8CC7\u91D1\u64A4\u96E2\uFF0C\u5BA2\u6236\u7E2E\u624B\u3001\u61C9\u6536\u5E33\u6B3E\u62C9\u9577\uFF0C\u516C\u53F8\u9762\u81E8\u56B4\u51AC\u3002",
    effectsP: { growth: -3, unemployment: 2, revenue: -130, inflation: -0.6, approval: -5, socialTrust: -4 },
    effectsC: { revenue: -650, marketShare: -2, investorConfidence: -16, brand: -3 }
  },
  {
    id: "bs_pandemic",
    title: "\u91CD\u5927\u50B3\u67D3\u75C5\u75AB\u60C5",
    detailP: "\u75AB\u60C5\u885D\u64CA\u4F9B\u61C9\u93C8\u8207\u5167\u9700\uFF0C\u91AB\u7642\u91CF\u80FD\u7DCA\u7E43\uFF0C\u653F\u5E9C\u88AB\u8FEB\u7D13\u56F0\u4E26\u589E\u52A0\u652F\u51FA\u3002",
    detailC: "\u4EBA\u6D41\u8207\u7269\u6D41\u53D7\u963B\uFF0C\u5BE6\u9AD4\u71DF\u904B\u65B7\u93C8\uFF0C\u4F46\u6578\u4F4D\u8207\u9632\u75AB\u76F8\u95DC\u9700\u6C42\u4E0A\u5347\u3002",
    effectsP: { growth: -1.6, unemployment: 1.1, inflation: 1, healthcare: -6, debtNow: 150, approval: -2 },
    effectsC: { revenue: -320, production: -8, investorConfidence: -8, rnd: 3 }
  },
  {
    id: "bs_war",
    title: "\u5340\u57DF\u6230\u722D\u8207\u80FD\u6E90\u5371\u6A5F",
    detailP: "\u5730\u7DE3\u885D\u7A81\u5C0E\u81F4\u80FD\u6E90\u8207\u9032\u53E3\u7269\u50F9\u98C6\u6F32\u3001\u4F9B\u61C9\u93C8\u4E2D\u65B7\uFF0C\u570B\u9632\u58D3\u529B\u5347\u9AD8\u3002",
    detailC: "\u539F\u7269\u6599\u8207\u904B\u8CBB\u66B4\u6F32\u3001\u80FD\u6E90\u6210\u672C\u6500\u5347\uFF0C\u6BDB\u5229\u53D7\u5230\u56B4\u91CD\u58D3\u7E2E\u3002",
    effectsP: { inflation: 2.4, energy: -10, trade: -1, growth: -1.4, defense: 4, politicalStability: -3 },
    effectsC: { production: -6, revenue: -220, investorConfidence: -11, rnd: 0 }
  },
  {
    id: "bs_tech_revolution",
    title: "\u985B\u8986\u6027\u6280\u8853\u9769\u547D",
    detailP: "AI \u7B49\u901A\u7528\u6280\u8853\u5F15\u7206\u751F\u7522\u529B\u9769\u547D\uFF0C\u820A\u5DE5\u4F5C\u88AB\u53D6\u4EE3\u3001\u65B0\u7522\u696D\u8208\u8D77\uFF0C\u76E3\u7BA1\u9762\u81E8\u6311\u6230\u3002",
    detailC: "\u5E02\u5834\u7248\u5716\u91CD\u65B0\u6D17\u724C\uFF1A\u6280\u8853\u9818\u5148\u8005\u5F4E\u9053\u8D85\u8ECA\uFF0C\u8DDF\u4E0D\u4E0A\u7684\u696D\u8005\u88AB\u908A\u7DE3\u5316\u3002",
    effectsP: { growth: 1.4, unemployment: 0.7, inequality: 2, education: -2 },
    effectsC: { rnd: 6, competitor: 8, investorConfidence: 4 }
  },
  {
    id: "bs_quake",
    title: "\u91CD\u5927\u5929\u7136\u707D\u5BB3",
    detailP: "\u5F37\u9707\uFF0F\u6975\u7AEF\u6C23\u5019\u91CD\u5275\u57FA\u790E\u8A2D\u65BD\uFF0C\u653F\u5E9C\u9808\u6295\u5165\u9F90\u5927\u91CD\u5EFA\u7D93\u8CBB\u3002",
    detailC: "\u5EE0\u623F\u3001\u9580\u5E02\u6216\u4F9B\u61C9\u93C8\u53D7\u640D\uFF0C\u71DF\u904B\u4E2D\u65B7\u4E26\u7522\u751F\u91CD\u5EFA\u652F\u51FA\u3002",
    effectsP: { growth: -0.9, inflation: 0.5, debtNow: 180, politicalStability: -2, approval: -2 },
    effectsC: { production: -9, revenue: -180, investorConfidence: -6 }
  },
  {
    id: "bs_trade_war",
    title: "\u5168\u7403\u8CBF\u6613\u6230",
    detailP: "\u4E3B\u8981\u7D93\u6FDF\u9AD4\u4E92\u8AB2\u95DC\u7A05\u3001\u51FA\u53E3\u53D7\u963B\uFF0C\u4F9D\u8CF4\u5916\u92B7\u7684\u7522\u696D\u58D3\u529B\u6C89\u91CD\u3002",
    detailC: "\u95DC\u7A05\u8207\u51FA\u53E3\u7BA1\u5236\u588A\u9AD8\u6210\u672C\u3001\u6D77\u5916\u8A02\u55AE\u6D41\u5931\uFF0C\u4F9B\u61C9\u93C8\u88AB\u8FEB\u91CD\u7D44\u3002",
    effectsP: { trade: -1.6, growth: -1, inflation: 1, unemployment: 0.6 },
    effectsC: { revenue: -420, marketShare: -2, production: -4, investorConfidence: -9 }
  }
];

// src/engine/events.ts
function ev(year, title, detail, severity, causedBy, effects, blackSwan = false) {
  return { id: uid("ev"), year, title, detail, severity, causedBy, effects, blackSwan };
}
function presidentEvents(s, c) {
  const out = [];
  const spenders = c.activeNames.slice(0, 3).join("\u3001");
  if (c.rng() < c.swanP) {
    const pool = blackSwans.filter((b) => !c.usedSwan.includes(b.id));
    const pick = pool[Math.floor(c.rng() * pool.length)] ?? blackSwans[0];
    out.push(ev(c.year, "\u9ED1\u5929\u9D5D\uFF1A" + pick.title, pick.detailP, "blackswan", ["\u570B\u969B\u74B0\u5883"], pick.effectsP, true));
  }
  if (c.deficit > 80) {
    out.push(ev(c.year, "\u8CA1\u653F\u8D64\u5B57\u64F4\u5927", `\u4ECA\u5E74\u652F\u51FA\u660E\u986F\u8D85\u904E\u6536\u5165\uFF0C\u8D64\u5B57\u7D04 ${Math.round(c.deficit)} \u5104${spenders ? "\uFF0C\u4E3B\u8981\u4F86\u81EA\uFF1A" + spenders : ""}\uFF0C\u653F\u5E9C\u6E96\u5099\u64F4\u5927\u8209\u50B5\u3002`, "risk", spenders ? c.activeNames.slice(0, 2) : ["\u8CA1\u653F\u6536\u652F"], { approval: -1.5, politicalCapital: -2 }));
  }
  if (c.debtRatio > 0.85) {
    out.push(ev(c.year, "\u653F\u5E9C\u50B5\u52D9\u8CA0\u64D4\u6C89\u91CD", `\u653F\u5E9C\u50B5\u52D9\u5DF2\u9054 GDP \u7684 ${(c.debtRatio * 100).toFixed(0)}%\uFF0C\u5E02\u5834\u958B\u59CB\u8CEA\u7591\u8CA1\u653F\u6C38\u7E8C\u6027\uFF0C\u516C\u50B5\u6B96\u5229\u7387\u9762\u81E8\u4E0A\u884C\u58D3\u529B\u3002`, "risk", ["\u8CA1\u653F\u8D64\u5B57\u64F4\u5927"], { interestRate: 0.6, investorConfidence: 0, politicalStability: -1 }));
  }
  if (c.debtRatio > 1.15 && c.deficit > 60) {
    out.push(ev(c.year, "\u50B5\u4FE1\u5371\u6A5F\u903C\u8FD1", `\u50B5\u53F0\u9AD8\u7BC9\u52A0\u4E0A\u6301\u7E8C\u8D64\u5B57\uFF0C\u4FE1\u7528\u8A55\u7B49\u6A5F\u69CB\u9EDE\u540D\u964D\u8A55\uFF0C\u501F\u65B0\u9084\u820A\u6210\u672C\u6025\u5347\uFF0C\u5229\u606F\u958B\u59CB\u6392\u64E0\u5176\u4ED6\u9810\u7B97\u3002`, "crisis", ["\u653F\u5E9C\u50B5\u52D9\u8CA0\u64D4\u6C89\u91CD"], { interestRate: 1.2, approval: -3, socialTrust: -3, politicalStability: -3 }));
  }
  if (c.debtRatio > 1.4) {
    out.push(ev(c.year, "\u8CA1\u653F\u5371\u6A5F", "\u653F\u5E9C\u5DF2\u96E3\u4EE5\u652F\u4ED8\u5FC5\u8981\u652F\u51FA\u8207\u50B5\u52D9\u5229\u606F\uFF0C\u4E3B\u6B0A\u50B5\u52D9\u5371\u6A5F\u7206\u767C\uFF0C\u570B\u6703\u8981\u6C42\u7E3D\u7D71\u8CA0\u8CAC\u3002", "crisis", ["\u50B5\u4FE1\u5371\u6A5F\u903C\u8FD1"], { approval: -8, politicalStability: -10, socialTrust: -8 }));
  }
  if (s.inflation >= 5) {
    out.push(ev(c.year, "\u7269\u50F9\u98C6\u6F32\u6C11\u6028\u5347\u9AD8", `\u901A\u81A8\u7387\u9054 ${s.inflation.toFixed(1)}%\uFF0C\u6C11\u773E\u5BE6\u8CEA\u6240\u5F97\u7E2E\u6C34\uFF0C\u53D7\u85AA\u968E\u7D1A\u8207\u5F31\u52E2\u65CF\u7FA4\u611F\u53D7\u6700\u5F37\u70C8\u3002`, "risk", ["\u7E3D\u9AD4\u7D93\u6FDF"], { approval: -3, socialTrust: -2 }));
  }
  if (s.unemployment >= 7) {
    out.push(ev(c.year, "\u5931\u696D\u6F6E\u5F15\u767C\u6297\u8B70", `\u5931\u696D\u7387\u5347\u81F3 ${s.unemployment.toFixed(1)}%\uFF0C\u591A\u5730\u51FA\u73FE\u52DE\u5DE5\u6297\u8B70\uFF0C\u9752\u5E74\u5C31\u696D\u554F\u984C\u5C24\u5176\u5C16\u92B3\u3002`, "risk", ["\u7E3D\u9AD4\u7D93\u6FDF"], { approval: -3, socialTrust: -2, politicalStability: -2 }));
  }
  if (s.housingPrice >= 130) {
    out.push(ev(c.year, "\u9752\u5E74\u5C45\u4F4F\u5371\u6A5F", `\u623F\u50F9\u6307\u6578\u4F86\u5230 ${s.housingPrice.toFixed(0)}\uFF0C\u9752\u5E74\u8207\u79DF\u5C4B\u65CF\u7121\u529B\u8CA0\u64D4\uFF0C\u7121\u6BBC\u8778\u725B\u96C6\u7D50\u4E0A\u8857\u3002`, "risk", ["\u4F4F\u5B85\u653F\u7B56"], { approval: -2.5, socialTrust: -2, politicalCapital: -2 }));
  }
  if (s.inequality >= 55) {
    out.push(ev(c.year, "\u8CA7\u5BCC\u5DEE\u8DDD\u6FC0\u5316\u5C0D\u7ACB", `\u8CA7\u5BCC\u5DEE\u8DDD\u6307\u6578\u5347\u81F3 ${s.inequality.toFixed(0)}\uFF0C\u793E\u6703\u76F8\u5C0D\u525D\u596A\u611F\u5347\u9AD8\uFF0C\u968E\u7D1A\u5C0D\u7ACB\u6210\u70BA\u653F\u6CBB\u8B70\u984C\u3002`, "risk", ["\u5206\u914D\u653F\u7B56"], { socialTrust: -3, politicalStability: -1 }));
  }
  if (s.growth >= 4 && s.unemployment < 5) {
    out.push(ev(c.year, "\u7D93\u6FDF\u69AE\u666F", `\u7D93\u6FDF\u6210\u9577\u7387\u9054 ${s.growth.toFixed(1)}%\u3001\u5C31\u696D\u7A69\u5B9A\uFF0C\u4F01\u696D\u589E\u8CC7\u3001\u6C11\u773E\u6709\u611F\uFF0C\u653F\u5E9C\u8072\u671B\u4E0A\u63DA\u3002`, "good", ["\u7E3D\u9AD4\u7D93\u6FDF"], { approval: 3, socialTrust: 1.5, politicalCapital: 2 }));
  }
  if (s.energy < 45) {
    out.push(ev(c.year, "\u4F9B\u96FB\u8207\u80FD\u6E90\u58D3\u529B", `\u80FD\u6E90\u4F9B\u7D66\u9918\u88D5\u7E2E\u6E1B\uFF0C\u5206\u5340\u9650\u96FB\u50B3\u805E\u885D\u64CA\u7522\u696D\u8207\u6C11\u751F\u7528\u96FB\u4FE1\u5FC3\u3002`, "risk", ["\u80FD\u6E90\u653F\u7B56"], { growth: -0.3, approval: -2 }));
  }
  return out;
}
function companyEvents(s, c) {
  const out = [];
  if (c.rng() < c.swanP) {
    const pool = blackSwans.filter((b) => !c.usedSwan.includes(b.id));
    const pick = pool[Math.floor(c.rng() * pool.length)] ?? blackSwans[0];
    let detail = pick.detailC;
    let eff = { ...pick.effectsC };
    if (pick.id === "bs_tech_revolution" && s.rnd >= 55) {
      detail = "AI \u6280\u8853\u9769\u547D\u5230\u4F86\uFF0C\u8CB4\u516C\u53F8\u9577\u671F\u6295\u5165\u7684\u7814\u767C\u6B63\u597D\u5361\u4F4D\uFF0C\u7522\u54C1\u5F4E\u9053\u8D85\u8ECA\uFF0C\u8CC7\u672C\u5E02\u5834\u7D66\u4E88\u9AD8\u5EA6\u671F\u5F85\u3002";
      eff = { rnd: 4, marketShare: 3, revenue: 500, investorConfidence: 12, brand: 4 };
    }
    out.push(ev(c.year, "\u9ED1\u5929\u9D5D\uFF1A" + pick.title, detail, "blackswan", ["\u7E3D\u9AD4\u74B0\u5883"], eff, true));
  }
  if (c.monthsCash < 4 && c.monthsCash >= 0) {
    out.push(ev(c.year, "\u73FE\u91D1\u6D41\u8B66\u5831", `\u5E33\u4E0A\u73FE\u91D1\u53EA\u5920\u652F\u61C9\u7D04 ${c.monthsCash.toFixed(1)} \u500B\u6708\u71DF\u904B\uFF0C\u82E5\u71DF\u6536\u672A\u6539\u5584\uFF0C\u5C07\u9762\u81E8\u767C\u4E0D\u51FA\u85AA\u6C34\u7684\u98A8\u96AA\u3002`, "risk", ["\u8CA1\u52D9\u8ABF\u5EA6"], { investorConfidence: -6 }));
  }
  if (c.debtRatio > 2.5 && s.revenue < s.debt) {
    out.push(ev(c.year, "\u50B5\u52D9\u5371\u6A5F", "\u8CA0\u50B5\u9060\u8D85\u5E74\u5EA6\u71DF\u6536\uFF0C\u9280\u884C\u7DCA\u7E2E\u984D\u5EA6\u3001\u4F9B\u61C9\u5546\u8981\u6C42\u9810\u4ED8\uFF0C\u8CC7\u91D1\u93C8\u96A8\u6642\u53EF\u80FD\u65B7\u88C2\u3002", "crisis", ["\u73FE\u91D1\u6D41\u8B66\u5831"], { investorConfidence: -12, brand: -4 }));
  }
  if (s.marketShare < 1 && c.year > 2) {
    out.push(ev(c.year, "\u5E02\u5834\u908A\u7DE3\u5316", "\u5E02\u5360\u7387\u8DCC\u7834 1%\uFF0C\u7522\u54C1\u9010\u6F38\u88AB\u4E3B\u6D41\u5E02\u5834\u5FFD\u7565\uFF0C\u901A\u8DEF\u8207\u5A92\u9AD4\u66DD\u5149\u90FD\u5728\u6D41\u5931\u3002", "crisis", ["\u5E02\u5834\u7AF6\u722D"], { brand: -5, revenue: -150 }));
  }
  if (s.competitor >= 75 && c.rng() < 0.5) {
    out.push(ev(c.year, "\u7AF6\u722D\u8005\u767C\u52D5\u50F9\u683C\u6230", "\u4E3B\u8981\u5C0D\u624B\u5927\u8209\u964D\u50F9\u88DC\u8CBC\uFF0C\u6436\u8D70\u50F9\u683C\u654F\u611F\u5BA2\u6236\uFF0C\u516C\u53F8\u9762\u81E8\u8DDF\u9032\u6216\u5805\u6301\u7684\u5169\u96E3\u3002", "risk", ["\u5E02\u5834\u7AF6\u722D"], { marketShare: -1.5, revenue: -200, investorConfidence: -3 }));
  }
  if (s.rnd >= 60 && c.rng() < 0.4) {
    out.push(ev(c.year, "\u7814\u767C\u50B3\u51FA\u7A81\u7834", "\u5718\u968A\u5728\u6838\u5FC3\u6280\u8853\u4E0A\u53D6\u5F97\u95DC\u9375\u7A81\u7834\uFF0C\u65B0\u7522\u54C1\u7372\u5F97\u5E02\u5834\u77DA\u76EE\uFF0C\u8A62\u554F\u5EA6\u5927\u589E\u3002", "good", ["\u7814\u767C\u6295\u5165"], { marketShare: 1.5, revenue: 300, brand: 4, investorConfidence: 5 }));
  }
  if (s.brand >= 70 && c.rng() < 0.4) {
    out.push(ev(c.year, "\u7522\u54C1\u7206\u7D05", "\u54C1\u724C\u8072\u91CF\u53D1\u9175\uFF0C\u55AE\u4E00\u7522\u54C1\u5728\u793E\u7FA4\u5F15\u7206\u8A71\u984C\uFF0C\u8A02\u55AE\u8207\u6D41\u91CF\u5927\u5E45\u6E67\u5165\u3002", "good", ["\u54C1\u724C\u884C\u92B7"], { customers: 0, marketShare: 2, revenue: 450, brand: 3 }));
  }
  if (s.investorConfidence < 30 && c.rng() < 0.5) {
    out.push(ev(c.year, "\u52DF\u8CC7\u9047\u51B7", "\u8CC7\u672C\u5E02\u5834\u5C0D\u516C\u53F8\u524D\u666F\u8F49\u8DA8\u4FDD\u5B88\uFF0C\u4E0B\u4E00\u8F2A\u52DF\u8CC7\u4F30\u503C\u88AB\u58D3\u3001\u8AC7\u5224\u56F0\u96E3\u3002", "risk", ["\u6295\u8CC7\u4EBA\u95DC\u4FC2"], { investorConfidence: -4 }));
  }
  if (s.production < 25 && s.marketShare > 10) {
    out.push(ev(c.year, "\u7522\u80FD\u8FFD\u4E0D\u4E0A\u8A02\u55AE", "\u5E02\u5834\u9700\u6C42\u8D85\u904E\u4F9B\u7D66\u80FD\u529B\uFF0C\u8A02\u55AE\u7A4D\u58D3\u3001\u5BA2\u6236\u7B49\u5F85\u904E\u4E45\uFF0C\u7AF6\u722D\u8005\u6709\u6A5F\u53EF\u4E58\u3002", "risk", ["\u71DF\u904B\u7522\u80FD"], { brand: -3, marketShare: -1 }));
  }
  return out;
}

// src/engine/president.ts
var rivals = ["\u6C5F\u660E\u502B", "\u9673\u82E5\u5D50", "\u674E\u570B\u68DF", "\u8607\u5A49\u6E05", "\u8D99\u5929\u884C"];
function computePresidentTurn(raw, active, difficulty, usedSwan, prevStreak, lastRecallYear, rng2 = Math.random) {
  const s = structuredClone(raw);
  const contrib = {};
  const year = s.year;
  const newActions = active.filter((a) => a.yearEnacted === year);
  const permanent = active.filter((a) => a.duration === "permanent");
  const newInstant = newActions.filter((a) => a.duration === "instant");
  const activeNames = active.filter((a) => a.scale > 0).map((a) => a.name);
  const noRev = (e) => {
    const c = { ...e };
    delete c.revenue;
    return c;
  };
  for (const a of permanent) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  for (const a of newInstant) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  const policyRevenue = permanent.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0) + newInstant.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0);
  const recurringNet = permanent.reduce((n, a) => n + a.recurring * a.scale, 0);
  const instantCost = newActions.reduce((n, a) => n + a.cost * a.scale, 0);
  const debtNow = newActions.reduce((n, a) => n + (a.effects.debtNow || 0) * a.scale, 0);
  const interestOpen = s.debt * (s.interestRate / 100);
  const totalRevenue = s.revenue + policyRevenue;
  const totalSpending = s.fixedSpending + interestOpen + recurringNet + instantCost;
  const balance = totalRevenue + Math.max(0, debtNow) - totalSpending;
  let deficit = 0;
  s.debt += Math.max(0, debtNow);
  if (debtNow > 0) addContribution(contrib, "debt", "\u8209\u50B5\u653F\u7B56", debtNow);
  if (balance < 0) {
    deficit = -balance;
    s.debt += deficit;
    addContribution(contrib, "debt", "\u8CA1\u653F\u8D64\u5B57", deficit);
  } else if (balance > 0) {
    const pay = balance * 0.7;
    s.debt = Math.max(0, s.debt - pay);
    addContribution(contrib, "debt", "\u76C8\u9918\u511F\u50B5", -pay);
  }
  const g0 = s.growth;
  s.growth += (2.5 - s.growth) * 0.25;
  addContribution(contrib, "growth", "\u7D93\u6FDF\u5FAA\u74B0", s.growth - g0);
  const u0 = s.unemployment;
  s.unemployment -= (s.growth - 2.5) * 0.35;
  s.unemployment += (4.2 - s.unemployment) * 0.2;
  addContribution(contrib, "unemployment", "\u7E3D\u9AD4\u7D93\u6FDF\u8ABF\u7BC0", s.unemployment - u0);
  const i0 = s.inflation;
  s.inflation += (s.growth - 3) * 0.35 - (s.unemployment - 4.5) * 0.15 + (2.2 - s.inflation) * 0.2;
  addContribution(contrib, "inflation", "\u7E3D\u9AD4\u7D93\u6FDF\u8ABF\u7BC0", s.inflation - i0);
  const h0 = s.housingPrice;
  s.housingPrice += s.growth * 1.2 - (s.interestRate - 3) * 2 + (100 - s.housingPrice) * 0.03;
  addContribution(contrib, "housingPrice", "\u7E3D\u9AD4\u7D93\u6FDF\u8ABF\u7BC0", s.housingPrice - h0);
  const gdp0 = s.gdp;
  s.gdp = s.gdp * (1 + s.growth / 100);
  addContribution(contrib, "gdp", "\u7D93\u6FDF\u6210\u9577", s.gdp - gdp0);
  for (const k of ["defense", "education", "healthcare", "welfare", "housing", "energy"]) {
    const before = s[k];
    s[k] += (55 - s[k]) * 0.05;
    addContribution(contrib, k, "\u670D\u52D9\u91CF\u80FD\u6298\u820A", s[k] - before);
  }
  const eco = s.growth * 2 - Math.max(0, s.unemployment - 4.5) * 3 - Math.max(0, s.inflation - 3) * 3;
  const a0 = s.approval;
  s.approval += eco * 0.4 + (50 - s.approval) * 0.18;
  addContribution(contrib, "approval", "\u65BD\u653F\u6EFF\u610F\u5EA6", s.approval - a0);
  const t0 = s.socialTrust;
  s.socialTrust += (s.approval - 50) * 0.08 + (60 - s.socialTrust) * 0.04 - Math.max(0, s.inequality - 45) * 0.05;
  addContribution(contrib, "socialTrust", "\u793E\u6703\u6C1B\u570D", s.socialTrust - t0);
  const ps0 = s.politicalStability;
  s.politicalStability += (s.approval - 50) * 0.12 + (s.socialTrust - 60) * 0.06 + (70 - s.politicalStability) * 0.04;
  addContribution(contrib, "politicalStability", "\u653F\u6CBB\u60C5\u52E2", s.politicalStability - ps0);
  s.govSupport += (s.approval - s.govSupport) * 0.3;
  s.opposition = clamp(100 - s.govSupport, 1, 99);
  const pc0 = s.politicalCapital;
  s.politicalCapital += (s.approval - 50) * 0.1 + (60 - s.politicalCapital) * 0.05;
  addContribution(contrib, "politicalCapital", "\u653F\u6CBB\u8CC7\u672C\u8B8A\u5316", s.politicalCapital - pc0);
  const debtRatio = s.debt / s.gdp;
  const targetRate = 2.2 + Math.max(0, debtRatio - 0.55) * 3.5 + Math.max(0, s.inflation - 2.3) * 0.3;
  const r0 = s.interestRate;
  s.interestRate += (targetRate - s.interestRate) * 0.4;
  addContribution(contrib, "interestRate", "\u50B5\u4FE1\u8207\u8CA8\u5E63\u60C5\u52E2", s.interestRate - r0);
  s.revenue = totalRevenue * (1 + s.growth * 5e-3);
  s.fixedSpending *= 1 + s.inflation * 0.01;
  s.interest = interestOpen;
  s.spending = totalSpending;
  s.discretionary = Math.max(0, s.revenue - s.fixedSpending - s.debt * (s.interestRate / 100));
  s.allocated = 0;
  const swanP = { easy: 0.03, normal: 0.07, hard: 0.11, extreme: 0.16 }[difficulty];
  const events = presidentEvents(s, {
    year,
    deficit,
    debtRatio,
    activeNames,
    usedSwan,
    swanP,
    rng: rng2
  });
  const newUsed = [...usedSwan];
  for (const e of events) {
    if (e.effects) applyEffects(s, e.effects, 1, contrib, e.title);
    if (e.blackSwan) {
      const bs = blackSwans.find((b) => "\u9ED1\u5929\u9D5D\uFF1A" + b.title === e.title);
      if (bs && !newUsed.includes(bs.id)) newUsed.push(bs.id);
    }
  }
  clampPresident(s);
  let gameOver = false;
  let endReason;
  if (debtRatio > 1.5 && deficit > 150 && s.interestRate > 8) {
    gameOver = true;
    endReason = "\u8CA1\u653F\u5371\u6A5F\uFF1A\u653F\u5E9C\u5931\u53BB\u878D\u8CC7\u80FD\u529B\uFF0C\u7121\u529B\u652F\u4ED8\u5FC5\u8981\u652F\u51FA\u8207\u50B5\u52D9\u5229\u606F\u3002";
  } else if (s.politicalStability < 12 || s.socialTrust < 12) {
    gameOver = true;
    endReason = "\u653F\u6CBB\u5236\u5EA6\u5931\u7A69\uFF1A\u793E\u6703\u8207\u653F\u6CBB\u4FE1\u4EFB\u5168\u9762\u5D29\u6F70\uFF0C\u653F\u5E9C\u5DF2\u7121\u6CD5\u6B63\u5E38\u904B\u4F5C\u3002";
  }
  const recallPending = !gameOver && year - lastRecallYear >= 2 && s.approval < 30 && s.socialTrust < 35 && s.opposition > 62;
  const electionDue = year % 4 === 0;
  s.gameOver = gameOver;
  if (endReason) s.endReason = endReason;
  const growthStreak = s.growth >= 4 ? prevStreak + 1 : 0;
  const changes = buildChangeReasons(contrib);
  return {
    state: s,
    changes,
    events,
    usedSwan: newUsed,
    deficit,
    balance,
    totalRevenue,
    totalSpending,
    debtRatio,
    recallPending,
    electionDue,
    growthStreak
  };
}
var recallChoices = [
  { id: "explain", label: "\u516C\u958B\u8AAA\u660E", mod: 5, effects: { approval: 2, socialTrust: 1 } },
  { id: "concession", label: "\u653F\u7B56\u8B93\u6B65", mod: 18, effects: { approval: 6, socialTrust: 4, politicalCapital: -3 } },
  { id: "reform", label: "\u5BA3\u5E03\u6539\u9769", mod: 15, effects: { socialTrust: 5, politicalStability: 3, politicalCapital: -5 } },
  { id: "negotiate", label: "\u653F\u6CBB\u8AC7\u5224", mod: 12, effects: { opposition: -6, approval: 2, politicalCapital: -4 } },
  { id: "hold", label: "\u7DAD\u6301\u539F\u653F\u7B56", mod: -10, effects: { approval: -4, politicalStability: -4 } },
  { id: "ignore", label: "\u5B8C\u5168\u4E0D\u8655\u7406", mod: -25, effects: { approval: -8, socialTrust: -8, politicalStability: -8 } }
];
function resolveRecall(s, choiceId, rng2 = Math.random) {
  const c = recallChoices.find((x) => x.id === choiceId) || recallChoices[0];
  const survive = 50 + (s.approval - 30) * 1.2 + (s.socialTrust - 35) * 0.8 + (s.politicalStability - 50) * 0.4 + c.mod;
  const surviveChance = clamp(survive, 3, 97);
  const removed = rng2() * 100 >= surviveChance;
  return { removed, surviveChance, choiceLabel: c.label, effects: c.effects };
}
function resolveElection(s, term, runAgain, rng2 = Math.random) {
  const rivalName = rivals[Math.floor(rng2() * rivals.length)];
  if (!runAgain) {
    return { ran: false, won: false, playerVotes: 0, rivalVotes: 0, rivalName };
  }
  const score = s.approval * 0.55 + s.govSupport * 0.2 + clamp(s.growth, 0, 8) * 6 - Math.max(0, s.unemployment - 5) * 4 - Math.max(0, s.inflation - 4) * 3 + (s.socialTrust - 50) * 0.3 - (term >= 2 ? 3 : 0);
  let playerVotes = 50 + (score - 50) * 0.8 + (rng2() * 8 - 4);
  playerVotes = Math.round(clamp(playerVotes, 5, 95));
  return { ran: true, won: playerVotes > 50, playerVotes, rivalVotes: 100 - playerVotes, rivalName };
}

// src/engine/company.ts
var regionOrder = ["local", "national", "regional", "global"];
var expandCost = { national: 800, regional: 2200, global: 5e3 };
var expandBrandNeed = { national: 35, regional: 58, global: 74 };
function regionInfo(id) {
  return regions.find((r) => r.id === id) || regions[0];
}
function nextRegion(id) {
  const i = regionOrder.indexOf(id);
  return i >= 0 && i < regionOrder.length - 1 ? regionOrder[i + 1] : null;
}
function canExpandRegion(s) {
  const nr = nextRegion(s.region);
  if (!nr) return false;
  return s.cash >= (expandCost[nr] || 0) && s.brand >= (expandBrandNeed[nr] || 0);
}
function expandRegion(s) {
  const nr = nextRegion(s.region);
  if (!nr) return s;
  const cost = expandCost[nr] || 0;
  s.cash -= cost;
  s.region = nr;
  s.investorConfidence += 4;
  s.milestone = "\u696D\u52D9\u5340\u57DF\u62D3\u5C55\u81F3\u300C" + regionInfo(nr).name + "\u300D";
  return s;
}
function canIPO(s) {
  return !s.ipo && s.revenue >= 3e3 && s.profit > 0 && s.cash >= 2e3 && s.investorConfidence >= 60 && s.marketShare >= 8;
}
function doIPO(s) {
  s.ipo = true;
  s.cash += 8e3;
  s.stockPrice = Math.round(40 + s.marketShare * 2.2 + s.brand * 0.4 + Math.max(0, s.profit) / 200);
  s.investorConfidence = clamp(s.investorConfidence + 15, 0, 100);
  s.milestone = "\u516C\u53F8\u65BC\u8B49\u5238\u4EA4\u6613\u6240\u639B\u724C\u4E0A\u5E02\uFF08IPO\uFF09\uFF0C\u52DF\u5F97\u5927\u7B46\u8CC7\u91D1";
  return s;
}
function computeCompanyTurn(raw, active, difficulty, usedSwan, rng2 = Math.random) {
  const s = structuredClone(raw);
  const contrib = {};
  const year = s.year;
  const newActions = active.filter((a) => a.yearEnacted === year);
  const permanent = active.filter((a) => a.duration === "permanent");
  const newInstant = newActions.filter((a) => a.duration === "instant");
  const actionRev = permanent.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0) + newInstant.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0);
  const noRev = (e) => {
    const c = { ...e };
    delete c.revenue;
    return c;
  };
  for (const a of permanent) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  for (const a of newInstant) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  const organicRate = clamp(
    0.03 + (s.brand - 50) * 12e-4 + (s.rnd - 50) * 1e-3 + (s.production - 50) * 6e-4 - (s.competitor - 50) * 22e-4,
    -0.3,
    0.35
  );
  const rev0 = s.revenue;
  const newRevenue = Math.max(0, s.revenue * (1 + organicRate) + actionRev);
  s.revenue = newRevenue;
  addContribution(contrib, "revenue", "\u5E02\u5834\u6709\u6A5F\u6210\u9577", s.revenue * organicRate);
  addContribution(contrib, "revenue", "\u7D93\u71DF\u6C7A\u7B56", actionRev);
  const comp0 = s.competitor;
  s.competitor += (50 - s.competitor) * 0.08 + (s.rnd < 40 ? 1.2 : 0) - (s.brand > 70 ? 1 : 0);
  addContribution(contrib, "competitor", "\u7AF6\u722D\u74B0\u5883", s.competitor - comp0);
  for (const k of ["brand", "rnd", "production"]) {
    const target = k === "brand" ? 42 : 40;
    const before = s[k];
    s[k] += (target - s[k]) * 0.05;
    addContribution(contrib, k, "\u91CF\u80FD\u81EA\u7136\u8870\u9000", s[k] - before);
  }
  const cap = regionInfo(s.region).shareCap;
  if (s.marketShare > cap) {
    const over = s.marketShare - cap;
    s.marketShare = cap;
    addContribution(contrib, "marketShare", "\u5E02\u5834\u5340\u57DF\u898F\u6A21\u4E0A\u9650", -over);
  }
  if (s.competitor > 70 && s.brand < 50) {
    s.marketShare -= 0.6;
    addContribution(contrib, "marketShare", "\u7AF6\u722D\u58D3\u529B", -0.6);
  }
  const payroll = s.employees * s.salary;
  const recurringNet = permanent.reduce((n, a) => n + a.recurring * a.scale, 0);
  const instantCost = newActions.reduce((n, a) => n + a.cost * a.scale, 0);
  const debtNow = newActions.reduce((n, a) => n + (a.effects.debtNow || 0) * a.scale, 0);
  const cashNow = newActions.reduce((n, a) => n + (a.effects.cashNow || 0) * a.scale, 0);
  s.debt += Math.max(0, debtNow);
  const rate = clamp(7 + (100 - s.investorConfidence) * 0.1 + Math.max(0, s.debt / Math.max(s.revenue, 1) - 1) * 3, 7, 20);
  const interest = s.debt * rate / 100;
  const profit = s.revenue - payroll - recurringNet - instantCost - interest;
  s.profit = Math.round(profit);
  addContribution(contrib, "profit", "\u5E74\u5EA6\u640D\u76CA", profit);
  const cashBefore = s.cash;
  s.cash += profit + cashNow;
  if (s.customers > 0) s.customers = Math.round(s.customers * (1 + clamp((s.revenue / Math.max(rev0, 1) - 1) * 0.5, -0.4, 0.6)));
  const ic0 = s.investorConfidence;
  s.investorConfidence += (profit > 0 ? 2.5 : -3) + clamp(s.revenue / 2e3, -2, 3) + (s.cash < 0 ? -10 : 0);
  addContribution(contrib, "investorConfidence", "\u8CA1\u52D9\u9AD4\u8CEA", s.investorConfidence - ic0);
  const monthsCost = Math.max(1, (payroll + Math.max(0, recurringNet)) / 12);
  const monthsCash = s.cash / monthsCost;
  const swanP = { easy: 0.03, normal: 0.07, hard: 0.11, extreme: 0.16 }[difficulty];
  const events = companyEvents(s, {
    year,
    monthsCash,
    debtRatio: s.debt / Math.max(s.revenue, 1),
    usedSwan,
    swanP,
    rng: rng2,
    active
  });
  const newUsed = [...usedSwan];
  for (const e of events) {
    if (e.effects) applyEffects(s, noRev(e.effects), 1, contrib, e.title);
    if (e.blackSwan) {
      const bs = blackSwans.find((b) => "\u9ED1\u5929\u9D5D\uFF1A" + b.title === e.title);
      if (bs && !newUsed.includes(bs.id)) newUsed.push(bs.id);
    }
  }
  clampCompany(s);
  let bankrupt = false;
  let endReason;
  if (s.cash < 0 && s.investorConfidence < 20) {
    bankrupt = true;
    endReason = "\u6D41\u52D5\u6027\u5371\u6A5F\uFF1A\u73FE\u91D1\u7528\u76E1\u4E14\u7121\u6CD5\u518D\u878D\u8CC7\uFF0C\u516C\u53F8\u767C\u4E0D\u51FA\u85AA\u6C34\u3001\u7121\u529B\u511F\u9084\u50B5\u52D9\u3002";
  } else if (s.debt > 2.5 * Math.max(s.revenue, 1) && s.cash < 0) {
    bankrupt = true;
    endReason = "\u50B5\u52D9\u5371\u6A5F\uFF1A\u8CA0\u50B5\u9060\u8D85\u71DF\u6536\u3001\u8CC7\u91D1\u93C8\u65B7\u88C2\uFF0C\u516C\u53F8\u5BA3\u5E03\u7834\u7522\u3002";
  } else if (s.marketShare < 0.5 && year > 3) {
    bankrupt = true;
    endReason = "\u5E02\u5834\u9000\u51FA\uFF1A\u5E02\u5360\u7387\u5D29\u843D\u81F3\u5E7E\u4E4E\u70BA\u96F6\uFF0C\u7522\u54C1\u5931\u53BB\u901A\u8DEF\u8207\u5BA2\u6236\uFF0C\u516C\u53F8\u505C\u6B62\u71DF\u904B\u3002";
  } else if (s.cash < 0) {
    const gap = -s.cash;
    s.debt += gap;
    addContribution(contrib, "debt", "\u7DCA\u6025\u6A4B\u63A5\u8CB8\u6B3E", gap);
    s.cash = 0;
    s.investorConfidence -= 6;
  }
  if (bankrupt) {
    s.gameOver = true;
    s.endReason = endReason;
  }
  addContribution(contrib, "cash", "\u5E74\u5EA6\u73FE\u91D1\u6D41", s.cash - cashBefore);
  const changes = buildChangeReasons(contrib);
  return { state: s, changes, events, usedSwan: newUsed, monthsCash, profit: s.profit, revenue: s.revenue, bankrupt };
}

// src/engine/achievements.ts
var pPred = {
  pa_first_year: (c) => c.year >= 2,
  pa_balanced: (c) => c.balance >= 0,
  pa_miracle: (c) => c.growthStreak >= 3,
  pa_trust: (c) => c.s.socialTrust >= 85,
  pa_recall_win: (c) => c.recallSurvived,
  pa_survivor: (c) => c.hadSwan && !c.s.gameOver,
  pa_debt_cut: (c) => c.s.debt <= c.startDebt * 0.8,
  pa_reelected: (c) => c.term >= 2
};
var cPred = {
  ca_first_revenue: (c) => c.s.revenue >= 1200,
  ca_first_profit: (c) => c.profitStreak >= 1,
  ca_cert: (c) => c.s.brand >= 60,
  ca_overseas: (c) => c.s.region === "regional" || c.s.region === "global",
  ca_survivor: (c) => c.hadSwan && !c.s.gameOver,
  ca_unicorn: (c) => c.s.cash >= 1e4 || !!c.s.ipo && (c.s.stockPrice ?? 0) >= 80,
  ca_leader: (c) => c.s.marketShare >= c.shareCap * 0.8,
  ca_ipo: (c) => !!c.s.ipo
};
function run(pred, c, unlocked) {
  const out = [];
  for (const [id, fn] of Object.entries(pred)) {
    if (!unlocked.includes(id)) {
      try {
        if (fn(c)) out.push(id);
      } catch {
      }
    }
  }
  return out;
}
var evalPresident = (c, unlocked) => run(pPred, c, unlocked);
var evalCompany = (c, unlocked) => run(cPred, c, unlocked);

// scripts/smoke.ts
var failures = 0;
function check(name, cond, extra = "") {
  if (cond) console.log("  PASS  " + name + (extra ? "  (" + extra + ")" : ""));
  else {
    console.error("  FAIL  " + name + (extra ? "  (" + extra + ")" : ""));
    failures++;
  }
}
function toActive(def, scale, year) {
  return {
    id: def.id,
    name: def.name,
    desc: def.desc,
    category: def.category,
    cost: def.cost,
    recurring: def.recurring,
    duration: def.duration,
    effects: def.effects,
    stakeholders: def.stakeholders || {},
    scale,
    yearEnacted: year,
    tags: def.tags
  };
}
var rng = () => 0.9;
var findP = (id) => presidentPolicies.find((p) => p.id === id);
var findC = (id) => companyActions.find((p) => p.id === id);
console.log("\n[H] \u653F\u7B56\u6548\u679C\u9375\u662F\u5426\u90FD\u5C0D\u5F97\u5230\u5F15\u64CE\u6578\u503C\u6B04\u4F4D");
{
  const special = /* @__PURE__ */ new Set(["revenue", "debtNow", "cashNow"]);
  const p0 = initialPState("normal");
  const c0 = initialCState(industries[0], "normal");
  const pBad = [];
  for (const d of allPresidentActions) for (const k of Object.keys(d.effects)) {
    if (special.has(k)) continue;
    if (typeof p0[k] !== "number") pBad.push(d.id + "." + k);
  }
  const cBad = [];
  for (const d of companyActions) for (const k of Object.keys(d.effects)) {
    if (special.has(k)) continue;
    if (typeof c0[k] !== "number") cBad.push(d.id + "." + k);
  }
  check("\u7E3D\u7D71\u653F\u7B56\u7121\u7121\u6548\u9375", pBad.length === 0, pBad.join(", ") || "\u5168\u90E8\u5C0D\u5F97\u5230\u6B04\u4F4D");
  check("\u4F01\u696D\u6C7A\u7B56\u7121\u7121\u6548\u9375", cBad.length === 0, cBad.join(", ") || "\u5168\u90E8\u5C0D\u5F97\u5230\u6B04\u4F4D");
}
console.log("\n[C] \u53EF\u884C\u6027\u6AA2\u67E5\u8207\u653F\u7B56\u885D\u7A81");
{
  const s = initialPState("normal");
  const cut = findP("p_corptax_cut");
  const f = presidentFeasibility(cut, 1, s, [], 0);
  check("\u7E3D\u7D71\u53EF\u884C\u6027\u56DE\u50B3\u5B8C\u6574\u7D50\u69CB", ["green", "yellow", "red", "conflict"].includes(f.level) && Array.isArray(f.issues) && typeof f.firstYearCost === "number", "level=" + f.level);
  const up = findP("p_corptax_up");
  const conf = findConflicts(up, [toActive(cut, 1, 1)]);
  check("\u964D\u4F4E\u8207\u63D0\u9AD8\u4F01\u696D\u7A05\u4E92\u76F8\u5224\u5B9A\u70BA\u885D\u7A81", conf.length > 0, conf.join("/"));
  const c = initialCState(industries[0], "normal");
  c.productName = "x";
  c.headquarters = "\u53F0\u5317";
  const cf = companyFeasibility(findC("c_acquire"), 1, c, []);
  check("\u4F01\u696D\u53EF\u884C\u6027\u56DE\u50B3\u5B8C\u6574\u7D50\u69CB", ["green", "yellow", "red", "conflict"].includes(cf.level), "level=" + cf.level + " gap=" + cf.gap);
}
console.log("\n[A] \u7E3D\u7D71\u6B63\u5E38\u5C40\uFF1A\u5E74\u4EFD\u9010\u5E74\u63A8\u9032\u3001\u7B2C 4 \u5E74\u5927\u9078\u3001\u9023\u4EFB\u9032\u7B2C\u4E8C\u4EFB");
{
  let s = initialPState("normal");
  let usedSwan = [], streak = 0, lastRecall = -9;
  const active = [toActive(findP("p_public_jobs"), 1, 1), toActive(findP("p_green"), 1, 2)];
  const rows = [];
  let broke = false;
  for (let y = 1; y <= 8; y++) {
    const pt = computePresidentTurn(s, active, "normal", usedSwan, streak, lastRecall, rng);
    rows.push({ y, deficit: Math.round(pt.deficit), debt: Math.round(pt.state.debt), elect: pt.electionDue, recall: pt.recallPending, ev: pt.events.length });
    usedSwan = pt.usedSwan;
    streak = pt.growthStreak;
    s = pt.state;
    if (pt.electionDue) {
      if (s.term >= 2) {
        s.gameOver = true;
      } else {
        s.approval = Math.max(s.approval, 72);
        const er = resolveElection(s, s.term, true, rng);
        check(`\u7B2C ${y} \u5E74\u5927\u9078\u7522\u751F\u7968\u6578`, typeof er.playerVotes === "number" && er.playerVotes > 0, `${er.playerVotes}% vs ${er.rivalVotes}%`);
        if (er.won) s.term = s.term + 1;
        else {
          s.gameOver = true;
        }
      }
    }
    if (pt.recallPending) {
      const rr = resolveRecall(s, "concession", rng);
      check("\u7F77\u514D\u61C9\u5C0D\u56DE\u5B58\u6D3B\u6A5F\u7387", rr.surviveChance >= 0 && rr.surviveChance <= 100, rr.surviveChance.toFixed(0) + "%");
    }
    s.year = y + 1;
    if (s.gameOver) {
      broke = true;
      break;
    }
  }
  console.log("    \u5E74\u5EA6:", rows.map((r) => `Y${r.y}(\u8D64\u5B57${r.deficit}/\u50B5${r.debt}${r.elect ? "/\u5927\u9078" : ""}${r.recall ? "/\u7F77\u514D" : ""})`).join(" "));
  check("\u6BCF\u5E74\u90FD\u5B8C\u6210\u7D50\u7B97\uFF08\u5171 8 \u5E74\uFF09", rows.length === 8, "\u5BE6\u969B " + rows.length + " \u5E74");
  check("\u5E74\u4EFD\u6709\u9010\u5E74 +1\uFF08\u7121\u8DF3\u865F\uFF09", s.year === 9, "\u7D50\u675F\u6642 year=" + s.year);
  check("\u7B2C 4 \u5E74\u89F8\u767C\u7E3D\u7D71\u5927\u9078", rows.some((r) => r.y === 4 && r.elect));
  check("\u7B2C 4 \u5E74\u9023\u4EFB\u6210\u529F\u9032\u5165\u7B2C\u4E8C\u4EFB", s.term === 2, "term=" + s.term);
  check("\u7B2C 8 \u5E74\u5169\u4EFB\u5C46\u6EFF\u3001\u904A\u6232\u6B63\u5E38\u7D50\u675F", broke === true, "term=" + s.term + " \u7D50\u675F\u5E74=" + (s.year - 1));
}
console.log("\n[B] \u8CA1\u653F\u7D00\u5F8B\u56E0\u679C\uFF1A\u9AD8\u798F\u5229 + \u73FE\u91D1\u767C\u653E\u4F7F\u50B5\u52D9\u9010\u5E74\u6500\u5347");
{
  let s = initialPState("normal");
  let usedSwan = [], streak = 0, lastRecall = -9;
  const startDebt = s.debt;
  const active = [
    toActive({ ...findP("p_cash_handout") }, 2.5, 1),
    toActive(allPresidentActions.find((b) => b.id === "b_welfare"), 3, 1),
    toActive(allPresidentActions.find((b) => b.id === "b_healthcare"), 2.5, 1)
  ];
  let hitCrisis = false;
  for (let y = 1; y <= 10; y++) {
    const pt = computePresidentTurn(s, active, "normal", usedSwan, streak, lastRecall, rng);
    usedSwan = pt.usedSwan;
    streak = pt.growthStreak;
    s = pt.state;
    if (s.gameOver) hitCrisis = true;
    s.year = y + 1;
    if (s.gameOver) break;
  }
  check("\u9577\u671F\u8D85\u652F\u4F7F\u653F\u5E9C\u50B5\u52D9\u660E\u986F\u4E0A\u5347", s.debt > startDebt + 200, `\u50B5\u52D9 ${Math.round(startDebt)} \u2192 ${Math.round(s.debt)}`);
  console.log("    \u5341\u5E74\u5F8C\u50B5\u52D9\u4F54 GDP:", (s.debt / s.gdp).toFixed(2), hitCrisis ? "\uFF08\u5DF2\u89F8\u767C\u8CA1\u653F/\u653F\u6CBB\u5371\u6A5F\uFF09" : "");
}
console.log("\n[D] \u4F01\u696D\u6B63\u5E38\u5C40\uFF1A\u5E74\u4EFD\u63A8\u9032\u3001\u71DF\u6536\u904B\u8F49\u3001\u7121\u4F8B\u5916");
{
  let c = initialCState(industries[0], "normal");
  c.productName = "AI \u6E2C\u8A66\u7522\u54C1";
  c.headquarters = "\u53F0\u5317";
  const active = [toActive(findC("c_marketing"), 1, 1), toActive(findC("c_supplychain"), 1, 1), toActive(findC("c_rnd"), 1, 2)];
  let used = [];
  let years = 0;
  for (let y = 1; y <= 6; y++) {
    const ct = computeCompanyTurn(c, active, "normal", used, rng);
    used = ct.usedSwan;
    c = ct.state;
    years++;
    c.year = y + 1;
    if (c.gameOver) break;
  }
  check("\u4F01\u696D\u5B8C\u6210 6 \u5E74\u7D50\u7B97", years === 6, "\u5BE6\u969B " + years + " \u5E74");
  check("\u5E74\u4EFD\u63A8\u9032\u6B63\u78BA", c.year === 7, "year=" + c.year);
  check("\u71DF\u6536\u70BA\u6B63\u6578", c.revenue > 0, "\u71DF\u6536 " + Math.round(c.revenue) + " \u842C");
}
console.log("\n[E] \u4F01\u696D\u8CC7\u6E90\u4E0D\u8DB3\u4ECD\u5F37\u884C\u57F7\u884C\uFF1A\u5FC5\u9808\u6709\u771F\u5BE6\u5F8C\u679C");
{
  let c = initialCState(industries[1], "extreme");
  c.productName = "\u6E2C\u8A66\u9910\u98F2";
  c.headquarters = "\u53F0\u5317";
  const cash0 = c.cash;
  const active = [toActive(findC("c_acquire"), 1, 1), toActive(findC("c_factory"), 2, 1)];
  let used = [];
  const ct = computeCompanyTurn(c, active, "extreme", used, rng);
  c = ct.state;
  const handled = c.gameOver ? !!c.endReason : c.debt > 0;
  check("\u73FE\u91D1\u65B7\u88C2\u6709\u88AB\u8655\u7406\uFF08\u6A4B\u63A5\u8CB8\u6B3E\u589E\u50B5\u6216\u7834\u7522\u6536\u5834\uFF09", handled, c.gameOver ? "\u7834\u7522\uFF1A" + c.endReason : `\u81EA\u52D5\u8209\u50B5 ${Math.round(c.debt)} \u842C\u3001\u73FE\u91D1 ${Math.round(c.cash)}`);
  check("\u7834\u7522\u6642\u4E00\u5B9A\u6709 endReason", !c.gameOver || typeof c.endReason === "string");
  console.log("    \u521D\u59CB\u73FE\u91D1", cash0, "\u2192 \u5E74\u5F8C\u73FE\u91D1", Math.round(ct.state.cash), "\u8CA0\u50B5", Math.round(ct.state.debt), "\u73FE\u91D1\u6708\u6578", ct.monthsCash.toFixed(1));
}
console.log("\n[F] \u4F01\u696D IPO \u9580\u6ABB\u8207\u639B\u724C\u6548\u679C");
{
  const c = initialCState(industries[0], "normal");
  c.productName = "x";
  c.headquarters = "\u53F0\u5317";
  check("\u672A\u9054\u9580\u6ABB\u6642\u4E0D\u80FD IPO", canIPO(c) === false);
  Object.assign(c, { revenue: 4e3, profit: 300, cash: 3e3, investorConfidence: 70, marketShare: 12 });
  check("\u9054\u6A19\u5F8C\u958B\u653E IPO", canIPO(c) === true);
  const cashBefore = c.cash;
  doIPO(c);
  check("IPO \u5F8C\u72C0\u614B\u6B63\u78BA\uFF08ip o\u3001\u52DF\u8CC7\u3001\u80A1\u50F9\uFF09", c.ipo === true && c.cash >= cashBefore + 7e3 && typeof c.stockPrice === "number", `\u73FE\u91D1 +${c.cash - cashBefore}\u3001\u80A1\u50F9 ${c.stockPrice}`);
}
console.log("\n[G] \u4F01\u696D\u696D\u52D9\u5340\u57DF\u62D3\u5C55");
{
  const c = initialCState(industries[0], "normal");
  c.productName = "x";
  c.headquarters = "\u53F0\u5317";
  c.cash = 6e3;
  c.brand = 80;
  check("\u9054\u6A19\u53EF\u62D3\u5C55", canExpandRegion(c) === true && c.region === "local");
  expandRegion(c);
  check("\u62D3\u5C55\u5F8C\u9032\u5165\u5168\u570B\u5E02\u5834\u4E26\u6263\u9664\u8CBB\u7528", c.region === "national" && Math.round(c.cash) === 5200, "region=" + c.region + " cash=" + Math.round(c.cash));
}
console.log("\n[I] \u6210\u5C31\u5F15\u64CE");
{
  const ps = initialPState("normal");
  ps.year = 2;
  const pa = evalPresident({ s: ps, balance: 0, term: 1, growthStreak: 0, year: 2, recallSurvived: false, hadSwan: false, startDebt: 3e3 }, []);
  check("\u7E3D\u7D71\u6210\u5C31\u56DE\u50B3 id \u9663\u5217", Array.isArray(pa));
  const cs = initialCState(industries[0], "normal");
  cs.productName = "x";
  cs.headquarters = "\u53F0\u5317";
  cs.year = 2;
  const ca = evalCompany({ s: cs, profitStreak: 1, hadSwan: false, shareCap: 8 }, []);
  check("\u4F01\u696D\u6210\u5C31\u56DE\u50B3 id \u9663\u5217", Array.isArray(ca));
}
console.log("\n========================================");
if (failures === 0) {
  console.log("ALL GREEN\uFF1A\u6838\u5FC3\u8FF4\u5708\u7121\u932F\u8AA4");
  process.exit(0);
} else {
  console.error(failures + " \u9805\u6AA2\u67E5\u5931\u6557");
  process.exit(1);
}
