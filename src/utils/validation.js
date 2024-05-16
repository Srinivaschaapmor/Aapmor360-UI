const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@gmail\.com$/;
  return emailRegex.test(email);
};

const isValidWorkLocation = (workLocation) => {
  const workLocationRegex = /^[a-zA-Z0-9.\s]+$/;
  return workLocationRegex.test(workLocation);
};

const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
};

const isValidCGPA = (cgpa) => {
  const cgpaRegex = /^(10(\.0{1,3})?|[1-9](\.\d{1,3})?)$/;

  return cgpaRegex.test(cgpa);
};

const isValidFullName = (fullName) => {
  // Allow only letters and spaces, and ensure at least two characters
  const fullNameRegex = /^[A-Za-z ]{2,}$/;
  return fullNameRegex.test(fullName);
};

const isValidYearOfPassout = (year) => {
  // Allow only 4 digits and ensure it falls within the range of 1980 to 2024
  const numericRegex = /^\d{4}$/;

  // Check if the year is within the specified range (1990 to 2024)
  const isValidRange = parseInt(year, 10) >= 1990 && parseInt(year, 10) <= 2024;

  return numericRegex.test(year) && isValidRange;
};

const isValidPhoneNumber = (phoneNumber) => {
  // Allow only numeric characters and ensure a specific length (e.g., 10 digits)
  const phoneNumberRegex = /^[1-9]\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
};

const isValidLaptopName = (laptopName) => {
  // Allow alphanumeric characters, spaces, and hyphens
  const laptopNameRegex = /^[a-zA-Z0-9\s-]+$/;

  return laptopNameRegex.test(laptopName);
};

const isValidProjectName = (projectName) => {
  // Allow alphanumeric characters, spaces, and hyphens
  const projectNameRegex = /^[a-zA-Z0-9\s]{3,30}$/;

  return projectNameRegex.test(projectName);
};

const isValidBranch = (branch) => {
  // Allow only alphanumeric characters and ensure it doesn't start with a number
  const branchRegex = /^[a-zA-Z]+$/;

  // Check if the length is less than or equal to 100 characters
  const isValidLength = branch.length <= 100;

  return branchRegex.test(branch) && isValidLength;
};

const isValidLaptopSerialNumber = (serialNumber) => {
  // Allow alphanumeric characters with a length between 6 and 12 characters
  const serialNumberRegex = /^[a-zA-Z0-9]{6,12}$/;

  return serialNumberRegex.test(serialNumber);
};

const isValidChargerSerialNumber = (chargerSerialNo) => {
  // Allow alphanumeric characters with a length between 6 and 12 characters
  const serialNumberRegex = /^[a-zA-Z0-9]{5,15}$/;

  return serialNumberRegex.test(chargerSerialNo);
};

const isValidMouseSerialNumber = (mouseSerialNumber) => {
  // Allow alphanumeric characters with a length between 6 and 12 characters
  const serialNumberRegex = /^[a-zA-Z0-9]{5,15}$/;

  return serialNumberRegex.test(mouseSerialNumber);
};

const isValidTechnicalSkills = (skills) => {
  // Allow only comma-separated alphanumeric skills
  const skillsRegex = /^([a-zA-Z]+\s*,\s*)*[a-zA-Z]+$/;

  return skillsRegex.test(skills);
};

const isValidEmployeeID = (employeeID) => {
  // Allow alphanumeric characters with a maximum length of 10 characters
  const employeeIDRegex = /^[a-zA-Z0-9]{1,10}$/;

  return employeeIDRegex.test(employeeID);
};

export const Validations = {
  email: {
    validate: isValidEmail,
    errorMessage: "Invalid email address. Must be a valid Gmail address.",
  },
  fullName: {
    validate: isValidFullName,
    errorMessage:
      "Invalid full name. It should contain only letters and be at least two characters long.",
  },
  phoneNumber: {
    validate: isValidPhoneNumber,
    errorMessage:
      "Invalid phone number. It should be a 10-digit numeric value ",
  },
  branch: {
    validate: isValidBranch,
    errorMessage:
      "Invalid branch name. It should start with a letter and only contain alphabet characters.",
  },
  yearOfPassout: {
    validate: isValidYearOfPassout,
    errorMessage: "Invalid year of passout. It should be a 4-digit year.",
  },
  cgpa: {
    validate: isValidCGPA,
    errorMessage:
      "Invalid CGPA. It should be a decimal number between 0 and 10.",
  },
  technicalSkills: {
    validate: isValidTechnicalSkills,
    errorMessage:
      "Invalid technical skills. Please enter a comma-separated list of skills",
  },
  employeeID: {
    validate: isValidEmployeeID,
    errorMessage:
      "Invalid Employee ID. It should be a combination of alphanumeric characters with a maximum length of 10 characters.",
  },
  workLocation: {
    validate: isValidWorkLocation,
    errorMessage:
      "Invalid work location. It should only contain letters and spaces.",
  },
  name: {
    validate: isValidName,
    errorMessage: "Invalid name. It should only contain letters and spaces.",
  },
  laptopName: {
    validate: isValidLaptopName,
    errorMessage:
      "Invalid laptop name. It should only contain alphanumeric characters, spaces, and hyphens.",
  },
  laptopSerialNumber: {
    validate: isValidLaptopSerialNumber,
    errorMessage:
      "Invalid  serial number. It should be a combination of alphanumeric characters with a length between 6 and 12 characters.",
  },
  chargerSerialNumber: {
    validate: isValidChargerSerialNumber,
    errorMessage:
      " Please enter a valid Charger Serial Number (alphanumeric, 5-15 characters).",
  },
  mouseSerialNumber: {
    validate: isValidMouseSerialNumber,
    errorMessage:
      "Invalid  serial number. It should be a combination of alphanumeric characters with a length between 6 and 12 characters.",
  },
  projectName: {
    validate: isValidProjectName,
    errorMessage:
      "Please enter a valid Project Name (alphanumeric, 3-30 characters).",
  },
};
