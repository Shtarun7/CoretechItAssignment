const initializeTest = async (req, res) => {
  try {
    req.session.test_started = true;
    return res.status(200).json({
      message: "test started",
      data: null,
      success: "true",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unknown error",
      data: null,
      success: "false",
    });
  }
};

module.exports = { initializeTest };
