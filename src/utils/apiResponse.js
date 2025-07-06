const successResponse = (res, data, message = 'Successful', meta) => {
  const response = {
    success: true,
    message,
    // data: meta ? { ...data, meta } : data,
    data: meta ? { documents: data, meta } : data,
  };

  res.status(200).json(response);
};

const createdResponse = (res, data, message = 'Resource created successfully') => {
  const response = {
    success: true,
    message,
    data,
  };

  res.status(201).json(response);
};

const paginatedResponse = (res, documents, meta, message = 'Successful') => {
  const response = {
    success: true,
    message,
    data: {
      documents,
      meta,
    },
  };

  res.status(200).json(response);
};

module.exports = {
  successResponse,
  createdResponse,
  paginatedResponse,
};