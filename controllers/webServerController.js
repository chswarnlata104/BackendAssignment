const ResponseJson = require('./../models/responseJsonModel');

exports.handleRequest = async (req, res) => {
  try {

    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    const minTimeInMs = 15000;
    const maxTimeInMs = 30000;
    const delay = Math.floor(Math.random() * (maxTimeInMs - minTimeInMs + 1)) + minTimeInMs;
    await sleep(delay);

    const newResponseJson = new ResponseJson({
      date: req._startTime,
      method: req.method,
      headers: req.headers,
      path: req.path,
      query: req.query,
      body: req.body,
      duration: delay
    });
    newResponseJson.save();

    res.status(200).json({
      status: 'success',
      data: newResponseJson
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};