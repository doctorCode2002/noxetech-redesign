export const entities = [
  { k: "inspector", word: "inspectors", name: "Inspector", fields: ["id", "name", "region", "device"] },
  {
    k: "checklist",
    word: "paper checklists",
    name: "Checklist",
    fields: ["id", "items[]", "photos[]", "signature"],
  },
  { k: "site", word: "site", name: "Site", fields: ["id", "address", "client", "last_visit"] },
  {
    k: "report",
    word: "Excel every week",
    name: "WeeklyReport",
    fields: ["week", "sites", "issues", "pdf_url"],
  },
];

export const steps = ["The request", "The data model", "The working software"];
