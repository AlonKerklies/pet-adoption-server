
exports.up =  async  (knex) =>{
   await   knex.schema.createTable('users', (table)=>{
      table.increments('id').primary();
      table.string('firstName').notNull();
      table.string('lastName');
      table.string('email').notNull().unique();
      table.string('phone');
      table.string('password').notNull();
      table.string('type').notNull();
      table.string('profilePic');
      table.string('bio');
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
  
    })
  };
  
  exports.down = async  (knex) => {
    await knex.schema.dropTable('users');
  };