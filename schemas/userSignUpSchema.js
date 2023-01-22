const userSignUpSchema = {
  type: "object",

  properties: {
    firstName: { type: "string" },
    email: { type: "string" },
  },
  required: ["firstName","email"],
  additionalProperties: true,
};


module.exports = {userSignUpSchema}

