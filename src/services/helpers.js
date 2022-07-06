const mongoErrorHandler = (error) => {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((err) => err.message);
    return `Invalid input data. ${errors.join(' ')}`;
  }

  if (error.name === 'CastError') {
    return `Invalid ${error.path}: ${error.value}.`;
  }

  if (error.code === 11000) {
    return `${Object.values(error.keyValue)} already exists!`;
  }

  return error;
};

const filterBodyByRole = (body, role) => {
  const entries = Object.entries(body);
  const employee = [
    'fullName',
    'gender',
    'birthDate',
    'phone',
    'address',
    'leaveRequests',
  ];
  const hr = [
    'fullName',
    'gender',
    'birthDate',
    'phone',
    'address',
    'entryDate',
    'employmentType',
    'department',
    'jobTitle',
    'salary',
    'leaveRequests',
  ];

  role === 'hr'
    ? (filteredEntries = entries.filter((en) => hr.includes(en[0])))
    : (filteredEntries = entries.filter((en) => employee.includes(en[0])));

  return Object.fromEntries(filteredEntries);
};

const helpers = {
  filterBodyByRole,
  mongoErrorHandler,
};

module.exports = helpers;
