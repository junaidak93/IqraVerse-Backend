const healthCheck = (_, res) => {
  res.reply(200, "Service is running", {
    status: "ok"
  });
};

export { healthCheck };