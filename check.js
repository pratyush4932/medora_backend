const prescriptionText = `
This prescription, dated 12/10/2022 for Sachin Bansare, details the following medications and instructions:

* **Augmentin 625mg:** 1 tablet, twice a day (represented as 1-0-1), after meals, for 5 days.
* **Enzoflam:** 1 tablet, twice a day (1-0-1), after meals, for 5 days.
* **Pan-D 40mg:** 1 tablet, twice a day (1-0-0), before meals, for 5 days.
* **Hexigel gum paint:**  Massage onto gums once a day (1-0-1), for 1 week.
`;

const extractPatientAndMedicines = (text) => {
  // Extract patient name
  const patientMatch = text.match(/for\s([A-Za-z\s]+),\sdetails/);
  const patientName = patientMatch ? patientMatch[1] : "Unknown";

  // Extract medicine names
  const medicineMatches = [...text.matchAll(/\*\*\s?(.+?)\s?\*\*/g)];
  const medicines = medicineMatches.map(match => match[1]).sort();

  return { patientName, medicines };
};

const result = extractPatientAndMedicines(prescriptionText);
console.log("Patient Name:", result.patientName);
console.log("Sorted Medicines:", result.medicines);
