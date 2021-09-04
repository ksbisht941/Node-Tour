class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      // 1A) Basic Filtering
      const queryObj = { ...this.queryString };
  
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      // 1B) Advance Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      // console.log("queryStr", JSON.parse(queryStr));
  
      this.query = this.query.find(JSON.parse(queryStr)); 
  
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(req.query.sort);
        // sort('price r')
      } else {
        this.query = this.query.sort("-createdAt");
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("-__v");
      }
  
      return this;
    }
  
    paginate() {
       const page = this.queryString.page * 1 || 1;
       const limit = this.queryString.limit * 1 || 10;
       const skip = (page - 1) * limit;
   
       this.query = this.query.skip(skip).limit(limit);
   
      //  if (this.queryString.page) {
      //    const numTours = await Tour.countDocuments();
      //    if (skip >= numTours) throw new Error('This page does not exist');
      //  }
  
       return this;
    }
  
  
  }

  module.exports = APIFeatures;