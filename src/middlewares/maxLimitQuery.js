const defaultMax = 100;

const maxLimitQuery = (max) => (req, res, next) => {
  let maxLimit = defaultMax;
  if (max) {
    maxLimit = max;
  }
  if (req.query.limit) {
    req.query.limit = maxLimit;
  }
  next();
};

module.exports = maxLimitQuery;
