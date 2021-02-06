const ResponseJson = require('./../models/responseJsonModel');

// To handle the process request and send back response with the details of the request.
exports.handleRequest = async (req, res) => {
  try {

    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    const minTimeInMs = 15000;
    const maxTimeInMs = 30000;
    
    //To add the random delay
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

// To send back the response with statistics of json documents.
exports.getStats = async (req, res) => {
  try {
    let fromDate, toDate;

    // checking if the request contains toDate and fromDate filter
    if(!req.query.date) {
      fromDate = new Date(0000, 00, 00);
      toDate = new Date();
    } else {
      fromDate = req.query.date.gte ? new Date(req.query.date.gte) : new Date(0000, 00, 00);
      toDate = req.query.date.lte ? new Date(req.query.date.lte) : new Date();
    }
    const stats = await ResponseJson.aggregate([
      {
        $match: {
                  date: { $gte:fromDate, $lte: toDate },
        }
      },
      {
        $group: {
                  _id: '$method',
                  numOfRequests: { $sum:1},
                  avgResponseTime: { $avg: '$duration'},
        }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

// To check if the response data is stored in that database.
exports.getAllResponseJSON = async (req, res) => {
  try {

    const responseJson = await ResponseJson.find();

    res.status(200).json({
      status: 'success',
      results: responseJson.length,
      data: responseJson
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }

}