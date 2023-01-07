
exports.up = function(knex) {
    return knex.schema.createTable('users', (table)=>{
      table.increments('id').primary();
      table.string('firstName').notNull();
      table.string('lastName');
      table.string('email').notNull();
      table.string('phone');
      table.string('password').notNull();
      table.string('type').notNull();
      table.string('profilePic');
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.droTable('users');
  };