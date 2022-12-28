const userSignUpSchema = {
  type: "object",

  properties: {
    firstName: { type: "string" },
  },
  required: ["firstName"],
  additionalProperties: true,
};


module.exports = {userSignUpSchema}
//   foo: {type: "integer"},
