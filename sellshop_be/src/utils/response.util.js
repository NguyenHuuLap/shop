const response = (res, status, message, data = null) => {
  res.set("Content-Type", "application/json");
  res.json({
    status: status,
    message,
    data: data !== null ? data : this,
  });
  res.end();
};

export default {
  response,
};
