const ResponseJsonModel = require('./../models/responseJsonModel');

exports.getAllResponse = async (req, res) => {
  try {
    console.log(req);
    console.log('*********');
    console.log(req.headers);
    res.status(200).json({
      status: 'success',
      // data: {
      //   
      // }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};